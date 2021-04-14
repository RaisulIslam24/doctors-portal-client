import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { useHistory, useLocation } from 'react-router';
import loginBg from '../../../images/loginBg.png'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { UserContext } from '../../../App';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            const password = isPasswordValid && passwordHasNumber;
            isFieldValid = password
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((result) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    updateUserName(user.displayName)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((result) => {
                    const { displayName } = result.user;
                    const newUserInfo = { displayName, ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        e.preventDefault();
    }

    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('user name updated successfully');
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const SignedInUser = { displayName, email };
                setLoggedInUser(SignedInUser);
                storeAuthToken();
                history.replace(from);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                // Handle error
            });
    }

    return (
        <div className="row">
            <div className="col-md-6 login border rounded p-3 bg-light shadow">
                <h3 className="text-center mb-2">{newUser ? 'Create an account' : 'Log in'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Name" className="form-control  mb-2" />}
                    </div>
                    <div className="form-group">
                        <input type="text" name="email" onBlur={handleBlur} placeholder="Email" className="form-control mb-2" required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" onBlur={handleBlur} placeholder="Password" className="form-control mb-2" required />
                    </div>
                    <div className="form-group">
                        {newUser && <input type="password" name="confirmPassword" onBlur={handleBlur} placeholder="Confirm Password" className="form-control mb-2" required />}
                    </div>
                    <div className="form-group">
                        <input type="submit" className="form-control bg-primary text-white" value={newUser ? 'Sign up' : 'Login'} />
                    </div>
                    <hr />
                    <p className="text-center">{newUser ? 'Already' : "Don't"} have an account? <input type="checkbox" onClick={() => setNewUser(!newUser)} /> {newUser ? 'Login' : 'Create an account'}</p>
                    <p className="text-center">or</p>
                    <button className="btn btn-success text-white w-100 mb-1 rounded-pill" onClick={handleGoogleSignIn}><FontAwesomeIcon className="text-white me-3" icon={faGoogle} />Continue with Google</button>
                </form>
                <p style={{ color: 'red' }}>{user.error}</p>
                {
                    user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged in'} successfully</p>
                }
            </div>
            <div className="col-md-6 d-none d-md-block align-self-end">
                <img className="img-fluid" src={loginBg} alt="" />
            </div>
        </div>
    );
};

export default Login;
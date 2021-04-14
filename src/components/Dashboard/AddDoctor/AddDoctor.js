import axios from 'axios';
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const AddDoctor = () => {
    const [info, setInfo] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('image', imageUrl);
        formData.append('name', info.name);
        formData.append('email', info.email);

        fetch('https://fast-hamlet-88724.herokuapp.com/addADoctor', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '5fb422405e02b3782f9ac55b36d77374');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <section className="container-fluid row">
            <Sidebar></Sidebar>
            <div className="col-md-10 p-4 pr-5" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <h5 className="text-brand">Add a Doctor</h5>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input onBlur={handleBlur} type="email" class="form-control" name="email" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Name</label>
                        <input onBlur={handleBlur} type="text" class="form-control" name="name" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Upload a image</label>
                        <input onChange={handleImageUpload} type="file" class="form-control" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default AddDoctor;
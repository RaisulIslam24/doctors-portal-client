import React from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

const AppointmentForm = ({ modalIsOpen, closeModal, appointmentOn, date }) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        data.service = appointmentOn;
        data.date = date;
        data.created = new Date();
        console.log(data);

        fetch('https://fast-hamlet-88724.herokuapp.com/addAppointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(success => {
                if (success) {
                    closeModal();
                    alert('Appointment created successfully.');
                }
            })
    }
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2 className="text-center text-brand mt-3">{appointmentOn}</h2>
                <p className="text-secondary text-center"><small>ON {date.toDateString()}</small></p>
                <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input name="name" type="text" ref={register({ required: true })} placeholder="Your Name" className="form-control mb-3" />
                        {errors.name && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input name="phone" type="text" ref={register({ required: true })} placeholder="Phone Number" className="form-control mb-3" />
                        {errors.phone && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input name="email" type="email" ref={register({ required: true })} placeholder="Email" className="form-control mb-3" />
                        {errors.email && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group row">
                        <div className="col-4">
                            <select className="form-control" name="gender" ref={register({ required: true })}>
                                <option disabled={true} value="Not set">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not set">Other</option>
                            </select>
                            {errors.gender && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <input name="age" type="number" ref={register({ required: true })} placeholder="Your Age" className="form-control mb-3" />
                            {errors.age && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <input name="weight" type="number" ref={register({ required: true })} placeholder="Weight" className="form-control mb-3" />
                            {errors.weight && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-brand">Send</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AppointmentForm;
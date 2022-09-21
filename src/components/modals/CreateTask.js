import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useFormik } from 'formik';
import { validation } from '../Schema';
import '../../App.css';

const CreateTask = ({ modal, toggle, addData }) => {

    const handalOnSubmit = (e) => {
        e.preventDefault();
        addData(e.target.name.value, e.target.email.value, e.target.phone.value);
    }

    const initialValues = {
        name: "",
        email: "",
        phone: ""
    }

    const {values, errors, touched , handleBlur, handleChange, handleSubmit}  = useFormik({
        initialValues : initialValues,
        validationSchema: validation,
        onSubmit : (values, action) =>{
            console.log(values)
            addData(values.name, values.email, values.phone)
            action.resetForm();
        },
    });


    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Task</ModalHeader>
            <form onSubmit={handleSubmit}>
                <ModalBody>

                    <div class="form-group">
                        <label>Full Name</label>
                        <input 
                        style={{ border: errors.name && touched.name ? '1px solid red' : '' }}
                        type="text" 
                        class="form-control" 
                        name='name' 
                        placeholder="Enter Full Name" 
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        />
                        {errors.name && touched.name ? <span className='form-error'>{errors.name}</span> : null}
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input 
                        style={{ border: errors.email && touched.email ? '1px solid red' : '' }}
                        type="text" 
                        class="form-control" 
                        name='email' 
                        placeholder="Enter Email" 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        />
                        {errors.email && touched.email ? <span className='form-error'>{errors.email}</span> : null}
                    </div>

                    <div class="form-group">
                        <label>Phone</label>
                        <input 
                        style={{ border: errors.phone && touched.phone ? '1px solid red' : '' }}
                        type="text" 
                        class="form-control" 
                        name='phone' 
                        placeholder="Enter Phone Number" 
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        />
                        {errors.phone && touched.phone ? <span className='form-error'>{errors.phone}</span> : null}
                    </div>

                </ModalBody>

                <ModalFooter>
                    <Button type='submit' onSubmit={handalOnSubmit} color="primary">
                        Add
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    )
}

export default CreateTask
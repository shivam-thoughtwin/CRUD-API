import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useFormik } from 'formik';
import { validation } from '../Schema';

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
        onSubmit : (values) =>{
            // console.log(values.name)
            addData(values.name, values.email, values.phone)
        }
    });

    const styles = {
        colorRed:{
            border:'1px solid red'
        }
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Task</ModalHeader>
            <form onSubmit={handleSubmit}>
                <ModalBody>

                    <div class="form-group">
                        <label>Full Name</label>
                        <input 
                        type="text" 
                        class="form-control" 
                        name='name' 
                        placeholder="Enter Full Name" 
                        // value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        />
                        {errors.name && touched.name ? <p className='form-error'>{errors.name}</p> : null}
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input 
                        type="text" 
                        class="form-control" 
                        name='email' 
                        placeholder="Enter Email" 
                        // value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        />
                        {errors.email && touched.email ? <p className='form-error'>{errors.email}</p> : null}
                    </div>

                    <div class="form-group">
                        <label>Phone</label>
                        <input 
                        type="text" 
                        class="form-control" 
                        name='phone' 
                        placeholder="Enter Phone Number" 
                        // value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        />
                        {errors.phone && touched.phone ? <p className='form-error'>{errors.phone}</p> : null}
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
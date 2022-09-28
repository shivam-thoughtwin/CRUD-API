import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../App.css';
import Swal from "sweetalert2";
import axios from 'axios';
import { useFormik } from 'formik';
import { forgotPass } from '../Schema';

const ForgotPass = ({ modal, toggle, data, closeModal }) => {

    const [formData, setFormData] = useState({
        fname: '',
        lname:'',
        uemail: '',
        password: '',
    });

    const initialValues = {
        uemail: '',
        password: '',
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: forgotPass,
        onSubmit: (values, action) => {
            console.log(values);
            setFormData(values);
            debugger
            forGotPass();
            action.resetForm();
        },
    });

    const forGotPass = async () => {

        if (data) {
            const isExits = data.findIndex(item => item.uemail === values.uemail)
            console.log(isExits, "checkdata")
            debugger
            if (isExits !== -1) {
                data[isExits].password = values.password
                let uid = data[isExits].id

                let newObj = {}
                newObj.fname = data[isExits].fname
                newObj.lname = data[isExits].lname
                newObj.uemail = values.uemail
                newObj.password = values.password

                closeModal();
                let response = await axios.put(`http://localhost:4000/posts/${uid}`, newObj)
                debugger
                if (response) {
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your New Password has been Updated !!',
                        showConfirmButton: false,
                        timer: 2500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Somthing went wrong',
                    })
                }
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Enter Correct Email!',
                })
            }
        }
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Forgot Password</ModalHeader>
            <form onSubmit={handleSubmit}>
                <ModalBody>
                    <form>
                        <input type="hidden" name='fname' value={formData.fname} />
                        <input type="hidden" name='lname' value={formData.lname} />

                        <div class="form-group">
                            <label>Email Address</label>
                            <input
                                style={{ border: errors.uemail && touched.uemail ? '1px solid red' : '' }}
                                type="text"
                                name='uemail'
                                class="form-control"
                                placeholder="Email Address"
                                value={values.uemail}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.uemail && touched.uemail ? <span className='form-error'>{errors.uemail}</span> : null}
                        </div>
                        <div class="form-group">
                            <label>New Password</label>
                            <input
                                style={{ border: errors.password && touched.password ? '1px solid red' : '' }}
                                name='password'
                                type="password"
                                class="form-control"
                                placeholder="Enter Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? <span className='form-error'>{errors.password}</span> : null}
                        </div>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button type='submit' color="primary">
                        Submit
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    )
}

export default ForgotPass
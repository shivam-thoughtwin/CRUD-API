import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../App.css';
import Swal from "sweetalert2";
import axios from 'axios';

const ForgotPass = ({ modal, toggle, data }) => {
    const [formData, setFormData] = useState({
        fname: data.fname,
        lname: data.lname,
        uemail: '',
        password: '',
    })

    console.log(formData, "formData")
    debugger
    const forGotPass = async (e) => {
        e.preventDefault();
        // console.log(formData.uemail,"==>forgotEmail")

        if (data) {

            if (formData.uemail === '' || formData.password === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Fill All Inputs !!',
                })
            } else {
                const isExits = data.findIndex(item => item.uemail === formData.uemail)
                
                debugger
                if (isExits !== -1) {
                    data[isExits].password = formData.password
                    let uid = data[isExits].id
                    let response = await axios.put(`http://localhost:4000/posts/${uid}`, formData)

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

    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Forgot Password</ModalHeader>
            <form>
                <ModalBody>
                    <form>
                        <input type="hidden" name='fname' value={formData.fname} />
                        <input type="hidden" name='lname' value={formData.lname} />

                        <div class="form-group">
                            <label>Email Address</label>
                            <input
                                type="text"
                                name='uemail'
                                class="form-control"
                                placeholder="Email Address"
                                value={formData.uemail}
                                onChange={(e) => setFormData({ ...formData, uemail: e.target.value })}
                            />
                        </div>
                        <div class="form-group">
                            <label>New Password</label>
                            <input
                                name='password'
                                type="text"
                                class="form-control"
                                placeholder="Password" value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={forGotPass} type='submit' color="primary">
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

export default ForgotPass
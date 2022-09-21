import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../App.css';
import Swal from "sweetalert2";
import axios from 'axios';

const ForgotPass = ({ modal, toggle, data }) => {
    const [formData, setFormData] = useState({
        uemail: '',
        password: '',
    })

    const forGotPass = async (e) =>{
        e.preventDefault();
        // console.log(formData.uemail,"==>forgotEmail")

        if (data) {
            // const isExits = originalUsers.find(item => item.uemail === formData.uemail);
            const isExits = data.findIndex(item => item.uemail === formData.uemail)

            // let response = await axios.post('http://localhost:4000/posts', formData)
            if (isExits) {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Password Change Succesfully !!',
                    showConfirmButton: false,
                    timer: 2500
                })
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
            <form>
                <ModalBody>
                <form>
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
                                    placeholder="Password"                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </form>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={forGotPass} type='submit' color="primary">
                        Add
                    </Button>{' '}
                    <Button color="secondary">
                        Cancel
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    )
}

export default ForgotPass
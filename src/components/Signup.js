import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';



const Signup = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([{}]);
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        uemail: '',
        password: '',
    });

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        await fetch('http://localhost:4000/posts')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))
    }



    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (formData.fname === '' || formData.lname === '' || formData.uemail === '' || formData.password === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Fill All Inputs',
            })
        } else {
            const originalUsers = [...data];
            const isEmailExits = originalUsers.find(item => item.uemail === formData.uemail);
            debugger
            if (isEmailExits !== undefined) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email Already Exits!!',
                })
            } else {
                let response = await axios.post('http://localhost:4000/posts', formData)
                if (response) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your Registration has been succesfully !!',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    setTimeout(() => {
                        navigate("/signin")
                    }, "3000")

                    setFormData({
                        fname: '',
                        lname: '',
                        uemail: '',
                        password: '',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Somthing went wrong',
                    })
                }
            }
        }
    }

    return (
        <>
            <div className='cardCenter'>
                <div style={{ width: '650px' }} class="card shadowCss">
                    <h2 style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>Registration</h2>
                    <hr />
                    <div class="card-body">
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name='fname'
                                        id="inputEmail4"
                                        placeholder="First Name"
                                        value={formData.fname}
                                        onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                                    />
                                </div>
                                <div class="form-group col-md-6">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name='lname'
                                        id="inputPassword4"
                                        placeholder="Last Name"
                                        value={formData.lname}
                                        onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    name='uemail'
                                    id="inputAddress"
                                    placeholder="Email Address"
                                    value={formData.uemail}
                                    onChange={(e) => setFormData({ ...formData, uemail: e.target.value })}
                                />
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    name='password'
                                    id="inputAddress"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <button onClick={handleFormSubmit} type="submit" class="btn btn-primary">Sign Up</button>
                            <p>Already hane an account <NavLink to="/signin">Click</NavLink> </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
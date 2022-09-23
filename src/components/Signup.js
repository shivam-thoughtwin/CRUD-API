import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { registration } from './Schema';



const Signup = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([{}]);
    const [formData, setFormData] = useState({

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

    const initialValues = {
        fname: '',
        lname: '',
        uemail: '',
        password: '',
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: registration,
        onSubmit: (values, action) => {
            console.log(values);
            setFormData(values);
            debugger
            handleFormSubmit();
            action.resetForm();
        },
    });

    const handleFormSubmit = async () => {
        // e.preventDefault();
            const originalUsers = [...data];
            const isEmailExits = originalUsers.find(item => item.uemail === values.uemail);
            debugger
            if (isEmailExits !== undefined) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email Already Exits!!',
                })
            } else {

                let newObj = {}
                newObj.fname = values.fname
                newObj.lname = values.lname
                newObj.uemail = values.uemail
                newObj.password = values.password

                let response = await axios.post('http://localhost:4000/posts', newObj)
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

    return (
        <>
            <div className='cardCenter'>
                <div style={{ width: '650px' }} class="card shadowCss">
                    <h2 style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>Registration</h2>
                    <hr />
                    <div class="card-body">
                        <form onSubmit={handleSubmit}>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>First Name</label>
                                    <input
                                        style={{ border: errors.fname && touched.fname ? '1px solid red' : '' }}
                                        type="text"
                                        class="form-control"
                                        name='fname'
                                        id="inputEmail4"
                                        placeholder="First Name"
                                        value={values.fname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.fname && touched.fname ? <span className='form-error'>{errors.fname}</span> : null}
                                </div>
                                <div class="form-group col-md-6">
                                    <label>Last Name</label>
                                    <input
                                        style={{ border: errors.lname && touched.lname ? '1px solid red' : '' }}
                                        type="text"
                                        class="form-control"
                                        name='lname'
                                        id="inputPassword4"
                                        placeholder="Last Name"
                                        value={values.lname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.lname && touched.lname ? <span className='form-error'>{errors.lname}</span> : null}
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Email Address</label>
                                <input
                                    style={{ border: errors.uemail && touched.uemail ? '1px solid red' : '' }}
                                    type="email"
                                    class="form-control"
                                    name='uemail'
                                    id="inputAddress"
                                    placeholder="Email Address"
                                    value={values.uemail}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.uemail && touched.uemail ? <span className='form-error'>{errors.uemail}</span> : null}
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input
                                    style={{ border: errors.password && touched.password ? '1px solid red' : '' }}
                                    type="password"
                                    class="form-control"
                                    name='password'
                                    id="inputAddress"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password ? <span className='form-error'>{errors.password}</span> : null}
                            </div>
                            <button type="submit" class="btn btn-primary">Sign Up</button>
                            <p>Already hane an account <NavLink to="/signin">Click</NavLink> </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
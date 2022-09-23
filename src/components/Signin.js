import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../App.css'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ForgotPass from './modals/ForgotPass';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { forgotPass } from './Schema';

const Signin = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([{}]);
    const [formData, setFormData] = useState({
        uemail: '',
        password: '',
    })
    useEffect(() => {
        fetchData();
    }, [])

    console.log(data, "datadatadatadata")

    const fetchData = async () => {
        await fetch('http://localhost:4000/posts')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))

    }

    const toggle = () => {
        setModal(!modal);
    }

    const initialValues = {
        fname: '',
        lname: '',
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
            handleFormLogin();
            action.resetForm();
        },
    });

    let handleFormLogin = () => {
        // e.preventDefault();

        const originalUsers = [...data];

        if (originalUsers) {
            const isExits = originalUsers.find(item => item.uemail === values.uemail);


            if (isExits && isExits.password === values.password) {
                localStorage.setItem("user", JSON.stringify(values.uemail));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login succesfully !!',
                    showConfirmButton: false,
                    timer: 2500
                })
                setTimeout(() => {
                    navigate("/")
                    window.location.reload();
                }, "3000")
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Wrong Email and Password !',
                })
            }
        }


    }

    return (
        <>
            <div className='cardCenter'>
                <div style={{ width: '650px' }} class="card shadowCss">
                    <h2 style={{ display: 'flex', justifyContent: 'center', color: '#007bff' }}>Login</h2>
                    <hr />
                    <div class="card-body">
                        <form onSubmit={handleSubmit}>

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
                                <label>Password</label>
                                <input
                                    style={{ border: errors.password && touched.password ? '1px solid red' : '' }}
                                    name='password'
                                    type="text"
                                    class="form-control"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password ? <span className='form-error'>{errors.password}</span> : null}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }} class="form-group">
                                <button type="submit" class="btn btn-primary">Login</button>
                                <span onClick={() => setModal(true)} style={{ color: 'blue', cursor: 'pointer' }}>Forgot Password</span>
                            </div>

                            <p>Don't hane an account <NavLink to="/signup">Click</NavLink> </p>

                        </form>
                    </div>
                </div>
            </div>

            <ForgotPass toggle={toggle} modal={modal} data={data} />
        </>
    )
}

export default Signin


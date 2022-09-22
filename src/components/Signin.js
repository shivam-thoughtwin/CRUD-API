import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../App.css'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ForgotPass from './modals/ForgotPass';
import { NavLink } from 'react-router-dom';

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

    console.log(data,"datadatadatadata")

    const fetchData = async () => {
        await fetch('http://localhost:4000/posts')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))

    }

    const toggle = () => {
        setModal(!modal);
    }

    let handleFormLogin = (e) => {
        e.preventDefault();
        console.log(formData.uemail, "formLogin")

        if(formData.fname === '' || formData.lname === '' || formData.uemail === '' || formData.password === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Plese Fill All Inputs',
            })
        }else{

        const originalUsers = [...data];

        if (originalUsers) {
            const isExits = originalUsers.find(item => item.uemail === formData.uemail);
            
            
            if (isExits && isExits.password === formData.password) {
                localStorage.setItem("user", JSON.stringify(formData.uemail));
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

    }

    return (
        <>
            <div className='cardCenter'>
                <div style={{ width: '650px' }} class="card shadowCss">
                <h2 style={{ display:'flex', justifyContent:'center', color:'#007bff' }}>Login</h2>
                <hr />
                    <div class="card-body">
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
                                <label>Password</label>
                                <input
                                    name='password'
                                    type="text"
                                    class="form-control"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }} class="form-group">
                                <button onClick={handleFormLogin} type="submit" class="btn btn-primary">Login</button>
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


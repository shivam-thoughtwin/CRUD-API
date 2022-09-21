import React, { useEffect, useState } from 'react';
import CreateTask from './modals/CreateTask';
import Card from './Card';
import Swal from "sweetalert2";



const TodoList = () => {

    const [modal, setModal] = useState(false);

    const [users, setUsers] = useState([]);

    const [getUser, setGetUser] = useState([]);
    const [isLoggedin, setIsLoggedin] = useState(false);


    useEffect(() => {
        let arr = localStorage.getItem("user");
        if (arr) {
            let obj = JSON.parse(arr);
            setGetUser(obj)
            setIsLoggedin(true);
        }
    }, [getUser, isLoggedin]);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.log(err))
    }
    console.log(users);

    // Add Data
    const addData = async (name, email, phone) => {
        if (name == '' || email == '' || phone == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Fill All Inputs',
            })
        } else {

            const originalUsers = [...users];

            const isExits = originalUsers.find(item => item?.email?.toLowerCase() === email?.toLowerCase());

            debugger

            if (isExits) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email ALready Exits !!',
                })
            } else {
                setModal(false);
                await fetch('https://jsonplaceholder.typicode.com/users', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                })
                    .then((res) => {

                        if (res.status !== 201) {
                            return
                        } else {
                            return res.json()
                        }
                    })
                    .then((data) => {
                        console.log(data)
                        debugger
                        data['id'] = users.length + 1;

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your data has been saved',
                            showConfirmButton: false,
                            timer: 2500
                        })

                        setUsers((users) => [...users, data]);

                    })
                    .catch((err) => console.log(err));
            }

        }
    }

    // Update Data 
    const updatData = async (id, name, email, phone) => {
        debugger
        if (name == '' || email == '' || phone == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Fill All Inputs',
            })
        } else {
            const emailExists = users.findIndex((item, index) => {
                return index !== (id - 1) ? item.email === email : null;
            });
            debugger;
            if (emailExists && emailExists !== -1) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email Already Exits',
                })
            } else {

                if (id <= 10) {

                    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            phone: phone
                        }),
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json; charset=UTF-8",
                        }
                    })
                        .then((res) => {
                            // setModal(false)
                            console.log(res)
                            debugger
                            if (res.status !== 201) {
                                return res.json();
                            } else {
                                return
                            }
                        })
                        .then((data) => {

                            console.log(data, "data");
                            const originalUsers = [...users];
                            const isExits = originalUsers.findIndex(item => item.id === data.id)

                            debugger
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Your data has been Updated',
                                showConfirmButton: false,
                                timer: 2500
                            })
                            originalUsers[isExits] = data;
                            debugger
                            setUsers(originalUsers)
                            console.log(originalUsers, "updated")
                            debugger

                        })
                        .catch((err) => console.log(err));

                } else {

                    const originalUsers = [...users];
                    const isExits = originalUsers.findIndex(item => item.id === id)

                    if (isExits) {

                        let tempObj = {}
                        tempObj['name'] = name;
                        tempObj['email'] = email;
                        tempObj['phone'] = phone

                        originalUsers[isExits] = tempObj;
                        debugger
                        setUsers(originalUsers)

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your data has been Updated',
                            showConfirmButton: false,
                            timer: 2500
                        })
                    }

                }

            }
        }
    }

    // Delete Data
    const deleteData = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE'
        })
            .then((res) => {
                if (res.status !== 200) {
                    return
                } else {
                    setUsers(users.filter((user) => {
                        return user.id !== id;
                    }))
                }
            })
            .catch((err) => console.log(err));
    }

    const toggle = () => {
        setModal(!modal);
    }

    // console.log(users,"outside")

    return (
        <>

            {
                (isLoggedin) ?
                    <>
                        <div className='header text-center'>
                            <h3>Todo List using API || Assigned by Amit Sir</h3>
                            <button className='btn btn-success mt-2' onClick={() => setModal(true)}>Add Todo</button>
                        </div>
                        <div className='task-container'>
                            {
                                users.map((user) => (
                                    <Card id={user.id} key={user.id} name={user.name} email={user.email} phone={user.phone} deleteData={deleteData} updatData={updatData} />
                                ))
                            }

                        </div>
                    </>

                    :

                    <div className='centerTxt'>
                        <h1>If you want to use EMS ? then Please Login or Register your slef. Thank You.</h1>
                    </div>

            }



            <CreateTask toggle={toggle} modal={modal} addData={addData} />
        </>
    )
}

export default TodoList
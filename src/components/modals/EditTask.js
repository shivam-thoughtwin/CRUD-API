import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from "sweetalert2";

const EditTask = ({ modal, toggle, id, name, email, phone, updatData, closeModal }) => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        setUsers({ name, email, phone })
    }, [name, email, phone])
    
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'name' || name === 'email' || name === 'phone') {
            setUsers(value);
        } 
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        debugger
        if (name == '' || email == '' || phone == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Fill All Inputs',
            })
        } else {
            updatData(id,e.target.name.value,e.target.email.value,e.target.phone.value);
            closeModal()
        }
    }
    

    return (

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
            <form onSubmit={handleUpdate}>
                <ModalBody>


                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" class="form-control" value={users.name} name='name' onChange={handleChange} placeholder="Enter Full Name" />
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" value={users.email} name='email' onChange={handleChange} placeholder="Enter Email" />
                    </div>

                    <div class="form-group">
                        <label>Phone</label>
                        <input type="text" class="form-control" value={users.phone} name='phone' onChange={handleChange} placeholder="Enter Phone Number" />
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onSubmit={handleUpdate}>
                        Edit Task
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
        
    )
}

export default EditTask
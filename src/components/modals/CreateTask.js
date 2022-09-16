import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({ modal, toggle, addData }) => {

    const handalOnSubmit = (e) => {
        e.preventDefault();
        addData(e.target.name.value, e.target.email.value, e.target.phone.value);
        // e.target.name.value = "";
        // e.target.email.value = "";
        // e.target.phone.value = "";
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Task</ModalHeader>
            <form onSubmit={handalOnSubmit}>
                <ModalBody>


                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" class="form-control" name='name' placeholder="Enter Full Name" />
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" name='email' placeholder="Enter Email" />
                    </div>

                    <div class="form-group">
                        <label>Phone</label>
                        <input type="text" class="form-control" name='phone' placeholder="Enter Phone Number" />
                    </div>

                </ModalBody>

                <ModalFooter>
                    <Button onSubmit={handalOnSubmit} color="primary">
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
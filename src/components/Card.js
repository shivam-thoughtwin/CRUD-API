import React, { useState } from 'react';
import Swal from "sweetalert2";
import EditTask from './modals/EditTask';

const Card = ({ id, name, email, phone, deleteData, updatData }) => {
  const [modal, setModal] = useState(false);
  
  const openModal = () => {
    setModal(true);
  }

  const handaleDelete = () => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const toggle = () => {
    setModal(!modal);
  }


  return (

    <div className='card-wrapper mr-5 mb-5'>
      <div className='card-top' style={{ backgroundColor: '#F2FAF1', borderRadius: '10px' }}>
        <div className='task-holder'>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <div style={{ position: 'absolute', right: '20px', bottom: '20x' }}>
            <p style={{ cursor: 'pointer' }} onClick={openModal}>Edit</p>
            <p style={{ cursor: 'pointer' }} onClick={handaleDelete}>Delete</p>
          </div>
        </div>
      </div>
      <EditTask modal={modal} toggle={toggle} id={id} name={name} email={email} phone={phone} updatData={updatData} />
    </div>

  )
}

export default Card
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEtudiant() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [grade, setGrade] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    
    const navigate = useNavigate();

    const create = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/create", {
          name: name,
          email: email,
          address: address,
          grade: grade,
        }).then((response) => {
          console.log(response);
          if (response.data.message) {
            setRegisterStatus(response.data.message);
          } else {
            navigate('/etudiant');
            alert("Success");
          }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Add Etudiant</h2>
            <form className="row g-3 w-50" onSubmit={create}>
                <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1>
                <div className="col-12">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder='Enter Name' autoComplete='off'
                    onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder='Enter Email' autoComplete='off'
                    onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Grade</label>
                    <input type="text" className="form-control" placeholder="Enter Grade" autoComplete='off'
                    onChange={(e) => { setGrade(e.target.value) }} />
                </div>
                <div className="col-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" placeholder="1234 Main St" autoComplete='off'
                    onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
}

export default AddEtudiant;

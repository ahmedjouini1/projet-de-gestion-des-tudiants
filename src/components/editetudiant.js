import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditEtudiant() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [grade, setGrade] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    
    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        
        axios.get(`http://localhost:3001/etudiant/${id}`)
            .then((response) => {
               
                setName(response.data.name);
                setEmail(response.data.email);
                setAddress(response.data.address);
                setGrade(response.data.grade);
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/update/${id}`, {
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
            alert("Update Successful");
          }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Edit Etudiant</h2>
            <form className="row g-3 w-50" onSubmit={update}>
               
            </form>
        </div>
    );
}

export default EditEtudiant;


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
 
function Etudiant() {
  const [data, setData] = useState([])
 
  useEffect(()=> {
    axios.get('http://localhost:3001/getEtudiant')
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])
 
  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/delete/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }
 
  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Etudiant List</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add Etudiant</Link>
      <div className='mt-3'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((etudiant, index) => {
              return <tr key={index}>
                  <td>{etudiant.name}</td>
                  <td>{etudiant.email}</td>
                  <td>{etudiant.address}</td>
                  <td>{etudiant.grade}</td>
                  <td>
                    <Link to={`/etudiantedit/`+etudiant.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(etudiant.id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
 
export default Etudiant

import React, { useEffect, useState } from 'react'
import axios from 'axios'
 
function Home() {
  const [adminCount, setAdminCount] = useState()
  const [etudiantCount, setEtudiantCount] = useState()
  const [grade, setGrade] = useState()
 
  useEffect(() => {
    axios.get('http://localhost:3001/adminCount')
        .then(res => {
            setAdminCount(res.data[0].admin)
        }).catch(err => console.log(err));
 
    axios.get('http://localhost:3001/etudiantCount')
        .then(res => {
            setEtudiantCount(res.data[0].etudiant)
        }).catch(err => console.log(err));
 
    axios.get('http://localhost:3001/grade')
        .then(res => {
            setGrade(res.data[0].sumOfGrade)
        }).catch(err => console.log(err));
 
  } , [])
   
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Etudinat</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {etudiantCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>grade</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {grade}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default Home
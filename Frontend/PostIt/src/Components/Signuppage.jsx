import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from  'axios'
function Loginpage() {
    const navigate = useNavigate()
    const [details,setDetails] = useState({
        username:'',
        email : '',
        password : '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {   
            const data = await axios.post('http://localhost:5000/storingdata',details)
            const res = data.data.message;
            if(res === 'User Created'){
                alert('User Created')
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        console.log(value);
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name] : value,
    }))
    console.log(details);
    }
  return (
    <div className='loginpage'>
        <form action="post" className='loginform'>
            <input type="text" placeholder='Enter Your Name' name='username' value={details.username} onChange={(e) => handleChange(e)} require/>
            <input type="text" placeholder='Email' name='email' value={details.email} onChange={(e) => handleChange(e)} require/>    
            <input type="password" placeholder='Password' name = 'password' value ={details.password} onChange={(e) => handleChange(e)} require/>
            <button className='primarybutton' onClick={(e) => handleSubmit(e)}>Sign Up</button>
            <p>already a user <span className="links" onClick={() => navigate('/')}>login</span></p>
        </form>    
    </div>
  )
}

export default Loginpage
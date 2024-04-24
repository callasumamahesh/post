import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useNavigation } from 'react-router-dom';
function Loginpage() {
    const navigate = useNavigate()
    const [details,setDetails] = useState({
        email : '',
        password : '',
    })
    const handleChange = (e) => {
        const {name,value} = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name] : value,
    }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await axios.get(`http://localhost:5000/userdata?email=${details.email}&password=${details.password}`)
            const res = data.data.message;
            if(res === 'YesAUser'){
                localStorage.setItem('PostItuser',true)
                navigate('/homepage')
            }
            else if(res === 'Password Is MisMatch'){
                alert(res)
            }
            else{
                alert(data.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
  return (
    <div className='loginpage'>
        <form action="get" className='loginform'>
            <input type="text" placeholder='Email' name='email' value={details.email} onChange={(e) => handleChange(e) } require/>    
            <input type="password" placeholder='Password' name = 'password' value ={details.password} onChange={(e) => handleChange(e)} require/>
            <button className='primarybutton' onClick={(e) => handleSubmit(e)}>Login</button>
            <p>create account <span className="links" onClick={() => navigate('/signup')}>sign up</span></p>
        </form>    
    </div>
  )
}

export default Loginpage
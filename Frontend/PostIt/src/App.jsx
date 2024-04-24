import React from 'react'
import './App.css'
import Loginpage from './Components/Loginpage'
import Signuppage from './Components/Signuppage'
import {Route,Routes, useNavigate, useNavigation} from 'react-router-dom'
import Homepage from './Components/Homepage'
import CreatePost from './Components/CreatePost'
import Allposts from './Components/Allposts'
function App() {
  const navigate = useNavigate()
  const isuser = localStorage.getItem('PostItuser')
  const handleLogout = () => {
    localStorage.clear('PostItUser')
    navigate('/')
  }
  return (
    <>
      <div className='header'>
        {/* <i class="fa-solid fa-signs-post"></i> */}
        <h1>POST IT</h1>
        <div className='headerbtn'> 
        {
          isuser ? (<div className='userveri'>
          <button className='primarybutton' onClick={() => navigate('/postapost')}>Create Post</button>
          <button className='primarybutton' onClick={() => navigate('yourposts')}>Your Posts</button>
          <button className='primarybutton' onClick={() => handleLogout()}>Logout</button>
        </div>) : (
          <div className='headerbtn'>
            <button className='primarybutton' onClick={() => navigate('/signup')}>Sign Up</button>
            <button className='primarybutton' onClick={() => navigate('/')}>Login</button>
          </div>
        )
        }
        </div>
      </div>
      <div>
        <Routes>
          <Route path='/' element={<Loginpage />}></Route>
          <Route path='signup' element={<Signuppage/>}></Route>
          <Route path='/homepage' element = {<Homepage />}></Route>
          <Route path='/postapost' element = {<CreatePost />}></Route>
          <Route path='/yourposts' element = {<Allposts />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
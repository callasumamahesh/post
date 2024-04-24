import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
function Update() {

    const location = useLocation()
    const navigate = useNavigate()
    const {_id,image,post_description} = location.state.item;
    const [post,setPost] = useState({
        id:_id,
        post_description : '',
        image : '',
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        setPost((prevPosts) => ({
            ...prevPosts,
            [name] : value,
        }))

    }
    const handleImage = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPost(prevPost => ({
                ...prevPost,
                [name] : reader.result
            }))
        }
        if(file) {
            reader.readAsDataURL(file)
            alert('File Added')
        }
    }
    const handleSave = async (e) => {
        e.preventDefault()
        try {
            const data = await axios.put('http://localhost:5000/updatepost',post)
            if(data.data.message === 'Post updated successfully'){
                alert('Post updated successfully')
            }
            else{
                alert('data.data.message')
            }
        } catch (error) {
            alert(error)
        }
    }
  return (

    <div className='postmaindiv1'>
        <div className='sidediv'>
            <textarea name="post_description" id="" value={post.post_description} onChange={(e) => handleChange(e)} cols="30" rows="10">{post_description}</textarea>
            <img src={image} alt="postPhoto"/>
        </div>
        <label htmlFor="fileInput" className='primarybutton'>Change Image</label>
        <input type="file" id="fileInput" name="image" onChange={(e) => handleImage(e)}/>
        <div className='udbtns'>
            <button className="primarybutton" onClick={() => navigate('/yourposts')}>Cancel</button>
            <button className="primarybutton" onClick={(e) => {handleSave(e)}}>Save</button>
        </div>
    </div>
  )
}

export default Update;
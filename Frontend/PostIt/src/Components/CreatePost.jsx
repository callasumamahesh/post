import React, { useState } from 'react'
import axios from 'axios'
function CreatePost() {
    const [post,setPost] = useState({
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

    const handlePost = async (e) => {
        e.preventDefault()
        console.log(post);
        try {
            const data = await axios.post('http://localhost:5000/postit',post)
            alert(data.data.message)
        } catch (error) {
            alert(error)
        }
        setPost({
            post_description : '',
            image : '',
        })
    }
  return (
    <div className='postmaindiv'>
        <div className='postdiv'>
            <textarea name="post_description" value={post.post_description} onChange={(e) => handleChange(e)} id="Post" cols="25" rows="10"></textarea>
            <div className='fileinput'>
                <div className='filesdiv'>
                    <label id='filelabel' htmlFor="fileInput">
                        <i className="fa-solid fa-plus">
                        </i><button>Add Files</button></label>   
                    <input type="file" id='fileInput' name="image" onChange={(e) => handleImage(e)}/>
                </div>
            <button className='primarybutton' onClick={(e) => handlePost(e)}>Post</button>
            </div>
        </div>
    </div>
  )
}

export default CreatePost
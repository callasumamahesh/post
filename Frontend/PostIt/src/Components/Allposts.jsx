import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Allposts() {
    const navigate = useNavigate()
    const [yourposts,setYourposts] = useState([])
    useEffect(() => {
        const handleyourpost = async () => {
            const data = await axios.get('http://localhost:5000/yourposts')
            setYourposts(data.data)
        }
        handleyourpost()
    },[])
    const handleDelete = async (itemid) => {
        try {
            
            const data = await axios.delete(`http://localhost:5000/deletepost/${itemid}`)
            if(data.data.message === 'Deleted'){
                alert('Post Deleted')
                navigate('/yourposts')
            }
            else{
                alert(data.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
    const handleUpdate = async (item) => {
        navigate('/updatepost',{state : {item}})
    }
  return (
    <div>
        <h1 className='head'>Your All Posts</h1>
        <div className='yourpostsmaindiv'>
            {yourposts.map((item,i) => {
                return(
                    <div key={i} className='postyourdiv'>
                        <div className='pimg'>
                            <p className='postp'> {item.post_description}</p>
                            <img className='postimage' src={item.image} alt='PostImage' />
                        </div>
                        <div className='udbtns'>
                            <button className="primarybutton" onClick={() => handleUpdate(item)}>Update</button>
                            <button className="primarybutton" onClick={() => handleDelete(item._id)}>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Allposts
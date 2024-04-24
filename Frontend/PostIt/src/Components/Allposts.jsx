import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Allposts() {
    const [yourposts,setYourposts] = useState([])
    useEffect(() => {
        const handleyourpost = async () => {
            const data = await axios.get('http://localhost:5000/yourposts')
            setYourposts(data.data)
        }
        handleyourpost()
    },[])
  return (
    <div>
        <h1 className='head'>Your All Posts</h1>
        <div className='yourpostsmaindiv'>
            {yourposts.map((item,i) => {
                return(
                    <div key={i} className='postyourdiv'>
                        <p className='postp'> {item.post_description}</p>
                        <img className='postimage' src={item.image} alt='PostImage' />
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Allposts
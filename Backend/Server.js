const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const cors = require('cors')
const app = express()
const PostItUsers = require('./models/usermodel')
const PostItPosts = require('./models/postmodel')
dotenv.config();
app.use(cors())

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}))

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Data Base Is Connected'))
    .catch((err) => console.log(err))
    
app.get('/userdata', async (req,res) => {
        let {email,password} = req.query;
        try {
            
            const User = await PostItUsers.findOne({email})
            if(User){
                res.status(200).json({message : 'YesAUser'})
            }
        } catch (error) {
            console.log(error);
        }
    })


app.post('/storingdata',async (req,res) => {
    const {username,email,password} = req.body;
    try {   
    const NewUser = await PostItUsers({username,email,password})
    await NewUser.save()
    res.status(200).json({message : 'User Created'})
    } catch (error) {
     console.log(error);   
    }
})

app.post('/postit',async(req,res) => {
    const {post_description,image} = req.body;
    try {
        const data = await PostItPosts({post_description,image})
        await data.save()
        res.status(200).json({message : 'Posted Succesfully'})
    } catch (error) {
        alert(error)
    }
})

app.get('/yourposts',async(req,res) => {
    const allposts = await PostItPosts.find({})
    res.send(allposts)
})

const serverPort = 5000 
app.listen(serverPort,() => console.log('Server is running',{serverPort}))

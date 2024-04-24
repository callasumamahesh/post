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
        
                if(User.password == password){
                    res.status(200).json({message : 'YesAUser'})
                }
                else{
                    res.status(200).json({message : 'Password Is MisMatch'})
                }
            }
            else{
                res.status(200).json({message : 'User Does not Exict'})
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


app.delete('/deletepost/:itemid',async (req,res) => {
    try {
        const id = req.params.itemid;
        const findone = await PostItPosts.findOneAndDelete({_id : id})
        if(findone){
            res.send({message : 'Deleted'})
        }
        else{
            res.send({message : 'Post Not Deleted'})
        }
    } catch (error) {
        res.send(error)
    }
})

app.put('/updatepost', async (req,res) => {
    try {  
        const {id,post_description,image} = req.body
        const updatedPost = await PostItPosts.findOneAndUpdate(
            { _id: id },
            { post_description, image },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post updated successfully'})
    } catch (error) {
        console.log(error);
    }
    
})

const serverPort = process.env.PORT
app.listen(serverPort,() => console.log('Server is running',{serverPort}))

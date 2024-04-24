const mongoose = require('mongoose')
const Users = mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email : {
        type : String,
        required:true
    },
    password : {
        type:String,
        required:true
    }

})

const PostItUsers = mongoose.model('PostItUsers',Users) 
module.exports = PostItUsers;
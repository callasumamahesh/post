const mongoose = require('mongoose')
const post = mongoose.Schema({
    post_description : {
        type : String,
        require:true
    },
    image : {
        type : String
    }
})

const PostItPosts = mongoose.model('PostItPosts',post)
module.exports = PostItPosts
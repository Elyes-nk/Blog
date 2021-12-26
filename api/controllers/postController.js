const Post = require("../models/Post");



exports.getPost = async(req,res) => {
    try{
        const user = await Post.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
}
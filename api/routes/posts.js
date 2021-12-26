//capacité a utilisé les routes 
const router = require("express").Router();
const Post = require("../models/Post");

const postController = require("../controllers/postController");

//CREATE 
router.post("/", async(req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(500);
    }
});



//UPDATE
router.put("/:id", async(req,res) => {        
        try{
                const post = await Post.findById(req.params.id);
                if(post.username === req.body.username){
                    try{
                            const updatedPost = await post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
                            res.status(200).json(updatedPost);
                    }catch(err){
                        res.status(500).json(err);
                    } 
                }else{
                    res.status(401).json("you can only update your own posts")
                }
        } catch(err) {
            //renvoie message fail
            res.status(500).json(err)
        }
    
});

//DELETE
router.delete("/:id", async(req,res) => {
        try{
            const post = await Post.findById(req.params.id);
            if(post.username === req.body.username){
                try{
                    await Post.findByIdAndDelete(req.params.id);
                    res.status(200).json("post has been deleted");
                }catch(err){
                    res.status(500).json(err);
                } 
            }else{
                res.status(401).json("you can only update your own posts")
            }
        } catch(err) {
            //renvoie message fail
            res.status(500).json(err)
        }
});

//GET ALL
router.get("/", async(req,res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            posts = await Post.find({username:username});
        }else if (catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }});
        }else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err)
    }
});

//GET
router.get("/:id", postController.getPost);

module.exports = router;
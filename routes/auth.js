//capacité a utilisé les routes 
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async(req,res) => {
    try{
        //crypté mdp
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        //enregistre dans mongoDB
        const user = await newUser.save();
        //renvoie message succes
        res.status(200).json(user)
    } catch(err) {
        //renvoie message fail
        res.status(500).json(err)
    }
});



//Login
router.post("/login", async(req,res) => {
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("wrong credentials");

        const validatePass = await bcrypt.compare(req.body.password, user.password);
        !validatePass && res.status(400).json("wrond credentials");

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;
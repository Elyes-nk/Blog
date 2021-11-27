const express = require("express");
const app = express();
//use .env link to connect to mangoDB
const dotenv = require("dotenv");
//mongoose to connect to mongoDB
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
//multer to upload img
const multer = require("multer");
const path= require("path");

dotenv.config();
//use json
app.use(express.json());
app.use("/img", express.static(path.join(__dirname,"/img")));

//connect to mangoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(console.log("connected to MongoDB")).catch(err=>console.log(err));

app.listen("5000", ()=>{
    console.log("backend is running !");
});


//========== Routes =================
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", catRoute);

//===================================


//============ storage img using multer ==================
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"img");
    },filename:(req,file,cb) => {
        cb(null,req.body.name);
    }, 
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    req.status(200).json("file uploaded");
})
//========================================================
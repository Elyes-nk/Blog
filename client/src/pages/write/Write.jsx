import "./write.css";
import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const {user} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username : user.username,
      title,
      desc,
    }
    //image
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name",fileName);
      data.append("file",file);
      newPost.photo = fileName;
      try {
        await axios.post("/upload",data)
      } catch (error) { }
    }else{
      newPost.photo = "standard2.jpeg";
    }
    
    try {
      await axios.post("/posts/",newPost);
      //refresh page with new img
      window.location.replace("/")
    } catch (error) { }
  };
  return (
    <div className="write">

      {file ? (
          <img
            className="writeImg"
            src={URL.createObjectURL(file)}
            alt=""
          />
      ) : (
          <img
            className="writeImg"
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
      )}

     

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input 
            id="fileInput" 
            type="file" 
            style={{ display: "none" }} 
            onChange={e=>setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e=>setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

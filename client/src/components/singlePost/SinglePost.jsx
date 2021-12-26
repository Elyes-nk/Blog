import { Link } from "react-router-dom";
import "./singlePost.css";
import React, {useEffect, useState, useContext} from "react";
import { Context } from "../../context/Context";
import { useLocation } from "react-router";
import axios from "axios";

export default function SinglePost() {
  const PublicFolder = "http://localhost:5000/img/";

  const {user} = useContext(Context);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [updateMode, setUpdateMode] = useState(false);

  const location = useLocation();
  const id = location.pathname.split('/')[2];
  
  useEffect(()=> {
    const getPost = async () => {
      const res = await axios.get("/Posts/"+id);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      console.log("0")
    }
    getPost();
  },[id, setPost]);


  const handleDelete = async() => {
    try {
      console.log("oups")
      await axios.delete("/Posts/" + id, {data : { username:user.username }});
      window.location.replace("/");
    } catch (error) { }
  }
  const handleEdit = async() => {
    try {
      await axios.put("/Posts/" + id, { username:user.username, title:title, desc:desc});
      setUpdateMode(false);
    } catch (error) { }
    //128
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
          className="singlePostImg"
          src={PublicFolder + post.photo}
          alt=""
          />
        )}
        
        {updateMode ? (
            <input 
            type="text" 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="singlePostTitleInput"
          />
        ):(
          <h1 className="singlePostTitle">
          {title}
          {post.username === user?.username && (
            <div className="singlePostEdit">
              <i 
                className="singlePostIcon far fa-edit"
                onClick={()=>setUpdateMode(true)}
              ></i>
              <i 
                className="singlePostIcon far fa-trash-alt"
                onClick={()=>handleDelete()}
              ></i>
            </div>
          )}
          </h1>
        )}


        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?username=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString}</span>
        </div>

        {updateMode ? (
          <textarea 
            className="singlePostDescInput" 
            value={desc} 
            onChange={(e)=>setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">
           {desc}
          </p>
        )}

       {updateMode && ( 
          <button 
            className="singlePostButton"
            onClick={handleEdit}
          >
            Update
          </button>
        )}
       
      </div>
    </div>
  );
}

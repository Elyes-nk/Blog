import { Link } from "react-router-dom";
import "./singlePost.css";
import React, {useEffect, useState, useContext} from "react";
import Context from "../../../context/Context";
import { useLocation } from "react-router";
import axios from "axios";

export default function SinglePost() {
  const PublicFolder = "http://localhost:5000/img/";
  const {user} = useContext(Context);
  const {post, setPost} = useState({});
  const location = useLocation();
  const path = location.pathname.split('/')[2];

  useEffect(()=> {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
    }
    getPost();
  },[path, setPost]);
  const handleDelete = async() => {
    try {
      await axios.delete("/posts/" + path, {data : {username:user.username}});
      window.location.replace("/");
    } catch (error) { }
  }
  const handleEdit = async() => {
    //115
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
        
        <h1 className="singlePostTitl e">
          {post.title}
          {post.username === user?.username && (
            <div className="singlePostEdit">
              <i 
                className="singlePostIcon far fa-edit"
                onClick={handleDelete}
              ></i>
              <i 
                className="singlePostIcon far fa-trash-alt"
                onClick={handleEdit}
              ></i>
            </div>
          )}
        </h1>
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
        <p className="singlePostDesc">
          {post.desc}
        </p>
      </div>
    </div>
  );
}

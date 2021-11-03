import { Link } from "react-router-dom";
import "./singlePost.css";
import React, {useEffect, useState} from "react";
import { useLocation } from "react-router";
import axios from "axios";

export default function SinglePost() {
  const {post, setPost} = useState({});
  const location = useLocation();
  const path = location.pathname.split('/')[2];

  useEffect(()=> {
    const getPost = async () => {
      const res = await axios.get("/Posts"+path);
      setPost(res.data);
    }
    getPost();
  },[path, setPost]);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
          className="singlePostImg"
          src={post.photo}
          alt=""
          />
        )}
        
        <h1 className="singlePostTitl e">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?username=${post.username}`}>
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

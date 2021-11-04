import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import React, {useEffect, useState} from "react";

export default function Homepage() {
  const { search } = useLocation();
  const [posts, setPosts] = useState({});

/*  */
useEffect(()=> {
    const fetchPosts = async ()=> {
      const res = axios.get("/Posts"+search);
      setPosts(res.data);
    }
    fetchPosts()
  },[search])


  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}

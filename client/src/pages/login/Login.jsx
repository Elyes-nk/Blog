import "./login.css";
import { Link } from "react-router-dom";
import React, { useRef } from "react";
import { Context } from "../../context/Context";
import { useContext } from "react";
import axios from "axios";



export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();

  const {dispatch, isFetching} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type:"LOGIN_START"});
    try {
        const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
      res.data && window.location.replace("/");
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"});
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={(e)=>handleSubmit(e)}>
        <label>Username</label>
        <input 
          className="loginInput" 
          type="text" 
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input 
          className="loginInput" 
          type="password" 
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button 
          className="loginButton" 
          type="submit"
          disabled={isFetching}
        >
          Login
        </button>
        <p>Don't have an account? <Link to='/register' className='link' >Register</Link></p>
      </form>
    </div>
  );
}

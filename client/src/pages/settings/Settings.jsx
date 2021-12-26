import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const {user, dispatch} = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [sucess, setSucess] = useState(false);

  const PublicFolder = "http://localhost:5000/img/";


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const updatedUser = {
      userId : user._id,
      username,
      email,
      password,
    }
    //image
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name",fileName);
      data.append("file",file);
      updatedUser.photo = fileName;
      try {
        await axios.post("/upload",data)
      } catch (error) { }
    }
    
    try {
      const res = await axios.put("/users/"+user._id,updatedUser);
      dispatch({type:"UPDATE_SUCCESS", payload: res.data });
      setSucess(true);
    } catch (error) 
    {
      dispatch({type:"UPDATE_FAILURE"})
     }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="settingsTitleUpdate">Update Your Account</span>
            {sucess && (
              <span className="settingsTitleUpdate" style={{color:"green", textAlign:"center"}}>Your Account has been updated successfuly</span>
            )}
            <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>


            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={file ? (URL.createObjectURL(file)) : (PublicFolder+user.profilePic)}
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>{" "}
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className="settingsPPInput"
                onChange={e=>setFile(e.target.files[0])} 
              />
            </div>


            <label>Username</label>
            <input 
              type="text" 
              placeholder={user.username} 
              name="name" 
              onChange={e=>setUsername(e.target.value)}
            />
            <label>Email</label>
            <input 
              type="email" 
              placeholder={user.email} 
              name="email"
              onChange={e=>setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
              type="password" 
              onChange={e=>setPassword(e.target.value)}
            />


            <button className="settingsSubmitButton" type="submit">
              Update
            </button>


        </form>
      </div>
      <Sidebar />
    </div>
  );
}

import { Link } from "react-router-dom";
import "./sidebar.css";
import React, {useState, useEffect} from "react";
import axios from "axios";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    }
    getCats();
  }, [])
  return (
    <div className="sidebar">


      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
         {cats.map((c)=> (
            <li className="sidebarListItem">
              <Link className="link" to={`/?cat=${c.name}`}>
                {c.name}
              </Link>
            </li>
         ))}
        </ul>
      </div>



      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="http://localhost:5000/img/sidebar.jpeg"
          alt=""
        />
        <p>
            I fell in love with programming and I have at least learnt something, I think… 🤷‍♂️
        <br/>             <br/> 
            My field of Interest's are building new Web Technologies and Products.
        <br/>             <br/> 
            With Modern Javascript Frameworks like Node.js and React.js  
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>  


      
    </div>
  );
}

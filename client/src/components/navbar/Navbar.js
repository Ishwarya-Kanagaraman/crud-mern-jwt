import React from "react";
import { Link,useHistory } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  const userToken = localStorage.getItem("token");
  const history=useHistory();

  const logout=()=>{
             localStorage.removeItem("token");
             history.push("/register");
  }

  const renderList=()=>{
    if(userToken){
      return [
<li key="1">
              <Link className="listLink" to={userToken ? '/':'/register'}>
                Home
              </Link>
            </li>,
            <li key="2">
              <Link className="listLink" to="/movies">
                Movies
              </Link>
            </li>,
            <li key="3">
              <Link className="listLink" to="/about">
                About
              </Link>
            </li>,
            <li key="4">
              <Link className="listLink" to="/register">
               <button type="button" className="btn btn-danger" 
               onClick={()=>logout()}
               >Logout</button>
              </Link>
            </li>
      ]
    }
    else{
      return [
<li key="5">
              <Link className="listLink" to="/register">
                Sign Up
              </Link>
            </li>,
            <li key='6'>
              <Link className="listLink" to="/login">
                Sign in
              </Link>
            </li>
      ]
    }
  }
  return (
    <div className="navbar">
      <ul className="navlists">
        {renderList()}
      </ul>
    </div>
  );
}

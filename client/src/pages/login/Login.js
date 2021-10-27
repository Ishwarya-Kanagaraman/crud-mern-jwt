import React ,{useState}from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from "axios";
export default function Create() {
    const history=useHistory();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    // const [data,setData]=useState()
   const updatingData={
      email,
      password
   }
    const loginUser=async()=>{
       
       await axios.post(`http://localhost:4001/login`, updatingData
        )
        .then(res=>localStorage.setItem("token",res.data.token))
        history.push("/")
    }
   
    return (
        <>
        <h2>Welcome Back...!</h2>
        <form className="createForm">
           
            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email"/>

            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            <button type="button" className="btn btn-primary text-center" id="create"
            onClick={()=>loginUser()} 
            style={{margin:"20px 500px"}}
            >
               Login
              </button>
              <Link style={{display:"block",textAlign:'center',textDecoration:'none'}}to="/register">Don't Have an account? </Link>
        </form>
        </>
    )
}

import React ,{useState}from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from "axios";
export default function Create() {
    const history=useHistory();
    
    const [first_name,setfirst_name]=useState('')
    const [last_name,setLast_name]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
   const updatingData={
      first_name,
      last_name,
      email,
      password
   }
   console.log(updatingData)
    const signupUser=async()=>{
       
       await axios.post(`http://localhost:4001/register`,
           
         updatingData
        )
        .then(res=>console.log(res))
        history.push("/login")
    }
   
    return (
        <>
        <h2>Welcome...!</h2>
        <form className="createForm">
            <input type="text" onChange={(e)=>setfirst_name(e.target.value)}placeholder="first Name"/>
            <input type="text"  onChange={(e)=>setLast_name(e.target.value)}placeholder="last Name"/>

            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email"/>

            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            <button type="button" class="btn btn-primary" id="create"
            onClick={()=>signupUser()} 
            style={{margin: '20px 500px'}} >
               Register
              </button>
              <Link style={{display:"block",textAlign:'center',textDecoration:'none'}}to="/login">Already Have an account? </Link>
        </form>
        </>
    )
}

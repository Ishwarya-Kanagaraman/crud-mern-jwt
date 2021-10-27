import React ,{useState}from 'react'
import { useHistory } from 'react-router-dom'
import "./create.css"
import axios from "axios";
export default function Create() {
    const history=useHistory();
    
    const [movie_name,setMovie_Name]=useState('')
    const [movie_desc,setMovie_desc]=useState('')
    const [img,setImg]=useState('')
    const [duration,setDuration]=useState('')
    const token=localStorage.getItem("token") ;
   const updatingData={
       movie_name ,
       movie_desc ,
       img ,
       duration  ,
       token
   }
   console.log(updatingData)
    const createMovie=async()=>{
       
       await axios.post(`http://localhost:4001/movies/`,updatingData )
        .then(res=>console.log(res))
        history.push("/movies")
    }
   
    return (
        <>
         <div>
    <button type="button"  className="btn btn-primary" onClick={()=>history.push("/")}>
    <i className="fas fa-arrow-left" style={{marginRight:"5px"}}></i>Go Home</button>

    </div>
        <h2>Add new Movie</h2>
        <form className="createForm">
            <input type="text" onChange={(e)=>setMovie_Name(e.target.value)}placeholder="title"/>
            <input type="text"  onChange={(e)=>setMovie_desc(e.target.value)}placeholder="description"/>

            <input type="text" onChange={(e)=>setImg(e.target.value)} placeholder="imgUrl"/>

            <input type="text" onChange={(e)=>setDuration(e.target.value)} placeholder="duration"/>
            <button type="button" className="btn btn-primary" id="create"
            onClick={()=>createMovie()} 
           style={{margin: '20px auto'}} >
               Create
              </button>
        </form>
        </>
    )
}

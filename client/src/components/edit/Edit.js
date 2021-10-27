import axios from 'axios';
import React ,{useState}from 'react'
import { useLocation,useHistory } from 'react-router-dom'
import "./edit.css"
export default function Edit() {
    const history=useHistory();
    const location=useLocation();
    const movie=location.movie;
    const [movie_name,setMovie_Name]=useState(null)
    const [movie_desc,setMovie_desc]=useState(null)
    const [img,setImg]=useState(null)
    const [duration,setDuration]=useState(null)
    console.log(movie._id);
    const token=localStorage.getItem("token") ;
 
    const updatingData = {

        id: movie._id,
        movie_name: movie_name === null ? movie.movie_name : movie_name,
        movie_desc: movie_desc === null ? movie.movie_desc : movie_desc,
        img: img === null ? movie.img : img,
        duration: duration === null ? movie.duration : duration,
        token
      };
      const updateMovie = async () => {
        await axios
          .patch(`http://localhost:4001/movies/update/`,  
          
             
           updatingData )
          .then((res) => console.log(res))
          .catch(err=>console.log(err.msg))
         history.push("/movies");
      };
   console.log()
    return (
        <>
        <div>
    <button type="button"  className="btn btn-primary" onClick={()=>history.push("/")}>
    <i className="fas fa-arrow-left" style={{marginRight:"5px"}}></i>Go Home</button>

    </div>
        <h2>Edit Your Data</h2>
        <form className="editForm">
            <input type="text" onChange={(e)=>setMovie_Name(e.target.value)}placeholder={movie.movie_name}/>
            <input type="text"  onChange={(e)=>setMovie_desc(e.target.value)}placeholder={movie.movie_desc}/>

            <input type="text" onChange={(e)=>setImg(e.target.value)} placeholder={movie.img}/>

            <input type="text" onChange={(e)=>setDuration(e.target.value)} placeholder={movie.duration}/>
            <button type="button" id="update"className="btn btn-primary" 
            onClick={()=>updateMovie()} 
            >
               Update
              </button>
        </form>
        </>
    )
}

import React, { useEffect, useState } from "react";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import "./movie.css";
export default function Movie() {
  const history=useHistory()
  const [movies, setMovies] = useState([]);
  const token=localStorage.getItem("token") ;

  const getMovies=()=>{
    fetch("https://jwt-crud-mern.herokuapp.com/movies", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => setMovies(res.movieList));
  }
  useEffect(() => {
    getMovies()
  }, []);
  console.log(movies);


  const deleteMovie=(movie)=>{
      alert(`Are you sure want to delete this movie ${movie.movie_name}?`)
      axios.delete(`https://jwt-crud-mern.herokuapp.com/movies/${movie._id}?token=${token}`).then(res=>console.log(res))
      getMovies();

  }
  console.log(localStorage.getItem("token") )

 
  return (
    <>    
    <div className="backbtn">
    <button type="button"  className="btn btn-primary" onClick={()=>history.goBack()}>
    <i className="fas fa-arrow-left" style={{marginRight:"5px"}}></i>Go Back</button>

    </div>
      <div className="movList">
        {movies.map((movie) => (
          <div key={movie._id} className="movieContainer">
            <img src={movie.img} alt="" />
            <h4>{movie.movie_name}</h4>
            <p className="desc">{movie.movie_desc}</p>
            <p className="duration">{movie.duration}</p>
            <div className="butonDiv">
              <button type="button" className="btn btn-warning">
                  <Link className="editLink" to={token ? {pathname:"/edit",movie:movie} : "/login"}>
                Edit</Link>
              </button>
              <button type="button" className="btn btn-danger" onClick={()=>token ? deleteMovie(movie) : history.push("/login")}>
                Delete
              </button>
            </div>
            
          </div>
        ))}
         <button type="button" id="add"className="btn btn-primary">
      <i className="fas fa-plus"></i>
      <Link className="editLink" to={token ? "/create": "/login"}>
        Add New Movie</Link>
      </button>
      </div>
      
      
    </>
  );
}

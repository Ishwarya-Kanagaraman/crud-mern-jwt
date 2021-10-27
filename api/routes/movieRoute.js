const Movie=require("../model/movie");
const router = require("express").Router();
const auth=require("../middleware/auth")

// get all movies
router.get("/",async(req,res)=>{
    try{
        const movieList=await Movie.find();
        res.status(200).json({movieList});
    }catch(err){
      return res.send(err.message);
    }
    
})
router.get("/find/:id",auth,async(req,res)=>{
    try{
      const {id} = req.params;
        const movie=await Movie.findOne({_id:id});
        res.status(200).json({movie});
    }catch(err){
      return res.send(err.message);
    }
    
})

// create movies
router.post("/",auth,async(req,res)=>{
    try{
      const newMovie= await new Movie(req.body);
      await newMovie.save();
        res.status(200).json({newMovie});
    }catch(err){
      return res.send(err.message);
    }
    
})

// update
router.patch("/update",auth,async(req,res)=>{
    try{
        
      const { id,movie_name,movie_desc,img,duration}= req.body;

      const dbMovie= await Movie.findOne({_id:id});
      if(movie_name){
        dbMovie.movie_name=movie_name;
      }
      if(movie_desc){
        dbMovie.movie_desc=movie_desc;
      }
      if(img){
        dbMovie.img=img;
      }
     if(duration){
      dbMovie.duration=duration;
     }
     console.log(dbMovie);

      await dbMovie.save();
      res.status(200).json({msg:"Updated successfully",dbMovie});
    }catch(err){
      return res.send(err.message);
    }
    
})

// delete 

router.delete("/:id",auth,async(req,res)=>{
    try{
        const {id} = req.params;
        const movie=await Movie.findOneAndDelete({_id:id})
        res.json({msg:"Deleted Successfully",movie_name:movie.movie_name})
    }catch(err){
        return res.json(err)
    }
   
})


module.exports=router;


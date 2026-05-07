const jwt = require ("jsonwebtoken");
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const Movie = require ("../models/Movie");
const addMovie = async (req, res, next) => {
    const adminId = req.adminId;
    
    const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
    if (!title || !title.trim() || !description || !description.trim() || !releaseDate || !posterUrl || !posterUrl.trim()) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }
    
    let movie;
    try {
        movie = new Movie({
            title,
            description,
            releaseDate: new Date(`${releaseDate}`),
            featured,
            actors,
            admin: adminId,
            posterUrl,
            
        });
        const adminUser = await Admin.findById(adminId);
        if (!adminUser) {
            return res.status(404).json({ message: "Admin not found" });
        }
        await movie.save();
        adminUser.addedMovies.push(movie);
        await adminUser.save();
        
     }
    catch (error) { 
        return next(error);   
    }
    if (!movie) {
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
   return res.status(201).json({movie});
};


const getAllMovies = async (req, res, next) => {
    let movies;
    try { 
        movies = await Movie.find();
    }
    catch (err) {
        return next(err);
    }
    if (!movies){
     
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
    return res.status(200).json({movies});
}
const getMovieById = async (req, res, next) => { 
    const id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id);
    } catch (err) { 
        return next(err);
    }
    if (!movie){
        return res.status(500).json({
            message: 'Something went wrong',
        });
    }
    return res.status(200).json({movie});
    
}


module.exports = {getAllMovies, addMovie, getMovieById}
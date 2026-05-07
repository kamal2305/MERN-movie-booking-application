const express = require ("express");
const { addMovie, getAllMovies, getMovieById } = require ("../controllers/movie-controller");
const movieRouter = express.Router();


const authMiddleware = require("../utils/auth");

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", authMiddleware, addMovie);


module.exports = movieRouter;
const Booking = require("../models/Booking");
const User = require("../models/User");
const Movie = require("../models/Movie");
const mongoose = require("mongoose");
const newBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;

    let existingMovie;
    let existingUser;
    let booking;

    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (err) {
        return next(err);
    }

    if (!existingMovie) {
        return res.status(404).json({ message: "Movie not found by given id" });
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User not found by given id" });
    }

    try {
        booking = new Booking({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user,
        });

        await booking.save();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);

        await existingUser.save();
        await existingMovie.save();

    } catch (error) {
        return next(error);
    }

    return res.status(201).json({ booking });
};

const getBookById = async (req, res, next) => { 
    const { id } = req.params;
    let booking;
    try {
        booking = await Booking.findById(id).populate("movie user");
    }
    catch (err) {
        return next(err);
    }
    if (!booking) {
        return res.status(404).json({ message: "Booking not found by given id" });
    }
    return res.status(200).json({ booking });
}
const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    try {
        booking = await Booking.findById(id).populate("user movie");
        if (!booking) {
            return res.status(404).json({ message: "Booking not found by given id" });
        }
        booking.user.bookings.pull(booking._id);
        booking.movie.bookings.pull(booking._id);
        
        await booking.movie.save();
        await booking.user.save();
        await booking.deleteOne();
    }
    catch (err) {
        return next(err);
    }
    return res.status(200).json({ message: "Booking deleted successfully" });
}


module.exports = { newBooking, getBookById,deleteBooking }
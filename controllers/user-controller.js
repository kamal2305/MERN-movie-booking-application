const User = require ("../models/User");
const Booking = require("../models/Booking");
const bcrypt = require ( "bcryptjs");

const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find().select("-password");
    }
    catch(err) {
        return next(err);
    }
    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No Users Found" })
    }
    return res.status(200).json({ users });
};
// validation check for the user 
const signup  = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !name.trim() || !email || !email.trim() || !password || !password.trim()) {
        return res.status(422).json({ message: "Invalid Input data" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    let user;
    try {
        user = new User({ name, email, password: hashedPassword });
        user = await user.save();
        
    } catch(err) {
        return next(err);
    }
    if (!user) {
        return res.status(500).json({ message: "Unexpected Error Occurred" })
    }
    return res.status(201).json({ id: user._id});
};

const updateUser = async (req, res, next) => {
    
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name || !name.trim() || !email || !email.trim() || !password || !password.trim()) {
        return res.status(422).json({ message: "Invalid Input data" });
    }
    let user;
    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        user = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: true, runValidators: true });
    } catch(errr) {
        return next(errr);
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({
        message: "Updated Successfully"
    });
};

 const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id);
    } catch(err) {
        return next(err);
    }
    if (!user) {
        return res.status(500).json({ message: "Unexpected Error Occurred" })
    }
    res.status(200).json({
        message: "Deleted Successfully"
    });
}
 const login = async (req, res, next) => { 
    const {email, password } = req.body;
    if (!email || !email.trim() || !password || !password.trim()) {
        return res.status(422).json({ message: "Invalid Input data" });
    }
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch(err) {
        return next(err);
    }
    if (!existingUser) {
        return res.status(404).json({ message: "Unable to find the user from this id"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }
    return res.status(200).json({ message: "login successfull", id: existingUser._id });
 }
 
const getBookingsofUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Booking.find({ user: id }).populate("movie");
    } catch(err) {
        return next(err);
    }
    if (!bookings) {
        return res.status(500).json({ message: "Unexpected Error Occurred" })
    }
    return res.status(200).json({ bookings});   
}
const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id).select("-password");
    }
    catch(err) {
        return next(err);
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({ user });
};
 
module.exports = {login, getAllUser, updateUser, deleteUser, signup, getBookingsofUser,getUserById}
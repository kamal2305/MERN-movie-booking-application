const express = require ("express");
const app = express();
const dotenv  = require ('dotenv');
const userRouter  = require ("./routes/user-routes.js");
const adminRouter  = require  ("./routes/admin-routes.js");
const movieRouter  = require  ("./routes/movie-routes.js");
const bookingRouter = require("./routes/booking-routes.js");
const cors = require('cors');
const connectDB = require("./utils/dbConnect");
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 4000;

//middleware routes
app.use(express.json());
app.use("/user", userRouter); 
app.use("/admin", adminRouter); 
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);   

connectDB();

    app.listen(PORT,()=>{
        console.log(`SERVER RUNNING ON ${PORT}`);
    })

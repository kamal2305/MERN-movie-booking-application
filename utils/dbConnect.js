const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Connection = () => {
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI is not set; skipping database connection.");
    return;
  }

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB CONNECTED!"))
    .catch((err) => console.log(err));
};
module.exports = Connection;

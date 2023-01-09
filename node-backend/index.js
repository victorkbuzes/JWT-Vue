require("dotenv/config");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/AuthRoutes")


const app = express();

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connected to database");
})
.catch((error) => {
  console.log(error.message);
  process.exit(1);
});



app.use(cors())




app.listen(8080, ()=> {
  console.log("listening on port 8080");
})
app.use(cookieParser())
app.use(express.json());
app.use("/", authRoutes)


// const { API_PORT } = process.env;
// const port = process.env.PORT || API_PORT;

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
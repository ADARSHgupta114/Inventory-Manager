const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute")
const errorHandler = require("./middleWare/errorMiddleWare")
const app = express();

//MiddleWares

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
  
    // Routes Middleware
app.use("/api/users",userRoute)
//Routes
app.get("/",(req,res)=>{
    res.send("Home page");
});

const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', false);
// Error MiddleWare
app.use(errorHandler);
// Connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
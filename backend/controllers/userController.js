const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

         //Token Generation 
    const generateToken = (id) => {
        return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"});
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }


  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });
  //Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only Cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Login User

const loginUser = asyncHandler( async(req,res)=>{
    const {email,password} = req.body;
  //Validate Request
  if(!email || !password){
    res.status(400);
    throw new Error("Please enter email & Password");
  }
    ////Check User Exist or Not
    const user = await User.findOne({email})
    if(!user){
      res.status(400);
      throw new Error("User Not Found");
    }

    const passwordIsCorrect = await bcrypt.compare(password,user.password)
    const token = generateToken(user._id);

  // Send HTTP-only Cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

    if(user && passwordIsCorrect){
      const{_id,name,email,photo,phone,bio} = user;
      res.status(200).json({
        _id,
        name,
        email,
        photo,
        phone,
        bio,
        token,
      });
    } else{
      res.status(400);
      throw new Error("Invalid Email or Password");
    }
});
//Logout
const logout = asyncHandler( async(req,res)=>{
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
})
//Get user
const getuser = asyncHandler( async(req,res)=>{
  res.send("Userdata");
})

module.exports = {
  registerUser,
  loginUser,
  logout,
  getuser,
};

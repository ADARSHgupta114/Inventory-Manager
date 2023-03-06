const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please add a Name"]
    },
    email:{
        type: String,
        required: [true,"Please add an Email"],
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please enter a vaild email"]
    },
    password:{
        type: String,
        required: [true,"Please add a Password"],
        minLength:[6,"Password Must be upto 6 characters"],  
    },
    photo:{
        type:String,
        required: [true,"please upload a photo"],
        default:"https://cdn-icons-png.flaticon.com/512/20/20079.png"
    },
    phone:{
        type: String,
        default: "+91"
    },
    bio:{
        type: String,
        maxLength:[250,"Bio must not be more than 250 character"],
        default:"bio",
    },
}, {
    timestamps: true
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return  next();
    }


  //Encrypt Password
  const salt = await bcrypt.genSalt(10)
  const hashedPasssword = await bcrypt.hash(this.password,salt);
  this.password = hashedPasssword;
  next();

})

const User = mongoose.model("User",userSchema)
module.exports = User;
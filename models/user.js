const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide your name"],
    maxLength: [40, "Name should be under 40 characters"],
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    validate: [validator.isEmail, "please provide email in correct format"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    select: false,
  },
  chats:[
    {
      theme: {
        type: String,
      },
      chatId: {
        type: String,
      },
      messages:[
        {
          message:{
            type:String
          },
          user_role:{
            type:String
          },
          Date:{
            type:String,
            default:new Date().toLocaleDateString()
          },
          time:{
            type:String,
            default:new Date().toLocaleTimeString()
          },
          reply:{
              type:String
          }, 
          error:{
              type:String
          }
        }
      ]
    }
  ],
  
  forgotPasswordToken:String,
  
  forgotPasswordExpiry:{
      type:Number
   },

   createdAt:{ 
       type:Number 
   }

});

//encrypt before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

//create and return jwt token
userSchema.methods.getJwtToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//generate forgot password token
userSchema.methods.getForgotPasswordToken = function () {
  //generate random string
  const forgotToken = crypto.randomBytes(20).toString("hex");

  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  //time of token
  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

  return forgotToken;
};

module.exports = mongoose.model("User", userSchema);
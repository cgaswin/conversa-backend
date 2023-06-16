const Chats = require("../models/chats")
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../errors/customError");
const { v4: uuidv4 } = require('uuid');

exports.createChat = BigPromise(async (req,res,next)=>{
    const id = uuidv4();
})
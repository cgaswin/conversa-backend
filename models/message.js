const express = require("express")
const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    reply:{
        type:String
    },
    error:{
        type:String
    }
})


module.exports = mongoose.model("Message",messageSchema)
const express = require("express")
const mongoose = require("mongoose")


const chatSchema = new mongoose.Schema({
    theme:{
        type:String,
        required:true
    },
    message:{
        type:mongoose.Schema.ObjectId,
        ref:"Message",
        required:true
    }
})


module.exports = mongoose.model("Chat",chatSchema)
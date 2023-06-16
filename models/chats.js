const express = require("express")
const mongoose = require("mongoose")


const chatsSchema = new mongoose.Schema({
    chats:[{
        chat:{
            type:mongoose.Schema.ObjectId,
            ref:"Chat",
            required:true
        }
    }]
})


module.exports = mongoose.model("Chats",chatsSchema)
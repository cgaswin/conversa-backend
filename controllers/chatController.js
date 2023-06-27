const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../errors/customError");
const User = require("../models/user");
const mongoose = require("mongoose")


exports.createChat = BigPromise(async (req,res,next)=>{
    const {newMessage,chatId,userId} = req.body
    const { text,user_role } = newMessage
    const theme = "dummyTheme"
    

    if(!chatId){
        return next(new CustomError("chatId is mandatory"))
    }

    
    const user = await User.findOne({ _id: userId }).populate({
        path: "chats",
        model: "Chats",
      });
      

    if(!user){
        return next(new CustomError("user not found"))

    }

    console.log(user.chats)

    const chat = user.chats.find((item) => item.chatId === chatId);
    console.log(chat)


    const AddMessage = {
        message:text,
        user_role,
        reply:"dummy",
        error:"dummy"
    }


    if(chat){

        console.log(chat.messages)
        chat.messages.push(AddMessage)
        await user.save()
        console.log("message added successfully")
        res.status(200).json({
            success:true,
            message:"message added sucessfully"
        })

       
    }else{
        const newChat = {
            theme,
            chatId,
            messages:[AddMessage]

        }

        user.chats.push(newChat);
      await user.save();
        console.log("new Chat created an message added successfully!!!")
        res.status(200).json({
            success:true,
            message:"message added sucessfully",
            newChat
        })
    }


})
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../errors/customError");
const User = require("../models/user");
const mongoose = require("mongoose")


exports.findChat = BigPromise(async (req,res,next)=>{
    const { chatId } = req.query;
  const { userId } = req.query;
  console.log(chatId,userId)
    
    const user = await User.findById(userId)

    console.log(user)

    if(!user){
        return next(new CustomError("user not found",400))
    }

    const chat = user.chats.find((item)=>item.chatId == chatId)

    return res.status(200).json(chat);

})

exports.createChat = BigPromise(async (req,res,next)=>{
    const {text,chatId,userId} = req.body
    const theme = "dummyTheme"
    

    if(!chatId){
        return next(new CustomError("chatId is mandatory",400))
    }

    
    const user = await User.findOne({ _id: userId }).populate("chats")
      

    if(!user){
        return next(new CustomError("user not found",400))

    }

    const chat = user.chats.find((item) => item.chatId === chatId);
    console.log(chat)


    const AddMessage = {
        text,
        reply:"hello aswin",
        error:"dummy"
    }



    if(chat){
        console.log(AddMessage)
        chat.messages.push(AddMessage)
        await user.save()
        console.log("message added successfully")
        res.status(200).json({
            success:true,
            message:"message added sucessfully",
            newMsg:user.chats[user.chats.length -1].messages.slice(-1)
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
            newMsg:user.chats[user.chats.length -1].messages.slice(-1)
        })
    }


})
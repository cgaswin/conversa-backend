const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../errors/customError");
const User = require("../models/user");
const mongoose = require("mongoose")
const openai = require("../config/openai")


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



    //open ai
    const response = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: [
                { role: "system", content: 'You are helping me learn English, and I would like your assistance. Whenever the user speaks, please respond in a human-like manner without mentioning that you are an AI. Additionally, I would like you to identify any errors in the user\'s sentence, such as grammatical errors, punctuation mistakes, or incorrect sentence formation. Please provide the reply and the corrected version of the user\'s sentence in JSON format, like this: { "reply": "bot reply", "error": "corrected version of the user\'s sentence" }. If no errors are found, please set the error field as No errors found. Please note that you should not provide any other reply than this.' }, // this represents the bot and what role they will assume
                { role: "user", content: `user: ${text}` }, // the message that the user sends
        
              ],
              max_tokens: 2048
            });

  console.log(response.data.choices[0].message.content)
  const content = response.data.choices[0].message.content

  // Parse the JSON content into an object
const parsedContent = JSON.parse(content);

// Extract the "reply" and "error" values
const { reply, error } = parsedContent;

    const AddMessage = {
        text,
        reply,
        error
    }

    console.log(AddMessage)



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
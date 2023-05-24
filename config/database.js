const mongoose = require("mongoose")

const connectWithDb = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("connection to database successfull"))
    .catch((error)=>{
        console.log("connection to database failed")
        console.log(error)
        process.exit(1)
    })
}

module.exports = connectWithDb
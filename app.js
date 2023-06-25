const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require("cookie-parser");
const app = express();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use(cors({
    origin:"*"
}))
app.use(morgan("tiny"))

//import all routes
const user = require("./routes/user")

//router middleware
app.use("/api/v1",user)

module.exports = app
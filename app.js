const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require("cookie-parser");
const app = express()

//regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use(cors)
app.use(morgan("tiny"))



module.exports = app
const express = require("express")
const router = express.Router()
const {createChat} = require("../controllers/chatController")

router.route("/chat").post(createChat)


module.exports = router
const express = require("express")
const router = express.Router()
const {createChat,findChat} = require("../controllers/chatController")

router.route("/chat").post(createChat)
router.route("/chat").get(findChat)



module.exports = router
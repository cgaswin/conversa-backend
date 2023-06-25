const express = require("express")
const router = require("express").Router()
const {signup,login,logout,changePassword} = require("../controllers/userController")

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").get(logout)
//router.route("/password/update").put(changePassword)


module.exports = router

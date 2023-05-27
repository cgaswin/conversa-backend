const express = require("express")
const router = require("express").Router()
const {signup,login,logout,changePassword} = require("../controllers/userController")
const { isLoggedIn } = require("../middlewares/user")

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/password/update").put(isLoggedIn,changePassword)



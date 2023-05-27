const express = require("express")
const router = require("express").Router()
const {signup} = require("../controllers/userController")

router.route("/signup").post(signup)
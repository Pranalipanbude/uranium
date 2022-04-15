const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController");
const bookModels  = require("../models1/bookModels.js");
const authormodel = require("../models1/authorModel.js");
const {Router}  = require('express');

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", UserController.createBook  )
router.get("/getBooksData",UserController.getBooksData)
router.post("/BookList", UserController.getBooksData)
router.get("/getBooksInYear",UserController.getBooksInYear)
router.get("/getParticularBooks",UserController.getParticularBooks)
router.get("/getXINRBooks",UserController.getXINRBooks)
router.get("/getRandomBooks",UserController.getRandomBooks)






router.post("/createAuthor",bookModels.createAuthor)
router.post("/createBook",bookModels.createBook)
router.get("/allBooks ",bookModels.allBooks )
router.get("/upadatedbookPrice",bookModels.upadatedbookPrice )
router.get("/authorName",bookModels.authorName)
module.exports = router;
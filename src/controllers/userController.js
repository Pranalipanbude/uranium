const UserModel= require("../models/userModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}


const getBooksData= async function (req, res) {
    let allBooks= await UserModel.find()
    res.send({msg: allBooks})
}

const BookList= async function (req, res) {
    let author = req.body.authorName
    let bName = req.body.BookName
    let allBooks= await UserModel.find({authorName:author},{BookName:bName})
    res.send({msg: allBooks})
}

const getBooksInYear=async function (req, res) {
    let year = req.body.year
    let allBooks= await UserModel.find({year:year})
    res.send({msg: allBooks})
}

const getParticularBooks= async function (req, res){
    let allBooks= await UserModel.find({BookName: /^Int/ })
    res.send({msg: allBooks}) 
}


const getXINRBooks= async function (req, res){
    let allBooks= await UserModel.find({prices,indianPrice:{$in: ["100","200","500"]}})
    res.send({msg: inxBooks}) 
}

const getRandomBooks= async function (req, res){
    let allBooks= await UserModel.find({$or: [{stockAvailable: "true"}, {tatalpages: {$gt: 500}}]})
    res.send({msg: randomBooks})
}

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.BookList= BookList
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandomBooks = getRandomBooks
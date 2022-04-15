const mongoose = require("mongoose")


const authormodel = new mongoose.Schema({
    bookname: String,
    author_id:  Number, 
    authorName:  String,
    age:  Number,
    address: String,
});


module.exports = mongoose.model("author", authormodel)
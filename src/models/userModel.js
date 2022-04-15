const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {

    bookName: {type: String, required:true},
    authorName:String,
    price:{
        indian: String,
        european : String,

    },

   
    year: Number,
    tags: [String],
    totalpages: Number,
    stockAvailable: Boolean,

},
{ timestamps: true });

module.exports = mongoose.model('Books', bookSchema)//user


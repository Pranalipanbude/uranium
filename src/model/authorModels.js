const mongoose = require("mongoose")


const authorschema = new mongoose.Schema({
     fname: String, 
     lname: String, 
     title:{ 
         type:String, 
         enum:[Mr, Mrs, Miss]
      }, 
    emailId: {
        type: String,
        validate:[isEmail, "invalid email"],
        unique:true
    },
      password:{
        type: String,
        required:true
        } 
    
},{ timestamps: true });


module.exports = mongoose.model("Author", authorschema)
const authormodel= require("../model/authorModels")

const createAuthor= async function(req, res){
    let data= req.body
   let savedData= await authormodel.create(data)
   res.send({msg: savedData})
}

module.exports.createAuthor=createAuthor

const authorModel=require("../models1/authorModel")
const bookModels = require("../models1/bookModels")


const createAuthor = async function (req,res){
    let data_author = req.body;
    let author_data = await authorModel.create(data_author);
    res.send({data: author_data});
};


const createBook = async function (req,res){
    let data_book = req.body;
    let book_data = await bookData.Create(data_book);
    res.send({data:book_data});
};


const allBooks = async function (req,res){
    let data_written = await author_Data.find({
        author_name: "Chetan Bghat",
    });
}
    const upadatedbookPrice= async function(req,res){
    const book_data = await authorModel.find({name:"rich dad poor dad"})
    const id = book_data [0].author_id
    const author = await bookModels.find({author_id:id}).select({author_name:1, _id:0})

    const  bkName= bookDetails[0].name
    const upadatedPrice =await bookModels.findOneAndUpdate({name:bkName},{price:100},{new:true}).select({price:1,_id:0})

    res.send({msg:author, upadatedPrice})
 
}
const authorName=async function(req,res){
   const booksId = await bookModels.find({price: {$gte:50,$lte:100}}).select({author_id:1,_id:0})
   const id = booksId.map(inp => inp.author_id)

   let temp=[]
   for(let i=0; i<id.length; i++){
      let x = id[i]
      const author = await authorModel.find({author_id:x}).select({author_name:1,_id:0})
      temp.push(author)
   }
   const authorName = temp.flat()

   res.send({msg:authorName})
}


module.exports.createAuthor = createAuthor
module.exports.createBook = createBook
module.exports.allBooks = allBooks
module.exports. upadatedbookPrice= upadatedbookPrice
module.exports. authorName= authorName





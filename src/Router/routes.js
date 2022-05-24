const express = require('express');
const router = express.Router();

const userControllers = require("../Controllers/userControllers")
const bookControllers = require("../Controllers/bookControllers")
const reviewController= require("../Controllers/reviewController")
const authentication = require("../middleware/authentication");
const { route } = require('express/lib/application');


// aws.config.update({
//     accessKeyId: "AKIAY3L35MCRVFM24Q7U",
//     secretAccessKey: "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",
//     region: "ap-south-1"
// })

// // aws.config.update({
// //     accessKeyId: "AKIAY3L35MCRVFM24Q7U",
// //     secretAccessKeyId: "qGG1HE0qRixcW1T1Wg1bv+08tQrIkFVyDFqSft4J",
// //     region: "ap-south-1"
// // })

// let uploadFile= async ( file) =>{
//    return new Promise( function(resolve, reject) {
//     // this function will upload file to aws and return the link
//     let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

//     var uploadParams= {
//         ACL: "public-read",
//         Bucket: "classroom-training-bucket",  //HERE
//         Key: "abc/" + file.originalname, //HERE 
//         Body: file.buffer
//     }


//     s3.upload( uploadParams, function (err, data ){
//         if(err) {
//             return reject({"error": err})
//         }
//         console.log(data)
//         console.log("file uploaded succesfully")
//         return resolve(data.Location)
//     })

//     // let data= await s3.upload( uploadParams)
//     // if( data) return data.Location
//     // else return "there is an error"

//    })
// }

// router.post("/write-file-aws", async function(req, res){

//     try{

//         let files= req.files
//         if(files && files.length>0){
//             //upload to s3 and get the uploaded link
//             // res.send the link back to frontend/postman
//             let uploadedFileURL= await uploadFile( files[0] )
//             res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
//         }
//         else{
//             res.status(400).send({ msg: "No file found" })
//         }
        
//     }
//     catch(err){
//         res.status(500).send({msg: err})
//     }
    
// })


//User Api

router.post("/register", userControllers.registerUser)
router.post("/login", userControllers.userLogIn)


//Book Api

router.post("/books", bookControllers.createBook)
router.get("/books",authentication, bookControllers.getBooks)
router.get("/books/:bookId",authentication, bookControllers.getBooksById)

router.put("/books/:bookId", authentication, bookControllers.updateBooks)
router.delete("/books/:bookId", authentication, bookControllers.deleteBooksById)



//Review Api

router.post("/books/:bookId/review",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId",reviewController.deletedReviews)


module.exports = router
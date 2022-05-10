
const userModels = require("../models/userModels.js");
const bookModels = require("../Models/bookModels.js");
const moment = require('moment')


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidNumber = function (Number) {
    if (typeof Number == NaN || Number === 0) return false;
    return true
}

const isvalidRequestBody = function (requestbody) {
    return Object.keys(requestbody).length > 0;
}


const createBook = async function (req, res) {
    try {

        let data = req.body;

        if (!isvalidRequestBody(data)) {
            return res.send({ status: false, msg: "please provide  details" })
        }
        else {
            const { title, excerpt, userId, ISBN, category, subcategory, review, isDeleted } = data

            if (isDeleted) {
                if (isDeleted == true) {
                    return res.status(400).send({ status: false, msg: "data is not valid" })
                }
            }

            if (!isValid(title)) {
                return res.status(400).send({ status: false, msg: "title is required" })
            }


            let uniqueTitle = await bookModels.findOne({ title: title })
            if (uniqueTitle) return res.status(409).send({ status: false, msg: " title already exists" })



            if (!isValid(excerpt)) {
                return res.status(400).send({ status: false, msg: "excerpt is required" })
            }

            if (!isValid(userId)) {
                return res.status(400).send({ status: false, msg: "userId is required" })
            }

            if (!isValid(ISBN)) {
                return res.status(400).send({ status: false, msg: "ISBN is required" })
            }

            if (!isValid(category)) {
                return res.status(400).send({ status: false, msg: "category is required" })
            }


            if (!isValid(subcategory)) {
                return res.status(400).send({ status: false, msg: "subcategory is required" })
            }

            if (!isValidNumber(review)) {
                return res.status(400).send({ status: false, msg: "number is required" })
            }


        }

        req.body.releasedAt = moment().format('YYYY-MM-DD')
        let saveData = await bookModels.create(data)
        return res.status(201).send({ status: true, msg: saveData })

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: "error", error: error.message })

    }
}

const getBooks = async function (req, res) {
    try {
        let data = req.query
        if (Object.keys(data).length === 0) {
            let allBooks = await booksModel.find({ isDeleted: false }).select({ ISBN: 0, subcategory: 0, deletedAt: 0, isDeleted: 0, createdAt: 0, updatedAt: 0 }).sort({ title: 1 })
            if (allBooks.length == 0) return res.status(404).send({ status: false, msg: "books not found" })
            return res.status(200).send({ status: true, data: allBooks })
        }

        let filterBooks = await booksModel.find({ $and: [data, { isDeleted: false }] }).sort({ title: 1 })

        if (filterBooks.length == 0) return res.status(404).send({ status: false, msg: "no books found" })


        return res.status(200).send({ status: true, data: filterBooks })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

// const getBooks = async function (req, res) {
//     try {
//         let data = req.query;

//         let Bookdata = await bookModels.find({ isDeleted: false })
//         if (!Bookdata) return res.status(404).send({ status: false, msg: "No such Data" })
//         if (Bookdata.length == 0) {
//             return res.status(404).send({ status: false, msg: "No books are present" })
//         }
//         res.status(200).send({ status: true, msg: data })
//     }
//     catch (err) {
//         res.status(500).send({ status: false, msg: err.message })
//     }
// }




const getBooksById = async function (req, res) {
    try {
        const bookId = req.params.bookId;

        if (Object.keys(bookId).length === 0) {
            return res.status(400).send({ status: false, message: "book id is not present" })
        }

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid book id" })
        }

        const foundedBook = await bookModels.findOne({ _id: bookId, isDeleted: false })

        if (!foundedBook) {
            return res.status(404).send({ status: false, message: "book not found" })
        }


        const availableReviews = await reviewModels.find({ bookId: foundedBook._id, isDeleted: false }).select({ isDeleted: 0, createdAt: 0, updateAt: 0 })


        return res.status(200).send({ status: true, message: "Books list", data: foundedBook, reviewData: availableReviews })


    } catch (error) { res.status(500).send({ msg: error.message }) }
}












const updateBooks = async function (req, res) {
    try {


        let body = req.body
        let bookId = req.params.bookId;




        let checkBook = await bookModels.findById(bookId)
        console.log(checkBook)

        if (!checkBook) {
            return res.status(404).send({ status: false, msg: "No book found this bookId" })

        }
        //athentication
        let bookIds = checkBook.userId
        if (!bookIds) {
            return res.status(404).send({ status: false, msg: " book is not present" })
        }
        //authorization
        if (bookIds != req.userId) {
            return res.status(404).send({ status: false, msg: "you are not change the book " })
        }

        if (checkBook.isDeleted == true) {
            return res.status(400).send({ status: false, msg: " Book has deleted " })
        }

        let updatebook = await bookModels.findByIdAndUpdate({ _id: bookId, isDeleted: false }, body, { new: true })

        return res.status(200).send({ status: true, msg: "book update successfully ", data: updatebook })




    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

}
module.exports.updateBooks = updateBooks;
module.exports.getBooksById = getBooksById;
module.exports.createBook = createBook;
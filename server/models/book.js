const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookSchema = new Schema({
	name: String,
	genre: String,
	authorId: String
})

const Book = mongoose.model("book", bookSchema)

module.exports = Book

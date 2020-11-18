const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        isbn: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String
        },
        author: {
            type: String,
            required: true
        },
        published: {
            type: Date
        },
        publisher: {
            type: String
        },
        pages: {
            type: String
        },
        description: {
            type: String
        },
        website: {
            type: String
        }
    }
)

module.exports = mongoose.model('book', bookSchema)
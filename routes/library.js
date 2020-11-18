const express = require('express');
const router = express.Router();
const axios = require('axios');
const book = require('../models/book');

//test add
router.get('/test', (req, res) => {
    book.insertMany(books)
        .then((books) => {
            console.log(books)
        });
})

// Getting all
router.get('/', (req, res) => {

    axios.get('https://swapi.dev/api/people/1')
        .then((response) => {
            const books = book.find()
            response.send(books)
            // console.log(response.headers);
            // res.send(response.data);
            console.log("Promise Resolved")
        })
        .catch((error) => {
            response.status(500).json({ message: error.message })
        })
})

// Getting one
router.get('/:id', (req, res) => {

})

// Creating one
router.post('/', (req, res) => {

})

// Updating one
router.patch('/:id', (req, res) => {

})

// Deleting one
router.patch('/:id', (req, res) => {

})

async function getBook(req, res, next) {
    try{
        book = await book.findById(req.params.id)
        if (book === null) return res.status(404).json({ message: "Cannot find book"});
    } catch (error){

    }
}

module.exports = router
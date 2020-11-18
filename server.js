const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookModel = require('./models/book')
const booksData = require('./data/booksData')
require('dotenv').config();

const app = express();

const port = 3330;

const records = [
    {
        id: Math.round(Math.random() * 1000000),
        title: "Apocalypso",
        artist: "The Presets",
        year: 2008,
        genre: "electronic"
    },
    {
        id: Math.round(Math.random() * 1000000),
        title: "Surfer Rosa",
        artist: "Pixies",
        year: 1988,
        genre: "rock"
    },
    {
        id: Math.round(Math.random() * 1000000),
        title: "Hybrid Theory",
        artist: "Linkin Park",
        year: 2000,
        genre: "nu-metal"
    },
    {
        id: Math.round(Math.random() * 1000000),
        title: "Back in Black",
        artist: "AC/DC",
        year: 1980,
        genre: "rawk"
    }
]

const url = process.env.DB;

//connect db
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', (error)=> {console.error(error)});
db.once('open', () => {console.log("Connected to DB")})

// middleware
app.use(cors())
app.use(express.json())

app.get ('/test-book', (req, res) => {
    bookToAdd = new bookModel({
        isbn: 9781491904244,
        title: "You Don't Know JS",
        author: "Kyle Simpson"
    })
    bookToAdd.save()
        .then((book) => {
            console.log('test book saved')
            console.log(book)
            res.send(book)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
} )

app.get('/test-seed', (req, res) => {
    book.insertMany(booksData);
    res.send(booksData)
})
// get all
app.get('/', async (req, res) => {
    try {
        const books = await bookModel.find()
        res.json(books)
    } catch(error){
        res.status(500).json({ message: error.message })
    }
})
//get one
app.get('/:id', getisbn, (req, res) => {
    res.send(res.params.id)
})
//create one
app.post('/', async (req, res) => {
    const addBook = new bookModel({
        isbn: req.body.isbn,
        title: req.body.title,
        subtitle: req.body.subtitle,
        author: req.body.author,
        published: req.body.published,
        publisher: req.body.publisher,
        pages: req.body.pages,
        description: req.body.description,
        website: req.body.website
    })

    try {
        const newBook = await addBook.save()
        res.status(201).json(newBook)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})
// update one


async function getisbn(req, res, next){
    let book;
    try{
        book = await bookModel.findById(req.params.id);
        if (book === null) {
            return res.status(404).json({ message: 'book not found' });
        }
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
    res.book = book;
    next();
}

app.listen(port, () => {
    console.log(`The API is running at ${port}`)
})
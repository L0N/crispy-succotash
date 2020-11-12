const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
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

const libraryRoutes = require('./routes/library');
app.use('/library', libraryRoutes)

app.get('/', (req, res) => {
    res.send("Hey, the API is working")
})

app.get('/records', (req, res) => {
    console.log(req.query)
    res.send(records)
})

app.post('/records', (req, res) => {
    records.push(req.body)
    res.send(req.body)
})

app.delete('/banana-split', (req, res) => {
    res.send("It's arbitrary, so we didn't delete anything")
})

app.listen(port, () => {
    console.log(`The API is running at ${port}`)
})
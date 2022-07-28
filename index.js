const express = require("express")
const mongoose = require("mongoose") // new
const testRoute = require('./routes/testRoute');
const liveRoute = require('./routes/liveRoute');
const cors = require('cors');
const config = require('config');

// Conn./ect to MongoDB database
mongoose
    .connect(config.get('db'), { useNewUrlParser: true })
    .then(() => {
        console.log("You are now connected to MongoDB!")

        const app = express();
        app.use(express.json());
        app.use(cors());
        app.use('/dacast/test', testRoute);
        app.use('/dacast/live', liveRoute);
        app.all('*', (req, res) => {

            res.status(404).send(`Can't find ${req.originalUrl} on this server.`)
        })


        app.listen(5000, () => {
            console.log("Server is listening on port 5000...")
        })
    })
    .catch(err => console.error('Something went wrong.', err));
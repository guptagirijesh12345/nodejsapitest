const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const adminRoute = require('./routes/admin');

dotenv.config();
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

console.log("Mongo URI:", process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('MongoDB Connected Successfully');
})
.catch((err) => {
    console.log( 'MongoDB Connection Failed');
    console.log(err.message); 
});

app.use('/api/admin', adminRoute);

const PORT = process.env.PORT || 3002;


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
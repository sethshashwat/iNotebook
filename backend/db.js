const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://shashwatseth:Captain123@inotebook.5tuj8.mongodb.net/?retryWrites=true&w=majority&appName=iNotebook"

const connectToMongo = async () => {
    mongoose.connect(mongoURI, await console.log("Database Connected"))
}

module.exports = connectToMongo;
const express = require('express');
const app = express() ;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const postRoute = require('./routes/posts');
const multer = require('multer');

dotenv.config();

app.use(express.json());


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(console.log("Connected to MongoDb")).catch((err)=>console.log(err));

const imgstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images"); // cb or callback to store the image in the public/images folder
    },
    filename : (req, file, cb) => {
        cb(null, req.body.name); // cb or callback to store the image with the name of the post
    }
});

/**
 * @brief Returns a Multer instance that provides several methods for generating middleware that process files uploaded in multipart/form-data format
 * @route POST /api/upload
 */
const upload = multer({storage: imgstorage}); 

/**
 * @brief Returns middleware that processes a single file associated with the given form field. The file is stored in req.file.
 * @route POST /api/upload
 * @access Public
 * @param {file} file
 * @returns {json} json
 */
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use("/api/posts", postRoute);

app.listen("5000", ()=>{
    console.log("Backend started on port 5000");
})
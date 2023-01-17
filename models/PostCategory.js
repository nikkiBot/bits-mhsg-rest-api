const mongoose = require('mongoose');

const PostCategorySchema = new mongoose.Schema(
    { //first object is the schema
        categoryName: {
            type: String,
            required: true,
            unique: true
        },
    },
    { //next object for timestamps
        timestamps: true
    }
);

module.exports = mongoose.model("PostCategory", PostCategorySchema); //first argument is the name of the model, second argument is the schema
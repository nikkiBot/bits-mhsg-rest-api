const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        postDescription: {
            type: String,
            required: true
        },
        postCover: {
            type: String,
            required: true 
        },
        postAuthor: {
            type: String,
            required: true
        }
    },
    { timestamps: true} // This will automatically add the createdAt and the updatedAt field for us, a different object from our Post object itself in PostSchema
)

module.exports = mongoose.model("Post", PostSchema); //first argument is the name of the model, second argument is the schema
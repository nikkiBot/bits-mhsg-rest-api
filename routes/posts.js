const router = require('express').Router();
const Post = require('../models/Post');
const PostCategory = require('../models/PostCategory');
// const brcypt = require('bcrypt');

// CREATE POST
router.post('/post', async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save(); //save() is a mongoose method
        res.status(200).json(savedPost); //200 is the status code for working
    } catch(err){
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id); //findById is a mongoose method to find a post by its id, using await because it is an async function and we need to wait for the response
        try{
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body //$set is a mongoose method to update the post to req.body
            }, {new: true}); //new: true is a mongoose method to return the updated post 
            res.status(200).json(updatedPost);
        } catch(err){
            res.status(500).json(err);
        }
    } catch(err) {
        res.status(500).json(err);
    }
});


// DELETE POST
router.delete("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id); //findById is a mongoose method to find a post by its id, using await because it is an async function and we need to wait for the response
        if(post.title === req.body.title){ //check if the post is the same as the one we want to delete
            try{
                await post.delete(); //delete() is a mongoose method to delete the post
                res.status(200).json("Post has been deleted");
            } catch(err){
                res.status(500).json(err);
            }
        }
        else {
            res.status(401).json("Error deleting");
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
    const postAuthor = req.query.postAuthor;
    const postTitle = req.query.title;

    try{
        let posts; //posts is an array of posts
        if(postAuthor){
            posts = await Post.find({postAuthor}); //find() is a mongoose method to find a post by its author
        }
        else if(postTitle){
            posts = await Post.find({title: {$regex: postTitle}}); //find() is a mongoose method to find a post by its title and 
        }
        else if(postCategory){
            posts = await Post.find({
                categories: { $in: [PostCategory] } //find all posts that belong to same category as the one we are looking for
            })
        }
        else{ //if there is no query, then we return all the posts
            posts = await Post.find();
        }
        res.status(200).json(posts); //return the array once we have it
    }
    catch(err){
        res.status(500).json(err);
    }
});

// GET A SINGLE POST
router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id); //findById is a mongoose method to find a post by its id, using await because it is an async function and we need to wait for the response
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Get posts by category
router.get("/category/:category", async (req, res) => {
    try{
        const posts = await Post.find({
            categories: { $in: [req.params.category] } //find all posts that belong to same category as the one we are looking for
        })
        res.status(200).json(posts);
    }  
    catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;
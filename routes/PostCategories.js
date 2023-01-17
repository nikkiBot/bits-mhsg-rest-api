const router = require('express').Router();
const PostCategory = require('../models/PostCategory');

//Make a new post category
router.post('/', async (req, res) => {
    const newPostCategory = new PostCategory(req.body);
    try {
        const savedPostCategory = await newPostCategory.save();
        res.status(200).json(savedPostCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get all post categories
router.get('/', async (req, res) => {
    try{
        const postCategories = await PostCategory.find();
        res.status(200).json(postCategories);
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
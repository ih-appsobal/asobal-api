const Post = require('../models/post.model');

module.exports.create = async(req, res) => {
    
    try {

        const post = new Post(req.body);

        await post.save();

        res.status(200).json(post);

    } catch (error) {

        console.log(error.message);

    };
};

module.exports.list = async(_, res) => {
    const allPosts = await Post.find();

    res.status(200).json(allPosts);
};
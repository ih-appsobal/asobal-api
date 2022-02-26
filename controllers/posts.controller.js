const Post = require('../models/post.model');

module.exports.create = async(req, res, next) => {
    
    try {

        const post = new Post(req.body);

        await post.save();

        res.status(200).json(post);

    } catch (error) {
        next(error)
        console.log(error.message);

    };
};

module.exports.list = async(_, res, next) => {

    try {

        const allPosts = await Post.find();

        res.status(200).json(allPosts);

    } catch (error) {
        
        next(error)
    }
};

module.exports.onePost = async(req, res, next) => {
    try {
        
        const post = await Post.findById(req.params.postId);

        res.status(200).json(post);

    } catch (error) {
        
        next(error);
        console.log(error.message);
    };
};
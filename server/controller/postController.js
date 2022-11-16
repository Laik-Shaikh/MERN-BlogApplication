const { request, response } = require('express');
const Post = require('../model/postModel');

exports.createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

exports.getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}

exports.getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

exports.updatePost = async (request, response) => {
    try {
        let post = await Post.findById(request.params.id);
        if(!post) {
            return response.status(404).json({
                msg: "Post not Found!...."
            })
        }
        await Post.findByIdAndUpdate(request.params.id, { $set: request.body });
        response.status(200).json({ msg: "Post Updated Successfully!" });
    } catch (error) {
        return response.status(500).json({ msg: "Something Went Wrong! Please try again" });   
    }
} 

exports.deletePost = async (request, response) => {
    try {
        let post = await Post.findById(request.params.id);
        if(!post) {
            return response.status(404).json({
                msg: "Post not Found"
            });
        }
        await post.delete();
        response.status(200).json({ msg: "Post Deleted Successfully!" });
    } catch (error) {
        return response.status(500).json({ msg: "Something Went Wrong! Please Try Again." });
    }
}
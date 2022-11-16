const Comment = require('../model/commentModel')

exports.addNewComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();
        response.status(200).json({
            msg: "Comment added successfully"
        });
    } catch (error) {
        return response.status(500).json({
            msg: "Something Went Wrong!"
        });
    }
}

exports.getAllComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

exports.deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        comment.delete();
        response.status(200).json({ msg: "Comment Deleted Successfully!" });
    } catch (error) {
        response.status(500).json({ msg: "Something went wrong!" });
    }
}
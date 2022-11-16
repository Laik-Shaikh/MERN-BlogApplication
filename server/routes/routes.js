const express = require('express');
const router = express.Router();

const { signupUser } = require('../controller/authController');
const { loginUser, logoutUser } = require('../controller/authController');
const  upload  = require('../middleware/upload');
const { uploadImage, getImage } = require('../controller/imageController');
const { createPost, getAllPosts, getPost, updatePost, deletePost } = require('../controller/postController');
const { authenticateToken } = require('../middleware/jwtAuthenticate');
const { addNewComment, getAllComments, deleteComment } = require('../controller/commentController');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.post('/newcomment', authenticateToken, addNewComment);
router.get('/comments/:id', authenticateToken, getAllComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

module.exports = router;
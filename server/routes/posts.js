import express from 'express';

import { getFeedPosts, getUserPosts, likePost, getComments, addComment } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* read */
router.get('/', verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* update */
router.patch('/:id/like', verifyToken, likePost);

/* CREATE */
router.get("/:id/get/comment", verifyToken, getComments)
router.post("/:id/comment", verifyToken, addComment);

export default router;

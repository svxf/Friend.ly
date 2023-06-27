import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material';
import { Box, Button, Divider, IconButton, TextField, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [newcomment, setNewComment] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const loggedInUserFirstName = useSelector((state) => state.user.firstName);
  const loggedInUserLastName = useSelector((state) => state.user.lastName);
  const loggedInUserPicturePath = useSelector((state) => state.user.picturePath);

  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const highlight = palette.primary.highlight;

  const [loadcomments, setLoadComments] = useState([]);
  const postRef = useRef(null);

  const [refreshComment, setRefreshComment] = useState(true);

  const loc = useLocation();
  
  const getPostIdFromURL = () => {
    const hash = loc.hash;
    if (hash.length > 1) {
      return hash.substring(1);
    }
    return null;
  };

  const scrollToPost = () => {
    if (postRef.current) {
      postRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    const postIdFromURL = getPostIdFromURL();
    if (postIdFromURL === postId) {
      scrollToPost();
    }
  }, []);

  useEffect(() => {
    if (refreshComment) {
      axios.get(`http://localhost:3001/posts/${postId}/get/comment`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setLoadComments(response.data.comments);
          console.log('50', loadcomments)
          setRefreshComment(false);
        })
        .catch(error => {
          console.error(error);
      });
    }
  }, [postId, token, newcomment, refreshComment]);

  const postComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/posts/${postId}/comment`, 
        {
          userId: loggedInUserId,
          firstName: loggedInUserFirstName,
          lastName: loggedInUserLastName,
          picturePath: loggedInUserPicturePath,
          postId: postId,
          comment: newcomment,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setRefreshComment(true); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = () => {
    console.log(postId);
    const postUrl = `http://localhost:3000/home#${postId}`;
    navigator.clipboard.writeText(postUrl);
  };

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m='2rem 0' ref={postRef}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{loadcomments?.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton onClick={handleShare} >
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt='0.5rem'>
          {/* {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider /> */}
          <TextField
              id="my-text-field"
              label=""
              name="comment"
              variant="standard"
              placeholder="Add your Comment"
              size="small"
              sx={{p: "0.3rem"}}
              onChange={(e) => setNewComment(e.target.value)}
            />
      <Button variant="contained" size="small" onClick={postComment} >
        Add 
      </Button>

          {loadcomments?.map(comment => (
                  <Box display={'flex'} alignItems={'center'} key={comment._id}>
                    {comment?.picturePath && (
                      <img
                        width='32px'
                        height='32px'
                        alt='post'
                        style={{ borderRadius: '0.75rem' }}
                        src={`http://localhost:3001/assets/${comment.picturePath}`}
                      />
                    )}
                    <Typography sx={{ color: main, m: "0.5rem 0", pl: "0.5rem", '&:hover': {
                      color: highlight,
                      cursor: 'pointer'
                    } }} onClick={() => navigate(`/profile/${comment.userId}`)} >
                      {comment?.firstName} {comment?.lastName}: {comment?.comment}
                    </Typography>
                  </Box>
                )).reverse()}
          {comments.length > 1 &&<Divider /> }
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;

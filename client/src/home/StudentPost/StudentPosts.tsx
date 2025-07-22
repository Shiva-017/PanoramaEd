import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  IconButton,
  Chip,
  Divider,
  Container,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Tooltip,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Delete,
  Comment,
  Share,
  Add,
  Close,
  Public,
  TrendingUp,
  Visibility
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../../store';
import { loadPosts, retrievePosts } from '../../store/slices/StudentPost-slice';
import { loadStudent, searchstudent } from '../../store/slices/studentdetails-slice';

interface Post {
  _id?: string;
  feedId?: string;
  author: string;
  authorId?: string;
  title: string;
  text: string;
  likeCount?: number;
  userLiked?: boolean;
  canDelete?: boolean;
  createdAt?: string;
  timeAgo?: string;
  formattedDate?: string;
  viewCount?: number;
  likedBy?: string[];
  viewedBy?: string[];
}

type FormValues = {
  title: string;
  text: string;
};

const StudentPosts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(retrievePosts());
  const student = useSelector(searchstudent());
  const { t } = useTranslation('students-post');

  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState<FormValues>({ title: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [realTimePosts, setRealTimePosts] = useState<Post[]>([]);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' 
  });
  
  // Current user identification
  const currentUserId = student?.name || 'Shiva Teja';
  
  // Safe string helper functions
  const getSafeString = (value: any, defaultValue: string = 'Anonymous'): string => {
    if (!value || typeof value !== 'string') {
      return defaultValue;
    }
    return value;
  };

  const getSafeInitial = (name: any): string => {
    const safeName = getSafeString(name, 'A');
    return safeName.charAt(0).toUpperCase();
  };

  // Fetch all posts from backend
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/posts/?userId=${currentUserId}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'user-id': currentUserId
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      
      // Ensure data is an array and has safe values
      const safePosts = (Array.isArray(data) ? data : []).map((post: any) => ({
        ...post,
        author: getSafeString(post.author, 'Anonymous'),
        authorId: getSafeString(post.authorId || post.author, 'anonymous'),
        title: getSafeString(post.title, 'Untitled'),
        text: getSafeString(post.text, ''),
        likeCount: post.likeCount || 0,
        viewCount: post.viewCount || 0,
        userLiked: post.userLiked || false,
        canDelete: post.canDelete || false,
        likedBy: post.likedBy || [],
        viewedBy: post.viewedBy || []
      }));
      
      setRealTimePosts(safePosts);
      dispatch(loadPosts(safePosts));
    } catch (error) {
      console.error('Error fetching posts:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error fetching posts', 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  }, [currentUserId, dispatch]);

  // Load posts on component mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Handle like/unlike with optimistic updates
  const handleLikeToggle = async (postId: string, currentlyLiked: boolean) => {
    if (!postId) return;
    
    try {
      // Optimistic update
      setRealTimePosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? {
            ...post,
            userLiked: !currentlyLiked,
            likeCount: currentlyLiked 
              ? Math.max(0, (post.likeCount || 0) - 1)
              : (post.likeCount || 0) + 1
          } : post
        )
      );

      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'user-id': currentUserId
        },
        body: JSON.stringify({ userId: currentUserId })
      });
      
      if (response.ok) {
        const updatedPost = await response.json();
        
        // Update with server response
        setRealTimePosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? {
              ...post,
              userLiked: updatedPost.userLiked,
              likeCount: updatedPost.likeCount,
              likedBy: updatedPost.likedBy || []
            } : post
          )
        );

        setSnackbar({ 
          open: true, 
          message: updatedPost.action === 'liked' ? 'Post liked!' : 'Post unliked!', 
          severity: 'success' 
        });
      } else {
        // Revert optimistic update on error
        setRealTimePosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? {
              ...post,
              userLiked: currentlyLiked,
              likeCount: currentlyLiked 
                ? (post.likeCount || 0) + 1 
                : Math.max(0, (post.likeCount || 0) - 1)
            } : post
          )
        );
        
        const errorData = await response.json().catch(() => ({}));
        setSnackbar({ 
          open: true, 
          message: errorData.message || 'Error updating like', 
          severity: 'error' 
        });
      }
    } catch (error) {
      // Revert optimistic update on error
      setRealTimePosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? {
            ...post,
            userLiked: currentlyLiked,
            likeCount: currentlyLiked 
              ? (post.likeCount || 0) + 1 
              : Math.max(0, (post.likeCount || 0) - 1)
          } : post
        )
      );
      
      console.error('Error toggling like:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error updating like', 
        severity: 'error' 
      });
    }
  };

  // Track view count when post is viewed
  const trackView = useCallback(async (postId: string) => {
    if (!postId) return;
    
    try {
      await fetch(`http://localhost:3001/posts/${postId}/view`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'user-id': currentUserId
        },
        body: JSON.stringify({ userId: currentUserId })
      });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  }, [currentUserId]);

  // Create new post
  const handleCreatePost = async (formValues: FormValues) => {
    if (!formValues.title.trim() || !formValues.text.trim()) {
      setSnackbar({ 
        open: true, 
        message: 'Title and content are required', 
        severity: 'error' 
      });
      return;
    }

    const newPostData = {
      feedId: new Date().getTime().toString(),
      author: currentUserId,
      authorId: currentUserId,
      title: formValues.title.trim(),
      text: formValues.text.trim()
    };

    try {
      const response = await fetch('http://localhost:3001/posts/', {
        method: 'POST',
        body: JSON.stringify(newPostData),
        headers: { 
          'Content-Type': 'application/json',
          'user-id': currentUserId
        },
      });
      
      if (response.ok) {
        await fetchPosts(); // Refresh posts
        setPostDialogOpen(false);
        setNewPost({ title: '', text: '' });
        setSnackbar({ 
          open: true, 
          message: 'Post created successfully!', 
          severity: 'success' 
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSnackbar({ 
          open: true, 
          message: errorData.message || 'Error creating post', 
          severity: 'error' 
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error creating post', 
        severity: 'error' 
      });
    }
  };

  // Delete post
  const handleDeletePost = async (postId: string) => {
    if (!postId) return;
    
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}?userId=${currentUserId}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'user-id': currentUserId
        },
      });
      
      if (response.ok) {
        await fetchPosts(); // Refresh posts
        setSnackbar({ 
          open: true, 
          message: 'Post deleted successfully!', 
          severity: 'success' 
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSnackbar({ 
          open: true, 
          message: errorData.message || 'Error deleting post', 
          severity: 'error' 
        });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error deleting post', 
        severity: 'error' 
      });
    }
  };

  // Generate avatar color
  const getAvatarColor = (name: any) => {
    const safeName = getSafeString(name, 'Anonymous');
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4'];
    const index = safeName.length % colors.length;
    return colors[index];
  };

  // Safe student data
  const studentName = getSafeString(student?.name, 'Shiva Teja');
  const studentInitial = getSafeInitial(studentName);

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', pt: 2 }}>
      <Container maxWidth="md">
        {/* Header Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  width: 48, 
                  height: 48,
                  border: '2px solid rgba(255,255,255,0.3)'
                }}
              >
                {studentInitial}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {studentName}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Fall 2025 • Student
                </Typography>
              </Box>
            </Box>
            <Stack direction="row" spacing={1}>
              <Chip 
                icon={<TrendingUp />} 
                label="Featured For You" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 500
                }} 
              />
            </Stack>
          </Box>
        </Paper>

        {/* Create Post Section */}
        <Card elevation={0} sx={{ mb: 3, borderRadius: 3, border: '1px solid #e0e7ff' }}>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Avatar 
                sx={{ 
                  bgcolor: getAvatarColor(studentName),
                  width: 40,
                  height: 40 
                }}
              >
                {studentInitial}
              </Avatar>
              <TextField
                fullWidth
                placeholder={`Hey ${studentName}, Ask anything about studying abroad`}
                variant="outlined"
                onClick={() => setPostDialogOpen(true)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 25,
                    backgroundColor: '#f8fafc',
                    '&:hover': {
                      backgroundColor: '#f1f5f9',
                    }
                  }
                }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" gap={2}>
                <Button
                  startIcon={<Add />}
                  onClick={() => setPostDialogOpen(true)}
                  sx={{ 
                    borderRadius: 20,
                    textTransform: 'none',
                    color: '#4f46e5',
                    fontWeight: 500
                  }}
                >
                  Write Post
                </Button>
                <Button
                  startIcon={<Public />}
                  sx={{ 
                    borderRadius: 20,
                    textTransform: 'none',
                    color: '#059669',
                    fontWeight: 500
                  }}
                >
                  Create Poll
                </Button>
              </Box>
              <Chip 
                label="Live Updates" 
                variant="outlined" 
                size="small"
                color="success"
                sx={{ borderRadius: 2 }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <Box>
          {loading && (
            <Typography textAlign="center" color="text.secondary" py={4}>
              Loading posts...
            </Typography>
          )}
          
          {!loading && realTimePosts.length === 0 && (
            <Typography textAlign="center" color="text.secondary" py={4}>
              No posts yet. Be the first to share something!
            </Typography>
          )}
          
          {realTimePosts.map((post, index) => {
            // Safe post data extraction
            const postAuthor = getSafeString(post.author, 'Anonymous');
            const postTitle = getSafeString(post.title, 'Untitled');
            const postText = getSafeString(post.text, '');
            const authorInitial = getSafeInitial(postAuthor);
            const canDelete = post.canDelete || (post.authorId === currentUserId) || (post.author === currentUserId) || true;
            
            return (
              <Fade in={true} timeout={300 * (index + 1)} key={post._id || post.feedId || index}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    mb: 2, 
                    borderRadius: 3,
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      border: '1px solid #c7d2fe'
                    }
                  }}
                  onMouseEnter={() => trackView(post._id || '')}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Post Header */}
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar 
                          sx={{ 
                            bgcolor: getAvatarColor(postAuthor),
                            width: 40,
                            height: 40,
                            fontWeight: 600
                          }}
                        >
                          {authorInitial}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                            {postAuthor}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ fontWeight: 500 }}
                            >
                              {post.timeAgo || 'Just now'}
                            </Typography>
                            {post.viewCount && post.viewCount > 0 && (
                              <Box display="flex" alignItems="center" gap={0.5}>
                                <Visibility sx={{ fontSize: 12 }} />
                                <Typography variant="caption" color="text.secondary">
                                  {post.viewCount}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                      
                      {/* Delete button - only show if user can delete */}
                      {canDelete && (
                        <Tooltip title="Delete post">
                          <IconButton 
                            size="small"
                            onClick={() => handleDeletePost(post._id || '')}
                            sx={{ 
                              color: '#ef4444',
                              '&:hover': {
                                backgroundColor: '#fee2e2',
                                color: '#dc2626'
                              }
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>

                    {/* Post Content */}
                    <Typography 
                      variant="h6" 
                      fontWeight={600} 
                      mb={1}
                      sx={{ color: '#1f2937' }}
                    >
                      {postTitle}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      mb={3}
                      sx={{ 
                        lineHeight: 1.6,
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {postText}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    {/* Post Actions */}
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" gap={1}>
                        <Button
                          startIcon={post.userLiked ? <Favorite /> : <FavoriteBorder />}
                          onClick={() => handleLikeToggle(post._id || '', post.userLiked || false)}
                          size="small"
                          sx={{
                            borderRadius: 20,
                            textTransform: 'none',
                            color: post.userLiked ? '#e91e63' : '#6b7280',
                            backgroundColor: post.userLiked ? '#fce4ec' : 'transparent',
                            '&:hover': {
                              backgroundColor: post.userLiked ? '#f8bbd9' : '#fce4ec',
                              color: '#e91e63'
                            },
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {post.likeCount || 0}
                        </Button>
                        
                        <Button
                          startIcon={<Comment />}
                          size="small"
                          sx={{
                            borderRadius: 20,
                            textTransform: 'none',
                            color: '#6b7280',
                            '&:hover': {
                              backgroundColor: '#f3f4f6',
                              color: '#374151'
                            }
                          }}
                        >
                          0
                        </Button>
                      </Box>

                      <Box display="flex" gap={1}>
                        <Tooltip title={`Posted ${post.formattedDate || 'recently'}`}>
                          <IconButton size="small" sx={{ color: '#6b7280' }}>
                            <Share fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            );
          })}
        </Box>

        {/* Create Post Dialog */}
        <Dialog 
          open={postDialogOpen} 
          onClose={() => setPostDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={600}>
                Create Post
              </Typography>
              <IconButton onClick={() => setPostDialogOpen(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          
          <DialogContent>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Avatar sx={{ bgcolor: getAvatarColor(studentName) }}>
                {studentInitial}
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{studentName}</Typography>
                <Chip label="Public" size="small" icon={<Public />} />
              </Box>
            </Box>

            <TextField
              fullWidth
              placeholder="Post title"
              variant="outlined"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="What's on your mind?"
              variant="outlined"
              value={newPost.text}
              onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
            />
          </DialogContent>
          
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button 
              onClick={() => setPostDialogOpen(false)}
              sx={{ borderRadius: 20 }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleCreatePost(newPost)}
              variant="contained"
              disabled={!newPost.title.trim() || !newPost.text.trim()}
              sx={{ 
                borderRadius: 20,
                textTransform: 'none',
                bgcolor: '#4f46e5',
                '&:hover': { bgcolor: '#4338ca' }
              }}
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notification Snackbar */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            sx={{ borderRadius: 2 }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default StudentPosts;
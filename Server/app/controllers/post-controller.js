import * as postService from '../services/post-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

// Helper function to format time ago
const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffInMs = now - postTime;
  
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  
  return postTime.toLocaleDateString();
};

// Controller for showing posts with user like status
export const show = async (request, response) => {
  try {
    const params = { ...request.query };
    const userId = request.query.userId || request.headers['user-id']; 
    
    const posts = await postService.fetch(params);

    const postsWithUserData = posts.map(post => {
      const postObj = post.toObject ? post.toObject() : post;
      const userLiked = postObj.likedBy && postObj.likedBy.includes(userId);
      
      return {
        ...postObj,
        author: postObj.author || 'Anonymous',
        authorId: postObj.authorId || postObj.author,
        timeAgo: formatTimeAgo(postObj.createdAt || postObj.timestamp),
        formattedDate: new Date(postObj.createdAt || postObj.timestamp).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        likeCount: postObj.likedBy ? postObj.likedBy.length : 0,
        userLiked: userLiked,
        canDelete: (postObj.authorId === userId) || (postObj.author === userId) || (userId === 'admin'),
        viewCount: postObj.viewCount || 0,
        likedBy: postObj.likedBy || [],
        viewedBy: postObj.viewedBy || []
      };
    });
    
    setResponse(postsWithUserData, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller for saving posts
export const post = async (request, response) => {
  try {
    const userId = request.headers['user-id'] || request.body.authorId;
    
    const newPost = {
      ...request.body,
      authorId: userId || request.body.author,
      createdAt: new Date(),
      updatedAt: new Date(),
      timestamp: new Date().toISOString(),
      likedBy: [], 
      viewedBy: [],
      viewCount: 0,
      commentCount: 0
    };
    
    const savedPost = await postService.save(newPost);
    const postObj = savedPost.toObject ? savedPost.toObject() : savedPost;
    
    // Add formatted time to response
    const postWithTime = {
      ...postObj,
      timeAgo: 'Just now',
      formattedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      likeCount: 0,
      userLiked: false,
      canDelete: true
    };
    
    setResponse(postWithTime, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller for deleting posts
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const userId = request.query.userId || request.headers['user-id'];
    
    const post = await postService.findById(id);
    if (!post) {
      return setErrorResponse({ message: 'Post not found' }, response);
    }
    
    // Check if user can delete this post
    const canDelete = (post.authorId === userId) || (post.author === userId) || (userId === 'admin');
    
    if (!canDelete) {
      return setErrorResponse({ message: 'Unauthorized to delete this post' }, response);
    }
    
    await postService.remove(id);
    setResponse({ 
      message: 'Post deleted successfully',
      deletedAt: new Date().toISOString()
    }, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller for toggling likes
export const toggleLike = async (request, response) => {
  try {
    const postId = request.params.id;
    const userId = request.body.userId || request.headers['user-id'];
    
    if (!userId) {
      return setErrorResponse({ message: 'User ID is required' }, response);
    }
    
    const post = await postService.findById(postId);
    if (!post) {
      return setErrorResponse({ message: 'Post not found' }, response);
    }
    
    // Ensure likedBy array exists
    const currentLikedBy = post.likedBy || [];
    const userIndex = currentLikedBy.indexOf(userId);
    let action = '';
    let updatedLikedBy;
    
    if (userIndex > -1) {
      // Unlike: remove user from likedBy array
      updatedLikedBy = currentLikedBy.filter(id => id !== userId);
      action = 'unliked';
    } else {
      // Like: add user to likedBy array
      updatedLikedBy = [...currentLikedBy, userId];
      action = 'liked';
    }
    
    const updateData = {
      likedBy: updatedLikedBy,
      updatedAt: new Date(),
      lastLikedAt: new Date().toISOString()
    };
    
    const updatedPost = await postService.updatePost(postId, updateData);
    const postObj = updatedPost.toObject ? updatedPost.toObject() : updatedPost;
    
    const postWithUserData = {
      ...postObj,
      timeAgo: formatTimeAgo(postObj.createdAt || postObj.timestamp),
      likeCount: postObj.likedBy ? postObj.likedBy.length : 0,
      userLiked: postObj.likedBy ? postObj.likedBy.includes(userId) : false,
      action: action
    };
    
    setResponse(postWithUserData, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller for incrementing view count
export const incrementView = async (request, response) => {
  try {
    const postId = request.params.id;
    const userId = request.body.userId || request.headers['user-id'];
    
    if (!userId) {
      return setResponse({ message: 'User ID required for view tracking' }, response);
    }
    
    const post = await postService.findById(postId);
    if (!post) {
      return setErrorResponse({ message: 'Post not found' }, response);
    }
    
    // Ensure viewedBy array exists
    const currentViewedBy = post.viewedBy || [];
    
    // Only increment if user hasn't viewed before
    if (!currentViewedBy.includes(userId)) {
      const updatedViewedBy = [...currentViewedBy, userId];
      
      const updateData = {
        viewCount: (post.viewCount || 0) + 1,
        viewedBy: updatedViewedBy,
        lastViewedAt: new Date().toISOString()
      };
      
      const updatedPost = await postService.updatePost(postId, updateData);
      
      setResponse({ 
        viewCount: updatedPost.viewCount,
        message: 'View recorded'
      }, response);
    } else {
      setResponse({ 
        viewCount: post.viewCount || 0,
        message: 'Already viewed'
      }, response);
    }
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller for getting single post
export const getById = async (request, response) => {
  try {
    const postId = request.params.id;
    const userId = request.query.userId || request.headers['user-id'];
    
    const post = await postService.findById(postId);
    if (!post) {
      return setErrorResponse({ message: 'Post not found' }, response);
    }
    
    const postObj = post.toObject ? post.toObject() : post;
    
    const postWithUserData = {
      ...postObj,
      timeAgo: formatTimeAgo(postObj.createdAt || postObj.timestamp),
      likeCount: postObj.likedBy ? postObj.likedBy.length : 0,
      userLiked: postObj.likedBy ? postObj.likedBy.includes(userId) : false,
      canDelete: (postObj.authorId === userId) || (postObj.author === userId) || (userId === 'admin')
    };
    
    setResponse(postWithUserData, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Legacy update controller (for backward compatibility)
export const update = async (request, response) => {
  try {
    // Redirect to toggleLike for consistency
    return toggleLike(request, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller for post analytics
export const getPostAnalytics = async (request, response) => {
  try {
    const id = request.params.id;
    const post = await postService.findById(id);
    
    if (!post) {
      return setErrorResponse({ message: 'Post not found' }, response);
    }
    
    const postObj = post.toObject ? post.toObject() : post;
    
    const analytics = {
      postId: id,
      createdAt: postObj.createdAt,
      timeAgo: formatTimeAgo(postObj.createdAt),
      totalLikes: postObj.likedBy ? postObj.likedBy.length : 0,
      totalViews: postObj.viewCount || 0,
      totalComments: postObj.commentCount || 0,
      engagementRate: calculateEngagementRate(postObj),
      lastUpdated: postObj.updatedAt,
      likedBy: postObj.likedBy || [],
      viewedBy: postObj.viewedBy || []
    };
    
    setResponse(analytics, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Helper function for engagement calculation
const calculateEngagementRate = (post) => {
  const views = post.viewCount || 1;
  const likes = post.likedBy ? post.likedBy.length : 0;
  const comments = post.commentCount || 0;
  const interactions = likes + comments;
  return ((interactions / views) * 100).toFixed(2);
};

export default {
  show,
  post,
  remove,
  update,
  toggleLike,
  incrementView,
  getById,
  getPostAnalytics
};
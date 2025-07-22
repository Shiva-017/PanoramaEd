import Post from '../models/post.js';

// function to fetch all the student posts
export const fetch = async (params = {}) => {
    const posts = await Post.find({}).sort({ createdAt: -1 }).exec();
    return posts;
}

// function to find a post by ID
export const findById = async (id) => {
    const post = await Post.findById(id).exec();
    return post;
}

// function to save a student post
export const save = async (newPost) => {
    const post = new Post(newPost);
    return await post.save();
}

// function to remove a post
export const remove = async (id) => {
    const post = await Post.findByIdAndDelete(id).exec();
    return post;
}

// function to update post with any data (like, view, etc.)
export const updatePost = async (id, updateData) => {
    const post = await Post.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
    ).exec();
    return post;
}

// Legacy function for backward compatibility
export const update = async (id, updateData) => {
    return await updatePost(id, updateData);
}
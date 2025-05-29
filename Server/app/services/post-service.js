import Post from '../models/post.js';

// fetch all posts sorted newest first
export const fetch = async (params = {}) => {
    const posts = await Post.find({}).sort({ createdAt: -1 }).exec();
    return posts;
}

// find a single post by its document ID
export const findById = async (id) => {
    const post = await Post.findById(id).exec();
    return post;
}

// persist a new student post document
export const save = async (newPost) => {
    const post = new Post(newPost);
    return await post.save();
}

// delete a post by ID and return removed doc
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
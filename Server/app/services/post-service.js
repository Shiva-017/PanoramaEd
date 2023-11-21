import Post from '../models/post.js';

export const fetch = async (params = {})=> {

    const posts = await Post.find({}).exec();
    return posts;

}
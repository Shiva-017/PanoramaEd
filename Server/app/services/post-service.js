import Post from '../models/post.js';

export const fetch = async (params = {})=> {

    const posts = await Post.find({}).exec();
    return posts;

}


export const save = async (newPost) => {

    const post = new Post(newPost);
    return await post.save();

    
}

export const remove = async (id) => {

    const post = await Post.findByIdAndDelete(id).exec();
    return post;
}
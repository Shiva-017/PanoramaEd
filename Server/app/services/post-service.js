import Post from '../models/post.js';

// function to fetch all the student posts

export const fetch = async (params = {})=> {

    const posts = await Post.find({}).exec();
    return posts;

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

//function to upVote a post
export const update = async (id,upVoteCount ) => {

    const post = await Post.findByIdAndUpdate(id,{$set: {upVote: upVoteCount}}).exec();
    return post;
    
    }
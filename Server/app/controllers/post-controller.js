import * as postService from '../services/post-service.js';
import {setResponse, setErrorResponse} from './response-handler.js'

//controller for showing posts

export const  show = async (request,response) =>{

    try {

        const params = {...request.query};
        const posts = await postService.fetch(params);
        setResponse(posts,response);
        

    } catch(err){

        setErrorResponse(err, response);

    }


}
//controller for saving posts
export const post = async (request, response) =>{

    try {

        const newPost = {...request.body};
        const post = await postService.save(newPost);
        setResponse(post,response);

    } catch(err){

        setErrorResponse(err, response);


        
    }

}
//controller for deleting  posts
export const remove = async (request, response) => {

    try{

        const id = request.params.id;
        const post = await postService.remove(id);
        setResponse({},response);

    } catch (err){
        setErrorResponse(err, response);

        
    }
    
}

//controller for udating upVote
export const update = async (request, response) => {

    try{

        const id = request.params.id;
        const  upVoteCount = request.query.upvote;
        const post = await postService.update(id,upVoteCount);
        setResponse(post,response);

    } catch (err){
        setErrorResponse(err, response);


    }

}
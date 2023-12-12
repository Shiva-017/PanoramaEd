import { ReactElement } from "react"
// import Post, {posts} from '../../models/post'
import Post from '../../models/post'
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Avatar } from '@mui/material';
import logo from '../../resources/neulogo.jpg';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PostForm from '../../home/PostForm/PostForm'
import React, {useState, useEffect} from 'react';
// import { AiOutlineLike } from "react-icons/ai";
import { BiSolidUpvote } from "react-icons/bi";

type FormValues = {
    title: string;
    text: string;
  };

type Props = {

    posts: Post[]
}

const StudentPosts: React.FC<Props> = (props: Props): ReactElement => {
    const [posts, setPosts] = useState<Post[]>([]);
    const getPosts = () => {

        fetch(`http://localhost:3001/posts/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
            .then(res => res.json())
            .then(json => {
              setPosts(json)
              console.log(json)
            })
    }
    useEffect(() => {
        getPosts();
      }, []);


    const HandleFormSubmit = (formValues: FormValues) => {
    
      const newPost: Post = {
        
        feedId: new Date().getTime().toString(),
        author: "Current User",
        title: formValues.title,
        text: formValues.text,
        upVote:0
      };
    
      // setPosts((posts) => [...posts, newPost]);

     fetch(`http://localhost:3001/posts/`, {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: { 'Content-Type': 'application/json' },
          })
            .then(response => {
              if (response.status ===200){
                // console.log("posted")
                getPosts();
                console.log("hello",posts)
              }
            })

            setIsFormVisible(false);

    };

    

    const [isFormVisible, setIsFormVisible] = useState(false);
    console.log("Hello 1", isFormVisible);

    const handleCreateClick = () => {
      setIsFormVisible(true);
    };

    const onDelete = (id:String):void => {
       fetch(`http://localhost:3001/posts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          })
          .then(response => {
            if (response.status ===200){
              console.log("psoted")
              getPosts();
            }
          })
       
    }

    const onUpVote = (id:String,upVote:number):void => {
      
      fetch(`http://localhost:3001/posts/${id}/?upvote=${upVote+1}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
          })
          .then(response => {
            if (response.status ===200){
              console.log("psoted")
              getPosts();
            }
          })


    }



    
        return(

            <>

            <div>
            {posts.map((post) => (
              <Card key={post.feedId} variant="outlined" style={{ marginLeft: 10, borderColor: "#92C1B7", marginTop: 10, marginBottom:10, width: 1000, borderRadius: 10}}>
                 <Avatar
                 alt={post.author}
                 src={logo}
                 sx={{ width: 35, height: 35, border: 5, borderColor: "white" }}
                 />
                <CardContent>
                  <Typography variant="h6">{post.author}</Typography>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>{post.title}</Typography>
                  <Typography variant="body1">{post.text}</Typography>
                  <Button style={{color:"#92C1B7"}} onClick={()=>onUpVote(post._id || "",post.upVote)}>
                  <BiSolidUpvote style={{color:"#92C1B7"}} />{post.upVote}</Button>
                  <IconButton aria-label="delete" size="large" onClick={() => onDelete(post._id || "")}>
                    <DeleteIcon style={{color:"#92C1B7"}}  />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
          <Button variant="contained" onClick={handleCreateClick}  style={{backgroundColor:"#92C1B7" }} >Create</Button>
          {isFormVisible && <PostForm onSubmit={HandleFormSubmit} posts={props.posts} setPosts={setPosts}/>}
          </div>
         
          </>
    
        )

    }


export default StudentPosts; 



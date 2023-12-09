import { ReactElement } from "react"
import Post, {posts} from '../../models/post'
import { Card, CardContent, Typography, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PostForm from '../../home/PostForm/PostForm'
import React, {useState} from 'react';
import { AiOutlineLike } from "react-icons/ai";


type FormValues = {
    title: string;
    text: string;
  };

type Props = {

    posts: Post[]
}

const StudentPosts: React.FC<Props> = (props: Props): ReactElement => {

    const [postList, setPosts] = useState([...posts]);

    const HandleFormSubmit = (formValues: FormValues) => {
        // const [postList, setPosts] = useState([...posts]);
        console.log("Hello submit", postList);
      const newPost: Post = {
        feedID: new Date().getTime().toString(),
        author: "Current User",
        title: formValues.title,
        text: formValues.text,
        upVote:0
      };
    
      setPosts((postList) => [...postList, newPost]);
    };

    

    const [isFormVisible, setIsFormVisible] = useState(false);
    console.log("Hello 1", isFormVisible);

    const handleCreateClick = () => {
      setIsFormVisible(true);
    };

    
        return(

            <>

            <div>
            {props.posts.map((post) => (
              <Card key={post.feedID} variant="outlined" style={{ marginLeft: 10, borderColor: "#92C1B7", marginTop: 10, marginBottom:10, width: 1000, borderRadius: 10}}>
                <CardContent>
                  <Typography variant="h6">{post.author}</Typography>
                  <Typography variant="body1">{post.text}</Typography>
                  <Button> 
                  <AiOutlineLike size={30} style={{color: "#92C1B7"}} />upVote
                  </Button>
                  <IconButton aria-label="delete" size="large" >
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




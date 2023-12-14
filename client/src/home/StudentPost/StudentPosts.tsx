import { ReactElement } from "react"
import Post from '../../models/post'
import { Card,Grid, CardContent, Typography, Button } from "@mui/material";
import logo from '../../resources/neulogo.jpg';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PostForm from '../../home/PostForm/PostForm'
import React, {useState, useEffect} from 'react';
import { BiSolidUpvote } from "react-icons/bi";
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { loadPosts, retrievePosts } from '../../store/slices/StudentPost-slice'
import { loadStudent, searchstudent} from '../../store/slices/studentdetails-slice'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

type FormValues = {
    title: string;
    text: string;
  };

  const StudentPosts: React.FC= (): ReactElement => {


  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(retrievePosts());
  const student = useSelector(searchstudent())
  const { t } = useTranslation('students-post');

  // function to fetch posts using API call
    
    const getPosts = () => {

        fetch(`http://localhost:3001/posts/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
            .then(res => res.json())
            .then((data) => {
              dispatch(loadPosts(data.reverse()))
                    
    });        
            
    }
    useEffect(() => {

        getPosts();
  
      }, []);

// function to create new post and update the posts collection 
    const HandleFormSubmit = (formValues: FormValues) => {
      console.log(student.name);
    
      const newPost: Post = {
        
        feedId: new Date().getTime().toString(),
        author: student.name,
        title: formValues.title,
        text: formValues.text,
        upVote:0
      };
    
    fetch(`http://localhost:3001/posts/`, {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: { 'Content-Type': 'application/json' },
          })
            .then(response => {
              if (response.status ===200){
                getPosts();
                
              }
            })

            setIsFormVisible(false);
            setCancelVisible(false);

    };

    
// logic to enable and disable new post form 
    const [isFormVisible, setIsFormVisible] = useState(false);
    console.log("Hello 1", isFormVisible);

    const   [isCancelVisible, setCancelVisible] = useState(false);
    console.log("Hello 2", isCancelVisible);

    const handleCreateClick = () => {
      setIsFormVisible(true);
      setCancelVisible(true);
      
    };

    const handleCancelClick = () =>{
      setIsFormVisible(false)

      setCancelVisible(false);

    }

    const onDelete = (id:String):void => {
       fetch(`http://localhost:3001/posts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          })
          .then(response => {
            if (response.status ===200){
              console.log("posted")
              getPosts();    
            }
          })
       
    }

    //fucntion to update upVote on student post

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

            <div style={{ position:"absolute", left:450, width:"1080px", overflowX:"auto", height:"90vh", top:80}}>

            <div>
            {posts.map((post) => (
              <Card key={post.feedId} variant="outlined" style={{ marginLeft: 150,marginRight:50, borderColor: "#FFFFFF",  marginTop: 10, marginBottom:10, width: 800, borderRadius: 10, backgroundColor:"#FFFFFF"}}>
                 
<Grid container spacing={2}>
        <Grid item>
        <Avatar
                 alt={post.author}
                 src={''}
                 sx={{ width: 35, height: 35, border: 5, borderColor: "white" }}
                 />
        </Grid>
        <Grid item>
          
          <Typography variant="body1" style={{ fontWeight: 'bold', marginLeft:10 }}>{post.author}</Typography>
        </Grid>
      </Grid>
                  
                  
                  
                <CardContent>
                 
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>{post.title}</Typography>
                  <Typography variant="body1">{post.text}</Typography>
                  <Button style={{color:"#000000"}} onClick={()=>onUpVote(post._id || "",post.upVote)}>
                  <BiSolidUpvote  style={{color:"#000000"}} />{post.upVote}</Button>
                  <IconButton aria-label="delete" size="large" onClick={() => onDelete(post._id || "")}>
                    <DeleteIcon style={{color:"#000000"}}  />
                    
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
          <Button variant="contained" onClick={handleCreateClick}  style={{backgroundColor:"#000000" ,marginLeft: 150 }} >{t('CREATE')}</Button>
          {isFormVisible && <PostForm onSubmit={HandleFormSubmit}/>} 
          {isCancelVisible &&<Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleCancelClick} 
            fullWidth
            style={{ borderColor: "#FFFFFF", borderRadius: 10, backgroundColor:"#000000",marginLeft: 335,marginTop: 10, width: 300}}
        
          >
           {t('CANCEL')} 
          </Button> }
          </div>
         
          </div>
    
        )

    }


export default StudentPosts; 







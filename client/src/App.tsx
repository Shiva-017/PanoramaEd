
import React, {useState} from 'react';
import logo from './logo.svg';
import Post, {posts} from './models/post'
import StudentPosts from './home/StudentPost/StudentPosts';
import StudentSearch from './home/StudentSearch/StudentSearch';
import PostForm from './home/PostForm/PostForm'

import './App.css';

type FormValues = {
  title: string;
  text: string;
};

function App() {

  const [postList, setPosts] = useState([...posts]);

  const searchHandler = (query: string) => {
    const filteredPosts = [...posts].filter(c => c.author.startsWith(query));
    setPosts(filteredPosts);
  }

  // const handleFormSubmit = (formValues: FormValues) => {
  //   const newPost: Post = {
  //     feedID: new Date().getTime().toString(),
  //     author: "Current User",
  //     title: formValues.title,
  //     text: formValues.text,
  //     upVote:0
  //   };

  //   setPosts((postList) => [...postList, newPost]);
  // };

 

  return(

  <div>

    <StudentSearch onSearch={searchHandler}></StudentSearch>

    <StudentPosts posts = {postList}></StudentPosts>

    {/* <PostForm onSubmit={handleFormSubmit} posts={posts} setPosts={setPosts}></PostForm> */}

   </div>

  )
 
}

export default App;

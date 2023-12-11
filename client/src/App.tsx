
import React, { useState } from 'react';
import logo from './logo.svg';
import Post from './models/post'
import StudentPosts from './home/StudentPost/StudentPosts';
import StudentSearch from './home/StudentSearch/StudentSearch';
import PostForm from './home/PostForm/PostForm'

import './App.css';
import CollegePage from './home/CollegePage/CollegePage';
import StudentMetricsForm from './home/StudentMetrics/StudentMetricsForm';
import CollegeCompare from './home/CollegeCompare/CollegeCompare';

type FormValues = {
  title: string;
  text: string;
};

function App() {


  return (
    // <CollegePage/>
    // <StudentMetricsForm />
    <CollegeCompare />
  )

}

export default App;

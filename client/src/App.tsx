
import React, { useState } from 'react';
import logo from './logo.svg';
import Post from './models/post'
import StudentPosts from './home/StudentPost/StudentPosts';
import StudentSearch from './home/StudentSearch/StudentSearch';
import PostForm from './home/PostForm/PostForm'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store'

import './App.css';
import CollegePage from './home/CollegePage/CollegePage';
import StudentMetricsForm from './home/StudentMetrics/StudentMetricsForm';
import CollegeCompare from './home/CollegeCompare/CollegeCompare';

import StudentProfile from './home/StudentPage/StudentProfile';
import CollegeSuggest from './home/CollegeSuggest/CollegeSuggest';

type FormValues = {
  title: string;
  text: string;
};

function App() {


  return (
     //<CollegePage/>
    // <StudentMetricsForm />
    //<CollegeCompare />
    //<CollegeSuggest/>
   <StudentProfile/>
  )

}

export default App;

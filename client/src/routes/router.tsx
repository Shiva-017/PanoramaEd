import React from 'react';
import { createBrowserRouter, redirectDocument } from 'react-router-dom';
import Root from './Root';
import App from '../App';
import CollegeDetails from '../home/CollegePage/CollegePage';
import CollegeCompare from '../home/CollegeCompare/CollegeCompare';
import StudentMetricsForm from '../home/StudentMetrics/StudentMetricsForm';
import CollegeSuggest from '../home/CollegeSuggest/CollegeSuggest';
import StudentPosts from '../home/StudentPost/StudentPosts';
import LoginPage from '../home/LoginPage/LoginPage';
import StudentProfile from '../home/StudentPage/StudentProfile';
import StudentForm from '../home/StudentPage/StudentForm';
import StudentDetails from '../home/StudentPage/StudentDetails';
import ProtectedRoute from './ProtectedRoute';

export default createBrowserRouter([
  {
    path: '/service-worker.js',
    loader: () => redirectDocument('/service-worker.js'),
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <></>,
    children: [
      {
        element: <App />,
        index: true,
      },
      {
        path: '/colleges/:collegeName',
        element: <ProtectedRoute element={<CollegeDetails />} />,
      },
      {
        path: '/college-compare',
        element: <ProtectedRoute element={<CollegeCompare />} />,
      },
      {
        path: '/find-college',
        element: <ProtectedRoute element={<StudentMetricsForm />} />,
      },
      {
        path: '/suggested-colleges',
        element: <ProtectedRoute element={<CollegeSuggest />} />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/posts',
        element: <ProtectedRoute element={<StudentPosts />} />,
      },
      {
        path: '/studentform',
        element: <ProtectedRoute element={<StudentForm />} />,
      },
      {
        path: '/studentdetails',
        element: <ProtectedRoute element={<StudentDetails />} />,
      },
    ],
  },
]);

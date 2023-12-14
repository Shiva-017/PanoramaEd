import React, { ReactElement, useState, useEffect } from 'react';
import backGround from '../../resources/northeast.png';
import SearchIcon from '@mui/icons-material/Search';

import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Student from '../../models/student';
import { Avatar, Card, CardMedia, CardActions, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import background from '../../resources/3626052.jpg';
import SchoolIcon from '@mui/icons-material/School';
import AirIcon from '@mui/icons-material/Air';
import ShortlistCard from './ShortlistCard';
import { useSelector } from 'react-redux';
import { retrieveUsers} from '../../store/slices/login-slice';
import User from '../../models/user';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { loadStudent, searchstudent } from '../../store/slices/studentdetails-slice'


import { useTranslation } from 'react-i18next';

// Main component for displaying student profile
const StudentProfile: React.FC = (): ReactElement => {

// Redux hooks for managing state and dispatch
  const studentLoggedIn : User[] = useSelector(retrieveUsers());
  const dispatch = useDispatch<AppDispatch>();
  const students = useSelector(searchstudent());
  const { t } = useTranslation('student-profile');

// Function to fetch student data from the server
  const getStudentData = async()=>{
    try {
      console.log("student", studentLoggedIn);
// Fetching student data based on the logged-in user's email
      const response = await fetch(`http://localhost:3001/students/${studentLoggedIn[0].email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json())
      .then(data => {
        console.log(data,"data");
        dispatch(loadStudent(data[0]))})
    } catch (error) {
      console.error("Error:", error);
    }
  }
    // Fetch student data when the component mounts
  useEffect(() => {
    getStudentData();
  }, []);



  // Render student profile

  return (
    <Card sx={{ width: 450,minHeight:"92vh", overflowY:"auto", padding: "auto", position:"absolute", left:0 }}>
      <CardMedia
        image={background}
        sx={{ height: 270, pt: 20 }}
      >
        <Avatar  sx={{ margin: "auto", width: 90, height: 90, border: 4, borderColor: "#8DA399", mb: 2 }} />
      </CardMedia>

      <CardHeader
        title={students?.name}
        sx={{ m: "auto", textAlign: "center" }}
      />
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Stack direction="row" spacing={18}>
          <Stack direction="column" spacing={1} >
            <Typography sx={{fontSize: "12px", color:"GrayText", fontWeight:"bold"}}>{t('DEGREE')}</Typography> 
            <Stack direction="row" spacing={1}>
              <SchoolIcon></SchoolIcon>
              <Typography variant="body2">{students?.degreeseeking}</Typography>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography  sx={{fontSize: "12px", color:"GrayText", fontWeight:"bold"}}>{t('INTAKE')}</Typography>
            <Stack direction="row" spacing={1}>
              <AirIcon></AirIcon>
              <Typography variant="body2">{students?.intake}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <Stack sx={{padding:5}}>
        <Typography variant='body1' sx={{fontWeight:"bold"}}>{t('ShortlistedUniversities')}</Typography>
        

        {students && students.collegeShorlisted && students.collegeShorlisted.length > 0 &&
          students?.collegeShorlisted?.map((collegeItem: any, index: any) => {
          return (
            <ShortlistCard logo={collegeItem.collegeLogo} college={collegeItem.collegeName} key={index}></ShortlistCard>
          )
        })}


      </Stack>
    </Card>

  );
};

export default StudentProfile;

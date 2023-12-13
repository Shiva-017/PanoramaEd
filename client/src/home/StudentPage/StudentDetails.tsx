import React, { ReactElement, useState, useEffect } from 'react';
import backGround from '../../resources/northeast.png';
import logo from '../../resources/anthony.jpeg';
import {
  AppBar,
  Avatar,
  CardMedia,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Student from '../../models/student';
import StudentCard from './StudentCard';
import ShortlistCard from './ShortlistCard';
import Button from '@mui/material/Button';
import EventIcon from '@mui/icons-material/Event';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkIcon from '@mui/icons-material/Work';
import College from '../../models/college';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { useSelector } from 'react-redux';
import { loadStudent, searchstudent } from '../../store/slices/studentdetails-slice'
import { retrieveUsers } from '../../store/slices/login-slice';
import User from '../../models/user';
import { useTranslation } from 'react-i18next';


const StudentDetails: React.FC = (): ReactElement => {

 // const [students, setStudents] = useState<Student>();
 const studentLoggedIn : User[] = useSelector(retrieveUsers());

 const dispatch = useDispatch<AppDispatch>();
  const students = useSelector(searchstudent());
  const { t } = useTranslation('student-details');

  const navigate = useNavigate();
    const getStudents = () => {
      try {

        const response = fetch(`http://localhost:3001/students/${studentLoggedIn[0].email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }).then(res => res.json())
          .then(data => {
            dispatch(loadStudent(data[0]))})
            
            
            //setStudents(data[0]));
          // if (!response.ok) {
          //   throw new Error(`HTTP error! Status: ${response.status}`);
          // }

        // const data = response.json();

        // setStudents(data);
    } catch (error) {
        console.error("Error:", error);
    }
};
    useEffect(() => {
        getStudents();
      }, [])


  

  return (
    <div style={{ position:"absolute", left:500, width:"1080px", overflowX:"auto", height:"90vh"}}>
     

<Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          

          {/* Student Cards - Single column (1x1) */}
          <Grid container spacing={0} sx={{ width: '100%' }}>
            <Grid item xs={12}>
              <StudentCard
                title={<><MenuBookIcon /> {t('educational-details')}</>}
                mandatoryContent={students?.undergradgrade}
                optionalContent={students?.undergradcollege}
                optionalContent2={students?.undergradcourse}
              />
            </Grid>
            <Grid item xs={12}>
              <StudentCard
                title={<><AssessmentIcon />{t('test-scores')}</>}
                mandatoryContent={students?.gre}
                optionalContent={students?.ielts}
              />
            </Grid>
            <Grid item xs={12}>
              <StudentCard
                title={<><WorkIcon /> {t('work-experience')}</>}
                mandatoryContent={students?.experiencecompany}
                optionalContent={students?.experiencedesignation}
                optionalContent2={students?.experienceduration}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default StudentDetails;
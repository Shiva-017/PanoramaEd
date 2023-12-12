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


const StudentProfile: React.FC = (): ReactElement => {

  const [students, setStudents] = useState<Student>();

  const navigate = useNavigate();
    const getStudents = () => {
      try {

        const response = fetch(`http://localhost:3001/students/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }).then(res => res.json())
          .then(data => setStudents(data[0]));
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
    <div style={{ margin: '0 150px' }}>
     

<Grid container spacing={2}>
        {/* Left side: background, avatar, shortlist cards */}
        <Grid item xs={12} sm={6} md={6}>
          <CardMedia
            image={backGround}
            sx={{
              border: 5,
              borderColor: 'whitesmoke',
              borderWidth: 15,
              borderRadius: 10,
              paddingTop: '250px',
              paddingLeft: '40px',
              paddingBottom: '10px',
            }}
          >
            <Avatar
              alt="Student Name"
              src={logo}
              sx={{
                width: 150,
                height: 150,
                border: 5,
                borderColor: 'white',
                margin: 'auto',
              }}
            />
          </CardMedia>

          <Grid item xs={12}>
          <Stack direction="row" justifyContent="center">
            <Stack direction="column">
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                {students?.name}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

          {/* Shortlist Cards - To the Left */}
          <Typography
            variant="h5"
            component="h2"
            ml={5}
            mt={5}
            pl={2}
            sx={{ fontWeight: 'bold', borderLeft: 5, borderColor: '#603F8B' }}
          >
            Colleges Shortlisted
          </Typography>
          <Grid item xs={12} sm={6} md={4}>
            <ShortlistCard college="Northeastern University" program="Computer Science" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShortlistCard college="Harvard University" program="Computer Science" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShortlistCard college="UC Santa Cruz" program="Computer Science" />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <ShortlistCard college={students?.shortlistedcolleges[0].collegeID} program="Computer Science" />
          </Grid> */}

{/* {students?.shortlistedcolleges.map((collegeID, index)=>{
          return(
            <ShortlistCard collegeID={collegeID} key={index} program="Computer Science"></ShortlistCard>
          )
        })} */}
        </Grid>

        {/* Right side: student cards */}
        <Grid item xs={12} sm={6} md={6}>
          

          {/* Student Cards - Single column (1x1) */}
          <Grid container spacing={0} sx={{ width: '100%' }}>
            <Grid item xs={12}>
              <StudentCard 
              title={<><SchoolIcon /> Degree Seeking</>}
              mandatoryContent={students?.degreeseeking} />
            </Grid>
            <Grid item xs={12}>
              <StudentCard 
              title={<><EventIcon /> Intake</>} 
              mandatoryContent={students?.intake} />
            </Grid>
            <Grid item xs={12}>
              <StudentCard
                title={<><MenuBookIcon /> Educational Details</>}
                mandatoryContent={students?.undergradgrade}
                optionalContent={students?.undergradcollege}
                optionalContent2={students?.undergradcourse}
              />
            </Grid>
            <Grid item xs={12}>
              <StudentCard
                title={<><AssessmentIcon /> Test Scores</>}
                mandatoryContent={students?.gre}
                optionalContent={students?.ielts}
              />
            </Grid>
            <Grid item xs={12}>
              <StudentCard
                title={<><WorkIcon /> Work Experience</>}
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

export default StudentProfile;

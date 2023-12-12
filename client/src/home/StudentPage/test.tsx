import React, { ReactElement, useState } from 'react';
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
import { student } from '../../models/student';
import StudentCard from './StudentCard';
import ShortlistCard from './ShortlistCard';

const StudentProfile: React.FC = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMyProfileClick = () => {
    setAnchorEl(null);
    setIsProfileFormOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsProfileFormOpen(false);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    handleClose();
  };

  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="school">
            <SchoolIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GradVerse
          </Typography>
          <TextField
            id="search"
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <StarIcon />
          </IconButton>
          <IconButton color="inherit">
            <FavoriteBorderIcon />
          </IconButton>
          {/* User profile picture with popup menu */}
          <IconButton
            aria-label="user profile"
            color="inherit"
            onClick={handleClick}
          >
            <Avatar alt="User" src={logo} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Home</MenuItem>
            <MenuItem onClick={handleMyProfileClick}>My Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {isProfileFormOpen && (
        <form>
          <TextField label="Degree Seeking" fullWidth margin="normal" />
          <TextField label="Intake" fullWidth margin="normal" />
          <TextField label="Undergrad Grade" fullWidth margin="normal" />
          <TextField label="Undergrad College" fullWidth margin="normal" />
          <TextField label="Undergrad Course" fullWidth margin="normal" />
          <TextField label="GRE" fullWidth margin="normal" />
          <TextField label="IELTS" fullWidth margin="normal" />
          <TextField label="Experience Company" fullWidth margin="normal" />
          <TextField label="Experience Designation" fullWidth margin="normal" />
          <TextField label="Experience Duration" fullWidth margin="normal" />
          <button type="submit">Save</button>
        </form>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center">
            <Stack direction="column">
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                Student Name
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        {/* Student Cards - 2x2 Grid */}
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <StudentCard title="Degree Seeking" mandatoryContent={student.degreeseeking} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StudentCard title="Intake" mandatoryContent={student.intake} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StudentCard
            title="Educational Details"
            mandatoryContent={student.undergradGrade}
            optionalContent={student.undergradcollege}
            optionalContent2={student.undergradcourse}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StudentCard
            title="Test Scores"
            mandatoryContent={student.gre}
            optionalContent={student.ielts}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StudentCard
            title="Work Experience"
            mandatoryContent={student.expCompany}
            optionalContent={student.expDesignation}
            optionalContent2={student.expDuration}
          />
        </Grid>
        </Grid>

        </Grid>

        {/* Shortlist Cards - To the Right */}
        <Grid item xs={12} sm={6} md={6}>
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
      <ShortlistCard
            college="Northeastern University"
            program="Computer Science"
          />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
    <ShortlistCard
            college="Harvard University"
            program="Computer Science"
          />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <ShortlistCard
            college="UC Santa Cruz"
            program="Computer Science"
          />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <ShortlistCard
            college="UTD Dallas"
            program="Computer Science"
          />
          </Grid>
          </Grid>
    </div>
  );
};

export default StudentProfile;

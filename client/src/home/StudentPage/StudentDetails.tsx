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
  Container,
  Paper,
  Box,
  Card,
  CardContent,
  Fade,
  Divider,
  Chip,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Student from '../../models/student';
import StudentCard from './StudentCard';
import ShortlistCard from './ShortlistCard';
import EventIcon from '@mui/icons-material/Event';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkIcon from '@mui/icons-material/Work';
import College from '../../models/college';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { useSelector } from 'react-redux';
import { loadStudent, searchstudent } from '../../store/slices/studentdetails-slice'
import { retrieveUsers } from '../../store/slices/login-slice';
import User from '../../models/user';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { authFetch } from '../../helpers/authFetch';

// Enhanced functional component definition for StudentDetails
const StudentDetails: React.FC = (): ReactElement => {
  // Redux state management
  const studentLoggedIn: User[] = useSelector(retrieveUsers());
  const dispatch = useDispatch<AppDispatch>();
  const students = useSelector(searchstudent());
  const { t } = useTranslation('student-details');
  const navigate = useNavigate();
  const location = useLocation();

  // Hydrate Redux/localStorage with student profile on mount
  React.useEffect(() => {
    const fetchStudentProfile = async () => {
      let email = studentLoggedIn[0]?.email;
      if (!email) {
        // Try to get from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            email = parsedUser.email;
          } catch {}
        }
      }
      if (!email) return;
      const token = window.localStorage.getItem('token');
      const response = await authFetch(`http://localhost:3001/students/${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
      });
      const data = await response.json();
      const studentData = Array.isArray(data) ? data[0] : data;
      if (studentData) {
        dispatch(loadStudent(studentData));
        window.localStorage.setItem('studentProfile', JSON.stringify(studentData));
      }
    };
    fetchStudentProfile();
  }, [dispatch, studentLoggedIn]);

  // Enhanced StudentCard component with modern styling
  const EnhancedStudentCard = ({ 
    title, 
    icon, 
    mandatoryContent, 
    optionalContent, 
    optionalContent2,
    color = '#667eea',
    gradientFrom = 'rgba(102, 126, 234, 0.05)',
    gradientTo = 'rgba(118, 75, 162, 0.05)'
  }: {
    title: string;
    icon: React.ReactNode;
    mandatoryContent?: string;
    optionalContent?: string;
    optionalContent2?: string;
    color?: string;
    gradientFrom?: string;
    gradientTo?: string;
  }) => (
    <Card
      elevation={6}
      sx={{
        mb: 3,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        border: `1px solid ${color}20`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${color}20`,
          '& .card-icon': {
            transform: 'scale(1.1) rotate(5deg)',
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
        }
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Box
            className="card-icon"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 3,
              background: `linear-gradient(45deg, ${color}, ${color}cc)`,
              color: 'white',
              transition: 'all 0.3s ease',
              boxShadow: `0 8px 20px ${color}30`
            }}
          >
            {icon}
          </Box>
          <Typography 
            variant="h6" 
            fontWeight={700}
            sx={{ 
              color: color,
              flex: 1
            }}
          >
            {title}
          </Typography>
          <Chip
            icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
            label="Profile"
            size="small"
            sx={{
              background: `${color}15`,
              color: color,
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: color
              }
            }}
          />
        </Stack>

        <Divider sx={{ mb: 3, opacity: 0.3 }} />

        {/* Content */}
        <Stack spacing={2}>
          {mandatoryContent && (
            <Paper
              elevation={1}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.8)',
                border: `1px solid ${color}10`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.95)',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: '#2d3748',
                  mb: 0.5
                }}
              >
                Primary Information
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: color,
                  fontSize: '1.1rem',
                  fontWeight: 500
                }}
              >
                {mandatoryContent}
              </Typography>
            </Paper>
          )}

          {optionalContent && (
            <Paper
              elevation={1}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.8)',
                border: `1px solid ${color}10`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.95)',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#718096',
                  fontWeight: 500,
                  mb: 0.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem'
                }}
              >
                Additional Details
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: '#2d3748',
                  fontWeight: 500
                }}
              >
                {optionalContent}
              </Typography>
            </Paper>
          )}

          {optionalContent2 && (
            <Paper
              elevation={1}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.8)',
                border: `1px solid ${color}10`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.95)',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#718096',
                  fontWeight: 500,
                  mb: 0.5,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem'
                }}
              >
                Secondary Information
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: '#2d3748',
                  fontWeight: 500
                }}
              >
                {optionalContent2}
              </Typography>
            </Paper>
          )}
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
        mt: 60,
        ml: 60
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Fade in timeout={800}>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'right'
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} sx={{ mb: 2 }}>
              <PersonIcon sx={{ fontSize: 40, color: '#667eea' }} />
              <Typography 
                variant="h3" 
                component="h1"
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Student Profile
              </Typography>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#764ba2' }} />
            </Stack>
            
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, mb: 2 }}>
              Your academic journey and achievements at a glance
            </Typography>

            {/* Profile Stats */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="flex-end"
              alignItems="center"
            >
              <Chip
                icon={<SchoolIcon />}
                label="Academic Profile"
                sx={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  fontWeight: 600,
                  px: 2,
                  '& .MuiChip-icon': { color: 'white' }
                }}
              />
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => navigate('/studentform')}
                sx={{
                  borderColor: '#667eea',
                  color: '#667eea',
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 3,
                  '&:hover': {
                    borderColor: '#667eea',
                    background: 'rgba(102, 126, 234, 0.05)',
                  }
                }}
              >
                Edit Profile
              </Button>
            </Stack>
          </Paper>
        </Fade>

        {/* Profile Cards Container */}
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            p: 4
          }}
        >
          <Grid container spacing={4}>
            {/* Educational Details */}
            <Grid item xs={12} lg={6}>
              <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
                <Box>
                  <EnhancedStudentCard
                    title={t('educational-details')}
                    icon={<MenuBookIcon sx={{ fontSize: 24 }} />}
                    mandatoryContent={students?.undergradgrade}
                    optionalContent={students?.undergradcollege}
                    optionalContent2={students?.undergradcourse}
                    color="#667eea"
                    gradientFrom="rgba(102, 126, 234, 0.05)"
                    gradientTo="rgba(118, 75, 162, 0.05)"
                  />
                </Box>
              </Fade>
            </Grid>

            {/* Test Scores */}
            <Grid item xs={12} lg={6}>
              <Fade in timeout={1000} style={{ transitionDelay: '400ms' }}>
                <Box>
                  <EnhancedStudentCard
                    title={t('test-scores')}
                    icon={<AssessmentIcon sx={{ fontSize: 24 }} />}
                    mandatoryContent={students?.gre}
                    optionalContent={students?.ielts}
                    color="#4caf50"
                    gradientFrom="rgba(76, 175, 80, 0.05)"
                    gradientTo="rgba(102, 126, 234, 0.05)"
                  />
                </Box>
              </Fade>
            </Grid>

            {/* Work Experience */}
            <Grid item xs={12} lg={6}>
              <Fade in timeout={1000} style={{ transitionDelay: '600ms' }}>
                <Box>
                  <EnhancedStudentCard
                    title={t('work-experience')}
                    icon={<WorkIcon sx={{ fontSize: 24 }} />}
                    mandatoryContent={students?.experiencecompany}
                    optionalContent={students?.experiencedesignation}
                    optionalContent2={students?.experienceduration}
                    color="#ff9800"
                    gradientFrom="rgba(255, 152, 0, 0.05)"
                    gradientTo="rgba(118, 75, 162, 0.05)"
                  />
                </Box>
              </Fade>
            </Grid>

            {/* Additional Actions Card */}
            <Grid item xs={12} lg={6}>
              <Fade in timeout={1000} style={{ transitionDelay: '800ms' }}>
                <Card
                  elevation={6}
                  sx={{
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, rgba(118, 75, 162, 0.05) 0%, rgba(102, 126, 234, 0.05) 100%)',
                    border: '1px solid rgba(118, 75, 162, 0.2)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: 200
                  }}
                >
                  <CardContent sx={{ textAlign: 'right', p: 4 }}>
                    <Stack spacing={3} alignItems="flex-end">
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 4,
                          background: 'linear-gradient(45deg, #764ba2, #667eea)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 20px rgba(118, 75, 162, 0.3)'
                        }}
                      >
                        <StarIcon sx={{ fontSize: 32, color: 'white' }} />
                      </Box>
                      
                      <Typography variant="h6" fontWeight={600} color="#764ba2">
                        Profile Management
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Keep your profile updated to get better recommendations
                      </Typography>
                      
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => navigate('/studentform')}
                          sx={{
                            background: 'linear-gradient(45deg, #764ba2, #667eea)',
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'linear-gradient(45deg, #6a4190, #5a6fd8)',
                            }
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<TrendingUpIcon />}
                          sx={{
                            borderColor: '#764ba2',
                            color: '#764ba2',
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              borderColor: '#764ba2',
                              background: 'rgba(118, 75, 162, 0.05)',
                            }
                          }}
                        >
                          Analytics
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

// Exporting the component as default
export default StudentDetails;
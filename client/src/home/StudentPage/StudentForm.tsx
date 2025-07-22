import React, { useState } from 'react';
import { 
    TextField, 
    Button, 
    InputLabel, 
    MenuItem, 
    Select, 
    SelectChangeEvent,
    Container,
    Paper,
    Typography,
    Box,
    Stack,
    Card,
    CardContent,
    Fade,
    Divider,
    Grid,
    InputAdornment,
    Chip
} from '@mui/material';
import { useSelector } from 'react-redux';
import { retrieveUsers } from '../../store/slices/login-slice';
import User from '../../models/user';
import { loadStudent, searchstudent } from '../../store/slices/studentdetails-slice';
import Student from '../../models/student';
import { useNavigate } from 'react-router-dom';
import { collegeOptions, experinceOptions, intakeOptions, majorOptions } from '../../constants/menuItems';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import GradeIcon from '@mui/icons-material/Grade';
import WorkIcon from '@mui/icons-material/Work';
import SaveIcon from '@mui/icons-material/Save';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';

// Define the structure of form values
type FormValues = {
  degreeseeking: string;
  intake: string;
  undergradgrade: string;
  undergradcollege: string;
  undergradcourse: string;
  gre: string;
  ielts: string;
  experiencecompany: string;
  experiencedesignation: string;
  experienceduration: string;
};

// Initial values for the form fields
const initialFormValues: FormValues = {
  degreeseeking: '',
  intake: '',
  undergradgrade: '',
  undergradcollege: '',
  undergradcourse: '',
  gre: '',
  ielts: '',
  experiencecompany: '',
  experiencedesignation: '',
  experienceduration: '',
};

// Enhanced functional component for the student form
const StudentForm: React.FC = () => {
  // Retrieve the current student from Redux state
  const currentStudent: Student = useSelector(searchstudent());
  // Initialize navigation hook
  const navigate = useNavigate();
  
  // State hook to manage form values
  const [formValues, setFormValues] = useState<FormValues>({
    degreeseeking: currentStudent.degreeseeking || '',
    intake: currentStudent.intake || '',
    undergradgrade: currentStudent.undergradgrade || '',
    undergradcollege: currentStudent.undergradcollege || '',
    undergradcourse: currentStudent.undergradcourse || '',
    gre: currentStudent.gre ? (currentStudent.gre.replace('GRE', '').trim()) : '',
    ielts: currentStudent.ielts ? (currentStudent.ielts.replace('IELTS', '').trim()) : '',
    experiencecompany: currentStudent.experiencecompany || '',
    experiencedesignation: currentStudent.experiencedesignation || '',
    experienceduration: currentStudent.experienceduration || '',
  });

  // Handle form submission
  const HandleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prepare the updated fields for the PATCH request
    const updateFields = {
      degreeseeking: formValues.degreeseeking,
      intake: formValues.intake,
      undergradgrade: formValues.undergradgrade,
      undergradcollege: formValues.undergradcollege,
      undergradcourse: formValues.undergradcourse,
      gre: `GRE ${formValues.gre}`,
      ielts: `IELTS ${formValues.ielts}`,
      experiencecompany: formValues.experiencecompany,
      experiencedesignation: formValues.experiencedesignation,
      experienceduration: formValues.experienceduration,
    };

    // Send a PATCH request to update student data
    const response = await fetch(`http://localhost:3001/students/${currentStudent._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateFields),
    });

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    try {
      const updatedStudent = await response.json();
      console.log('Student updated:', updatedStudent);

      // Reset form values and navigate to the student details page  
      setFormValues(initialFormValues);
      navigate('/studentdetails');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Handle form field changes
  const handleChange = (fieldName: keyof FormValues) => (
    event: React.ChangeEvent<{ value: unknown }> | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Extract the value from the event and update the form values
    const value = 'value' in event.target ? (event.target.value as string) : (event.target as HTMLInputElement).value;
    setFormValues({ ...formValues, [fieldName]: value });
  };

  // Custom styled form field component
  const FormField = ({ children, icon, title }: { children: React.ReactNode, icon?: React.ReactNode, title?: string }) => (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 3, 
        background: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(102, 126, 234, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.1)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      {title && (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          {icon}
          <Typography variant="subtitle1" fontWeight={600} color="#667eea">
            {title}
          </Typography>
        </Stack>
      )}
      {children}
    </Paper>
  );

  // Render the enhanced student form
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
        mt: 23,
        ml: 10
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
              textAlign: 'center'
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
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
                Student Profile Details
              </Typography>
              <AssignmentIcon sx={{ fontSize: 40, color: '#764ba2' }} />
            </Stack>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
              Please enter your details to complete your profile
            </Typography>
          </Paper>
        </Fade>

        {/* Form Container */}
        <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
          <Paper
            elevation={6}
            sx={{
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ p: 4 }}>
              <form onSubmit={HandleFormSubmit}>
                <Grid container spacing={4}>
                  {/* Academic Information Section */}
                  <Grid item xs={12}>
                    <Card 
                      elevation={2}
                      sx={{
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                        border: '1px solid rgba(102, 126, 234, 0.1)'
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                          <SchoolIcon sx={{ color: '#667eea', fontSize: 28 }} />
                          <Typography variant="h5" fontWeight={600}>
                            Academic Information
                          </Typography>
                        </Stack>
                        <Divider sx={{ mb: 4 }} />
                        
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <FormField>
                              <InputLabel 
                                sx={{ 
                                  color: '#667eea', 
                                  fontWeight: 600, 
                                  mb: 1,
                                  position: 'relative',
                                  transform: 'none',
                                  fontSize: '1rem'
                                }}
                              >
                                Degree Seeking
                              </InputLabel>
                              <Select
                                fullWidth
                                value={formValues.degreeseeking}
                                onChange={handleChange('degreeseeking') as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                                sx={{
                                  borderRadius: 2,
                                  '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(102, 126, 234, 0.3)',
                                  },
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#667eea',
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#667eea',
                                  }
                                }}
                              >
                                <MenuItem value="Masters">Masters</MenuItem>
                              </Select>
                            </FormField>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <FormField>
                              <InputLabel 
                                sx={{ 
                                  color: '#667eea', 
                                  fontWeight: 600, 
                                  mb: 1,
                                  position: 'relative',
                                  transform: 'none',
                                  fontSize: '1rem'
                                }}
                              >
                                Intake
                              </InputLabel>
                              <Select
                                fullWidth
                                value={formValues.intake}
                                onChange={handleChange('intake') as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                                sx={{
                                  borderRadius: 2,
                                  '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(102, 126, 234, 0.3)',
                                  },
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#667eea',
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#667eea',
                                  }
                                }}
                              >
                                {intakeOptions.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                      <CalendarTodayIcon sx={{ fontSize: 20, color: '#667eea' }} />
                                      <Typography>{option.label}</Typography>
                                    </Stack>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormField>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <FormField>
                              <TextField
                                label="Undergrad Grade"
                                fullWidth
                                value={formValues.undergradgrade}
                                onChange={handleChange('undergradgrade')}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <GradeIcon sx={{ color: '#667eea' }} />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '& fieldset': {
                                      borderColor: 'rgba(102, 126, 234, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: '#667eea',
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: '#667eea',
                                    },
                                  },
                                  '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#667eea',
                                  }
                                }}
                              />
                            </FormField>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <FormField>
                              <InputLabel 
                                sx={{ 
                                  color: '#667eea', 
                                  fontWeight: 600, 
                                  mb: 1,
                                  position: 'relative',
                                  transform: 'none',
                                  fontSize: '1rem'
                                }}
                              >
                                Undergrad College
                              </InputLabel>
                              <Select
                                fullWidth
                                value={formValues.undergradcollege}
                                onChange={handleChange('undergradcollege') as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                                sx={{
                                  borderRadius: 2,
                                  '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(102, 126, 234, 0.3)',
                                  },
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#667eea',
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#667eea',
                                  }
                                }}
                              >
                                {collegeOptions.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormField>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <FormField>
                              <InputLabel 
                                sx={{ 
                                  color: '#667eea', 
                                  fontWeight: 600, 
                                  mb: 1,
                                  position: 'relative',
                                  transform: 'none',
                                  fontSize: '1rem'
                                }}
                              >
                                Undergrad Course
                              </InputLabel>
                              <Select
                                fullWidth
                                value={formValues.undergradcourse}
                                onChange={handleChange('undergradcourse') as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                                sx={{
                                  borderRadius: 2,
                                  '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(102, 126, 234, 0.3)',
                                  },
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#667eea',
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#667eea',
                                  }
                                }}
                              >
                                {majorOptions.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormField>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Test Scores Section */}
                  <Grid item xs={12}>
                    <Card 
                      elevation={2}
                      sx={{
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(102, 126, 234, 0.05) 100%)',
                        border: '1px solid rgba(76, 175, 80, 0.1)'
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                          <GradeIcon sx={{ color: '#4caf50', fontSize: 28 }} />
                          <Typography variant="h5" fontWeight={600}>
                            Test Scores
                          </Typography>
                        </Stack>
                        <Divider sx={{ mb: 4 }} />
                        
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <FormField>
                              <TextField
                                label="GRE Score"
                                fullWidth
                                value={formValues.gre}
                                onChange={handleChange('gre')}
                                placeholder="Enter your GRE score"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Chip label="/ 340" size="small" sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50' }} />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '& fieldset': {
                                      borderColor: 'rgba(76, 175, 80, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: '#4caf50',
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: '#4caf50',
                                    },
                                  },
                                  '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#4caf50',
                                  }
                                }}
                              />
                            </FormField>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <FormField>
                              <TextField
                                label="IELTS Score"
                                fullWidth
                                value={formValues.ielts}
                                onChange={handleChange('ielts')}
                                placeholder="Enter your IELTS score"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Chip label="/ 9" size="small" sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50' }} />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '& fieldset': {
                                      borderColor: 'rgba(76, 175, 80, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: '#4caf50',
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: '#4caf50',
                                    },
                                  },
                                  '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#4caf50',
                                  }
                                }}
                              />
                            </FormField>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Work Experience Section */}
                  <Grid item xs={12}>
                    <Card 
                      elevation={2}
                      sx={{
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                        border: '1px solid rgba(255, 152, 0, 0.1)'
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                          <WorkIcon sx={{ color: '#ff9800', fontSize: 28 }} />
                          <Typography variant="h5" fontWeight={600}>
                            Work Experience
                          </Typography>
                        </Stack>
                        <Divider sx={{ mb: 4 }} />
                        
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={4}>
                            <FormField>
                              <TextField
                                label="Company Name"
                                fullWidth
                                value={formValues.experiencecompany}
                                onChange={handleChange('experiencecompany')}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <BusinessIcon sx={{ color: '#ff9800' }} />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '& fieldset': {
                                      borderColor: 'rgba(255, 152, 0, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: '#ff9800',
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: '#ff9800',
                                    },
                                  },
                                  '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#ff9800',
                                  }
                                }}
                              />
                            </FormField>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <FormField>
                              <TextField
                                label="Designation"
                                fullWidth
                                value={formValues.experiencedesignation}
                                onChange={handleChange('experiencedesignation')}
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '& fieldset': {
                                      borderColor: 'rgba(255, 152, 0, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: '#ff9800',
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: '#ff9800',
                                    },
                                  },
                                  '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#ff9800',
                                  }
                                }}
                              />
                            </FormField>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <FormField>
                              <InputLabel 
                                sx={{ 
                                  color: '#ff9800', 
                                  fontWeight: 600, 
                                  mb: 1,
                                  position: 'relative',
                                  transform: 'none',
                                  fontSize: '1rem'
                                }}
                              >
                                Experience Duration
                              </InputLabel>
                              <Select
                                fullWidth
                                value={formValues.experienceduration}
                                onChange={handleChange('experienceduration') as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
                                sx={{
                                  borderRadius: 2,
                                  '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 152, 0, 0.3)',
                                  },
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ff9800',
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ff9800',
                                  }
                                }}
                              >
                                {experinceOptions.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormField>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center', pt: 2 }}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        size="large"
                        startIcon={<SaveIcon />}
                        sx={{
                          px: 6,
                          py: 2,
                          borderRadius: 3,
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          minWidth: 200,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
                            boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Save Profile
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

// Export the StudentForm component
export default StudentForm;
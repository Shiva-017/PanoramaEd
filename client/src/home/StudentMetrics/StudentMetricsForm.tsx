import { 
    Box, 
    Button, 
    FormControl, 
    InputAdornment, 
    OutlinedInput, 
    SelectChangeEvent, 
    Slider, 
    Stack, 
    ThemeProvider, 
    ToggleButton, 
    ToggleButtonGroup, 
    Typography,
    Container,
    Paper,
    Card,
    CardContent,
    Fade,
    Divider,
    Stepper,
    Step,
    StepLabel,
    Chip
} from "@mui/material";
import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import StudentMetricField from "./StudentMetricField";
import { collegeOptions, countryOptions, courseOptions, majorOptions } from "../../constants/menuItems";
import theme from "../../providers/themeProvider";
import { AppDispatch } from "../../store";
import { loadSuggestedPrograms } from "../../store/slices/college-suggest";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import SchoolIcon from '@mui/icons-material/School';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import GradeIcon from '@mui/icons-material/Grade';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { authFetch } from '../../helpers/authFetch';

const StudentMetricsForm: React.FC = (): ReactElement => {
    const [country, setCountry] = React.useState<string>("Select Country");
    const [course, setCourse] = React.useState<string>("Select Course");
    const [college, setCollege] = React.useState<string>("Select College");
    const [major, setMajor] = React.useState<string>("Select Major");
    const [alignment, setAlignment] = React.useState<string | null>('left');
    const [sopRating, setSOPRating] = React.useState<number>(1);
    const [resumeRating, setResumeRating] = React.useState<number>(1);
    const [lorReq, setLorReq] = React.useState<number>(0);
    const [exp, setExp] = React.useState<number>(0);
    const [englishTest, setEnglishTest] = React.useState<string>('');
    const [greScore, setGreScore] = React.useState<string>('');
    const [englishScore, setEnglishScore] = React.useState<string>('');
    const [cgpa, setCgpa] = React.useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { t } = useTranslation('student-metric-form');

    const findSuggestedColleges = async () => {
        let englishTestScore = {};
        if (englishTest === "TOEFL") {
            englishTestScore = {
                toeflScore: englishScore
            }
        } else if (englishTest === "IELTS") {
            englishTestScore = {
                ieltsScore: englishScore
            }
        }
        const studentMetrics = {
            studentData: {
                greScore: greScore,
                ...englishTestScore,
                cgpa: cgpa,
                sopRating: sopRating,
                lorRequired: lorReq,
            },
            exp: exp,
            resumeRating: resumeRating,
            country: country,
            program: major,
        }

        try {
            const response = await authFetch(`http://localhost:3001/programs/suggest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentMetrics),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            dispatch(loadSuggestedPrograms(data));
            navigate('/suggested-colleges')

        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };

    const handleSOPSliderChange = (event: Event, newValue: number | number[]) => {
        setSOPRating(newValue as number);
    };
    const handleResumeSliderChange = (event: Event, newValue: number | number[]) => {
        setResumeRating(newValue as number);
    };
    const handleLorSliderChange = (event: Event, newValue: number | number[]) => {
        setLorReq(newValue as number);
    };
    const handleExpSliderChange = (event: Event, newValue: number | number[]) => {
        setExp(newValue as number);
    };

    const handleChange = (event: SelectChangeEvent<string>) => {
        const {
            target: { value },
        } = event;
        const type = event.target.name;
        switch (type) {
            case "country":
                setCountry(value);
                break;
            case "course":
                setCourse(value);
                break;
            case "college":
                setCollege(value);
                break;
            case "major":
                setMajor(value);
                break;
            default:
                break;
        }
    };

    const steps = ['Basic Info', 'Academic Scores', 'Profile Ratings'];

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: 4,
                    mt: 80,
                }}
            >
                <Container maxWidth="xl">
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
                                <TravelExploreIcon sx={{ fontSize: 40, color: '#667eea' }} />
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
                                    {t('dreamEducation')}
                                </Typography>
                                <SchoolIcon sx={{ fontSize: 40, color: '#764ba2' }} />
                            </Stack>
                            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                                Tell us about yourself to find your perfect university match
                            </Typography>
                        </Paper>
                    </Fade>

                    <FormControl component="div" sx={{ width: '100%' }}>
                        {/* Basic Information Section */}
                        <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
                            <Card 
                                elevation={6}
                                sx={{
                                    mb: 4,
                                    borderRadius: 4,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                                        <SchoolIcon sx={{ color: '#667eea', fontSize: 28 }} />
                                        <Typography variant="h5" fontWeight={600}>
                                            Study Preferences
                                        </Typography>
                                    </Stack>
                                    <Divider sx={{ mb: 4 }} />
                                    
                                    <Stack 
                                        direction={{ xs: 'column', md: 'row' }} 
                                        spacing={4} 
                                        justifyContent="center"
                                        sx={{ mb: 3 }}
                                    >
                                        <StudentMetricField 
                                            items={countryOptions} 
                                            defaultValue={t('selectCountry')} 
                                            name="country" 
                                            clickHandler={handleChange} 
                                            id="country-select" 
                                            value={country} 
                                            header={t('studyLocation')}
                                        />
                                        <StudentMetricField 
                                            items={courseOptions} 
                                            defaultValue={t('selectCourse')} 
                                            name="course" 
                                            clickHandler={handleChange} 
                                            id="course-select" 
                                            value={course} 
                                            header={t('studyPlan')}
                                        />
                                    </Stack>
                                    
                                    <Stack 
                                        direction={{ xs: 'column', md: 'row' }} 
                                        spacing={4} 
                                        justifyContent="center"
                                    >
                                        <StudentMetricField 
                                            items={collegeOptions} 
                                            defaultValue={t('selectCollege')} 
                                            name="college" 
                                            clickHandler={handleChange} 
                                            id="college-select" 
                                            value={college} 
                                            header={t('undergraduateCollege')}
                                        />
                                        <StudentMetricField 
                                            items={majorOptions} 
                                            defaultValue={t('selectMajor')} 
                                            name="major" 
                                            clickHandler={handleChange} 
                                            id="major-select" 
                                            value={major} 
                                            header={t('majorCourse')}
                                        />
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Fade>

                        {/* Academic Scores Section */}
                        <Fade in timeout={1000} style={{ transitionDelay: '400ms' }}>
                            <Card 
                                elevation={6}
                                sx={{
                                    mb: 4,
                                    borderRadius: 4,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                                        <GradeIcon sx={{ color: '#667eea', fontSize: 28 }} />
                                        <Typography variant="h5" fontWeight={600}>
                                            Academic Scores
                                        </Typography>
                                    </Stack>
                                    <Divider sx={{ mb: 4 }} />
                                    
                                    <Stack 
                                        direction={{ xs: 'column', lg: 'row' }} 
                                        spacing={4} 
                                        justifyContent="center" 
                                        alignItems="flex-start"
                                    >
                                        {/* CGPA */}
                                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, flex: 1, maxWidth: 300 }}>
                                            <Typography variant="h6" sx={{ mb: 2, color: '#667eea', fontWeight: 600 }}>
                                                {t('cgpa')}
                                            </Typography>
                                            <OutlinedInput
                                                placeholder="Enter CGPA"
                                                endAdornment={<InputAdornment position="end">/ 4.0</InputAdornment>}
                                                sx={{
                                                    width: '100%',
                                                    borderRadius: 2,
                                                    '& .MuiOutlinedInput-root': {
                                                        '&:hover fieldset': {
                                                            borderColor: '#667eea',
                                                        },
                                                    }
                                                }}
                                                onChange={(e) => setCgpa(e.target.value)}
                                            />
                                        </Paper>

                                        {/* English Test */}
                                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, flex: 1, maxWidth: 400 }}>
                                            <Typography variant="h6" sx={{ mb: 2, color: '#667eea', fontWeight: 600 }}>
                                                {t('englishTest')}
                                            </Typography>
                                            <ToggleButtonGroup
                                                value={englishTest}
                                                exclusive
                                                onChange={(event, newAlignment) => {
                                                    setEnglishTest(newAlignment);
                                                }}
                                                sx={{ mb: 2, width: '100%' }}
                                            >
                                                <ToggleButton 
                                                    value="IELTS" 
                                                    sx={{ 
                                                        flex: 1, 
                                                        borderRadius: '12px 0 0 12px',
                                                        '&.Mui-selected': {
                                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                            color: 'white'
                                                        }
                                                    }}
                                                >
                                                    IELTS
                                                </ToggleButton>
                                                <ToggleButton 
                                                    value="TOEFL" 
                                                    sx={{ 
                                                        flex: 1, 
                                                        borderRadius: '0 12px 12px 0',
                                                        '&.Mui-selected': {
                                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                            color: 'white'
                                                        }
                                                    }}
                                                >
                                                    TOEFL
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                            
                                            {englishTest && (
                                                <Fade in timeout={500}>
                                                    <Box>
                                                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                                                            What was your {englishTest} Score?
                                                        </Typography>
                                                        <OutlinedInput
                                                            placeholder={`Enter ${englishTest} score`}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    {englishTest === 'IELTS' ? "/9" : "/120"}
                                                                </InputAdornment>
                                                            }
                                                            sx={{
                                                                width: '100%',
                                                                borderRadius: 2,
                                                            }}
                                                            onChange={(e) => setEnglishScore(e.target.value)}
                                                        />
                                                    </Box>
                                                </Fade>
                                            )}
                                        </Paper>

                                        {/* GRE Score */}
                                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, flex: 1, maxWidth: 300 }}>
                                            <Typography variant="h6" sx={{ mb: 2, color: '#667eea', fontWeight: 600 }}>
                                                {t('greScore')}
                                            </Typography>
                                            <OutlinedInput
                                                placeholder="Enter GRE score"
                                                endAdornment={<InputAdornment position="end">/ 340</InputAdornment>}
                                                sx={{
                                                    width: '100%',
                                                    borderRadius: 2,
                                                }}
                                                onChange={(e) => setGreScore(e.target.value)}
                                            />
                                        </Paper>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Fade>

                        {/* Profile Ratings Section */}
                        <Fade in timeout={1000} style={{ transitionDelay: '600ms' }}>
                            <Card 
                                elevation={6}
                                sx={{
                                    mb: 4,
                                    borderRadius: 4,
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                                        <StarIcon sx={{ color: '#667eea', fontSize: 28 }} />
                                        <Typography variant="h5" fontWeight={600}>
                                            Profile Ratings & Experience
                                        </Typography>
                                    </Stack>
                                    <Divider sx={{ mb: 4 }} />
                                    
                                    {/* Rating Sliders */}
                                    <Stack 
                                        direction={{ xs: 'column', lg: 'row' }} 
                                        spacing={4} 
                                        sx={{ mb: 4 }}
                                    >
                                        <Paper elevation={1} sx={{ p: 3, borderRadius: 3, flex: 1 }}>
                                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                                <AssignmentIcon sx={{ color: '#667eea', fontSize: 20 }} />
                                                <Typography variant="h6" fontWeight={600}>
                                                    {t('sopRating')}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Slider
                                                    value={sopRating}
                                                    onChange={handleSOPSliderChange}
                                                    step={1}
                                                    marks
                                                    min={1}
                                                    max={5}
                                                    sx={{
                                                        color: '#667eea',
                                                        '& .MuiSlider-thumb': {
                                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                        }
                                                    }}
                                                />
                                                <Chip 
                                                    label={sopRating} 
                                                    sx={{ 
                                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                        color: 'white',
                                                        fontWeight: 600
                                                    }} 
                                                />
                                            </Stack>
                                        </Paper>

                                        <Paper elevation={1} sx={{ p: 3, borderRadius: 3, flex: 1 }}>
                                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                                <WorkIcon sx={{ color: '#667eea', fontSize: 20 }} />
                                                <Typography variant="h6" fontWeight={600}>
                                                    {t('resumeRating')}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Slider
                                                    value={resumeRating}
                                                    onChange={handleResumeSliderChange}
                                                    step={1}
                                                    marks
                                                    min={1}
                                                    max={5}
                                                    sx={{
                                                        color: '#667eea',
                                                        '& .MuiSlider-thumb': {
                                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                        }
                                                    }}
                                                />
                                                <Chip 
                                                    label={resumeRating} 
                                                    sx={{ 
                                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                        color: 'white',
                                                        fontWeight: 600
                                                    }} 
                                                />
                                            </Stack>
                                        </Paper>

                                        <Paper elevation={1} sx={{ p: 3, borderRadius: 3, flex: 1 }}>
                                            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                                                {t('recommendationCount')}
                                            </Typography>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Slider
                                                    value={lorReq}
                                                    onChange={handleLorSliderChange}
                                                    step={1}
                                                    marks
                                                    min={0}
                                                    max={3}
                                                    sx={{
                                                        color: '#667eea',
                                                        '& .MuiSlider-thumb': {
                                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                        }
                                                    }}
                                                />
                                                <Chip 
                                                    label={lorReq} 
                                                    sx={{ 
                                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                        color: 'white',
                                                        fontWeight: 600
                                                    }} 
                                                />
                                            </Stack>
                                        </Paper>
                                    </Stack>

                                    {/* Experience and Submit */}
                                    <Stack 
                                        direction={{ xs: 'column', md: 'row' }} 
                                        spacing={4} 
                                        alignItems="center" 
                                        justifyContent="center"
                                    >
                                        <Paper elevation={1} sx={{ p: 3, borderRadius: 3, minWidth: 300 }}>
                                            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                                                {t('experienceYears')}
                                            </Typography>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Slider
                                                    value={exp}
                                                    onChange={handleExpSliderChange}
                                                    step={1}
                                                    marks
                                                    min={0}
                                                    max={5}
                                                    sx={{
                                                        color: '#667eea',
                                                        '& .MuiSlider-thumb': {
                                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                        }
                                                    }}
                                                />
                                                <Chip 
                                                    label={`${exp} years`} 
                                                    sx={{ 
                                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                        color: 'white',
                                                        fontWeight: 600
                                                    }} 
                                                />
                                            </Stack>
                                        </Paper>

                                        <Button 
                                            variant="contained" 
                                            size="large"
                                            startIcon={<SearchIcon />}
                                            onClick={findSuggestedColleges}
                                            sx={{
                                                height: 60,
                                                px: 4,
                                                borderRadius: 3,
                                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                                                textTransform: 'none',
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                minWidth: 250,
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
                                                    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                                                    transform: 'translateY(-2px)',
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {t('FindUniversities')}
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Fade>
                    </FormControl>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default StudentMetricsForm;
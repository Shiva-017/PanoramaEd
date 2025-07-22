import { 
  Alert, 
  CardMedia, 
  IconButton, 
  Stack, 
  Typography, 
  Box, 
  Container, 
  Paper,
  Chip,
  Fade,
  Divider,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { Avatar } from '@mui/material';
import College, { Program } from '../../models/college';
import SchoolIcon from '@mui/icons-material/School';
import ProgramCard from './ProgramCard';
import { startTransition } from 'react';
import { ReactElement, useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { searchCollege } from '../../store/slices/college-slice';
import { searchstudent } from '../../store/slices/studentdetails-slice';
import { styled, alpha } from '@mui/material/styles';

// Styled components for enhanced design
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 400,
  borderRadius: 24,
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
    zIndex: 1,
  },
}));

const CollegeAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: '6px solid white',
  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
  position: 'relative',
  zIndex: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 16px 50px rgba(0,0,0,0.4)',
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 20,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
    background: 'rgba(255, 255, 255, 0.95)',
  },
}));

const FavoriteButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  width: 64,
  height: 64,
  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  color: '#2c3e50',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -8,
    width: 60,
    height: 4,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 2,
  },
}));

const CollegeDetails: React.FC = (): ReactElement => {
  const [collegeData, setCollegeData] = useState<College>();
  const [favourite, setFavourite] = useState<boolean>(false);
  const college: College = useSelector(searchCollege());
  const { t } = useTranslation('college-page');
  const [showAlert, setShowAlert] = useState(0);
  const student = useSelector(searchstudent());

  // API functions remain the same
  const shortlistCollege = async () => {
    console.log(collegeData, "collegedata")
    try {
      const response = await fetch(`http://localhost:3001/colleges?studentId=${student._id}&collegeId=${collegeData?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("🚀 ~ file: CollegePage.tsx:43 ~ shortlistCollege ~ data:", data)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeShortlistCollege = async () => {
    try {
      const response = await fetch(`http://localhost:3001/colleges/removeShortlist?studentId=${student._id}&collegeId=${collegeData?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFavourites = () => {
    setFavourite(!favourite);
    if (!favourite) {
      setShowAlert(1);
      shortlistCollege();
      setTimeout(() => {
        setShowAlert(0);
      }, 1500);
    } else {
      setShowAlert(2);
      removeShortlistCollege();
      setTimeout(() => {
        setShowAlert(0);
      }, 1500);
    }
  }

  useEffect(() => {
    console.log("college name changes", college);
    setCollegeData(college);
  }, [college])

  return (
    <Container maxWidth="lg" sx={{ mt: 32, pb: 6 }}>
      {/* Alert Messages */}
      <Fade in={showAlert !== 0}>
        <Box sx={{ position: 'fixed', top: 100, left: '50%', transform: 'translateX(-50%)', zIndex: 1400 }}>
          {showAlert === 1 && (
            <Alert 
              variant="filled" 
              sx={{ 
                minWidth: 400,
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)'
              }}
            >
              {t('ShortListedCollege')}
            </Alert>
          )}
          {showAlert === 2 && (
            <Alert 
              severity="info" 
              variant="filled"
              sx={{ 
                minWidth: 400,
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(33, 150, 243, 0.3)'
              }}
            >
              {t('RemovedFromShortList')}
            </Alert>
          )}
        </Box>
      </Fade>

      {/* Hero Section */}
      <HeroSection>
        <CardMedia 
          image={collegeData?.background} 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} 
        />
        
        <Box sx={{ position: 'relative', zIndex: 2, p: 4, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
          <Stack direction="row" spacing={4} alignItems="flex-end" sx={{ width: '100%' }}>
            <CollegeAvatar
              alt={collegeData?.name}
              src={collegeData?.logo}
            />
            
            <Box sx={{ flex: 1, color: 'white' }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {collegeData?.name}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <LocationOnIcon sx={{ color: 'rgba(255,255,255,0.9)' }} />
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                  {`${collegeData?.state}, ${collegeData?.country}`}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Chip 
                  label={`Rank #${collegeData?.ranking}`}
                  sx={{ 
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Chip 
                  label={`Est. ${collegeData?.yearEstd}`}
                  sx={{ 
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)'
                  }} 
                />
              </Stack>
            </Box>

            <FavoriteButton onClick={handleFavourites}>
              {favourite ? 
                <FavoriteIcon sx={{ fontSize: 32, color: "#fd5c63" }} /> : 
                <FavoriteBorderIcon sx={{ fontSize: 32, color: "#666" }} />
              }
            </FavoriteButton>
          </Stack>
        </Box>
      </HeroSection>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <StatCard elevation={0}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ 
                p: 2, 
                borderRadius: 3, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <SchoolIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                  Public
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('University-type')}
                </Typography>
              </Box>
            </Stack>
          </StatCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard elevation={0}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ 
                p: 2, 
                borderRadius: 3, 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white'
              }}>
                <StarIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                  #{collegeData?.ranking}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  QS {t('Global-rank')}
                </Typography>
              </Box>
            </Stack>
          </StatCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatCard elevation={0}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ 
                p: 2, 
                borderRadius: 3, 
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white'
              }}>
                <MonetizationOnIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                  {collegeData?.costOfStudy}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('Average-living-expenses')}
                </Typography>
              </Box>
            </Stack>
          </StatCard>
        </Grid>
      </Grid>

      {/* About Section */}
      <Paper sx={{ p: 4, borderRadius: 4, mb: 4, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
        <SectionTitle variant="h4">
          {t('About')}
        </SectionTitle>
        <Stack spacing={3}>
          <Typography variant="body1" sx={{ color: '#555', fontSize: 18, lineHeight: 1.7 }}>
            {t('ParagraphOne', { 
              collegeName: collegeData?.name, 
              collegeAddress: collegeData?.address, 
              state: collegeData?.state, 
              country: collegeData?.country 
            })}
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', fontSize: 18, lineHeight: 1.7 }}>
            {t('ParagraphTwo', { 
              collegeName: collegeData?.name, 
              yearEstd: collegeData?.yearEstd 
            })}
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', fontSize: 18, lineHeight: 1.7 }}>
            {t('ParagraphThree')}
          </Typography>
        </Stack>
      </Paper>

      {/* Programs Section */}
      <Box>
        <SectionTitle variant="h4" sx={{ mb: 4 }}>
          Courses & Programs
        </SectionTitle>
        <Stack spacing={3}>
          {collegeData?.programs.map((program: Program, index: any) => (
            <Fade in={true} timeout={300 * (index + 1)} key={index}>
              <div>
                <ProgramCard program={program} />
              </div>
            </Fade>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}

export default CollegeDetails;

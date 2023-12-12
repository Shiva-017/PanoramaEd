import { Alert, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import College, { Program } from '../../models/college';
import SchoolIcon from '@mui/icons-material/School';
import ProgramCard from './ProgramCard';
import { ReactElement, useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useParams } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const CollegeDetails: React.FC=():ReactElement=> {

    const [collegeData, setCollegeData] = useState<College>();
    const [favourite, setFavourite] = useState<boolean>(false);
    const {collegeName} = useParams();

    console.log(collegeName);
    const { t } = useTranslation('college-page');
    const [showAlert, setShowAlert] = useState(0);

  

    const fetchCollegeData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/colleges/name/${collegeName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setCollegeData(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const shortlistCollege = async () => {
      try {
          const response = await fetch(`http://localhost:3001/colleges?studentId=${"studentId"}?collegeId=${collegeData?._id}`, {
              method: "POST",
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

  const removeShortlistCollege = async () => {
    try {
        const response = await fetch(`http://localhost:3001/colleges/removeShortlist?studentId=${"studentId"}?collegeId=${collegeData?._id}`, {
            method: "POST",
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


    const handleFavourites = ()=>{
      setFavourite(!favourite);
      if(!favourite){
        setShowAlert(1);
        setTimeout(()=>{
          setShowAlert(0);
        }, 1500);
      }else{
        setShowAlert(2);
        setTimeout(()=>{
          setShowAlert(0);
        }, 1500);
      } // move this logic to api responses
       
    }
    
    useEffect(()=>{
        fetchCollegeData();
    },[])
    
  return (
    <div>
      <CardMedia image={collegeData?.background}  sx={{ border: 5, borderColor: "whitesmoke", borderWidth: 15, borderRadius: 10, paddingLeft: "40px", paddingBottom: "10px" }}>
      {showAlert===1 ? <Alert sx={{width: 600, left:450, top:30, position: 'absolute'}} variant="filled">Shortlisted the college!</Alert> : showAlert === 2 ? <Alert severity="info" sx={{width: 600, left:450, top:30, position: 'absolute'}} variant="filled">Removed from the shortlist!</Alert> : null}
        <Avatar
          alt={collegeData?.name}
          src={collegeData?.logo}
          sx={{ width: 72, height: 72, border: 5, borderColor: "white", marginTop: 25 }}
        />
      </CardMedia>
      <Stack direction="row">
      <Stack direction="column">
      <Typography variant="h3" component="h2" ml={5} mt={5} sx={{ fontWeight: "bold" }}>
        {collegeData?.name}
      </Typography>
      <Typography variant="h6" component="h2" ml={5} sx={{ fontWeight: "regular", color: "#444444" }}>
        {`${collegeData?.state}, ${collegeData?.country}`}
      </Typography>
      </Stack>

        <IconButton  onClick={handleFavourites}  >{favourite ? <FavoriteIcon sx={{fontSize: 36, marginTop:2, marginLeft: 1, color:"#fd5c63"}}  /> : <FavoriteBorderIcon sx={{fontSize: 36, marginTop:3, marginLeft: 1}}  />}</IconButton>
        {/* need to change the above condition by checking studentId in the aray of shortlisted students */}
      </Stack>
      
      
      <Typography variant="h5" component="h2" ml={5} mt={5} pl={2} sx={{ fontWeight: "bold", borderLeft: 5, borderColor: "#367c2b" }}>
        {t('About')}
      </Typography>
      <Stack direction="row" spacing={10} mt={7} ml={10}>
        <Stack direction="row" sx={{ width: 200, borderColor: "#367c2b" }}>
          <IconButton><SchoolIcon /></IconButton>
          <Stack direction="column">
            <Typography ml={2} sx={{ fontWeight: 500, fontSize: 17 }} >Public</Typography>
            <Typography ml={2} sx={{ fontWeight: "regular", color: "#444444", fontSize: 14 }}>University Type</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" pl={3} sx={{ borderLeft: 1, borderColor: "#367c2b" }}>
          <IconButton><StarIcon /></IconButton>
          <Stack direction="column">
            <Typography ml={2} sx={{ fontWeight: 500, fontSize: 17 }} >{collegeData?.ranking}</Typography>
            <Typography ml={2} sx={{ fontWeight: "regular", color: "#444444", fontSize: 14 }}>QS Global Rank</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" pl={3} sx={{ borderLeft: 1, borderColor: "#367c2b" }}>
          <IconButton><MonetizationOnIcon /></IconButton>
          <Stack direction="column">
            <Typography ml={2} sx={{ fontWeight: 500, fontSize: 17 }} >{collegeData?.costOfStudy}</Typography>
            <Typography ml={2} sx={{ fontWeight: "regular", color: "#444444", fontSize: 14 }}>Average Living Expense</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Typography  ml={5} mt={5} sx={{color: "#444444", fontSize: 17}}>
       {t('ParagraphOne',{ collegeName: collegeData?.name, collegeAddress: collegeData?.address, state: collegeData?.state, country: collegeData?.country })}
      </Typography>
      <Typography  ml={5} mt={1} sx={{color: "#444444", fontSize: 17}}>
       {t('ParagraphTwo', {collegeName:collegeData?.name, yearEstd: collegeData?.yearEstd})}
      </Typography>
      <Typography  ml={5} mt={1} sx={{color: "#444444", fontSize: 17}}>
       {t('ParagraphThree')}
      </Typography>

      <Typography variant="h5" component="h2" ml={5} mt={5} pl={2} sx={{ fontWeight: "bold", borderLeft: 5, borderColor: "#367c2b" }}>
        Courses
      </Typography>

      
      {collegeData?.programs.map((program: Program, index)=>{
          return(
            <ProgramCard program={program} key={index}></ProgramCard>
          )
        })}
      
    </div>
  );
}

export default CollegeDetails;

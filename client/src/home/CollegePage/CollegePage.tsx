import backGround from '../../resources/northeast.png';
import logo from '../../resources/neulogo.jpg';
import { CardActions, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import { college } from '../../models/college';
import SchoolIcon from '@mui/icons-material/School';
import ProgramCard from './ProgramCard';
import { ReactElement } from 'react';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
const CollegeDetails: React.FC=():ReactElement=> {
  return (
    <div>
      <CardMedia image={backGround}  sx={{ border: 5, borderColor: "whitesmoke", borderWidth: 15, borderRadius: 10, paddingTop: "250px", paddingLeft: "40px", paddingBottom: "10px" }}>
        <Avatar
          alt={college.name}
          src={logo}
          sx={{ width: 72, height: 72, border: 5, borderColor: "white" }}
        />
      </CardMedia>
      <Stack direction="row">
      <Stack direction="column">
      <Typography variant="h3" component="h2" ml={5} mt={5} sx={{ fontWeight: "bold" }}>
        {college.name}
      </Typography>
      <Typography variant="h6" component="h2" ml={5} sx={{ fontWeight: "regular", color: "#444444" }}>
        {`${college.state}, ${college.country}`}
      </Typography>
      </Stack>

        <IconButton ><FavoriteBorderIcon sx={{fontSize: 36, marginTop:3, marginLeft: 1}} /></IconButton>

      </Stack>
      
      
      <Typography variant="h5" component="h2" ml={5} mt={5} pl={2} sx={{ fontWeight: "bold", borderLeft: 5, borderColor: "#603F8B" }}>
        About
      </Typography>
      <Stack direction="row" spacing={10} mt={7} ml={10}>
        <Stack direction="row" sx={{ width: 200, borderColor: "#603F8B" }}>
          <IconButton><SchoolIcon /></IconButton>
          <Stack direction="column">
            <Typography ml={2} sx={{ fontWeight: 500, fontSize: 17 }} >Public</Typography>
            <Typography ml={2} sx={{ fontWeight: "regular", color: "#444444", fontSize: 14 }}>University Type</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" pl={3} sx={{ borderLeft: 1, borderColor: "#603F8B" }}>
          <IconButton><StarIcon /></IconButton>
          <Stack direction="column">
            <Typography ml={2} sx={{ fontWeight: 500, fontSize: 17 }} >11</Typography>
            <Typography ml={2} sx={{ fontWeight: "regular", color: "#444444", fontSize: 14 }}>QS Global Rank</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" pl={3} sx={{ borderLeft: 1, borderColor: "#603F8B" }}>
          <IconButton><MonetizationOnIcon /></IconButton>
          <Stack direction="column">
            <Typography ml={2} sx={{ fontWeight: 500, fontSize: 17 }} >$21,436</Typography>
            <Typography ml={2} sx={{ fontWeight: "regular", color: "#444444", fontSize: 14 }}>Average Living Expenses</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Typography  ml={5} mt={5} sx={{color: "#444444", fontSize: 17}}>
        {`${college.name} is a public research university in ${college.address}, ${college.state}. It is one of the largest universities in ${college.state} and the ${college.country}, with over 60,000 students across 11 colleges.`}
      </Typography>
      <Typography  ml={5} mt={1} sx={{color: "#444444", fontSize: 17}}>
        {`${college.name} was founded in 1876 as an all-male military college before becoming a coeducational institution in ${college.yearEstd}. In 1976 it became one of four female-dominated schools to become coeducational.`}
      </Typography>
      <Typography  ml={5} mt={1} sx={{color: "#444444", fontSize: 17}}>
        {`The University's academic offerings include over 200 undergraduate majors, 300 graduate programs, and an honors program for highly talented students – known as 'Students Who Excel' (STEX).`}
      </Typography>

      <Typography variant="h5" component="h2" ml={5} mt={5} pl={2} sx={{ fontWeight: "bold", borderLeft: 5, borderColor: "#603F8B" }}>
        Courses
      </Typography>

      
      {college.programs.map((program, index)=>{
          return(
            <ProgramCard program={program} key={index}></ProgramCard>
          )
        })}
      
    </div>
  );
}

export default CollegeDetails;

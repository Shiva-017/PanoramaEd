import React, { ReactNode } from 'react';
import {Avatar, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import Student from '../../models/student';
import logo from "../../resources/neulogo.jpg";


interface ShortlistCardProps {
  logo: string;
  college: string;
}

type Props = {
  // student: Student

}

const ShortlistCard: React.FC<ShortlistCardProps> = ({  logo,college }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ borderLeft: 5, borderColor: "#1E90FF", paddingLeft:2, mt:3}}>
      <Avatar src={logo}></Avatar>
      <Card sx={{ width: "100%", height: '50px'}}>
        <Typography variant='body1' sx={{fontWeight:"bold"}}>{college}</Typography>
        {/* <Typography variant='body2'>Computer Science</Typography> */}
      </Card>
      </Stack>
    
  );
};

export default ShortlistCard;
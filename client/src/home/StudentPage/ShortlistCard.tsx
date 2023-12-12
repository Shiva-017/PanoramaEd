import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import Student from '../../models/student';


interface ShortlistCardProps {
  college: string;
  program: string;
}

type Props = {
  student: Student
  
}

const ShortlistCard: React.FC<ShortlistCardProps> = ({ college, program}) => {
  return (
    <div className="shortlist-card">
        <Card sx={{ width:'280%', height:'50px', marginLeft: 5, paddingLeft: 3, borderLeft: 5, borderColor: "#603F8B", marginTop: 3, marginBottom: 3 }}>
      <b>{college}</b>  
      <div className="program">{program}</div>
      
    
      </Card>
    </div>
  );
};

export default ShortlistCard;
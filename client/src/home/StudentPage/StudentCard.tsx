import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import Student from '../../models/student';


interface StudentCardProps {
  title: ReactNode;
  mandatoryContent: ReactNode;
  optionalContent?: ReactNode;
  optionalContent2?: ReactNode;
}

type Props = {
  student: Student
  
}

const StudentCard: React.FC<StudentCardProps> = ({ title, mandatoryContent, optionalContent,optionalContent2 }) => {
  return (
    <div className="student-card">
        <Card sx={{ height: 130, width:1000, marginLeft: 5, paddingLeft: 3, borderLeft: 5, borderColor: "#603F8B", marginTop: 3, marginBottom: 2 }}>
        <Typography style={{ paddingTop: '10px' }}>
        <h2>{title}</h2>
        </Typography>
     <h4> <div className="mandatory-content">{mandatoryContent}</div>
      {optionalContent && <div className="optional-content">{optionalContent}</div>}
      {optionalContent2 && <div className="optional-content2">{optionalContent2}</div>}
      </h4>
    
      </Card>
    </div>
  );
};

export default StudentCard;
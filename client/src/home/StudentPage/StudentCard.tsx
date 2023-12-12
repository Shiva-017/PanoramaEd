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
        <Card sx={{ marginLeft: 5, paddingLeft: 3, borderLeft: 5, borderColor: "#603F8B", marginTop: 3, marginBottom: 3 }}>
        <h2>{title}</h2>
     <h4> <div className="mandatory-content">{mandatoryContent}</div>
      {optionalContent && <div className="optional-content">{optionalContent}</div>}
      {optionalContent2 && <div className="optional-content2">{optionalContent2}</div>}
      </h4>
    
      </Card>
    </div>
  );
};

export default StudentCard;
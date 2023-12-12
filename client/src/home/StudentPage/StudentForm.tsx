import React from 'react';
import { TextField } from '@mui/material';

const StudentForm: React.FC = () => {
  return (
    <form>
      <TextField label="Degree Seeking" />
      <TextField label="Intake" fullWidth margin="normal" />
      <TextField label="Undergrad Grade" fullWidth margin="normal" />
      <TextField label="Undergrad College" fullWidth margin="normal" />
      <TextField label="Undergrad Course" fullWidth margin="normal" />
      <TextField label="GRE" fullWidth margin="normal" />
      <TextField label="IELTS" fullWidth margin="normal" />
      <TextField label="Experience Company" fullWidth margin="normal" />
      <TextField label="Experience Designation" fullWidth margin="normal" />
      <TextField label="Experience Duration" fullWidth margin="normal" />
      <button type="submit">Save</button>
    </form>
  );
};

export default StudentForm;
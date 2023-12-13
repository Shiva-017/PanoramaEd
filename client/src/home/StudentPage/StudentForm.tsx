import React from 'react';
import { TextField } from '@mui/material';
import Student from '../../models/student';
import { useSelector } from 'react-redux';
import { retrieveUsers } from '../../store/slices/login-slice';
import User from '../../models/user';




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
const HandleFormSubmit = (formValues: FormValues) => {
    
      const updateFields = {
        degreeseeking: formValues.degreeseeking,
        intake: formValues.intake,
        undergradgrade: formValues.undergradgrade,
        undergradcollege: formValues.undergradcollege,
        undergradcourse: formValues.undergradcourse,
        gre: formValues.gre,
        ielts: formValues.ielts,
        experiencecompany: formValues.experiencecompany,
        experiencedesignation: formValues.experiencedesignation,
        experienceduration: formValues.experienceduration,
        _id: '',
        name: '',
        email: '',
        shortlistedcolleges: []
      };
    
      // setPosts((posts) => [...posts, newPost]);
      const studentLoggedIn : User[] = useSelector(retrieveUsers());

      fetch(`http://localhost:3001/students/${studentLoggedIn[0].email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateFields),
      })
      .then(response => response.json())
    .then(updatedStudent => {
        console.log('Student updated:', updatedStudent);
    })
    .catch(error => {
        console.error('Error updating student:', error);
    });

            setIsFormVisible(false);

    };

const StudentForm: React.FC = () => {
  return (
    <div style={{ position:"absolute", left:500, width:"1080px", overflowX:"auto", height:"90vh"}}>
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
    </div>
  );
};

export default StudentForm;

function setIsFormVisible(arg0: boolean) {
  throw new Error('Function not implemented.');
}

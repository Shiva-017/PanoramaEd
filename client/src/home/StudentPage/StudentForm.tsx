import React from 'react';
import { TextField } from '@mui/material';
import Student from '../../models/student';

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
    
      const newStudent: Student = {
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

     fetch(`http://localhost:3001/students/`, {
            method: 'POST',
            body: JSON.stringify(newStudent),
            headers: { 'Content-Type': 'application/json' },
          })
            .then(response => {
              if (response.status ===200){
                // console.log("posted")
               // getPosts();
                
                //console.log("hello",posts)
              }
            })

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

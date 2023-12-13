import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { retrieveUsers } from '../../store/slices/login-slice';
import User from '../../models/user';
import { loadStudent, searchstudent } from '../../store/slices/studentdetails-slice';
import Student from '../../models/student';
import { useNavigate } from 'react-router-dom';

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

const StudentForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    degreeseeking: '',
    intake: '',
    undergradgrade: '',
    undergradcollege: '',
    undergradcourse: '',
    gre: '',
    ielts: '',
    experiencecompany: '',
    experiencedesignation: '',
    experienceduration: '',
  });

  const currentStudent: Student = useSelector(searchstudent());
  const navigate = useNavigate();

  const HandleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

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
    };

    fetch(`http://localhost:3001/students/${currentStudent._id}`, {
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

    // Reset form values or perform any other necessary actions
    setFormValues({
      degreeseeking: '',
      intake: '',
      undergradgrade: '',
      undergradcollege: '',
      undergradcourse: '',
      gre: '',
      ielts: '',
      experiencecompany: '',
      experiencedesignation: '',
      experienceduration: '',
    });
   
    navigate('/studentdetails');

    // setIsFormVisible(false);
  };

  const handleChange = (fieldName: keyof FormValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValues({ ...formValues, [fieldName]: event.target.value });
  };

  return (
    <div style={{ position: 'absolute', left: 500, width: '1080px', overflowX: 'auto', height: '90vh' }}>
      <form onSubmit={HandleFormSubmit}>
        <TextField
          label="Degree Seeking"
          fullWidth
          margin="normal"
          name="degreeseeking"
          value={formValues.degreeseeking}
          onChange={handleChange('degreeseeking')}
        />
        <TextField
          label="Intake"
          fullWidth
          margin="normal"
          name="intake"
          value={formValues.intake}
          onChange={handleChange('intake')}
        />
        <TextField
          label="Undergrad Grade"
          fullWidth
          margin="normal"
          name="undergradgrade"
          value={formValues.undergradgrade}
          onChange={handleChange('undergradgrade')}
        />
         <TextField
          label="Undergrad College"
          fullWidth
          margin="normal"
          name="undergradcollege"
          value={formValues.undergradcollege}
          onChange={handleChange('undergradcollege')}
        />
         <TextField
          label="Undergrad Course"
          fullWidth
          margin="normal"
          name="undergradcourse"
          value={formValues.undergradcourse}
          onChange={handleChange('undergradcourse')}
        />
         <TextField
          label="GRE"
          fullWidth
          margin="normal"
          name="gre"
          value={formValues.gre}
          onChange={handleChange('gre')}
        />
         <TextField
          label="IELTS"
          fullWidth
          margin="normal"
          name="ielts"
          value={formValues.ielts}
          onChange={handleChange('ielts')}
        />
         <TextField
          label="Experience Company"
          fullWidth
          margin="normal"
          name="experiencecompany"
          value={formValues.experiencecompany}
          onChange={handleChange('experiencecompany')}
        />
         <TextField
          label="Experience Designation"
          fullWidth
          margin="normal"
          name="experiencedesignation"
          value={formValues.experiencedesignation}
          onChange={handleChange('experiencedesignation')}
        />
         <TextField
          label="Experience Duration"
          fullWidth
          margin="normal"
          name="experienceduration"
          value={formValues.experienceduration}
          onChange={handleChange('experienceduration')}
        />
        {/* Add similar lines for other fields */}
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </div>
  );
};

export default StudentForm;

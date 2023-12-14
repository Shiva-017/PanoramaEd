import React, { useState } from 'react';
import { TextField, Button, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { retrieveUsers } from '../../store/slices/login-slice';
import User from '../../models/user';
import { loadStudent, searchstudent } from '../../store/slices/studentdetails-slice';
import Student from '../../models/student';
import { useNavigate } from 'react-router-dom';
import { collegeOptions, experinceOptions, intakeOptions, majorOptions } from '../../constants/menuItems';

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

const initialFormValues: FormValues = {
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
};

const StudentForm: React.FC = () => {


  const currentStudent: Student = useSelector(searchstudent());
  const navigate = useNavigate();
  
  const [formValues, setFormValues] = useState<FormValues>({
    degreeseeking: currentStudent.degreeseeking || '',
    intake: currentStudent.intake || '',
    undergradgrade: currentStudent.undergradgrade || '',
    undergradcollege: currentStudent.undergradcollege || '',
    undergradcourse: currentStudent.undergradcourse || '',
    gre: currentStudent.gre ? (currentStudent.gre.replace('GRE', '').trim()) : '',
    ielts: currentStudent.ielts ? (currentStudent.ielts.replace('IELTS', '').trim()) : '',
    experiencecompany: currentStudent.experiencecompany || '',
    experiencedesignation: currentStudent.experiencedesignation || '',
    experienceduration: currentStudent.experienceduration || '',
  });


  const HandleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    const updateFields = {
      degreeseeking: formValues.degreeseeking,
      intake: formValues.intake,
      undergradgrade: formValues.undergradgrade,
      undergradcollege: formValues.undergradcollege,
      undergradcourse: formValues.undergradcourse,
      gre: `GRE ${formValues.gre}`,
      ielts: `IELTS ${formValues.ielts}`,
      experiencecompany: formValues.experiencecompany,
      experiencedesignation: formValues.experiencedesignation,
      experienceduration: formValues.experienceduration,
    };

    const response = await fetch(`http://localhost:3001/students/${currentStudent._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateFields),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    try {
    const updatedStudent = await response.json();
    console.log('Student updated:', updatedStudent);

    // Reset form values or perform any other necessary actions
  

    setFormValues(initialFormValues);
    navigate('/studentdetails');
  } catch (error) {
    console.error('Error updating student:', error);
    // Show an error message to the user or handle the error in an appropriate way
  }

    // setIsFormVisible(false);
  };



  const handleChange = (fieldName: keyof FormValues) => (
    event: React.ChangeEvent<{ value: unknown }> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = 'value' in event.target ? (event.target.value as string) : (event.target as HTMLInputElement).value;
    setFormValues({ ...formValues, [fieldName]: value });
  };

  return (
    <div style={{ position: 'absolute', left: 500, top: 100,width: '1080px', overflowX: 'auto', height: '90vh' }}>
      <h2>Please Enter your Details</h2>
      <form onSubmit={HandleFormSubmit}>
      <InputLabel id="degreeseeking-label">Degree Seeking</InputLabel>
        <Select
  labelId="degreeseeking-label"
  id="degreeseeking"
  fullWidth
  margin="dense"
  name="degreeseeking"
  value={formValues.degreeseeking}
  onChange={handleChange('degreeseeking') as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
>
          <MenuItem value="Masters">Masters</MenuItem>
        </Select>

        <InputLabel id="intake-label">Intake</InputLabel>
          <Select
            labelId="intake-label"
            id="intake"
            fullWidth
            margin="dense"
            name="intake"
            value={formValues.intake}
            onChange={handleChange('intake') as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
          >
            {intakeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

       
        <TextField
          label="Undergrad Grade"
          fullWidth
          margin="normal"
          name="undergradgrade"
          value={formValues.undergradgrade}
          onChange={handleChange('undergradgrade')}
        />

<InputLabel id="undergradcollege-label">Undergrad College</InputLabel>
          <Select
            labelId="undergradcollege-label"
            id="undergradcollege"
            fullWidth
            margin="dense"
            name="undergradcollege"
            value={formValues.undergradcollege}
            onChange={handleChange('undergradcollege') as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
          >
            {collegeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <InputLabel id="undergradcourse-label">Undergrad Course</InputLabel>
          <Select
            labelId="undergradcourse-label"
            id="undergradcourse"
            fullWidth
            margin="dense"
            name="undergradcourse"
            value={formValues.undergradcourse}
            onChange={handleChange('undergradcourse') as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
          >
            {majorOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          
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
         <InputLabel id="experienceduration-label">Experience Duration</InputLabel>
          <Select
            labelId="experienceduration-label"
            id="experienceduration"
            fullWidth
            margin="dense"
            name="experienceduration"
            value={formValues.experienceduration}
            onChange={handleChange('experienceduration') as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
          >
            {experinceOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
       
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </div>
  );
};

export default StudentForm;


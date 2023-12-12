import React, { useState } from 'react';

interface FormData {
  degreeseeking: string;
  intake: string;
  undergradGrade: string;
  undergradcollege: string;
  undergradcourse: string;
  gre: string;
  ielts: string;
  expCompany: string;
  expDesignation: string;
  expDuration: string;
}

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    degreeseeking: '',
    intake: '',
    undergradGrade: '',
    undergradcollege: '',
    undergradcourse: '',
    gre: '',
    ielts: '',
    expCompany: '',
    expDesignation: '',
    expDuration: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Degree Seeking:
        <input type="text" name="degreeseeking" value={formData.degreeseeking} onChange={handleChange} />
      </label>
      {/* Repeat the above pattern for other form fields */}
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
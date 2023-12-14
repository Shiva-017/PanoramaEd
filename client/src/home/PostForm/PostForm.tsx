import React, { ReactElement, useState } from "react";
import { Button, TextField, Typography, makeStyles, Container } from "@mui/material";
import { withStyles } from "@mui/material/styles"
import Post from '../../models/post'
import { useTranslation } from 'react-i18next';

  
  type FormValues = {
    title: string;
    text: string;
  };


  type Props = {
    onSubmit: (values: FormValues) => void;
   
  };

  //form to capure details of new post
  
    const PostForm: React.FC<Props> = ({ onSubmit }: Props): ReactElement => {
    const [formValues, setFormValues] = useState<FormValues>({
      title: "",
      text: "",
    });

    const { t } = useTranslation('students-post');
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(formValues);
      setFormValues({
        title: "",
        text: "",
      });
    };
  
    return (
      <Container component="main" maxWidth="md" >
        <Typography variant="h5">Create your Post</Typography>
        <form  onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            style={{ borderColor: "#92C1B7", borderRadius: 10}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="text"
            label="Text"
            name="text"
            multiline
            rows={4}
            value={formValues.text}
            onChange={handleInputChange}
            style={{ borderColor: "#92C1B7", borderRadius: 10,}}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ borderColor: "#92C1B7", borderRadius: 10,  backgroundColor:"#000000", width:300, marginLeft: 220}}
        
          >
           {t('SUBMIT')} 
          </Button>
        </form>
      </Container>

 
    );
  };
  
  export default PostForm;
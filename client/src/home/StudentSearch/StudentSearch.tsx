import { ReactElement, useState } from "react";
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { loadCollege } from "../../store/slices/college-slice";
import SearchIcon from '@mui/icons-material/Search';
import {
    AppBar as MuiAppBar,
    Avatar,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Button,
    TextField,
  } from '@mui/material';

export default (): ReactElement => {
    const [collegeName, setCollegeName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

// function to handle College Search based on text typed in serach box

    const searchHandler = async () => {

        try {
            const response = await fetch(`http://localhost:3001/colleges/name/${collegeName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            dispatch(loadCollege(data));
            navigate(`/colleges/${collegeName}`);
        } catch (error) {
            console.error("Error:", error);
        }


    }


    return (
        <>
         <TextField
         id="search"
         label="Search"
         onChange={(e) => setCollegeName(e.target.value)}
         InputProps={{
           startAdornment: (
             <InputAdornment position="start">
               <SearchIcon />
             </InputAdornment>
           ),
         }}
       />
       <Button variant="contained" size="large" onClick={searchHandler} style={{ marginTop: "4px", backgroundColor: "#000000", marginLeft:10, marginRight:5 }}>Search</Button>
       </>
    );
}
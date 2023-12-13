import { ReactElement, useState } from "react";
import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
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

// type Props = {
//     onSearch: (query: string) => void
// }


export default (): ReactElement => {
    const [collegeName, setCollegeName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();



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
        // <Container sx={{ mb: 2 }}>
        //     <TextField variant="outlined" size="small" sx={{ mr: 1 }} onChange={(e) => setCollegeName(e.target.value)}></TextField>
        //     <Button variant="contained" onClick={searchHandler} style={{ marginTop: "4px", backgroundColor: "#92C1B7" }}>Search</Button>
        // </Container>
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
       <Button variant="contained" size="large" onClick={searchHandler} style={{ marginTop: "4px", backgroundColor: "#000000", marginLeft:10 }}>Search</Button>
       </>
    );
}
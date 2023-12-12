import { ReactElement, useState } from "react";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

// type Props = {
//     onSearch: (query: string) => void
// }


    export default (): ReactElement => {
    const [collegeName, setCollegeName] = useState('');
    const navigate = useNavigate();



    const searchHandler =  () => {

        // try {
        //     const response = await fetch(`http://localhost:3001/colleges/name/${collegeName}`, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     });

        //     if (!response.ok) {
        //         throw new Error(`HTTP error! Status: ${response.status}`);
        //     }

        //     const data = await response.json();
        // } catch (error) {
        //     console.error("Error:", error);

        console.log("navigated")
        // }
        navigate(`/colleges/${collegeName}`)
       
      }

    
    return (
        <Container sx={{ mb: 2 }}>
            <TextField variant="outlined" size="small" sx={{ mr: 1 }} onChange={(e) => setCollegeName(e.target.value)}></TextField>
            <Button variant="contained" onClick={searchHandler} style={{ marginTop: "4px" , backgroundColor: "#92C1B7" }}>Search</Button>
        </Container>
    );
}
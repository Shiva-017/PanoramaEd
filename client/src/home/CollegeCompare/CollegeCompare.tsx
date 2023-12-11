import { Avatar, Box, Button, CardMedia, FormControlLabel, Slide, Stack, Switch, TextField, ThemeProvider, Typography } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import CollegeCard from "./CollegeCard";
import theme from "../../providers/themeProvider";


const CollegeCompare: React.FC = (): ReactElement => {
    const [programName, setProgramName] = useState("");
    const [search, setSearch] = useState<boolean>(false);
    return (
        <ThemeProvider theme={theme}>
        <div style={{backgroundColor:"#E1EBEE"}}>
            <Stack direction="row" marginLeft={70} marginTop={10} alignItems="center">
            <TextField id="outlined-basic" label={`Enter program`} variant="outlined" onChange={(e) => { setProgramName(e.target.value) }} />
            <Button variant="contained" color="button" sx={{height: 45, marginLeft:3}} onClick={()=>{setSearch(!search)}}>{search ? "Search Again" : "Search"}</Button>
            </Stack>
            <Stack direction="row" justifyContent="space-around" alignItems="flex-start " height={1000}>
                <CollegeCard id={1} program={programName} triggered={search} ></CollegeCard>
                <CollegeCard id={2} program={programName} triggered={search} ></CollegeCard>
            </Stack>
        </div>
        </ThemeProvider>
    );
};

export default CollegeCompare;

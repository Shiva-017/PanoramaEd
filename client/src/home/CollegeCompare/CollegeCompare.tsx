import { Avatar, Box, Button, CardMedia, FormControlLabel, Slide, Stack, Switch, TextField, ThemeProvider, Typography } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import CollegeCard from "./CollegeCard";
import { useTranslation } from 'react-i18next';
import theme from "../../providers/themeProvider";

// this page renders comparision of colleges
const CollegeCompare: React.FC = (): ReactElement => {
    const [programName, setProgramName] = useState("");
    const [search, setSearch] = useState<boolean>(false);
    const { t } = useTranslation('college-compare');
    return (
        <ThemeProvider theme={theme}>
        <div style={{ position:"absolute", left:450, top:70, width:"1080px", overflowX:"auto", height:"90vh"}}>
            <Stack direction="row" marginLeft={50} marginTop={5} alignItems="center" sx={{mb:2}}>
            <TextField id="outlined-basic" label={t('EnterProgram')} variant="outlined" onChange={(e) => { setProgramName(e.target.value) }} />
            <Button variant="contained" color="button" sx={{height: 45, marginLeft:3}} onClick={()=>{setSearch(!search)}}>{search ? "Search Again" : "Search"}</Button>
            </Stack>
            <Stack direction="row"  alignItems="flex-start" justifyContent="space-around" height={600} spacing={3}>
                <CollegeCard id={1} program={programName} triggered={search} ></CollegeCard>
                <CollegeCard id={2} program={programName} triggered={search} ></CollegeCard>
            </Stack>
        </div>
        </ThemeProvider>
    );
};

export default CollegeCompare;

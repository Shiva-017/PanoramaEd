import { Avatar, Box, CardMedia, FormControlLabel, Slide, Stack, Switch, TextField, Typography } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import CollegeCard from "./CollegeCard";


const CollegeCompare: React.FC = (): ReactElement => {
    const [programName, setProgramName] = useState("");
    return (

        <div>
            <TextField id="outlined-basic" label={`Enter program`} variant="outlined" onChange={(e) => { setProgramName(e.target.value) }} />
            <Stack direction="row" justifyContent="space-around" alignItems="flex-start " height={1000}>
                <CollegeCard id={1} program={programName} ></CollegeCard>
                <CollegeCard id={2} program={programName}></CollegeCard>
            </Stack>
        </div>
    );
};

export default CollegeCompare;

import { Avatar, Box, CardMedia, FormControlLabel, Slide, Stack, Switch, TextField, Typography } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import backGround from '../../resources/northeast.png';
import logo from '../../resources/neulogo.jpg';
import tamuLogo from '../../resources/tamu.png';
import tamuBg from '../../resources/tamuBack.jpg';
import CollegeCard from "./CollegeCard";


const CollegeCompare: React.FC = (): ReactElement => {
    const NEUContents = [
        { title: "Program", value: "Computer Science" },
        { title: "Location", value: "Boston, MA" },
        { title: "Country", value: "USA" },
        { title: "Ranking", value: "112" },
        { title: "Fee", value: "$50000" },
        { title: "Application due", value: "10 September" },
        { title: "GRE", value: "Not Required" },
        { title: "TOEFL", value: "100" },
        { title: "LORs Required", value: "3" },
    ];
    const TAMUContents = [
        { title: "Program", value: "Computer Science" },
        { title: "Location", value: "Arlington, TEXAS" },
        { title: "Country", value: "USA" },
        { title: "Ranking", value: "62" },
        { title: "Fee", value: "$35000" },
        { title: "Application due", value: "19 September" },
        { title: "GRE", value: "319" },
        { title: "TOEFL", value: "103" },
        { title: "LORs Required", value: "2" },
    ];
    return (

        <div>
            <Stack direction="row" justifyContent="space-around" alignItems="flex-start " height={1000}>
                <Stack direction="column" alignItems="flex-start" width={500} spacing={2}>
                    <TextField id="outlined-basic" label="Enter college 1" variant="outlined" />
                    <CollegeCard slideDirection="left" collegeDetails={NEUContents} collegeName="Northeastern University" logo={logo} background={backGround}></CollegeCard>
                </Stack>
                <Stack direction="column" alignItems="flex-start" width={500} spacing={2}>
                    <TextField id="outlined-basic" label="Enter college 2" variant="outlined" />
                    <CollegeCard slideDirection="right" collegeDetails={TAMUContents} collegeName="Texas A&M University" logo={tamuLogo} background={tamuBg}></CollegeCard>
                </Stack>
            </Stack>
        </div>
    );
};

export default CollegeCompare;

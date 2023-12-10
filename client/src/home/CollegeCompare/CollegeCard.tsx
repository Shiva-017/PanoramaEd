import { Avatar, Box, Button, CardMedia, FormControlLabel, Slide, Switch, Typography } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";


interface Detail {
    title: string,
    value: string
}
type Props = {
    slideDirection: any;
    collegeName: string;
    collegeDetails: Detail[];
    logo: any;
    background: any;
}
const CollegeCard: React.FC<Props> = (props: Props): ReactElement => {
    const [checked, setChecked] = useState(false);
    const [contentIndexes, setContentIndexes] = useState<number[]>([]);
    const [contentMounted, setContentMounted] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
        setContentMounted(true);
    };

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (checked && contentIndexes.length < props.collegeDetails.length) {
            timerId = setTimeout(() => {
                setContentIndexes((prevIndexes) => [...prevIndexes, prevIndexes.length]);
            }, 100);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [checked, contentIndexes]);

    useEffect(() => {
        if (!checked) {
            setContentIndexes([]);
            setContentMounted(false);
        }
    }, [checked]);

    return (
        <div>
            <Button onClick={handleChange} variant="outlined">{checked ? "Hide" : "Show"}</Button>
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                <Box width={500} sx={{ margin: 5, marginBottom: 0, backgroundColor: "#6699CC", borderRadius: 2 }}>
                    <CardMedia image={props.background} sx={{ paddingTop: "20px", paddingLeft: "20px", paddingBottom: "10px", height: 80, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                        <Avatar alt="name" src={props.logo} sx={{ width: 72, height: 72, border: 5, borderColor: "white" }} />
                    </CardMedia>
                    <Typography variant="h4" sx={{ fontWeight: "bold", margin: 1, marginBottom: 0, color: "#002387" }}>{props.collegeName}</Typography>
                </Box>
            </Slide>
            <Box sx={{ padding: 5, paddingTop: 1 }}>
                {contentMounted && contentIndexes.map((index) => (
                    <Slide key={index} direction={props.slideDirection} in={contentMounted} mountOnEnter unmountOnExit>
                        <Box sx={{ backgroundColor: index % 2 === 0 ? "#B9D9EB" : "#B0C4DE", paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, borderRadius: 1 }}>
                            <Typography sx={{ fontSize: 16 }}>{props.collegeDetails[index].title}</Typography>
                            <Typography variant="h6">{props.collegeDetails[index].value}</Typography>
                        </Box>
                    </Slide>
                ))}
            </Box>
        </div>
    );
};

export default CollegeCard;

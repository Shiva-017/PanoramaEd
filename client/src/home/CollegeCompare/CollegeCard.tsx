import { Avatar, Box, Button, CardMedia, FormControlLabel, Slide, Switch, TextField, Typography } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import getProgramDetails from "../../helpers/getProgramDetails";


export interface Detail {
    title: string,
    value: string
}
type Props = {
    id: number;
    program: string;
}

const CollegeCard: React.FC<Props> = (props: Props): ReactElement => {
    const [checked, setChecked] = useState(false);
    const [collegeData, setCollegeData] = useState<any>([]);
    const [collegeName, setCollegeName] = useState("");
    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    const fetchCollegeData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/colleges/name/${collegeName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setCollegeData(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchProgramDetails = async () => {
        try {
            const details = getProgramDetails(collegeData, "Philosophy");
            // setProgramDetails(details);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (checked) {
                await fetchCollegeData();
                await fetchProgramDetails();
            }
        };
        fetchData();
    }, [checked, collegeName]);


    return (
        <div>
            <TextField id="outlined-basic" label={`Enter college ${props.id}`} variant="outlined" onChange={(e) => { setCollegeName(e.target.value) }} />
            <Button onClick={handleChange} variant="outlined">{checked ? "Hide" : "Show"}</Button>
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                <Box width={500} sx={{ margin: 5, marginBottom: 0, backgroundColor: "#6699CC", borderRadius: 2 }}>
                    <CardMedia image={collegeData.background} sx={{ paddingTop: "20px", paddingLeft: "20px", paddingBottom: "10px", height: 80, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                        <Avatar alt="name" src={collegeData.logo} sx={{ width: 72, height: 72, border: 5, borderColor: "white" }} />
                    </CardMedia>
                    <Typography variant="h4" sx={{ fontWeight: "bold", margin: 1, marginBottom: 0, color: "#002387" }}>{collegeData.name}</Typography>
                    {getProgramDetails(collegeData, props.program).length > 0 ? (
                        getProgramDetails(collegeData, props.program).map((detail, index) => (
                            <Box key={index} sx={{ backgroundColor: index % 2 === 0 ? "#B9D9EB" : "#B0C4DE", paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, borderRadius: 1 }}>
                                <Typography sx={{ fontSize: 16 }}>{detail.title}</Typography>
                                <Typography variant="h6">{detail.value}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </Box>

            </Slide>
        </div>
    );
};

export default CollegeCard;

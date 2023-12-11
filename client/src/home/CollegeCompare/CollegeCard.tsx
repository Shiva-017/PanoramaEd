import { Avatar, Box, Button, CardMedia, FormControlLabel, Slide, Stack, Switch, TextField, Typography } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import getProgramDetails from "../../helpers/getProgramDetails";


export interface Detail {
    title: string,
    value: string
}
type Props = {
    id: number;
    program: string;
    triggered: boolean;
}

const CollegeCard: React.FC<Props> = (props: Props): ReactElement => {
    const [checked, setChecked] = useState(false);
    const [collegeData, setCollegeData] = useState<any>([]);
    const [collegeName, setCollegeName] = useState("");

    useEffect(() => {
        setChecked(props.triggered);
    }, [props.triggered]);

    const fetchCollegeData = async () => {
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

            setCollegeData(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            if (checked) {
                await fetchCollegeData();
            }
        };
        fetchData();
    }, [checked, collegeName]);


    return (
        <div>
            {!checked ? <TextField id="outlined-basic" label={`Enter college ${props.id}`} variant="outlined" onChange={(e) => { setCollegeName(e.target.value) }} /> : null}
            
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                
                <Box width={500} sx={{ margin: 5, marginBottom: 0, backgroundColor: "#6699CC", borderRadius: 2 }}>
                    <CardMedia image={collegeData?.background} sx={{ paddingTop: "20px", paddingLeft: "20px", paddingBottom: "10px", height: 80, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                        <Avatar alt="name" src={collegeData?.logo} sx={{ width: 72, height: 72, border: 5, borderColor: "white" }} />
                        {collegeName !=="" ? <Typography variant="h4" sx={{ fontWeight: "bold", margin: 1, marginBottom: 0, color: "#002387" }}>{collegeData?.name}</Typography> :  <Typography variant="h5" sx={{ fontWeight: "bold", margin: 1, marginBottom: 3, color: "#002387", marginLeft: 18 }}>College not found</Typography>}
                    </CardMedia>      
                    {getProgramDetails(collegeData, props.program).length > 0 ? (
                        getProgramDetails(collegeData, props.program).map((detail, index) => (
                            <Box key={index} sx={{ backgroundColor: index % 2 === 0 ? "#B9D9EB" : "#B0C4DE", paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, borderRadius: 1 }}>
                                <Typography sx={{ fontSize: 16 }}>{detail.title}</Typography>
                                <Typography variant="h6">{detail.value}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Stack direction="row" justifyContent="center" alignItems="center" sx={{border:2, height: 100, borderRadius: 2, backgroundColor:"#E44D2E", borderColor:"#FF7F50" }}>
                            <Typography variant="h5">Uh-oh! Program not found</Typography>
                        </Stack>
                    )}
                </Box>

            </Slide>
        </div>
    );
};

export default CollegeCard;

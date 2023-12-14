import { Avatar, Box, Button, CardMedia, Slide, Stack, Switch, TextField, ThemeProvider, Typography } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import getProgramDetails from "../../helpers/getProgramDetails";
import { useTranslation } from 'react-i18next';


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
    const { t } = useTranslation('college-compare');

    useEffect(() => {
        setChecked(props.triggered);
    }, [props.triggered]);

    // fetching college data from the input sent as a prop to this card
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
            {!checked ? <TextField id="outlined-basic" label={t('EnterCollege') + ` ${props.id}`} variant="outlined" onChange={(e) => { setCollegeName(e.target.value) }} /> : null}
            
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                
                <Box width={500} sx={{ backgroundColor: "#6699CC", borderRadius: 2 }}>
                    <CardMedia image={collegeData?.background} sx={{ paddingTop: "20px", paddingLeft: "20px", paddingBottom: "10px", height: 180, borderTopLeftRadius: 5, borderTopRightRadius: 5, mb:5 }}>
                        <Avatar alt="name" src={collegeData?.logo} sx={{ width: 72, height: 72, border: 5, borderColor: "white" }} />
                        {collegeName !=="" ? <Typography variant="h4" sx={{ fontWeight: "bold", margin: 1, marginBottom: 0, color: "whitesmoke" }}>{collegeData?.name}</Typography> :  <Typography variant="h5" sx={{ fontWeight: "bold", margin: 1, marginBottom: 3, color: "#002387", marginLeft: 18 }}>College not found</Typography>}
                    </CardMedia>      
                    {getProgramDetails(collegeData, props.program).length > 0 ? (
                        getProgramDetails(collegeData, props.program).map((detail, index) => (
                            <Box key={index} sx={{ backgroundColor:"#B9D9EB", paddingRight: 2, paddingTop: 1, paddingBottom: 1 }}>
                                <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B9CD3", paddingLeft: 3 }}>{detail.title}</Typography>
                                <Typography variant="h6" sx={{color: "#00308F",  borderLeft: 4, borderColor:"#76ABDF", paddingLeft: 3  }}>{detail.value}</Typography>
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

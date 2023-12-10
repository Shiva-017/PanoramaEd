import { Avatar, AvatarTypeMap, Box, Button, CardMedia, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Slider, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ReactElement } from "react";
import UK from '../../resources/united-kingdom.png';
import US from '../../resources/flag.png';
import EU from '../../resources/european-union.png';
import AUS from '../../resources/australia.png';
import CAN from '../../resources/canada.png';
import React from "react";
import StudentMetricField from "./StudentMetricField";


const StudentMetricsForm: React.FC = (): ReactElement => {

    const [country, setCountry] = React.useState<string>("Select Country");
    const [course, setCourse] = React.useState<string>("Select Course");
    const [college, setCollege] = React.useState<string>("Select College");
    const [major, setMajor] = React.useState<string>("Select Major");
    const [alignment, setAlignment] = React.useState<string | null>('left');
    const [sopRating, setSOPRating] = React.useState<number>(1);
    const [resumeRating, setResumeRating] = React.useState<number>(1);
    const [lorReq, setLorReq] = React.useState<number>(0);



    const countryOptions = [
        { value: "United States", label: "United States", icon: <Avatar src={US} alt="United States" sx={{ marginRight: 2 }} /> },
        { value: "United Kingdom", label: "United Kingdom", icon: <Avatar src={UK} alt="United Kingdom" sx={{ marginRight: 2 }} /> },
        { value: "Australia", label: "Australia", icon: <Avatar src={AUS} alt="Australia" sx={{ marginRight: 2 }} /> },
        { value: "Canada", label: "Canada", icon: <Avatar src={CAN} alt="Canada" sx={{ marginRight: 2 }} /> },
        { value: "Europe", label: "Europe", icon: <Avatar src={EU} alt="Europe" sx={{ marginRight: 2 }} /> },
    ];

    const courseOptions = [
        { value: "Computer Science", label: "Computer Science" },
        { value: "Data Science", label: "Data Science" },
        { value: "Business Administration", label: "Business Administration" },
    ];

    const collegeOptions = [
        { value: "IIT Bombay", label: "IIT Bombay" },
        { value: "IIT Delhi", label: "IIT Delhi" },
        { value: "IIT Madras", label: "IIT Madras" },
        { value: "IIT Kharagpur", label: "IIT Kharagpur" },
        { value: "BITS Pilani", label: "BITS Pilani" },
        { value: "NIT Trichy", label: "NIT Trichy" },
        { value: "Amrita University", label: "Amrita University" },
        { value: "VIT Vellore", label: "VIT Vellore" },
        { value: "SRM University", label: "SRM University" },
        { value: "Manipal Institute of Technology", label: "Manipal Institute of Technology" },
        { value: "Jawaharlal Nehru University (JNU)", label: "JNU" },
        { value: "Delhi Technological University (DTU)", label: "DTU" },
        { value: "University of Mumbai", label: "University of Mumbai" },
        { value: "Anna University", label: "Anna University" },
        { value: "Indian School of Business (ISB)", label: "ISB" },
        { value: "National Institute of Design (NID)", label: "NID" },
        { value: "Indian Statistical Institute (ISI)", label: "ISI" },
        { value: "All India Institute of Medical Sciences (AIIMS)", label: "AIIMS" },
        { value: "National Law School of India University (NLSIU)", label: "NLSIU" },
    ];

    const majorOptions = [
        { value: "Computer Science", label: "Computer Science" },
        { value: "Data Science", label: "Data Science" },
        { value: "Business Administration", label: "Business Administration" },
        { value: "Mechanical Engineering", label: "Mechanical Engineering" },
        { value: "Electrical Engineering", label: "Electrical Engineering" },
        { value: "Civil Engineering", label: "Civil Engineering" },
        { value: "Medicine", label: "Medicine" },
        { value: "Architecture", label: "Architecture" },
        { value: "Biotechnology", label: "Biotechnology" },
        { value: "Chemical Engineering", label: "Chemical Engineering" },
        { value: "Economics", label: "Economics" },
        { value: "Physics", label: "Physics" },
        { value: "Psychology", label: "Psychology" },
        { value: "Political Science", label: "Political Science" },
        { value: "Fine Arts", label: "Fine Arts" },
        { value: "Environmental Science", label: "Environmental Science" },
        { value: "Mathematics", label: "Mathematics" },
        { value: "History", label: "History" },
        { value: "Communications", label: "Communications" },
        { value: "International Relations", label: "International Relations" },
    ];

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };

    const handleSOPSliderChange = (event: Event, newValue: number | number[]) => {
        setSOPRating(newValue as number);
    };
    const handleResumeSliderChange = (event: Event, newValue: number | number[]) => {
        setResumeRating(newValue as number);
    };
    const handleLorSliderChange = (event: Event, newValue: number | number[]) => {
        setLorReq(newValue as number);
    };



    const handleChange = (event: SelectChangeEvent<string>) => {
        const {
            target: { value },
        } = event;
        const type = event.target.name;
        switch (type) {
            case "country":
                setCountry(value);
                break;
            case "course":
                setCourse(value);
                break;
            case "college":
                setCollege(value);
                break;
            case "major":
                setMajor(value);
                break;
            default:
                break;
        }
    };


    return (
        <div>
            <Typography variant={"h4"}>Take us through your dream education</Typography>
            <FormControl>
                <Stack direction="column" justifyContent="center" alignItems="center" sx={{ width: 1000 }}>
                    <Stack direction="row" sx={{ width: 500, margin: 5 }} spacing={20}>
                        <StudentMetricField items={countryOptions} defaultValue="Select Country" name="country" clickHandler={handleChange} id="country-select" value={country} header="Where do you want to study?"></StudentMetricField>
                        <StudentMetricField items={courseOptions} defaultValue="Select Course" name="course" clickHandler={handleChange} id="course-select" value={course} header="What are you planning to study?"></StudentMetricField>

                    </Stack>
                    <Stack direction="row" sx={{ width: 500, margin: 5 }} spacing={20}>
                        <StudentMetricField items={collegeOptions} defaultValue="Select College" name="college" clickHandler={handleChange} id="college-select" value={college} header="What was your undergraduate college?"></StudentMetricField>
                        <StudentMetricField items={majorOptions} defaultValue="Select Major" name="major" clickHandler={handleChange} id="major-select" value={major} header="Which course did you major in?"></StudentMetricField>

                    </Stack>

                    <Stack direction="row" justifyContent="flex-start" sx={{ width: 500, margin: 5 }} spacing={20}>
                        <div>
                            <Typography variant="h6" >What was your CGPA?</Typography>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="end">/ 4.0</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                            </FormControl>
                        </div>
                        <div style={{ marginLeft: 330 }}>
                            <Typography variant="h6" >Which english test did you take?</Typography>
                            <ToggleButtonGroup
                                color="primary"
                                value={alignment}
                                exclusive
                                onChange={handleAlignment}
                                aria-label="text alignment"
                            >
                                <ToggleButton value="left" aria-label="left aligned" sx={{ width: 300, height: 50 }}>
                                    IELTS
                                </ToggleButton>

                                <ToggleButton value="right" aria-label="right aligned" sx={{ width: 300, height: 50 }}>
                                    TOEFL
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </Stack>

                    <Stack direction="column" sx={{ width: 500, margin: 5 }} spacing={10}>

                        <Stack direction="row" justifyContent="center" spacing={10} sx={{ width: 1200 }}>
                            <Box sx={{ width: 400 }}>
                                <Typography variant="h6" >How do you rate your SOP?</Typography>
                                <Stack direction="row"  spacing={3}>
                                    <Slider
                                        aria-label="SOP-Rating"
                                        defaultValue={1}
                                        onChange={handleSOPSliderChange}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={1}
                                        max={5}
                                    />
                                    <Typography>{sopRating}</Typography>
                                </Stack>
                            </Box>

                            <Box sx={{ width: 400 }}>
                                <Typography variant="h6" >How do you rate your Resume?</Typography>
                                <Stack direction="row" spacing={3}>
                                    <Slider
                                        aria-label="Resume-Rating"
                                        defaultValue={1}
                                        onChange={handleResumeSliderChange}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={1}
                                        max={5}
                                    />
                                    <Typography>{resumeRating}</Typography>
                                </Stack>
                            </Box>
                            <Box sx={{ width: 400 }}>
                                <Typography variant="h6" >Number of recommendations?</Typography>
                                <Stack direction="row"  spacing={3}>
                                    <Slider
                                        aria-label="LOR-Count"
                                        defaultValue={0}
                                        onChange={handleLorSliderChange}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={0}
                                        max={3}
                                    />
                                    <Typography>{lorReq}</Typography>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack direction="row" sx={{ width: 1000, margin: 3 }} spacing={30} alignItems="center">
                            <div>
                                <Typography variant="h6" >What was your GRE Score?</Typography>
                                <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        endAdornment={<InputAdornment position="end">/ 340</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                    />
                                </FormControl>
                            </div>
                            <Button variant="contained" sx={{ height: 60, width: 200 }}>Find universities</Button>
                        </Stack>
                    </Stack>
                </Stack>

            </FormControl>
        </div>
    );
}

export default StudentMetricsForm;

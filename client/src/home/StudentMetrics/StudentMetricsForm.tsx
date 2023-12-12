import { Box, Button, FormControl, InputAdornment, OutlinedInput, SelectChangeEvent, Slider, Stack, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import StudentMetricField from "./StudentMetricField";
import { collegeOptions, countryOptions, courseOptions, majorOptions } from "../../constants/menuItems";
import theme from "../../providers/themeProvider";
import { AppDispatch } from "../../store";
import { loadSuggestedPrograms } from "../../store/slices/college-suggest";
import { useNavigate } from "react-router-dom";


const StudentMetricsForm: React.FC = (): ReactElement => {

    const [country, setCountry] = React.useState<string>("Select Country");
    const [course, setCourse] = React.useState<string>("Select Course");
    const [college, setCollege] = React.useState<string>("Select College");
    const [major, setMajor] = React.useState<string>("Select Major");
    const [alignment, setAlignment] = React.useState<string | null>('left');
    const [sopRating, setSOPRating] = React.useState<number>(1);
    const [resumeRating, setResumeRating] = React.useState<number>(1);
    const [lorReq, setLorReq] = React.useState<number>(0);
    const [exp, setExp] = React.useState<number>(0);
    const [englishTest, setEnglishTest] = React.useState<string>('');
    const [greScore, setGreScore] = React.useState<string>('');
    const [englishScore, setEnglishScore] = React.useState<string>('');
    const [cgpa, setCgpa] = React.useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const findSuggestedColleges = async () => {
        let englishTestScore = {};
        if (englishTest === "TOEFL") {
            englishTestScore = {
                toeflScore: englishScore
            }
        } else if (englishTest === "IELTS") {
            englishTestScore = {
                ieltsScore: englishScore
            }
        }
        const studentMetrics = {
            studentData: {
                greScore: greScore,
                ...englishTestScore,
                cgpa: cgpa,
                sopRating: sopRating,
                lorRequired: lorReq,
            },
            exp: exp,
            resumeRating: resumeRating
        }

        try {
            const response = await fetch(`http://localhost:3001/programs/suggest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(studentMetrics),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            dispatch(loadSuggestedPrograms(data));
            navigate('/suggested-colleges')


        } catch (error) {
            console.error("Error:", error);
        }

    }


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
    const handleExpSliderChange = (event: Event, newValue: number | number[]) => {
        setExp(newValue as number);
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
        <ThemeProvider theme={theme}>
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
                                        onChange={(e) => { setCgpa(e.target.value) }}
                                    />
                                </FormControl>
                            </div>
                            <div style={{ marginLeft: 330 }}>
                                <Typography variant="h6" >Which english test did you take?</Typography>
                                <ToggleButtonGroup
                                    value={alignment}
                                    exclusive
                                    onChange={(event, newAlignment) => {
                                        setEnglishTest(newAlignment);
                                    }}
                                    aria-label="text alignment"
                                >
                                    <ToggleButton value="IELTS" aria-label="left aligned" sx={{ width: 300, height: 50 }} >
                                        IELTS
                                    </ToggleButton>

                                    <ToggleButton value="TOEFL" aria-label="right aligned" sx={{ width: 300, height: 50 }}>
                                        TOEFL
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                {englishTest !== "" ? <div>
                                    <Typography variant="body1" sx={{ mt: 2 }}>What was your {englishTest} Score?</Typography>
                                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                                        <OutlinedInput
                                            id="outlined-adornment-weight"
                                            endAdornment={<InputAdornment position="end">{englishTest === 'IELTS' ? "/9" : "/120"}</InputAdornment>}
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'weight',
                                            }}
                                            onChange={(e) => setEnglishScore(e.target.value)}
                                        />
                                    </FormControl>
                                </div> : null}

                            </div>
                        </Stack>

                        <Stack direction="column" sx={{ width: 500, margin: 5 }} spacing={10}>

                            <Stack direction="row" justifyContent="center" spacing={10} sx={{ width: 1200 }}>
                                <Box sx={{ width: 400 }}>
                                    <Typography variant="h6" >How do you rate your SOP?</Typography>
                                    <Stack direction="row" spacing={3}>
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
                                    <Stack direction="row" spacing={3}>
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
                            <Stack direction="row" sx={{ width: 1000, margin: 3 }} spacing={10} alignItems="center">
                                <Box sx={{ width: 400 }}>
                                    <Typography variant="h6" >Years of Experience?</Typography>
                                    <Stack direction="row" spacing={3}>
                                        <Slider
                                            aria-label="experience"
                                            defaultValue={0}
                                            onChange={handleExpSliderChange}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={0}
                                            max={5}
                                        />
                                        <Typography>{exp}</Typography>
                                    </Stack>
                                </Box>
                                <div>
                                    <Typography variant="h6" >What was your GRE Score?</Typography>
                                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                                        <OutlinedInput
                                            id="outlined-adornment-weight"
                                            endAdornment={<InputAdornment position="end">/ 340</InputAdornment>}
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                                'aria-label': 'weight',
                                            }}
                                            onChange={(e) => setGreScore(e.target.value)}
                                        />
                                    </FormControl>
                                </div>
                                <Button variant="contained" color="button" sx={{ height: 60, width: 200, marginTop: 5 }} onClick={findSuggestedColleges}>Find universities</Button>
                            </Stack>
                        </Stack>
                    </Stack>

                </FormControl>
            </div>
        </ThemeProvider>
    );
}

export default StudentMetricsForm;

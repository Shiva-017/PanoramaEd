import { Avatar } from "@mui/material"
import UK from '../resources/united-kingdom.png';
import US from '../resources/flag.png';
import EU from '../resources/european-union.png';
import AUS from '../resources/australia.png';
import CAN from '../resources/canada.png';

export const countryOptions = [
    { value: "United States", label: "United States", icon: <Avatar src={US} alt="United States" sx={{ marginRight: 2 }} /> },
    { value: "United Kingdom", label: "United Kingdom", icon: <Avatar src={UK} alt="United Kingdom" sx={{ marginRight: 2 }} /> },
    { value: "Australia", label: "Australia", icon: <Avatar src={AUS} alt="Australia" sx={{ marginRight: 2 }} /> },
    { value: "Canada", label: "Canada", icon: <Avatar src={CAN} alt="Canada" sx={{ marginRight: 2 }} /> },
    { value: "Europe", label: "Europe", icon: <Avatar src={EU} alt="Europe" sx={{ marginRight: 2 }} /> },
];

export const courseOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Data Science", label: "Data Science" },
    { value: "Business Administration", label: "Business Administration" },
];

export const collegeOptions = [
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

export const majorOptions = [
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

export const intakeOptions = [
    { value: "Spring 24", label: "Spring 24" },
    { value: "Fall 24", label: "Fall 24" },
    { value: "Winter 24", label: "Winter 24" },
    { value: "Spring 25", label: "Spring 25" },
    { value: "Fall 25", label: "Fall 25" },
    { value: "Winter 25", label: "Winter 25" },
];

export const experinceOptions = [
    { value: "< 1 Year", label: "< 1 year" },
    { value: "1-2 Years", label: "1-2 Years" },
    { value: "2-3 Years", label: "2-3 Years" },
    { value: "3-4 Years", label: "3-4 Years" },
    { value: ">4 Years", label: ">4 Years" },
];
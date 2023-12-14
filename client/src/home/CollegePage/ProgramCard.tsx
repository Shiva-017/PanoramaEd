import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { Program } from "../../models/college";
import { ReactElement } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ProgramDetail from "./ProgramDetail";
import Timer from "@mui/icons-material/Timer";

//this component renders a program card with some details
type Props = {
    program: Program
}
const ProgramCard: React.FC<Props> = (props: Props): ReactElement => {
    return (
        <div>
            <Card sx={{ marginLeft: 5, borderLeft: 5, borderColor: "#367c2b", marginTop: 3, marginBottom:3}} >
                <CardHeader title={props.program.name} subheader={props.program.university} sx={{marginLeft:5}}>
                </CardHeader>
                <CardContent>
                    <Stack direction="row">
                        <Stack direction="column">
                            <ProgramDetail label="Application Deadline" value={props.program.deadline || "Rolling"} icon={<CalendarMonthIcon />} />
                            <ProgramDetail label="Duration" value={props.program.duration || "24 months"} icon={<Timer />} />
                        </Stack>
                        <Stack direction="column">
                            <ProgramDetail label="Degree" value={props.program.degree || "Masters"} icon={<MilitaryTechIcon />} />
                            <ProgramDetail label="Tuiton fee" value={`$ ${props.program.fee}`} icon={<AttachMoneyIcon />} />
                        </Stack>
                    </Stack>

                </CardContent>
            </Card>
        </div>
    )
}

export default ProgramCard
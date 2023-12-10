import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { Program } from "../../models/college";
import { ReactElement } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimerIcon from '@mui/icons-material/Timer';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ProgramDetail from "./ProgramDetail";
import Timer from "@mui/icons-material/Timer";
import MilitaryTech from "@mui/icons-material/MilitaryTech";


type Props = {
    program: Program
}
const ProgramCard: React.FC<Props> = (props: Props): ReactElement => {
    return (
        <div>
            <Card sx={{ marginLeft: 5, borderLeft: 5, borderColor: "#603F8B", marginTop: 3, marginBottom:3}} >
                <CardHeader title={props.program.name} subheader={props.program.university} sx={{marginLeft:5}}>
                </CardHeader>
                <CardContent>
                    <Stack direction="row">
                        <Stack direction="column">
                            <ProgramDetail label="Application Deadline" value={props.program.deadline || "Rolling"} icon={<CalendarMonthIcon />} />
                            <ProgramDetail label="Duration" value={props.program.duration} icon={<Timer />} />
                        </Stack>
                        <Stack direction="column">
                            <ProgramDetail label="Degree" value={props.program.duration} icon={<MilitaryTechIcon />} />
                            <ProgramDetail label="Tuiton fee" value={`$ ${props.program.fee}`} icon={<AttachMoneyIcon />} />
                        </Stack>
                    </Stack>

                </CardContent>
            </Card>
        </div>
    )
}

export default ProgramCard;
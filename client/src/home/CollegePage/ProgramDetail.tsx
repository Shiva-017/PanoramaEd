import { Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

type Props ={
    label: string,
    value: string,
    icon: any
}
const ProgramDetail:React.FC<Props> = (props: Props):ReactElement =>{
    return(
        <Stack direction="row" alignItems="center" spacing={3} mt={3} ml={5} width={500}>
        {props.icon}
        <Stack direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2" sx={{color:"#444444"}}>{props.label}</Typography>
            <Typography variant="body1" sx={{fontWeight:"bold"}}>{props.value}</Typography>
        </Stack>
    </Stack>
    )
}

export default ProgramDetail;
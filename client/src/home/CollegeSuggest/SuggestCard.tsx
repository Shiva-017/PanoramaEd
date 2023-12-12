import React, { ReactNode } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import logo from '../../resources/neulogo.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import College, { Program } from '../../models/college';
import { ReactElement } from "react";


type Props = {
  program: Program;
}

const SuggestCard: React.FC<Props> = (props: Props): ReactElement => {
  return (


    <Card sx={{ maxWidth: 345, borderTop: 5, borderColor: "#0039a6", borderRadius: 1, paddingBottom: 3, paddingTop: 3, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Avatar src={props.program.universityLogo} sx={{ margin: "auto" }} />

      <CardHeader
        title={props.program.name}
      />
      <Typography variant='body1'>{props.program.state}</Typography>
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="body1" sx={{ color: "#FF3800" }}>
          {props.program.name}
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={6}>
        <Stack direction="row" spacing={1}>
          <AttachMoneyIcon fontSize='small' />
          <Typography variant="body2">${props.program.fee}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <AccessTimeFilledIcon fontSize='small' />
          <Typography variant="body2">{props.program.duration} months</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SuggestCard;
import {  FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { ReactElement } from "react";

import React from "react";

type Props = {
    items?: MenuItem[];
    name: string;
    defaultValue: string;
    id: string;
    clickHandler: (event: SelectChangeEvent<string>) => void;
    value: string;
    header: string;
}

type MenuItem = {
    value: string;
    label: string;
    icon?: any;
};

const StudentMetricField: React.FC<Props> = (props: Props): ReactElement => {


    return (
        <div>
            <Typography variant="h6" >{props.header}</Typography>
            <FormControl>
                <Select
                    value={props.value}
                    name={props.name}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={(e) => { props.clickHandler(e) }}
                    sx={{ width: 400 }}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>{props.defaultValue}</em>;
                        }
                        return selected;
                    }}
                >
                    <MenuItem value="" sx={{ color: "gray" }}>
                        <em>{props.defaultValue}</em>
                    </MenuItem>
                    {props.items?.map((item) => {
                        return (<MenuItem value={item.value} sx={{ padding: "10px" }}>{item.icon}{item.label}</MenuItem>)
                    })}
                </Select>
            </FormControl>
        </div>
    );
}

export default StudentMetricField;

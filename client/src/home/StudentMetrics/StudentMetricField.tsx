import { 
    FormControl, 
    MenuItem, 
    Select, 
    SelectChangeEvent, 
    Typography,
    Box,
    Paper,
    Stack,
    Chip
} from "@mui/material";
import { ReactElement } from "react";
import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
    const isSelected = props.value !== props.defaultValue && props.value !== "";

    return (
        <Box sx={{ minWidth: 280, maxWidth: 400 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        color: '#667eea',
                        fontWeight: 600,
                        fontSize: '1.1rem'
                    }}
                >
                    {props.header}
                </Typography>
                {isSelected && (
                    <Chip 
                        label="Selected" 
                        size="small"
                        sx={{ 
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                        }} 
                    />
                )}
            </Stack>
            
            <FormControl fullWidth>
                <Select
                    value={props.value}
                    name={props.name}
                    onChange={props.clickHandler}
                    displayEmpty
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                        borderRadius: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(102, 126, 234, 0.2)',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            border: '1px solid rgba(102, 126, 234, 0.4)',
                            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.1)',
                        },
                        '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            border: '1px solid #667eea',
                            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
                        },
                        '& .MuiSelect-select': {
                            padding: '16px 20px',
                            fontSize: '1rem',
                            fontWeight: isSelected ? 600 : 400,
                            color: isSelected ? '#2d3748' : '#718096',
                        },
                        '& .MuiSelect-icon': {
                            color: '#667eea',
                            fontSize: '1.5rem',
                        },
                        transition: 'all 0.3s ease',
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                borderRadius: 3,
                                marginTop: 1,
                                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.15)',
                                border: '1px solid rgba(102, 126, 234, 0.1)',
                                backdropFilter: 'blur(10px)',
                                background: 'rgba(255, 255, 255, 0.95)',
                                '& .MuiMenuItem-root': {
                                    borderRadius: 2,
                                    margin: '4px 8px',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(102, 126, 234, 0.08)',
                                        transform: 'translateX(4px)',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'rgba(102, 126, 234, 0.12)',
                                        fontWeight: 600,
                                        '&:hover': {
                                            backgroundColor: 'rgba(102, 126, 234, 0.16)',
                                        }
                                    }
                                }
                            }
                        }
                    }}
                    renderValue={(selected) => {
                        if (!selected || selected === props.defaultValue) {
                            return (
                                <Box sx={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                                    <Typography variant="body1">
                                        {props.defaultValue}
                                    </Typography>
                                </Box>
                            );
                        }
                        
                        // Find the selected item to show its icon
                        const selectedItem = props.items?.find(item => item.value === selected);
                        
                        return (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {selectedItem?.icon && (
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        color: '#667eea',
                                        fontSize: '1.2rem'
                                    }}>
                                        {selectedItem.icon}
                                    </Box>
                                )}
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {selected}
                                </Typography>
                            </Box>
                        );
                    }}
                >
                    <MenuItem 
                        value="" 
                        disabled
                        sx={{ 
                            color: "#999",
                            fontStyle: 'italic',
                            '&.Mui-disabled': {
                                opacity: 0.6
                            }
                        }}
                    >
                        <em>{props.defaultValue}</em>
                    </MenuItem>
                    
                    {props.items?.map((item, index) => (
                        <MenuItem 
                            key={`${item.value}-${index}`}
                            value={item.value} 
                            sx={{ 
                                padding: "12px 16px",
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                fontSize: '1rem',
                                fontWeight: 500,
                                '&:not(:last-child)': {
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            {item.icon && (
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: '#667eea',
                                    fontSize: '1.2rem',
                                    minWidth: 24
                                }}>
                                    {item.icon}
                                </Box>
                            )}
                            <Typography variant="body1" sx={{ flex: 1 }}>
                                {item.label}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default StudentMetricField;
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

const Button = (props) => {
    const theme = useTheme();
    const { text, size, color, variant, onClick, ...other} = props

    const defaultClickHandler = () => {
        alert("Button Clicked")
    }

    return (
        <MuiButton 
            sx={{ textTransform: "none", margin: theme.spacing(0.5) }}
            variant={variant || "contained"}
            size={size || "small"}
            color={color || "primary"}
            onClick={onClick || defaultClickHandler}
            {...other}
        >
            {text || "Button"}
        </MuiButton>
    )
}

export default Button
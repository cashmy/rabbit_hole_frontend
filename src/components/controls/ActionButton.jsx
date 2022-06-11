import React from 'react';
import { Button, useTheme } from '@mui/material';



export default function ActionButton(props) {

    const { color, children, onClick, ...other } = props;

    const theme = useTheme();

    // const colorPalette = (color) => {
    //     switch (color) {
    //         case "primary":
    //             return color = theme.palette.primary.main
    //         case "secondary":
    //             return color = theme.palette.secondary.main
    //         case "error":
    //             return color = theme.palette.error.main
    //         case "warning":
    //             return color = theme.palette.warning.main
    //         case "info":
    //             return color = theme.palette.info.main
    //         case "success":
    //             return color = theme.palette.success.main
    //         default:
    //             return ""
    //     }
    // }


    return (
        <Button
            sx={{
                minWidth: 0,
                margin: theme.spacing(0.5)
            }}
            style={{ color: color }}
            // {...colorPalette(color)}
            onClick={onClick}
            {...other}
        >
            {children}
        </Button >
    )
}
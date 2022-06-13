import React from 'react';
import { Button, Tooltip, useTheme } from '@mui/material';

export default function ActionButton(props) {
    const { color, children, onClick, tooltipText, ...other } = props;
    const theme = useTheme();

    return (
        <>
            {tooltipText &&
                <Tooltip title={tooltipText}>
                    <Button
                        sx={{ minWidth: 0, margin: theme.spacing(0.5) }}
                        style={{ color: color }}
                        onClick={onClick}
                        {...other}
                    >
                        {children}
                    </Button >
                </Tooltip>
            }
            {!tooltipText &&
                <Button
                    sx={{ minWidth: 0, margin: theme.spacing(0.5) }}
                    style={{ color: color }}
                    onClick={onClick}
                    {...other}
                >
                    {children}
                </Button >
            }
        </>
    )
}
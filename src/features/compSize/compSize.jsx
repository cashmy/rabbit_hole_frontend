import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';

// *** Styled Component ***
const PageStyled = styled('div')(({ theme }) => ({
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: `95vh`,
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.getContrastText(theme.palette.grey[400]),
    padding: theme.spacing(0, 3),
}));

// *** Main Component ***
export default function CompSize() {
    const refContainer = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (refContainer.current) {
            setDimensions({
                width: refContainer.current.offsetWidth,
                height: refContainer.current.offsetHeight,
            });
            console.log("RefCurrent: ", refContainer.current);
        }
    }, []);

    return (
        <PageStyled id="compSize" ref={refContainer}>
            <pre>
                <h3>Container:</h3>
                width: {dimensions.width}
                <br />
                height: {dimensions.height}
            </pre>
        </PageStyled>
    );
}

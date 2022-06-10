/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-06-09 23:36:38
 * @modify date 2022-06-09 23:36:38
 * @desc Title bar for a table like page.
 */

//#region [General imports]
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  Fab,
  Grid,
  Paper,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//#endregion

export default function TitleBar(props) {
  const {
    componentTitle,
    addToolTip,
    primaryColor,
    secondaryColor,
    // detailColor,
    returnFab
  } = props

  const theme = useTheme();
  const navigate = useNavigate();

  const returnToParent = () => {
    navigate(-1);
  };

  return (
    <Grid container>
      <Grid item xs={12} paddingTop={theme.spacing(5)}>
        <Paper
          sx={{
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar>
            <Typography variant="h4" id="titlebar">
              {componentTitle}
            </Typography>

            {returnFab && (
              <Tooltip title="Return to previous display">
                <Fab
                  sx={{ position: "absolute", right: theme.spacing(9) }}
                  color={secondaryColor || "secondary"}
                  aria-label="return to previous display"
                  size="small"
                  onClick={returnToParent}
                >
                  <ArrowBackIcon />
                </Fab>
              </Tooltip>
            )}

            <Tooltip title={addToolTip}>
              <Fab
                sx={{ position: "absolute", right: theme.spacing(2) }}
                color={primaryColor || "primary"}
                aria-label={addToolTip}
                size="small"
                onClick={props.handleAdd}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Toolbar>
        </Paper>
      </Grid>
    </Grid>
  );
};


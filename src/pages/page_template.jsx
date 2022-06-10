/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-06-07 22:22:03
 * @modify date 2022-06-09 22:22:03
 * @desc Template for a table like page.
 * TODO - Add a search bar.
 * TODO - Rename all 'PagePage' to correct name
 * TODO - Add service layer or data layer (RTK).
 * TODO - Add Detail form/modal in imports & Controls.popup
 */

//#region [General imports]
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Fab,
  Grid,
  Paper,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
//#endregion

//#region [Customizable imports]
// import {componentForm as DetailForm} from "./<ComponentForm>";
//#endregion

const componentTitle = "Component Title Goes Here";
const searchText ="Search Text Goes Here";
const addToolTip = "Add an item";
const editToolTip = "Edit an item";
const deleteToolTip = "Delete an item";
const primaryColor = "#00bcd4";
const secondaryColor = "#ff9800";
const detailColor = "#ff9800";

// *** Styled Components ***
const PageStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: '1',
  justifyContent: 'space-between',
  height: `95vh`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : theme.palette.grey[400],
  color:
    theme.palette.mode === "dark"
      ? theme.palette.getContrastText(theme.palette.background.default)
      : theme.palette.getContrastText(theme.palette.grey[400]),
  padding: theme.spacing(0, 3),
}));
function TitleBar(props) {
  const theme = useTheme();
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
              {props.title}
            </Typography>
            <Tooltip title="Add an item">
              <Fab
                sx={{ position: "absolute", right: "1rem" }}
                color="primary"
                aria-label="add an item"
                size="small"
                onClick={() => {
                  //   setOpenPopup(true);
                  //   setRecordForEdit(null);
                }}
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
const MainTable = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginRight: theme.spacing(7),
  marginLeft: theme.spacing(7),
  padding: theme.spacing(3)
}));

// *** Main Component ***
export default function PagePage() {


  return (
    <PageStyled id="pagePage">
      <Box sx={{ flexGrow: 1 }}>
        
        {/* //* Header Bar */}
        <TitleBar title={componentTitle}/>

        {/* //* Main Table */}
        <MainTable>
          <h2> Main Table </h2>
        </MainTable>

        {/* //* Dialogs, Modals, & Popups */}

      </Box>
    </PageStyled>
  );
}
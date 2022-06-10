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
import { styled } from '@mui/material/styles';
import {
  Box,
  Paper
} from '@mui/material';
import TitleBar from '../components/titleBar';
//#endregion

//#region [Customizable imports]
// import {componentForm as DetailForm} from "./<ComponentForm>";
//#endregion

const componentTitle = "Component Title Goes Here*";
// const searchText = "Search Text Goes Here";
const addToolTip = "Add a new item";
// const editToolTip = "Edit an item";
// const deleteToolTip = "Delete an item";
const primaryColor = "primary";
// const backgroundColor = "#ff9800";
// const detailColor = "#ff9800";


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

const MainTable = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginRight: theme.spacing(7),
  marginLeft: theme.spacing(7),
  padding: theme.spacing(3)
}));

// *** Main Component ***
export default function PagePage() {

  // * Event Handlers *
  const handleAdd = () => {
    //   setOpenPopup(true);
    //   setRecordForEdit(null);
    alert("Adding a record")
  }

  return (
    <PageStyled id="pagePage">
      <Box sx={{ flexGrow: 1 }}>

        {/* //* Title Bar */}
        <TitleBar 
          componentTitle={componentTitle} 
          addToolTip={addToolTip} 
          handleAdd={handleAdd}
          primaryColor={primaryColor}
          // returnFab={true}
        />

        {/* //* Main Table */}
        <MainTable>
          <h2> Main Table </h2>
        </MainTable>

        {/* //* Dialogs, Modals, & Popups */}

      </Box>
    </PageStyled>
  );
}
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

// #region [General imports]
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
// Icons
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import TitleBar from '../components/titleBar';
// Wrapped Components
import Controls from '../components/controls/Controls';
import useTable from "../hooks/useTable";
//#endregion

// #region [Customizable imports]
import PageForm from "./page_form";
import PageDialog from './page_dialog';
// #endregion

// *** Customized Texts ***
// #region [Customizable texts]
const componentTitle = "** My First Component Title **";
const detailTitle = "** Detail Title Goes Here **";
const searchText = "Search Text Goes Here";
const addToolTip = "Add a new item";
const editToolTip = "Edit an item";
const deleteToolTip = "Delete an item";
const archiveToolTip = "Archive an item";
const primaryColor = "info";     // can only be primary, secondary, error, warning, info, success, or neutral
const secondaryColor = "secondary"; // can only be primary, secondary, error, warning, info, success, or neutral
const backgroundColor = "#3f51b5";  // can be any color
// const detailColor = "#ff9800";
// #endregion

// *** Styled Components ***
const PageStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexGrow: '1',
  justifyContent: 'space-between',
  height: `95vh`,
  padding: theme.spacing(0, 3),
  // Use the next two styles only if there is no background image defined in App.js
  // backgroundColor:
  //   theme.palette.mode === "dark"
  //     ? theme.palette.background.default
  //     : theme.palette.grey[400],
  // color:
  //   theme.palette.mode === "dark"
  //     ? theme.palette.getContrastText(theme.palette.background.default)
  //     : theme.palette.getContrastText(theme.palette.grey[400]),
}));

const MainTable = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginRight: theme.spacing(7),
  marginLeft: theme.spacing(7),
  padding: theme.spacing(3),
}));

// * Table Columns
const columnCells = [
  { id: 'fieldName', label: 'fieldLable' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

// *** Main Component ***
export default function PagePage() {

  // #region [State]
  const [records, setRecords] = useState([])
  const [loadData, setLoadData] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
  const [openPopup, setOpenPopup] = useState(false)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [archiveStatus, setArchiveStatus] = useState(false);
  // #endregion

  useEffect(() => {
    const getTableData = async (e) => {
      try {
        setIsLoading(true);
        // const response = await CurriculumThemesService
        //   .getAllRecordsBySts(archiveStatus)
        //   .getAllRecords()
        //   .then();
        // setRecords(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    }
    getTableData();
  }, [archiveStatus, loadData]);

  // * Table Constants
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, columnCells, filterFn);

  // * Event Handlers * 
  const handleSearch = e => {
    let target = e.target;
    // state can't store functions, so we are storing an object with the function internally defined.
    setFilterFn({
      fn: items => {
        // target.value is the search box contents
        if (target.value === "")
          return items;
        else
          return items.filter(
            (x) =>
              x.lectureTopics
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.curriculumType.name
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.templateHeader.name
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.notes
                .toLowerCase()
                .includes(target.value.toLowerCase())
          )
      }
    })
  };
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  };
  const handleToggle = () => {
    setArchiveStatus(!archiveStatus);
  };
  const handleAdd = () => {
    setOpenPopup(true);
    setRecordForEdit(null);
  }
  const handleEdit = (record) => {
    openInPopup(record)
  };
  const handleDelete = (themeId, id) => {
    setConfirmDialog({
      isOpen: true,
      title:
        "Are you sure you want to delete this Curriculum Theme and all of its Detail?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(themeId, id);
      },
    })
  };
  const onDelete = (themeId, id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    // CurriculumDetailService.deleteCurriculumDetail(themeId, id)
    setLoadData(!loadData); // Request reload of data
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  const addOrEdit = (record, resetForm, close) => {
    console.log("Editing detail with the following info: ", record)
    debugger
    if (record.id === 0) {
      // CurriculumDetailService.addCurriculumDetail(record)
      alert("Added")
      resetForm()
      setLoadData(true); // Request reload of data
    }
    else {
      // CurriculumDetailService.updateCurriculumDetail(record)
      alert("Updated")
      setLoadData(true); // Request reload of data
    }
    if (close) {
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false) // Close Popup modal
    }

    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success'
    })
  };
  const handleArchive = (item) => {
    // CurriculumThemesService.patchCurriculumThemeSts(item.id, !archiveStatus)
    setLoadData(!loadData); // Request reload of data
    setNotify({
      isOpen: true,
      message: "Archive status changed",
      type: "success",
    });
  };

  return (
    <PageStyled id="pagePage">
      <Box sx={{ flexGrow: 1 }}>

        {/* //* Title Bar */}
        <TitleBar
          componentTitle={componentTitle}
          addFab={true}
          handleAdd={handleAdd}
          addToolTip={addToolTip}
          // primaryColor={primaryColor}
          // secondaryColor={secondaryColor}
          // returnFab={true}
          backgroundColor={backgroundColor}
        />

        {/* //* Main Table */}
        <MainTable>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controls.Input
                name="searchText"
                label={searchText}
                fullWidth={true}
                InputProps={{
                  startAdornment: (<InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>)
                }}
                onChange={handleSearch}
              />
            </Grid>
            <Grid item xs={6} justifySelf="end">
              <TblPagination
                rowsPerPage={10}
                rowsPerPageOptions={[5, 10, 20, { value: -1, label: 'All' }]}
              />
            </Grid>
          </Grid>

          <TableContainer>
            <TblContainer stickyHeader={true}>
              <TblHead />
              <TableBody>
                {isLoading ? (
                  <TableRow key="999">
                    <TableCell>
                      <Typography> Loading ... </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  recordsAfterPagingAndSorting().map((record, index) => (
                    <TableRow key={index}>
                      {/* // TODO: Add table fields here */}

                      <TableCell>
                        {/* //& Edit */}
                        <Controls.ActionButton
                          color="darkcyan"
                          tooltipText={editToolTip}
                          size="large"
                          onClick={() => handleEdit(record)}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>

                        {/* //& Delete */}
                        <Controls.ActionButton
                          color="red"
                          tooltipText={deleteToolTip}
                          onClick={() => handleDelete(record)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Controls.ActionButton>

                        {/* //& Archive */}
                        <Controls.ActionButton
                          color="darkorchid"
                          tooltipText={archiveToolTip}
                          onClick={() => {
                            handleArchive(record);
                          }}
                        >
                          {!archiveStatus && <ArchiveIcon />}
                          {archiveStatus && <UnarchiveIcon />}
                        </Controls.ActionButton>
                      </TableCell>
                    </TableRow>
                  ))
                )
                }
              </TableBody>
            </TblContainer>
          </TableContainer>
        </MainTable>

        {/* //* Dialogs, Modals, & Popups */}
        <PageDialog openPopup={openPopup} setOpenPopup={setOpenPopup} title={detailTitle} >
          <PageForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </PageDialog>
        <Controls.Notification notify={notify} setNotify={setNotify} />
        <Controls.ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      </Box>
    </PageStyled>
  );
}
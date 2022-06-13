/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-06-07 22:22:03
 * @modify date 2022-06-09 22:22:03
 * @desc Basic Table page for the Rabbit Hole app.
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
import TitleBar from '../../components/titleBar';
// Wrapped Components
import Controls from '../../components/controls/Controls';
import useTable from "../../hooks/useTable";
import PageDialog from '../page_dialog';
//#endregion

// #region [Customizable imports]
import RHForm from "./rh_form";
// Service Layer
import RabbitHoleService from "../../services/rabbitHole.service";
// #endregion

// *** Customized Texts ***
// #region [Customizable texts]
const componentTitle = "Rabbit Hole Logs";
const detailTitle = "Rabbit Hole Log Detail";
const searchText = "Search by Name, Type, or Description";
const addToolTip = "Add a new item";
const editToolTip = "Edit an item";
const deleteToolTip = "Delete an item";
const archiveToolTip = "Archive an item";
const backgroundColor = "#3f51b5";  // can be any color
// const primaryColor = "info";     // can only be primary, secondary, error, warning, info, success, or neutral
// const secondaryColor = "secondary"; // can only be primary, secondary, error, warning, info, success, or neutral
// const detailColor = "#ff9800";
// const theadColor = "purple"; // purple
// #endregion

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
  padding: theme.spacing(3),
}));

// * Table Columns
const columnCells = [
  { id: 'id', label: 'ID', numeric: true },
  { id: 'project', label: 'Project ID' },
  { id: 'log_type', label: 'Type' },
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'rating', label: 'Rating' },
  { id: 'solution', label: 'Sltn' },
  { id: 'completed', label: 'Cmplt' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]

// *** Main Component ***
export default function RH_Table() {

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
        const response = await RabbitHoleService
          // .getAllRecordsBySts(archiveStatus)
          .getAllRecords()
          .then();
        setRecords(response.data)
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
  } = useTable(records, columnCells, filterFn, );

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
              x.log_type
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.name
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.description
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
        "Are you sure you want to delete this entry?",
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
    // CurriculumDetailService.deleteCurriculumDetail(id)
    setLoadData(!loadData); // Request reload of data
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  const addOrEdit = (record, resetForm, close) => {
    // console.log("Editing detail with the following info: ", record)
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
          // primaryColor={primaryColor}
          handleAdd={handleAdd}
          addToolTip={addToolTip}
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
                      <TableCell>{record.id}</TableCell>
                      <TableCell>{record.project_id}</TableCell>
                      <TableCell>{record.log_type}</TableCell>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.description}</TableCell>
                      <TableCell>{record.rating}</TableCell>
                      <TableCell>{record.solution}</TableCell>
                      <TableCell>{record.completed}</TableCell>

                      {/* // *Actions */}
                      <TableCell>
                        {/* //& Edit */}
                        <Controls.ActionButton
                          color="darkcyan"
                          tooltipText = {editToolTip}
                          size="large"
                          onClick={() => handleEdit(record)}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>

                        {/* //& Delete */}
                        <Controls.ActionButton
                          color="red"
                          tooltipText = {deleteToolTip}
                          onClick={() => handleDelete(record)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Controls.ActionButton>
   

                        {/* //& Archive */}

                          <Controls.ActionButton
                            color="darkorchid"
                            tooltipText = {archiveToolTip}
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
          <RHForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </PageDialog>
        <Controls.Notification notify={notify} setNotify={setNotify} />
        <Controls.ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      </Box>
    </PageStyled>
  );
}
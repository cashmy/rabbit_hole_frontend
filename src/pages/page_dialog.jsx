
// #region [General imports]
import * as React from 'react';
import { useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import Controls from '../components/controls/Controls';
import CloseIcon from '@mui/icons-material/Close';
// #endregion

export default function PageDialog(props) {
  const theme = useTheme();
  const { title, children, openPopup, setOpenPopup, fullWidth } = props
  const [maxWidth, setMaxWidth] = React.useState('md');

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  // const handleFullWidthChange = (event) => {
  //   setFullWidth(event.target.checked);
  // };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth || true}
        maxWidth={maxWidth}
        open={openPopup}
        onClose={handleClose}
      >
        <DialogTitle display={'flex'}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, mt: theme.spacing(2) }}>
            {title || "Dialog Title"}
          </Typography>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel htmlFor="max-width">maxWidth</InputLabel>
            <Select
              variant="filled"
              value={maxWidth}
              label="maxWidth"
              onChange={handleMaxWidthChange}
              inputProps={{
                name: 'max-width',
                id: 'max-width',
              }}
            >
              <MenuItem value={false}>false</MenuItem>
              <MenuItem value="xs">xs</MenuItem>
              <MenuItem value="sm">sm</MenuItem>
              <MenuItem value="md">md</MenuItem>
              <MenuItem value="lg">lg</MenuItem>
              <MenuItem value="xl">xl</MenuItem>
            </Select>
          </FormControl>
          <Controls.ActionButton color="secondary" onClick={handleClose}>
            <CloseIcon />
          </Controls.ActionButton>
        </DialogTitle>
        <DialogContent dividers>
          {children && children}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
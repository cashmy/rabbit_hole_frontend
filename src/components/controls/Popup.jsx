import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, useTheme, autocompleteClasses } from '@mui/material';
import Controls from './Controls'
import CloseIcon from '@mui/icons-material/Close';


export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props
  const theme = useTheme();

  return (
    <Dialog
      sx={{
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(2),
        fullWidth: true,
      }}
      open={openPopup}
      maxWidth="md"
    >
      <DialogTitle paddingRight="0px">
        <div style={{ display: "flex" }} >
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => { setOpenPopup(false) }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle >

      <DialogContent dividers>
          {children && children}
      </DialogContent>
    </Dialog>
  )
}

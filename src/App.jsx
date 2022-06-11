import * as React from 'react';
import { useState } from 'react';

// * MUI Components
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// * MUI Icons
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// React Router
import { Routes, Route } from 'react-router-dom';
// Router Components
// import { HomePage } from './pages/Home';
// import { PageTwo } from './pages/Page2';
import CompSize from './features/compSize/compSize'
import PageTemplate from './pages/page_template';

// * Styled Components
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor:
    theme.palette.mode === "dark"
      ? '#090909'
      : theme.palette.primary.dark,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.getContrastText('#090909')
      : theme.palette.getContrastText(theme.palette.primary.dark),

  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? '#090909'
      : theme.palette.primary.dark,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.getContrastText('#090909')
      : theme.palette.getContrastText(theme.palette.primary.dark),

  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// * App Component
export default function App(props) {
  const { darkMode, setDarkMode } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [initialLogin, setInitialLogin] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenuClose = () => {
    localStorage.removeItem("token");
    // window.location.href = "login";
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* // * App Bar */}
      <AppBar position="fixed" display="flex"
        sx={{}}
        open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* // TODO: Place Logo/Avatar here */}
          <Typography variant="h6" noWrap component="div">
            Rabbit Hole Tracking
          </Typography>
          <FormControlLabel
            sx={{ position: 'absolute', right: '4rem' }}
            // className={classes.darkModeSwitch}
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            }
            label="Dark Mode"
          />
          {initialLogin === true && (
            <IconButton
              // className={classes.logOut}
              sx={{ position: 'absolute', right: '1rem' }}
              color="inherit"
              onClick={handleMenuClose}
              size="large">
              <PowerSettingsNewIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* // * Drawer  */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'white',
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'white',
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* // * Main Display / Routes */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader /> {/* This component creates space for the AppBar so components rendered below will line up correctly*/}

        <Box sx={{ display: "flex" }} >
          {/* <CompSize /> */}
          <Routes>
            <Route path="/" element={<CompSize />} />
            <Route path="/template" element={<PageTemplate />} />
            {/* <Route path="/" element={<HomePage />} /> */}
            {/* <Route path="/page2" element={<PageTwo />} /> */}
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}

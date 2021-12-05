import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar } from '@mui/material';
import { Home, SupervisedUserCircle, Event, Bloodtype, Apartment, Logout } from '@mui/icons-material';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
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

export default function MiniDrawer({ children }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleOnclick() {
        let a = document.getElementById('avaI');
        if (a.style.visibility === "visible") {
            a.style.visibility = "hidden";
        }
        else {
            a.style.visibility = "visible";
        }
    }

    const userDropDown = useRef(null);

    useEffect(() => {
        let handleClickOutside = (event) => {
            if (userDropDown.current && !userDropDown.current.contains(event.target)) {
                let a = document.getElementById('avaI');
                if (a.style.visibility === "visible") {
                    a.style.visibility = "hidden";
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} style={{ backgroundColor: "#fe3c47" }} className="appBar">
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" className="logoTitle">
                        Blood Donation Admin
                    </Typography>
                </Toolbar>

                <div ref={userDropDown} className="appBarAvatar">
                    <div className="adminInfo" id="avaI" style={{ visibility: "hidden" }}>
                        <ul>
                            <div className="menuItem">
                                <li>Name</li>
                            </div>
                            <div className="menuItem">
                                <li><Logout style={{ marginRight: "10px" }} />Log Out</li>
                            </div>
                        </ul>
                    </div>
                    <Avatar onClick={handleOnclick} style={{ backgroundColor: "#151515", border: " 1px solid #539" }}>H</Avatar>
                </div>
            </AppBar>
            <Drawer variant="permanent" open={open}  >
                <DrawerHeader >
                    <IconButton onClick={handleDrawerClose} >
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List  >
                    <ListItem button key="Dashboard">
                    <Link href="/home">
                            <div className="appBar">
                        <ListItemIcon>
                            <Home style={{ color: "#fe3c47" }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                        </div>
                        </Link>
                    </ListItem>
                    <ListItem button key="Sự kiện">
                        <Link href="/home/event">
                            <div className="appBar">
                                <ListItemIcon>
                                    <Event style={{ color: "#fe3c47" }} />
                                </ListItemIcon>
                                <ListItemText primary="Sự kiện" />
                            </div>
                        </Link>
                    </ListItem>
                    <ListItem button key="Tình nguyện viên">
                        <Link href="/home/volunteer">
                            <div className="appBar">
                                <ListItemIcon>
                                    <SupervisedUserCircle style={{ color: "#fe3c47" }} />
                                </ListItemIcon>
                                <ListItemText primary="Tình nguyện viên" />
                            </div>
                        </Link>
                    </ListItem>
                    <ListItem button key="Đơn vị hiến máu">
                        <Link href="/home/blood-request">
                            <div className="appBar">
                                <ListItemIcon>
                                    <Bloodtype style={{ color: "#fe3c47" }} />
                                </ListItemIcon>
                                <ListItemText primary="Đơn vị hiến máu" />
                            </div>
                        </Link>
                    </ListItem>
                    <ListItem button key="Tổ chức">
                    <Link href="/home/organization">
                            <div className="appBar">
                                <ListItemIcon>
                                    <Apartment style={{ color: "#fe3c47" }} />
                                </ListItemIcon>
                                <ListItemText primary="Tổ chức" />
                            </div>
                        </Link>
                    </ListItem>
                </List>
                {/* <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
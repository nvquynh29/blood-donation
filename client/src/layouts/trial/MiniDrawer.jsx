import {
  Apartment,
  Bloodtype,
  Event,
  Home,
  Logout,
  SupervisedUserCircle,
} from '@mui/icons-material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import router from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ReactReduxContext } from 'react-redux'
import Cookies from 'universal-cookie'
import { getUser } from '../../api/user'
import { removeUser } from '../../store/actions/userAction'
import { checkBloodBank } from '../../api/organization'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

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
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

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
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
}))

export default function MiniDrawer({ children }) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [user, setUser] = useState({})
  const [bloodBank, setBloodBank] = useState(false)
  const { store } = useContext(ReactReduxContext)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const logout = () => {
    const cookies = new Cookies()
    cookies.remove('accessToken', { path: '/' })
    cookies.remove('refreshToken', { path: '/' })
    store.dispatch(removeUser())
    router.push('/')
  }

  function handleOnclick() {
    let a = document.getElementById('avaI')
    if (a.style.visibility === 'visible') {
      a.style.visibility = 'hidden'
    } else {
      a.style.visibility = 'visible'
    }
  }

  const getCurrentUser = async () => {
    try {
      const res = await getUser()
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getFirstCharName = (userName) => {
    if (userName) {
      const arr = userName.split(' ')
      const firstChar = arr[arr.length - 1][0]
      return firstChar
    }
    return 'A'
  }

  const userDropDown = useRef(null)

  useEffect(async () => {
    try {
      const { data: { is_blood_bank } } = await checkBloodBank()
      setBloodBank(is_blood_bank)
    } catch (error) {
      console.log(error)
    }
  }, [bloodBank])

  useEffect(() => {
    getCurrentUser()
  }, [])

  useEffect(() => {
    let handleClickOutside = (event) => {
      if (
        userDropDown.current &&
        !userDropDown.current.contains(event.target)
      ) {
        let a = document.getElementById('avaI')
        if (a.style.visibility === 'visible') {
          a.style.visibility = 'hidden'
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: '#fe3c47' }}
        className="appBar"
      >
        <Toolbar>
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
          <div className="adminInfo" id="avaI" style={{ visibility: 'hidden' }}>
            <ul>
              <div className="menuItem">
                <a href="/admin/profile" className="text-white">
                  <li>Trang cá nhân</li>
                </a>
              </div>
              <div className="menuItem">
                <li onClick={logout}>
                  <Logout style={{ marginRight: '10px' }} />
                  Đăng xuất
                </li>
              </div>
            </ul>
          </div>
          <Avatar
            onClick={handleOnclick}
            style={{ backgroundColor: '#151515', border: ' 1px solid #539' }}
          >
            {/* TODO: Current user name */}
            {getFirstCharName(user.name)}
          </Avatar>
        </div>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link href="/admin/dashboard">
            <ListItem button key="Dashboard">
              <ListItemIcon>
                <Home style={{ color: '#fe3c47' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link href="/admin/event">
            <ListItem button key="Sự kiện">
              <ListItemIcon>
                <Event style={{ color: '#fe3c47' }} />
              </ListItemIcon>
              <ListItemText primary="Sự kiện" />
            </ListItem>
          </Link>
          <Link href="/admin/volunteers">
            <ListItem button key="Tình nguyện viên">
              <ListItemIcon>
                <SupervisedUserCircle style={{ color: '#fe3c47' }} />
              </ListItemIcon>
              <ListItemText primary="Tình nguyện viên" />
            </ListItem>
          </Link>
          <div className={bloodBank ? '' : 'hidden'}>
            <Link href="/admin/blood">
              <ListItem button key="Đơn đăng ký tiếp nhận máu">
                <ListItemIcon>
                  <Bloodtype style={{ color: '#fe3c47' }} />
                </ListItemIcon>
                <ListItemText primary="Đơn xin nhận máu" />
              </ListItem>
            </Link>
          </div>
          <Link href="/admin/organization-info">
            <ListItem button key="Tổ chức">
              <ListItemIcon>
                <Apartment style={{ color: '#fe3c47' }} />
              </ListItemIcon>
              <ListItemText primary="Tổ chức" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}

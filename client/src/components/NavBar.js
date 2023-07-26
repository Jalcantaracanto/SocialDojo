/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { createChat, userChats } from '../services/chat-service'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import List from '@mui/material/List'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import Avatar from '@mui/material/Avatar'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllUsers, getUser } from '../services/user-service'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { logout } from '../actions/AuthAction'
import MessageIcon from '@mui/icons-material/Message'
import HomeIcon from '@mui/icons-material/Home'
import ChatIcon from '@mui/icons-material/Chat'
import { updateNotificationCount } from '../actions/NotificationActions'

import io from 'socket.io-client'

import '../styles/FollowersCard.css'

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: 'white',
    width: '15%',
    marginLeft: '79%',
    marginTop: '1vh',
    position: 'absolute',
    top: '64px',
    zIndex: 1,
    border: '1px solid #ccc',
    borderRadius: '8px',
}))

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))

const GradientAppBar = styled(AppBar)(({ theme }) => ({
    background: 'var(--navBar)', // Replace the colors with your desired gradient
}))

export const NavBar = () => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER
    const defaultAvatar = user.firstname[0].toUpperCase() + user.lastname[0].toUpperCase()
    const dispatch = useDispatch()

    const [anchorElNav, setAnchorElNav] = useState(null)
    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    //notificaciones
    const notificationCount = useSelector((state) => state.notificationReducer.notificationCount)

    const [anchorEl, setAnchorEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const handleLogout = () => {
        dispatch(logout())
        console.log('logout')
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${user._id}`}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    )

    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={notificationCount} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                {
                    <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
                        <AccountCircle />
                    </IconButton>
                }
                <p>Profile</p>
            </MenuItem>
        </Menu>
    )

    // logic for user search

    const [users, setUsers] = useState([])
    const [singleUser, setSingleUser] = useState()
    const [dense, setDense] = useState(false)
    const [searchFilter, setSearchFilter] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    // Error and success messages

    const getUserFromService = () => {
        getUser(user.id)
            .then((response) => {
                setSingleUser(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getAllUsersFromService = () => {
        getAllUsers()
            .then((response) => {
                setUsers(response.data)
                // console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        // console.log(users)
    }

    useEffect(() => {
        if (searchValue) {
            getAllUsersFromService()
            getUserFromService()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue])

    const handleChatClick = async (contactId) => {
        try {
            // Verificar si ya existe un chat con el usuario
            const res = await userChats(user._id)
            const chats = res.data
            console.log(res.data)
            const existingChat = chats.find((chat) => chat.members.includes(contactId))
            if (existingChat) {
                // Ya existe un chat con la persona
                navigate(`/chat`)
            } else {
                const newChat = await createChat({ senderId: user._id, receiverId: contactId })
                navigate(`/chat`)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const filteredUsers = users.filter((user) => {
            return user.username?.toLowerCase().includes(searchValue.toLowerCase())
        })
        setSearchFilter(filteredUsers)
    }, [searchValue, users])

    const [socket, setSocket] = useState(null) // Variable para almacenar la instancia del socket

    // Conectar el socket cuando el componente se monta
    useState(() => {
        const newSocket = io('http://localhost:3001') // Cambia la URL a la dirección de tu servidor de socket.io
        setSocket(newSocket)

        // Desconectar el socket cuando el componente se desmonte (opcional, pero es buena práctica)
        return () => {
            newSocket.disconnect()
        }
    }, [])

    return (
        <Box sx={{ flexGrow: 1, marginBottom: '1rem' }}>
            <GradientAppBar position="static">
                <Toolbar>
                    {/* <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to={'../home'}>
                            {user.username}
                        </Link>
                    </Typography>

                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={(e) => setSearchValue(e.target.value)} />
                    </Search> */}

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={() => {
                                // Desconectar el socket al hacer clic en el icono "Home"
                                if (socket) {
                                    socket.disconnect()
                                }
                                navigate('/home')
                            }}
                        >
                            <HomeIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={() => {
                                navigate('/chat')
                            }}
                        >
                            <MailIcon />
                        </IconButton>

                        {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton> */}
                        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                            {/* <Badge badgeContent={notificationCount} color="error">
                                <NotificationsIcon />
                            </Badge> */}
                        </IconButton>
                        <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                            <Avatar alt="Avatar" src={user.profilePicture ? serverUrl + user.profilePicture : serverUrl + defaultAvatar}>
                                {defaultAvatar}
                            </Avatar>
                        </IconButton>
                    </Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={(e) => setSearchValue(e.target.value)} />
                    </Search>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </GradientAppBar>
            {renderMobileMenu}
            {renderMenu}
            {searchValue && (
                <Demo>
                    <List dense={dense}>
                        {searchFilter.length > 0 ? (
                            searchFilter
                                .sort((a, b) => a.username.localeCompare(b.username)) // Ordena los elementos por el nickname
                                .map((value, index) => {
                                    return (
                                        <ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete" onClick={() => handleChatClick(value._id)}>
                                                    <MessageIcon />
                                                </IconButton>
                                            }
                                            key={index}
                                        >
                                            <Avatar alt="Avatar" src={value.profilePicture ? serverUrl + value.profilePicture : serverUrl + value.firstname[0] + value.lastname[0]}>
                                                {value.firstname[0] + value.lastname[0]}
                                            </Avatar>
                                            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${value._id}`}>
                                                <ListItemText style={{ color: 'black' }}>{' ' + value.firstname + ' ' + value.lastname}</ListItemText>
                                                {console.log(value)}
                                            </Link>
                                        </ListItem>
                                    )
                                })
                        ) : (
                            <p style={{ color: 'black' }}>No existe el Usuario</p>
                        )}
                    </List>
                </Demo>
            )}
        </Box>
    )
}

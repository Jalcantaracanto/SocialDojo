// Styles
import '../styles/ProfileCard.css'
// React
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { getUser } from '../services/user-service'
import { followUser, unfollowUser, getUser } from '../actions/userAction'
import FollowersModal from './FollowersModal'
import { InfoCard } from './InfoCard'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'

//MUI
import Avatar from '@mui/material/Avatar'

export const ProfileCard = ({ location, following, setfollowing }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const { test } = useSelector((state) => state.authReducer.profiles)
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER
    const posts = useSelector((state) => state.postReducer.posts)
    const params = useParams()
    const profileUserId = params.id

    //POPUP
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogOpen1, setDialogOpen1] = useState(false)

    const handleFollowersClick = () => {
        setDialogOpen(true)
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleInfoCLick = () => {
        setDialogOpen1(true)
    }

    const handleDialog1Close = () => {
        setDialogOpen1(false)
    }

    // const [following, setfollowing] = useState(user?.followers?.includes(user._id))

    const handleFollow = () => {
        following ? dispatch(unfollowUser(test._id, user)) : dispatch(followUser(test._id, user))
        setfollowing((prev) => !prev)
    }

    useEffect(() => {
        dispatch(getUser(profileUserId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    if (params['*'] === 'home' || (test && test._id === user._id)) {
        return (
            <div className="ProfileCard">
                <div className="ProfileImages">
                    <img src={user.coverPicture ? serverUrl + user.coverPicture : serverUrl + 'defaultCover.jpg'} alt="" />
                    {user && user.firstname && user.lastname && (
                        <Avatar
                            sx={{
                                position: 'absolute',
                                width: location === 'profilePage' ? '8rem' : '5rem',
                                height: location === 'profilePage' ? '8rem' : '5rem',
                                bottom: '-3rem',
                                boxShadow: 'var(--profileShadow)',
                                fontSize: '3rem',
                            }}
                            alt="Avatar"
                            src={user.profilePicture ? serverUrl + user.profilePicture : user.firstname[0] + user.lastname[0]}
                        >
                            {user.firstname[0] + user.lastname[0]}
                        </Avatar>
                    )}
                    {/* <img src={data.profilePicture ? serverUrl + data.profilePicture : serverUrl + 'defaultProfile.png'} alt="" /> */}
                </div>

                <div className="ProfileName">
                    <span>
                        {user.firstname} {user.lastname}
                    </span>
                    <span>{user.worksAt ? user.worksAt : 'Write about yourself'}</span>
                </div>

                <div className="followStatus">
                    <hr />
                    <div>
                        <div className="follow" onClick={handleFollowersClick} style={{ cursor: 'pointer' }}>
                            <span>{user.followings?.length}</span>
                            <span>Followings</span>
                        </div>
                        <div className="vl"></div>
                        <div className="follow" onClick={handleFollowersClick} style={{ cursor: 'pointer' }}>
                            <span>{user.followers?.length}</span>
                            <span>Followers</span>
                        </div>
                        {location === 'profilePage' && (
                            <>
                                <div className="vl"></div>
                                <div className="follow">
                                    <span>{posts.filter((posts) => posts.userId === user._id).length}</span>
                                    <span>Post</span>
                                </div>
                            </>
                        )}
                    </div>
                    <hr />
                    {location === 'profilePage' && (
                        <div>
                            <button className="button pc-button" onClick={handleInfoCLick}>
                                {' '}
                                Detail
                            </button>
                            {user._id === params._id && user.followers && (
                                <>
                                    <button className={following ? 'button pc-button UnfollowButton' : 'button pc-button'} onClick={handleFollow}>
                                        {following ? 'Unfollow' : 'Follow'}
                                    </button>
                                    <button className="button pc-button"> Message</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
                {location === 'profilePage' ? (
                    ''
                ) : (
                    <span>
                        {/* <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${user._id}`}>
                                My profile
                            </Link> */}
                    </span>
                )}
                <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                    <DialogTitle>Followers and Following</DialogTitle>
                    <DialogContent>
                        <FollowersModal />
                    </DialogContent>
                </Dialog>
                <Dialog open={dialogOpen1} onClose={handleDialog1Close} fullWidth maxWidth="sm">
                    {/* <DialogTitle>Profile Info</DialogTitle> */}
                    <DialogContent>
                        <InfoCard />
                    </DialogContent>
                </Dialog>
            </div>
        )
    } else {
        return (
            <div className="ProfileCard">
                <div className="ProfileImages">
                    <img src={test.coverPicture ? serverUrl + test.coverPicture : serverUrl + 'defaultCover.jpg'} alt="" />
                    {test && test.firstname && test.lastname && (
                        <Avatar sx={{ position: 'absolute', width: '6rem', height: '6rem', bottom: '-3rem', boxShadow: 'var(--profileShadow)', fontSize: '3rem' }} alt="Avatar" src={test.profilePicture ? serverUrl + test.profilePicture : test.firstname[0] + test.lastname[0]}>
                            {test.firstname[0] + test.lastname[0]}
                        </Avatar>
                    )}
                    {/* <img src={data.profilePicture ? serverUrl + data.profilePicture : serverUrl + 'defaultProfile.png'} alt="" /> */}
                </div>

                <div className="ProfileName">
                    <span>
                        {test.firstname} {test.lastname}
                    </span>
                    <span>{test.worksAt ? test.worksAt : 'Write about yourself'}</span>
                </div>

                <div className="followStatus">
                    <hr />
                    <div>
                        <div className="follow" onClick={handleFollowersClick} style={{ cursor: 'pointer' }}>
                            <span>{test.followings?.length}</span>
                            <span>Followings</span>
                        </div>
                        <div className="vl"></div>
                        <div className="follow" onClick={handleFollowersClick} style={{ cursor: 'pointer' }}>
                            <span>{test.followers?.length}</span>
                            <span>Followers</span>
                        </div>
                        {location === 'profilePage' && (
                            <>
                                <div className="vl"></div>
                                <div className="follow">
                                    <span>{posts.filter((posts) => posts.userId === test._id).length}</span>
                                    <span>Post</span>
                                </div>
                            </>
                        )}
                    </div>
                    <hr />
                    {location === 'profilePage' && (
                        <div>
                            <button className="button pc-button" onClick={handleInfoCLick}>
                                {' '}
                                Detail
                            </button>
                            {test._id !== params._id && user.followers && (
                                <>
                                    <button className={following ? 'button pc-button UnfollowButton' : 'button pc-button'} onClick={handleFollow}>
                                        {following ? 'Unfollow' : 'Follow'}
                                    </button>
                                    <button className="button pc-button"> Message</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
                {location === 'profilePage' ? (
                    ''
                ) : (
                    <span>
                        {/* <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${user._id}`}>
                                My profile
                            </Link> */}
                    </span>
                )}
                <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                    <DialogTitle>Followers and Following</DialogTitle>
                    <DialogContent>
                        <FollowersModal />
                    </DialogContent>
                </Dialog>
                <Dialog open={dialogOpen1} onClose={handleDialog1Close} fullWidth maxWidth="sm">
                    {/* <DialogTitle>Profile Info</DialogTitle> */}
                    <DialogContent>
                        <InfoCard />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

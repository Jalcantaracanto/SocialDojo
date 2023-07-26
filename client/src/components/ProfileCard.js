// Styles
import '../styles/ProfileCard.css'
// React
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../services/user-service'
import { followUser, unfollowUser } from '../actions/userAction'
import FollowersModal from './FollowersModal'
import { InfoCard } from './InfoCard'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { ProfileModal } from './ProfileModal'

//MUI
import Avatar from '@mui/material/Avatar'

export const ProfileCard = ({ location }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER
    const posts = useSelector((state) => state.postReducer.posts)
    const params = useParams()

    const profileUserId = params.id
    const [profileUser, setProfileUser] = useState(null)

    //POPUP
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogOpen1, setDialogOpen1] = useState(false)

    const [modalOpen, setModalOpen] = useState(false)
    // console.log(modalOpen)

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

    const [following, setFollowing] = useState(user.followers.includes(user._id))

    const handleFollow = () => {
        profileUser._id && following ? dispatch(unfollowUser(profileUser._id, user)) : dispatch(followUser(profileUser._id, user))
        setFollowing((prev) => !prev)
    }

    const getUserFromService = () => {
        if (params['*'] === 'home') {
            setProfileUser(user)
        } else {
            getUser(profileUserId)
                .then((res) => {
                    setProfileUser(res.data)
                    setFollowing(res.data.followers.includes(user._id))
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        getUserFromService()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    if (params['*'] === 'home' || params.id === user._id) {
        return (
            <div className="ProfileCard">
                <>
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
                </>
                {location === 'profilePage' ? '' : <span>@{user.username}</span>}
                <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                    <DialogTitle>Followers and Following</DialogTitle>
                    <DialogContent>
                        <FollowersModal />
                    </DialogContent>
                </Dialog>
                <Dialog open={dialogOpen1} onClose={handleDialog1Close} fullWidth maxWidth="sm">
                    {/* <DialogTitle>Profile Info</DialogTitle> */}
                    <DialogContent>
                        <InfoCard setModalOpen={setModalOpen} handleDialog1Close={handleDialog1Close} />
                    </DialogContent>
                </Dialog>
                <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} data={user} />
            </div>
        )
    } else {
        return (
            <div className="ProfileCard">
                {profileUser && (
                    <>
                        <div className="ProfileImages">
                            <img src={profileUser.coverPicture ? serverUrl + profileUser.coverPicture : serverUrl + 'defaultCover.jpg'} alt="" />
                            {profileUser.firstname && profileUser.lastname && (
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
                                    src={profileUser.profilePicture ? serverUrl + profileUser.profilePicture : profileUser.firstname[0] + profileUser.lastname[0]}
                                >
                                    {profileUser.firstname[0] + profileUser.lastname[0]}
                                </Avatar>
                            )}
                        </div>
                        <div className="ProfileName">
                            <span>
                                {profileUser.firstname} {profileUser.lastname}
                            </span>
                            <span>{profileUser.worksAt ? profileUser.worksAt : 'Write about yourself'}</span>
                        </div>
                        <div className="followStatus">
                            <hr />
                            <div>
                                <div className="follow" onClick={handleFollowersClick} style={{ cursor: 'pointer' }}>
                                    <span>{profileUser.followings?.length}</span>
                                    <span>Followings</span>
                                </div>
                                <div className="vl"></div>
                                <div className="follow" onClick={handleFollowersClick} style={{ cursor: 'pointer' }}>
                                    <span>{profileUser.followers?.length}</span>
                                    <span>Followers</span>
                                </div>

                                <div className="vl"></div>
                                <div className="follow">
                                    <span>{posts.filter((posts) => posts.userId === profileUser._id).length}</span>
                                    <span>Post</span>
                                </div>
                            </div>
                            <hr />

                            <div>
                                <button className="button pc-button" onClick={handleInfoCLick}>
                                    Detail
                                </button>

                                <button className={following ? 'button pc-button UnfollowButton' : 'button pc-button'} onClick={handleFollow}>
                                    {following ? 'Unfollow' : 'Follow'}
                                </button>
                                {/* <FollowButton person= {profileUser}/> */}
                                <button className="button pc-button"> Message</button>
                            </div>
                            <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                                <DialogTitle>Followers and Following</DialogTitle>
                                <DialogContent>
                                    <FollowersModal data={profileUser}/>
                                </DialogContent>
                            </Dialog>
                            <Dialog open={dialogOpen1} onClose={handleDialog1Close} fullWidth maxWidth="sm">
                                {/* <DialogTitle>Profile Info</DialogTitle> */}
                                <DialogContent>
                                    <InfoCard setModalOpen={setModalOpen} handleDialog1Close={handleDialog1Close} />
                                </DialogContent>
                            </Dialog>
                            <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} data={user}  />
                        </div>
                    </>
                )}
            </div>
        )
    }
}

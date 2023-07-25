import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllUsers, getUser } from '../services/user-service'
import '../styles/FollowersCard.css'
import { List, ListItem, ListItemText, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const FollowersModal = () => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const [followingUsers, setFollowingUsers] = useState([])
    const [follower, setFollower] = useState([])
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER

    const getUsersFromFollowings = () => {
        const followingIds = user.followings

        Promise.all(followingIds.map((followingId) => getUser(followingId)))
            .then((responses) => {
                const followingData = responses.map((response) => response.data)
                setFollowingUsers(followingData)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getUsersfromFollowers = () => {
        const followersIds = user.followers

        Promise.all(followersIds.map((followerId) => getUser(followerId)))
            .then((responses) => {
                const followersData = responses.map((response) => response.data)
                setFollower(followersData)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getUsersFromFollowings()
        getUsersfromFollowers()
    }, [user])

    return (
        <div className="followerCard">
            <Typography variant="h5">Users you follow</Typography>
            <List>
                {followingUsers.map((following, id) => (
                    <ListItem key={id}>
                        <img src={following.profilePicture ? serverUrl + following.profilePicture : serverUrl + 'defaultProfile.png'} alt="" className="followerImage" />
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${following._id}`}>
                            <span>
                                {following.firstname} {following.lastname}
                            </span>
                        </Link>
                    </ListItem>
                ))}
            </List>

            <Typography variant="h5">Your Followers</Typography>
            <List>
                {follower.map((follower, id) => (
                    <ListItem key={id}>
                        <img src={follower.profilePicture ? serverUrl + follower.profilePicture : serverUrl + 'defaultProfile.png'} alt="" className="followerImage" />
                         <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${follower._id}`}>
                            <span>
                                {follower.firstname} {follower.lastname}
                            </span>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default FollowersModal

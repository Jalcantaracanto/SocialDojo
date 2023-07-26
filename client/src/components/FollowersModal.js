import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllUsers, getUser } from '../services/user-service'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

import '../styles/FollowersCard.css'

const FollowersModal = ({data}) => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const [followingUsers, setFollowingUsers] = useState([])
    const [follower, setFollower] = useState([])
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER

    const params = useParams()


    const getUsersFromFollowings = async () => {
        const followingIds = data.followings

        try {
            const responses = await Promise.all(followingIds.map((followingId) => getUser(followingId)))
            const followingData = responses.map((response) => response.data)
            setFollowingUsers(followingData)
        } catch (error) {
            console.log(error)
        }
    }

    const getUsersFromFollowers = async () => {
        const followersIds = data.followers

        try {
            const responses = await Promise.all(followersIds.map((followerId) => getUser(followerId)))
            const followersData = responses.map((response) => response.data)
            setFollower(followersData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsersFromFollowings()
        getUsersFromFollowers()
    }, [user])

    return (
        <div className="followerCard">
            <Typography variant="h5" gutterBottom>
                Following
            </Typography>
            <List>
                {followingUsers.map((following) => (
                    <ListItem key={following._id}>
                        <ListItemAvatar>
                            <Avatar alt={`${following.firstname} ${following.lastname}`} src={following.profilePicture ? serverUrl + following.profilePicture : serverUrl + 'defaultProfile.png'} />
                        </ListItemAvatar>
                        <ListItemText primary={`${following.firstname} ${following.lastname}`} />
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${following._id}`}>
                            View Profile
                        </Link>
                    </ListItem>
                ))}
            </List>

            <Typography variant="h5" gutterBottom>
                Followers
            </Typography>
            <List>
                {follower.map((follower) => (
                    <ListItem key={follower._id}>
                        <ListItemAvatar>
                            <Avatar alt={`${follower.firstname} ${follower.lastname}`} src={follower.profilePicture ? serverUrl + follower.profilePicture : serverUrl + 'defaultProfile.png'} />
                        </ListItemAvatar>
                        <ListItemText primary={`${follower.firstname} ${follower.lastname}`} />
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${follower._id}`}>
                            View Profile
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default FollowersModal

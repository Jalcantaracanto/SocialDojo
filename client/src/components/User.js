import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../actions/userAction'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'

export const User = ({ person }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER
    const [following, setfollowing] = useState(person.followers.includes(user._id))

    // console.log(following)

    const handleFollow = () => {
        following ? dispatch(unfollowUser(person._id, user)) : dispatch(followUser(person._id, user))
        setfollowing((prev) => !prev)
    }

    console.log(person)
    return (
        <div className="follower">
            <div>
                {/* <img src={person.profilePicture ? serverUrl + person.profilePicture : serverUrl + 'defaultProfile.png'} alt="" className="followerImage" /> */}
                <Avatar sx={{ width: '3rem', height: '3rem' }} alt="Avatar" src={person.profilePicture ? serverUrl + person.profilePicture : serverUrl + person.firstname[0] + person.lastname[0]}>
                    {person && person.firstname[0].toUpperCase() + person.lastname[0].toUpperCase()}
                </Avatar>
                <div className="name">
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${person._id}`}>
                        <span>
                            {person.firstname} {person.lastname}
                        </span>
                    </Link>
                    { person.username !== null ? <span>@{person.username}</span> :  <span></span>}
                </div>
            </div>
            <button className={following ? 'button fc-button UnfollowButton' : 'button fc-button'} onClick={handleFollow}>
                {following ? 'Unfollow' : 'Follow'}
            </button>
            {/* <FollowButton person={person}/> */}
        </div>
    )
}

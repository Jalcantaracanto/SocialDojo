import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../actions/userAction'
import { Link } from 'react-router-dom'

export const User = ({ person }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER
    const [following, setfollowing] = useState(person.followers.includes(user._id))

    const handleFollow = () => {
        following ? dispatch(unfollowUser(person._id, user)) : dispatch(followUser(person._id, user))
        setfollowing((prev) => !prev)
    }
    return (
        <div className="follower">
            <div>
                <img src={person.profilePicture ? serverUrl + person.profilePicture : serverUrl + 'defaultProfile.png'} alt="" className="followerImage" />
                <div className="name">
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${person._id}`}>
                        <span>
                            {person.firstname} {person.lastname}
                        </span>
                    </Link>
                    <span>@{person.username}</span>
                </div>
            </div>
            <button className={following ? 'button fc-button UnfollowButton' : 'button fc-button'} onClick={handleFollow}>
                {following ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    )
}

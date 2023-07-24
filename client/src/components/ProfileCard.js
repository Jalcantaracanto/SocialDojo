// Styles
import '../styles/ProfileCard.css'
// React
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../services/user-service'
import { followUser, unfollowUser } from '../actions/userAction'

export const ProfileCard = ({ location }) => {
    const dispatch = useDispatch()
    const [profile, setProfile] = useState([])
    const { user } = useSelector((state) => state.authReducer.authData)
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER
    const posts = useSelector((state) => state.postReducer.posts)
    const params = useParams()
    let data = {}

    const [following, setfollowing] = useState(profile?.followers?.includes(user._id))

    const handleFollow = () => {
        following ? dispatch(unfollowUser(profile._id, user)) : dispatch(followUser(profile._id, user))
        setfollowing((prev) => !prev)
    }

    const getUsersService = () => {
        getUser(params.id)
            .then((response) => {
                setProfile(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    if (location === 'profilePage') {
        data = profile
    } else {
        data = user
    }


    useEffect(() => {
        getUsersService()
    }, [params.id, location, user])

    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={data.coverPicture ? serverUrl + data.coverPicture : serverUrl + 'defaultCover.jpg'} alt="" />
                <img src={data.profilePicture ? serverUrl + data.profilePicture : serverUrl + 'defaultProfile.png'} alt="" />
            </div>

            <div className="ProfileName">
                <span>
                    {data.firstname} {data.lastname}
                </span>
                <span>{data.worksAt ? data.worksAt : 'Write about yourself'}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{data.followings?.length}</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{data.followers?.length}</span>
                        <span>Followers</span>
                    </div>
                    {location === 'profilePage' && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{posts.filter((posts) => posts.userId === data._id).length}</span>
                                <span>Post</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
                {location === 'profilePage' && (
                    <div>
                        <button className="button pc-button"> Detalle</button>
                        {user._id !== data._id && (
                            <>
                                <button className="button pc-button" onClick={handleFollow}> {data.followers?.includes(user._id) ? 'Unfollow' : 'Follow'}</button>
                                <button className="button pc-button"> Mensaje</button>
                            </>
                        )}
                    </div>
                )}
            </div>
            {location === 'profilePage' ? (
                ''
            ) : (
                <span>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${user._id}`}>
                        My profile
                    </Link>
                </span>
            )}
        </div>
    )
}

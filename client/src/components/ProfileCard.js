import React from 'react'
import { Link } from 'react-router-dom'
// Styles
import '../styles/ProfileCard.css'
import { useSelector } from 'react-redux'

export const ProfileCard = ({ location }) => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER
    const posts = useSelector((state) => state.postReducer.posts)

    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={user.coverPicture ? serverUrl + user.coverPicture : serverUrl + 'defaultCover.jpg'} alt="" />
                <img src={user.profilePicture ? serverUrl + user.profilePicture : serverUrl + 'defaultProfile.png'} alt="" />
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
                    <div className="follow">
                        <span>{user.followings.length}</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user.followers.length}</span>
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

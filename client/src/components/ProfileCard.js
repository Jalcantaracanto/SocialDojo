import React from 'react'
import Cover from '../assets/cover.jpg'
import Profile from '../assets/profileImg.jpg'
// Styles
import '../styles/ProfileCard.css'

export const ProfileCard = () => {
    const profilePage = true

    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={Cover} alt="" />
                <img src={Profile} alt="" />
            </div>

            <div className="ProfileName">
                <span>Persona X</span>
                <span>Trainee Full Stack</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>6.890</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>1</span>
                        <span>Followers</span>
                    </div>

                    {profilePage && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>3</span>
                                <span>Post</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            <span>My Profile</span>
        </div>
    )
}

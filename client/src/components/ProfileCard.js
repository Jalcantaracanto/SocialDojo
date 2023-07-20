import React from 'react'
import '../styles/ProfileCard.css'
import Cover from '../assets/cover.jpg'
import Profile from '../assets/profileImg.jpg'

export const ProfileCard = () => {
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
                </div>
                <hr />
            </div>
        </div>
    )
}

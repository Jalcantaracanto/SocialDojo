import React from 'react'
import { ProfileLeft } from '../components/ProfileLeft'
import { ProfileCard } from '../components/ProfileCard'
import { PostSide } from '../components/PostSide'
import { RightSide } from '../components/RightSide'

import '../styles/Profile.css'
import { NavBar } from '../components/NavBar'

export const Profile = () => {
    return (
        <>
            <NavBar />
            <div className="Profile">
                <ProfileLeft />
                <div className="Profile-center">
                    <ProfileCard location="profilePage" />
                    <PostSide />
                </div>
                <RightSide />
            </div>
        </>
    )
}

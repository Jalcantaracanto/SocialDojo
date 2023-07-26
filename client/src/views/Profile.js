import React from 'react'
import { ProfileLeft } from '../components/ProfileLeft'
import { ProfileCard } from '../components/ProfileCard'
import { PostSide } from '../components/PostSide'

import '../styles/Profile.css'
import { NavBar } from '../components/NavBar'
import { ProfileRight } from '../components/ProfileRight'

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
                <ProfileRight />
            </div>
        </>
    )
}

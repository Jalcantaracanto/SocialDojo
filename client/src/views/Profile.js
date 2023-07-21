import React from 'react'
import { ProfileLeft } from '../components/ProfileLeft'
import { ProfileCard } from '../components/ProfileCard'
import { PostSide } from '../components/PostSide'
import { RightSide } from '../components/RightSide'

import '../styles/Profile.css'

export const Profile = () => {
    return (
        <div className="Profile">
            <ProfileLeft />
            <div className="Profile-center">
                <ProfileCard />
                <PostSide />
            </div>
            <RightSide />
        </div>
    )
}

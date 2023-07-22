import React from 'react'
import { LogoSearch } from './LogoSearch'
import { ProfileCard } from './ProfileCard'
// Styles
import '../styles/ProfileSide.css'
import { FollowersCard } from './FollowersCard'

export const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            <LogoSearch />
            <ProfileCard location="homepage" />
            <FollowersCard />
        </div>
    )
}

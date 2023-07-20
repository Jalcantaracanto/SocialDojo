import React from 'react'
import { LogoSearch } from './LogoSearch'
import { ProfileCard } from './ProfileCard'
import '../styles/ProfileSide.css'

export const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            <LogoSearch />
            <ProfileCard />
        </div>
    )
}

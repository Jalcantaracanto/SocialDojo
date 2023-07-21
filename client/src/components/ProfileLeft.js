import React from 'react'
import '../styles/ProfileSide.css'
import { LogoSearch } from './LogoSearch'
import { FollowersCard } from './FollowersCard'
import { InfoCard } from './InfoCard'

export const ProfileLeft = () => {
    return (
        <div className="ProfileSide">
            <LogoSearch />
            <InfoCard />
            <FollowersCard />
        </div>
    )
}

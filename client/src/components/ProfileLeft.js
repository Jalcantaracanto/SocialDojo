import React from 'react'
import '../styles/ProfileSide.css'
import { FollowersCard } from './FollowersCard'

export const ProfileLeft = ({following, setfollowing}) => {
    return (
        <div className="ProfileSide">
            <FollowersCard following={following} setfollowing={setfollowing}/>
        </div>
    )
}

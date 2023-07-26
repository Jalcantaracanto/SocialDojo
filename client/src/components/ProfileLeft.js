import React from 'react'
import '../styles/ProfileSide.css'
import { FollowersCard } from './FollowersCard'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const ProfileLeft = () => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const params = useParams()

    return <div className="ProfileSide">{params['*'] === 'home' || params.id === user._id ? <FollowersCard /> : null}</div>
}

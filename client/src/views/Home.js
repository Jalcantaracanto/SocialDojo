import React from 'react'
import '../styles/Home.css'
import { ProfileSide } from '../components/ProfileSide'
import { PostSide } from '../components/PostSide'
import { RightSide } from '../components/RightSide'

export const Home = () => {
    return (
        <div className="Home">
            <ProfileSide />
            <PostSide />
            <RightSide />
        </div>
    )
}

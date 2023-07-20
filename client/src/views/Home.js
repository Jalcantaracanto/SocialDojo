import React from 'react'
import '../styles/Home.css'
import { ProfileSide } from '../components/ProfileSide'

export const Home = () => {
    return (
        <div className="Home">
            <div className="profileSide">
                <ProfileSide />
            </div>
            <div className="postSide"></div>
            <div className="rightSide"></div>
        </div>
    )
}

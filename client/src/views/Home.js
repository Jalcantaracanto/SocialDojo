import React from 'react'
import '../styles/Home.css'
import { ProfileSide } from '../components/ProfileSide'
import { PostSide } from '../components/PostSide'
import { RightSide } from '../components/RightSide'
import { NavBar } from '../components/NavBar'

export const Home = () => {
    return (
        <>
            <NavBar />
            <div className="Home">
                <ProfileSide />
                <PostSide />
                <RightSide />
            </div>
        </>
    )
}

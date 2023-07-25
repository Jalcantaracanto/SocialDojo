import React, {useState} from 'react'
import { ProfileLeft } from '../components/ProfileLeft'
import { ProfileCard } from '../components/ProfileCard'
import { PostSide } from '../components/PostSide'

import '../styles/Profile.css'
import { NavBar } from '../components/NavBar'
import { ProfileRight } from '../components/ProfileRight'
import { useSelector } from 'react-redux'

export const Profile = () => {
    const {user} = useSelector (state => state.authReducer.authData)
    const [following, setfollowing] = useState(user?.followers?.includes(user._id))

    return (
        <>
            <NavBar />
            <div className="Profile">
                <ProfileLeft following={following} setfollowing={setfollowing}/>
                <div className="Profile-center">
                    <ProfileCard location="profilePage" following={following} setfollowing={setfollowing}/>
                    <PostSide />
                </div>
                <ProfileRight />
            </div>
        </>
    )
}

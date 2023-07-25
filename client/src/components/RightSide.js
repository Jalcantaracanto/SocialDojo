import React, { useState } from 'react'
import Home from '../assets/home.png'
import Noti from '../assets/noti.png'
import Comment from '../assets/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'

//styles
import '../styles/RightSide.css'
// import { TrendCard } from './TrendCard'
// import { ShareModal } from './ShareModal'
// import { NavIcons } from './NavIcons'
import { ProfileCard } from './ProfileCard'

export const RightSide = ({ location }) => {
    // const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="RightSide">
            <ProfileCard location="home" />
            {/* <NavIcons/> */}
            {/* <TrendCard /> */}

            {/* <button className="button r-button" onClick={() => setModalOpen(true)}>
                Share
            </button> */}
            {/* <ShareModal modalOpen={modalOpen} setModalOpen={setModalOpen} /> */}
        </div>
    )
}

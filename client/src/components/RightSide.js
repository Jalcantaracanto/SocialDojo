import React, { useState } from 'react'
import Home from '../assets/home.png'
import Noti from '../assets/noti.png'
import Comment from '../assets/comment.png'
import { UilSetting } from '@iconscout/react-unicons'

//styles
import '../styles/RightSide.css'
import { TrendCard } from './TrendCard'
import { ShareModal } from './ShareModal'

export const RightSide = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="RightSide">
            <div className="navIcons">
                <img src={Home} alt="" />
                <UilSetting />
                <img src={Noti} alt="" />
                <img src={Comment} alt="" />
            </div>
            <TrendCard />

            <button className="button r-button" onClick={() => setModalOpen(true)}>
                Share
            </button>
            <ShareModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    )
}

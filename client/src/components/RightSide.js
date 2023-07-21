import React from 'react'
import Home from '../assets/home.png'
import Noti from '../assets/noti.png'
import Comment from '../assets/comment.png'
import { UilSetting } from '@iconscout/react-unicons'

//styles
import '../styles/RightSide.css'
import { TrendCard } from './TrendCard'

export const RightSide = () => {
    return (
        <div className="RightSide">
            <div className="navIcons">
                <img src={Home} alt="" />
                <UilSetting />
                <img src={Noti} alt="" />
                <img src={Comment} alt="" />
            </div>
            <TrendCard />

            <button className="button r-button">Share</button>
        </div>
    )
}

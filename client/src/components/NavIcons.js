import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../assets/home.png'
import Noti from '../assets/noti.png'
import Comment from '../assets/comment.png'
import { UilSetting } from '@iconscout/react-unicons'

export const NavIcons = () => {
    return (
        <div className="navIcons">
            <Link to="../home">
                <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="../chat">
                <img src={Comment} alt="" />
            </Link>
        </div>
    )
}

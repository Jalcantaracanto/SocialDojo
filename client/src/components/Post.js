import React from 'react'
import Comment from '../assets/comment.png'
import Share from '../assets/share.png'
import Heart from '../assets/like.png'
import NotLike from '../assets/notlike.png'

//styles
import '../styles/Post.css'

export const Post = ({ data }) => {
    return (
        <div className="Post">
            <img src={data.img} alt="" />
            <div className="postReact">
                <img src={data.liked ? Heart : NotLike} alt="" />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>

            <span style={{ color: 'var(--gray)', fontSize: '13' }}>{data.likes} likes</span>
            <div className="detail">
                <span>
                    <b>{data.name}</b>
                </span>
                <span>{data.desc}</span>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import Comment from '../assets/comment.png'
import Share from '../assets/share.png'
import Heart from '../assets/like.png'
import NotLike from '../assets/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../services/post-service'
import { format } from 'timeago.js'

//styles
import '../styles/Post.css'

export const Post = ({ data }) => {
    const { user } = useSelector((state) => state.authReducer.authData)
    // const [liked, setLiked] = useState(data.likes.includes(user._id))
    const [liked, setLiked] = useState(data.likes && data.likes.includes(user._id))
    // const [likes, setLikes] = useState(data.likes.length)
    const [likes, setLikes] = useState(data.likes ? data.likes.length : 0)

    // console.log(data)

    const handleLike = () => {
        setLiked((prev) => !prev)
        likePost(data._id, user._id)
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
    }

    return (
        <div className="Post">
            <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''} alt="" />
            <div className="postReact">
                <img src={liked ? Heart : NotLike} alt="" style={{ cursor: 'pointer' }} onClick={handleLike} />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>

            <span style={{ color: 'var(--gray)', fontSize: '13' }}>{likes} likes</span>
            <div className="detail">
                <span>
                    <b>{data.name}</b>
                </span>
                <span>{data.description}</span>
                <div className="post-time">
                    <span >{format(data.createdAt)}</span>
                </div>
            </div>
        </div>
    )
}

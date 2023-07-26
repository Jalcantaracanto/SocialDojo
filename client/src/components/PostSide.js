import React from 'react'
import { PostShare } from './PostShare'

//styles
import '../styles/PostSide.css'
import { Posts } from './Posts'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const PostSide = () => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const params = useParams()
    return (
        <div className="PostSide">
            {params['*'] === 'home' || params.id === user._id ? <PostShare /> : null}
            <Posts />
        </div>
    )
}

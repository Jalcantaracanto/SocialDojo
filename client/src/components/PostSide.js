import React from 'react'
import { PostShare } from './PostShare'

//styles
import '../styles/PostSide.css'
import { Posts } from './Posts'

export const PostSide = () => {
    return (
        <div className="PostSide">
            <PostShare />
            <Posts />
        </div>
    )
}

import React from 'react'
import { PostsData } from '../data/PostData'
import { Post } from './Post'
//styles
import '../styles/Posts.css'

export const Posts = () => {
    return (
        <div className="Post">
            {PostsData.map((post, id) => {
                return <Post data={post} id={id} />
            })}
        </div>
    )
}

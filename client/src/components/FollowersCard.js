import React from 'react'
import { Followers } from '../data/FollowersData'

//styles
import '../styles/FollowersCard.css'

export const FollowersCard = () => {
    return (
        <div className="FollowersCard">
            <h3>Who is following you</h3>
            {Followers.map((follower, id) => {
                return (
                    <div className="follower">
                        <div>
                            <img src={follower.img} alt="" className="followerImage" />
                            <div className="name">
                                <span>{follower.name}</span>
                                <span>{follower.username}</span>
                            </div>
                        </div>
                        <button className="button fc-button">Follow</button>
                    </div>
                )
            })}
        </div>
    )
}

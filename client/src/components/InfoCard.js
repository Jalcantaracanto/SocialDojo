import React, { useEffect, useState } from 'react'
import '../styles/InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import { ProfileModal } from './ProfileModal'
import {  useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../services/user-service'

export const InfoCard = () => {
    const [modalOpen, setModalOpen] = useState(false)

    const params = useParams()
    const profileUserId = params.id
    const [profileUser, setProfileUser] = useState({})
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER

    const { user } = useSelector((state) => state.authReducer.authData)

    //console.log(params)
    //console.log(profileUserId)
    // console.log(user._id)

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                setProfileUser(user)
            } else {
                const profileUser = await UserApi.getUser(profileUserId)
                setProfileUser(profileUser)
            }
        }
        fetchProfileUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <div className="InfoCard">
            <div className="infoHead">
                <h4>Profile Info</h4>
                {user._id === profileUserId ? (
                    <div>
                        <UilPen width="2rem" height="1.2rem" onClick={() => setModalOpen(true)} />
                        <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} data={user} />
                    </div>
                ) : (
                    'Nothing'
                )}
            </div>
            <img src={profileUser.profilePicture ? serverUrl + profileUser.profilePicture : serverUrl + 'defaultProfile.png'} alt="" className="followerImage" />

            <div className="info">
                <span>Name: </span>
                <span>
                    {profileUser.firstname} {profileUser.lastname}{' '}
                </span>
            </div>
            <div className="info">
                <span>Email: </span>
                <span>{profileUser.email} </span>
            </div>
            <div className="info">
                <span>Status: </span>
                <span>{profileUser.relationship}</span>
            </div>
            <div className="info">
                <span>Lives in: </span>
                <span>{profileUser.city}</span>
            </div>
            <div className="info">
                <span>About: </span>
                <span>{profileUser.about}</span>
            </div>
            <div className="info">
                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{profileUser.followings?.length}</span>
                <span style={{ marginLeft: '5px' }}>Followed Users</span>
            </div>
            <div className="vl" style={{ height: '1px', backgroundColor: '#000', margin: '10px 0' }}></div>
            <div className="info">
                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{profileUser.followers?.length}</span>
                <span style={{ marginLeft: '5px' }}>Followers</span>
            </div>
            {/* <button className="button logout-button" onClick={handleLogout}>
                Logout
            </button> */}
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import '../styles/InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import { ProfileModal } from './ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../services/user-service'
import { logout } from '../actions/AuthAction'

export const InfoCard = () => {
    const [modalOpen, setModalOpen] = useState(false)

    const dispatch = useDispatch()
    const params = useParams()
    const profileUserId = params.id
    const [profileUser, setProfileUser] = useState({})

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
    }, [user])

    const handleLogout = () => {
        dispatch(logout())
        console.log("logout")
    }

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
            <div className="info">
                <span>Status </span>
                <span>{profileUser.relationship}</span>
            </div>
            <div className="info">
                <span>lives in </span>
                <span>{profileUser.city}</span>
            </div>
            <div className="info">
                <span>Works at </span>
                <span>{profileUser.about}</span>
            </div>
            <button className="button logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

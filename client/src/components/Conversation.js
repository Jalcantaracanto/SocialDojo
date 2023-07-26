import React, { useState, useEffect } from 'react'
import { getUser } from '../services/user-service'
import { useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar'

export const Conversation = ({ chat, currentUser, online }) => {
    const [userData, setUserData] = useState(null)
    const dispatch = useDispatch()
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER
    // console.log(chat)

    useEffect(() => {
        const userId = chat.members.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
                dispatch({ type: 'SAVE_USER', data: data })
            } catch (error) {
                console.error(error)
            }
        }
        getUserData()
    }, [])

    return (
        <>
            <div className="follower conversation">
                <div>
                    {online && <div className="online-dot"></div>}
                    {/* <img src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'} alt="Profile" className="followerImage" style={{ width: '50px', height: '50px' }} /> */}
                    {userData && (
                        <Avatar style={{ width: '3rem', height: '3rem' }} alt="Avatar" src={userData.profilePicture ? serverUrl + userData.profilePicture : serverUrl + userData.firstname[0] + userData.lastname[0]}>
                            {userData.firstname[0].toUpperCase() + userData.lastname[0].toUpperCase()}
                        </Avatar>
                    )}

                    
                    <div className="name" style={{ fontSize: '0.8rem' }}>
                        <span>
                            {userData?.firstname} {userData?.lastname}
                        </span>
                        <span style={{ color: online ? '#51e200' : '' }}>{online ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
        </>
    )
}

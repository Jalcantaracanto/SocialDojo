import React, { useState } from 'react'
import '../styles/InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import { ProfileModal } from './ProfileModal'

export const InfoCard = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="InfoCard">
            <div className="infoHead">
                <h4>Your Info</h4>
                <div>
                    <UilPen width="2rem" height="1.2rem" onClick={() => setModalOpen(true)} />
                    <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
                </div>
            </div>
            <div className="info">
                <span>Status </span>
                <span>in Relationship</span>
            </div>
            <div className="info">
                <span>lives in </span>
                <span>Multan</span>
            </div>
            <div className="info">
                <span>Works at </span>
                <span>home office</span>
            </div>
            <button className="button logout-button">Logout</button>
        </div>
    )
}

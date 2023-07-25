/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { User } from './User'

//styles
import '../styles/FollowersCard.css'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../services/user-service'

export const FollowersCard = ({ following, setfollowing }) => {
    const [persons, setPersons] = useState([])
    const { user } = useSelector((state) => state.authReducer.authData)

    useEffect(() => {
        const fetchPersons = async () => {
            const { data } = await getAllUsers()
            setPersons(data)
        }
        fetchPersons()
    }, [])

    return (
        <div className="FollowersCard">
            <h3>People you may know</h3>
            {persons.map((person, id) => {
                if (person._id !== user._id) {
                    return <User key={id} person={person} following={following} setfollowing={setfollowing} />
                }
            })}
        </div>
    )
}

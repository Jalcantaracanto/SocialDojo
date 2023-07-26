import React, { useState } from 'react'
import { Modal, useMantineTheme } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { uploadImage } from '../actions/uploadAction'
import { updateUser } from '../actions/userAction'

export const ProfileModal = ({ modalOpen, setModalOpen, data }) => {
    const theme = useMantineTheme()
    const { password, ...rest } = data
    const [formData, setFormData] = useState(rest)
    const [profileImage, setProfileImage] = useState(null)
    const [coverImage, setCoverImage] = useState(null)
    const dispatch = useDispatch()
    const params = useParams()
    const { user } = useSelector((state) => state.authReducer.authData)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
            event.target.name === 'profilePicture' ? setProfileImage(img) : setCoverImage(img)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let UserData = formData
        if (profileImage) {
            const data = new FormData()
            const fileName = Date.now() + profileImage.name
            data.append('name', fileName)
            data.append('file', profileImage)
            UserData.profilePicture = fileName
            console.log(UserData.profilePicture)
            try {
                dispatch(uploadImage(data))
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }
        if (coverImage) {
            const data = new FormData()
            const fileName = Date.now() + coverImage.name
            data.append('name', fileName)
            data.append('file', coverImage)
            UserData.coverPicture = fileName
            try {
                dispatch(uploadImage(data))
            } catch (err) {
                console.log(err)
            }
        }
        dispatch(updateUser(params.id, UserData))
        setModalOpen(false)
    }

    return (
        <>
            <Modal
                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}
                size="50%"
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <form className="infoForm">
                    <h3>Your info</h3>
                    <div>
                        <input type="text" className="infoInput" name="firstname" placeholder="First Name" onChange={handleChange} value={formData.firstname} />
                        <input type="text" className="infoInput" name="lastname" placeholder="Last Name" onChange={handleChange} value={formData.lastname} />
                    </div>
                    <div>
                        <input type="text" className="infoInput" name="about" placeholder="about" onChange={handleChange} value={formData.about} />
                    </div>
                    <div>
                        <input type="text" className="infoInput" name="username" placeholder="username" onChange={handleChange} value={formData.username} />
                    </div>
                    <div>
                        <input type="text" className="infoInput" name="from" placeholder="From" onChange={handleChange} value={formData.from} />
                        <input type="text" className="infoInput" name="city" placeholder="City" onChange={handleChange} value={formData.city} />
                    </div>
                    <div>
                        <input type="text" className="infoInput" name="relationship" placeholder="RelationShip Status" onChange={handleChange} />
                    </div>
                    <div>
                        Profile Image
                        <input type="file" name="profilePicture" onChange={onImageChange} />
                        Cover Image
                        <input type="file" name="coverPicture" onChange={onImageChange} />
                    </div>
                    <button className="button infoButton" onClick={handleSubmit}>
                        Update
                    </button>
                </form>
            </Modal>
        </>
    )
}





import React, { useState, useRef } from 'react'
import ProfileImage from '../assets/profileImg.jpg'
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../actions/postAction'
import Avatar from '@mui/material/Avatar'

//styles
import '../styles/PostShare.css'
import { uploadImage, uploadPost } from '../actions/uploadAction'

export const PostShare = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const loading = useSelector((state) => state.postReducer.uploading)
    const serverUrl = process.env.REACT_APP_PUBLIC_FOLDER
    const imageRef = useRef()
    const [image, setImage] = useState(null)
    const description = useRef()

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            //setImage(URL.createObjectURL(event.target.files[0]))

            let img = event.target.files[0]
            setImage(img)
        }
    }

    const reset = () => {
        setImage(null)
        description.current.value = ''
    }

    const handleUpload = (e) => {
        e.preventDefault()

        const newPost = {
            userId: user._id,
            description: description.current.value,
        }
        if (image) {
            const data = new FormData()
            const filename = Date.now() + image.name
            data.append('name', filename)
            data.append('file', image)
            newPost.image = filename
            console.log(newPost)
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        // dispatch(uploadPost(newPost))
        // reset()
        dispatch(uploadPost(newPost))
            .then(() => {
                dispatch(getTimelinePosts(user._id))
                reset()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="PostShare">
            {/* <img src={user.profilePicture ? serverUrl + user.profilePicture : serverUrl + 'defaultProfile.png'} alt="" /> */}
            <Avatar style={{width: "3rem", height: "3rem"}} alt="Avatar" src={user.profilePicture ? serverUrl + user.profilePicture : serverUrl + user.firstname[0] + user.lastname[0]}>
                {user.firstname[0].toUpperCase() + user.lastname[0].toUpperCase()}
            </Avatar>
            <div>
                <input type="text" placeholder="What's happening?" ref={description} />
                <div className="postOptions">
                    <div className="option" style={{ color: 'var(--photo)' }} onClick={() => imageRef.current.click()}>
                        <UilScenery />
                        Photo
                    </div>
                    {/* <div className="option" style={{ color: 'var(--video)' }}>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="option" style={{ color: 'var(--location)' }}>
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className="option" style={{ color: 'var(--schedule)' }}>
                        <UilSchedule />
                        Schedule
                    </div> */}
                    <button className="button ps-button" onClick={handleUpload} disabled={loading}>
                        {loading ? 'Uploading...' : 'Share'}
                    </button>
                    <div style={{ display: 'none' }}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}
            </div>
        </div>
    )
}

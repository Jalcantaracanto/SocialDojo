import React, { useState, useEffect, useRef } from 'react'
import '../styles/ChatBox.css'
import { getUser } from '../services/user-service'
import { getMessages } from '../services/message-service'
import InputEmoji from 'react-input-emoji'
import { format } from 'timeago.js'
import { addMessage } from '../services/message-service'

export const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const scroll = useRef()

    useEffect(() => {
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage])
        }
    }, [receivedMessage])

    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        console.log(userId)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.log(error)
            }
        }

        if (chat !== null) getUserData()
    }, [chat, currentUser])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id)
                setMessages(data)
            } catch (error) {
                console.log(error)
            }
        }

        if (chat !== null) fetchMessages()
    }, [chat])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    // Send Message
    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        const receiverId = chat.members.find((id) => id !== currentUser)
        // send message to socket server
        setSendMessage({ ...message, receiverId })
        // send message to database
        try {
            const { data } = await addMessage(message)
            setMessages([...messages, data])
            setNewMessage('')
        } catch {
            console.log('error')
        }
    }

    // Always scroll to last Message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        {/* chat-header */}
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    <img src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'} alt="Profile" className="followerImage" style={{ width: '50px', height: '50px' }} />
                                    <div className="name" style={{ fontSize: '0.9rem' }}>
                                        <span>
                                            {userData?.firstname} {userData?.lastname}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr
                                style={{
                                    width: '95%',
                                    border: '0.1px solid #ececec',
                                    marginTop: '20px',
                                }}
                            />
                        </div>
                        {/* chat-body */}
                        <div className="chat-body">
                            {messages.map((message, id) => (
                                <>
                                    <div ref={scroll} className={message.senderId === currentUser ? 'message own' : 'message'} key={id}>
                                        <span>{message.text}</span> <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                        {/* chat-sender */}
                        <div className="chat-sender">
                            <div /*onClick={() => imageRef.current.click()}*/>+</div>
                            <InputEmoji value={newMessage} onChange={handleChange} />
                            <div className="send-button button" onClick={handleSend}>
                                Send
                            </div>
                            <input type="file" name="" id="" style={{ display: 'none' }} /*ref={imageRef}*/ />
                        </div>{' '}
                    </>
                ) : (
                    <span className="chatbox-empty-message">Tap on a chat to start conversation...</span>
                )}
            </div>
        </>
    )
}

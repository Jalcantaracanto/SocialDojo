import React, { useEffect, useRef, useState } from 'react'
import '../styles/Chat.css'
import { useSelector } from 'react-redux'
import { userChats } from '../services/chat-service'
import { Conversation } from '../components/Conversation'
import { ChatBox } from '../components/ChatBox'
import { io } from 'socket.io-client'
import { LogoSearch } from '../components/LogoSearch'
import { NavIcons } from '../components/NavIcons'
import { NavBar } from '../components/NavBar'

export const Chat = () => {
    const socket = useRef()
    const { user } = useSelector((state) => state.authReducer.authData)

    const [chats, setChats] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [sendMessage, setSendMessage] = useState(null)
    const [receivedMessage, setReceivedMessage] = useState(null)
    // Get the chat in chat section
    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id)
                setChats(data)
            } catch (error) {
                console.log(error)
            }
        }
        getChats()
    }, [user._id])

    // Connect to Socket.io
    useEffect(() => {
        socket.current = io(':8080')
        socket.current.emit('new-user-add', user._id)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users)
        })
    }, [user])

    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    // Get the message from socket server
    useEffect(() => {
        socket.current.on('recieve-message', (data) => {
            console.log(data)
            setReceivedMessage(data)
        })
    }, [])

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id)
        const online = onlineUsers.find((user) => user.userId === chatMember)
        return online ? true : false
    }

    return (
        <>
            <NavBar/>
            <div className="Chat">
                {/* Left Side */}
                <div className="Left-side-chat">
                    {/* <LogoSearch /> */}
                    <div className="Chat-container">
                        <h2>Chats</h2>
                        <div className="Chat-list">
                            {chats.map((chat, id) => (
                                <div
                                    onClick={() => {
                                        setCurrentChat(chat)
                                    }}
                                    key={id}
                                >
                                    <Conversation chat={chat} currentUser={user._id} online={checkOnlineStatus(chat)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side */}

                <div className="Right-side-chat">
                    {/* <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
                        
                        <NavIcons />
                    </div> */}
                    <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receivedMessage={receivedMessage} />
                    {/* {currentChat ? (
                            <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receiveMessage={receivedMessage} />
                        ) : (
                            <p>No se ha seleccionado ninguna conversación.</p>
                        )} */}
                </div>
            </div>
        </>
    )
}

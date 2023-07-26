// SocketContext.js
import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const newSocket = io(':8080', { cors: true })
        setSocket(newSocket)

        // Cleanup: desconectar el socket al desmontar el contexto.
        return () => {
            newSocket.disconnect()
        }
    }, [])

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export { SocketProvider, SocketContext }

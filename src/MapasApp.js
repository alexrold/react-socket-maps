import React from 'react'
import { SocketProvider } from './context/SocketContext'
import { MapasPages } from './pages/MapasPages'

export const MapasApp = () => {
    return (
        <SocketProvider>
            <MapasPages />
        </SocketProvider>
    )
}

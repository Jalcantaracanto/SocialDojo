import React from 'react'
import { UilAnchor, UilSearch } from '@iconscout/react-unicons'
// Styles
import '../styles/LogoSearch.css'

export const LogoSearch = () => {
    return (
        <div className="LogoSearch">
            <UilAnchor size="40" />
            <div className="Search">
                <input type="text" placeholder="#Search" />
                <div className="s-icon">
                    <UilSearch />
                </div>
            </div>
        </div>
    )
}

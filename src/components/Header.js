import React from 'react'
import { Link } from 'react-router-dom'

function Header({ children }) {
    return (
        <header className='courses_header'>
            <Link to="/">
                <button className='dashboard_button home'>Home</button>
            </Link>
            {children}
            <Link to="/dashboard">
                <button className='dashboard_button dashboard'>Dashboard</button>
            </Link>
        </header>
    )
}

export default Header
import React from 'react'
import './Navigation.css'
import { NavLink } from 'react-router-dom'

export default function Navigation({ burger, toggleLogin }) {
	return (
		<div className={`navigation ${burger ? 'visible' : ''}`}>
			<NavLink to='/home'>Home</NavLink>
			<NavLink to='/contact'>Contact</NavLink>
			<NavLink to='/about'>About</NavLink>
			<button className='login' onClick={toggleLogin}>
				Login
			</button>
		</div>
	)
}

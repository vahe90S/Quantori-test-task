import React, { useEffect, useState } from 'react'
import './Header.css'
import Navigation from '../Navigation/Navigation'
import { Link, useLocation } from 'react-router-dom'
import Login from '../Login/Login'

export default function Header({ dispatch }) {
	const [burger, setBurger] = useState(false)
	const [openLogin, setOpenLogin] = useState(false)
const location=useLocation()
	const toggleBurger = () => {
		setBurger(prevState => !prevState)
	}
	const toggleLogin = () => {
		setOpenLogin(prevState => !prevState)
	}

	useEffect(() => {
		setOpenLogin(false)
		setBurger(false)
	}, [location])
	return (
		<header className='header'>
			<Link to='home'>
				<i className='icon-user-solid-circle logo' />
			</Link>
			<Navigation burger={burger} toggleLogin={toggleLogin} />
			<div className='burger' onClick={toggleBurger}>
				<span />
			</div>
			{openLogin && <Login setOpenLogin={setOpenLogin} dispatch={dispatch} />}
		</header>
	)
}

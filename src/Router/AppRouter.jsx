import React, { useEffect, useReducer } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout'
import HomePage from '../pages/HomePage/HomePage'
import Contact from '../pages/Contact/Contact'
import About from '../pages/About/About'
import UserProfile from '../pages/UserProfile/UserProfile'

export default function AppRouter() {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'setUsersData':
				return { ...state, users: action.payload.users }

			case 'checkUser':
				const foundUser = state.users.some(
					user =>
						user.email === action.payload.email &&
						user.password === action.payload.password
				)
				return { ...state, foundUser: foundUser }

			default:
				return state
		}
	}
	const [state, dispatch] = useReducer(reducer, { users: [], foundUser: null })
	const navigate = useNavigate()

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await fetch('https://dummyjson.com/users')
				const data = await res.json()
				dispatch({ type: 'setUsersData', payload: { users: data.users } })
				await fetch('http://localhost:8080/users', {
					method: 'POST',
					body: JSON.stringify(data),
				})

			} catch (error) {
				console.error('Something went wrong:', error)
			}
		}

		getUsers()
	}, [])

	useEffect(() => {
		const setFoundUser = async () => {
			if (state.foundUser) {
				await fetch('http://localhost:8080/foundUser', {
					method: 'POST',
					body: JSON.stringify({ foundUser: state.foundUser }),
				})
				navigate('/user-profile')
			} else if (state.foundUser === false) {
				alert('User not found')
			}
		}

		setFoundUser()
	}, [state.foundUser, navigate])

	return (
		<>
			<Routes>
				<Route path='/' element={<Layout dispatch={dispatch}/>}>
					<Route index element={<HomePage />} />
					<Route path='home' element={<HomePage />} />
					<Route path='contact' element={<Contact />} />
					<Route path='about' element={<About />} />
					<Route path='user-profile' element={<UserProfile />} />
				</Route>
			</Routes>
		</>
	)
}

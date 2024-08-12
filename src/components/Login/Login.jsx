import React from 'react'
import './Login.css'

export default function Login({ setOpenLogin, dispatch }) {
	const handleSubmit = e => {
		e.preventDefault()
		const {
			email: { value: email },
			password: { value: password },
		} = e.target

		if (!email || !password) {
			alert('Please fill out the form')
		} else {
			dispatch({ type: 'checkUser', payload: { email, password } })
		}
		e.target.reset()
	}

	return (
		<div className='container-login'>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div className='input-wrapper'>
					<span>Email</span>
					<input type='email' name='email' />
				</div>
				<div className='input-wrapper'>
					<span>Password</span>
					<input type='password' name='password' />
				</div>
				<div className='container-button'>
					<button onClick={() => setOpenLogin(false)}>Cancel</button>
					<button type='submit'>Login</button>
				</div>
			</form>
		</div>
	)
}

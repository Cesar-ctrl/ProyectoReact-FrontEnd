import React, { useState, useEffect } from 'react'
import Togglable from './Togglable.js'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import noteService from '../services/notes'

export default function LoginForm ({...props}) {

  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        email,
        password
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      
      noteService.setToken(user.token)
      
      
      setUser(user)
      setEmail('')
      setPassword('')
      setLoggedIn(true)

      
    } catch(e) {
      setErrorMessage('Email o contraseña inválidos')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  return (
    <Togglable buttonLabel='Show Login'>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={props.handlePasswordChange}
          />
        </div>
        <button id='form-login-button'>
          Login
        </button>
      </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string,

}
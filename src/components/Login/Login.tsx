import { useRef, useState, useEffect, ChangeEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import styles from './login.module.css'

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const errorRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userRef?.current) {
      userRef.current.focus()
    }
  }, [])

  useEffect(() => {
    setError('')
  }, [user, password])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      const authData = await login({ user, password }).unwrap()
      console.log('authData', authData);
      dispatch(setCredentials(authData))
      setUser('')
      setPassword('')
      navigate('/home')
    } catch (err: any) {
      console.log('login error', error)
      /**
       * TODO: Error handling
       * **/
      if (errorRef?.current) {
        errorRef.current.focus()
      }
    }
  }

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value)

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  return (
    <section className={styles.loginPage}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario: </label>
        <input type="text" id="username" onChange={handleUserInput} value={user} ref={userRef} required />
        <label htmlFor="password">Contraseña: </label>
        <input type="password" id="password" onChange={handlePasswordInput} value={password} required />
        <button>Iniciar sesión</button>
      </form>
    </section>
  )
}

export default Login
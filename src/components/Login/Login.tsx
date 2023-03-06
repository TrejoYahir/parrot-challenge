import { useRef, useState, useEffect, ChangeEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import Spinner from '../../shared/Spinner'
import styles from './login.module.css'
import userApiSlice from '../../features/user/userApiSlice'
import { setUser } from '../../features/user/userSlice'
import { setSelectedStoreId, setStores } from '../../features/store/storeSlice'

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch<any>()

  useEffect(() => {
    if (userRef?.current) {
      userRef.current.focus()
    }
  }, [])

  useEffect(() => {
    setError(null)
  }, [username, password])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      const authData = await login({ username, password }).unwrap()
      dispatch(setCredentials(authData))
      setUsername('')
      setPassword('')
      navigate('/home')
    } catch (err: any) {
      console.log('login error', err)
      if (err?.status === 401) {
        setError('Usuario o contraseña incorrecto, por favor revisa tus credenciales')
      } else if (err?.status === 500) {
        setError('Ocurrió un error en el servidor, por favor intenta de nuevo')
      } else {
        setError('Ocurrió un error, por favor intenta de nuevo')
      }
    }
  }

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  return (
    <section className={styles.loginPage}>
      <img src="https://pos.parrotsoftware.io/hubfs/parrot_connect_logo.svg" alt="ParrotConnectLogo" className={styles.loginLogo} />
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label htmlFor="username">Usuario: </label>
        <input type="text" id="username" onChange={handleUserInput} value={username} ref={userRef} required />
        <label htmlFor="password">Contraseña: </label>
        <input type="password" id="password" onChange={handlePasswordInput} value={password} required />
        { error && <span className={styles.loginFormError}>{error}</span> }
        <button disabled={isLoading}>
          <span>Iniciar sesión</span>
          <Spinner isLoading={isLoading} size={25} color="white" style={{ top:'8px', right:'10px' }} />
        </button>
      </form>
    </section>
  )
}

export default Login
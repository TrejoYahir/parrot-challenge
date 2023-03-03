import { useSelector } from 'react-redux'
import { selectAccessToken } from '../../features/auth/authSlice'
import styles from './home.module.css'

const Home = () => {
  const accessToken = useSelector(selectAccessToken)
  return (
    <div>{accessToken}</div>
  )
}

export default Home
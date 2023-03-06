import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedStoreId, setStores } from '../../features/store/storeSlice'
import { useGetUserQuery } from '../../features/user/userApiSlice'
import { setUser } from '../../features/user/userSlice'
import Header from '../../shared/Header'
import Spinner from '../../shared/Spinner'
import Store from '../Store'
import styles from './home.module.css'

const Home = () => {
  const dispatch = useDispatch()

  const {
    data: user,
    isLoading,
    isSuccess,
    isError: userHasError,
    error: userError,
  } = useGetUserQuery()

  useEffect(() => {
    if (isSuccess && user?.stores.length > 0) {
      dispatch(setStores(user.stores))
      dispatch(setSelectedStoreId(user.stores[0].uuid))
    }
  }, [user, isSuccess])

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser(user))
    }
  }, [user, isSuccess])

  return (
    <main>
      <Header />
      { 
        isLoading ?
          <Spinner color="var(--color-primary)" isLoading={true} size={40} style={{left: 'calc(50% - 20px)'}} /> :
          <Store />
      }
    </main>
  )
}

export default Home
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { appLogOut } from '../../features/auth/auth'
import { setSelectedStoreId, setStores } from '../../features/store/storeSlice'
import { useGetUserQuery } from '../../features/user/userApiSlice'
import { setUser } from '../../features/user/userSlice'
import Header from '../../shared/Header'
import Spinner from '../../shared/Spinner'
import Store from '../Store'
import styles from './home.module.css'

const Home = () => {
  const dispatch = useDispatch()

  // load user
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserQuery()

  useEffect(() => {
    // if user is loaded correctly then save stores to state
    if (isSuccess && user?.stores.length > 0) {
      dispatch(setStores(user.stores))
      // use first store in the stores array as the default store selection
      dispatch(setSelectedStoreId(user.stores[0].uuid))
    }
  }, [user, isSuccess])

  useEffect(() => {
    // save user to state if loaded correctly
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
        isSuccess ?
          <Store /> :
          <div className={styles.userError}>
            <h4>Ocurrió un error al cargar los datos de usuario</h4>
            <button className={styles.homeBtn} onClick={appLogOut}>
              Ir a inicio de sesión
            </button>
          </div>
      }
    </main>
  )
}

export default Home
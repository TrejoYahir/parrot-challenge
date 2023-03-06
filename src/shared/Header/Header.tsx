import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedStore, selectStores, setSelectedStoreId } from '../../features/store/storeSlice'
import Selector from '../Selector'
import styles from './header.module.css'
import logoutIcon from '../../assets/logout.svg'
import { appLogOut } from '../../features/auth/auth'

const Header = () => {
  const selectedStore = useSelector(selectSelectedStore)
  const stores = useSelector(selectStores)

  const dispatch = useDispatch()

  const onStoreSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedStoreId(event.target.value))
  }

  const logOut = () => {
    appLogOut(dispatch)
  }

  return (
    <header
      className={styles.parrotHeader}
    >
      <div className={styles.headerContent}>
        <img src="https://pos.parrotsoftware.io/hubfs/parrot_connect_logo.svg" alt="ParrotConnectLogo" className={styles.headerLogo} />
        <nav>
          { // Added store selector in case there's multiple stores
            selectedStore &&
            <Selector
              defaultSelected={selectedStore?.name}
              idField="uuid"
              labelField="name"
              items={stores}
              onSelect={onStoreSelect}
              className={styles.headerSelector}
            />
          }
          <button className={styles.headerLogOut} onClick={logOut}>
            <img src={logoutIcon} alt="log out" />
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedStore, selectStores, setSelectedStoreId } from '../../features/store/storeSlice'
import Selector from '../Selector/Selector'
import styles from './header.module.css'

const Header = () => {
  const selectedStore = useSelector(selectSelectedStore)
  const stores = useSelector(selectStores)

  const dispatch = useDispatch()

  const onStoreSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedStoreId(event.target.value))
  }

  return (
    <header
      className={styles.parrotHeader}
    >
      <div className={styles.headerContent}>
        <img src="https://pos.parrotsoftware.io/hubfs/parrot_connect_logo.svg" alt="ParrotConnectLogo" className={styles.headerLogo} />
        {
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
      </div>
    </header>
  )
}

export default Header
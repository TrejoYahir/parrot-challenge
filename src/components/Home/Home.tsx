import { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../../features/store/storeApiSlice'
import { useGetUserQuery } from '../../features/user/userApiSlice'
import styles from './home.module.css'

const Home = () => {

  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null)

  const {
    data: user,
    isLoading: userLoading,
    isSuccess: userSuccess,
    isError: userHasError,
    error: userError,
  } = useGetUserQuery()

  const {
    data: products,
    isLoading: productsLoading,
    isSuccess: productsSuccess,
    isError: productsHasError,
    error: productsError,
  } = useGetProductsQuery(selectedStoreId || '', { skip: !selectedStoreId })

  useEffect(() => {
    if (userSuccess && user?.stores[0]?.uuid) {
      setSelectedStoreId(user.stores[0].uuid)
    }
  }, [userSuccess, user])
  
  return (
    <section>
      <div>{user?.username}</div>
      <div>{ products?.map((product) => <div key={product.uuid}>{ product.name }</div>) }</div>
    </section>
  )
}

export default Home
import { useSelector } from "react-redux"
import { useGetProductsQuery } from "../../features/store/storeApiSlice"
import { selectSelectedStore } from "../../features/store/storeSlice"
import { IProductsByCategory } from "../../shared/Interfaces"
import Category from "./Category"
import Spinner from "../../shared/Spinner"
import styles from "./store.module.css"

const Store = () => {
  const selectedStore = useSelector(selectSelectedStore)

  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery(selectedStore?.uuid || '', { skip: !selectedStore })

  return (
    <section className={styles.storePage}>
      {
        isLoading? (
          <Spinner color="var(--color-primary)" isLoading={true} size={40} style={{left: 'calc(50% - 20px)'}} />
        ) : isSuccess? (
          products?.map((category: IProductsByCategory) => <Category {...category} key={category.uuid} />)
        ) : isError? (
          <p>Ocurrió un error al cargar los productos</p> 
        ) : null
      }
    </section>
  )
}

export default Store
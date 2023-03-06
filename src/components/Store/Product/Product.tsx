import { ChangeEvent } from "react"
import { useUpdateProductMutation } from "../../../features/store/storeApiSlice"
import { ITEM_AVAILABLE, ITEM_UNAVAILABLE } from "../../../shared/constants"
import { IProduct } from "../../../shared/Interfaces"
import Spinner from "../../../shared/Spinner"
import styles from "./product.module.css"

const Product = ({ name, price, imageUrl, availability, description, uuid }: IProduct) => {

  const [updateProduct, { isLoading }] = useUpdateProductMutation()

  const isAvailable = availability === ITEM_AVAILABLE

  const handleOnChange = async () => {
    const newStatus = isAvailable ? ITEM_UNAVAILABLE : ITEM_AVAILABLE
    try {
      await updateProduct({ productId: uuid, availability: newStatus }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.product}>
      <h4 className={styles.productName}>{name}</h4>
      <img src={imageUrl} alt="name" className={styles.productImage} />
      <div className={styles.productDetails}>
        <p className={styles.productDescription}>{description}</p>
        <strong className={styles.productPrice}>${price}</strong>
      </div>
      <div className={`${styles.productAvailability} ${isAvailable ? styles.available : styles.unavailable}`}>
        <label htmlFor={uuid}></label>
        <strong>{ isAvailable ? 'Disponible' : 'No disponible' }</strong>
        {
          isLoading ?
          <Spinner
            color={`${isAvailable ? `var(--color-light)` : `var(--color-success)`}`}
            isLoading={true}
            size={25}
            style={{ position: 'static' }}
          /> :
          <input
            type="checkbox"
            id={uuid}
            name={uuid}
            value={uuid}
            checked={availability === ITEM_AVAILABLE}
            disabled={isLoading}
            onChange={handleOnChange}
          />
        }
      </div>
    </div>
    
  )
}

export default Product
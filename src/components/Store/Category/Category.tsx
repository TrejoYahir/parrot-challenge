import { useState } from "react"
import { IProductsByCategory } from "../../../shared/Interfaces"
import Product from "../Product"
import styles from "./category.module.css"

const Category = ({ name, products }: IProductsByCategory) => {

  const [expanded, setExpanded] = useState(true)

  const toggleExpanded = () => {
    setExpanded(expanded => !expanded)
  }

  return (
    <div className={`${styles.category} ${expanded ? styles.expanded : styles.contracted}`}>
      <div className={styles.categoryHeader}>
        <button
          className={styles.headerButton}
          onClick={toggleExpanded}
        >
          {name}
        </button>
      </div>
      <div className={styles.categoryItems}>
      { products.map(product => <Product {...product} key={product.uuid} />) }
      </div>
    </div>
  )
}

export default Category
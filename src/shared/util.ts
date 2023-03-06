import { IProduct, IProductsByCategory } from "./Interfaces";

// Accepts the array and key
export const groupByCategory = (products: IProduct[]): IProductsByCategory[] => {
  // Return the end result
  return Object.entries(
    products.reduce((result: { [key: string]: IProduct[] }, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue.category.uuid] = result[currentValue.category.uuid] ?? []).push(
        currentValue
      )
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result
    }, {}) // empty object is the initial value for result object
  ).map(([uuid, products]) => ({ uuid, products, name: products[0].category.name })) // Map result object to array of categories
}

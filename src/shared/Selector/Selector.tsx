import { ISelectorProps } from "../Interfaces"

const Selector = ({ items, onSelect, defaultSelected, idField, labelField, ...props }: ISelectorProps) => {
  return (
    <select value={defaultSelected} onChange={e => onSelect(e)} {...props}>
      {
        items.map(item => (
          <option key={item[idField]} value={item[idField]}>
            {item[labelField]}
          </option>
        ))
      }
    </select>
  )
}

export default Selector
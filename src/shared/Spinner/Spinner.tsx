import { ISpinnerProps } from '../Interfaces'
import styles from './spinner.module.css'

const Spinner = ({color = 'var(--color-light)', isLoading, size = 18, ...props}: ISpinnerProps) => {
  return (
    isLoading ? (
        <span className={styles.spinnerContainer} {...props}>
          <svg
            className={styles.spinner}
            viewBox={`0 0 ${size} ${size}`}
            width={`${size}px`}
            height={`${size}px`}
          >
            <circle
              className={styles.path}
              cx={`${size / 2}`} cy={`${size / 2}`} r={`${size * .40}`}
              fill="none"
              strokeWidth={`${size / 10}`}
              stroke={color}
            ></circle>
          </svg>
        </span>
    ) : null
  )
}

export default Spinner
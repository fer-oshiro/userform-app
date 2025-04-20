import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  isFullWidth?: boolean
}

export function Button({ isLoading, isFullWidth, children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(styles.button, isLoading && styles.loading, isFullWidth && styles.fullWidth)}
      disabled={isLoading || rest.disabled}
    >
      <span>{children}</span>
    </button>
  )
}

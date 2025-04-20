import { forwardRef, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  isFullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading, isFullWidth, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || rest.disabled}
        className={clsx(
          styles.button,
          isLoading && styles.loading,
          isFullWidth && styles.fullWidth
        )}
        {...rest}
      >
        <span>{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'

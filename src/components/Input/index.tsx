import { formatCPF, formatPhone } from '@/utils/masks'
import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  mask?: 'cpf' | 'phone'
  name: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, name, className, mask, onChange, ...props }, ref) => {
    const inputId = id ?? name

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let raw = e.target.value

      if (mask === 'cpf') raw = formatCPF(raw)
      if (mask === 'phone') raw = formatPhone(raw)

      e.target.value = raw
      onChange?.(e)
    }

    return (
      <div className={styles.wrapper}>
        <input
          id={inputId}
          name={name}
          type="text"
          onChange={handleChange}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          placeholder=" "
          className={clsx(styles.input, className)}
          {...props}
        />
        <span className={styles.bar}></span>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        {error && (
          <span id={`${inputId}-error`} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes, useState } from 'react'
import styles from './Input.module.scss'
import { formatCPF, formatPhone } from '@/utils/masks'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  mask?: 'cpf' | 'phone'
  name: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, name, className, value, mask, onChange, ...props }, ref) => {
    const [localValue, setLocalValue] = useState(value ?? '')

    const inputId = id ?? name
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let raw = e.target.value
      if (mask === 'cpf') raw = formatCPF(raw)
      if (mask === 'phone') raw = formatPhone(raw)

      setLocalValue(raw)
      onChange?.({ ...e, target: { ...e.target, value: raw, name } })
    }

    return (
      <div className={styles.wrapper}>
        <input
          id={inputId}
          name={name}
          type="text"
          value={localValue}
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

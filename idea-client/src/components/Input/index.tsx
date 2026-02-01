import { type ElementType, memo } from 'react'
import cn from 'classnames'
import styles from './index.module.scss'
import type { FormikProps } from 'formik'

type InputProps<T extends ElementType> = {
  label: string
  inputTitle: string
  as?: T
  maxWidth?: number
  formik: FormikProps<any>
  type?: 'text' | 'password'
}

const InputComponent = <T extends ElementType = 'input'>({
  formik,
  inputTitle,
  maxWidth,
  label,
  as,
  type = 'text',
}: InputProps<T>) => {
  const Component = as || 'input'

  const value = formik.values[label]

  const error = formik.errors[label] as string | undefined
  const touched = formik.touched[label]
  const invalid = !!error && !!touched
  const disabled = formik.isSubmitting

  return (
    <div className={cn({ [styles.field]: true, [styles.disabled]: disabled })}>
      <label htmlFor={label}>{inputTitle}</label>
      <br />
      <Component
        {...(Component === 'input' ? { type } : {})}
        onChange={formik.handleChange}
        onBlur={() => void formik.setFieldTouched(label)}
        value={value}
        style={{ maxWidth }}
        className={cn({
          [styles.input]: Component === 'input',
          [styles.invalid]: invalid,
          [styles.textarea]: Component === 'textarea',
        })}
        name={label}
        id={label}
        disabled={disabled}
      />
      {invalid && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export const Input = memo(InputComponent) as typeof InputComponent

import cn from 'classnames'
import type { FormikProps } from 'formik'
import { type ChangeEvent, type ElementType, memo } from 'react'
import styles from './index.module.scss'

type InputProps<T extends ElementType> = {
  inputValue: string
  onChange: (e: ChangeEvent<any>) => void
  inputTitle: string
  as?: T
  maxWidth?: number
  formik: FormikProps<any>
}

const InputComponent = <T extends ElementType = 'input'>({
  formik,
  inputValue,
  onChange,
  inputTitle,
  maxWidth,
  as,
}: InputProps<T>) => {
  const lowerTitle = inputTitle.toLowerCase()
  const Component = as || 'input'

  const error = formik?.errors[lowerTitle] as string | undefined
  const touched = formik.touched[lowerTitle]
  const invalid = !!error && !!touched
  const disabled = formik.isSubmitting

  return (
    <div className={cn({ [styles.field]: true, [styles.disabled]: disabled })}>
      <label htmlFor={lowerTitle}>{inputTitle}</label>
      <br />
      <Component
        {...(Component === 'input' ? { type: 'text' } : {})}
        onChange={onChange}
        onBlur={() => void formik.setFieldTouched(lowerTitle)}
        value={inputValue}
        style={{ maxWidth }}
        className={cn({
          [styles.input]: Component === 'input',
          [styles.invalid]: invalid,
          [styles.textarea]: Component === 'textarea',
        })}
        name={lowerTitle}
        id={lowerTitle}
        disabled={disabled}
      />
      {invalid && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export const Input = memo(InputComponent) as typeof InputComponent

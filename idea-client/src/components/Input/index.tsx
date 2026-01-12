import type { FormikProps } from 'formik'
import { type ChangeEvent, type ElementType, memo } from 'react'

type InputProps<T extends ElementType> = {
  inputValue: string
  onChange: (e: ChangeEvent<any>) => void
  inputTitle: string
  as?: T
  formik: FormikProps<any>
}

const InputComponent = <T extends ElementType = 'input'>({
  formik,
  inputValue,
  onChange,
  inputTitle,
  as,
}: InputProps<T>) => {
  const lowerTitle = inputTitle.toLowerCase()
  const Component = as || 'input'

  const error = formik?.errors[lowerTitle] as string | undefined
  const touched = formik.touched[lowerTitle]

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={lowerTitle}>{inputTitle}</label>
      <br />
      <Component
        {...(Component === 'input' ? { type: 'text' } : {})}
        onChange={onChange}
        onBlur={() => void formik.setFieldTouched(lowerTitle)}
        value={inputValue}
        name={lowerTitle}
        id={lowerTitle}
      />
      {touched && error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export const Input = memo(InputComponent) as typeof InputComponent

import { useCallback, useMemo, useRef, useState } from 'react'
import { type FormikHelpers, useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { type z } from 'zod'
import type { ButtonProps } from '@/components/Button'
import type { ToasterProps } from '@/components/toaster'

type FormProps<TZodSchema extends z.ZodTypeAny> = {
  successMessage?: string | false
  resetOnSuccess?: boolean
  showValidationAlert?: boolean
  initialValues?: Partial<z.infer<TZodSchema>>
  validationSchema?: TZodSchema
  onSubmit: (
    values: z.infer<TZodSchema>,
    actions: FormikHelpers<z.infer<TZodSchema> & Record<string, any>>
  ) => Promise<any>
}

export const useForm = <TZodSchema extends z.ZodTypeAny>({
  successMessage = false,
  resetOnSuccess = true,
  showValidationAlert = false,
  validationSchema,
  onSubmit,
  initialValues,
}: FormProps<TZodSchema>) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<Error | null>(null)
  const [isHidden, setIsHidden] = useState<boolean>(true)

  const timerRef = useRef<NodeJS.Timeout>(null)

  type FormikValues = z.infer<TZodSchema> & Record<string, any>

  const formik = useFormik<FormikValues>({
    initialValues: (initialValues || {}) as FormikValues,
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, formikHelpers) => {
      try {
        setSubmittingError(null)
        await onSubmit(values, formikHelpers)
        if (resetOnSuccess) {
          void formik.resetForm()
        }
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (e: any) {
        setSubmittingError(e)
      }
    },
  })

  const showToaster = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setIsHidden(() => false)
    timerRef.current = setTimeout(() => {
      setIsHidden(() => true)
      timerRef.current = null
    }, 3000)
    return
  }, [])
  const alertProps = useMemo<ToasterProps>(() => {
    if (submittingError) {
      showToaster()
      return {
        children: submittingError.message,
        color: 'red',
      }
    }

    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      showToaster()
      return {
        children: 'Some fields are invalid',
        color: 'red',
      }
    }

    if (successMessageVisible && successMessage) {
      showToaster()
      return {
        children: successMessage,
        color: 'green',
      }
    }
    return {
      color: 'red',
      children: null,
    }
  }, [submittingError, formik.isValid, formik.submitCount, successMessageVisible, successMessage, showValidationAlert])

  const buttonProps = useMemo<Omit<ButtonProps, 'children'>>(() => {
    return {
      loading: formik.isSubmitting,
    }
  }, [formik.isSubmitting])

  return {
    formik,
    alertProps,
    buttonProps,
    isHidden,
  }
}

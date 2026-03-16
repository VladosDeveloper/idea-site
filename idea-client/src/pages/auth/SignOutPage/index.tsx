import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { getSignInRoute } from '@/lib/routes.ts'
import { trpc } from '@/lib/trpc.tsx'

export const SignOutPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()

  useEffect(() => {
    Cookies.remove('token')
    void trpcUtils.invalidate().then(() => {
      void navigate(getSignInRoute(), { replace: true })
    })
  }, [])

  return <p>Loading...</p>
}

import { createContext, type ReactNode, useContext } from 'react'
import { Loader } from '@/components/Loader'
import { trpc } from '@/lib/trpc.tsx'
import type { TrpcRouterOutput } from '@idea-site/backend/src/router'

export type AppContext = {
  me: TrpcRouterOutput['getMe']['me']
}

const AppReactContext = createContext<AppContext>({
  me: null,
})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, error, isError, isFetching, isLoading } = trpc.getMe.useQuery()

  return (
    <AppReactContext.Provider value={{ me: data?.me || null }}>
      {isLoading || isFetching ? <Loader type="page" /> : isError ? <p>Error: {error.message}</p> : children}
    </AppReactContext.Provider>
  )
}

export const useAppContext = () => useContext(AppReactContext)
export const useMe = () => {
  const { me } = useAppContext()
  return me
}

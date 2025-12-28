import { TrpcProvider } from './lib/trpc.tsx'
import { AllIdeasPage } from './pages/AllIdeasPage/AllIDeasPage.tsx'

export const App = () => {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}

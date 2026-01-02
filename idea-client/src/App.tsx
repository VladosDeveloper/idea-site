import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage/AllIDeasPage.tsx'

export const App = () => {
  if (Math.random()) {
    console.info('saa')
  }

  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}

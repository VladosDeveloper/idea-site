import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignInPage } from '@/pages/SignInPage'
import { SignOutPage } from '@/pages/SignOutPage'
import { SignUpPage } from '@/pages/SignUpPage'
import { Layout } from './components/layout'
import * as routes from './lib/routes.ts'
import { getSignOutRoute } from './lib/routes.ts'
import { TrpcProvider } from './lib/trpc'
import { ViewAllIdeasPage } from './pages/AllIdeasPage'
import { EditIdeaPage } from './pages/EditIdeaPage'
import { NewIdeaPage } from './pages/NewIdeaPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import './styles/global.scss'

export const App = () => (
  <TrpcProvider>
    <BrowserRouter>
      <Routes>
        <Route path={getSignOutRoute()} element={<SignOutPage />} />
        <Route path={routes.getAllIdeasRoute()} element={<Layout />}>
          <Route path={routes.getAllIdeasRoute()} element={<ViewAllIdeasPage />} />
          <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
          <Route path={routes.createNewIdeaRoute()} element={<NewIdeaPage />} />
          <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
          <Route path={routes.getSignInRoute()} element={<SignInPage />} />
          <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </TrpcProvider>
)

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppContextProvider } from '@/lib/ctx.tsx'
import { SignInPage } from '@/pages/auth/SignInPage'
import { SignOutPage } from '@/pages/auth/SignOutPage'
import { SignUpPage } from '@/pages/auth/SignUpPage'
import { NotFoundPage } from '@/pages/other/NotFoundPage'
import { Layout } from './components/layout'
import * as routes from './lib/routes.ts'
import { getSignOutRoute } from './lib/routes.ts'
import { TrpcProvider } from './lib/trpc'
import { ViewAllIdeasPage } from './pages/ideas/AllIdeasPage'
import { EditIdeaPage } from './pages/ideas/EditIdeaPage'
import { NewIdeaPage } from './pages/ideas/NewIdeaPage'
import { ViewIdeaPage } from './pages/ideas/ViewIdeaPage'
import './styles/global.scss'

export const App = () => (
  <TrpcProvider>
    <AppContextProvider>
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
            <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </TrpcProvider>
)

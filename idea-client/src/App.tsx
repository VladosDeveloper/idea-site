import type { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppContextProvider } from '@/lib/ctx.tsx'
import { EditProfilePage } from '@/pages/auth/EditProfilePage'
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

type PageRoutes = {
  route: string
  to: ReactNode
}

const pageRoutes: PageRoutes[] = [
  {
    route: routes.getAllIdeasRoute(),
    to: <ViewAllIdeasPage />,
  },
  {
    route: routes.getViewIdeaRoute(routes.viewIdeaRouteParams),
    to: <ViewIdeaPage />,
  },
  {
    route: routes.createNewIdeaRoute(),
    to: <NewIdeaPage />,
  },
  {
    route: routes.getSignUpRoute(),
    to: <SignUpPage />,
  },
  {
    route: routes.getSignInRoute(),
    to: <SignInPage />,
  },
  {
    route: routes.getEditIdeaRoute(routes.editIdeaRouteParams),
    to: <EditIdeaPage />,
  },
  {
    route: routes.getUpdateProfileRoute(),
    to: <EditProfilePage />,
  },
  {
    route: '*',
    to: <NotFoundPage />,
  },
]

export const App = () => (
  <HelmetProvider>
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={getSignOutRoute()} element={<SignOutPage />} />
            <Route path={routes.getAllIdeasRoute()} element={<Layout />}>
              {pageRoutes.map((page, index) => (
                <Route key={index} path={page.route} element={page.to} />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  </HelmetProvider>
)

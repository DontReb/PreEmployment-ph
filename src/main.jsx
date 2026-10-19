import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import '@fontsource-variable/sora'
import './styles.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import RequirementPage from './pages/RequirementPage.jsx'
import ChecklistPage from './pages/ChecklistPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import AuthProvider from './account/AuthProvider.jsx'
import ProgressProvider from './progress/ProgressProvider.jsx'

// A "data router": the list of pages lives here. App is the shared layout
// (navbar, footer) and shows the matching page where it puts <Outlet />.
// This router mode is what lets links animate between pages (view transitions).
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/requirements/:id', element: <RequirementPage /> },
      { path: '/checklist', element: <ChecklistPage /> },
      { path: '/account', element: <AccountPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProgressProvider>
        <RouterProvider router={router} />
      </ProgressProvider>
    </AuthProvider>
  </StrictMode>,
)

import { Route, Routes } from 'react-router'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import HomePage from './pages/HomePage.jsx'
import RequirementPage from './pages/RequirementPage.jsx'
import ChecklistPage from './pages/ChecklistPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-surface text-ink antialiased">
      <ScrollManager />
      {/* Lets keyboard users jump past the navbar. Hidden until it receives focus. */}
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
        }}
        className="sr-only z-[60] rounded-full bg-accent px-5 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-5xl flex-1 px-4 focus:outline-none">
        {/* Only the route that matches the current URL is shown */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/requirements/:id" element={<RequirementPage />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      {/* Counts visits anonymously (no cookies). Shows up in Vercel → Analytics.
          It only runs on the live site, never while developing. */}
      <Analytics />
    </div>
  )
}

export default App

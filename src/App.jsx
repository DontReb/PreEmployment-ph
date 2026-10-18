import { Route, Routes } from 'react-router'
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
    <div className="flex min-h-screen flex-col bg-surface text-ink antialiased">
      <ScrollManager />
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4">
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
    </div>
  )
}

export default App

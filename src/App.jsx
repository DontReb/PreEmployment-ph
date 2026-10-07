import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Requirements from './components/Requirements.jsx'
import Guides from './components/Guides.jsx'
import FAQs from './components/FAQs.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-50 text-ink antialiased">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4">
        <Home />
        <Requirements />
        <Guides />
        <FAQs />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

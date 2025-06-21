import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { TranslationProvider } from './components/translation-provider'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Loader } from './components/Loader'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { useLoader } from './hooks/useLoader'

function App() {
  const { isLoading } = useLoader(3000) // 3 seconds minimum loading time

  if (isLoading) {
    return <Loader />
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="weforward-ui-theme">
      <TranslationProvider>
        <Router>
          <div className="min-h-screen">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </TranslationProvider>
    </ThemeProvider>
  )
}

export default App

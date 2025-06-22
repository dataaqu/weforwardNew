import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { TranslationProvider } from './components/translation-provider'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Loader } from './components/Loader'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostDetail } from './pages/BlogPostDetail'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminPosts } from './pages/admin/AdminPosts'
import { AdminNewPost } from './pages/admin/AdminNewPost'
import { AdminCategories } from './pages/admin/AdminCategories'
import { ProtectedRoute } from './components/admin/ProtectedRoute'
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
          <Routes>
            {/* Public routes with layout */}
            <Route path="/" element={
              <div className="min-h-screen">
                <Header />
                <HomePage />
                <Footer />
              </div>
            } />
            <Route path="/blog" element={
              <div className="min-h-screen">
                <Header />
                <BlogPage />
                <Footer />
              </div>
            } />
            <Route path="/blog/:slug" element={
              <div className="min-h-screen">
                <Header />
                <BlogPostDetail />
                <Footer />
              </div>
            } />
            
            {/* Admin routes without main layout */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/posts" element={
              <ProtectedRoute>
                <AdminPosts />
              </ProtectedRoute>
            } />
            <Route path="/admin/posts/new" element={
              <ProtectedRoute>
                <AdminNewPost />
              </ProtectedRoute>
            } />
            <Route path="/admin/categories" element={
              <ProtectedRoute>
                <AdminCategories />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </TranslationProvider>
    </ThemeProvider>
  )
}

export default App

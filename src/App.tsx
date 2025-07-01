import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { TranslationProvider } from './components/translation-provider'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Loader } from './components/Loader'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostDetail } from './pages/BlogPostDetail'
import { NotFoundPage } from './pages/NotFoundPage'
import { useLoader } from './hooks/useLoader'

// Lazy load admin components to reduce initial bundle size
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(module => ({ default: module.AdminLogin })))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })))
const AdminPosts = lazy(() => import('./pages/admin/AdminPosts').then(module => ({ default: module.AdminPosts })))
const AdminNewPost = lazy(() => import('./pages/admin/AdminNewPost').then(module => ({ default: module.AdminNewPost })))
const AdminEditPost = lazy(() => import('./pages/admin/AdminEditPost').then(module => ({ default: module.AdminEditPost })))
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories').then(module => ({ default: module.AdminCategories })))
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute').then(module => ({ default: module.ProtectedRoute })))

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
            <Route path="/admin/login" element={
              <Suspense fallback={<Loader />}>
                <AdminLogin />
              </Suspense>
            } />
            <Route path="/admin" element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/posts" element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute>
                  <AdminPosts />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/posts/new" element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute>
                  <AdminNewPost />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/posts/edit/:id" element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute>
                  <AdminEditPost />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/categories" element={
              <Suspense fallback={<Loader />}>
                <ProtectedRoute>
                  <AdminCategories />
                </ProtectedRoute>
              </Suspense>
            } />
            
            {/* 404 Not Found route - must be last */}
            <Route path="*" element={
              <div className="min-h-screen">
                <Header />
                <NotFoundPage />
                <Footer />
              </div>
            } />
          </Routes>
        </Router>
      </TranslationProvider>
    </ThemeProvider>
  )
}

export default App

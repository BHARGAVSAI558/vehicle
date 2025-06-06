import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import BikeList from './pages/BikeList';
import BikeDetails from './pages/BikeDetails';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import AddBike from './pages/admin/AddBike';
import ManageBikes from './pages/admin/ManageBikes';
import About from './pages/About';
import Contact from './pages/Contact';

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn } = useAuth();
  
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Conditional Navbar component
const ConditionalNavbar = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';
  
  if (isAdminRoute) {
    return null;
  }
  
  return <Navbar />;
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <ConditionalNavbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/bikes" element={<BikeList />} />
                  <Route path="/bikes/:vid" element={<BikeDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin/login" element={<AdminLogin />} />

                  {/* Protected admin routes */}
                  <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
                  <Route path="/adminhome" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
                  <Route path="/admin/home" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
                  <Route path="/admin/bikes" element={<ProtectedRoute><ManageBikes /></ProtectedRoute>} />
                  <Route path="/admin/bikes/add" element={<ProtectedRoute><AddBike /></ProtectedRoute>} />

                  {/* Catch all route - redirect to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster position="top-center" />
          </QueryClientProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;

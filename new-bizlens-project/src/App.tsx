import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Upload from './pages/Upload';
import Reports from './pages/Reports';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { AuthProvider } from './utils/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute'; // Import ProtectedRoute

// Set the API base URL for Axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function App() {
  return (   
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-primary-50/50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route 
                path="/upload" 
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

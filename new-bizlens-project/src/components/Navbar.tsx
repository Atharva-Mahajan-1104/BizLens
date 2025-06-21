import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../utils/AuthContext'; // Import the useAuth hook

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Upload Bills', path: '/upload' },
  { name: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth(); // Use authentication context

  // Scroll to the top of the page when the route changes
  if (location.hash === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-primary-600 font-bold text-xl"
              >
                BizLens
              </motion.div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  {item.name}
                </Link>
                {isAuthenticated && item.name === 'Upload Bills' && (
                  <Link
                    to="/reports"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Analysis Reports
                  </Link>
                )}
              </div>
            ))}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            {navItems.map((item) => (
              <div key={item.name} className="flex items-center">
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {item.name}
                </Link>
                {isAuthenticated && item.name === 'Upload Bills' && (
                  <Link
                    to="/reports"
                    className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Analysis Reports
                  </Link>
                )}
              </div>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-primary-700 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-primary-700 transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

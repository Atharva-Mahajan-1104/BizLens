import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { registerUser } from '../utils/auth';
import InputField from '../components/forms/InputField';
import Button from '../components/forms/Button';
import FormError from '../components/forms/FormError';
import { validatePassword } from '../utils/validation';
import { useAuth } from '../utils/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '', // Changed from `name` to `username`
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        username: formData.username, // Changed from `name` to `username`
        email: formData.email,
        password: formData.password,
      });
      login(); // Update the authentication state
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-md mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={User}
              type="text"
              name="username" // Changed from `name` to `username`
              label="Full Name"
              value={formData.username} // Changed from `name` to `username`
              onChange={handleChange}
              required
            />

            <InputField
              icon={Mail}
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <InputField
              icon={Lock}
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <InputField
              icon={Lock}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {error && <FormError message={error} />}

            <Button type="submit" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center text-sm"
          >
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Login here
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

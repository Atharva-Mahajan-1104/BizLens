import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Button from '../components/forms/Button';
import FormError from '../components/forms/FormError';
import InputField from '../components/forms/InputField';
import { loginUser } from '../utils/auth';
import { useAuth } from '../utils/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await loginUser({ email, password });
      login();
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
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
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={Mail}
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <InputField
              icon={Lock}
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <FormError message={error} />}

            <Button type="submit" isLoading={isLoading}>
              Login
            </Button>
          </form>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center text-sm"
          >
            New to BizLens?{' '}
            <Link 
              to="/register" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Create an account
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

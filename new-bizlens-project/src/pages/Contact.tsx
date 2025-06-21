import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios'; // Import axios

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: '', // Changed from message to content
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    try {
      await axios.post('/api/messages', formData); // Send form data to backend API
      setSubmissionStatus('success');
      setFormData({ name: '', email: '', content: '' }); // Reset input fields after successful submission
      console.log('Form submitted:', formData);
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-600">
            Get in touch with our team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="content"
                  id="content"
                  rows={4}
                  required
                  value={formData.content}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </motion.button>
              {submissionStatus === 'success' && (
                <p className="text-green-600 mt-4 text-2xl font-bold">Message sent successfully!</p>
              )}
              {submissionStatus === 'error' && (
                <p className="text-red-600 mt-4">Error sending message. Please try again.</p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
            
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">atharvamahajan@bizlens.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Phone</h3>
                <p className="text-gray-600">+9158352000</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Office</h3>
                <p className="text-gray-600">
                 Godrej Green Vistas<br />
                 Mahalunge<br />
                  Pune,Maharashtra
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <h3 className="font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">What file formats do you support?</h4>
                  <p className="text-gray-600">We support PDF, XLS, XLSX, and CSV files.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Is my data secure?</h4>
                  <p className="text-gray-600">Yes, we use enterprise -grade encryption and follow strict data protection protocols.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">How long does analysis take?</h4>
                  <p className="text-gray-600">Most analyses are completed within minutes of upload.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

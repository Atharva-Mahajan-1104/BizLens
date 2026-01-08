import UploadSection from '../components/UploadSection';
import { motion } from 'framer-motion';

// Upload page for submitting bills for analysis
export default function Upload() {
  return (
    // Top padding to account for fixed navbar
    <div className="pt-16">

      {/* Animated container for smooth page fade-in */}
      <motion.div
        initial={{ opacity: 0 }}   // Start invisible
        animate={{ opacity: 1 }}   // Fade in on mount
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >

        {/* Page heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Upload Bills
          </h1>

          {/* Supporting subtitle */}
          <p className="mt-4 text-xl text-gray-600">
            Upload your bills for instant analysis
          </p>
        </div>

        {/* Bill upload and processing section */}
        <UploadSection />

      </motion.div>
    </div>
  );
}

import UploadSection from '../components/UploadSection';
import { motion } from 'framer-motion';

export default function Upload() {
  return (
    <div className="pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Upload Bills</h1>
          <p className="mt-4 text-xl text-gray-600">
            Upload your bills for instant analysis
          </p>
        </div>
        <UploadSection />
      </motion.div>
    </div>
  );
}
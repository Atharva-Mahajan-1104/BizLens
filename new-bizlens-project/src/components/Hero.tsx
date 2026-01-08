import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {

  // Scrolls smoothly to the upload section when the button is clicked
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Main hero section with a soft gradient background
    <div className="relative bg-gradient-to-b from-primary-50 to-white pt-20">

      {/* Centered container to keep content aligned and responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Animated wrapper for hero content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}   // Initial animation state
          animate={{ opacity: 1, y: 0 }}    // Final animation state
          transition={{ duration: 0.6 }}    // Animation duration
          className="text-center"
        >

          {/* Main heading */}
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Transform Your Billing Data</span>
            <span className="block text-primary-600">
              into Actionable Insights!
            </span>
          </h1>

          {/* Subtitle with fade-in animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Upload, Analyze, Optimize – Empower your business with data-driven decisions.
          </motion.p>

          {/* Call-to-action button container */}
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">

            {/* Animated button with hover and tap effects */}
            <motion.button
              whileHover={{ scale: 1.05 }}   // Slight zoom on hover
              whileTap={{ scale: 0.95 }}     // Press effect on click
              onClick={scrollToUpload}       // Scrolls to upload section
              className="rounded-md shadow px-8 py-3 bg-primary-600 text-white font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center space-x-2"
            >
              <span>Get Started</span>

              {/* Arrow icon for visual emphasis */}
              <ArrowRight size={20} />
            </motion.button>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

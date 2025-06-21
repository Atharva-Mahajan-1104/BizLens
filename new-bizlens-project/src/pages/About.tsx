import { motion } from 'framer-motion';
import { Target, Lightbulb, User } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-900"
          >
            About BizLens
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xl text-gray-600"
          >
            Empowering businesses with data-driven insights
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <Target className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Our Mission</h3>
            <p className="mt-2 text-gray-600">
              To simplify business analytics and empower organizations to make data-driven decisions.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <Lightbulb className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Our Vision</h3>
            <p className="mt-2 text-gray-600">
              To become the leading platform for business intelligence and billing analytics.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <User className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Our Goal</h3>
            <p className="mt-2 text-gray-600">
              To empower businesses with actionable insights that drive growth and efficiency.
            </p>
          </motion.div>
        </div>
        <motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.8 }}
  className="mt-16 bg-white rounded-lg shadow-lg p-8"
>
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Journey with BizLens</h2>
  <p className="text-gray-600 leading-relaxed">
    At BizLens, we understand the journey businesses go through when leveraging billing data. From onboarding to making data-driven decisions, we’re committed to simplifying complex data into actionable insights to help businesses thrive.
  </p>

  <motion.ul
    className="mt-6 space-y-6 text-gray-600"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ staggerChildren: 0.3 }}
  >
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="flex items-start space-x-4"
    >
      <div className="flex-shrink-0">
        <span className="text-primary-600 text-xl font-bold">1.</span>
      </div>
      <div>
        <p className="text-lg font-medium text-gray-900">Onboarding & Setup</p>
        <p>
          Users start by signing up for BizLens, creating an account, and integrating their billing systems (e.g., ERP, accounting platforms, or custom data sources). This ensures all relevant data is captured seamlessly.
        </p>
      </div>
    </motion.li>

    <motion.li
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="flex items-start space-x-4"
    >
      <div className="flex-shrink-0">
        <span className="text-primary-600 text-xl font-bold">2.</span>
      </div>
      <div>
        <p className="text-lg font-medium text-gray-900">Data Integration & Analysis</p>
        <p>
          Once the setup is complete, users can visualize and analyze data through BizLens’s intuitive dashboard. Advanced algorithms process raw data and generate insightful reports, offering a clear picture of billing patterns and trends.
        </p>
      </div>
    </motion.li>

    <motion.li
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="flex items-start space-x-4"
    >
      <div className="flex-shrink-0">
        <span className="text-primary-600 text-xl font-bold">3.</span>
      </div>
      <div>
        <p className="text-lg font-medium text-gray-900">Actionable Insights & Recommendations</p>
        <p>
          Armed with actionable insights, users can identify areas for growth, optimize billing processes, and make informed decisions to enhance efficiency and profitability.
        </p>
      </div>
    </motion.li>

    <motion.li
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="flex items-start space-x-4"
    >
      <div className="flex-shrink-0">
        <span className="text-primary-600 text-xl font-bold">4.</span>
      </div>
      <div>
        <p className="text-lg font-medium text-gray-900">Continuous Improvement</p>
        <p>
          BizLens empowers users to monitor and track performance continuously, helping them stay aligned with evolving business needs and fine-tuning strategies for sustained success.
        </p>
      </div>
    </motion.li>
  </motion.ul>
</motion.div>




        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Story</h2>
          <div className="flex items-center">
            { <img
              className="w-16 h-16 rounded-full mr-4"
              src="/assets/pic.jpg"
              alt="Founder"
            /> }
            <div>
              <p className="text-gray-900 font-medium">Atharva Mahajan</p>
              <p className="text-gray-600">Founder & CEO, BizLens</p>
            </div>
          </div>
          <p className="mt-4 text-gray-600 leading-relaxed">
            As a passionate computer science engineering student, I witnessed firsthand the challenges businesses face when trying to derive insights from large amounts of data. My journey with BizLens started with a mission to make data analytics accessible and actionable for businesses of all sizes. With a strong background in Java development and an interest in algorithms and emerging technologies, I have been committed to building BizLens into a platform that empowers organizations with intelligent solutions. Today, my focus is on ensuring that BizLens continues to innovate and grow, helping businesses make data-driven decisions that lead to success.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

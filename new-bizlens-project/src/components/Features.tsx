import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { features } from '../constants/features';

export default function Features() {
  return (
    // Section wrapper with subtle background gradient
    <section className="py-16 bg-gradient-to-b from-primary-50 to-white">

      {/* Main container to center content and control width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Animated reveal for section heading */}
        <ScrollReveal>
          <div className="text-center">

            {/* Section title */}
            <h2 className="text-3xl font-bold text-primary-900">
              What We Do
            </h2>

            {/* Section subtitle */}
            <p className="mt-4 text-lg text-primary-700">
              Transform your business data into actionable insights
            </p>
          </div>
        </ScrollReveal>

        {/* Feature cards container */}
        <div className="mt-16">

          {/* Responsive grid for feature cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

            {/* Loop through feature list and render each card */}
            {features.map((feature, index) => (
              <ScrollReveal
                key={feature.title}
                delay={index * 0.2} // Staggered animation delay
              >

                {/* Feature card with hover lift effect */}
                <motion.div
                  whileHover={{ y: -5 }} // Slight upward movement on hover
                  className="relative p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100"
                >

                  {/* Icon container positioned above the card */}
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <motion.div
                      whileHover={{ rotate: 360 }} // Rotate icon on hover
                      transition={{ duration: 0.5 }}
                      className="rounded-full bg-primary-100 p-3"
                    >

                      {/* Feature icon */}
                      <feature.icon className="h-6 w-6 text-primary-600" />
                    </motion.div>
                  </div>

                  {/* Feature content */}
                  <div className="pt-4 text-center">

                    {/* Feature title */}
                    <h3 className="text-xl font-medium text-primary-900 mt-8">
                      {feature.title}
                    </h3>

                    {/* Feature description */}
                    <p className="mt-4 text-primary-600">
                      {feature.description}
                    </p>
                  </div>

                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

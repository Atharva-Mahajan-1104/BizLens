import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { features } from '../constants/features';

export default function Features() {
  return (
    <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-900">What We Do</h2>
            <p className="mt-4 text-lg text-primary-700">
              Transform your business data into actionable insights
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.2}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100"
                >
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="rounded-full bg-primary-100 p-3"
                    >
                      <feature.icon className="h-6 w-6 text-primary-600" />
                    </motion.div>
                  </div>

                  <div className="pt-4 text-center">
                    <h3 className="text-xl font-medium text-primary-900 mt-8">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-primary-600">{feature.description}</p>
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
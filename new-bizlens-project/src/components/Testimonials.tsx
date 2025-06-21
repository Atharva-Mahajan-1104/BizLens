import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "BizLens has transformed the way we handle our billing data. The insights we've gained are invaluable for our business growth.",
    author: "Honey Jain",
    role: "CFO, Tech Solutions Pvt. Ltd.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150"
  },
  {
    quote: "The seasonal trend analysis helped us optimize our inventory management and boost efficiency significantly.",
    author: "Suresh Gupta",
    role: "Operations Head, Global Retail Pvt. Ltd.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150"
  },
  {
    quote: "Easy to use and provides powerful insights. BizLens has become an essential tool for our business operations.",
    author: "Priya Desai",
    role: "CEO, StartUp Innovations Pvt. Ltd.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">Client Testimonials</h2>
          <p className="mt-4 text-lg text-gray-600">
            Trusted by businesses across India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3, duration: 0.6, ease: "easeOut" }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center">
                <img
                  className="w-20 h-20 rounded-full mb-6 border-4 border-primary-400"
                  src={testimonial.image}
                  alt={testimonial.author}
                />
                <p className="text-gray-700 italic text-center mb-6">{testimonial.quote}</p>
                <p className="font-medium text-gray-900 text-center">{testimonial.author}</p>
                <p className="text-sm text-gray-500 text-center">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

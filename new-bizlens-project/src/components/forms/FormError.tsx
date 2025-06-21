import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message: string;
}

export default function FormError({ message }: FormErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 text-red-600 text-sm"
    >
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </motion.div>
  );
}
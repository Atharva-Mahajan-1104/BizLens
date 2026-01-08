import { TrendingUp, Calendar, Brain } from 'lucide-react';
import type { Feature } from '../types';

// List of feature definitions displayed on the Features section
// Each feature includes an icon, title, and short description
export const features: Feature[] = [
  {
    // Icon representing AI-driven intelligence
    icon: Brain,
    title: 'AI Recommendations',
    description: 'Optimize operations and boost efficiency with AI-driven insights.',
  },
  {
    // Icon representing time-based and seasonal trends
    icon: Calendar,
    title: 'Real-Time Trends',
    description: 'Monitor seasonal patterns and make timely decisions.',
  },
  {
    // Icon representing growth and performance improvement
    icon: TrendingUp,
    title: 'Actionable Reports',
    description: 'Transform data into easy-to-understand reports for strategic decisions.',
  },
];

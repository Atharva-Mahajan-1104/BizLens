export interface Feature {
  icon: React.FC<{ className?: string; size?: number }>;
  title: string;
  description: string;
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}
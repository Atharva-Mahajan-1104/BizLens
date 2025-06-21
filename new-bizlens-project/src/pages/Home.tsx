import Hero from '../components/Hero';
import UploadSection from '../components/UploadSection';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <UploadSection />
      <Testimonials />
    </main>
  );
}
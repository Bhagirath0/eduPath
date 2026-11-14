import React, { useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import FullLoader from '@/components/layout/FullLoader';
import HeroSection from '@/sections/HeroSection';
import GlazeLogoTicker from '@/sections/GlazeLogoTicker';
import FeaturedCourses from '@/sections/FeaturedCourses';
import LearningDomains from '@/sections/LearningDomains';
import HowItWorks from '@/sections/HowItWorks';
import InternshipSection from '@/sections/InternshipSection';
import BenefitsSection from '@/sections/BenefitsSection';
import CertificateSection from '@/sections/CertificateSection';
import FAQSection from '@/sections/FAQSection';

const HomePage: React.FC = () => {
  const [is3dReady, setIs3dReady] = useState(false);
  const [playEntrance, setPlayEntrance] = useState(false);

  return (
    <PublicLayout>
      {/* Full-screen preloader (first thing on screen) */}
      <FullLoader
        is3dReady={is3dReady}
        onComplete={() => setPlayEntrance(true)}
      />

      {/* 1. Hero: 3D Keychain + Large Typography */}
      <HeroSection
        on3dReady={() => setIs3dReady(true)}
        playEntrance={playEntrance}
      />

      {/* 2. Logo Ticker: Drifting row of skill wordmarks with scroll velocity */}
      <GlazeLogoTicker />

      {/* 3. Student Experience: Featured Technical Courses */}
      <FeaturedCourses />

      {/* 4. Six Technical Learning Paths */}
      <LearningDomains />

      {/* 5. Step-by-Step Educational Journey */}
      <HowItWorks />

      {/* 6. Online Internships Section */}
      <InternshipSection />

      {/* 7. Platform Benefits */}
      <BenefitsSection />

      {/* 8. Verified Credentials & Sample Mockup */}
      <CertificateSection />

      {/* 9. Frequently Asked Questions */}
      <FAQSection />
    </PublicLayout>
  );
};

export default HomePage;

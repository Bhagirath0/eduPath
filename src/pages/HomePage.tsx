import React, { useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import FullLoader from '@/components/layout/FullLoader';
import HeroSection from '@/sections/HeroSection';
import GlazeLogoTicker from '@/sections/GlazeLogoTicker';
import GlazeTimelineStatement from '@/sections/GlazeTimelineStatement';
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

      {/* 2. Logo Ticker: Drifting row of wordmarks with scroll velocity */}
      <GlazeLogoTicker />

      {/* 3. Timeline Tracks -> Statement: Flying clips FLIP animation */}
      <GlazeTimelineStatement />

      {/* 4. Student Experience: Featured Technical Courses */}
      <FeaturedCourses />

      {/* 5. Six Technical Learning Paths */}
      <LearningDomains />

      {/* 6. Step-by-Step Educational Journey */}
      <HowItWorks />

      {/* 7. Online Internships Teaser */}
      <InternshipSection />

      {/* 8. Platform Benefits */}
      <BenefitsSection />

      {/* 9. Verified Credentials & Sample Mockup */}
      <CertificateSection />

      {/* 10. Frequently Asked Questions */}
      <FAQSection />
    </PublicLayout>
  );
};

export default HomePage;

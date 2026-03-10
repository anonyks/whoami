import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import BootSequence from '@/components/BootSequence';
import HeroTerminal from '@/components/HeroTerminal';
import AboutSection from '@/components/AboutSection';
import InterestsSection from '@/components/InterestsSection';
import FeaturedWorkSection from '@/components/FeaturedWorkSection';
import ProjectsSection from '@/components/ProjectsSection';
import LearningSection from '@/components/LearningSection';
import SocialLinksSection from '@/components/SocialLinksSection';
import GitHubSection from '@/components/GitHubSection';
import TerminalInput from '@/components/TerminalInput';
import AskAnonyKs from '@/components/AskAnonyKs';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}
      {booted && (
        <div className="min-h-screen">
          <Navbar />
          <HeroTerminal />
          <AboutSection />
           <InterestsSection />
           <FeaturedWorkSection />
           <ProjectsSection />
           <LearningSection />
           <SocialLinksSection />
           <GitHubSection />
           <TerminalInput />
           <ContactSection />
            <footer className="text-center py-8 text-xs text-muted-foreground border-t border-border">
              © 2026 Kishan Shah (AnonyKs)
            </footer>
          <AskAnonyKs />
        </div>
      )}
    </>
  );
};

export default Index;

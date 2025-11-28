import { motion } from 'framer-motion';
import { Mail, Linkedin, Globe } from 'lucide-react';
import HeroPhysics from './components/HeroPhysics';
import About from './components/About';
import ProjectCard from './components/ProjectCard';
import Contact from './components/Contact';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage, translations } = useLanguage();
  
  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
    >
      <Globe size={16} />
      <span className="font-medium text-sm">{translations.nav.lang}</span>
    </button>
  );
};

function MainContent() {
  const { t } = useLanguage();

  const projects = [
    {
      title: "Pupilo",
      description: t('projects.descriptionPupilo'),
      tags: ["React", "Inclusive Design", "HTML/CSS", "TypeScript"],
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
      link: "https://pupilo-react.vercel.app",
      // github: "#" 
    },
    {
      title: "Scrappr",
      description: t('projects.descriptionScrappr'),
      tags: ["Product Strategy", "Data Visualization", "ROI Analysis", "React"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      github: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-sky-500/30">
      <LanguageToggle />
      <HeroPhysics />
      
      <About />
      
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('projects.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{t('projects.title2')}</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            {t('projects.description')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      <Contact />
      
      <footer className="py-12 border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Andrea Dávila</h3>
            <p className="text-slate-400">{t('footer.description')}</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

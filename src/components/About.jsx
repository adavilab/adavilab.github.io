import { motion } from 'framer-motion';
import { Brain, Code, Rocket, Users } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-emerald-400" />,
      title: t('about.features.title1'),
      description: t('about.features.description1')
    },
    {
      icon: <Code className="w-8 h-8 text-sky-400" />,
      title: t('about.features.title2'),
      description: t('about.features.description2')
    },
    {
      icon: <Rocket className="w-8 h-8 text-purple-400" />,
      title: t('about.features.title3'),
      description: t('about.features.description3')
    },
    {
      icon: <Users className="w-8 h-8 text-amber-400" />,
      title: t('about.features.title4'),
      description: t('about.features.description4')
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">{t('about.title')}</span>
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
          {t('about.description')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;

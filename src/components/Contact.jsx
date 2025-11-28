import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">{t('contact.title')}</span>
        </h2>
        <p className="text-xl text-slate-300 mb-12 leading-relaxed">
          {t('contact.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6">{t('contact.contactInfo.title')}</h3>
            <div className="space-y-6">
              <a href="mailto:adavilabc@outlook.com" className="flex items-center gap-4 text-slate-300 hover:text-sky-400 transition-colors group">
                <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-sky-500/20 transition-colors">
                  <Mail size={24} />
                </div>
                <span className="text-lg">adavilabc@outlook.com</span>
              </a>
              <a href="#" className="flex items-center gap-4 text-slate-300 hover:text-sky-400 transition-colors group">
                <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-sky-500/20 transition-colors">
                  <Linkedin size={24} />
                </div>
                <span className="text-lg">{t('contact.contactInfo.linkedin')}</span>
              </a>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">{t('contact.form.name')}</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500 text-white placeholder-slate-500 transition-colors"
                placeholder={t('contact.form.namePlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">{t('contact.form.email')}</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500 text-white placeholder-slate-500 transition-colors"
                placeholder={t('contact.form.emailPlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">{t('contact.form.message')}</label>
              <textarea 
                id="message" 
                rows={4} 
                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-lg focus:outline-none focus:border-sky-500 text-white placeholder-slate-500 transition-colors resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {t('contact.form.buttonText')}
              <Send size={20} />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;

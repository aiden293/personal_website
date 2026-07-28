import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="section contact">
      <motion.div
        className="contact__content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <h2>{t('contact.title')}</h2>
        <p>{t('contact.subtitle')}</p>
        <a className="contact__email" href={`mailto:${t('contact.email')}`}>
          {t('contact.email')}
        </a>
        <div className="contact__links">
          <a href="https://github.com/yourname" target="_blank" rel="noreferrer">
            {t('contact.github')}
          </a>
          <a href="https://linkedin.com/in/yourname" target="_blank" rel="noreferrer">
            {t('contact.linkedin')}
          </a>
        </div>
      </motion.div>
    </section>
  )
}

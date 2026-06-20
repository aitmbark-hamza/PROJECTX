import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Check,
  Loader2,
  User,
  Tag,
  MessageSquare,
  Send,
  Navigation,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import { slideFromLeft } from '../../../animations/variants';
import styles from './Contact.module.css';

const MAP_QUERY = '36+Boulevard+du+Nil,+Casablanca+20250,+Maroc';

export default function Contact() {
  const { t } = useTranslation();
  const headlineWords = t('contact.headlineWords', { returnObjects: true });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitState, setSubmitState] = useState('idle');

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState('loading');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (Math.random() > 0.1) {
      setSubmitState('success');
      setTimeout(() => { setSubmitState('idle'); setFormData({ name: '', email: '', subject: '', message: '' }); }, 3000);
    } else {
      setSubmitState('error');
      setTimeout(() => setSubmitState('idle'), 3000);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      {/* Cropped gold/black headline, echoes the reference's big stacked type */}
      <div className={styles.headlineSection}>
        <div className={styles.decorDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.headlineWrap}>
          {Array.isArray(headlineWords) && headlineWords.map((word, i) => (
            <motion.span
              key={word.text}
              className={`${styles.headlineWord} ${word.variant === 'fill' ? styles.headlineFill : styles.headlineOutline}`}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {word.text}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.div
        className={`${styles.container} section-container`}
        variants={slideFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <div className={styles.eyebrowRow}>
              <span className={styles.dash} />
              <span className="section-eyebrow">{t('contact.eyebrow')}</span>
              <span className={styles.dash} />
            </div>
            <h2 className="section-title">{t('contact.title')}</h2>
          </div>
        </ScrollReveal>

        <div className={styles.mapFormGrid}>
          <ScrollReveal direction="left" delay={0.1}>
            <a
              href="https://share.google/VOBqqpUPax1H4q0Xz"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapWrap}
            >
              <iframe
                className={styles.mapFrame}
                title={t('contact.mapTitle')}
                src={`https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <motion.div
                className={styles.mapOverlayCard}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className={styles.mapOverlayName}>{t('contact.addressTitle')}</span>
                <span className={styles.mapOverlayAddress}>
                  {t('contact.address').split('\n').map((line, i) => (
                    <span key={i}>{line}{i === 0 ? <br /> : ''}</span>
                  ))}
                </span>
                <span className={styles.mapOverlayLink}>
                  <Navigation size={13} /> {t('contact.viewOnMap')}
                </span>
              </motion.div>
            </a>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h3 className={styles.formTitle}>{t('contact.formTitle')}</h3>

              <div className={styles.formFields}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder={t('contact.placeholders.name')}
                    value={formData.name}
                    onChange={handleChange('name')}
                    required
                  />
                  <User size={16} className={styles.inputIcon} />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder={t('contact.placeholders.email')}
                    value={formData.email}
                    onChange={handleChange('email')}
                    required
                  />
                  <Mail size={16} className={styles.inputIcon} />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder={t('contact.placeholders.subject')}
                    value={formData.subject}
                    onChange={handleChange('subject')}
                  />
                  <Tag size={16} className={styles.inputIcon} />
                </div>

                <div className={styles.inputGroup}>
                  <textarea
                    className={styles.textarea}
                    rows={4}
                    placeholder={t('contact.placeholders.message')}
                    value={formData.message}
                    onChange={handleChange('message')}
                    required
                  />
                  <MessageSquare size={16} className={styles.inputIconArea} />
                </div>
              </div>

              <motion.button
                type="submit"
                className={`${styles.submit} ${
                  submitState === 'success' ? styles.submitSuccess : ''
                } ${submitState === 'error' ? styles.submitError : ''}`}
                whileHover={submitState === 'idle' ? { scale: 1.01 } : {}}
                whileTap={submitState === 'idle' ? { scale: 0.99 } : {}}
                disabled={submitState !== 'idle'}
              >
                <AnimatePresence mode="wait">
                  {submitState === 'idle' && (
                    <motion.span key="idle" className={styles.submitIdleText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {t('contact.submit')} <Send size={14} />
                    </motion.span>
                  )}
                  {submitState === 'loading' && (
                    <motion.span key="loading" className={styles.submitLoading} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 size={18} className={styles.spinner} /> {t('contact.sending')}
                    </motion.span>
                  )}
                  {submitState === 'success' && (
                    <motion.span key="success" className={styles.submitSuccessText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Check size={18} /> {t('contact.sent')}
                    </motion.span>
                  )}
                  {submitState === 'error' && (
                    <motion.span key="error" className={styles.submitErrorText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {t('contact.error')}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </ScrollReveal>
        </div>

      </motion.div>

    </section>
  );
}
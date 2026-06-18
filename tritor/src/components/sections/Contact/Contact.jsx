import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Check, Loader2 } from 'lucide-react';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import styles from './Contact.module.css';

export default function Contact() {
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
      <div className={`${styles.container} section-container`}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <span className="section-eyebrow">Contact</span>
            <h2 className="section-title">Parlons de Votre Projet</h2>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          <ScrollReveal direction="left" delay={0.1}>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <MapPin size={20} className={styles.infoIcon} />
                <h4 className={styles.infoTitle}>Adresse</h4>
                <p className={styles.infoText}>
                  12 Boulevard Zerktouni<br />
                  Casablanca 20100, Maroc
                </p>
              </div>

              <div className={styles.infoCard}>
                <Phone size={20} className={styles.infoIcon} />
                <h4 className={styles.infoTitle}>Téléphone</h4>
                <p className={styles.infoText}>
                  +212 6 00 00 00 00<br />
                  +212 5 00 00 00 00
                </p>
              </div>

              <div className={styles.infoCard}>
                <Mail size={20} className={styles.infoIcon} />
                <h4 className={styles.infoTitle}>Email</h4>
                <p className={styles.infoText}>
                  contact@tritor.ma<br />
                  reservations@tritor.ma
                </p>
              </div>

              <div className={styles.infoCard}>
                <Clock size={20} className={styles.infoIcon} />
                <h4 className={styles.infoTitle}>Horaires</h4>
                <p className={styles.infoText}>
                  Lun–Sam: 9h – 19h<br />
                  Dimanche: Sur RDV
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formFields}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                />
                <input
                  type="email"
                  className={styles.input}
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  required
                />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Sujet"
                  value={formData.subject}
                  onChange={handleChange('subject')}
                />
                <textarea
                  className={styles.textarea}
                  rows={4}
                  placeholder="Votre message..."
                  value={formData.message}
                  onChange={handleChange('message')}
                  required
                />
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
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Envoyer le Message
                    </motion.span>
                  )}
                  {submitState === 'loading' && (
                    <motion.span key="loading" className={styles.submitLoading} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 size={18} className={styles.spinner} /> Envoi...
                    </motion.span>
                  )}
                  {submitState === 'success' && (
                    <motion.span key="success" className={styles.submitSuccessText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Check size={18} /> Message envoyé !
                    </motion.span>
                  )}
                  {submitState === 'error' && (
                    <motion.span key="error" className={styles.submitErrorText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Veuillez réessayer
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.2}>
          <div className={styles.map}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapPin} />
              <span className={styles.mapCity}>CASABLANCA</span>
              <span className={styles.mapLabel}>12 Boulevard Zerktouni</span>
              <div className={styles.mapGrid} />
            </div>
          </div>
        </ScrollReveal>
      </div>

      <a
        href="https://wa.me/212600000000"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsapp}
        aria-label="Discutez avec nous sur WhatsApp"
      >
        <div className={styles.whatsappRipple} />
        <MessageCircle size={24} />
        <span className={styles.whatsappTooltip}>Discutez avec nous</span>
      </a>
    </section>
  );
}

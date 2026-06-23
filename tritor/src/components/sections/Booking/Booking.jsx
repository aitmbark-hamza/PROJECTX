import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Minus, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Booking.module.css';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
};

export default function Booking({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const eventTypes = t('booking.eventTypes', { returnObjects: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: 50,
    budget: 50000,
    message: '',
  });
  const [submitState, setSubmitState] = useState('idle');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleGuests = (delta) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.max(10, Math.min(1000, prev.guests + delta)),
    }));
  };

  const handleBudget = (e) => {
    setFormData((prev) => ({ ...prev, budget: Number(e.target.value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, eventType, date, guests, budget, message } = formData;

    const text = `*Nouvelle demande de devis - La Table de la Cantine*%0A%0A*Nom :* ${encodeURIComponent(name)}%0A*Email :* ${encodeURIComponent(email)}%0A*Téléphone :* ${encodeURIComponent(phone)}%0A*Type d'événement :* ${encodeURIComponent(eventType)}%0A*Date :* ${encodeURIComponent(date)}%0A*Invites :* ${guests}%0A*Budget :* ${budget} MAD%0A*Message :* ${encodeURIComponent(message)}`;

    setSubmitState('loading');
    await new Promise((resolve) => setTimeout(resolve, 500));

    window.open(`https://wa.me/212650460950?text=${text}`, '_blank');
    setSubmitState('idle');
  };

  const formatBudget = (val) => {
    if (val >= 200000) return t('booking.budgetMax');
    const locale = i18n.language?.slice(0, 2) === 'ar' ? 'ar-MA' : i18n.language?.slice(0, 2) === 'en' ? 'en-US' : 'fr-FR';
    return `${val.toLocaleString(locale)} MAD`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={onClose} aria-label={t('booking.close')}>
              <X size={20} />
            </button>

            <div className={styles.header}>
              <span className="section-eyebrow">{t('booking.eyebrow')}</span>
              <h2 className="section-title">{t('booking.title')}</h2>
            </div>

            <motion.form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>{t('booking.labels.name')}</label>
                  <input type="text" className={styles.input} placeholder={t('booking.placeholders.name')} value={formData.name} onChange={handleChange('name')} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>{t('booking.labels.email')}</label>
                  <input type="email" className={styles.input} placeholder={t('booking.placeholders.email')} value={formData.email} onChange={handleChange('email')} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>{t('booking.labels.phone')}</label>
                  <input type="tel" className={styles.input} placeholder={t('booking.placeholders.phone')} value={formData.phone} onChange={handleChange('phone')} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>{t('booking.labels.eventType')}</label>
                  <select className={styles.select} value={formData.eventType} onChange={handleChange('eventType')} required>
                    <option value="" disabled>{t('booking.placeholders.eventType')}</option>
                    {Array.isArray(eventTypes) && eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>{t('booking.labels.date')}</label>
                  <input type="date" className={styles.input} value={formData.date} onChange={handleChange('date')} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>{t('booking.labels.guests')}</label>
                  <div className={styles.guestsInput}>
                    <button type="button" className={styles.guestsBtn} onClick={() => handleGuests(-10)} aria-label={t('booking.decrease')}><Minus size={16} /></button>
                    <span className={styles.guestsValue}>{formData.guests}</span>
                    <button type="button" className={styles.guestsBtn} onClick={() => handleGuests(10)} aria-label={t('booking.increase')}><Plus size={16} /></button>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  {t('booking.labels.budget')} <span className={styles.budgetValue}>{formatBudget(formData.budget)}</span>
                </label>
                <div className={styles.rangeContainer}>
                  <input type="range" className={styles.range} min={10000} max={200000} step={5000} value={formData.budget} onChange={handleBudget} />
                  <div className={styles.rangeLabels}>
                    <span>{t('booking.budgetMin')}</span>
                    <span>{t('booking.budgetMax')}</span>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>{t('booking.labels.message')}</label>
                <textarea className={styles.textarea} rows={3} placeholder={t('booking.placeholders.message')} value={formData.message} onChange={handleChange('message')} />
              </div>

              <motion.button
                type="submit"
                className={`${styles.submit} ${submitState === 'success' ? styles.submitSuccess : ''} ${submitState === 'error' ? styles.submitError : ''}`}
                whileHover={submitState === 'idle' ? { scale: 1.01 } : {}}
                whileTap={submitState === 'idle' ? { scale: 0.99 } : {}}
                disabled={submitState !== 'idle'}
              >
                <AnimatePresence mode="wait">
                  {submitState === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {t('booking.submit')}
                    </motion.span>
                  )}
                  {submitState === 'loading' && (
                    <motion.span key="loading" className={styles.submitLoading} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 size={18} className={styles.spinner} /> {t('booking.sending')}
                    </motion.span>
                  )}
                  {submitState === 'success' && (
                    <motion.span key="success" className={styles.submitSuccessText} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <Check size={18} /> {t('booking.sent')}
                    </motion.span>
                  )}
                  {submitState === 'error' && (
                    <motion.span key="error" className={styles.submitErrorText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {t('booking.error')}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

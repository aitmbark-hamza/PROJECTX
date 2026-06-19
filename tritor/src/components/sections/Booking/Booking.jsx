import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, Minus, Plus } from 'lucide-react';
import styles from './Booking.module.css';

const eventTypes = [
  'Mariage / Réception',
  'Séminaire / Conférence',
  'Cocktail / Buffet',
  'Anniversaire',
  'Événement d\'Entreprise',
  'Autre',
];

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
    setSubmitState('loading');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() > 0.1) {
      setSubmitState('success');
      setTimeout(() => { setSubmitState('idle'); onClose(); }, 2000);
    } else {
      setSubmitState('error');
      setTimeout(() => setSubmitState('idle'), 3000);
    }
  };

  const formatBudget = (val) => {
    if (val >= 200000) return '200 000+ MAD';
    return `${val.toLocaleString('fr-FR')} MAD`;
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
            <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
              <X size={20} />
            </button>

            <div className={styles.header}>
              <span className="section-eyebrow">Demandez Votre Devis</span>
              <h2 className="section-title">Un Projet en Tête ?</h2>
            </div>

            <motion.form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Nom complet</label>
                  <input type="text" className={styles.input} placeholder="Votre nom" value={formData.name} onChange={handleChange('name')} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input type="email" className={styles.input} placeholder="email@exemple.com" value={formData.email} onChange={handleChange('email')} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Téléphone</label>
                  <input type="tel" className={styles.input} placeholder="+212 6 XX XX XX XX" value={formData.phone} onChange={handleChange('phone')} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Type d'événement</label>
                  <select className={styles.select} value={formData.eventType} onChange={handleChange('eventType')} required>
                    <option value="" disabled>Sélectionnez</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Date souhaitée</label>
                  <input type="date" className={styles.input} value={formData.date} onChange={handleChange('date')} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Nombre d'invités</label>
                  <div className={styles.guestsInput}>
                    <button type="button" className={styles.guestsBtn} onClick={() => handleGuests(-10)} aria-label="Diminuer"><Minus size={16} /></button>
                    <span className={styles.guestsValue}>{formData.guests}</span>
                    <button type="button" className={styles.guestsBtn} onClick={() => handleGuests(10)} aria-label="Augmenter"><Plus size={16} /></button>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  Budget estimé : <span className={styles.budgetValue}>{formatBudget(formData.budget)}</span>
                </label>
                <div className={styles.rangeContainer}>
                  <input type="range" className={styles.range} min={10000} max={200000} step={5000} value={formData.budget} onChange={handleBudget} />
                  <div className={styles.rangeLabels}>
                    <span>10 000 MAD</span>
                    <span>200 000+ MAD</span>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Message</label>
                <textarea className={styles.textarea} rows={3} placeholder="Parlez-nous de votre projet..." value={formData.message} onChange={handleChange('message')} />
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
                      Envoyer la Demande
                    </motion.span>
                  )}
                  {submitState === 'loading' && (
                    <motion.span key="loading" className={styles.submitLoading} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 size={18} className={styles.spinner} /> Envoi en cours...
                    </motion.span>
                  )}
                  {submitState === 'success' && (
                    <motion.span key="success" className={styles.submitSuccessText} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <Check size={18} /> Demande envoyée !
                    </motion.span>
                  )}
                  {submitState === 'error' && (
                    <motion.span key="error" className={styles.submitErrorText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Veuillez réessayer
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

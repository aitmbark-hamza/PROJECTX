import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Minus, Plus } from 'lucide-react';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import styles from './Booking.module.css';

const eventTypes = [
  'Mariage',
  'Fiançailles',
  'Dîner Cocktail',
  'Buffet',
  'Événement Corporate',
  'Autre',
];

export default function Booking() {
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

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
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

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() > 0.1) {
      setSubmitState('success');
      setTimeout(() => setSubmitState('idle'), 3000);
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
    <section className={styles.booking} id="booking">
      <div className={`${styles.container} section-container`}>
        <div className={styles.grid}>
          <ScrollReveal direction="left" className={styles.textSide}>
            <span className="section-eyebrow">Réservez Votre Événement</span>
            <h2 className="section-title">Donnez Vie à Vos Projets</h2>
            <p className={styles.textDesc}>
              Racontez-nous votre vision, nous la transformerons en réalité. 
              Chaque détail compte, chaque instant est précieux.
            </p>
            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <div className={styles.benefitDot} />
                <span>Réponse sous 24h</span>
              </div>
              <div className={styles.benefit}>
                <div className={styles.benefitDot} />
                <span>Consultation gratuite</span>
              </div>
              <div className={styles.benefit}>
                <div className={styles.benefitDot} />
                <span>Devis personnalisé</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <motion.form
              className={styles.form}
              onSubmit={handleSubmit}
              initial={false}
            >
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Nom complet</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange('name')}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="email@exemple.com"
                    value={formData.email}
                    onChange={handleChange('email')}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Téléphone</label>
                  <input
                    type="tel"
                    className={styles.input}
                    placeholder="+212 6 XX XX XX XX"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Type d'événement</label>
                  <select
                    className={styles.select}
                    value={formData.eventType}
                    onChange={handleChange('eventType')}
                    required
                  >
                    <option value="" disabled>Sélectionnez</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Date souhaitée</label>
                  <input
                    type="date"
                    className={styles.input}
                    value={formData.date}
                    onChange={handleChange('date')}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Nombre d'invités</label>
                  <div className={styles.guestsInput}>
                    <button
                      type="button"
                      className={styles.guestsBtn}
                      onClick={() => handleGuests(-10)}
                      aria-label="Diminuer"
                    >
                      <Minus size={16} />
                    </button>
                    <span className={styles.guestsValue}>{formData.guests}</span>
                    <button
                      type="button"
                      className={styles.guestsBtn}
                      onClick={() => handleGuests(10)}
                      aria-label="Augmenter"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  Budget estimé : <span className={styles.budgetValue}>{formatBudget(formData.budget)}</span>
                </label>
                <div className={styles.rangeContainer}>
                  <input
                    type="range"
                    className={styles.range}
                    min={10000}
                    max={200000}
                    step={5000}
                    value={formData.budget}
                    onChange={handleBudget}
                  />
                  <div className={styles.rangeLabels}>
                    <span>10 000 MAD</span>
                    <span>200 000+ MAD</span>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Message</label>
                <textarea
                  className={styles.textarea}
                  rows={4}
                  placeholder="Parlez-nous de votre projet..."
                  value={formData.message}
                  onChange={handleChange('message')}
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
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Envoyer la Demande
                    </motion.span>
                  )}
                  {submitState === 'loading' && (
                    <motion.span
                      key="loading"
                      className={styles.submitLoading}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Loader2 size={18} className={styles.spinner} />
                      Envoi en cours...
                    </motion.span>
                  )}
                  {submitState === 'success' && (
                    <motion.span
                      key="success"
                      className={styles.submitSuccessText}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Check size={18} />
                      Demande envoyée !
                    </motion.span>
                  )}
                  {submitState === 'error' && (
                    <motion.span
                      key="error"
                      className={styles.submitErrorText}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Veuillez réessayer
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

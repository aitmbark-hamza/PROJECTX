import { useState, useEffect, useRef } from 'react';
import styles from './OurStory.module.css';

const storyTimeline = [
  {
    id: 1,
    number: '2015',
    category: 'NOTRE',
    categoryHighlight: 'HISTOIRE',
    title: 'Le premier pas\nde TAZI',
    description: "En 2015, TAZI a lancé son aventure avec une vision claire : réinventer l'art du service traiteur et l'organisation d'événements avec élégance et professionnalisme. Chaque réception mérite un niveau d'excellence exceptionnel.",
    image: '/images/hero-1.webp',
  },
  {
    id: 2,
    number: '2018',
    category: "L'ART DE LA",
    categoryHighlight: 'RÉCEPTION',
    title: 'Une identité\nforte',
    description: "Au fil des années, TAZI a développé une identité unique fondée sur la qualité, la créativité et le raffinement. Chaque détail est pensé pour offrir une expérience mémorable aux invités.",
    image: '/images/gallery-8.webp',
  },
  {
    id: 3,
    number: '2022',
    category: 'UN SAVOIR-FAIRE',
    categoryHighlight: 'RECONNU',
    title: 'Un rayonnement\nrégional',
    description: "Fort de sa réputation, TAZI étend son savoir-faire à travers tout le Maroc. Chaque événement devient une signature, chaque prestation une référence dans l'art de la réception.",
    image: '/images/gallery-1.webp',
  },
  {
    id: 4,
    number: '2025',
    category: "L'EXCELLENCE",
    categoryHighlight: 'AU SERVICE',
    title: 'Des événements\ninoubliables',
    description: "Mariages, fiançailles, cocktails et grandes réceptions : TAZI continue de transformer chaque célébration en un moment unique, marqué par le professionnalisme et l'élégance.",
    image: '/images/gallery-4.webp',
  },
  {
    id: 5,
    number: '2026',
    category: 'L\'AVENIR',
    categoryHighlight: 'S\'ÉCRIT',
    title: 'Une vision\ntoujours plus loin',
    description: "En 2026, TAZI regarde vers l'avenir avec ambition. Nouveaux espaces, nouvelles collaborations, toujours plus d'exigence pour offrir le meilleur de la gastronomie événementielle.",
    image: '/images/gallery-3.webp',
  },
];

export default function OurStorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: '-25% 0px -25% 0px',
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className={styles.wrapper} id="our-story">
      <div className={styles.stickyImage}>
        <div className={styles.imageWrapper}>
          {storyTimeline.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.imageSlide} ${
                index === activeIndex ? styles.active : ''
              } ${index < activeIndex ? styles.slideUp : ''}`}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
          ))}
        </div>

        <div className={styles.verticalLabel}>
          <span>NOTRE HISTOIRE</span>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ height: `${((activeIndex + 1) / storyTimeline.length) * 100}%` }}
          />
        </div>
      </div>

      <div className={styles.scrollContent}>
        {storyTimeline.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={styles.projectSection}
          >
            <div className={styles.bgNumber}>
              <span className={index === activeIndex ? styles.active : ''}>
                {item.number}
              </span>
            </div>

            <div className={styles.content}>
              <div className={styles.category}>
                <span className={styles.line}></span>
                <span className={styles.categoryText}>
                  {item.category}{' '}
                  <span className={styles.highlight}>
                    {item.categoryHighlight}
                  </span>
                </span>
              </div>

              <h2 className={`${styles.title} ${index === activeIndex ? styles.animate : ''}`}>
                {item.title.split('\n').map((line, i) => (
                  <span
                    key={i}
                    className={styles.titleLine}
                    style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                  >
                    {line}
                  </span>
                ))}
              </h2>

              <p className={`${styles.description} ${index === activeIndex ? styles.animate : ''}`}>
                {item.description}
              </p>
            </div>

            <div className={styles.sectionIndicator}>
              <span className={styles.current}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.divider}>/</span>
              <span className={styles.total}>{String(storyTimeline.length).padStart(2, '0')}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

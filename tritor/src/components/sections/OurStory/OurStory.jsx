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
    image: '/images/story1.webp',
  },
  {
    id: 2,
    number: '2018',
    category: "L'ART DE LA",
    categoryHighlight: 'RÉCEPTION',
    title: 'Une identité\nforte',
    description: "Au fil des années, TAZI a développé une identité unique fondée sur la qualité, la créativité et le raffinement. Chaque détail est pensé pour offrir une expérience mémorable aux invités.",
    image: '/images/story2.webp',
  },
  {
    id: 3,
    number: '2025',
    category: "L'EXCELLENCE",
    categoryHighlight: 'AU SERVICE',
    title: 'Des événements\ninoubliables',
    description: "Mariages, fiançailles, cocktails et grandes réceptions : TAZI continue de transformer chaque célébration en un moment unique, marqué par le professionnalisme et l'élégance.",
    image: '/images/story3.webp',
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
              <img src={item.image} alt={item.title} />
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
            className={styles.storySection}
          >
            <div className={styles.bgNumber}>
              <span className={index === activeIndex ? styles.active : ''}>
                {item.number}
              </span>
            </div>

            <div className={styles.content}>
              <div className={styles.storyCategory}>
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

              <a
                href="#contact"
                className={`${styles.discoverBtn} ${index === activeIndex ? styles.animate : ''}`}
              >
                <span>Découvrir notre histoire</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
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

import { useState, useEffect, useRef } from 'react';
import styles from './OurStory.module.css';

const storyTimeline = [
  {
    id: 1,
    number: '2015',
    category: 'LE PREMIER PAS',
    categoryHighlight: 'DE TAZI',
    title: 'Une aventure\ngastronomique',
    description: "En 2015, mon aventure a commencé. Moi, TAZI, j'ai lancé ce projet avec une vision claire : redéfinir l'art du service traiteur et de l'organisation d'événements. Tout a démarré d'une conviction profonde : chaque célébration, qu'elle soit un mariage intimiste ou une grande réception officielle, mérite d'être orchestrée avec le plus haut niveau de professionnalisme et de créativité.",
  },
  {
    id: 2,
    number: '2018',
    category: "L'ART DE LA",
    categoryHighlight: 'RÉCEPTION',
    title: 'Une identité\nforte',
    description: "Au fil des années, TAZI a développé une identité unique fondée sur la qualité, la créativité et le raffinement. Chaque détail est pensé pour offrir une expérience mémorable aux invités. Du raffinement des saveurs à l'élégance de la mise en scène, nous avons fait de la perfection notre signature.",
  },
  {
    id: 3,
    number: '2026',
    category: "L'EXCELLENCE",
    categoryHighlight: 'AU SERVICE',
    title: 'Des événements\ninoubliables',
    description: "Mariages, fiançailles, cocktails et grandes réceptions : TAZI continue de transformer chaque célébration en un moment unique, marqué par le professionnalisme et l'élégance. Quand l'art de la réception rencontre la rigueur de la gestion, chaque prestation devient une référence dans l'art de la gastronomie événementielle.",
  },
];

export default function OurStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef([]);
  const wrapperRef = useRef(null);

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

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const progressHeight = ((activeIndex + 1) / storyTimeline.length) * 100;

  return (
    <section
      ref={wrapperRef}
      className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}
      id="our-story"
    >
      <div className={styles.stickySide}>
        <div className={styles.stickyBg}>
          <div className={styles.goldGlow} />
          <div className={styles.diagonalPattern} />
          <div className={styles.cornerTopLeft} />
          <div className={styles.cornerBottomRight} />

          <div className={styles.centerGroup}>
            <div className={styles.ornamentalLine} />
            <div className={styles.ornamentalDiamond} />
            <div className={styles.ornamentalLine} />
          </div>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ height: `${progressHeight}%` }}
          />
        </div>
      </div>

      <div className={styles.scrollContent}>
        {storyTimeline.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`${styles.storySection} ${index === activeIndex ? styles.active : ''}`}
          >
            <div className={styles.bgNumber}>
              <span className={index === activeIndex ? styles.bgNumberVisible : ''}>
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

              <h2 className={styles.title}>
                {item.title.split('\n').map((line, i) => (
                  <span
                    key={i}
                    className={`${styles.titleLine} ${index === activeIndex ? styles.titleLineVisible : ''}`}
                    style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
                  >
                    {line}
                  </span>
                ))}
              </h2>

              <p className={`${styles.description} ${index === activeIndex ? styles.descriptionVisible : ''}`}>
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

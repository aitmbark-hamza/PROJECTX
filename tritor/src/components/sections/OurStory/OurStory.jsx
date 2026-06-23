import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './OurStory.module.css';

export default function OurStory() {
  const { t } = useTranslation();
  const storyTimeline = t('ourStory.timeline', { returnObjects: true });
  const heading = t('ourStory.heading');
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

  return (
    <section
      ref={wrapperRef}
      className={`${styles.wrapper} ${isVisible ? styles.visible : ''}`}
      id="our-story"
    >
      <div className={styles.scrollContent}>
        <h1 className={styles.sectionHeading}>{heading}</h1>
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
import styles from './GoldLine.module.css';

export default function GoldLine({ width = '80px', height = '1px', className = '' }) {
  return (
    <span
      className={`${styles.line} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

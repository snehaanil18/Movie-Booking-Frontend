import React from 'react';
import styles from './card.module.css';

interface CardProps {
  title: string;
  content: {
    [key: string]: string | number | React.ReactNode; // Allow JSX nodes
  };
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, content, image, imageWidth = 100, imageHeight = 100, children, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {image && <img src={image} alt={title} width={imageWidth} height={imageHeight} className={styles.cardImage} />}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardDetails}>
          {Object.keys(content).map((key) => (
            <p key={key} className={styles.cardDetail}>
              {typeof content[key] === 'string' || typeof content[key] === 'number' ? (
                <>
                  <strong>{key}:</strong> {content[key]}
                </>
              ) : (
                // If the content is a React node, render it directly
                content[key]
              )}
            </p>
          ))}
        </div>
        {children && <div className={styles.cardChildren}>{children}</div>}
      </div>
    </div>
  );
};

export default Card;

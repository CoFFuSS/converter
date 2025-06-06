import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    fullScreen?: boolean;
}

export function Loader({ size = 'md', text, fullScreen = false }: LoaderProps) {
    const loaderClasses = [
        styles.loader,
        styles[`loader${size.charAt(0).toUpperCase() + size.slice(1)}`]
    ].join(' ');

    const content = (
        <div className={styles.loaderContainer}>
            <div className={loaderClasses}>
                <div className={styles.spinner}></div>
                <div className={styles.spinner}></div>
                <div className={styles.spinner}></div>
            </div>
            {text && <p className={styles.loaderText}>{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className={styles.fullScreenLoader}>
                {content}
            </div>
        );
    }

    return content;
} 
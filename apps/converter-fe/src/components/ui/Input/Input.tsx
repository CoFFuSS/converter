import React, { useId } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export function Input({
    label,
    error,
    helperText,
    className = '',
    id,
    ...props
}: InputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;

    const inputClasses = `${styles.input} ${error ? styles.inputError : ''} ${className}`;
    const labelClasses = `${styles.label} ${error ? styles.labelError : ''}`;

    return (
        <div className={styles.container}>
            {label && (
                <label
                    htmlFor={inputId}
                    className={labelClasses}
                >
                    {label}
                </label>
            )}

            <input
                id={inputId}
                className={inputClasses}
                {...props}
            />

            {error && (
                <p className={styles.errorMessage} role="alert">
                    {error}
                </p>
            )}

            {!error && helperText && (
                <p className={styles.helperText}>
                    {helperText}
                </p>
            )}
        </div>
    );
} 
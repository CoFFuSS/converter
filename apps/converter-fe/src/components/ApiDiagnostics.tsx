'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '../lib/api-service';
import { Button } from './ui/Button';
import { Alert } from './ui/Alert';

interface ApiStatus {
    isConnected: boolean;
    baseUrl: string;
    lastChecked: Date | null;
    error?: string;
}

export function ApiDiagnostics() {
    const [status, setStatus] = useState<ApiStatus>({
        isConnected: false,
        baseUrl: apiService.getBaseUrl(),
        lastChecked: null,
    });
    const [isChecking, setIsChecking] = useState(false);
    const [customUrl, setCustomUrl] = useState('');

    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        setIsChecking(true);
        try {
            // Пробуем разные возможные URLs
            const urls = [
                apiService.getBaseUrl(),
                'http://localhost:3001',
                'http://localhost:3000',
                'http://localhost:3000/api',
                'http://localhost:8080',
            ];

            let connected = false;
            let workingUrl = '';

            for (const url of urls) {
                try {
                    console.log(`Проверяем соединение с: ${url}`);
                    apiService.updateBaseUrl(url);

                    // Попробуем простой запрос
                    const response = await fetch(`${url}/auth/profile`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.status !== 500) { // Даже 401 означает что сервер отвечает
                        connected = true;
                        workingUrl = url;
                        break;
                    }
                } catch (error) {
                    console.log(`${url} недоступен:`, error);
                }
            }

            setStatus({
                isConnected: connected,
                baseUrl: workingUrl || apiService.getBaseUrl(),
                lastChecked: new Date(),
                error: connected ? undefined : 'Не удается подключиться ни к одному из серверов',
            });

            if (connected && workingUrl !== apiService.getBaseUrl()) {
                apiService.updateBaseUrl(workingUrl);
            }
        } catch (error: any) {
            setStatus({
                isConnected: false,
                baseUrl: apiService.getBaseUrl(),
                lastChecked: new Date(),
                error: error.message,
            });
        } finally {
            setIsChecking(false);
        }
    };

    const updateApiUrl = () => {
        if (customUrl.trim()) {
            apiService.updateBaseUrl(customUrl.trim());
            setStatus(prev => ({ ...prev, baseUrl: customUrl.trim() }));
            checkConnection();
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            minWidth: '300px',
            maxWidth: '400px',
            zIndex: 1000,
        }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
                Диагностика API
            </h3>

            <div style={{ marginBottom: '12px' }}>
                <strong>Статус:</strong>{' '}
                <span style={{
                    color: status.isConnected ? '#10b981' : '#ef4444',
                    fontWeight: '500'
                }}>
                    {status.isConnected ? '✅ Подключено' : '❌ Не подключено'}
                </span>
            </div>

            <div style={{ marginBottom: '12px' }}>
                <strong>URL:</strong> <code style={{
                    background: '#f3f4f6',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    fontSize: '12px'
                }}>
                    {status.baseUrl}
                </code>
            </div>

            {status.lastChecked && (
                <div style={{ marginBottom: '12px', fontSize: '14px', color: '#6b7280' }}>
                    Последняя проверка: {status.lastChecked.toLocaleTimeString()}
                </div>
            )}

            {status.error && (
                <Alert
                    type="error"
                    message={status.error}
                    onClose={() => setStatus(prev => ({ ...prev, error: undefined }))}
                />
            )}

            <div style={{ marginBottom: '12px' }}>
                <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="Введите URL API (например: http://localhost:3001)"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        fontSize: '14px',
                        marginBottom: '8px'
                    }}
                />
                <Button
                    size="sm"
                    onClick={updateApiUrl}
                    disabled={!customUrl.trim()}
                    style={{ marginRight: '8px' }}
                >
                    Установить URL
                </Button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                    size="sm"
                    onClick={checkConnection}
                    loading={isChecking}
                >
                    Проверить соединение
                </Button>
            </div>

            <div style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280' }}>
                💡 Убедитесь что бэкенд запущен на одном из портов: 3000, 3001, 8080
            </div>
        </div>
    );
} 
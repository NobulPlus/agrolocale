'use client';

import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './ReferralForm.module.css';

// Paste your Apps Script deployment URL here.
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzhastDwwJTqzRugEo3BC-2X6xUKtdbsGIp246K_hKkvZQSWhic06JtHmui3g9Lanai/exec";

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * NOTE: because this reads useSearchParams(), the page that renders this
 * component must wrap it in <Suspense> for `next build` with output: 'export'
 * to work, e.g.:
 *
 *   <Suspense fallback={null}>
 *     <ReferralForm />
 *   </Suspense>
 */
export default function ReferralForm() {
    const searchParams = useSearchParams();
    const referredBy = searchParams.get('ref') || '';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<Status>('idle');
    const [message, setMessage] = useState('');
    const [referralLink, setReferralLink] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const res = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                // text/plain avoids a CORS preflight that Apps Script can't answer.
                // Apps Script still reads the body with JSON.parse() on its side.
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ name, email, referredBy }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setReferralLink(`${window.location.origin}/register?ref=${data.referralCode}`);
            } else {
                setStatus('error');
                setMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setMessage('Network error. Please check your connection and try again.');
        }
    }

    if (status === 'success') {
        return (
            <div className={styles.successCard}>
                <p className={styles.successMessage}>You&apos;re registered! Share your link:</p>
                <input
                    readOnly
                    value={referralLink}
                    onFocus={(e) => e.target.select()}
                    className={styles.input}
                />
                <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(referralLink)}
                    className={styles.secondaryButton}
                >
                    Copy link
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {referredBy && (
                <p className={styles.referredBy}>Referred by: {referredBy}</p>
            )}

            <div className={styles.field}>
                <label className={styles.label}>Full name</label>
                <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className={styles.submitButton}
            >
                {status === 'loading' ? 'Submitting…' : 'Register'}
            </button>

            {status === 'error' && <p className={styles.errorText}>{message}</p>}
        </form>
    );
}
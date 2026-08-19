'use client';

import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './ReferralForm.module.css';

// Paste your Apps Script deployment URL here.
// const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5cqeqgOCRsbAqCJS5irR4CwPg2mesLq-uFoPJeuwcuEB5EkT7V5O_0L7s45x0WI1P/exec";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmVU2vhQLPBFAZd0RYYn1EIHZ1PyQKztVxZaPDU47gT8BHYXKFwUUrSVjXAGtbUxo2/exec"

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
    const uplineDisplay = referredBy ? `Yes — referred by ${referredBy}` : 'No';
 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [realtorStatus, setRealtorStatus] = useState('');
    const [birthday, setBirthday] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [realtorsGroup, setRealtorsGroup] = useState('');
 
    const [status, setStatus] = useState<Status>('idle');
    const [message, setMessage] = useState('');
    const [referralLink, setReferralLink] = useState('');

    const [copied, setCopied] = useState(false);


    const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink)
    setCopied(true)

    setTimeout(() => {
        setCopied(false)
    }, 2000)
}
 
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
                body: JSON.stringify({
                    name,
                    email,
                    whatsapp,
                    realtorStatus,
                    birthday,
                    bankName,
                    accountNumber,
                    accountName,
                    realtorsGroup,
                    referredBy,
                }),
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
 
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroBg} aria-hidden />
                <div className="container">
                    <div className={styles.heroContent}>
                        <p className={styles.heroTag}>Realtor Partner Program</p>
                        <h1 className={styles.heroTitle}>Register as an Agrolocale Realtor</h1>
                        <p className={styles.heroSub}>
                            Fill out this form to join our realtor network, receive your unique referral link, and start earning commissions from verified land sales.
                        </p>
                    </div>
                </div>
            </section>
 
            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.formCard}>
                        {status === 'success' ? (
                            <div className={styles.successCard}>
                                <p className={styles.successMessage}>You&apos;re now registered as an Agrolocale realtor.</p>
                                <p className={styles.successSubtext}>Share your referral link so others can register under you as your downlines..</p>
                                <input
                                    readOnly
                                    value={referralLink}
                                    onFocus={(e) => e.target.select()}
                                    className={styles.input}
                                />
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className={styles.secondaryButton}
                                >
                                    {copied ? 'Copied!' : 'Copy referral link'}
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className={styles.formTitle}>Realtor Registration Form</h2>
                                <p className={styles.formIntro}>Complete your details below to activate your realtor profile and get started with referrals.</p>
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
                                            placeholder="e.g. Adaora Okonkwo"
                                        />
                                    </div>
 
                                    <div className={styles.field}>
                                        <label className={styles.label}>Work email</label>
                                        <input
                                            required
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={styles.input}
                                            placeholder="you@agency.com"
                                        />
                                    </div>
 
                                    <div className={styles.field}>
                                        <label className={styles.label}>WhatsApp number</label>
                                        <input
                                            required
                                            type="tel"
                                            value={whatsapp}
                                            onChange={(e) => setWhatsapp(e.target.value)}
                                            className={styles.input}
                                            placeholder="e.g. 08012345678"
                                        />
                                    </div>
 
                                    <div className={styles.field}>
                                        <label className={styles.label}>Are you an existing or newbie realtor?</label>
                                        <select
                                            required
                                            value={realtorStatus}
                                            onChange={(e) => setRealtorStatus(e.target.value)}
                                            className={styles.input}
                                        >
                                            <option value="" disabled>Select one</option>
                                            <option value="Existing Realtor">Existing Realtor</option>
                                            <option value="Newbie Realtor">Newbie Realtor</option>
                                        </select>
                                    </div>
 
                                    <div className={styles.field}>
                                        <label className={styles.label}>Birthday</label>
                                        <input
                                            required
                                            type="date"
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>
 
                                    <div className={styles.field}>
                                        <label className={styles.label}>Bank name</label>
                                        <input
                                            required
                                            value={bankName}
                                            onChange={(e) => setBankName(e.target.value)}
                                            className={styles.input}
                                            placeholder="e.g. GTBank"
                                        />
                                    </div>
 
                                    <div className={styles.field}>
                                        <label className={styles.label}>Account number</label>
                                        <input
                                            required
                                            value={accountNumber}
                                            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                                            className={styles.input}
                                            placeholder="10-digit account number"
                                            inputMode="numeric"
                                            pattern="\d{10}"
                                            maxLength={10}
                                            title="Enter a 10-digit account number"
                                        />
                                    </div>
 
                                    <div className={styles.field}>
                                        <label className={styles.label}>Account name</label>
                                        <input
                                            required
                                            value={accountName}
                                            onChange={(e) => setAccountName(e.target.value)}
                                            className={styles.input}
                                            placeholder="Name on the bank account"
                                        />
                                    </div>
 
                                    <div className={styles.field}>
                                        <label className={styles.label}>Realtors group</label>
                                        <input
                                            required
                                            value={realtorsGroup}
                                            onChange={(e) => setRealtorsGroup(e.target.value)}
                                            className={styles.input}
                                            placeholder="Which realtors group are you part of?"
                                        />
                                    </div>
 
                                    <div className={styles.field}>
                                        <label className={styles.label}>Do you have an upline?</label>
                                        <input
                                            readOnly
                                            disabled
                                            value={uplineDisplay}
                                            className={styles.input}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={styles.submitButton}
                                    >
                                        {status === 'loading' ? 'Submitting...' : 'Register as Realtor'}
                                    </button>

                                    {status === 'error' && <p className={styles.errorText}>{message}</p>}
                                    <p className={styles.formNote}>After registration, your referral link will be generated instantly for downline registration.</p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
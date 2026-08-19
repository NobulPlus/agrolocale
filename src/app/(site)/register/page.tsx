import { Suspense } from 'react';
import ReferralForm from '@/components/ReferralForm';
import styles from './register.module.css';

export default function RegisterPage() {
    return (
        <main className={styles.main}>
            <h1 className={styles.heading}>Register</h1>
            <Suspense fallback={null}>
                <ReferralForm />
            </Suspense>
        </main>
    );
}
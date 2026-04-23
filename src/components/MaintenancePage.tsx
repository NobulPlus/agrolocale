import React from 'react';
import styles from './MaintenancePage.module.css';

export default function MaintenancePage() {
  return (
    <div className={styles.maintenanceContainer}>
      <div className={styles.overlay}></div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.brand}>
          <span className={styles.logoText}>Agro<span className={styles.logoAccent}>locale</span></span>
        </div>
        
        <h1 className={styles.title}>We're Cultivating Something Amazing</h1>
        <p className={styles.subtitle}>
          Our platform is currently undergoing scheduled maintenance right now as we prepare to launch our premium agro-realty experience. We'll be back shortly.
        </p>

        <div className={styles.loader}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>

        <div className={styles.footer}>
          &copy; {new Date().getFullYear()} Agrolocale. All rights reserved.
        </div>
      </div>
    </div>
  );
}


'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './contact.module.css'

type Form = {
  name: string; email: string; phone: string
  subject: string; propType: string; budget: string; message: string
}

const blank: Form = { name:'', email:'', phone:'', subject:'', propType:'', budget:'', message:'' }

export default function ContactPage() {
  const [form,      setForm]      = useState<Form>(blank)
  const [submitted, setSubmitted] = useState(false)
  const [errors,    setErrors]    = useState<Partial<Form>>({})

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const validate = (): boolean => {
    const e: Partial<Form> = {}
    if (!form.name.trim())    e.name    = 'Full name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    if (!form.subject)        e.subject = 'Please select a subject'
    if (!form.message.trim()) e.message = 'Message cannot be empty'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  return (
    <main>
      {/* ─── HEADER ──────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden />
        <div className="container">
          <div className={styles.heroContent}>
            <p className={styles.heroTag}>Get In Touch</p>
            <h1 className={styles.heroTitle}>We're Here to Help You Find Your Land</h1>
            <p className={styles.heroSub}>
              Our expert consultants are ready to guide you through every step of the acquisition process.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CONTACT GRID ────────────────────────────── */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.grid}>

            {/* ── Form ──────────────────────────────── */}
            <div className={styles.formBox}>
              {submitted ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>✅</div>
                  <h2 className={styles.successTitle}>Message Received!</h2>
                  <p className={styles.successText}>Thank you for reaching out. One of our consultants will get back to you within 24 hours.</p>
                  <button
                    id="send-another"
                    className={styles.sendAnother}
                    onClick={() => { setSubmitted(false); setForm(blank); setErrors({}) }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className={styles.formTitle}>Send Us a Message</h2>
                  <p className={styles.formSub}>Fill in your details and we'll reply within 24 hours.</p>

                  <form id="contact-form" className={styles.form} onSubmit={submit} noValidate>
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label htmlFor="cf-name" className={styles.label}>Full Name *</label>
                        <input id="cf-name" name="name" type="text" value={form.name} onChange={change}
                          className={`${styles.input} ${errors.name ? styles.inputErr : ''}`}
                          placeholder="Emeka Okonkwo" />
                        {errors.name && <span className={styles.err}>{errors.name}</span>}
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="cf-email" className={styles.label}>Email Address *</label>
                        <input id="cf-email" name="email" type="email" value={form.email} onChange={change}
                          className={`${styles.input} ${errors.email ? styles.inputErr : ''}`}
                          placeholder="emeka@example.com" />
                        {errors.email && <span className={styles.err}>{errors.email}</span>}
                      </div>
                    </div>

                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label htmlFor="cf-phone" className={styles.label}>Phone Number</label>
                        <input id="cf-phone" name="phone" type="tel" value={form.phone} onChange={change}
                          className={styles.input} placeholder="+234 801 234 5678" />
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="cf-subject" className={styles.label}>Subject *</label>
                        <select id="cf-subject" name="subject" value={form.subject} onChange={change}
                          className={`${styles.select} ${errors.subject ? styles.inputErr : ''}`}>
                          <option value="">Select a subject…</option>
                          <option value="buy">I want to buy land</option>
                          <option value="sell">I want to sell land</option>
                          <option value="list">List my property</option>
                          <option value="inquiry">General inquiry</option>
                          <option value="partnership">Partnership opportunity</option>
                        </select>
                        {errors.subject && <span className={styles.err}>{errors.subject}</span>}
                      </div>
                    </div>

                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label htmlFor="cf-proptype" className={styles.label}>Property Type</label>
                        <select id="cf-proptype" name="propType" value={form.propType} onChange={change} className={styles.select}>
                          <option value="">Any type</option>
                          <option value="arable">Arable Farmland</option>
                          <option value="plantation">Plantation</option>
                          <option value="ranch">Ranch & Pasture</option>
                          <option value="irrigated">Irrigated Plot</option>
                          <option value="mixed">Mixed Farmland</option>
                        </select>
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="cf-budget" className={styles.label}>Budget Range</label>
                        <select id="cf-budget" name="budget" value={form.budget} onChange={change} className={styles.select}>
                          <option value="">Select budget</option>
                          <option value="under50">Under ₦50M</option>
                          <option value="50-100">₦50M – ₦100M</option>
                          <option value="100-250">₦100M – ₦250M</option>
                          <option value="250-500">₦250M – ₦500M</option>
                          <option value="over500">Over ₦500M</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="cf-message" className={styles.label}>Your Message *</label>
                      <textarea id="cf-message" name="message" rows={5} value={form.message} onChange={change}
                        className={`${styles.textarea} ${errors.message ? styles.inputErr : ''}`}
                        placeholder="Tell us what you're looking for, any specific requirements, or questions you have…" />
                      {errors.message && <span className={styles.err}>{errors.message}</span>}
                    </div>

                    <button id="submit-contact" type="submit" className={styles.submitBtn}>
                      Send Message →
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* ── Info panel ────────────────────────── */}
            <aside className={styles.infoCol}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Contact Information</h3>
                <ul className={styles.infoList}>
                  {[
                    { icon: '📍', lbl: 'Office Address',    val: 'Agrolocale HQ\nAyobola Daodu, Lekki Scheme II\nAjah, Lagos State' },
                    { icon: '📞', lbl: 'Phone',              val: '+234 707 152 3904\n+234 901 045 8648' },
                    { icon: '✉️', lbl: 'Email',              val: 'info@agrolocale.com\ncustomercare@agrolocale.com' },
                    { icon: '🕐', lbl: 'Office Hours',       val: 'Mon – Thursday: 9am – 4pm\nFriday: 10am – 4pm' },
                  ].map((item, i) => (
                    <li key={i} className={styles.infoItem}>
                      <span className={styles.infoIcon}>{item.icon}</span>
                      <div>
                        <div className={styles.infoLbl}>{item.lbl}</div>
                        <div className={styles.infoVal}>{item.val}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className={styles.socials}>
                  {['📘 Facebook','🐦 Twitter','📸 Instagram','💼 LinkedIn'].map(s => (
                    <a key={s} href="#" className={styles.social} aria-label={s.split(' ')[1]}>{s.split(' ')[0]}</a>
                  ))}
                </div>
              </div>

              {/* Map link */}
              <a href="https://maps.app.goo.gl/ZQu3b8ZezYgpNgwr8" target="_blank" rel="noopener noreferrer" className={styles.mapCard}>
                <div className={styles.mapInner}>
                  <span className={styles.mapPin}>📍</span>
                  <p className={styles.mapCity}>Ajah, Lagos State</p>
                  <p className={styles.mapNote}>Open in Google Maps</p>
                </div>
              </a>

              {/* Urgent CTA */}
              <div className={styles.urgentCard}>
                <div className={styles.urgentIcon}>📞</div>
                <div>
                  <h4 className={styles.urgentTitle}>Need urgent help?</h4>
                  <p className={styles.urgentSub}>Our consultants are available for direct calls.</p>
                </div>
                <a href="tel:+2347071523904" className={styles.callBtn}>Call Now</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── FAQ STRIP ───────────────────────────────── */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqGrid}>
            {[
              { q: 'How long does it take to close a deal?',             a: 'Most transactions close within 4 – 8 weeks depending on due diligence and documentation.' },
              { q: 'Are all listings physically verified?',              a: 'Yes. Every listing goes through a mandatory on-site inspection by our certified field agents.' },
              { q: 'Can I sell my land through Agrolocale?',            a: 'Absolutely. Contact us to list your property and reach thousands of qualified buyers.' },
              { q: 'Do you offer financing options?',                    a: 'We partner with agricultural finance institutions and can connect you with suitable options.' },
            ].map((f, i) => (
              <div key={i} className={styles.faqCard}>
                <h4 className={styles.faqQ}>{f.q}</h4>
                <p className={styles.faqA}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

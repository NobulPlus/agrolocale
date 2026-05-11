'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './contact.module.css'

type Form = {
  name: string; email: string; phone: string
  subject: string; budget: string; message: string
}

const blank: Form = { name:'', email:'', phone:'', subject:'', budget:'', message:'' }

/* ─── Web3Forms access key ───────────────────────────────────────────────────
   1. Go to https://web3forms.com  →  enter info@agrolocale.com  →  click "Create Access Key"
   2. Check your inbox and copy the key
   3. Add to .env.local:  NEXT_PUBLIC_WEB3FORMS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ─────────────────────────────────────────────────────────────────────────── */
const W3F_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''

export default function ContactPage() {
  const [form,      setForm]      = useState<Form>(blank)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [serverErr, setServerErr] = useState('')
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setServerErr('')

    try {
      const payload = {
        access_key: W3F_KEY,
        subject:    `Agrolocale enquiry – ${form.subject} (${form.name})`,
        from_name:  'Agrolocale Contact Form',
        name:       form.name,
        email:      form.email,
        phone:      form.phone   || '—',
        enquiry:    form.subject,
        budget:     form.budget   || '—',
        message:    form.message,
      }

      const res  = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        setServerErr(data.message ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setServerErr('Network error — please check your connection and try again.')
    } finally {
      setLoading(false)
    }
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

                  {serverErr && (
                    <div className={styles.serverErr} role="alert">
                      ⚠️ {serverErr}
                    </div>
                  )}

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
                          <option value="cultivate">I want to cultivate / start farming</option>
                          <option value="invest">I want to invest in a farm plot</option>
                          <option value="buy-land">I want to acquire farmland</option>
                          <option value="produce">I want to buy farm produce</option>
                          <option value="garri-go">Order Garri Go!</option>
                          <option value="partnership">Partnership / Business opportunity</option>
                          <option value="inquiry">General enquiry</option>
                        </select>
                        {errors.subject && <span className={styles.err}>{errors.subject}</span>}
                      </div>
                    </div>

                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label htmlFor="cf-budget" className={styles.label}>Budget / Investment Range</label>
                        <select id="cf-budget" name="budget" value={form.budget} onChange={change} className={styles.select}>
                          <option value="">Select a range (optional)</option>
                          <option value="under200k">Under ₦200,000</option>
                          <option value="200k-500k">₦200,000 – ₦500,000</option>
                          <option value="500k-1m">₦500,000 – ₦1M</option>
                          <option value="1m-5m">₦1M – ₦5M</option>
                          <option value="over5m">Over ₦5M</option>
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

                    <button
                      id="submit-contact"
                      type="submit"
                      className={styles.submitBtn}
                      disabled={loading}
                      aria-busy={loading}
                    >
                      {loading ? (
                        <span className={styles.btnSpinner} aria-hidden>⏳</span>
                      ) : null}
                      {loading ? 'Sending…' : 'Send Message →'}
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
                  {[
                    { emoji: '📘', label: 'Facebook', href: '#' },
                    { emoji: '▶️', label: 'YouTube',  href: 'https://www.youtube.com/@Agrolocale' },
                    { emoji: '📸', label: 'Instagram',href: '#' },
                    { emoji: '💼', label: 'LinkedIn', href: '#' },
                  ].map(s => (
                    <a key={s.label} href={s.href} target={s.href !== '#' ? '_blank' : undefined} rel={s.href !== '#' ? 'noopener noreferrer' : undefined} className={styles.social} aria-label={s.label}>{s.emoji}</a>
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

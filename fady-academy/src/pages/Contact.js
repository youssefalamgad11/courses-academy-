import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', msg: '' });
  const [sent, setSent] = useState(false);

  const update = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const contacts = [
    { icon: '📧', label: 'البريد الإلكتروني', value: 'fadynader@academy.com', href: 'mailto:fadynader@academy.com' },
    { icon: '📱', label: 'واتساب', value: '+20 1XX XXX XXXX', href: 'https://wa.me/20100000000' },
    { icon: '📘', label: 'فيسبوك', value: 'Fady Nader Academy', href: '#' },
    { icon: '📸', label: 'انستجرام', value: '@fadynader', href: '#' },
  ];

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <span className="section-tag">نتشرف بتواصلك</span>
          <h1>تواصل معي</h1>
          <p>هنا لمساعدتك في أي سؤال أو استفسار</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h2>كيف تتواصل معي؟</h2>
            <p>أنا دائماً متاح للإجابة على أسئلتك والمساعدة في اختيار الكورس المناسب لك. لا تتردد في التواصل!</p>
            
            <div className="contact-cards">
              {contacts.map((c, i) => (
                <a key={i} href={c.href} className="contact-card" target="_blank" rel="noreferrer">
                  <span className="c-icon">{c.icon}</span>
                  <div>
                    <span className="c-label">{c.label}</span>
                    <span className="c-value">{c.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-hours">
              <h3>🕐 أوقات الرد</h3>
              <p>السبت - الخميس: ١٠ ص - ١٠ م</p>
              <p>الجمعة: ٢ م - ٨ م</p>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-box">
            {!sent ? (
              <>
                <h2>أرسل رسالة</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>الاسم *</label>
                      <input type="text" value={form.name} onChange={update('name')} required placeholder="اسمك" />
                    </div>
                    <div className="form-group">
                      <label>الموبايل *</label>
                      <input type="tel" value={form.phone} onChange={update('phone')} required placeholder="01xxxxxxxxx" dir="ltr" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>البريد الإلكتروني</label>
                    <input type="email" value={form.email} onChange={update('email')} placeholder="email@example.com" dir="ltr" />
                  </div>
                  <div className="form-group">
                    <label>رسالتك *</label>
                    <textarea
                      value={form.msg}
                      onChange={update('msg')}
                      required
                      placeholder="اكتب سؤالك أو رسالتك هنا..."
                      rows={5}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }}>
                    إرسال الرسالة 📨
                  </button>
                </form>
              </>
            ) : (
              <div className="form-sent">
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
                <h2>تم الإرسال!</h2>
                <p>شكراً <strong>{form.name}</strong>! تم استلام رسالتك وسأرد عليك في أقرب وقت ممكن.</p>
                <button className="btn-primary" onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', msg:'' }); }}>
                  إرسال رسالة أخرى
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

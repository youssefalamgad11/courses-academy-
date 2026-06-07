import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      hero.style.setProperty('--mx', `${x}px`);
      hero.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const stats = [
    { num: '500+', label: 'طالب متخرج' },
    { num: '10+', label: 'سنوات خبرة' },
    { num: '15+', label: 'كورس متخصص' },
    { num: '95%', label: 'نسبة الرضا' },
  ];

  const features = [
    { icon: '🎯', title: 'محتوى متخصص', desc: 'كورسات مصممة بعناية لتناسب السوق المصري والعربي' },
    { icon: '🏆', title: 'شهادات معتمدة', desc: 'احصل على شهادة إتمام بعد كل كورس' },
    { icon: '💬', title: 'دعم مستمر', desc: 'تواصل مباشر مع المدرب طوال فترة الدراسة' },
    { icon: '📱', title: 'تعلم في أي وقت', desc: 'وصول كامل للمحتوى على أي جهاز' },
  ];

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-orb orb-1" />
          <div className="hero-orb orb-2" />
          <div className="hero-grid" />
        </div>
        <div className="hero-content container">
          <div className="hero-badge">✦ أكاديمية فادي نادر ✦</div>
          <h1 className="hero-title">
            ارتقِ بمهاراتك
            <br />
            <span className="gold-text">وغيّر مسارك</span>
          </h1>
          <p className="hero-sub">
            منصة تعليمية متخصصة تقدم أفضل الكورسات لمساعدتك على تطوير نفسك وتحقيق أهدافك المهنية
          </p>
          <div className="hero-cta">
            <Link to="/courses" className="btn-primary">استكشف الكورسات</Link>
            <Link to="/who-am-i" className="btn-ghost">من هو فادي نادر؟</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>اسكرول للأسفل</span>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-card">
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">لماذا أكاديميتنا؟</span>
            <h2>تجربة تعليمية <span className="gold">مختلفة</span></h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{ '--delay': `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-glow" />
            <h2>ابدأ رحلتك اليوم</h2>
            <p>سجّل الآن واحصل على وصول فوري لأفضل المحتوى التعليمي</p>
            <Link to="/auth" className="btn-primary">ابدأ الآن مجاناً</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="logo-en" style={{ fontSize: '20px', color: 'var(--gold)' }}>FN</span>
              <span style={{ color: 'var(--white-dim)', fontSize: '14px' }}>أكاديمية فادي نادر © 2025</span>
            </div>
            <div className="footer-links">
              <Link to="/who-am-i">من أنا</Link>
              <Link to="/courses">الكورسات</Link>
              <Link to="/contact">تواصل معي</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

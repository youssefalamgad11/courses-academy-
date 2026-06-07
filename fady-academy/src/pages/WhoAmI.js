import React from 'react';
import { Link } from 'react-router-dom';
import './WhoAmI.css';

export default function WhoAmI() {
  const skills = [
    'تطوير الذات', 'ريادة الأعمال', 'المبيعات والتسويق',
    'مهارات التواصل', 'التخطيط الاستراتيجي', 'القيادة'
  ];

  const timeline = [
    { year: '2014', title: 'بداية الرحلة', desc: 'بدأت رحلتي في التدريب والتطوير المهني' },
    { year: '2017', title: 'خبرة متراكمة', desc: 'تدريب أكثر من 200 محترف في مجالات متعددة' },
    { year: '2020', title: 'الأكاديمية الرقمية', desc: 'إطلاق منصة التعليم الإلكتروني' },
    { year: '2025', title: 'الآن', desc: 'أكثر من 500 خريج ناجح من الأكاديمية' },
  ];

  return (
    <div className="who-page">
      <div className="who-hero">
        <div className="who-hero-bg" />
        <div className="container">
          <div className="who-hero-content">
            <span className="section-tag">تعرف عليّ</span>
            <h1>من أنا؟</h1>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Main Bio */}
        <section className="who-bio">
          <div className="bio-avatar">
            <div className="avatar-ring">
              <div className="avatar-placeholder">
                <span>FN</span>
              </div>
            </div>
            <div className="avatar-badge">✦ مدرب معتمد</div>
          </div>

          <div className="bio-text">
            <h2>فادي نادر</h2>
            <p className="bio-title">مدرب ومطور مهني | مؤسس أكاديمية فادي نادر</p>
            <div className="bio-divider" />
            <p>
              أنا فادي نادر، مدرب ومطور مهني متخصص في مساعدة الأفراد والمؤسسات على تحقيق أهدافهم وتطوير مهاراتهم.
              بدأت رحلتي في عالم التدريب منذ أكثر من 10 سنوات، وتمكنت خلالها من مساعدة مئات الأشخاص على تغيير مساراتهم المهنية وتحقيق النجاح.
            </p>
            <p>
              أؤمن بأن كل شخص لديه القدرة على التميز والنجاح، وأن التعليم الصحيح والتوجيه المناسب هما المفتاح لإطلاق هذه الطاقة الكامنة.
              لذلك أسستُ هذه الأكاديمية لأقدم لك أفضل محتوى تعليمي باللغة العربية.
            </p>
            <div className="bio-actions">
              <Link to="/courses" className="btn-primary">استعرض الكورسات</Link>
              <Link to="/contact" className="btn-ghost">تواصل معي</Link>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="who-skills">
          <h3>مجالات التخصص</h3>
          <div className="skills-grid">
            {skills.map((s, i) => (
              <div key={i} className="skill-tag">{s}</div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="who-timeline">
          <h3>مسيرتي المهنية</h3>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

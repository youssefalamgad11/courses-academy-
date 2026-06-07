import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import './Courses.css';

const COURSES = [
  {
    id: 1,
    category: 'تطوير ذات',
    title: 'أسرار بناء العقلية الناجحة',
    desc: 'اكتشف كيف تبني عقلية رابحة تساعدك على تحقيق أهدافك وتجاوز العقبات في الحياة والعمل.',
    lessons: 12,
    hours: 8,
    level: 'مبتدئ',
    price: 500,
    icon: '🧠',
  },
  {
    id: 2,
    category: 'مبيعات',
    title: 'فن الإقناع والمبيعات المتقدمة',
    desc: 'تعلم تقنيات الإقناع الحديثة وكيفية إغلاق الصفقات بكفاءة عالية في أي مجال.',
    lessons: 18,
    hours: 14,
    level: 'متوسط',
    price: 800,
    icon: '💼',
  },
  {
    id: 3,
    category: 'ريادة أعمال',
    title: 'من الفكرة إلى المشروع الناجح',
    desc: 'دليلك الشامل لتحويل فكرتك إلى مشروع تجاري ناجح خطوة بخطوة مع دراسات حالة حقيقية.',
    lessons: 24,
    hours: 20,
    level: 'متقدم',
    price: 1200,
    icon: '🚀',
  },
  {
    id: 4,
    category: 'تواصل',
    title: 'مهارات التواصل الفعّال',
    desc: 'طوّر قدرتك على التواصل والتأثير في الآخرين سواء في الاجتماعات أو المحادثات اليومية.',
    lessons: 10,
    hours: 6,
    level: 'مبتدئ',
    price: 400,
    icon: '🗣️',
  },
  {
    id: 5,
    category: 'قيادة',
    title: 'القيادة الحديثة وإدارة الفرق',
    desc: 'كيف تصبح قائداً ملهماً وتبني فريق عالي الأداء في بيئة العمل الحديثة.',
    lessons: 16,
    hours: 12,
    level: 'متوسط',
    price: 900,
    icon: '👑',
  },
  {
    id: 6,
    category: 'تسويق',
    title: 'التسويق الرقمي من الصفر',
    desc: 'تعلم أساسيات وأسرار التسويق الرقمي على منصات التواصل الاجتماعي وبناء علامتك التجارية.',
    lessons: 20,
    hours: 16,
    level: 'مبتدئ',
    price: 700,
    icon: '📱',
  },
];

const CATEGORIES = ['الكل', 'تطوير ذات', 'مبيعات', 'ريادة أعمال', 'تواصل', 'قيادة', 'تسويق'];

export default function Courses() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filtered = activeCategory === 'الكل'
    ? COURSES
    : COURSES.filter(c => c.category === activeCategory);

  const levelColor = { 'مبتدئ': '#4ade80', 'متوسط': '#facc15', 'متقدم': '#f87171' };

  return (
    <div className="courses-page">
      <div className="courses-hero">
        <div className="container">
          <span className="section-tag">تعلم واحترف</span>
          <h1>الكورسات</h1>
          <p>اختر الكورس المناسب وابدأ رحلتك نحو الاحتراف</p>
        </div>
      </div>

      <div className="container">
        {/* Filter */}
        <div className="courses-filter">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="courses-grid">
          {filtered.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-icon">{course.icon}</div>
              <div className="course-meta">
                <span className="course-category">{course.category}</span>
                <span className="course-level" style={{ color: levelColor[course.level] }}>
                  {course.level}
                </span>
              </div>
              <h3 className="course-title">{course.title}</h3>
              <p className="course-desc">{course.desc}</p>
              <div className="course-stats">
                <span>📚 {course.lessons} درس</span>
                <span>⏱️ {course.hours} ساعة</span>
              </div>
              <div className="course-footer">
                <span className="course-price">{course.price} جنيه</span>
                {user?.hasAccess ? (
                  <button className="btn-course-enrolled">مسجّل ✓</button>
                ) : (
                  <Link to="/payment" className="btn-course-enroll">اشترك الآن</Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {!user && (
          <div className="courses-cta-banner">
            <p>سجّل الدخول للوصول للمحتوى الكامل وتتبع تقدمك</p>
            <Link to="/auth" className="btn-primary">تسجيل الدخول</Link>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useAuth } from '../App';
import './Payment.css';

const PLANS = [
  {
    id: 'basic',
    name: 'باقة أساسية',
    price: 500,
    duration: 'شهر واحد',
    features: ['وصول لكورس واحد', 'شهادة إتمام', 'دعم عبر واتساب'],
  },
  {
    id: 'pro',
    name: 'باقة احترافية',
    price: 1500,
    duration: '3 أشهر',
    features: ['وصول لجميع الكورسات', 'شهادات معتمدة', 'دعم مباشر مع المدرب', 'مواد إضافية حصرية'],
    popular: true,
  },
  {
    id: 'vip',
    name: 'باقة VIP',
    price: 3000,
    duration: 'سنة كاملة',
    features: ['وصول كامل ومدى الحياة', 'جلسات فردية مع فادي نادر', 'أولوية في الكورسات الجديدة', 'مجموعة VIP خاصة', 'شهادات معتمدة لجميع الكورسات'],
  },
];

const INSTAPAY_NUMBER = '01XXXXXXXXX'; // Replace with real Instapay
const VODAFONE_NUMBER = '01XXXXXXXXX'; // Replace with real Vodafone Cash

export default function Payment() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [payMethod, setPayMethod] = useState('instapay');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', txRef: '' });

  const plan = PLANS.find(p => p.id === selectedPlan);
  const update = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="payment-page">
        <div className="container">
          <div className="payment-success">
            <div className="success-icon">✅</div>
            <h2>تم إرسال طلبك بنجاح!</h2>
            <p>
              شكراً <strong>{form.name}</strong>! تم استلام طلبك للاشتراك في <strong>{plan?.name}</strong>.
              <br />
              سيتم مراجعة الدفع وتفعيل حسابك خلال <strong>24 ساعة</strong> كحد أقصى.
            </p>
            <div className="success-info">
              <div className="info-row">
                <span>الباقة:</span>
                <strong>{plan?.name}</strong>
              </div>
              <div className="info-row">
                <span>المبلغ:</span>
                <strong className="gold">{plan?.price} جنيه</strong>
              </div>
              <div className="info-row">
                <span>طريقة الدفع:</span>
                <strong>{payMethod === 'instapay' ? 'Instapay' : 'Vodafone Cash'}</strong>
              </div>
              <div className="info-row">
                <span>رقم التحويل:</span>
                <strong style={{ fontFamily: 'monospace', direction: 'ltr' }}>{form.txRef}</strong>
              </div>
            </div>
            <p className="success-note">
              📲 سيتواصل معك فادي نادر عبر واتساب لتأكيد التفعيل على الرقم: <strong>{form.phone}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-hero">
        <div className="container">
          <span className="section-tag">انضم الآن</span>
          <h1>اختر باقتك</h1>
          <p>استثمر في نفسك وابدأ رحلتك نحو النجاح</p>
        </div>
      </div>

      <div className="container">
        {/* Plans */}
        <div className="plans-grid">
          {PLANS.map(plan => (
            <div
              key={plan.id}
              className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && <div className="popular-badge">الأكثر طلباً ⭐</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">
                <span className="price-num">{plan.price}</span>
                <span className="price-cur">جنيه</span>
              </div>
              <div className="plan-duration">لمدة {plan.duration}</div>
              <div className="plan-features">
                {plan.features.map((f, i) => (
                  <div key={i} className="plan-feature">✦ {f}</div>
                ))}
              </div>
              <div className={`plan-select-btn ${selectedPlan === plan.id ? 'selected' : ''}`}>
                {selectedPlan === plan.id ? 'تم الاختيار ✓' : 'اختر هذه الباقة'}
              </div>
            </div>
          ))}
        </div>

        {/* Payment Method */}
        <div className="payment-box">
          <h2>طريقة الدفع</h2>

          <div className="pay-methods">
            <div
              className={`pay-method ${payMethod === 'instapay' ? 'active' : ''}`}
              onClick={() => setPayMethod('instapay')}
            >
              <span className="pay-icon">💳</span>
              <div>
                <strong>Instapay</strong>
                <p>تحويل إلكتروني فوري</p>
              </div>
            </div>
            <div
              className={`pay-method ${payMethod === 'vodafone' ? 'active' : ''}`}
              onClick={() => setPayMethod('vodafone')}
            >
              <span className="pay-icon">📱</span>
              <div>
                <strong>Vodafone Cash</strong>
                <p>دفع عبر محفظة فودافون</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="pay-instructions">
            <h3>
              {payMethod === 'instapay' ? '📋 خطوات الدفع عبر Instapay' : '📋 خطوات الدفع عبر Vodafone Cash'}
            </h3>
            {payMethod === 'instapay' ? (
              <ol className="steps-list">
                <li>افتح تطبيق Instapay الخاص بك</li>
                <li>اختر "تحويل أموال"</li>
                <li>أدخل رقم الحساب: <strong className="gold">{INSTAPAY_NUMBER}</strong></li>
                <li>أدخل مبلغ <strong className="gold">{plan?.price} جنيه</strong></li>
                <li>في خانة الملاحظات اكتب اسمك ورقم موبايلك</li>
                <li>احفظ رقم مرجع العملية (Reference Number)</li>
                <li>أكمل النموذج أدناه بمرجع العملية</li>
              </ol>
            ) : (
              <ol className="steps-list">
                <li>اتصل بـ <strong className="gold">*9#</strong> أو افتح تطبيق My Vodafone</li>
                <li>اختر "تحويل فلوس"</li>
                <li>أدخل الرقم: <strong className="gold">{VODAFONE_NUMBER}</strong></li>
                <li>أدخل مبلغ <strong className="gold">{plan?.price} جنيه</strong></li>
                <li>احتفظ برقم العملية</li>
                <li>أكمل النموذج أدناه</li>
              </ol>
            )}
          </div>

          {/* Confirmation Form */}
          <form className="confirm-form" onSubmit={handleSubmit}>
            <h3>تأكيد الدفع</h3>
            <div className="form-row">
              <div className="form-group">
                <label>الاسم الكامل *</label>
                <input type="text" value={form.name} onChange={update('name')} required placeholder="اسمك كامل" />
              </div>
              <div className="form-group">
                <label>رقم الموبايل *</label>
                <input type="tel" value={form.phone} onChange={update('phone')} required placeholder="01xxxxxxxxx" dir="ltr" />
              </div>
            </div>
            <div className="form-group">
              <label>البريد الإلكتروني *</label>
              <input type="email" value={form.email} onChange={update('email')} required placeholder="email@example.com" dir="ltr" />
            </div>
            <div className="form-group">
              <label>رقم مرجع العملية (Reference) *</label>
              <input
                type="text"
                value={form.txRef}
                onChange={update('txRef')}
                required
                placeholder="الرقم المرجعي للتحويل"
                dir="ltr"
              />
            </div>
            <div className="confirm-summary">
              <div className="info-row">
                <span>الباقة المختارة:</span>
                <strong>{plan?.name}</strong>
              </div>
              <div className="info-row">
                <span>المبلغ:</span>
                <strong className="gold">{plan?.price} جنيه</strong>
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '18px' }}>
              إرسال تأكيد الدفع
            </button>
            <p className="pay-note">
              ⚠️ بعد إرسال النموذج سيتم مراجعة الدفع يدوياً وتفعيل حسابك خلال 24 ساعة عبر لوحة التحكم
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

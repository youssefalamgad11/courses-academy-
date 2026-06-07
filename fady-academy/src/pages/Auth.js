import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';
import './Auth.css';

const ADMIN_EMAIL = 'fadynader@academy.com';
const ADMIN_PASS = 'admin2025';

export default function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // login | signup
  const [step, setStep] = useState(1); // 1=form, 2=otp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const update = (field) => (e) => {
    setError('');
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const generateOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    return code;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 800));

    if (mode === 'login') {
      // Admin check
      if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASS) {
        login({ email: form.email, name: 'Admin', isAdmin: true, hasAccess: true });
        navigate('/dashboard');
        return;
      }
      // Normal user - send OTP
      const code = generateOtp();
      console.log(`[DEV] OTP for ${form.email || form.phone}: ${code}`);
      alert(`[تجريبي] كود التأكيد تم إرساله:\n${code}\n\n(في الإنتاج هيتبعت SMS/Email)`);
      setStep(2);
    } else {
      // Signup
      if (!form.name || (!form.email && !form.phone)) {
        setError('من فضلك اكمل جميع الحقول المطلوبة');
        setLoading(false);
        return;
      }
      const code = generateOtp();
      console.log(`[DEV] OTP: ${code}`);
      alert(`[تجريبي] كود التأكيد:\n${code}\n\n(في الإنتاج هيتبعت SMS/Email)`);
      setStep(2);
    }
    setLoading(false);
  };

  const handleOtpChange = (index, val) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKey = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    const entered = otp.join('');
    if (entered.length < 6) { setError('ادخل الكود كامل'); return; }
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));

    if (entered === generatedOtp) {
      login({
        email: form.email,
        phone: form.phone,
        name: form.name || 'مستخدم',
        isAdmin: false,
        hasAccess: false, // access granted manually from dashboard
      });
      navigate('/courses');
    } else {
      setError('الكود غير صحيح، حاول مرة أخرى');
    }
    setLoading(false);
  };

  const resendOtp = () => {
    const code = generateOtp();
    console.log(`[DEV] New OTP: ${code}`);
    alert(`[تجريبي] كود جديد:\n${code}`);
    setOtp(['', '', '', '', '', '']);
    setError('');
    document.getElementById('otp-0')?.focus();
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb" />
      </div>

      <div className="auth-container">
        <Link to="/" className="auth-back">← العودة للرئيسية</Link>

        <div className="auth-card">
          <div className="auth-logo">
            <span className="logo-en" style={{ fontSize: '28px', color: 'var(--gold)' }}>FN</span>
          </div>

          {step === 1 ? (
            <>
              {/* Tabs */}
              <div className="auth-tabs">
                <button
                  className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                  onClick={() => { setMode('login'); setError(''); }}
                >
                  تسجيل الدخول
                </button>
                <button
                  className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
                  onClick={() => { setMode('signup'); setError(''); }}
                >
                  حساب جديد
                </button>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                {mode === 'signup' && (
                  <div className="form-group">
                    <label>الاسم الكامل</label>
                    <input
                      type="text"
                      placeholder="ادخل اسمك"
                      value={form.name}
                      onChange={update('name')}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>البريد الإلكتروني</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={update('email')}
                    dir="ltr"
                  />
                </div>

                <div className="form-divider">
                  <span>أو</span>
                </div>

                <div className="form-group">
                  <label>رقم الموبايل</label>
                  <input
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    value={form.phone}
                    onChange={update('phone')}
                    dir="ltr"
                  />
                </div>

                {mode === 'login' && (
                  <div className="form-group">
                    <label>كلمة المرور <span style={{color:'var(--white-dim)',fontSize:'12px'}}>(للأدمن فقط)</span></label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={update('password')}
                    />
                  </div>
                )}

                {error && <div className="auth-error">{error}</div>}

                <button type="submit" className="btn-primary btn-auth" disabled={loading}>
                  {loading ? 'جاري الإرسال...' : mode === 'login' ? 'إرسال كود التأكيد' : 'إنشاء الحساب'}
                </button>
              </form>

              <p className="auth-note">
                سيتم إرسال كود تأكيد على {form.email || form.phone || 'بريدك / موبايلك'} في كل مرة تسجّل الدخول
              </p>
            </>
          ) : (
            <>
              <div className="otp-header">
                <div className="otp-icon">📩</div>
                <h2>تأكيد الهوية</h2>
                <p>تم إرسال كود مكون من 6 أرقام إلى<br />
                  <strong style={{color:'var(--gold)'}}>{form.email || form.phone}</strong>
                </p>
              </div>

              <form onSubmit={handleVerify} className="auth-form">
                <div className="otp-inputs">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKey(i, e)}
                      className="otp-input"
                      autoFocus={i === 0}
                    />
                  ))}
                </div>

                {error && <div className="auth-error">{error}</div>}

                <button type="submit" className="btn-primary btn-auth" disabled={loading}>
                  {loading ? 'جاري التحقق...' : 'تأكيد الدخول'}
                </button>

                <div className="otp-actions">
                  <button type="button" className="btn-link" onClick={resendOtp}>
                    إعادة إرسال الكود
                  </button>
                  <button type="button" className="btn-link" onClick={() => { setStep(1); setOtp(['','','','','','']); }}>
                    تعديل البيانات
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

# 🎓 Fady Nader Academy

موقع أكاديمية فادي نادر — منصة تعليمية متكاملة.

## 📁 الصفحات

| الصفحة | الرابط |
|--------|--------|
| الرئيسية | `/` |
| تسجيل الدخول / حساب جديد | `/auth` |
| من أنا | `/who-am-i` |
| الكورسات | `/courses` |
| الاشتراك والدفع | `/payment` |
| تواصل معي | `/contact` |
| لوحة التحكم (أدمن) | `/dashboard` |

## 🔑 بيانات الأدمن (تجريبية)
```
Email: fadynader@academy.com
Password: admin2025
```

## 🚀 طريقة الرفع على Vercel

### الخطوة 1: رفع على GitHub
```bash
cd fady-academy
git init
git add .
git commit -m "Initial commit - Fady Nader Academy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fady-academy.git
git push -u origin main
```

### الخطوة 2: Deploy على Vercel
1. اذهب لـ [vercel.com](https://vercel.com) وسجل بحساب GitHub
2. اضغط **"Add New Project"**
3. اختر الـ repository `fady-academy`
4. اضغط **Deploy** — خلاص! 🎉

> ملاحظة: `vercel.json` موجود بالفعل لضمان شغل الـ SPA routing.

## ⚙️ تشغيل محلياً
```bash
npm install
npm start
```

## 🛠️ أشياء تحتاج تعدّلها

### 1. بيانات أرقام الدفع (`src/pages/Payment.js`)
```js
const INSTAPAY_NUMBER = '01XXXXXXXXX'; // ← غير بالرقم الحقيقي
const VODAFONE_NUMBER = '01XXXXXXXXX'; // ← غير بالرقم الحقيقي
```

### 2. بيانات التواصل (`src/pages/Contact.js`)
```js
{ label: 'البريد الإلكتروني', value: 'fadynader@academy.com', ... }
{ label: 'واتساب', value: '+20 1XX XXX XXXX', href: 'https://wa.me/201XXXXXXXXX' }
```

### 3. بيانات الأدمن (`src/App.js`)
```js
const ADMIN_EMAIL = 'fadynader@academy.com';
const ADMIN_PASS = 'admin2025';
```

### 4. صورة فادي نادر (`src/pages/WhoAmI.js`)
في مكان `<div className="avatar-placeholder">` ضع:
```jsx
<img src="/fady.jpg" alt="Fady Nader" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%' }} />
```
وارفع الصورة في مجلد `public/`

### 5. الكورسات (`src/pages/Courses.js`)
عدّل مصفوفة `COURSES` بالكورسات الحقيقية والأسعار.

## 📱 OTP / رسائل التأكيد
حالياً الـ OTP بيظهر في `alert()` للتجربة.
في الإنتاج تحتاج تربط:
- **SMS**: [Vonage](https://vonage.com) أو [Twilio](https://twilio.com) أو [Mbasher](https://mbasher.com) (مصري)
- **Email**: [EmailJS](https://emailjs.com) (مجاني) أو [Resend](https://resend.com)

## 🔧 Backend مستقبلاً
المشروع حالياً Frontend فقط. لربطه بـ backend تحتاج:
- Firebase (سهل وسريع)
- أو Supabase
- أو Node.js + MongoDB

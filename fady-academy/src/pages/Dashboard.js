import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../App';
import './Dashboard.css';

// Simulated pending requests storage (in real app: use backend)
const INIT_REQUESTS = [
  { id: 1, name: 'أحمد محمد', email: 'ahmed@test.com', phone: '01012345678', plan: 'باقة احترافية', amount: 1500, method: 'Instapay', txRef: 'IP123456789', date: '2025-06-01', status: 'pending' },
  { id: 2, name: 'سارة علي', email: 'sara@test.com', phone: '01098765432', plan: 'باقة أساسية', amount: 500, method: 'Vodafone Cash', txRef: 'VC987654321', date: '2025-06-02', status: 'pending' },
  { id: 3, name: 'محمود حسن', email: 'mahmoud@test.com', phone: '01155667788', plan: 'باقة VIP', amount: 3000, method: 'Instapay', txRef: 'IP456123789', date: '2025-06-03', status: 'approved' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState(INIT_REQUESTS);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('requests'); // requests | users
  const [users, setUsers] = useState([
    { id: 1, name: 'محمود حسن', email: 'mahmoud@test.com', phone: '01155667788', hasAccess: true, plan: 'VIP' },
  ]);
  const [addForm, setAddForm] = useState({ email: '', phone: '', name: '', plan: 'أساسية' });
  const [addMsg, setAddMsg] = useState('');

  if (!user?.isAdmin) return <Navigate to="/" />;

  const updateReq = (id, status) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    if (status === 'approved') {
      const req = requests.find(r => r.id === id);
      if (req) {
        setUsers(prev => [...prev, { id: Date.now(), name: req.name, email: req.email, phone: req.phone, hasAccess: true, plan: req.plan }]);
      }
    }
  };

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter);

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers(prev => [...prev, { id: Date.now(), ...addForm, hasAccess: true }]);
    setAddMsg(`✅ تم تفعيل حساب ${addForm.name || addForm.email} بنجاح`);
    setAddForm({ email: '', phone: '', name: '', plan: 'أساسية' });
    setTimeout(() => setAddMsg(''), 4000);
  };

  const stats = [
    { label: 'إجمالي الطلبات', value: requests.length, icon: '📋' },
    { label: 'بانتظار المراجعة', value: requests.filter(r => r.status === 'pending').length, icon: '⏳' },
    { label: 'مفعّلون', value: users.length, icon: '✅' },
    { label: 'إجمالي الإيرادات', value: `${requests.filter(r=>r.status==='approved').reduce((s,r)=>s+r.amount,0)} ج`, icon: '💰' },
  ];

  return (
    <div className="dash-page">
      <div className="dash-hero">
        <div className="container">
          <span className="section-tag">Admin Panel</span>
          <h1>لوحة التحكم</h1>
          <p>أهلاً بك، {user.name}</p>
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div className="dash-stats">
          {stats.map((s, i) => (
            <div key={i} className="dash-stat">
              <span className="dash-stat-icon">{s.icon}</span>
              <span className="dash-stat-value">{s.value}</span>
              <span className="dash-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="dash-tabs">
          <button className={`dash-tab ${activeTab === 'requests' ? 'active' : ''}`} onClick={() => setActiveTab('requests')}>
            طلبات الدفع ({requests.filter(r=>r.status==='pending').length})
          </button>
          <button className={`dash-tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            المستخدمين المفعّلين ({users.length})
          </button>
          <button className={`dash-tab ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
            ➕ تفعيل يدوي
          </button>
        </div>

        {activeTab === 'requests' && (
          <div className="dash-section">
            <div className="filter-row">
              {['all','pending','approved','rejected'].map(f => (
                <button key={f} className={`filter-btn ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>
                  {f==='all'?'الكل':f==='pending'?'قيد المراجعة':f==='approved'?'مقبول':'مرفوض'}
                </button>
              ))}
            </div>

            <div className="requests-table">
              <div className="table-header">
                <span>المستخدم</span>
                <span>الباقة</span>
                <span>المبلغ</span>
                <span>طريقة الدفع</span>
                <span>رقم العملية</span>
                <span>التاريخ</span>
                <span>الحالة</span>
                <span>إجراء</span>
              </div>
              {filtered.map(req => (
                <div key={req.id} className={`table-row ${req.status}`}>
                  <div className="user-cell">
                    <strong>{req.name}</strong>
                    <span>{req.email}</span>
                    <span>{req.phone}</span>
                  </div>
                  <span>{req.plan}</span>
                  <span className="gold">{req.amount} ج</span>
                  <span>{req.method}</span>
                  <span className="tx-ref">{req.txRef}</span>
                  <span>{req.date}</span>
                  <span className={`status-badge status-${req.status}`}>
                    {req.status==='pending'?'انتظار':req.status==='approved'?'مقبول':'مرفوض'}
                  </span>
                  <div className="action-btns">
                    {req.status === 'pending' && (
                      <>
                        <button className="btn-approve" onClick={() => updateReq(req.id, 'approved')}>✅ قبول</button>
                        <button className="btn-reject" onClick={() => updateReq(req.id, 'rejected')}>❌ رفض</button>
                      </>
                    )}
                    {req.status !== 'pending' && <span className="done-label">تم</span>}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="empty-state">لا يوجد طلبات في هذا التصنيف</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="dash-section">
            <div className="users-table">
              <div className="table-header">
                <span>الاسم</span>
                <span>البريد الإلكتروني</span>
                <span>الموبايل</span>
                <span>الباقة</span>
                <span>الوصول</span>
                <span>إجراء</span>
              </div>
              {users.map(u => (
                <div key={u.id} className="table-row">
                  <strong>{u.name}</strong>
                  <span style={{ direction: 'ltr', textAlign: 'right' }}>{u.email}</span>
                  <span style={{ direction: 'ltr', textAlign: 'right' }}>{u.phone}</span>
                  <span>{u.plan}</span>
                  <span className={`status-badge ${u.hasAccess ? 'status-approved' : 'status-rejected'}`}>
                    {u.hasAccess ? 'مفعّل' : 'موقوف'}
                  </span>
                  <button
                    className={u.hasAccess ? 'btn-reject' : 'btn-approve'}
                    onClick={() => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, hasAccess: !x.hasAccess } : x))}
                  >
                    {u.hasAccess ? 'إيقاف' : 'تفعيل'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="dash-section">
            <div className="add-user-box">
              <h2>تفعيل مستخدم يدوياً</h2>
              <p>لتفعيل وصول مستخدم بعد التحقق من الدفع، أضف بريده الإلكتروني ورقم موبايله</p>
              {addMsg && <div className="add-success">{addMsg}</div>}
              <form className="add-form" onSubmit={handleAddUser}>
                <div className="form-row">
                  <div className="form-group">
                    <label>الاسم</label>
                    <input type="text" placeholder="اسم المستخدم" value={addForm.name} onChange={e=>setAddForm(p=>({...p,name:e.target.value}))} />
                  </div>
                  <div className="form-group">
                    <label>البريد الإلكتروني *</label>
                    <input type="email" placeholder="email@example.com" required value={addForm.email} onChange={e=>setAddForm(p=>({...p,email:e.target.value}))} dir="ltr" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>رقم الموبايل *</label>
                    <input type="tel" placeholder="01xxxxxxxxx" required value={addForm.phone} onChange={e=>setAddForm(p=>({...p,phone:e.target.value}))} dir="ltr" />
                  </div>
                  <div className="form-group">
                    <label>الباقة</label>
                    <select value={addForm.plan} onChange={e=>setAddForm(p=>({...p,plan:e.target.value}))}>
                      <option>أساسية</option>
                      <option>احترافية</option>
                      <option>VIP</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '14px 32px' }}>
                  تفعيل الوصول ✅
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

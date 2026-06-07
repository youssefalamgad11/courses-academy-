import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import WhoAmI from './pages/WhoAmI';
import Courses from './pages/Courses';
import Payment from './pages/Payment';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const [user, setUser] = useState(null); // { email, phone, name, hasAccess }
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, authMode, setAuthMode }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/who-am-i" element={<WhoAmI />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

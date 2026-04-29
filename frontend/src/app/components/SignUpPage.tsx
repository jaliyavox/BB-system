import React, { useState, useEffect } from 'react';
import { authApi, AuthApiError } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import {
  Lock, Mail, ShieldCheck, UserCheck, ArrowLeft, Eye, EyeOff,
  AlertCircle, Loader2, FileText, Shield,
  Sparkles, Home, User, Building, Phone, Calendar, GraduationCap,
  CreditCard, Briefcase
} from 'lucide-react';

export default function SignUpPage() {
  const [role, setRole] = useState<'student' | 'owner'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  // Shared fields (both roles)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  // Student-only fields
  const [birthday, setBirthday] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  // Owner-only fields
  const [nic, setNic] = useState('');
  const [occupation, setOccupation] = useState('');
  // Shared
  const [gender, setGender] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState({
    email: false, password: false, confirm: false,
    firstName: false, lastName: false, mobileNumber: false,
    gender: false,
    birthday: false, academicYear: false,
    nic: false, occupation: false,
  });

  const navigate = useNavigate();

  const checkPasswordStrength = (pw: string) => {
    const score = [pw.length >= 8, /\d/.test(pw), /[!@#$%^&*(),.?":{}|<>]/.test(pw), /[A-Z]/.test(pw)].filter(Boolean).length;
    return {
      score,
      strength: score === 4 ? 'Strong' : score >= 2 ? 'Medium' : 'Weak',
      color: score === 4 ? '#4ade80' : score >= 2 ? '#facc15' : '#f87171',
      checks: {
        length: pw.length >= 8,
        number: /\d/.test(pw),
        symbol: /[!@#$%^&*(),.?":{}|<>]/.test(pw),
        uppercase: /[A-Z]/.test(pw),
      },
    };
  };

  const validateEmail = (v: string) => {
    if (!v) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Invalid email format';
    if (role === 'student' && !v.endsWith('@sliit.lk') && !v.endsWith('@my.sliit.lk')) return 'Use @sliit.lk or @my.sliit.lk';
    if (role === 'owner' && (v.endsWith('@sliit.lk') || v.endsWith('@my.sliit.lk'))) return 'Use business/personal email';
    return '';
  };
  const validatePassword = (v: string) => {
    if (!v) return 'Password is required';
    if (role === 'student') {
      if (v.length < 8) return 'Minimum 8 characters';
      if (!/\d/.test(v)) return 'Include a number';
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(v)) return 'Include a symbol';
      if (!/[A-Z]/.test(v)) return 'Include uppercase letter';
    } else {
      if (v.length < 6) return 'Minimum 6 characters';
    }
    return '';
  };
  const validateConfirm = (v: string) => {
    if (!v) return 'Please confirm';
    if (v !== password) return 'Passwords do not match';
    return '';
  };
  const validateFirstName  = (v: string) => (!v ? 'Required' : v.length < 2 ? 'Too short' : !/^[a-zA-Z\s'-]+$/.test(v) ? 'Letters only' : '');
  const validateLastName   = (v: string) => (!v ? 'Required' : v.length < 2 ? 'Too short' : !/^[a-zA-Z\s'-]+$/.test(v) ? 'Letters only' : '');
  const validateMobile     = (v: string) => (!v ? 'Required' : !/^[0-9+\-\s()]{10,15}$/.test(v) ? 'Invalid format' : '');
  const validateBirthday   = (v: string) => {
    if (!v) return 'Required';
    const age = (Date.now() - new Date(v).getTime()) / (365.25 * 24 * 3600 * 1000);
    if (age < 16) return 'Must be 16+';
    if (age > 60) return 'Invalid date';
    return '';
  };
  const validateAcademicYear = (v: string) => (!v ? 'Required' : '');
  const validateNic        = (v: string) => (!v ? 'NIC is required' : !/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(v.replace(/\s/g,'')) ? 'Invalid NIC format' : '');
  const validateOccupation = (v: string) => (!v ? 'Required' : v.length < 2 ? 'Too short' : '');
  const validateGender     = (v: string) => (!v ? 'Required' : '');

  const emailError        = touchedFields.email        ? validateEmail(email)           : '';
  const passwordError     = touchedFields.password     ? validatePassword(password)     : '';
  const confirmError      = touchedFields.confirm      ? validateConfirm(confirm)       : '';
  const firstNameError    = touchedFields.firstName    ? validateFirstName(firstName)   : '';
  const lastNameError     = touchedFields.lastName     ? validateLastName(lastName)     : '';
  const mobileError       = touchedFields.mobileNumber ? validateMobile(mobileNumber)   : '';
  const birthdayError     = role === 'student' && touchedFields.birthday    ? validateBirthday(birthday)     : '';
  const academicYearError = role === 'student' && touchedFields.academicYear ? validateAcademicYear(academicYear) : '';
  const nicError          = role === 'owner'   && touchedFields.nic         ? validateNic(nic)               : '';
  const occupationError   = role === 'owner'   && touchedFields.occupation  ? validateOccupation(occupation) : '';
  const genderError       = touchedFields.gender ? validateGender(gender) : '';
  const pwStrength        = password && role === 'student' ? checkPasswordStrength(password) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedFields({
      email: true, password: true, confirm: true,
      firstName: true, lastName: true, mobileNumber: true,
      gender: true,
      birthday: role === 'student', academicYear: role === 'student',
      nic: role === 'owner', occupation: role === 'owner',
    });
    const hasCommonError  = validateFirstName(firstName) || validateLastName(lastName) || validateMobile(mobileNumber) || validateGender(gender);
    const hasStudentError = role === 'student' && (validateBirthday(birthday) || validateAcademicYear(academicYear));
    const hasOwnerError   = role === 'owner'   && (validateNic(nic) || validateOccupation(occupation));
    if (validateEmail(email) || validatePassword(password) || validateConfirm(confirm) ||
        hasCommonError || hasStudentError || hasOwnerError) {
      setError('Please fix the errors below');
      return;
    }
    setError(''); setSuccess(''); setIsLoading(true);
    try {
      const result = await authApi.signUp({
        email, password, role,
        firstName, lastName, mobileNumber, gender,
        birthday: role === 'student' ? birthday : undefined,
        academicYear: role === 'student' ? parseInt(academicYear) : undefined,
        nic: role === 'owner' ? nic : undefined,
        occupation: role === 'owner' ? occupation : undefined,
      });

      if (role === 'owner') {
        if (result?.token) {
          localStorage.setItem('bb_access_token', result.token);
        }
        if (result?.user) {
          localStorage.setItem('bb_current_user', JSON.stringify(result.user));
          localStorage.setItem('userRole', result.user.role);
          localStorage.setItem('userName', result.user.fullName || result.user.email.split('@')[0]);
        }
        setSuccess('Owner account created successfully! Redirecting to KYC setup...');
        setTimeout(() => navigate('/owner/kyc-onboarding'), 800);
      } else {
        setSuccess('Account created! Redirecting to email verification...');
        const redirectPath = result?.verificationUrl
          ? `${new URL(result.verificationUrl).pathname}${new URL(result.verificationUrl).search}`
          : `/verify-email?email=${encodeURIComponent(email)}`;
        setTimeout(() => navigate(redirectPath), 800);
      }
    } catch (err) {
      if (err instanceof AuthApiError) {
        if (role === 'student' && err.needsVerification) { navigate(`/verify-email?email=${encodeURIComponent(email)}`); return; }
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : 'Unable to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => (window.history.length > 1 ? navigate(-1) : navigate('/'));

  return (
    <div style={{ minHeight: '100vh', background: '#0f1629', display: 'flex', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes su-float-a  { 0%,100%{transform:translateY(0) scale(1);}  50%{transform:translateY(-28px) scale(1.04);} }
        @keyframes su-float-b  { 0%,100%{transform:translateY(0) scale(1);}  50%{transform:translateY(-18px) scale(1.06);} }
        @keyframes su-drift    { 0%,100%{transform:translate(0,0);} 33%{transform:translate(16px,-12px);} 66%{transform:translate(-10px,14px);} }
        @keyframes su-ring     { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        @keyframes su-fade-up  { from{opacity:0;transform:translateY(22px);} to{opacity:1;transform:translateY(0);} }
        @keyframes su-shake    { 0%,100%{transform:translateX(0);} 20%,60%{transform:translateX(-3px);} 40%,80%{transform:translateX(3px);} }
        @keyframes su-shimmer  { 0%,100%{opacity:.5;} 50%{opacity:1;} }
        @keyframes su-slide-down { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);} }

        .su-orb-a   { animation: su-float-a 9s  ease-in-out infinite; }
        .su-orb-b   { animation: su-float-b 7s  ease-in-out infinite 1.2s; }
        .su-orb-c   { animation: su-drift   12s ease-in-out infinite 2s; }
        .su-ring-1  { animation: su-ring    20s linear infinite; }
        .su-ring-2  { animation: su-ring    14s linear infinite reverse; }
        .su-form    { animation: su-fade-up 0.5s cubic-bezier(.22,.68,0,1.2) both; }
        .su-shake   { animation: su-shake 0.45s ease-in-out; }
        .su-badge   { animation: su-shimmer 3s ease-in-out infinite; }
        .su-owner-fields { animation: su-slide-down 0.3s ease-out; }

        .su-input {
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(129,140,248,0.18);
          border-radius: 13px;
          padding: 13px 44px;
          font-size: 14px; color: #fff; outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
        }
        .su-input::placeholder { color: rgba(148,163,184,0.45); }
        .su-input:focus { border-color: rgba(129,140,248,0.7); background: rgba(129,140,248,0.06); box-shadow: 0 0 0 4px rgba(129,140,248,0.10); }
        .su-input.valid   { border-color: rgba(34,197,94,0.5); }
        .su-input.invalid { border-color: rgba(239,68,68,0.6); background: rgba(239,68,68,0.04); }

        .su-btn {
          width:100%; padding:14px; border-radius:13px; border:none;
          background: linear-gradient(135deg,#818cf8 0%,#6366f1 40%,#22d3ee 100%);
          color:#fff; font-size:15px; font-weight:700; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:8px;
          box-shadow: 0 4px 24px rgba(99,102,241,0.35);
          transition: opacity .2s, transform .15s, box-shadow .2s;
          position:relative; overflow:hidden;
        }
        .su-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.15) 0%,transparent 60%); pointer-events:none; }
        .su-btn:hover:not(:disabled) { opacity:.92; transform:translateY(-1px); box-shadow:0 8px 32px rgba(99,102,241,.45); }
        .su-btn:disabled { opacity:.6; cursor:not-allowed; }

        .su-back {
          display:inline-flex; align-items:center; gap:6px;
          padding:7px 14px; border-radius:99px;
          background:rgba(255,255,255,.05); border:1px solid rgba(129,140,248,.18);
          color:rgba(165,180,252,.8); font-size:13px; font-weight:500;
          cursor:pointer; transition:all .2s; text-decoration:none;
        }
        .su-back:hover { background:rgba(129,140,248,.1); border-color:rgba(129,140,248,.4); color:#a5b4fc; }

        .su-role-btn {
          flex:1; padding:9px; border:none; background:transparent;
          border-radius:10px; font-size:13px; font-weight:600; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:6px;
          transition: color .2s;
        }

        .su-select {
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(129,140,248,0.18);
          border-radius: 13px;
          padding: 13px 36px 13px 44px;
          font-size: 14px; color: #fff; outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          appearance: none; cursor: pointer;
        }
        .su-select:focus { border-color: rgba(129,140,248,0.7); background: rgba(129,140,248,0.06); box-shadow: 0 0 0 4px rgba(129,140,248,0.10); }
        .su-select option { background: #1a2240; color: #fff; }
        .su-select.valid   { border-color: rgba(34,197,94,0.5); }
        .su-select.invalid { border-color: rgba(239,68,68,0.6); background: rgba(239,68,68,0.04); }

        input[type="date"].su-input { color-scheme: dark; }
        input[type="date"].su-input::-webkit-calendar-picker-indicator { filter: invert(0.6); cursor: pointer; }

      `}</style>

      {/* Animated background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="su-orb-a" style={{ position:'absolute', top:'-8%', left:'-6%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%)' }} />
        <div className="su-orb-b" style={{ position:'absolute', bottom:'-10%', right:'-5%', width:460, height:460, borderRadius:'50%', background:'radial-gradient(circle,rgba(34,211,238,.14) 0%,transparent 70%)' }} />
        <div className="su-orb-c" style={{ position:'absolute', top:'45%', left:'48%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(129,140,248,.07) 0%,transparent 70%)' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(129,140,248,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(129,140,248,.035) 1px,transparent 1px)', backgroundSize:'48px 48px' }} />
      </div>

      {/* Back button */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 20 }}>
        <button type="button" onClick={handleBack} className="su-back">
          <ArrowLeft size={15} />
          Back
        </button>
      </div>

      {/* Left panel — branding */}
      <div style={{ flex:1, flexDirection:'column', justifyContent:'center', padding:'60px 64px', position:'relative', display:'none' }} className="su-left-panel">
        <style>{`@media(min-width:1024px){.su-left-panel{display:flex!important;}}`}</style>

        <div className="su-ring-1" style={{ position:'absolute', top:'10%', right:'-90px', width:340, height:340, border:'1px solid rgba(129,140,248,.1)', borderRadius:'50%', borderTopColor:'rgba(129,140,248,.35)' }} />
        <div className="su-ring-2" style={{ position:'absolute', top:'18%', right:'-50px', width:230, height:230, border:'1px solid rgba(34,211,238,.07)', borderRadius:'50%', borderRightColor:'rgba(34,211,238,.28)' }} />

        <a href="/" style={{ display:'flex', alignItems:'center', gap:12, marginBottom:48, textDecoration:'none' }}>
          <div style={{ width:44, height:44, borderRadius:14, background:'linear-gradient(135deg,#818cf8,#22d3ee)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 24px rgba(129,140,248,.5)' }}>
            <UserCheck size={22} color="#fff" />
          </div>
          <div>
            <p style={{ color:'#fff', fontWeight:800, fontSize:18, letterSpacing:'-0.02em', lineHeight:1 }}>BoardingBook</p>
            <p style={{ color:'rgba(148,163,184,.65)', fontSize:11, marginTop:2, fontWeight:500 }}>SLIIT Student Platform</p>
          </div>
        </a>

        <h2 style={{ fontSize:36, fontWeight:800, color:'#fff', lineHeight:1.18, letterSpacing:'-0.03em', marginBottom:14 }}>
          Start your journey<br/>
          <span style={{ background:'linear-gradient(135deg,#818cf8,#22d3ee)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>to the perfect room</span>
        </h2>
        <p style={{ color:'rgba(148,163,184,.6)', fontSize:15, lineHeight:1.65, marginBottom:44, maxWidth:360 }}>
          Join thousands of SLIIT students finding verified boarding rooms, compatible roommates, and a safe place to call home.
        </p>

        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {[
            { color:'#818cf8', bg:'rgba(129,140,248,.1)', icon:<Home size={15} color="#818cf8" />,      label:'Verified Rooms Near SLIIT', sub:'Browse hundreds of trusted listings' },
            { color:'#22d3ee', bg:'rgba(34,211,238,.1)',  icon:<UserCheck size={15} color="#22d3ee" />, label:'Roommate Finder',            sub:'Get matched with compatible housemates' },
            { color:'#a78bfa', bg:'rgba(167,139,250,.1)', icon:<ShieldCheck size={15} color="#a78bfa" />, label:'Safe & Verified',          sub:'KYC-verified owners you can trust' },
          ].map(f => (
            <div key={f.label} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0' }}>
              <div style={{ width:34, height:34, borderRadius:10, background:f.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{f.icon}</div>
              <div>
                <p style={{ color:'#e2e8f0', fontSize:13, fontWeight:600, lineHeight:1 }}>{f.label}</p>
                <p style={{ color:'rgba(148,163,184,.5)', fontSize:11.5, marginTop:3 }}>{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ width:'100%', maxWidth:500, margin:'0 auto', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'48px 24px 32px', position:'relative', zIndex:10, overflowY:'auto' }} className="su-right-panel">
        <style>{`@media(min-width:1024px){.su-right-panel{width:500px!important;margin:0!important;background:rgba(15,22,41,.6);backdropFilter:blur(24px);min-height:100vh;align-items:center!important;}}`}</style>

        <div className="su-form" style={{ width:'100%', maxWidth:400 }}>

          {/* Mobile logo */}
          <div style={{ textAlign:'center', marginBottom:28 }} className="su-mobile-logo">
            <style>{`@media(min-width:1024px){.su-mobile-logo{display:none;}}`}</style>
            <a href="/" style={{ textDecoration:'none', display:'inline-block' }}>
              <div style={{ width:50, height:50, borderRadius:16, background:'linear-gradient(135deg,#818cf8,#22d3ee)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', boxShadow:'0 0 26px rgba(129,140,248,.45)' }}>
                <UserCheck size={24} color="#fff" />
              </div>
              <p style={{ color:'#fff', fontWeight:800, fontSize:20, letterSpacing:'-0.02em' }}>BoardingBook</p>
              <p style={{ color:'rgba(148,163,184,.55)', fontSize:12, marginTop:4 }}>SLIIT Student Platform</p>
            </a>
          </div>

          {/* Heading */}
          <div style={{ marginBottom:22 }}>
            <div className="su-badge" style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(129,140,248,.1)', border:'1px solid rgba(129,140,248,.2)', borderRadius:99, padding:'5px 12px', marginBottom:14 }}>
              <Sparkles size={11} color="#818cf8" />
              <span style={{ fontSize:11, fontWeight:600, color:'#a5b4fc', letterSpacing:'0.06em', textTransform:'uppercase' }}>Create Account</span>
            </div>
            <h2 style={{ color:'#fff', fontSize:26, fontWeight:800, letterSpacing:'-0.025em', lineHeight:1.2, margin:0 }}>Join BoardingBook</h2>
            <p style={{ color:'rgba(148,163,184,.55)', fontSize:13.5, marginTop:6 }}>Find your perfect housing today</p>
          </div>

          {/* Role Toggle */}
          <div style={{ background:'rgba(255,255,255,.04)', border:'1.5px solid rgba(129,140,248,.14)', borderRadius:14, padding:4, display:'flex', marginBottom:20, position:'relative' }}>
            <div style={{
              position:'absolute', top:4, bottom:4, width:'calc(50% - 4px)',
              borderRadius:10, transition:'left .3s cubic-bezier(.22,.68,0,1.2)',
              background: role === 'student' ? 'linear-gradient(135deg,#818cf8,#6366f1)' : 'linear-gradient(135deg,#a78bfa,#7c3aed)',
              left: role === 'student' ? 4 : 'calc(50%)',
              boxShadow:'0 2px 12px rgba(99,102,241,.35)',
            }} />
            <button type="button" className="su-role-btn" onClick={() => { setRole('student'); setError(''); }}
              style={{ color: role === 'student' ? '#fff' : 'rgba(148,163,184,.6)', position:'relative', zIndex:1 }}>
              <User size={14} /> Student
            </button>
            <button type="button" className="su-role-btn" onClick={() => { setRole('owner'); setError(''); }}
              style={{ color: role === 'owner' ? '#fff' : 'rgba(148,163,184,.6)', position:'relative', zIndex:1 }}>
              <Building size={14} /> Owner
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate style={{ display:'flex', flexDirection:'column', gap:13 }}>

            {/* Student-only fields */}
            {role === 'student' && (
              <div className="su-owner-fields" style={{ display:'flex', flexDirection:'column', gap:13 }}>

                {/* First Name + Last Name */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  <div>
                    <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>First Name</label>
                    <div style={{ position:'relative' }}>
                      <User size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'firstName' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s' }} />
                      <input
                        type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                        placeholder="John" autoComplete="given-name"
                        className={`su-input${firstNameError && touchedFields.firstName ? ' invalid' : firstName && !firstNameError ? ' valid' : ''}`}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, firstName: true })); }}
                        style={{ paddingRight: firstName && !firstNameError && touchedFields.firstName ? 36 : 14, fontSize:13 }}
                      />
                      {firstName && !firstNameError && touchedFields.firstName && (
                        <svg style={{ position:'absolute', right:11, top:'50%', transform:'translateY(-50%)' }} width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4ade80" strokeWidth="2"/><path d="M6 10L9 13L14 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>
                      )}
                    </div>
                    {firstNameError && touchedFields.firstName && <p style={{ color:'#f87171', fontSize:11, marginTop:4, display:'flex', alignItems:'center', gap:3 }}><AlertCircle size={10} />{firstNameError}</p>}
                  </div>

                  <div>
                    <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Last Name</label>
                    <div style={{ position:'relative' }}>
                      <User size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'lastName' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s' }} />
                      <input
                        type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                        placeholder="Doe" autoComplete="family-name"
                        className={`su-input${lastNameError && touchedFields.lastName ? ' invalid' : lastName && !lastNameError ? ' valid' : ''}`}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, lastName: true })); }}
                        style={{ paddingRight: lastName && !lastNameError && touchedFields.lastName ? 36 : 14, fontSize:13 }}
                      />
                      {lastName && !lastNameError && touchedFields.lastName && (
                        <svg style={{ position:'absolute', right:11, top:'50%', transform:'translateY(-50%)' }} width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4ade80" strokeWidth="2"/><path d="M6 10L9 13L14 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>
                      )}
                    </div>
                    {lastNameError && touchedFields.lastName && <p style={{ color:'#f87171', fontSize:11, marginTop:4, display:'flex', alignItems:'center', gap:3 }}><AlertCircle size={10} />{lastNameError}</p>}
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Mobile Number</label>
                  <div style={{ position:'relative' }}>
                    <Phone size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'mobileNumber' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s' }} />
                    <input
                      type="tel" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)}
                      placeholder="+94 77 123 4567" autoComplete="tel"
                      className={`su-input${mobileError && touchedFields.mobileNumber ? ' invalid' : mobileNumber && !mobileError ? ' valid' : ''}`}
                      onFocus={() => setFocusedField('mobileNumber')}
                      onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, mobileNumber: true })); }}
                      style={{ paddingRight: mobileNumber && !mobileError && touchedFields.mobileNumber ? 36 : 14 }}
                    />
                    {mobileNumber && !mobileError && touchedFields.mobileNumber && (
                      <svg style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)' }} width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4ade80" strokeWidth="2"/><path d="M6 10L9 13L14 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>
                    )}
                  </div>
                  {mobileError && touchedFields.mobileNumber && <p style={{ color:'#f87171', fontSize:11.5, marginTop:5, display:'flex', alignItems:'center', gap:4 }}><AlertCircle size={11} />{mobileError}</p>}
                </div>

                {/* Gender */}
                <div>
                  <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Gender</label>
                  <div style={{ position:'relative' }}>
                    <User size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'gender' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s', zIndex:1 }} />
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color:'rgba(148,163,184,.5)' }}><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <select
                      value={gender} onChange={e => setGender(e.target.value)}
                      className={`su-select${genderError && touchedFields.gender ? ' invalid' : gender ? ' valid' : ''}`}
                      onFocus={() => setFocusedField('gender')}
                      onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, gender: true })); }}
                    >
                      <option value="" disabled style={{ color:'rgba(148,163,184,.45)' }}>Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {genderError && touchedFields.gender && <p style={{ color:'#f87171', fontSize:11.5, marginTop:5, display:'flex', alignItems:'center', gap:4 }}><AlertCircle size={11} />{genderError}</p>}
                </div>

                {/* Birthday + Academic Year */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {/* Birthday */}
                  <div>
                    <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Birthday</label>
                    <div style={{ position:'relative' }}>
                      <Calendar size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'birthday' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s', zIndex:1 }} />
                      <input
                        type="date" value={birthday} onChange={e => setBirthday(e.target.value)}
                        max={new Date(Date.now() - 16*365.25*24*3600*1000).toISOString().split('T')[0]}
                        className={`su-input${birthdayError && touchedFields.birthday ? ' invalid' : birthday && !birthdayError ? ' valid' : ''}`}
                        onFocus={() => setFocusedField('birthday')}
                        onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, birthday: true })); }}
                        style={{ paddingRight: 14, fontSize:13 }}
                      />
                    </div>
                    {birthdayError && touchedFields.birthday && <p style={{ color:'#f87171', fontSize:11, marginTop:4, display:'flex', alignItems:'center', gap:3 }}><AlertCircle size={10} />{birthdayError}</p>}
                  </div>

                  {/* Academic Year */}
                  <div>
                    <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Academic Year</label>
                    <div style={{ position:'relative' }}>
                      <GraduationCap size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'academicYear' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s', zIndex:1 }} />
                      {/* Dropdown arrow */}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color:'rgba(148,163,184,.5)' }}><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      <select
                        value={academicYear} onChange={e => setAcademicYear(e.target.value)}
                        className={`su-select${academicYearError && touchedFields.academicYear ? ' invalid' : academicYear ? ' valid' : ''}`}
                        onFocus={() => setFocusedField('academicYear')}
                        onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, academicYear: true })); }}
                        style={{ fontSize:13 }}
                      >
                        <option value="" disabled style={{ color:'rgba(148,163,184,.45)' }}>Year</option>
                        <option value="1">Year 1</option>
                        <option value="2">Year 2</option>
                        <option value="3">Year 3</option>
                        <option value="4">Year 4</option>
                      </select>
                    </div>
                    {academicYearError && touchedFields.academicYear && <p style={{ color:'#f87171', fontSize:11, marginTop:4, display:'flex', alignItems:'center', gap:3 }}><AlertCircle size={10} />{academicYearError}</p>}
                  </div>
                </div>

              </div>
            )}

            {/* Owner-only fields */}
            {role === 'owner' && (
              <div className="su-owner-fields" style={{ display:'flex', flexDirection:'column', gap:13 }}>

                {/* First Name + Last Name */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  <div>
                    <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>First Name</label>
                    <div style={{ position:'relative' }}>
                      <User size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'firstName' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s' }} />
                      <input
                        type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                        placeholder="John" autoComplete="given-name"
                        className={`su-input${firstNameError && touchedFields.firstName ? ' invalid' : firstName && !firstNameError ? ' valid' : ''}`}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, firstName: true })); }}
                        style={{ paddingRight: firstName && !firstNameError && touchedFields.firstName ? 36 : 14, fontSize:13 }}
                      />
                      {firstName && !firstNameError && touchedFields.firstName && (
                        <svg style={{ position:'absolute', right:11, top:'50%', transform:'translateY(-50%)' }} width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4ade80" strokeWidth="2"/><path d="M6 10L9 13L14 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>
                      )}
                    </div>
                    {firstNameError && touchedFields.firstName && <p style={{ color:'#f87171', fontSize:11, marginTop:4, display:'flex', alignItems:'center', gap:3 }}><AlertCircle size={10} />{firstNameError}</p>}
                  </div>

                  <div>
                    <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Last Name</label>
                    <div style={{ position:'relative' }}>
                      <User size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'lastName' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s' }} />
                      <input
                        type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                        placeholder="Doe" autoComplete="family-name"
                        className={`su-input${lastNameError && touchedFields.lastName ? ' invalid' : lastName && !lastNameError ? ' valid' : ''}`}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, lastName: true })); }}
                        style={{ paddingRight: lastName && !lastNameError && touchedFields.lastName ? 36 : 14, fontSize:13 }}
                      />
                      {lastName && !lastNameError && touchedFields.lastName && (
                        <svg style={{ position:'absolute', right:11, top:'50%', transform:'translateY(-50%)' }} width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4ade80" strokeWidth="2"/><path d="M6 10L9 13L14 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>
                      )}
                    </div>
                    {lastNameError && touchedFields.lastName && <p style={{ color:'#f87171', fontSize:11, marginTop:4, display:'flex', alignItems:'center', gap:3 }}><AlertCircle size={10} />{lastNameError}</p>}
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Mobile Number</label>
                  <div style={{ position:'relative' }}>
                    <Phone size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'mobileNumber' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s' }} />
                    <input
                      type="tel" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)}
                      placeholder="+94 77 123 4567" autoComplete="tel"
                      className={`su-input${mobileError && touchedFields.mobileNumber ? ' invalid' : mobileNumber && !mobileError ? ' valid' : ''}`}
                      onFocus={() => setFocusedField('mobileNumber')}
                      onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, mobileNumber: true })); }}
                      style={{ paddingRight: mobileNumber && !mobileError && touchedFields.mobileNumber ? 36 : 14 }}
                    />
                    {mobileNumber && !mobileError && touchedFields.mobileNumber && (
                      <svg style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)' }} width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4ade80" strokeWidth="2"/><path d="M6 10L9 13L14 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>
                    )}
                  </div>
                  {mobileError && touchedFields.mobileNumber && <p style={{ color:'#f87171', fontSize:11.5, marginTop:5, display:'flex', alignItems:'center', gap:4 }}><AlertCircle size={11} />{mobileError}</p>}
                </div>

                {/* Gender */}
                <div>
                  <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Gender</label>
                  <div style={{ position:'relative' }}>
                    <User size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'gender' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s', zIndex:1 }} />
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color:'rgba(148,163,184,.5)' }}><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <select
                      value={gender} onChange={e => setGender(e.target.value)}
                      className={`su-select${genderError && touchedFields.gender ? ' invalid' : gender ? ' valid' : ''}`}
                      onFocus={() => setFocusedField('gender')}
                      onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, gender: true })); }}
                    >
                      <option value="" disabled style={{ color:'rgba(148,163,184,.45)' }}>Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {genderError && touchedFields.gender && <p style={{ color:'#f87171', fontSize:11.5, marginTop:5, display:'flex', alignItems:'center', gap:4 }}><AlertCircle size={11} />{genderError}</p>}
                </div>

                {/* NIC + Occupation */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {/* NIC */}
                  <div>
                    <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>NIC</label>
                    <div style={{ position:'relative' }}>
                      <CreditCard size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'nic' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s' }} />
                      <input
                        type="text" value={nic} onChange={e => setNic(e.target.value)}
                        placeholder="123456789V" autoComplete="off"
                        className={`su-input${nicError && touchedFields.nic ? ' invalid' : nic && !nicError ? ' valid' : ''}`}
                        onFocus={() => setFocusedField('nic')}
                        onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, nic: true })); }}
                        style={{ paddingRight: nic && !nicError && touchedFields.nic ? 36 : 14, fontSize:13 }}
                      />
                      {nic && !nicError && touchedFields.nic && (
                        <svg style={{ position:'absolute', right:11, top:'50%', transform:'translateY(-50%)' }} width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4ade80" strokeWidth="2"/><path d="M6 10L9 13L14 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>
                      )}
                    </div>
                    {nicError && touchedFields.nic && <p style={{ color:'#f87171', fontSize:11, marginTop:4, display:'flex', alignItems:'center', gap:3 }}><AlertCircle size={10} />{nicError}</p>}
                  </div>

                  {/* Occupation */}
                  <div>
                    <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Occupation</label>
                    <div style={{ position:'relative' }}>
                      <Briefcase size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'occupation' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s' }} />
                      <input
                        type="text" value={occupation} onChange={e => setOccupation(e.target.value)}
                        placeholder="Property Owner" autoComplete="organization-title"
                        className={`su-input${occupationError && touchedFields.occupation ? ' invalid' : occupation && !occupationError ? ' valid' : ''}`}
                        onFocus={() => setFocusedField('occupation')}
                        onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, occupation: true })); }}
                        style={{ paddingRight: occupation && !occupationError && touchedFields.occupation ? 36 : 14, fontSize:13 }}
                      />
                      {occupation && !occupationError && touchedFields.occupation && (
                        <svg style={{ position:'absolute', right:11, top:'50%', transform:'translateY(-50%)' }} width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4ade80" strokeWidth="2"/><path d="M6 10L9 13L14 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>
                      )}
                    </div>
                    {occupationError && touchedFields.occupation && <p style={{ color:'#f87171', fontSize:11, marginTop:4, display:'flex', alignItems:'center', gap:3 }}><AlertCircle size={10} />{occupationError}</p>}
                  </div>
                </div>

              </div>
            )}

            {/* Email */}
            <div>
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Email Address</label>
              <div style={{ position:'relative' }}>
                <Mail size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'email' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s' }} />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder={role === 'student' ? 'student@my.sliit.lk' : 'owner@company.com'}
                  autoComplete="email"
                  className={`su-input${emailError && touchedFields.email ? ' invalid' : email && !emailError ? ' valid' : ''}`}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, email: true })); }}
                  style={{ paddingRight: 14 }}
                />
                {email && !emailError && touchedFields.email && (
                  <svg style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)' }} width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4ade80" strokeWidth="2"/><path d="M6 10L9 13L14 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>
                )}
              </div>
              {emailError && touchedFields.email
                ? <p style={{ color:'#f87171', fontSize:11.5, marginTop:5, display:'flex', alignItems:'center', gap:4 }}><AlertCircle size={11} />{emailError}</p>
                : <p style={{ color:'rgba(129,140,248,.45)', fontSize:11, marginTop:5 }}>{role === 'student' ? '@sliit.lk or @my.sliit.lk' : 'Business or personal email'}</p>
              }
            </div>

            {/* Password row */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {/* Password */}
              <div>
                <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Password</label>
                <div style={{ position:'relative' }}>
                  <Lock size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'password' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s' }} />
                  <input
                    type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" autoComplete="new-password"
                    className={`su-input${passwordError && touchedFields.password ? ' invalid' : password && !passwordError ? ' valid' : ''}`}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, password: true })); }}
                    style={{ paddingRight: 44, fontSize:13 }}
                  />
                  <button type="button" onClick={() => setShowPassword(p => !p)}
                    style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(148,163,184,.5)', padding:0, display:'flex', transition:'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color='#cbd5e1')}
                    onMouseLeave={e => (e.currentTarget.style.color='rgba(148,163,184,.5)')}>
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {passwordError && touchedFields.password && <p style={{ color:'#f87171', fontSize:11, marginTop:4, display:'flex', alignItems:'center', gap:3 }}><AlertCircle size={10} />{passwordError}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label style={{ display:'block', fontSize:12, fontWeight:600, color:'rgba(203,213,225,.85)', marginBottom:7, letterSpacing:'0.01em' }}>Confirm</label>
                <div style={{ position:'relative' }}>
                  <Lock size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color: focusedField === 'confirm' ? '#818cf8' : 'rgba(148,163,184,.5)', pointerEvents:'none', transition:'color .2s' }} />
                  <input
                    type={showConfirm ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)}
                    placeholder="••••••••" autoComplete="new-password"
                    className={`su-input${confirmError && touchedFields.confirm ? ' invalid' : confirm && !confirmError ? ' valid' : ''}`}
                    onFocus={() => setFocusedField('confirm')}
                    onBlur={() => { setFocusedField(null); setTouchedFields(p => ({ ...p, confirm: true })); }}
                    style={{ paddingRight: 44, fontSize:13 }}
                  />
                  <button type="button" onClick={() => setShowConfirm(p => !p)}
                    style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(148,163,184,.5)', padding:0, display:'flex', transition:'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color='#cbd5e1')}
                    onMouseLeave={e => (e.currentTarget.style.color='rgba(148,163,184,.5)')}>
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {confirmError && touchedFields.confirm && <p style={{ color:'#f87171', fontSize:11, marginTop:4, display:'flex', alignItems:'center', gap:3 }}><AlertCircle size={10} />{confirmError}</p>}
              </div>
            </div>

            {/* Password strength — students only */}
            {role === 'student' && password && pwStrength && (
              <div style={{ background:'rgba(129,140,248,.04)', border:'1px solid rgba(129,140,248,.1)', borderRadius:11, padding:'10px 12px' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5px 10px', marginBottom:8 }}>
                  {[
                    { label:'8+ chars',  ok: pwStrength.checks.length },
                    { label:'Number',    ok: pwStrength.checks.number },
                    { label:'Symbol',    ok: pwStrength.checks.symbol },
                    { label:'Uppercase', ok: pwStrength.checks.uppercase },
                  ].map(r => (
                    <div key={r.label} style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <div style={{ width:12, height:12, borderRadius:'50%', background: r.ok ? 'rgba(74,222,128,.2)' : 'rgba(255,255,255,.05)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        {r.ok
                          ? <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"/></svg>
                          : <div style={{ width:3, height:3, borderRadius:'50%', background:'rgba(148,163,184,.3)' }} />}
                      </div>
                      <span style={{ fontSize:11, color: r.ok ? '#4ade80' : 'rgba(148,163,184,.5)' }}>{r.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ flex:1, height:3, borderRadius:99, background:'rgba(255,255,255,.06)', overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${pwStrength.score * 25}%`, background:pwStrength.color, borderRadius:99, transition:'width .4s, background .4s' }} />
                  </div>
                  <span style={{ fontSize:11, fontWeight:600, color:pwStrength.color, minWidth:40, textAlign:'right' }}>{pwStrength.strength}</span>
                </div>
              </div>
            )}

            {/* Error / Success */}
            {error && (
              <div className="su-shake" style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.25)', borderRadius:10, padding:'10px 14px' }}>
                <AlertCircle size={14} color="#f87171" style={{ flexShrink:0 }} />
                <span style={{ color:'#f87171', fontSize:13 }}>{error}</span>
              </div>
            )}
            {success && (
              <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(34,197,94,.1)', border:'1px solid rgba(34,197,94,.25)', borderRadius:10, padding:'10px 14px' }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink:0 }}><circle cx="10" cy="10" r="8" stroke="#4ade80" strokeWidth="2"/><path d="M6 10L9 13L14 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/></svg>
                <span style={{ color:'#4ade80', fontSize:13 }}>{success}</span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={isLoading} className="su-btn" style={{ marginTop:4 }}>
              {isLoading
                ? <><Loader2 size={16} style={{ animation:'spin 1s linear infinite' }} />Creating account…</>
                : <><Sparkles size={15} />Create Account</>}
            </button>
          </form>

          {/* Social + footer */}
          <div style={{ marginTop:20 }}>

            <div style={{ textAlign:'center', marginBottom:14 }}>
              <p style={{ color:'rgba(148,163,184,.5)', fontSize:13 }}>
                Already have an account?{' '}
                <a href="/signin" style={{ color:'#818cf8', fontWeight:600, textDecoration:'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color='#a5b4fc')} onMouseLeave={e => (e.currentTarget.style.color='#818cf8')}>
                  Sign In
                </a>
              </p>
            </div>

            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16 }}>
              <a href="/privacy" style={{ fontSize:11, color:'rgba(148,163,184,.35)', textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}
                onMouseEnter={e => (e.currentTarget.style.color='rgba(165,180,252,.6)')} onMouseLeave={e => (e.currentTarget.style.color='rgba(148,163,184,.35)')}>
                <FileText size={10} />Privacy
              </a>
              <span style={{ color:'rgba(148,163,184,.2)', fontSize:11 }}>·</span>
              <a href="/terms" style={{ fontSize:11, color:'rgba(148,163,184,.35)', textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}
                onMouseEnter={e => (e.currentTarget.style.color='rgba(165,180,252,.6)')} onMouseLeave={e => (e.currentTarget.style.color='rgba(148,163,184,.35)')}>
                <Shield size={10} />Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/// <reference types="vite/client" />
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const API_BASE_URL = (
  (import.meta as any).env?.VITE_API_URL || 'http://localhost:5001'
).replace(/\/api\/?$/, '').replace(/\/$/, '');

type Stage = 'waiting' | 'verifying' | 'error';

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate  = useNavigate();
  const params    = useParams<{ token?: string }>();

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const token = params.token || query.get('token') || '';
  const email = query.get('email') || '';

  const [stage,      setStage]      = useState<Stage>(token ? 'verifying' : 'waiting');
  const [errorMsg,   setErrorMsg]   = useState('');
  const [resending,  setResending]  = useState(false);
  const [resendDone, setResendDone] = useState(false);

  // Auto-verify when token is present, then navigate to the confirmed page
  useEffect(() => {
    if (!token) return;

    setStage('verifying');

    fetch(`${API_BASE_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          // After email verification, redirect to profile setup (not email confirmed page)
          navigate(
            `/profile-setup${email ? `?email=${encodeURIComponent(email)}` : ''}`,
            { replace: true }
          );
        } else {
          setErrorMsg(data.message || 'Verification failed.');
          setStage('error');
        }
      })
      .catch(() => {
        setErrorMsg('Could not connect to the server. Please try again.');
        setStage('error');
      });
  }, [token]);

  const handleResend = async () => {
    if (!email || resending) return;
    setResending(true);
    try {
      const r = await fetch(`${API_BASE_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await r.json();
      if (!data.success) throw new Error(data.message);
      setResendDone(true);
      setErrorMsg('');
    } catch (e: any) {
      setErrorMsg(e.message || 'Could not resend. Please try again.');
    } finally {
      setResending(false);
    }
  };

  // ── Shared shell ──────────────────────────────────────────────────────────
  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      minHeight: '100vh',
      background: '#0f1629',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes ve-float-a { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-24px) scale(1.04);} }
        @keyframes ve-float-b { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-18px) scale(1.06);} }
        @keyframes ve-fade    { from{opacity:0;transform:translateY(18px);} to{opacity:1;transform:translateY(0);} }
        @keyframes ve-spin    { to{transform:rotate(360deg);} }
        @keyframes ve-pop     { 0%{transform:scale(.6);opacity:0;} 70%{transform:scale(1.12);} 100%{transform:scale(1);opacity:1;} }
        .ve-card  { animation: ve-fade  .5s cubic-bezier(.22,.68,0,1.2) both; }
        .ve-icon  { animation: ve-pop   .6s cubic-bezier(.22,.68,0,1.2) .15s both; }
        .ve-spin  { animation: ve-spin  .9s linear infinite; }
        .ve-orb-a { animation: ve-float-a 9s ease-in-out infinite; }
        .ve-orb-b { animation: ve-float-b 7s ease-in-out infinite 1.5s; }
        .ve-btn {
          width:100%; padding:.85rem 1rem; border:none; border-radius:.75rem;
          font-size:1rem; font-weight:600; cursor:pointer; transition:opacity .2s, transform .15s;
        }
        .ve-btn:hover:not(:disabled) { opacity:.88; transform:translateY(-1px); }
        .ve-btn:disabled { opacity:.5; cursor:not-allowed; }
        .ve-btn-primary { background:linear-gradient(135deg,#6366f1,#22d3ee); color:#fff; }
        .ve-btn-ghost   { background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.15)!important; color:#cbd5e1; }
        .ve-link { color:#67e8f9; text-decoration:underline; cursor:pointer; background:none; border:none; font-size:.875rem; }
      `}</style>

      <div className="ve-orb-a" style={{ position:'absolute', top:'-10%', left:'-5%', width:'420px', height:'420px', borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div className="ve-orb-b" style={{ position:'absolute', bottom:'-8%', right:'-4%', width:'360px', height:'360px', borderRadius:'50%', background:'radial-gradient(circle,rgba(34,211,238,.13) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div className="ve-card" style={{
        width:'100%', maxWidth:'460px',
        background:'rgba(255,255,255,.04)',
        border:'1px solid rgba(255,255,255,.1)',
        borderRadius:'1.25rem',
        padding:'2.5rem 2rem',
        backdropFilter:'blur(20px)',
        boxShadow:'0 25px 50px rgba(0,0,0,.5)',
        position:'relative', zIndex:1,
        textAlign:'center',
      }}>
        {children}
      </div>
    </div>
  );

  // ── Verifying ─────────────────────────────────────────────────────────────
  if (stage === 'verifying') {
    return (
      <Shell>
        <svg className="ve-spin" width="52" height="52" viewBox="0 0 24 24" fill="none" style={{ margin:'0 auto 1.25rem', display:'block' }}>
          <circle cx="12" cy="12" r="10" stroke="rgba(99,102,241,.25)" strokeWidth="3"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#818cf8" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <h1 style={{ fontSize:'1.6rem', fontWeight:700, color:'#e2e8f0', marginBottom:'.5rem' }}>Confirming your email…</h1>
        <p style={{ color:'#94a3b8', fontSize:'.95rem' }}>Please wait a moment.</p>
      </Shell>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (stage === 'error') {
    return (
      <Shell>
        <div className="ve-icon" style={{ marginBottom:'1.25rem' }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin:'0 auto', display:'block' }}>
            <circle cx="32" cy="32" r="32" fill="rgba(239,68,68,.12)"/>
            <circle cx="32" cy="32" r="24" fill="rgba(239,68,68,.18)"/>
            <path d="M22 22l20 20M42 22L22 42" stroke="#f87171" strokeWidth="3.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 style={{ fontSize:'1.6rem', fontWeight:700, color:'#f87171', marginBottom:'.75rem' }}>
          Verification Failed
        </h1>
        <p style={{ color:'#94a3b8', fontSize:'.95rem', marginBottom:'1.75rem', lineHeight:1.6 }}>
          {errorMsg}
        </p>
        {email && !resendDone && (
          <button
            className="ve-btn ve-btn-primary"
            style={{ marginBottom:'.75rem' }}
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? 'Sending…' : 'Send a New Verification Email'}
          </button>
        )}
        {resendDone && (
          <p style={{ color:'#34d399', fontSize:'.9rem', marginBottom:'1rem' }}>
            ✓ New link sent — please check your inbox.
          </p>
        )}
        <button className="ve-btn ve-btn-ghost" onClick={() => navigate('/signup')}>
          Back to Sign Up
        </button>
      </Shell>
    );
  }

  // ── Waiting (no token — just signed up) ──────────────────────────────────
  return (
    <Shell>
      <div className="ve-icon" style={{ marginBottom:'1.25rem' }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin:'0 auto', display:'block' }}>
          <circle cx="32" cy="32" r="32" fill="rgba(99,102,241,.12)"/>
          <circle cx="32" cy="32" r="24" fill="rgba(99,102,241,.18)"/>
          <rect x="16" y="22" width="32" height="22" rx="3" stroke="#818cf8" strokeWidth="2.5" fill="none"/>
          <path d="M16 26l16 11 16-11" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>

      <h1 style={{ fontSize:'1.75rem', fontWeight:700, color:'#e2e8f0', marginBottom:'.75rem' }}>
        Check Your Email
      </h1>
      <p style={{ color:'#94a3b8', fontSize:'.95rem', lineHeight:1.75, marginBottom:'1.75rem' }}>
        We sent a confirmation link to<br/>
        {email
          ? <strong style={{ color:'#818cf8' }}>{email}</strong>
          : 'your email address'
        }.<br/>
        Click the link to activate your account.
      </p>

      {resendDone ? (
        <p style={{ color:'#34d399', fontSize:'.9rem', marginBottom:'1.5rem' }}>
          ✓ New link sent — please check your inbox.
        </p>
      ) : (
        <p style={{ color:'#64748b', fontSize:'.875rem', marginBottom:'1.5rem' }}>
          Didn't receive it?{' '}
          <button className="ve-link" onClick={handleResend} disabled={resending}>
            {resending ? 'Sending…' : 'Resend email'}
          </button>
        </p>
      )}

      <button className="ve-btn ve-btn-ghost" onClick={() => navigate('/signin')}>
        Back to Sign In
      </button>
    </Shell>
  );
}

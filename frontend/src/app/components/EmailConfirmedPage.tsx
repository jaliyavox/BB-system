import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EmailConfirmedPage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const email     = new URLSearchParams(location.search).get('email') || '';
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Tiny delay so the pop animation is visible
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
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
        @keyframes ec-float-a { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-26px) scale(1.04);} }
        @keyframes ec-float-b { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-18px) scale(1.06);} }
        @keyframes ec-fade-up { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
        @keyframes ec-pop     { 0%{transform:scale(.5);opacity:0;} 65%{transform:scale(1.15);} 100%{transform:scale(1);opacity:1;} }
        @keyframes ec-draw    { from{stroke-dashoffset:40;} to{stroke-dashoffset:0;} }
        @keyframes ec-glow    { 0%,100%{box-shadow:0 0 40px rgba(16,185,129,.3);} 50%{box-shadow:0 0 70px rgba(16,185,129,.55);} }
        .ec-orb-a { animation: ec-float-a 9s  ease-in-out infinite; }
        .ec-orb-b { animation: ec-float-b 7s  ease-in-out infinite 1.4s; }
        .ec-card  { animation: ec-fade-up .5s cubic-bezier(.22,.68,0,1.2) both; }
        .ec-icon  { animation: ec-pop     .7s cubic-bezier(.22,.68,0,1.2) .2s both; }
        .ec-check { animation: ec-draw    .5s ease-out .7s both; stroke-dasharray:40; }
        .ec-glow  { animation: ec-glow    2.5s ease-in-out infinite .9s; }
        .ec-btn-primary {
          width:100%; padding:.9rem 1rem; border:none; border-radius:.75rem;
          background:linear-gradient(135deg,#6366f1,#22d3ee);
          color:#fff; font-size:1rem; font-weight:700; cursor:pointer;
          transition:opacity .2s, transform .15s; letter-spacing:.01em;
        }
        .ec-btn-primary:hover { opacity:.88; transform:translateY(-2px); }
        .ec-badge {
          display:inline-flex; align-items:center; gap:.45rem;
          background:rgba(16,185,129,.1); border:1px solid rgba(16,185,129,.25);
          border-radius:100px; padding:.35rem .9rem;
          color:#34d399; font-size:.8rem; font-weight:600; letter-spacing:.02em;
        }
      `}</style>

      {/* Background orbs */}
      <div className="ec-orb-a" style={{ position:'absolute', top:'-8%', left:'-6%', width:'440px', height:'440px', borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.15) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div className="ec-orb-b" style={{ position:'absolute', bottom:'-6%', right:'-4%', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,rgba(16,185,129,.12) 0%,transparent 70%)', pointerEvents:'none' }} />
      {/* Grid overlay */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize:'48px 48px', pointerEvents:'none', opacity:.4 }} />

      <div className={`ec-card`} style={{
        width:'100%', maxWidth:'460px',
        background:'rgba(255,255,255,.04)',
        border:'1px solid rgba(255,255,255,.1)',
        borderRadius:'1.4rem',
        padding:'2.75rem 2rem',
        backdropFilter:'blur(24px)',
        boxShadow:'0 25px 60px rgba(0,0,0,.55)',
        position:'relative', zIndex:1,
        textAlign:'center',
        opacity: show ? 1 : 0,
      }}>

        {/* Animated checkmark */}
        <div className="ec-icon" style={{ marginBottom:'1.5rem' }}>
          <div className="ec-glow" style={{
            width:'88px', height:'88px', borderRadius:'50%',
            background:'linear-gradient(145deg,rgba(16,185,129,.25),rgba(5,150,105,.3))',
            border:'1px solid rgba(52,211,153,.3)',
            display:'flex', alignItems:'center', justifyContent:'center',
            margin:'0 auto',
          }}>
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
              <circle cx="23" cy="23" r="22" fill="rgba(16,185,129,.15)" stroke="rgba(52,211,153,.4)" strokeWidth="1.5"/>
              <path
                className="ec-check"
                d="M13 23l8 8 13-13"
                stroke="#34d399"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <div style={{ marginBottom:'1.1rem' }}>
          <span className="ec-badge">✓ &nbsp;Verification Complete</span>
        </div>

        {/* Heading */}
        <h1 style={{ fontSize:'1.85rem', fontWeight:800, color:'#f1f5f9', marginBottom:'.6rem', letterSpacing:'-.02em', lineHeight:1.15 }}>
          Email Confirmed<br/>Successfully!
        </h1>

        {/* Sub-text */}
        <p style={{ color:'#94a3b8', fontSize:'.95rem', lineHeight:1.7, marginBottom: email ? '.4rem' : '2rem' }}>
          Your BoardingBook account is now active and ready to use.
        </p>
        {email && (
          <p style={{ color:'#818cf8', fontSize:'.88rem', marginBottom:'2rem', fontWeight:500 }}>
            {email}
          </p>
        )}

        {/* CTA */}
        <button
          className="ec-btn-primary"
          onClick={() => navigate(email ? `/signin?email=${encodeURIComponent(email)}` : '/signin')}
        >
          Sign In to Your Account →
        </button>

        {/* Footer note */}
        <p style={{ color:'#475569', fontSize:'.8rem', marginTop:'1.25rem' }}>
          You can now sign in and start exploring boarding places.
        </p>
      </div>
    </div>
  );
}

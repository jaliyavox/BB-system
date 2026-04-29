import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Bell, UserCheck, Mail } from 'lucide-react';

export default function PrivacyPage() {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Database size={18} color="#818cf8" />,
      title: 'Information We Collect',
      content: [
        'Account information: name, email address, mobile number, date of birth, and academic/professional details you provide during sign-up.',
        'Profile data: profile photo, university year, NIC (for owners), and occupation where applicable.',
        'Usage data: pages visited, search queries, listing views, and interaction timestamps.',
        'Device & technical data: IP address, browser type, operating system, and device identifiers.',
        'Communication data: messages exchanged between students and boarding-house owners through our in-app chat.',
      ],
    },
    {
      icon: <Eye size={18} color="#22d3ee" />,
      title: 'How We Use Your Information',
      content: [
        'To create and manage your BoardingBook account and verify your identity.',
        'To match students with suitable boarding rooms near SLIIT based on preferences.',
        'To facilitate communication between students and boarding-house owners.',
        'To process bookings, payment records, and rental agreements.',
        'To send transactional emails such as email verification, booking confirmations, and payment receipts.',
        'To improve our platform through analytics and usage insights.',
        'To comply with legal obligations and resolve disputes.',
      ],
    },
    {
      icon: <UserCheck size={18} color="#a78bfa" />,
      title: 'Sharing of Information',
      content: [
        'We do not sell your personal information to third parties.',
        'Student profiles (name, academic year) are shared with boarding-house owners when you submit a booking request.',
        'Owner profiles (name, NIC, occupation, contact) are visible to verified students browsing listings.',
        'We may share data with trusted service providers (e.g., email delivery, cloud hosting) under strict confidentiality agreements.',
        'We may disclose information if required by Sri Lankan law, court order, or to protect the rights and safety of our users.',
      ],
    },
    {
      icon: <Lock size={18} color="#4ade80" />,
      title: 'Data Security',
      content: [
        'Passwords are hashed using bcrypt and are never stored in plain text.',
        'All data transmission is encrypted using HTTPS/TLS.',
        'Access tokens are short-lived JWTs stored securely on your device.',
        'We conduct regular security reviews and promptly address any vulnerabilities.',
        'Despite our safeguards, no internet transmission is 100% secure; you use the platform at your own risk.',
      ],
    },
    {
      icon: <Bell size={18} color="#facc15" />,
      title: 'Cookies & Tracking',
      content: [
        'We use essential cookies to maintain your login session and preferences.',
        'We may use analytics cookies (e.g., aggregated page-view counts) to understand how the platform is used.',
        'You can disable cookies in your browser settings; however, core platform features may not function correctly.',
        'We do not use advertising or tracking cookies from third-party ad networks.',
      ],
    },
    {
      icon: <Mail size={18} color="#818cf8" />,
      title: 'Your Rights',
      content: [
        'Access: you may request a copy of the personal data we hold about you.',
        'Correction: you may update inaccurate information via your profile settings at any time.',
        'Deletion: you may request deletion of your account and associated data by contacting us.',
        'Portability: you may request an export of your data in a machine-readable format.',
        'To exercise these rights, email us at privacy@boardingbook.lk.',
      ],
    },
    {
      icon: <Shield size={18} color="#22d3ee" />,
      title: 'Data Retention',
      content: [
        'Active account data is retained for as long as your account exists.',
        'Booking and payment records are retained for 5 years to comply with financial record-keeping requirements.',
        'If you delete your account, your personal data is removed within 30 days, except where retention is required by law.',
        'Anonymous, aggregated usage statistics may be retained indefinitely.',
      ],
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0f1629', fontFamily: 'Inter, system-ui, sans-serif', color: '#e2e8f0', position: 'relative' }}>
      <style>{`
        @keyframes pp-orb-a { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-24px);} }
        @keyframes pp-orb-b { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-16px);} }
        .pp-orb-a { animation: pp-orb-a 9s ease-in-out infinite; }
        .pp-orb-b { animation: pp-orb-b 7s ease-in-out infinite 1.5s; }

        .pp-back {
          display:inline-flex; align-items:center; gap:6px;
          padding:7px 14px; border-radius:99px;
          background:rgba(255,255,255,.05); border:1px solid rgba(129,140,248,.18);
          color:rgba(165,180,252,.8); font-size:13px; font-weight:500;
          cursor:pointer; transition:all .2s; text-decoration:none;
        }
        .pp-back:hover { background:rgba(129,140,248,.1); border-color:rgba(129,140,248,.4); color:#a5b4fc; }

        .pp-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(129,140,248,.12);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 16px;
          transition: border-color .2s;
        }
        .pp-card:hover { border-color: rgba(129,140,248,.24); }

        .pp-bullet { position:relative; padding-left:16px; margin-bottom:8px; font-size:14px; color:rgba(203,213,225,.7); line-height:1.65; }
        .pp-bullet::before { content:''; position:absolute; left:0; top:9px; width:5px; height:5px; border-radius:50%; background:rgba(129,140,248,.5); }
      `}</style>

      {/* Background orbs */}
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        <div className="pp-orb-a" style={{ position:'absolute', top:'-10%', left:'-8%', width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.14) 0%,transparent 70%)' }} />
        <div className="pp-orb-b" style={{ position:'absolute', bottom:'-10%', right:'-6%', width:440, height:440, borderRadius:'50%', background:'radial-gradient(circle,rgba(34,211,238,.1) 0%,transparent 70%)' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(129,140,248,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(129,140,248,.025) 1px,transparent 1px)', backgroundSize:'48px 48px' }} />
      </div>

      <div style={{ position:'relative', zIndex:1, maxWidth:780, margin:'0 auto', padding:'48px 24px 64px' }}>

        {/* Back button */}
        <div style={{ marginBottom:40 }}>
          <button type="button" onClick={() => navigate(-1)} className="pp-back">
            <ArrowLeft size={15} /> Back
          </button>
        </div>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ width:56, height:56, borderRadius:18, background:'linear-gradient(135deg,#818cf8,#22d3ee)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:'0 0 32px rgba(129,140,248,.4)' }}>
            <Shield size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize:32, fontWeight:800, letterSpacing:'-0.03em', color:'#fff', margin:'0 0 12px' }}>Privacy Policy</h1>
          <p style={{ color:'rgba(148,163,184,.6)', fontSize:14, maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>
            BoardingBook is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
          </p>
          <p style={{ color:'rgba(129,140,248,.5)', fontSize:12, marginTop:12 }}>Last updated: April 2026 · Effective from: January 2025</p>
        </div>

        {/* Sections */}
        {sections.map((s, i) => (
          <div key={i} className="pp-card">
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'rgba(129,140,248,.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:'1px solid rgba(129,140,248,.12)' }}>
                {s.icon}
              </div>
              <h2 style={{ fontSize:16, fontWeight:700, color:'#e2e8f0', margin:0 }}>{s.title}</h2>
            </div>
            <div>
              {s.content.map((c, j) => (
                <p key={j} className="pp-bullet">{c}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Contact box */}
        <div style={{ background:'rgba(129,140,248,.06)', border:'1px solid rgba(129,140,248,.2)', borderRadius:16, padding:24, marginTop:8, textAlign:'center' }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#e2e8f0', marginBottom:8 }}>Questions about this policy?</h3>
          <p style={{ color:'rgba(148,163,184,.6)', fontSize:13, marginBottom:12, lineHeight:1.65 }}>
            If you have questions or concerns about how we handle your data, our Data Protection Officer is here to help.
          </p>
          <a href="mailto:privacy@boardingbook.lk" style={{ color:'#818cf8', fontWeight:600, fontSize:14, textDecoration:'none' }}>
            privacy@boardingbook.lk
          </a>
        </div>

        {/* Footer */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:20, marginTop:32 }}>
          <a href="/terms" style={{ fontSize:12, color:'rgba(148,163,184,.4)', textDecoration:'none' }}
            onMouseEnter={e => (e.currentTarget.style.color='#a5b4fc')} onMouseLeave={e => (e.currentTarget.style.color='rgba(148,163,184,.4)')}>
            Terms of Service
          </a>
          <span style={{ color:'rgba(148,163,184,.2)' }}>·</span>
          <a href="/signup" style={{ fontSize:12, color:'rgba(148,163,184,.4)', textDecoration:'none' }}
            onMouseEnter={e => (e.currentTarget.style.color='#a5b4fc')} onMouseLeave={e => (e.currentTarget.style.color='rgba(148,163,184,.4)')}>
            Create Account
          </a>
          <span style={{ color:'rgba(148,163,184,.2)' }}>·</span>
          <a href="/signin" style={{ fontSize:12, color:'rgba(148,163,184,.4)', textDecoration:'none' }}
            onMouseEnter={e => (e.currentTarget.style.color='#a5b4fc')} onMouseLeave={e => (e.currentTarget.style.color='rgba(148,163,184,.4)')}>
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

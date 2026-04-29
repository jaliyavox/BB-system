import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, AlertTriangle, Users, CreditCard, Shield, Ban, Scale } from 'lucide-react';

export default function TermsPage() {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Users size={18} color="#818cf8" />,
      title: 'Acceptance & Eligibility',
      content: [
        'By creating an account or using BoardingBook, you agree to these Terms of Service in full.',
        'Student accounts are restricted to enrolled students of SLIIT (Sri Lanka Institute of Information Technology) with a valid @sliit.lk or @my.sliit.lk email address.',
        'Owner accounts are open to individuals or businesses operating boarding houses or rental properties.',
        'You must be at least 16 years of age to use this platform. Users under 18 represent that they have parental or guardian consent.',
        'We reserve the right to refuse registration or terminate accounts at our sole discretion.',
      ],
    },
    {
      icon: <FileText size={18} color="#22d3ee" />,
      title: 'User Accounts',
      content: [
        'You are responsible for maintaining the confidentiality of your login credentials.',
        'You agree to provide accurate, complete, and up-to-date information during registration.',
        'You must notify us immediately at support@boardingbook.lk if you suspect unauthorised access to your account.',
        'One person may not hold multiple accounts. Duplicate accounts will be removed without notice.',
        'You may not transfer or sell your account to another person.',
      ],
    },
    {
      icon: <Shield size={18} color="#a78bfa" />,
      title: 'Listings & Bookings',
      content: [
        'Owners are solely responsible for the accuracy, legality, and safety of their listings.',
        'Listing descriptions, photos, and pricing must truthfully represent the property being offered.',
        'BoardingBook does not guarantee the quality, safety, or legality of any listed property.',
        'Booking agreements between students and owners are binding contracts; BoardingBook acts solely as the facilitating platform.',
        'Students are advised to physically inspect any property before finalising a booking.',
        'We reserve the right to remove any listing that violates these terms or applicable law.',
      ],
    },
    {
      icon: <CreditCard size={18} color="#4ade80" />,
      title: 'Payments & Fees',
      content: [
        'All payments processed through BoardingBook are subject to our payment processing terms.',
        'Monthly rental payments, booking deposits, and advance fees are agreed upon between student and owner.',
        'BoardingBook may charge a platform service fee for facilitating transactions; this will be clearly disclosed at checkout.',
        'Refund policies for deposits and advance payments are governed by the individual rental agreement.',
        'We are not responsible for payment disputes between students and owners; however, we will assist in mediation where possible.',
      ],
    },
    {
      icon: <Ban size={18} color="#f87171" />,
      title: 'Prohibited Conduct',
      content: [
        'You must not use BoardingBook for any unlawful purpose or in violation of any applicable laws.',
        'You must not post false, misleading, or fraudulent information in listings or communications.',
        'Harassment, discrimination, or abusive behaviour towards other users is strictly prohibited.',
        'You must not attempt to bypass, disable, or circumvent any platform security mechanisms.',
        'You must not scrape, copy, or redistribute platform content without explicit written permission.',
        'Spam, unsolicited marketing messages, or phishing attempts are strictly prohibited.',
      ],
    },
    {
      icon: <AlertTriangle size={18} color="#facc15" />,
      title: 'Disclaimers & Limitations',
      content: [
        'BoardingBook is provided "as is" and "as available" without warranties of any kind.',
        'We do not warrant that the platform will be error-free, uninterrupted, or free of viruses.',
        'We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.',
        'Our total liability to you for any claim shall not exceed the amount you paid to us in the 12 months preceding the claim.',
        'We are not a party to rental agreements and bear no liability for disputes between students and owners.',
      ],
    },
    {
      icon: <Scale size={18} color="#22d3ee" />,
      title: 'Governing Law & Disputes',
      content: [
        'These Terms are governed by the laws of the Democratic Socialist Republic of Sri Lanka.',
        'Any dispute arising from these Terms or your use of the platform shall be resolved in the courts of Sri Lanka.',
        'We encourage users to contact us at legal@boardingbook.lk before initiating any formal legal proceedings.',
        'If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force.',
        'We may update these Terms at any time. Continued use of the platform after changes constitutes acceptance of the updated Terms.',
      ],
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0f1629', fontFamily: 'Inter, system-ui, sans-serif', color: '#e2e8f0', position: 'relative' }}>
      <style>{`
        @keyframes tp-orb-a { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-24px);} }
        @keyframes tp-orb-b { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-16px);} }
        .tp-orb-a { animation: tp-orb-a 9s ease-in-out infinite; }
        .tp-orb-b { animation: tp-orb-b 7s ease-in-out infinite 1.5s; }

        .tp-back {
          display:inline-flex; align-items:center; gap:6px;
          padding:7px 14px; border-radius:99px;
          background:rgba(255,255,255,.05); border:1px solid rgba(129,140,248,.18);
          color:rgba(165,180,252,.8); font-size:13px; font-weight:500;
          cursor:pointer; transition:all .2s; text-decoration:none;
        }
        .tp-back:hover { background:rgba(129,140,248,.1); border-color:rgba(129,140,248,.4); color:#a5b4fc; }

        .tp-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(129,140,248,.12);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 16px;
          transition: border-color .2s;
        }
        .tp-card:hover { border-color: rgba(129,140,248,.24); }

        .tp-bullet { position:relative; padding-left:16px; margin-bottom:8px; font-size:14px; color:rgba(203,213,225,.7); line-height:1.65; }
        .tp-bullet::before { content:''; position:absolute; left:0; top:9px; width:5px; height:5px; border-radius:50%; background:rgba(129,140,248,.5); }
      `}</style>

      {/* Background orbs */}
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        <div className="tp-orb-a" style={{ position:'absolute', top:'-10%', left:'-8%', width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.14) 0%,transparent 70%)' }} />
        <div className="tp-orb-b" style={{ position:'absolute', bottom:'-10%', right:'-6%', width:440, height:440, borderRadius:'50%', background:'radial-gradient(circle,rgba(34,211,238,.1) 0%,transparent 70%)' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(129,140,248,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(129,140,248,.025) 1px,transparent 1px)', backgroundSize:'48px 48px' }} />
      </div>

      <div style={{ position:'relative', zIndex:1, maxWidth:780, margin:'0 auto', padding:'48px 24px 64px' }}>

        {/* Back button */}
        <div style={{ marginBottom:40 }}>
          <button type="button" onClick={() => navigate(-1)} className="tp-back">
            <ArrowLeft size={15} /> Back
          </button>
        </div>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ width:56, height:56, borderRadius:18, background:'linear-gradient(135deg,#818cf8,#22d3ee)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:'0 0 32px rgba(129,140,248,.4)' }}>
            <FileText size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize:32, fontWeight:800, letterSpacing:'-0.03em', color:'#fff', margin:'0 0 12px' }}>Terms of Service</h1>
          <p style={{ color:'rgba(148,163,184,.6)', fontSize:14, maxWidth:480, margin:'0 auto', lineHeight:1.7 }}>
            These Terms govern your use of BoardingBook. Please read them carefully before creating an account or using the platform.
          </p>
          <p style={{ color:'rgba(129,140,248,.5)', fontSize:12, marginTop:12 }}>Last updated: April 2026 · Effective from: January 2025</p>
        </div>

        {/* Sections */}
        {sections.map((s, i) => (
          <div key={i} className="tp-card">
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'rgba(129,140,248,.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:'1px solid rgba(129,140,248,.12)' }}>
                {s.icon}
              </div>
              <h2 style={{ fontSize:16, fontWeight:700, color:'#e2e8f0', margin:0 }}>{s.title}</h2>
            </div>
            <div>
              {s.content.map((c, j) => (
                <p key={j} className="tp-bullet">{c}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Contact box */}
        <div style={{ background:'rgba(129,140,248,.06)', border:'1px solid rgba(129,140,248,.2)', borderRadius:16, padding:24, marginTop:8, textAlign:'center' }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:'#e2e8f0', marginBottom:8 }}>Questions about these terms?</h3>
          <p style={{ color:'rgba(148,163,184,.6)', fontSize:13, marginBottom:12, lineHeight:1.65 }}>
            If you have questions about these Terms of Service, please reach out to our legal team.
          </p>
          <a href="mailto:legal@boardingbook.lk" style={{ color:'#818cf8', fontWeight:600, fontSize:14, textDecoration:'none' }}>
            legal@boardingbook.lk
          </a>
        </div>

        {/* Footer */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:20, marginTop:32 }}>
          <a href="/privacy" style={{ fontSize:12, color:'rgba(148,163,184,.4)', textDecoration:'none' }}
            onMouseEnter={e => (e.currentTarget.style.color='#a5b4fc')} onMouseLeave={e => (e.currentTarget.style.color='rgba(148,163,184,.4)')}>
            Privacy Policy
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

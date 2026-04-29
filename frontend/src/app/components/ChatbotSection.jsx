import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseNLP, buildReply, facIco, SERVICES } from '../data/rooms';
import {
  BiBot, BiSend, BiTrash, BiArrowBack, BiSearch,
  BiHome, BiBuilding, BiGroup, BiMessageSquareDetail,
  BiChevronDown, BiChevronUp, BiStar, BiCheckCircle,
  BiBrain, BiWifi, BiDish, BiCar, BiShield,
} from 'react-icons/bi';

// ── Floating particles (same as hero) ──────────────────────────
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 4.1 + 1) % 97}%`,
  size: 2 + (i % 3),
  duration: 7 + (i % 7),
  delay: (i * 0.45) % 6,
  color:
    i % 3 === 0 ? 'rgba(34,211,238,0.45)' :
    i % 3 === 1 ? 'rgba(129,140,248,0.45)' :
                  'rgba(168,85,247,0.35)',
}));

const SUGG_CHIPS = [
  'Cheap room near SLIIT Malabe with WiFi',
  'Find me a female roommate in Nugegoda',
  'Master room under Rs. 15000 with AC',
  'Budget boarding with meals included',
];

const QUICK_LINKS = [
  { icon: <BiHome size={20} />, label: 'Home',            route: '/',                   color: 'text-cyan-400' },
  { icon: <BiSearch size={20} />, label: 'Find Rooms',    route: '/find',               color: 'text-purple-400' },
  { icon: <BiGroup size={20} />, label: 'Roommates',      route: '/roommate-finder',    color: 'text-pink-400' },
  { icon: <BiBuilding size={20} />, label: 'List Property', route: '/boarding-management', color: 'text-emerald-400' },
];

export default function ChatbotSection({ onApplyAI = null, standalone = false }) {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([{
    id: 0,
    role: 'bot',
    html: `Hi! I'm <strong>BoardingBot SL</strong>, your AI assistant.<br><br>I can help you:<br>🏠 Find boarding places<br>👥 Find roommates<br>🛎️ Browse services<br><br>What can I help you with today?`,
  }]);
  const [input, setInput]               = useState('');
  const [aiExtracted, setAiExtracted]   = useState(null);
  const [showSugg, setShowSugg]         = useState(true);
  const [suggOpen, setSuggOpen]         = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  function sendMsg(txt) {
    const text = typeof txt === 'string' ? txt : input.trim();
    if (!text) return;
    setInput('');
    setShowSugg(false);
    setSuggOpen(false);
    setMessages(prev => [
      ...prev,
      { id: Date.now(),     role: 'user', html: text },
      { id: Date.now() + 1, role: 'bot',  html: '...', loading: true },
    ]);
    setTimeout(() => {
      const e     = parseNLP(text);
      const reply = buildReply(e);
      setAiExtracted(e);
      setMessages(prev => prev.map(m => m.loading ? { ...m, html: reply, loading: false } : m));
    }, 800);
  }

  function handleApply() {
    if (onApplyAI && aiExtracted) onApplyAI(aiExtracted);
    if (aiExtracted?.intent === 'boarding') navigate('/find');
    else if (aiExtracted?.intent === 'roommate') navigate('/roommate-finder');
  }

  function clearChat() {
    setMessages([{
      id: 0,
      role: 'bot',
      html: `Hi! I'm <strong>BoardingBot SL</strong>, your AI assistant.<br><br>I can help you:<br>🏠 Find boarding places<br>👥 Find roommates<br>🛎️ Browse services<br><br>What can I help you with today?`,
    }]);
    setAiExtracted(null);
    setShowSugg(true);
    setSuggOpen(false);
  }

  return (
    <section
      className={`relative overflow-hidden text-white ${
        standalone ? 'min-h-screen' : 'py-16 px-4'
      } bg-gradient-to-br from-[#0a1124] via-[#131d3a] to-[#0b132b]`}
      id="chatbot"
    >
      {/* ── Inline keyframes ── */}
      <style>{`
        @keyframes bbFloat {
          0%, 100% { transform: translateY(0); opacity: 0; }
          10%       { opacity: 1; }
          90%       { opacity: 0.6; }
          100%      { transform: translateY(-90vh); }
        }
        @keyframes bbSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bbPulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,0); }
          50%      { box-shadow: 0 0 20px 4px rgba(34,211,238,0.18); }
        }
        .bb-slide-up { animation: bbSlideUp 0.5s ease-out both; }
        .bb-pulse-glow { animation: bbPulseGlow 3s ease-in-out infinite; }
        .bb-scrollbar::-webkit-scrollbar { width: 4px; }
        .bb-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 8px; }
        .bb-scrollbar::-webkit-scrollbar-thumb { background: rgba(129,140,248,0.4); border-radius: 8px; }
        @media (max-width: 640px) {
          input, select, textarea { font-size: 16px !important; }
        }
      `}</style>

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              bottom: '-6px',
              width:  `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              animation: `bbFloat ${p.duration}s ${p.delay}s linear infinite`,
            }}
          />
        ))}
        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 sm:py-14">

        {/* ── Back button ── */}
        {standalone && (
          <button
            onClick={() => navigate('/')}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm group"
          >
            <BiArrowBack className="group-hover:-translate-x-0.5 transition-transform" />
            Back to home
          </button>
        )}

        {/* ── Hero header ── */}
        <div className="text-center mb-12 bb-slide-up">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-cyan-300 font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI-Powered Assistant
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center bb-pulse-glow">
              <BiBot size={32} className="text-cyan-400" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            BoardingBot SL
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Your 24/7 intelligent helper for finding boarding and roommates in Sri Lanka
          </p>
        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Chat window ── */}
          <div
            className="lg:col-span-2 flex flex-col bg-white/3 border border-white/8 rounded-2xl overflow-hidden bb-slide-up"
            style={{ animationDelay: '0.1s' }}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 bg-white/3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center">
                  <BiBot size={20} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">BoardingBot SL</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online · Always ready
                  </div>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/8 hover:border-red-500/20 px-3 py-1.5 rounded-lg transition-all"
              >
                <BiTrash size={13} /> Clear
              </button>
            </div>

            {/* Messages */}
            <div
              ref={chatRef}
              className="flex-1 h-[380px] sm:h-[440px] overflow-y-auto p-5 space-y-4 bb-scrollbar"
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.map((m, idx) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  style={{ animation: `bbSlideUp 0.3s ${idx * 0.04}s ease-out both` }}
                >
                  {m.role === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <BiBot size={14} className="text-cyan-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 text-white rounded-br-sm'
                        : 'bg-white/5 border border-white/8 text-gray-200 rounded-bl-sm'
                    }`}
                  >
                    {m.loading ? (
                      <div className="flex gap-1.5 py-0.5">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: m.html }} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestion chips — desktop */}
            {showSugg && (
              <div className="hidden sm:block px-5 py-3 border-t border-white/8 bg-white/2">
                <p className="text-[10px] text-gray-600 uppercase tracking-wider font-medium mb-2">Try asking</p>
                <div className="flex flex-wrap gap-2">
                  {SUGG_CHIPS.map((chip, i) => (
                    <button
                      key={i}
                      onClick={() => sendMsg(chip)}
                      className="text-xs bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-gray-300 hover:text-cyan-300 px-3 py-1.5 rounded-full transition-all"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestion chips — mobile collapsible */}
            {showSugg && (
              <div className="sm:hidden border-t border-white/8">
                <button
                  onClick={() => setSuggOpen(v => !v)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <span className="uppercase tracking-wider font-medium">Try asking</span>
                  {suggOpen ? <BiChevronUp size={16} /> : <BiChevronDown size={16} />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${suggOpen ? 'max-h-40 pb-3' : 'max-h-0'}`}>
                  <div className="flex flex-wrap gap-2 px-4">
                    {SUGG_CHIPS.map((chip, i) => (
                      <button
                        key={i}
                        onClick={() => sendMsg(chip)}
                        className="text-xs bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full transition-all hover:bg-cyan-500/10 hover:border-cyan-500/30"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Input row */}
            <div className="px-4 py-4 border-t border-white/8 bg-white/3">
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMsg()}
                  placeholder="Ask me anything about boarding or roommates…"
                  className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => sendMsg()}
                  className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl text-white shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                  <BiSend size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* ── Side panel ── */}
          <div className="space-y-4">

            {/* AI Extracted card */}
            {aiExtracted && (
              <div
                className="bg-white/3 border border-white/8 rounded-2xl p-5 bb-slide-up"
                style={{ animationDelay: '0.15s' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <BiBrain size={18} className="text-purple-400" />
                  <h3 className="text-sm font-semibold text-white">AI Detected</h3>
                </div>
                <div className="space-y-2 text-xs">
                  {aiExtracted.intent && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Intent</span>
                      <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full capitalize">{aiExtracted.intent}</span>
                    </div>
                  )}
                  {aiExtracted.campus && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Campus</span>
                      <span className="text-gray-200">{aiExtracted.campus}</span>
                    </div>
                  )}
                  {aiExtracted.pMax && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Budget</span>
                      <span className="text-gray-200">Rs. {aiExtracted.pMax}</span>
                    </div>
                  )}
                  {aiExtracted.room && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Room type</span>
                      <span className="text-gray-200">{aiExtracted.room}</span>
                    </div>
                  )}
                  {aiExtracted.gender && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Gender</span>
                      <span className="text-gray-200">{aiExtracted.gender}</span>
                    </div>
                  )}
                  {aiExtracted.facs?.length > 0 && (
                    <div>
                      <span className="text-gray-500 block mb-1.5">Facilities</span>
                      <div className="flex flex-wrap gap-1.5">
                        {aiExtracted.facs.map((f, i) => (
                          <span key={i} className="bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded-full text-[10px]">
                            {facIco[f]} {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleApply}
                  className="mt-4 w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20"
                >
                  {aiExtracted.intent === 'roommate' ? 'Find Roommates →' :
                   aiExtracted.intent === 'service'   ? 'View Services →'  :
                   'Search Now →'}
                </button>
              </div>
            )}

            {/* Quick links card */}
            <div
              className="bg-white/3 border border-white/8 rounded-2xl p-5 bb-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <BiMessageSquareDetail size={18} className="text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">Quick Access</h3>
              </div>
              <div className="space-y-2">
                {QUICK_LINKS.map(({ icon, label, route, color }) => (
                  <button
                    key={route}
                    onClick={() => navigate(route)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/8 transition-all text-left group"
                  >
                    <span className={`${color} transition-transform group-hover:scale-110`}>{icon}</span>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Capability badges */}
            <div
              className="bg-white/3 border border-white/8 rounded-2xl p-5 bb-slide-up"
              style={{ animationDelay: '0.25s' }}
            >
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">I can help with</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <BiHome size={16} />, label: 'Boarding rooms',   color: 'text-cyan-400' },
                  { icon: <BiGroup size={16} />, label: 'Roommates',       color: 'text-purple-400' },
                  { icon: <BiWifi size={16} />, label: 'Facilities',       color: 'text-blue-400' },
                  { icon: <BiStar size={16} />, label: 'Reviews',          color: 'text-yellow-400' },
                  { icon: <BiCheckCircle size={16} />, label: 'Bookings',  color: 'text-emerald-400' },
                  { icon: <BiShield size={16} />, label: 'Safety tips',    color: 'text-pink-400' },
                ].map(({ icon, label, color }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-gray-400 bg-white/3 border border-white/5 rounded-lg px-2.5 py-2">
                    <span className={color}>{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

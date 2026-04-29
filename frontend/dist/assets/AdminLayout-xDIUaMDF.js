import{u as x,a as N,r as m,j as e,N as h,O as v,d as g}from"./index-BVmuLeEj.js";import{B as d}from"./building-2-BAUFL_kA.js";import{c as u}from"./createLucideIcon-CNB1OjRP.js";import{X as j}from"./x-BUDSWLQD.js";import{M as B}from"./menu-Bzr_m5KR.js";import{U}from"./users-DHCLltju.js";import{S as L}from"./shield-check-DOHqyJTT.js";import{L as I}from"./life-buoy-D_MCHGX5.js";import{M as A}from"./message-square-B6jok669.js";import{S as E}from"./settings-DjlpuSEe.js";import{L as w}from"./log-out-5SejXKR0.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],V=u("layout-dashboard",D);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],c=u("sun",k);function q(){const o=x(),i=N(),[a,s]=m.useState(!1),[t,b]=m.useState(()=>localStorage.getItem("adminTheme")==="light"),p=!!localStorage.getItem("adminToken");m.useEffect(()=>{s(!1)},[i.pathname]);const r=()=>{b(f=>{const l=!f;return localStorage.setItem("adminTheme",l?"light":"dark"),l})};if(!p)return e.jsxDEV(h,{to:"/admin/login",replace:!0},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:25,columnNumber:32},this);const y=()=>{localStorage.removeItem("adminToken"),localStorage.removeItem("adminName"),localStorage.removeItem("adminEmail"),o("/admin/login")};return e.jsxDEV(e.Fragment,{children:[e.jsxDEV("style",{children:`
        /* ── Theme colour tokens ───────────────────────────────────── */
        .admin-layout {
          --bb-base:       #181f36;
          --bb-card:       #1e2436;
          --bb-elevated:   #232b47;
          --bb-border:     rgba(129,140,248,0.15);
          --bb-border-md:  rgba(129,140,248,0.20);
          --bb-shadow:     rgba(0,0,0,0.30);
          --bb-glow:       rgba(129,140,248,0.20);
        }
        .admin-layout.admin-light {
          --bb-base:       #eef2ff;
          --bb-card:       #ffffff;
          --bb-elevated:   #f1f5f9;
          --bb-border:     rgba(99,102,241,0.12);
          --bb-border-md:  rgba(99,102,241,0.18);
          --bb-shadow:     rgba(99,102,241,0.10);
          --bb-glow:       rgba(99,102,241,0.10);
        }

        /* ── Smooth theme transitions ──────────────────────────────── */
        .admin-layout *, .admin-layout *::before, .admin-layout *::after {
          transition-property: background-color, border-color, color, box-shadow;
          transition-duration: 0.22s;
          transition-timing-function: ease;
        }
        /* Never transition animation-driven elements */
        .admin-layout .no-trans,
        .admin-layout [class*="animate-"],
        .admin-layout .recharts-wrapper * {
          transition: none !important;
        }

        /* ── Light-mode text overrides ─────────────────────────────── */
        .admin-layout.admin-light .text-white   { color: #1e293b !important; }
        .admin-layout.admin-light .text-slate-200 { color: #1e293b !important; }
        .admin-layout.admin-light .text-slate-300 { color: #334155 !important; }
        .admin-layout.admin-light .text-slate-400 { color: #64748b !important; }
        .admin-layout.admin-light .text-slate-500 { color: #94a3b8 !important; }
        /* Keep white on solid action buttons */
        .admin-layout.admin-light [class*="bg-green-"][class*="text-white"] { color: #fff !important; }
        .admin-layout.admin-light [class*="bg-red-5"][class*="text-white"]  { color: #fff !important; }
        /* keep-white utility for icons on gradient backgrounds */
        .admin-layout.admin-light .keep-white { color: #fff !important; }
        /* Active nav item always stays white regardless of theme */
        .admin-layout.admin-light .bb-nav-active,
        .admin-layout.admin-light .bb-nav-active svg,
        .admin-layout.admin-light .bb-nav-active span { color: #fff !important; }
        /* Inputs — readable in light */
        .admin-layout.admin-light input,
        .admin-layout.admin-light textarea,
        .admin-layout.admin-light select { color: #1e293b !important; }
        .admin-layout.admin-light input::placeholder,
        .admin-layout.admin-light textarea::placeholder { color: #94a3b8 !important; }

        /* ── Entrance animations ───────────────────────────────────── */
        @keyframes bb-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes bb-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes bb-scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1);    }
        }
        @keyframes bb-slide-right {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0);     }
        }

        .bb-fade-up   { animation: bb-fade-up   0.40s cubic-bezier(.22,.68,0,1.2) both; }
        .bb-fade-in   { animation: bb-fade-in   0.30s ease both; }
        .bb-scale-in  { animation: bb-scale-in  0.30s cubic-bezier(.22,.68,0,1.2) both; }

        /* ── Stagger grid ──────────────────────────────────────────── */
        .bb-stagger > * { animation: bb-fade-up 0.40s cubic-bezier(.22,.68,0,1.2) both; }
        .bb-stagger > *:nth-child(1) { animation-delay: 0.04s; }
        .bb-stagger > *:nth-child(2) { animation-delay: 0.09s; }
        .bb-stagger > *:nth-child(3) { animation-delay: 0.14s; }
        .bb-stagger > *:nth-child(4) { animation-delay: 0.19s; }
        .bb-stagger > *:nth-child(5) { animation-delay: 0.24s; }
        .bb-stagger > *:nth-child(6) { animation-delay: 0.29s; }

        /* ── List row stagger ──────────────────────────────────────── */
        .bb-rows > * { animation: bb-fade-up 0.35s cubic-bezier(.22,.68,0,1.2) both; }
        .bb-rows > *:nth-child(1)  { animation-delay: 0.03s; }
        .bb-rows > *:nth-child(2)  { animation-delay: 0.07s; }
        .bb-rows > *:nth-child(3)  { animation-delay: 0.11s; }
        .bb-rows > *:nth-child(4)  { animation-delay: 0.15s; }
        .bb-rows > *:nth-child(5)  { animation-delay: 0.18s; }
        .bb-rows > *:nth-child(6)  { animation-delay: 0.21s; }
        .bb-rows > *:nth-child(7)  { animation-delay: 0.24s; }
        .bb-rows > *:nth-child(8)  { animation-delay: 0.27s; }

        /* ── Card hover lift ───────────────────────────────────────── */
        .bb-hover {
          transition: transform 0.20s ease, box-shadow 0.20s ease,
                      background-color 0.22s ease, border-color 0.22s ease !important;
        }
        .bb-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px var(--bb-shadow);
        }

        /* ── Page section entrance ─────────────────────────────────── */
        .bb-page { animation: bb-fade-in 0.30s ease both; }

        /* ── Pulse dot (live indicator) ────────────────────────────── */
        @keyframes bb-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.8); opacity: 0;   }
          100% { transform: scale(1.8); opacity: 0;   }
        }
        .bb-pulse::before {
          content: '';
          position: absolute; inset: -3px;
          border-radius: 50%;
          background: currentColor;
          animation: bb-pulse-ring 2s ease-out infinite;
        }
        .bb-pulse { position: relative; }

        /* ── Toggle knob — use transform not transition shorthand ──── */
        .bb-knob {
          transition: transform 0.28s cubic-bezier(.22,.68,0,1.2) !important;
        }

        /* ── Sidebar nav hover background ──────────────────────────── */
        .admin-layout aside nav a:not(.active-nav):hover {
          background: var(--bb-elevated);
        }
      `},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:36,columnNumber:7},this),e.jsxDEV("div",{className:`admin-layout flex h-screen font-sans overflow-hidden bg-[var(--bb-base)] ${t?"admin-light":""}`,children:[e.jsxDEV("header",{className:"lg:hidden fixed top-0 w-full bg-[var(--bb-card)] border-b border-[var(--bb-border-md)] px-4 py-3 z-50 flex items-center justify-between shadow-sm",children:[e.jsxDEV("a",{href:"/",className:"flex items-center gap-2 no-underline hover:opacity-80 transition-opacity",children:[e.jsxDEV(d,{size:20,className:"text-[#a5b4fc]"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:178,columnNumber:13},this),e.jsxDEV("span",{className:"text-base font-bold tracking-tight",children:"BoardingBook"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:179,columnNumber:13},this),e.jsxDEV("span",{className:"text-[10px] font-semibold text-slate-400 bg-[var(--bb-elevated)] px-2 py-0.5 rounded-full",children:"Admin"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:180,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:177,columnNumber:11},this),e.jsxDEV("div",{className:"flex items-center gap-1.5",children:[e.jsxDEV("button",{onClick:r,className:"p-1.5 rounded-lg hover:bg-[var(--bb-elevated)] transition-colors",title:t?"Switch to dark mode":"Switch to light mode",children:e.jsxDEV(c,{size:17,className:t?"text-amber-400":"text-slate-500"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:188,columnNumber:15},this)},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:183,columnNumber:13},this),e.jsxDEV("button",{onClick:()=>s(!a),className:"p-2 hover:bg-[var(--bb-elevated)] rounded-lg transition-colors",children:a?e.jsxDEV(j,{size:22},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:194,columnNumber:32},this):e.jsxDEV(B,{size:22},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:194,columnNumber:50},this)},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:190,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:182,columnNumber:11},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:176,columnNumber:9},this),a&&e.jsxDEV("div",{className:"fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm no-trans",onClick:()=>s(!1)},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:201,columnNumber:11},this),e.jsxDEV("aside",{className:`
          fixed lg:static inset-y-0 left-0 z-50 w-60
          bg-[var(--bb-card)] border-r border-[var(--bb-border)]
          flex flex-col shadow-xl lg:shadow-none
          transition-transform duration-300 ease-in-out
          ${a?"translate-x-0":"-translate-x-full lg:translate-x-0"}
        `,children:[e.jsxDEV("a",{href:"/",className:"px-5 py-5 border-b border-[var(--bb-border)] hidden lg:flex items-center gap-2.5 no-underline hover:opacity-80 transition-opacity",children:[e.jsxDEV("div",{className:"w-8 h-8 bg-gradient-to-br from-[#818cf8] to-[#22d3ee] rounded-lg flex items-center justify-center shadow-[0_0_14px_rgba(129,140,248,0.45)]",children:e.jsxDEV(d,{size:16,className:"keep-white"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:218,columnNumber:15},this)},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:217,columnNumber:13},this),e.jsxDEV("div",{children:[e.jsxDEV("p",{className:"text-sm font-bold leading-none",children:"BoardingBook"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:221,columnNumber:15},this),e.jsxDEV("p",{className:"text-[10px] text-slate-400 font-medium mt-0.5",children:"Admin Panel"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:222,columnNumber:15},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:220,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:216,columnNumber:11},this),e.jsxDEV("div",{className:"h-14 lg:hidden"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:226,columnNumber:11},this),e.jsxDEV("nav",{className:"flex-1 px-3 py-4 space-y-0.5 overflow-y-auto",children:[e.jsxDEV("p",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 pb-2 pt-1",children:"Overview"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:230,columnNumber:13},this),e.jsxDEV(n,{to:"/admin/dashboard",icon:e.jsxDEV(V,{size:17},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:231,columnNumber:51},this),label:"Dashboard"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:231,columnNumber:13},this),e.jsxDEV("p",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 pb-2 pt-4",children:"Management"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:233,columnNumber:13},this),e.jsxDEV(n,{to:"/admin/users",icon:e.jsxDEV(U,{size:17},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:234,columnNumber:49},this),label:"Users"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:234,columnNumber:13},this),e.jsxDEV(n,{to:"/admin/kyc",icon:e.jsxDEV(L,{size:17},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:235,columnNumber:49},this),label:"KYC Verification"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:235,columnNumber:13},this),e.jsxDEV(n,{to:"/admin/tickets",icon:e.jsxDEV(I,{size:17},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:236,columnNumber:49},this),label:"Support Tickets"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:236,columnNumber:13},this),e.jsxDEV(n,{to:"/admin/feedback",icon:e.jsxDEV(A,{size:17},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:237,columnNumber:49},this),label:"Feedback"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:237,columnNumber:13},this),e.jsxDEV("p",{className:"text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 pb-2 pt-4",children:"Account"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:239,columnNumber:13},this),e.jsxDEV(n,{to:"/admin/settings",icon:e.jsxDEV(E,{size:17},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:240,columnNumber:49},this),label:"Settings"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:240,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:229,columnNumber:11},this),e.jsxDEV("div",{className:"px-3 py-4 border-t border-[var(--bb-border)] space-y-1.5",children:[e.jsxDEV("div",{className:"flex items-center gap-2.5 px-3 py-2",children:[e.jsxDEV("div",{className:"w-7 h-7 rounded-lg bg-gradient-to-br from-[#818cf8] to-[#22d3ee] flex items-center justify-center text-xs font-bold keep-white flex-shrink-0",children:(localStorage.getItem("adminName")??"A").charAt(0).toUpperCase()},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:247,columnNumber:15},this),e.jsxDEV("div",{className:"min-w-0",children:[e.jsxDEV("p",{className:"text-xs font-semibold truncate",children:localStorage.getItem("adminName")??"Super Admin"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:251,columnNumber:17},this),e.jsxDEV("p",{className:"text-[10px] text-slate-500 truncate",children:localStorage.getItem("adminEmail")??""},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:252,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:250,columnNumber:15},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:246,columnNumber:13},this),e.jsxDEV("div",{className:"flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bb-elevated)] cursor-pointer select-none",onClick:r,children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-sm font-medium text-slate-400",children:[e.jsxDEV(c,{size:15,className:t?"text-amber-400":"text-slate-500"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:259,columnNumber:17},this),e.jsxDEV("span",{children:"Light mode"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:260,columnNumber:17},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:258,columnNumber:15},this),e.jsxDEV("div",{className:`relative w-10 h-5 rounded-full transition-colors duration-300 flex-shrink-0 ${t?"bg-indigo-500":"bg-slate-600"}`,children:e.jsxDEV("span",{className:`bb-knob absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md ${t?"translate-x-5":"translate-x-0.5"}`},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:264,columnNumber:17},this)},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:263,columnNumber:15},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:257,columnNumber:13},this),e.jsxDEV("button",{onClick:y,className:"flex items-center gap-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/8 w-full px-3 py-2.5 rounded-lg text-sm font-medium",children:[e.jsxDEV(w,{size:16},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:273,columnNumber:15},this),e.jsxDEV("span",{children:"Logout"},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:274,columnNumber:15},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:269,columnNumber:13},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:244,columnNumber:11},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:208,columnNumber:9},this),e.jsxDEV("main",{className:"flex-1 overflow-auto bg-[var(--bb-base)] w-full relative pt-14 lg:pt-0",children:e.jsxDEV("div",{className:"p-5 lg:p-8 max-w-7xl mx-auto min-h-full bb-page",children:e.jsxDEV(v,{},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:282,columnNumber:13},this)},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:281,columnNumber:11},this)},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:280,columnNumber:9},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:173,columnNumber:7},this)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:35,columnNumber:5},this)}const n=({to:o,icon:i,label:a,badge:s})=>e.jsxDEV(g,{to:o,className:({isActive:t})=>`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${t?"bb-nav-active bg-gradient-to-r from-[#818cf8] to-[#22d3ee] text-white shadow-[0_0_14px_rgba(129,140,248,0.30)]":"text-slate-400 hover:text-slate-200"}`,children:[i,e.jsxDEV("span",{className:"flex-1",children:a},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:306,columnNumber:5},void 0),s!==void 0&&s>0&&e.jsxDEV("span",{className:"no-trans text-[10px] font-bold bg-red-500 keep-white rounded-full w-4 h-4 flex items-center justify-center",children:s},void 0,!1,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:308,columnNumber:7},void 0)]},void 0,!0,{fileName:"/Users/jayvox/UNI/my/BB system/frontend/src/app/components/admin/AdminLayout.tsx",lineNumber:295,columnNumber:3},void 0);export{q as default};

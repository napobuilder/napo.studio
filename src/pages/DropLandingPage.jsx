import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, ExternalLink, Sliders, Share2, Check
} from 'lucide-react';

// --- Brand Social & Verified Icons ---
const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.11V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.87-4.49V8.65a8.28 8.28 0 0 0 4.8 1.54V6.74a4.86 4.86 0 0 1-1-.05z"/>
  </svg>
);

const SpotifyIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.308c-.217.355-.678.47-1.033.253-2.827-1.728-6.388-2.119-10.582-1.161-.406.092-.813-.16-.905-.566-.093-.406.16-.813.566-.906 4.603-1.051 8.547-.604 11.701 1.347.355.217.47.678.253 1.033zm1.47-3.267c-.273.444-.855.586-1.298.313-3.235-1.988-8.169-2.562-11.996-1.4-.497.151-1.026-.134-1.177-.631-.151-.497.134-1.026.631-1.177 4.382-1.331 9.814-.683 13.527 1.6c.443.272.585.854.313 1.295zm.127-3.403c-3.879-2.303-10.279-2.515-13.987-1.388-.595.181-1.229-.16-1.41-.755-.181-.595.16-1.229.755-1.41 4.257-1.292 11.314-1.047 15.795 1.614.535.317.708 1.01.391 1.545-.317.535-1.01.708-1.544.394z"/>
  </svg>
);

const VerifiedBadge = ({ className = "w-4 h-4 text-[#9D4EDD]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

export default function DropLandingPage({ onNavigate }) {
  // --- Navigation & Modal States ---
  const [shareToast, setShareToast] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDotStolen, setIsDotStolen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    document.title = "napbak.studio_ • Links";

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Background Synthwave Particle & Aura Canvas ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = -(Math.random() * 0.45 + 0.1);
        this.alpha = Math.random() * 0.5 + 0.2;
        const palette = ['157, 78, 221', '236, 72, 153', '96, 165, 250', '255, 255, 255'];
        this.color = palette[Math.floor(Math.random() * palette.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y < 0) this.y = canvas.height;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha * 0.35})`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 40 }, () => new Particle());

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- Share Hub Action ---
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('napbak@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const navigateTo = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="bg-[#050505] text-[#9ca3af] font-mono selection:bg-[#9D4EDD] selection:text-white min-h-screen relative overflow-x-hidden">
      
      {/* Global Typography & Custom Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@100;400;700&family=Outfit:wght@100;300;400;500;600;700;800&display=swap');
        
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-modern { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: rgba(157, 78, 221, 0.3); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(157, 78, 221, 0.6); }

        .noise-overlay {
          position: fixed;
          inset: 0;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 50;
        }

        @keyframes eq-bar-1 { 0%, 100% { height: 4px; } 50% { height: 14px; } }
        @keyframes eq-bar-2 { 0%, 100% { height: 14px; } 50% { height: 5px; } }
        @keyframes eq-bar-3 { 0%, 100% { height: 8px; } 50% { height: 16px; } }
        .animate-eq-1 { animation: eq-bar-1 0.75s ease-in-out infinite; }
        .animate-eq-2 { animation: eq-bar-2 0.65s ease-in-out infinite 0.15s; }
        .animate-eq-3 { animation: eq-bar-3 0.85s ease-in-out infinite 0.3s; }

        .link-card-glow {
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px -5px rgba(157, 78, 221, 0.12);
        }
        .link-card-glow:hover {
          box-shadow: 0 12px 35px -8px rgba(0, 0, 0, 0.9), 0 0 25px -2px rgba(157, 78, 221, 0.25);
        }
      `}</style>

      {/* Reactive background canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-80"
      />

      {/* Analog film grain overlay */}
      <div className="noise-overlay"></div>


      {/* --- TOP FLOATING BAR (Minimal & App-like) --- */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-[#050505]/92 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'py-4 md:py-6 bg-transparent'
      }`}>
        <div className="max-w-xl mx-auto px-4 flex justify-between items-center">
          {/* Logo brand */}
          <a 
            href="/" 
            onClick={(e) => navigateTo(e, '/')}
            className="flex items-center gap-1 group cursor-pointer select-none"
          >
            <span className="font-modern text-lg md:text-xl text-white font-light tracking-tighter lowercase">
              napbak<span 
                className={`font-serif italic text-white tracking-normal transition-opacity duration-300 px-[1px] ${isDotStolen ? 'opacity-0' : 'opacity-100'}`}
                onMouseEnter={() => setIsDotStolen(true)}
                onMouseLeave={() => setIsDotStolen(false)}
              >.</span><span className="font-serif italic text-white/70 tracking-normal">studio</span><span className="animate-pulse text-[#9D4EDD] font-mono ml-0.5">_</span>
            </span>
          </a>

          {/* Quick utility actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share profile"
              className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="text-[9px] tracking-widest border border-white/20 px-3.5 py-1.5 rounded-full hover:bg-white hover:text-black hover:border-white transition-all uppercase cursor-pointer active:scale-95 text-white/90"
            >
              Contact
            </button>
          </div>
        </div>
      </header>

      {/* Share Toast Feedback */}
      {shareToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#9D4EDD] text-white text-xs font-mono px-4 py-2 rounded-full shadow-2xl shadow-[#9D4EDD]/50 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <Check className="w-3.5 h-3.5" />
          <span>Profile link copied to clipboard!</span>
        </div>
      )}

      {/* --- STAN STORE PRO MOBILE-FIRST MAIN CONTAINER --- */}
      <main className="relative z-10 pt-20 md:pt-24 pb-20 px-4 sm:px-6 max-w-xl mx-auto flex flex-col items-center">
        
        {/* ========================================================= */}
        {/* 1. CREATOR PROFILE HEADER (Stan Store Pro Style)         */}
        {/* ========================================================= */}
        <div className="w-full flex flex-col items-center text-center mb-7 sm:mb-9 animate-in fade-in duration-500">
          
          {/* Avatar with Glow Ring & Online In-Studio Badge */}
          <div className="relative mb-3.5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-[#9D4EDD] via-[#ec4899] to-[#3b82f6] shadow-[0_0_30px_rgba(157,78,221,0.45)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#050505]">
                <img
                  src="/napbak-portrait-bw.png"
                  alt="Napbak"
                  className="w-full h-full object-cover object-[50%_18%] grayscale brightness-125 contrast-115"
                />
              </div>
            </div>


          </div>

          {/* Handle / Name with Verified Badge */}
          <div className="flex items-center justify-center gap-1.5 mt-2 mb-1.5">
            <h1 className="font-modern text-2xl sm:text-3xl text-white font-bold tracking-tight lowercase">
              napbak.studio
            </h1>
            <VerifiedBadge className="w-4 h-4 text-[#9D4EDD] shrink-0" />
          </div>

          {/* User's Exact Tagline / Bio */}
          <p className="font-modern text-xs sm:text-sm text-white/80 max-w-sm sm:max-w-md leading-relaxed font-normal mb-4">
            Dark synth producer · FL Studio · I also mix & master for indie artists
          </p>

          {/* Stan Store Pro Social Icons Pill Bar */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <a 
              href="https://www.instagram.com/napbak.studio" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://www.youtube.com/@napbakmusic" 
              target="_blank" 
              rel="noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://www.tiktok.com/@napbak.studio" 
              target="_blank" 
              rel="noreferrer"
              aria-label="TikTok"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://open.spotify.com/intl-es/artist/1mc3f2GvIm1g6f61hVvyJt" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Spotify"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-[#1DB954] hover:bg-white/10 transition-colors"
            >
              <SpotifyIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://ctrl.napbak.studio" 
              target="_blank" 
              rel="noreferrer"
              aria-label="CTRL Analyzer"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-[#9D4EDD] hover:bg-white/10 transition-colors"
              title="CTRL Analyzer"
            >
              <Sliders className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 2. OFFICIAL LINKS (Direct Touch Cards)                    */}
        {/* ========================================================= */}
        <div className="w-full flex flex-col gap-3.5">

          {/* 1. 🎛 Mixing & mastering — from $70 */}
          <a
            href="/mastering"
            onClick={(e) => navigateTo(e, '/mastering')}
            className="w-full rounded-2xl sm:rounded-3xl border border-white/10 hover:border-[#9D4EDD]/60 bg-gradient-to-b from-[#110c1c]/90 via-[#0a0a12]/95 to-[#07070a] backdrop-blur-xl link-card-glow transition-all duration-300 p-3.5 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer select-none active:scale-[0.98] group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#9D4EDD]/25 via-[#1a102c] to-[#9D4EDD]/10 border border-[#9D4EDD]/30 flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                🎛
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] font-mono font-semibold tracking-wider text-[#E0AAFF] uppercase bg-[#9D4EDD]/15 px-2 py-0.5 rounded-full border border-[#9D4EDD]/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>WEEK PROMO • 35% OFF</span>
                  </span>
                </div>
                <h3 className="font-modern text-white font-medium text-sm sm:text-base leading-snug truncate group-hover:text-[#E0AAFF] transition-colors">
                  Mixing & mastering — from $45
                </h3>
                <p className="font-mono text-[10px] text-white/50 truncate mt-0.5">
                  1 Track Master for $45 (Regular $70) • 48h Turnaround
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                $45 <span className="line-through text-white/40 text-[10px] font-normal ml-0.5">$70</span>
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#9D4EDD]/20 flex items-center justify-center text-white/70 group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* 2. 🎚 Free Spotify loudness checker (I built it) */}
          <a
            href="https://ctrl.napbak.studio"
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-2xl sm:rounded-3xl border border-white/10 hover:border-emerald-500/60 bg-gradient-to-b from-[#0b1712]/90 via-[#0a0a12]/95 to-[#07070a] backdrop-blur-xl link-card-glow transition-all duration-300 p-3.5 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer select-none active:scale-[0.98] group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-500/25 via-[#0f2019] to-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                🎚
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] font-mono font-semibold tracking-wider text-emerald-300 uppercase bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    FREE WEB APP
                  </span>
                </div>
                <h3 className="font-modern text-white font-medium text-sm sm:text-base leading-snug truncate group-hover:text-emerald-300 transition-colors">
                  Free Spotify loudness checker (I built it)
                </h3>
                <p className="font-mono text-[10px] text-white/50 truncate mt-0.5">
                  CTRL Analyzer • True Peak & LUFS meter
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden xs:inline-block text-[10px] font-mono tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                FREE
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-emerald-500/20 flex items-center justify-center text-white/70 group-hover:text-emerald-400 transition-all">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* 3. 📓 Studio diary — tracks in progress */}
          <a
            href="/diary"
            onClick={(e) => navigateTo(e, '/diary')}
            className="w-full rounded-2xl sm:rounded-3xl border border-white/10 hover:border-amber-500/60 bg-gradient-to-b from-[#14100c]/90 via-[#0a0a12]/95 to-[#07070a] backdrop-blur-xl link-card-glow transition-all duration-300 p-3.5 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer select-none active:scale-[0.98] group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#f59e0b]/25 via-[#21180d] to-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                📓
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] font-mono font-semibold tracking-wider text-amber-300 uppercase bg-[#f59e0b]/15 px-2 py-0.5 rounded-full border border-[#f59e0b]/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>STUDIO DIARY // WORKS IN PROGRESS</span>
                  </span>
                </div>
                <h3 className="font-modern text-white font-medium text-sm sm:text-base leading-snug truncate group-hover:text-amber-300 transition-colors">
                  Studio diary — tracks in progress
                </h3>
                <p className="font-mono text-[10px] text-white/50 truncate mt-0.5">
                  Live unreleased snippets • 24-bit Lossless WAVs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                3 TRACKS
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-amber-500/20 flex items-center justify-center text-white/70 group-hover:text-amber-400 transition-all">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </a>

        </div>


      </main>

      {/* --- STAN STORE PRO FOOTER --- */}
      <footer className="w-full py-12 border-t border-white/5 flex flex-col items-center justify-center gap-5 relative z-10 bg-[#050505] text-center px-4">
        <a 
          href="/" 
          onClick={(e) => navigateTo(e, '/')}
          className="font-modern text-lg text-white font-light tracking-tighter lowercase flex items-center gap-1"
        >
          napbak<span className="font-serif italic text-white tracking-normal">.studio</span>
          <span className="animate-pulse text-[#9D4EDD] font-mono ml-0.5">_</span>
        </a>

        <div className="flex flex-wrap gap-4 text-[10px] tracking-widest uppercase text-[#9ca3af] items-center justify-center font-mono">
          <a href="/" onClick={(e) => navigateTo(e, '/')} className="hover:text-white transition-colors">
            Soundscape Home
          </a>
          <span>•</span>
          <a href="https://ctrl.napbak.studio" target="_blank" rel="noreferrer" className="hover:text-[#9D4EDD] transition-colors">
            CTRL Analyzer ↗
          </a>
          <span>•</span>
          <button onClick={() => setIsContactOpen(true)} className="hover:text-white transition-colors cursor-pointer uppercase">
            Contact
          </button>
        </div>

        <p className="text-[9px] tracking-widest text-white/30 font-mono">
          © {new Date().getFullYear()} NAPBAK. DARK SYNTH PRODUCTION & AUDIO ENGINEERING.
        </p>
      </footer>

      {/* --- QUICK CONTACT MODAL --- */}
      <div className={`fixed inset-0 z-[200] bg-[#050505]/95 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-500 ${
        isContactOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <button 
          onClick={() => setIsContactOpen(false)} 
          className="absolute top-8 right-8 md:top-12 md:right-12 text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
        >
          CLOSE <span className="group-hover:rotate-90 transition-transform duration-300">✕</span>
        </button>
        
        <h2 className="text-[10px] tracking-[0.5em] text-[#9D4EDD] mb-8 font-mono">INITIATE CONNECTION</h2>
        
        <div className="flex flex-col items-center gap-8 text-center max-w-lg px-6">
          <button 
            onClick={handleCopyEmail} 
            className="group relative inline-block cursor-pointer"
          >
            <span className={`block font-serif italic text-3xl md:text-5xl transition-colors duration-300 ${copied ? 'text-[#1DB954]' : 'text-white group-hover:text-[#9D4EDD]'}`}>
              {copied ? 'Copied to clipboard.' : 'napbak@gmail.com'}
            </span>
            <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase transition-opacity duration-300 font-mono ${copied ? 'opacity-0' : 'opacity-40 group-hover:opacity-100'}`}>
              Click to copy email
            </span>
          </button>
          
          <div className="flex flex-col items-center gap-4 mt-4 w-full">
            <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase font-mono">Or reach out directly via</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href="https://ig.me/m/napbak.studio" 
                target="_blank" 
                rel="noreferrer" 
                className="border border-white/20 px-5 py-2.5 rounded-full text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all font-mono flex items-center gap-2"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram DM (@napbak.studio)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

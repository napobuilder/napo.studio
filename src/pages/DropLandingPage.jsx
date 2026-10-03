import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, ArrowRight, Check, Sliders, Disc, Radio, ExternalLink,
  ShieldCheck, Waves
} from 'lucide-react';

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

export default function DropLandingPage({ onNavigate }) {
  // --- Navigation & Modal States ---
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDotStolen, setIsDotStolen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- Email Lead Capture State ---
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  // --- Audio Player State ---
  const snippetAudioRef = useRef(null);
  const [snippetPlaying, setSnippetPlaying] = useState(false);
  const [snippetCurrentTime, setSnippetCurrentTime] = useState(0);
  const [snippetDuration, setSnippetDuration] = useState(0);

  // --- Audio Visualizer Refs ---
  const vizCanvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const vizAnimRef = useRef(null);

  // --- Download Gate State ---
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadSubmitting, setDownloadSubmitting] = useState(false);
  const [downloadUnlocked, setDownloadUnlocked] = useState(false);
  const [downloadEmailError, setDownloadEmailError] = useState('');

  const canvasRef = useRef(null);

  useEffect(() => {
    document.title = "Napbak — Dark Synthwave | Making the next song in public";
    try {
      const saved = localStorage.getItem('napbak_drop_subscribed');
      if (saved) setSubscribed(true);
      const dlSaved = localStorage.getItem('napbak_download_unlocked');
      if (dlSaved) setDownloadUnlocked(true);
    } catch (e) {
      // Storage restriction fallback
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
        this.size = Math.random() * 1.6 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(Math.random() * 0.5 + 0.15);
        this.alpha = Math.random() * 0.6 + 0.2;
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
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha * 0.45})`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 45 }, () => new Particle());

    const drawAura = (x, y, radius, colorStr, opacity) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${colorStr}, ${opacity})`);
      gradient.addColorStop(1, `rgba(${colorStr}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen';

      const w = canvas.width;
      const h = canvas.height;
      const t = Date.now() * 0.0004;

      drawAura(w * 0.2 + Math.sin(t) * 80, h * 0.3, w * 0.45, '157, 78, 221', 0.07);
      drawAura(w * 0.8 + Math.cos(t * 0.8) * 80, h * 0.65, w * 0.4, '236, 72, 153', 0.05);

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

  // --- Email Submit Handler (Formspree Integration) ---
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xjyknvry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          source: 'napbak.studio - drop landing page',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        try {
          const stored = JSON.parse(localStorage.getItem('napbak_subscribers_list') || '[]');
          stored.push({ email, timestamp: new Date().toISOString() });
          localStorage.setItem('napbak_subscribers_list', JSON.stringify(stored));
          localStorage.setItem('napbak_drop_subscribed', 'true');
        } catch (storageErr) {
          console.error("Local storage error:", storageErr);
        }
        setSubscribed(true);
      } else {
        const data = await response.json().catch(() => null);
        if (data && data.errors && data.errors.length > 0) {
          setEmailError(data.errors.map(err => err.message).join(', '));
        } else {
          setEmailError('Could not subscribe. Please try again or reach out directly.');
        }
      }
    } catch (err) {
      console.error("Formspree submit error:", err);
      // En caso de bloqueo de red, guardar localmente para no perder el lead
      try {
        localStorage.setItem('napbak_drop_subscribed', 'true');
      } catch (storageErr) {}
      setSubscribed(true);
    } finally {
      setSubmitting(false);
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

  // --- Audio Visualizer Functions ---
  const initVisualizer = () => {
    if (audioCtxRef.current || !snippetAudioRef.current) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      const source = ctx.createMediaElementSource(snippetAudioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
    } catch (e) {
      console.warn('Visualizer init failed:', e);
    }
  };

  const drawViz = () => {
    const canvas = vizCanvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;

    ctx.clearRect(0, 0, W, H);

    if (!analyser) {
      // Draw idle waveform (subtle static bars)
      const barCount = 48;
      const gap = 2;
      const barW = (W - (barCount - 1) * gap) / barCount;
      for (let i = 0; i < barCount; i++) {
        const x = i * (barW + gap);
        const h = 3 + Math.sin(i * 0.3 + Date.now() * 0.002) * 2;
        const grad = ctx.createLinearGradient(x, H / 2 - h, x, H / 2 + h);
        grad.addColorStop(0, 'rgba(157, 78, 221, 0.3)');
        grad.addColorStop(1, 'rgba(236, 72, 153, 0.15)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, H / 2 - h, barW, h * 2, 1);
        ctx.fill();
      }
      vizAnimRef.current = requestAnimationFrame(drawViz);
      return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    const barCount = 48;
    const gap = 2;
    const barW = (W - (barCount - 1) * gap) / barCount;
    const step = Math.floor(bufferLength / barCount);

    for (let i = 0; i < barCount; i++) {
      const raw = dataArray[i * step] || 0;
      const norm = raw / 255;
      const minH = 2;
      const maxH = H * 0.45;
      const h = minH + norm * (maxH - minH);
      const x = i * (barW + gap);
      const y = H / 2;

      // Gradient bar
      const grad = ctx.createLinearGradient(x, y - h, x, y + h);
      grad.addColorStop(0, `rgba(157, 78, 221, ${0.5 + norm * 0.5})`);
      grad.addColorStop(0.5, `rgba(224, 170, 255, ${0.3 + norm * 0.5})`);
      grad.addColorStop(1, `rgba(236, 72, 153, ${0.4 + norm * 0.4})`);

      // Glow
      ctx.shadowColor = norm > 0.5 ? 'rgba(157, 78, 221, 0.6)' : 'transparent';
      ctx.shadowBlur = norm > 0.5 ? 8 : 0;

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y - h, barW, h * 2, barW / 2);
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    vizAnimRef.current = requestAnimationFrame(drawViz);
  };

  useEffect(() => {
    // Start idle animation
    drawViz();
    return () => {
      if (vizAnimRef.current) cancelAnimationFrame(vizAnimRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try { audioCtxRef.current.close(); } catch(e) {}
      }
    };
  }, []);

  const formatTime = (t) => {
    if (!t || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#050505] text-[#9ca3af] font-mono selection:bg-[#9D4EDD] selection:text-white min-h-screen relative overflow-x-hidden">
      
      {/* Global Typography & Custom Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@100;400;700&family=Outfit:wght@100;300;400;600;700&display=swap');
        
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

        .reel-frame {
          box-shadow: 0 25px 70px -15px rgba(0, 0, 0, 0.95), 0 0 45px rgba(157, 78, 221, 0.18);
        }
      `}</style>

      {/* Reactive background canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-80"
      />

      {/* Analog film grain overlay */}
      <div className="noise-overlay"></div>

      {/* --- TOP NAVIGATION BAR --- */}
      <nav className={`fixed top-0 w-full px-6 md:px-12 flex justify-between items-center z-40 transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'py-6 md:py-8 bg-transparent'
      }`}>
        {/* Interactive Logo */}
        <a 
          href="/" 
          onClick={(e) => navigateTo(e, '/')}
          className="flex flex-col group cursor-pointer"
        >
          <span className="font-modern text-2xl md:text-3xl text-white font-light tracking-tighter lowercase">
            napbak<span 
              className={`font-serif italic text-white tracking-normal transition-opacity duration-300 px-[1px] ${isDotStolen ? 'opacity-0' : 'opacity-100'}`}
              onMouseEnter={() => setIsDotStolen(true)}
              onMouseLeave={() => setIsDotStolen(false)}
            >.</span><span className="font-serif italic text-white/70 tracking-normal">studio</span><span className="animate-pulse text-[#9D4EDD] font-mono ml-1">_</span>
          </span>
          <span className="text-[8px] tracking-[0.4em] text-white/30 uppercase mt-0.5 group-hover:text-[#9D4EDD] transition-colors">
            DARK SYNTHWAVE / DROP 004
          </span>
        </a>

        {/* Navigation Links & Contact Action */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest uppercase">
            <a 
              href="/" 
              onClick={(e) => navigateTo(e, '/')} 
              className="text-[#9ca3af] hover:text-white transition-colors"
            >
              Soundscape Home
            </a>
            <a 
              href="#reel" 
              className="text-[#9ca3af] hover:text-white transition-colors"
            >
              Drop Reel
            </a>
            <a 
              href="#services" 
              className="text-[#9ca3af] hover:text-white transition-colors"
            >
              Mixing & Mastering
            </a>
          </div>

          <button 
            onClick={() => setIsContactOpen(true)}
            className="text-[9px] md:text-[10px] tracking-widest border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase cursor-pointer"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 pt-36 md:pt-44 pb-20 px-6 md:px-12 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#9D4EDD]/40 bg-[#9D4EDD]/10 backdrop-blur-md mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9D4EDD] animate-ping"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#9D4EDD] -ml-2.5"></span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#E0AAFF] font-mono">
            BUILDING IN PUBLIC // NEXT TRACK
          </span>
        </div>

        {/* Brand Name */}
        <h1 className="font-modern text-6xl md:text-8xl lg:text-9xl text-white font-light tracking-tighter lowercase leading-none mb-6">
          napbak<span className="font-serif italic text-[#9D4EDD]">.</span>
        </h1>

        {/* Headline */}
        <h2 className="font-modern text-2xl md:text-4xl lg:text-5xl font-light text-white tracking-tight max-w-4xl leading-snug md:leading-tight mb-6">
          Dark synthwave.{" "}
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E0AAFF] to-[#ec4899]">
            Making the next song in public.
          </span>
        </h2>

        {/* Clean, direct subtitle */}
        <p className="font-mono text-xs md:text-sm text-[#9ca3af] max-w-xl leading-relaxed mb-12 font-light">
          Follow the production process step by step, from the first chord to the final master.
        </p>

        {/* --- LEAD CAPTURE: "Get the next song first." --- */}
        <div className="w-full max-w-xl mx-auto mb-24 relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#9D4EDD]/30 via-[#ec4899]/20 to-[#3b82f6]/30 blur-xl opacity-60 pointer-events-none"></div>

          <div className="relative bg-[#0a0a0a]/90 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#9D4EDD] animate-pulse" />
                <h3 className="font-modern text-lg md:text-xl font-normal text-white tracking-wide">
                  Get the next song first.
                </h3>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-[#9D4EDD] uppercase px-2 py-0.5 rounded border border-[#9D4EDD]/30 bg-[#9D4EDD]/10">
                0 spam
              </span>
            </div>

            <p className="text-left font-mono text-[11px] md:text-xs text-[#9ca3af] mb-6 leading-relaxed">
              Join the private list. Receive the unreleased track before it hits streaming platforms, plus exclusive stems and production breakdowns.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#9D4EDD]/15 border border-[#9D4EDD]/40 text-white text-xs md:text-sm">
                <div className="w-6 h-6 rounded-full bg-[#9D4EDD] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white font-modern">You're on the private list!</p>
                  <p className="text-[11px] text-[#E0AAFF] font-mono mt-0.5">
                    We'll email you directly as soon as the final master is ready to download.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-[#121212] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs md:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#9D4EDD] focus:ring-1 focus:ring-[#9D4EDD] transition-all font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="relative group px-6 py-3 rounded-xl bg-white text-black font-modern font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-[#E0AAFF] hover:text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#9D4EDD]/30 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        Joining...
                      </span>
                    ) : (
                      <>
                        <span>Get It First</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                {emailError && (
                  <p className="text-[11px] text-red-400 text-left font-mono">{emailError}</p>
                )}

                <div className="flex items-center justify-between text-[9px] text-white/30 tracking-widest uppercase font-mono mt-1">
                  <span>Early Access</span>
                  <span>24-bit Lossless Audio</span>
                </div>
              </form>
            )}

          </div>
        </div>

        {/* Minimalist Divider */}
        <div className="flex flex-col items-center gap-3 mb-16 opacity-40">
          <span className="text-[9px] uppercase tracking-[0.4em] font-mono">Exclusive Preview</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>

        {/* --- EXCLUSIVE PREVIEW + TRACK PROGRESS SECTION --- */}
        <section id="preview" className="w-full max-w-3xl mx-auto mb-32 flex flex-col items-center">
          
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.5em] text-[#9D4EDD] uppercase font-mono block mb-2">
              01. EXCLUSIVE PREVIEW
            </span>
            <h3 className="font-modern text-3xl md:text-4xl text-white font-light tracking-tight">
              Track 004 — Early Access
            </h3>
            <p className="font-mono text-xs text-[#9ca3af] mt-2">
              Listen to the work-in-progress. Download the snippet for free.
            </p>
          </div>

          {/* Track Progress Timeline */}
          <div className="w-full max-w-xl mb-12 px-4">
            <div className="relative flex items-center justify-between">
              {/* Progress bar background */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 rounded-full"></div>
              {/* Progress bar filled */}
              <div className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] -translate-y-1/2 rounded-full" style={{ width: '62.5%' }}></div>
              
              {[
                { label: 'Writing', done: true },
                { label: 'Arrangement', done: true },
                { label: 'Mix', done: false, active: true },
                { label: 'Master', done: false },
                { label: 'Release', done: false },
              ].map((stage, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                    stage.done 
                      ? 'bg-[#9D4EDD] border-[#9D4EDD] shadow-lg shadow-[#9D4EDD]/40' 
                      : stage.active 
                        ? 'bg-[#09090b] border-[#ec4899] shadow-lg shadow-[#ec4899]/40 animate-pulse' 
                        : 'bg-[#09090b] border-white/20'
                  }`}>
                    {stage.done && (
                      <Check className="w-2.5 h-2.5 text-white" />
                    )}
                    {stage.active && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ec4899]"></div>
                    )}
                  </div>
                  <span className={`text-[8px] md:text-[9px] font-mono uppercase tracking-wider whitespace-nowrap ${
                    stage.done ? 'text-[#E0AAFF]' : stage.active ? 'text-[#ec4899] font-semibold' : 'text-white/30'
                  }`}>
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Player + Download Gate Card */}
          <div className="w-full max-w-xl">
            <div className="relative bg-[#08080a] border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden">
              
              {/* Background glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#9D4EDD]/15 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#ec4899]/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10">
                {/* Track info */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#9D4EDD] to-[#ec4899] flex items-center justify-center shrink-0 shadow-lg shadow-[#9D4EDD]/30">
                    <Waves className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-modern text-lg text-white font-medium">Dark Synthwave — 004</p>
                    <p className="font-mono text-[10px] text-[#E0AAFF] tracking-wider mt-0.5">NAPBAK // WORK IN PROGRESS</p>
                    <p className="font-mono text-[9px] text-white/30 mt-1">Exclusive snippet • Not on streaming yet</p>
                  </div>
                </div>

                {/* Custom Audio Player with Visualizer */}
                <div className="mb-6">
                  <audio 
                    ref={snippetAudioRef} 
                    src="/audio/napbak-dark-synthwave-004.mp3" 
                    preload="metadata"
                    crossOrigin="anonymous"
                    onTimeUpdate={() => {
                      if (snippetAudioRef.current) {
                        setSnippetCurrentTime(snippetAudioRef.current.currentTime);
                      }
                    }}
                    onLoadedMetadata={() => {
                      if (snippetAudioRef.current) {
                        setSnippetDuration(snippetAudioRef.current.duration);
                      }
                    }}
                    onEnded={() => setSnippetPlaying(false)}
                  />
                  
                  {/* Waveform Visualizer */}
                  <div className="relative w-full h-24 md:h-28 mb-4 rounded-xl overflow-hidden bg-white/[0.02] border border-white/5">
                    <canvas 
                      ref={vizCanvasRef}
                      className="w-full h-full"
                      style={{ display: 'block' }}
                    />
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/60 via-transparent to-[#08080a]/40 pointer-events-none"></div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Play/Pause */}
                    <button
                      onClick={() => {
                        if (!snippetAudioRef.current) return;
                        initVisualizer();
                        if (snippetPlaying) {
                          snippetAudioRef.current.pause();
                          setSnippetPlaying(false);
                        } else {
                          snippetAudioRef.current.play();
                          setSnippetPlaying(true);
                        }
                      }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9D4EDD]/30 to-[#ec4899]/20 hover:from-[#9D4EDD]/50 hover:to-[#ec4899]/30 border border-white/15 flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-lg shadow-[#9D4EDD]/10"
                    >
                      {snippetPlaying ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <rect x="6" y="4" width="4" height="16" rx="1"/>
                          <rect x="14" y="4" width="4" height="16" rx="1"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>

                    {/* Progress bar */}
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div 
                        className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer group relative"
                        onClick={(e) => {
                          if (!snippetAudioRef.current || !snippetDuration) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const pct = x / rect.width;
                          snippetAudioRef.current.currentTime = pct * snippetDuration;
                        }}
                      >
                        <div 
                          className="h-full bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] rounded-full transition-all relative"
                          style={{ width: snippetDuration ? `${(snippetCurrentTime / snippetDuration) * 100}%` : '0%' }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md shadow-[#9D4EDD]/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-[8px] font-mono text-white/30">
                        <span>{formatTime(snippetCurrentTime)}</span>
                        <span>{formatTime(snippetDuration)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/10 mb-6"></div>

                {/* Download Gate */}
                {downloadUnlocked ? (
                  <a
                    href="/audio/napbak-dark-synthwave-004.mp3"
                    download="Napbak - Dark Synthwave - 004.mp3"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] text-white font-mono text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-[#9D4EDD]/30"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download Snippet
                  </a>
                ) : showDownloadForm ? (
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!downloadEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(downloadEmail)) {
                        setDownloadEmailError('Enter a valid email');
                        return;
                      }
                      setDownloadSubmitting(true);
                      setDownloadEmailError('');
                      try {
                        const res = await fetch('https://formspree.io/f/xjyknvry', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: downloadEmail, source: 'snippet_download_gate', track: '004' }),
                        });
                        if (res.ok) {
                          setDownloadUnlocked(true);
                          try { localStorage.setItem('napbak_download_unlocked', 'true'); } catch(err) {}
                        } else {
                          setDownloadEmailError('Something went wrong. Try again.');
                        }
                      } catch (err) {
                        setDownloadEmailError('Connection error. Try again.');
                      } finally {
                        setDownloadSubmitting(false);
                      }
                    }}
                    className="flex flex-col gap-3"
                  >
                    <p className="font-mono text-[10px] text-white/50 text-center">Enter your email to unlock the free download</p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={downloadEmail}
                        onChange={(e) => setDownloadEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs font-mono placeholder:text-white/20 focus:outline-none focus:border-[#9D4EDD]/60 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={downloadSubmitting}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-all disabled:opacity-50 whitespace-nowrap"
                      >
                        {downloadSubmitting ? '...' : 'Unlock'}
                      </button>
                    </div>
                    {downloadEmailError && (
                      <p className="text-[10px] text-red-400 font-mono text-center">{downloadEmailError}</p>
                    )}
                  </form>
                ) : (
                  <button
                    onClick={() => setShowDownloadForm(true)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-xs uppercase tracking-widest hover:bg-white/10 hover:border-[#9D4EDD]/40 transition-all active:scale-[0.98] group"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9D4EDD]">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>Download Snippet</span>
                    <span className="text-[8px] text-white/30 font-normal lowercase ml-1">— free with email</span>
                  </button>
                )}
              </div>
            </div>
          </div>

        </section>

        {/* Minimalist Divider */}
        <div className="flex flex-col items-center gap-3 mb-16 opacity-40">
          <span className="text-[9px] uppercase tracking-[0.4em] font-mono">Audio Engineering</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>

        {/* --- DISCREET MIXING & MASTERING SECTION --- */}
        <section id="services" className="w-full max-w-4xl mx-auto mb-28 text-left">
          
          <div className="bg-[#08080a] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-md">
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#9D4EDD]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-[9px] tracking-[0.5em] text-[#9D4EDD] uppercase font-mono block mb-2">
                    02. STUDIO SERVICES
                  </span>
                  <h3 className="font-modern text-2xl md:text-3xl text-white font-light tracking-tight">
                    Mixing & Mastering
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-mono text-white/70">
                  <Sliders className="w-3 h-3 text-[#9D4EDD]" />
                  <span>LIMITED ROSTER // 1-ON-1 WORK</span>
                </div>
              </div>

              <p className="font-mono text-xs md:text-sm text-[#9ca3af] leading-relaxed max-w-2xl mb-10 font-light">
                Commercial-grade sonic treatment for dark synthwave, alt electronic, and dynamic productions. 
                Surgical clarity, controlled low-end impact, and competitive loudness calibrated for Spotify, Apple Music, and club sound systems.
              </p>

              {/* 3 Core Pillars */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-10">
                
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#9D4EDD]/15 flex items-center justify-center text-[#E0AAFF] mb-3">
                    <Waves className="w-4 h-4" />
                  </div>
                  <h4 className="font-modern text-white text-sm font-medium mb-1">Hybrid Processing</h4>
                  <p className="font-mono text-[11px] text-[#9ca3af] leading-relaxed">
                    Analog-modeled harmonic saturation and linear-phase equalization to preserve bass punch without choking transients.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/15 flex items-center justify-center text-blue-400 mb-3">
                    <Disc className="w-4 h-4" />
                  </div>
                  <h4 className="font-modern text-white text-sm font-medium mb-1">Streaming Standards</h4>
                  <p className="font-mono text-[11px] text-[#9ca3af] leading-relaxed">
                    True Peak (dBTP) control and integrated LUFS target mastering to prevent inter-sample distortion across streaming DSPs.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#ec4899]/15 flex items-center justify-center text-pink-400 mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-modern text-white text-sm font-medium mb-1">Stem Diagnostics</h4>
                  <p className="font-mono text-[11px] text-[#9ca3af] leading-relaxed">
                    Pre-master audit with detailed technical mix notes and headroom analysis before committing the final print.
                  </p>
                </div>

              </div>

              {/* Direct Contact CTA */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-modern text-sm text-white font-medium">Ready to take your track to commercial standard?</p>
                  <p className="font-mono text-[11px] text-white/40">Let's discuss references, turnaround time, and sonic targets.</p>
                </div>

                <div className="flex items-center gap-3">
                  <a 
                    href="mailto:napbak@gmail.com?subject=Mixing%20%26%20Mastering%20Inquiry%20-%20Napbak"
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Send Email</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <button 
                    onClick={() => setIsContactOpen(true)}
                    className="px-5 py-2.5 rounded-full border border-white/15 hover:border-[#9D4EDD] text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white transition-all cursor-pointer"
                  >
                    Direct Contact
                  </button>
                </div>
              </div>

            </div>

          </div>

        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full py-16 border-t border-white/5 flex flex-col items-center justify-center gap-8 relative z-10 bg-[#050505]">
        
        {/* Footer Brand */}
        <h2 className="font-modern text-2xl text-white font-light tracking-tighter lowercase">
          napbak<span className="font-serif italic text-white tracking-normal">.studio</span>
          <span className="animate-pulse text-[#9D4EDD] font-mono ml-1">_</span>
        </h2>

        {/* Social Links */}
        <div className="flex flex-wrap gap-6 md:gap-10 text-[11px] tracking-widest uppercase text-[#9ca3af] items-center justify-center font-mono">
          <a 
            href="https://www.instagram.com/napbak.studio" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white transition-colors flex items-center gap-1.5 group"
          >
            <InstagramIcon className="w-3.5 h-3.5 group-hover:text-[#ec4899] transition-colors" />
            <span>Instagram</span>
          </a>

          <a 
            href="https://www.youtube.com/@napbakmusic" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white transition-colors flex items-center gap-1.5 group"
          >
            <YoutubeIcon className="w-3.5 h-3.5 group-hover:text-red-500 transition-colors" />
            <span>YouTube</span>
          </a>

          <a 
            href="https://www.tiktok.com/@napbak.studio" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white transition-colors flex items-center gap-1.5 group"
          >
            <TikTokIcon className="w-3.5 h-3.5 text-white/70 group-hover:text-[#3b82f6] transition-colors" />
            <span>TikTok</span>
          </a>

          <div className="w-[1px] h-3 bg-white/10 hidden md:block"></div>

          <a 
            href="https://open.spotify.com/intl-es/artist/1mc3f2GvIm1g6f61hVvyJt" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white transition-colors"
          >
            Spotify
          </a>

          <a 
            href="https://ctrl.napbak.studio" 
            target="_blank" 
            rel="noreferrer" 
            className="text-white hover:text-[#9D4EDD] transition-colors flex items-center gap-1 font-bold group"
          >
            CTRL Analyzer <span className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform text-[8px]">↗</span>
          </a>
        </div>

        <p className="text-[9px] tracking-widest text-white/30 font-mono">
          © {new Date().getFullYear()} NAPBAK. DARK SYNTHWAVE & AUDIO ENGINEERING. ALL RIGHTS RESERVED.
        </p>
      </footer>

      {/* --- QUICK CONTACT MODAL --- */}
      <div className={`fixed inset-0 z-[200] bg-[#050505]/95 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-700 ${
        isContactOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <button 
          onClick={() => setIsContactOpen(false)} 
          className="absolute top-8 right-8 md:top-12 md:right-12 text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
        >
          CLOSE <span className="group-hover:rotate-90 transition-transform duration-300">✕</span>
        </button>
        
        <h2 className="text-[10px] tracking-[0.5em] text-[#9D4EDD] mb-8 font-mono">INITIATE CONNECTION</h2>
        
        <div className="flex flex-col items-center gap-10 text-center max-w-lg px-6">
          <button 
            onClick={handleCopyEmail} 
            className="group relative inline-block cursor-pointer"
          >
            <span className={`block font-serif italic text-3xl md:text-5xl lg:text-6xl transition-colors duration-500 ${copied ? 'text-[#1DB954]' : 'text-white group-hover:text-[#9D4EDD]'}`}>
              {copied ? 'Copied to clipboard.' : 'napbak@gmail.com'}
            </span>
            <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase transition-opacity duration-300 font-mono ${copied ? 'opacity-0' : 'opacity-40 group-hover:opacity-100'}`}>
              Click to copy email
            </span>
          </button>
          
          <div className="flex flex-col items-center gap-5 mt-6 w-full">
            <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase font-mono">Or reach out directly via</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://wa.me/584121479466" 
                target="_blank" 
                rel="noreferrer" 
                className="border border-white/20 px-6 py-3 rounded-full text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all font-mono"
              >
                WhatsApp (+58 412 147 9466)
              </a>
              <a 
                href="https://www.instagram.com/napbak.studio" 
                target="_blank" 
                rel="noreferrer" 
                className="border border-white/20 px-6 py-3 rounded-full text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all font-mono"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

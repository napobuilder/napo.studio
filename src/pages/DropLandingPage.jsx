import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, ArrowRight, Check, Sliders, Disc, Radio, ExternalLink,
  ShieldCheck, Waves, Download, User, Clock, Sparkles, Play, Pause, Music, Volume2
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

// --- The Vault: Catalog of Works in Progress ---
const TRACKS_DATA = [
  {
    id: '006',
    number: '006',
    title: 'Lost In The Woods',
    code: 'NAPBAK // WIP-006',
    tag: 'Exclusive snippet • Trending on live sessions',
    bpm: '118 BPM',
    key: 'F Minor',
    stageLabel: 'Mix',
    progressPct: '62.5%',
    stages: [
      { label: 'Writing', done: true },
      { label: 'Arrangement', done: true },
      { label: 'Mix', done: false, active: true },
      { label: 'Master', done: false },
      { label: 'Release', done: false },
    ],
    audioSrc: '/audio/napbak-lost-in-the-woods-006.mp3',
    downloads: [
      {
        format: 'WAV',
        title: 'Studio Master WAV',
        meta: '24-bit Lossless Studio Export • 5.5 MB',
        url: '/audio/napbak-lost-in-the-woods-006.wav',
        filename: 'Napbak - Lost In The Woods (Studio Preview).wav',
        isPrimary: true,
      },
      {
        format: 'MP3',
        title: 'High Quality MP3',
        meta: '320 kbps Crisp Audio • 700 KB',
        url: '/audio/napbak-lost-in-the-woods-006.mp3',
        filename: 'Napbak - Lost In The Woods (Preview).mp3',
        isPrimary: false,
      }
    ],
  },
  {
    id: '005',
    number: '005',
    title: 'Rabbit Hole',
    code: 'NAPBAK // WIP-005',
    tag: 'Raw studio capture • Heavy analog bass',
    bpm: '124 BPM',
    key: 'D Minor',
    stageLabel: 'Arrangement',
    progressPct: '37.5%',
    stages: [
      { label: 'Writing', done: true },
      { label: 'Arrangement', done: false, active: true },
      { label: 'Mix', done: false },
      { label: 'Master', done: false },
      { label: 'Release', done: false },
    ],
    audioSrc: '/audio/napbak-rabbit-hole-005.mp3',
    downloads: [
      {
        format: 'MP3',
        title: 'Work In Progress MP3',
        meta: '320 kbps Direct Export • 1.2 MB',
        url: '/audio/napbak-rabbit-hole-005.mp3',
        filename: 'Napbak - Rabbit Hole (WIP Snippet).mp3',
        isPrimary: true,
      }
    ],
  },
  {
    id: '004',
    number: '004',
    title: 'Cinematic Synths — 004',
    code: 'NAPBAK // WIP-004',
    tag: 'Exclusive snippet • Not on streaming yet',
    bpm: '120 BPM',
    key: 'A Minor',
    stageLabel: 'Pre-Master',
    progressPct: '75%',
    stages: [
      { label: 'Writing', done: true },
      { label: 'Arrangement', done: true },
      { label: 'Mix', done: true },
      { label: 'Master', done: false, active: true },
      { label: 'Release', done: false },
    ],
    audioSrc: '/audio/napbak-dark-synthwave-004.mp3',
    downloads: [
      {
        format: 'MP3',
        title: 'Studio Snippet MP3',
        meta: '320 kbps Studio Snippet • 1.0 MB',
        url: '/audio/napbak-dark-synthwave-004.mp3',
        filename: 'Napbak - Dark Synthwave 004 (Snippet).mp3',
        isPrimary: true,
      }
    ],
  }
];

export default function DropLandingPage({ onNavigate }) {
  // --- Navigation & Modal States ---
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDotStolen, setIsDotStolen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- Audio Player & Selected Track State ---
  const [selectedTrackId, setSelectedTrackId] = useState('006');
  const [autoPlayRequested, setAutoPlayRequested] = useState(false);
  const [userName, setUserName] = useState('');
  const [subscribed, setSubscribed] = useState(false);
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
  const [downloadName, setDownloadName] = useState('');
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadSubmitting, setDownloadSubmitting] = useState(false);
  const [downloadUnlocked, setDownloadUnlocked] = useState(false);
  const [downloadEmailError, setDownloadEmailError] = useState('');

  // --- Studio Services Inquiry State ---
  const [serviceType, setServiceType] = useState('Mixing & Mastering');
  const [serviceName, setServiceName] = useState('');
  const [serviceEmail, setServiceEmail] = useState('');
  const [serviceMessage, setServiceMessage] = useState('');
  const [serviceSubmitting, setServiceSubmitting] = useState(false);
  const [serviceSubmitted, setServiceSubmitted] = useState(false);
  const [serviceError, setServiceError] = useState('');

  const canvasRef = useRef(null);

  const activeTrack = TRACKS_DATA.find(t => t.id === selectedTrackId) || TRACKS_DATA[0];

  useEffect(() => {
    document.title = "Napbak — The Vault | Making cinematic synths in public";
    try {
      const saved = localStorage.getItem('napbak_drop_subscribed');
      const dlSaved = localStorage.getItem('napbak_download_unlocked');
      const storedName = localStorage.getItem('napbak_user_name');
      if (storedName) {
        setUserName(storedName);
        setDownloadName(storedName);
        setServiceName(storedName);
      }
      if (saved) setSubscribed(true);
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

  // --- Reset or Autoplay Audio When Track Changes ---
  useEffect(() => {
    if (autoPlayRequested && snippetAudioRef.current) {
      setAutoPlayRequested(false);
      setSnippetCurrentTime(0);
      initVisualizer();
      snippetAudioRef.current.load();
      snippetAudioRef.current.play()
        .then(() => setSnippetPlaying(true))
        .catch(err => {
          console.warn('Playback error:', err);
          setSnippetPlaying(false);
        });
    } else if (!autoPlayRequested && snippetAudioRef.current && !snippetPlaying) {
      snippetAudioRef.current.load();
      setSnippetCurrentTime(0);
    }
  }, [selectedTrackId, autoPlayRequested]);

  const handleTrackClick = (trackId) => {
    if (selectedTrackId === trackId) {
      togglePlay();
    } else {
      setSelectedTrackId(trackId);
      setAutoPlayRequested(true);
    }
  };

  // --- Audio Visualizer Functions ---
  const initVisualizer = () => {
    if (!snippetAudioRef.current) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        const source = ctx.createMediaElementSource(snippetAudioRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);
        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
        sourceRef.current = source;
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
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

      const grad = ctx.createLinearGradient(x, y - h, x, y + h);
      grad.addColorStop(0, `rgba(157, 78, 221, ${0.5 + norm * 0.5})`);
      grad.addColorStop(0.5, `rgba(224, 170, 255, ${0.3 + norm * 0.5})`);
      grad.addColorStop(1, `rgba(236, 72, 153, ${0.4 + norm * 0.4})`);

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
    drawViz();
    return () => {
      if (vizAnimRef.current) cancelAnimationFrame(vizAnimRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try { audioCtxRef.current.close(); } catch(e) {}
      }
    };
  }, []);

  const togglePlay = () => {
    if (!snippetAudioRef.current) return;
    initVisualizer();
    if (snippetPlaying) {
      snippetAudioRef.current.pause();
      setSnippetPlaying(false);
    } else {
      snippetAudioRef.current.play()
        .then(() => setSnippetPlaying(true))
        .catch(err => {
          console.warn('Audio play prevented:', err);
          setSnippetPlaying(false);
        });
    }
  };

  // --- Download Gate Form Handler ---
  const handleDownloadSubmit = async (e) => {
    e.preventDefault();
    setDownloadEmailError('');

    if (!downloadName || !downloadName.trim()) {
      setDownloadEmailError('Please enter your name');
      return;
    }

    if (!downloadEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(downloadEmail)) {
      setDownloadEmailError('Please enter a valid email');
      return;
    }

    setDownloadSubmitting(true);

    try {
      const res = await fetch('https://formspree.io/f/xjyknvry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: downloadName.trim(),
          email: downloadEmail.trim(), 
          source: 'snippet_download_gate', 
          track: activeTrack.title,
          track_id: activeTrack.id,
          timestamp: new Date().toISOString() 
        }),
      });

      if (res.ok) {
        setDownloadUnlocked(true);
        setSubscribed(true);
        try { 
          localStorage.setItem('napbak_download_unlocked', 'true'); 
          localStorage.setItem('napbak_drop_subscribed', 'true');
          localStorage.setItem('napbak_user_name', downloadName.trim());
        } catch(err) {}
        if (!userName) setUserName(downloadName.trim());
      } else {
        setDownloadEmailError('Something went wrong. Try again.');
      }
    } catch (err) {
      console.error("Download unlock error:", err);
      // Fallback
      setDownloadUnlocked(true);
      setSubscribed(true);
      try { 
        localStorage.setItem('napbak_download_unlocked', 'true'); 
        localStorage.setItem('napbak_drop_subscribed', 'true');
        localStorage.setItem('napbak_user_name', downloadName.trim());
      } catch(e) {}
      if (!userName) setUserName(downloadName.trim());
    } finally {
      setDownloadSubmitting(false);
    }
  };

  // --- Studio Services Inquiry Handler ---
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setServiceError('');

    const finalName = (serviceName || downloadName || userName).trim();
    const finalEmail = (serviceEmail || downloadEmail).trim();

    if (!finalName) {
      setServiceError('Please enter your name');
      return;
    }
    if (!finalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalEmail)) {
      setServiceError('Please enter a valid email');
      return;
    }

    setServiceSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/xjyknvry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: finalName,
          email: finalEmail,
          service: serviceType,
          message: serviceMessage.trim(),
          source: 'studio_services_inquiry',
          timestamp: new Date().toISOString()
        })
      });

      if (res.ok) {
        setServiceSubmitted(true);
      } else {
        setServiceError('Something went wrong. You can also reach out via WhatsApp below.');
      }
    } catch (err) {
      console.error('Service inquiry error:', err);
      setServiceSubmitted(true);
    } finally {
      setServiceSubmitting(false);
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

        @keyframes eq-bar-1 { 0%, 100% { height: 4px; } 50% { height: 14px; } }
        @keyframes eq-bar-2 { 0%, 100% { height: 14px; } 50% { height: 5px; } }
        @keyframes eq-bar-3 { 0%, 100% { height: 8px; } 50% { height: 16px; } }
        .animate-eq-1 { animation: eq-bar-1 0.75s ease-in-out infinite; }
        .animate-eq-2 { animation: eq-bar-2 0.65s ease-in-out infinite 0.15s; }
        .animate-eq-3 { animation: eq-bar-3 0.85s ease-in-out infinite 0.3s; }
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
            CINEMATIC SYNTHS / DROP 006
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
              href="#preview" 
              className="text-[#9ca3af] hover:text-white transition-colors"
            >
              Exclusive Preview
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
      <main className="relative z-10 pt-20 md:pt-28 pb-16 px-5 md:px-12 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Main Headline: Thick & Large Titular Header */}
        <h1 className="font-modern text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-extrabold tracking-tight uppercase leading-none mb-2 md:mb-3">
          Cinematic Synths<span className="font-serif italic text-[#9D4EDD] font-normal">.</span>
        </h1>

        {/* Centered Italic Sub-headline */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E0AAFF] to-[#ec4899] mb-3 md:mb-4 tracking-tight text-center max-w-2xl leading-snug">
          Making the next song in public.
        </p>

        {/* Clean, direct subtitle */}
        <p className="font-mono text-xs md:text-sm text-[#9ca3af] max-w-lg leading-relaxed mb-6 md:mb-8 font-light">
          Follow the production process step by step, from the first chord to the final master.
        </p>

        {/* --- TRACK PROGRESS SECTION --- */}
        <section id="preview" className="w-full max-w-3xl mx-auto mb-10 md:mb-14 flex flex-col items-center">
          
          {/* Sleek, minimal section indicator */}
          <div className="w-full max-w-xl flex items-center justify-between px-2 mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9D4EDD] animate-pulse"></span>
              <span className="text-[10px] tracking-[0.25em] text-[#9D4EDD] uppercase font-mono font-medium">
                01. Works In Progress
              </span>
            </div>
            <span className="text-[9px] tracking-wider text-white/40 font-mono">
              Tap track to preview
            </span>
          </div>

          {/* Mobile-First Song List with Inline Expandable Player */}
          <div className="w-full max-w-xl flex flex-col gap-3 px-1 sm:px-0">
            {/* Background Audio Element */}
            <audio 
              ref={snippetAudioRef} 
              src={activeTrack.audioSrc} 
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
              onEnded={() => {
                setSnippetPlaying(false);
                setSnippetCurrentTime(0);
              }}
            />

            {TRACKS_DATA.map((track) => {
              const isSelected = selectedTrackId === track.id;
              const isCurrentPlaying = isSelected && snippetPlaying;

              return (
                <div
                  key={track.id}
                  className={`w-full rounded-2xl border transition-all duration-300 overflow-hidden select-none ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#130f24]/90 via-[#0a0a12]/95 to-[#08080c] border-[#9D4EDD]/70 shadow-[0_0_25px_rgba(157,78,221,0.2)]'
                      : 'bg-[#08080c]/80 border-white/10 hover:border-white/20 hover:bg-[#0d0c14]'
                  }`}
                >
                  {/* --- Main Song Card Row (Always Visible) --- */}
                  <div
                    onClick={() => handleTrackClick(track.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTrackClick(track.id); }}
                    className="p-3 sm:p-4 flex items-center justify-between gap-3 cursor-pointer"
                  >
                    {/* Left: Square Art Tile with Unmistakable Play / Equalizer Symbol */}
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl shrink-0 flex items-center justify-center overflow-hidden border transition-all ${
                        isSelected
                          ? 'border-[#9D4EDD] shadow-[0_0_15px_rgba(157,78,221,0.35)] bg-[#140f24]'
                          : 'border-white/10 bg-[#0e0e14] group-hover:border-white/25'
                      }`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#9D4EDD]/25 via-transparent to-[#ec4899]/20 pointer-events-none"></div>
                        <span className="absolute bottom-1 right-1.5 text-[8px] font-mono text-white/20 font-bold tracking-tighter pointer-events-none">
                          #{track.number}
                        </span>

                        {isCurrentPlaying ? (
                          <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#9D4EDD] text-white flex items-center justify-center shadow-lg shadow-[#9D4EDD]/60 animate-pulse">
                            <div className="flex items-end justify-center gap-[2.5px] h-3.5 w-3.5">
                              <span className="w-[3px] bg-white rounded-full animate-eq-1"></span>
                              <span className="w-[3px] bg-white rounded-full animate-eq-2"></span>
                              <span className="w-[3px] bg-white rounded-full animate-eq-3"></span>
                            </div>
                          </div>
                        ) : (
                          <div className={`relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-white text-black shadow-lg shadow-white/25 scale-105'
                              : 'bg-white/15 text-white hover:bg-white hover:text-black'
                          }`}>
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        )}
                      </div>

                      {/* Middle: Title & Metadata */}
                      <div className="min-w-0 flex-1">
                        <span className="font-modern text-white font-medium text-sm sm:text-base truncate block">
                          {track.title}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-white/50 flex-wrap mt-0.5">
                          <span className="text-[#E0AAFF] font-medium">{track.bpm}</span>
                          <span>•</span>
                          <span>{track.key}</span>
                          <span>•</span>
                          <span className="text-white/40">{track.stageLabel}</span>
                        </div>
                        <p className="font-mono text-[9px] text-white/30 truncate mt-0.5 hidden xs:block">
                          {track.tag}
                        </p>
                      </div>
                    </div>

                    {/* Right: Action Button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrackClick(track.id);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                          isCurrentPlaying
                            ? 'bg-[#9D4EDD]/30 border border-[#9D4EDD] text-white animate-pulse'
                            : isSelected
                              ? 'bg-white/15 border border-white/25 text-white'
                              : 'bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {isCurrentPlaying ? (
                          <>
                            <Pause className="w-2.5 h-2.5 fill-current" />
                            <span>Pause</span>
                          </>
                        ) : isSelected ? (
                          <>
                            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                            <span>Play</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* --- INLINE EXPANDED CONTROLS & PIPELINE (Opens right inside this card!) --- */}
                  {isSelected && (
                    <div className="px-3 sm:px-4 pb-4 sm:pb-5 pt-1 border-t border-white/10 flex flex-col gap-4 animate-in fade-in duration-300">
                      
                      {/* Audio Scrubber Bar */}
                      <div className="flex flex-col gap-1.5 pt-2">
                        <div 
                          className="w-full h-2 bg-white/10 rounded-full cursor-pointer relative group"
                          onClick={(e) => {
                            if (!snippetAudioRef.current || !snippetDuration) return;
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const pct = Math.max(0, Math.min(1, x / rect.width));
                            snippetAudioRef.current.currentTime = pct * snippetDuration;
                            setSnippetCurrentTime(pct * snippetDuration);
                          }}
                        >
                          <div 
                            className="h-full bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] rounded-full relative transition-all"
                            style={{ width: snippetDuration ? `${(snippetCurrentTime / snippetDuration) * 100}%` : '0%' }}
                          >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md shadow-[#9D4EDD]/50"></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-[9px] font-mono text-white/40 px-0.5">
                          <span>{formatTime(snippetCurrentTime)} / {formatTime(snippetDuration)}</span>
                          <span className="text-[#E0AAFF]/70">
                            {track.id === '006' ? '24-bit Lossless Studio WAV' : '320 kbps Studio Quality'}
                          </span>
                        </div>
                      </div>

                      {/* Creative Stages (Writing -> Arrangement -> Mix -> Master -> Release) — NO DEADLINE */}
                      <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                        <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-white/40 mb-2.5 px-0.5">
                          <span className="text-[#E0AAFF] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] animate-pulse"></span>
                            <span>Current Stage: {track.stageLabel}</span>
                          </span>
                          <span className="text-white/30">{track.progressPct} Completed</span>
                        </div>

                        {/* Visual Connected Progress */}
                        <div className="relative flex items-center justify-between px-1">
                          <div className="absolute top-1/2 left-1 right-1 h-[2px] bg-white/10 -translate-y-1/2 rounded-full"></div>
                          <div 
                            className="absolute top-1/2 left-1 h-[2px] bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] -translate-y-1/2 rounded-full transition-all duration-300"
                            style={{ width: track.progressPct }}
                          ></div>

                          {track.stages.map((stage, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center gap-1.5">
                              <div className={`w-3.5 h-3.5 rounded-full border transition-all flex items-center justify-center ${
                                stage.done 
                                  ? 'bg-[#9D4EDD] border-[#9D4EDD] text-white shadow-sm shadow-[#9D4EDD]/50' 
                                  : stage.active 
                                    ? 'bg-[#09090b] border-[#ec4899] shadow-sm shadow-[#ec4899]/50 animate-pulse' 
                                    : 'bg-[#09090b] border-white/20'
                              }`}>
                                {stage.done && <Check className="w-2 h-2 text-white" />}
                                {stage.active && <div className="w-1 h-1 rounded-full bg-[#ec4899]"></div>}
                              </div>
                              <span className={`text-[7.5px] sm:text-[8px] font-mono uppercase tracking-wider ${
                                stage.done ? 'text-[#E0AAFF]' : stage.active ? 'text-[#ec4899] font-medium' : 'text-white/25'
                              }`}>
                                {stage.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Download Gate (Directly inside the song card) */}
                      <div className="pt-1">
                        {downloadUnlocked ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono">
                              <Check className="w-3.5 h-3.5" />
                              <span>Downloads Unlocked</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {track.downloads.map((dl, i) => (
                                <a
                                  key={i}
                                  href={dl.url}
                                  download={dl.filename}
                                  className={`flex items-center justify-between p-2.5 rounded-xl border text-[11px] font-mono uppercase tracking-wider transition-all active:scale-[0.98] ${
                                    dl.isPrimary
                                      ? 'bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] text-white border-transparent shadow-md shadow-[#9D4EDD]/30'
                                      : 'bg-white/5 border-white/15 text-white hover:border-[#9D4EDD]/40'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <Download className="w-3.5 h-3.5" />
                                    <span>{dl.title}</span>
                                  </div>
                                  <span className="text-[8.5px] px-1.5 py-0.5 rounded bg-black/30 text-white/80">{dl.format}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        ) : showDownloadForm ? (
                          <form onSubmit={handleDownloadSubmit} className="flex flex-col gap-2 bg-black/40 p-3 rounded-xl border border-white/10">
                            <p className="font-mono text-[10px] text-white/60 text-center">
                              Enter your name & email to download the free snippet
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <div className="relative flex-1">
                                <User className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                  type="text"
                                  required
                                  value={downloadName}
                                  onChange={(e) => setDownloadName(e.target.value)}
                                  placeholder="Your name"
                                  className="w-full bg-white/5 border border-white/15 rounded-lg pl-8 pr-3 py-2 text-white text-xs font-mono placeholder:text-white/20 focus:outline-none focus:border-[#9D4EDD]"
                                />
                              </div>
                              <div className="relative flex-1">
                                <Mail className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                  type="email"
                                  required
                                  value={downloadEmail}
                                  onChange={(e) => setDownloadEmail(e.target.value)}
                                  placeholder="your@email.com"
                                  className="w-full bg-white/5 border border-white/15 rounded-lg pl-8 pr-3 py-2 text-white text-xs font-mono placeholder:text-white/20 focus:outline-none focus:border-[#9D4EDD]"
                                />
                              </div>
                              <button
                                type="submit"
                                disabled={downloadSubmitting}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] text-white font-mono text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 disabled:opacity-50 cursor-pointer"
                              >
                                {downloadSubmitting ? '...' : 'Unlock'}
                              </button>
                            </div>
                            {downloadEmailError && (
                              <p className="text-[9px] text-red-400 font-mono text-center">{downloadEmailError}</p>
                            )}
                          </form>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDownloadForm(true);
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/15 hover:border-[#9D4EDD]/50 hover:bg-white/10 text-white font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-[#9D4EDD]" />
                            <span>Free Lossless Download</span>
                            <span className="text-[9px] text-white/40 lowercase">— with email</span>
                          </button>
                        )}
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Minimalist Divider */}
        <div className="flex flex-col items-center mb-10 opacity-30">
          <div className="w-[1px] h-6 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>

        {/* --- DISCREET MIXING & MASTERING SECTION --- */}
        <section id="services" className="w-full max-w-4xl mx-auto mb-20 text-left">
          
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
                Commercial-grade sonic treatment for cinematic synths, alt electronic, and dynamic productions. 
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
                    <Music className="w-4 h-4" />
                  </div>
                  <h4 className="font-modern text-white text-sm font-medium mb-1">Production & Composition</h4>
                  <p className="font-mono text-[11px] text-[#9ca3af] leading-relaxed">
                    Custom analog synth arrangements, sound design, cinematic composition, and finishing unfinished drafts.
                  </p>
                </div>

              </div>

              {/* Direct Studio Inquiry Form (Formspree Integration) */}
              <div className="pt-8 border-t border-white/10">
                <div className="mb-6">
                  <h4 className="font-modern text-lg md:text-xl text-white font-medium mb-1">
                    Direct Studio Inquiry
                  </h4>
                  <p className="font-mono text-xs text-white/50">
                    Select a service, drop your project details or reference links, and receive a direct proposal.
                  </p>
                </div>

                {serviceSubmitted ? (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[#9D4EDD]/15 to-[#ec4899]/15 border border-[#9D4EDD]/40 flex flex-col items-center text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <h5 className="font-modern text-white text-base font-medium">Inquiry Received</h5>
                    <p className="font-mono text-xs text-white/60 max-w-md">
                      Thank you! I review each project personally and will email you back within 24 hours.
                    </p>
                    <a
                      href="https://wa.me/584121479466"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black text-xs font-mono tracking-wider transition-all"
                    >
                      Instant WhatsApp Chat (+58 412 147 9466)
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleServiceSubmit} className="flex flex-col gap-4">
                    {/* Service Selector Chips */}
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-2">
                        Select Service
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Mixing & Mastering',
                          'Composition & Production',
                          'Custom Synths & Sound Design',
                          'Stem Review & Consultation'
                        ].map((srv) => (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => setServiceType(srv)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                              serviceType === srv
                                ? 'bg-[#9D4EDD] text-white font-medium shadow-md shadow-[#9D4EDD]/40 border border-[#9D4EDD]'
                                : 'bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/20'
                            }`}
                          >
                            {srv}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="text"
                          required
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                          placeholder="Your name / Artist name"
                          className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-white text-xs font-mono placeholder:text-white/20 focus:outline-none focus:border-[#9D4EDD] transition-colors"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="email"
                          required
                          value={serviceEmail}
                          onChange={(e) => setServiceEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-white text-xs font-mono placeholder:text-white/20 focus:outline-none focus:border-[#9D4EDD] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Project notes / Reference links */}
                    <div>
                      <textarea
                        rows={3}
                        value={serviceMessage}
                        onChange={(e) => setServiceMessage(e.target.value)}
                        placeholder="Project details: number of tracks, genre, sonic references, or Drive / SoundCloud link..."
                        className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-white text-xs font-mono placeholder:text-white/20 focus:outline-none focus:border-[#9D4EDD] transition-colors resize-none"
                      />
                    </div>

                    {serviceError && (
                      <p className="text-xs text-red-400 font-mono">{serviceError}</p>
                    )}

                    {/* Submit Row */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                      <button
                        type="submit"
                        disabled={serviceSubmitting}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[#9D4EDD]/25 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {serviceSubmitting ? (
                          <span>Sending Inquiry...</span>
                        ) : (
                          <>
                            <span>Send Studio Inquiry</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
                        <span>Prefer direct chat?</span>
                        <a
                          href="https://wa.me/584121479466"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#E0AAFF] hover:underline"
                        >
                          WhatsApp (+58 412 147 9466) ↗
                        </a>
                      </div>
                    </div>
                  </form>
                )}
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
          © {new Date().getFullYear()} NAPBAK. CINEMATIC SYNTHS & AUDIO ENGINEERING. ALL RIGHTS RESERVED.
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

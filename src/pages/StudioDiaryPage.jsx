import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Check, Sliders, Play, Pause, Music, Volume2, 
  Download, Clock, Sparkles, ExternalLink, ArrowLeft, ArrowUpRight,
  ShieldCheck, Waves, Lock, Unlock, CheckCircle2, Share2, Layers
} from 'lucide-react';

// --- Catalog of Works in Progress (Studio Diary) ---
const TRACKS_DATA = [
  {
    id: '006',
    number: '006',
    title: 'Lost In The Woods',
    code: 'NAPBAK // WIP-006',
    tag: 'Exclusive studio snippet • Trending on live sessions',
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
        title: 'Studio Capture MP3',
        meta: '320 kbps Crisp Audio • 650 KB',
        url: '/audio/napbak-rabbit-hole-005.mp3',
        filename: 'Napbak - Rabbit Hole (Preview).mp3',
        isPrimary: true,
      }
    ],
  },
  {
    id: '004',
    number: '004',
    title: 'Dark Synthwave 004',
    code: 'NAPBAK // WIP-004',
    tag: 'Cyberpunk arps • Vintage Roland & Moog emulation',
    bpm: '115 BPM',
    key: 'C Minor',
    stageLabel: 'Writing',
    progressPct: '25%',
    stages: [
      { label: 'Writing', done: false, active: true },
      { label: 'Arrangement', done: false },
      { label: 'Mix', done: false },
      { label: 'Master', done: false },
      { label: 'Release', done: false },
    ],
    audioSrc: '/audio/napbak-dark-synthwave-004.mp3',
    downloads: [
      {
        format: 'MP3',
        title: 'Session Demo MP3',
        meta: '320 kbps Studio Demo • 600 KB',
        url: '/audio/napbak-dark-synthwave-004.mp3',
        filename: 'Napbak - Dark Synthwave 004 (Demo).mp3',
        isPrimary: true,
      }
    ],
  }
];

export default function StudioDiaryPage({ onNavigate }) {
  const [selectedTrackId, setSelectedTrackId] = useState('006');
  const [snippetPlaying, setSnippetPlaying] = useState(false);
  const [snippetCurrentTime, setSnippetCurrentTime] = useState(0);
  const [snippetDuration, setSnippetDuration] = useState(0);

  // Email Gate state for Lossless Download
  const [downloadName, setDownloadName] = useState('');
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadSubmitting, setDownloadSubmitting] = useState(false);
  const [downloadUnlocked, setDownloadUnlocked] = useState(false);
  const [downloadEmailError, setDownloadEmailError] = useState('');
  const [showDownloadForm, setShowDownloadForm] = useState(false);

  // Scrolled nav
  const [isScrolled, setIsScrolled] = useState(false);

  const snippetAudioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const canvasRef = useRef(null);

  const activeTrack = TRACKS_DATA.find(t => t.id === selectedTrackId) || TRACKS_DATA[0];

  useEffect(() => {
    document.title = "Studio Diary // Works in Progress • Napbak Studio";

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    try {
      if (localStorage.getItem('napbak_download_unlocked') === 'true') {
        setDownloadUnlocked(true);
      }
    } catch (e) {}

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Background ambient particles ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const palette = ['157, 78, 221', '236, 72, 153', '59, 130, 246', '245, 158, 11'];

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.6;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = -(Math.random() * 0.45 + 0.15);
        this.alpha = Math.random() * 0.5 + 0.2;
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
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha * 0.3})`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 35 }, () => new Particle());

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

  const navigateTo = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const togglePlay = () => {
    if (!snippetAudioRef.current) return;
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

  const handleTrackClick = (trackId) => {
    if (selectedTrackId === trackId) {
      togglePlay();
      return;
    }
    setSelectedTrackId(trackId);
    setSnippetPlaying(false);
    setSnippetCurrentTime(0);

    setTimeout(() => {
      if (snippetAudioRef.current) {
        snippetAudioRef.current.play()
          .then(() => setSnippetPlaying(true))
          .catch(err => {
            console.warn('Auto play failed:', err);
            setSnippetPlaying(false);
          });
      }
    }, 150);
  };

  const handleDownloadSubmit = async (e) => {
    e.preventDefault();
    setDownloadEmailError('');
    if (!downloadName.trim()) {
      setDownloadEmailError('Please enter your name');
      return;
    }
    if (!downloadEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(downloadEmail)) {
      setDownloadEmailError('Please enter a valid email');
      return;
    }

    setDownloadSubmitting(true);
    try {
      await fetch('https://formspree.io/f/xjyknvry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: downloadName.trim(),
          email: downloadEmail.trim(), 
          source: 'studio_diary_page_download_gate', 
          track: activeTrack.title,
          track_id: activeTrack.id,
          timestamp: new Date().toISOString()
        })
      });
      setDownloadUnlocked(true);
      try {
        localStorage.setItem('napbak_download_unlocked', 'true');
      } catch (err) {}
    } catch (err) {
      setDownloadUnlocked(true);
    } finally {
      setDownloadSubmitting(false);
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
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@100;400;700&family=Outfit:wght@100;300;400;500;600;700;800&display=swap');
        
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-modern { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
        
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

        .vault-glow {
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(245, 158, 11, 0.15);
        }
      `}</style>

      {/* Reactive background canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-80"
      />

      {/* Analog film grain overlay */}
      <div className="noise-overlay"></div>

      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#f59e0b]/10 via-[#9D4EDD]/10 to-transparent blur-3xl pointer-events-none -z-10"></div>

      {/* Audio Element */}
      <audio 
        ref={snippetAudioRef} 
        src={activeTrack.audioSrc} 
        preload="metadata"
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

      {/* Navigation Top Bar */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-[#050505]/92 backdrop-blur-md border-b border-white/5 shadow-2xl' 
          : 'py-4 md:py-6 bg-transparent'
      }`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <a 
            href="/" 
            onClick={(e) => navigateTo(e, '/')}
            className="flex items-center gap-1 group cursor-pointer select-none"
          >
            <span className="font-modern text-lg md:text-xl text-white font-light tracking-tighter lowercase">
              napbak<span className="font-serif italic text-white/70 tracking-normal">.studio</span><span className="animate-pulse text-[#9D4EDD] font-mono ml-0.5">_</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <a 
              href="/links" 
              onClick={(e) => navigateTo(e, '/links')}
              className="text-[10px] sm:text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Links</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Header Tagline & Badges */}
        <div className="w-full text-center mb-8 sm:mb-10 animate-in fade-in duration-500">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-amber-300 text-[10px] font-mono tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>STUDIO DIARY // WORKS IN PROGRESS</span>
          </div>

          <h1 className="font-modern text-3xl sm:text-4xl md:text-5xl text-white font-extrabold tracking-tight uppercase leading-tight mb-3">
            Inside The Synth Lab.
          </h1>

          <p className="font-mono text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
            Live unreleased session recordings, multitrack stages, and lossless preview exports straight from FL Studio.
          </p>
        </div>

        {/* Catalog of Tracks */}
        <div className="w-full flex flex-col gap-3.5">
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
                {/* Track Header Row */}
                <div
                  onClick={() => handleTrackClick(track.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTrackClick(track.id); }}
                  className="p-3.5 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer"
                >
                  {/* Left: Square Art Tile */}
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl shrink-0 flex items-center justify-center overflow-hidden border transition-all ${
                      isSelected
                        ? 'border-[#9D4EDD] shadow-[0_0_15px_rgba(157,78,221,0.35)] bg-[#140f24]'
                        : 'border-white/10 bg-[#0e0e14]'
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#9D4EDD]/25 via-transparent to-[#ec4899]/20 pointer-events-none"></div>
                      <span className="absolute bottom-1 right-1.5 text-[8px] font-mono text-white/20 font-bold tracking-tighter pointer-events-none">
                        #{track.number}
                      </span>

                      {isCurrentPlaying ? (
                        <div className="relative z-10 w-9 h-9 rounded-full bg-[#9D4EDD] text-white flex items-center justify-center shadow-lg shadow-[#9D4EDD]/60 animate-pulse">
                          <div className="flex items-end justify-center gap-[2.5px] h-4 w-4">
                            <span className="w-[3px] bg-white rounded-full animate-eq-1"></span>
                            <span className="w-[3px] bg-white rounded-full animate-eq-2"></span>
                            <span className="w-[3px] bg-white rounded-full animate-eq-3"></span>
                          </div>
                        </div>
                      ) : (
                        <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
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
                      <span className="font-modern text-white font-medium text-base sm:text-lg truncate block">
                        {track.title}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-white/50 flex-wrap mt-0.5">
                        <span className="text-[#E0AAFF] font-medium">{track.bpm}</span>
                        <span>•</span>
                        <span>{track.key}</span>
                        <span>•</span>
                        <span className="text-white/40">{track.stageLabel}</span>
                      </div>
                      <p className="font-mono text-[9px] text-white/40 truncate mt-0.5 hidden xs:block">
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
                          : 'bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      {isCurrentPlaying ? (
                        <>
                          <Pause className="w-3 h-3 fill-current" />
                          <span>Playing</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Audio Player & Pipeline (When Selected) */}
                {isSelected && (
                  <div className="border-t border-white/10 p-3.5 sm:p-5 bg-black/40 flex flex-col gap-4 animate-in fade-in duration-300">
                    
                    {/* Scrub Bar & Time */}
                    <div className="flex flex-col gap-1.5">
                      <div 
                        className="w-full h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer relative group"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickPos = (e.clientX - rect.left) / rect.width;
                          if (snippetAudioRef.current && snippetDuration) {
                            snippetAudioRef.current.currentTime = clickPos * snippetDuration;
                          }
                        }}
                      >
                        <div 
                          className="h-full bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] rounded-full transition-all duration-100 relative"
                          style={{
                            width: `${snippetDuration ? (snippetCurrentTime / snippetDuration) * 100 : 0}%`
                          }}
                        >
                          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white opacity-0 group-hover:opacity-100 shadow"></span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-mono text-white/40">
                        <span>{formatTime(snippetCurrentTime)}</span>
                        <span className="text-[#E0AAFF]/70">24-bit Lossless Engine</span>
                        <span>{formatTime(snippetDuration)}</span>
                      </div>
                    </div>

                    {/* Track Production Pipeline Stages */}
                    <div className="pt-2 border-t border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">
                          Production Stage
                        </span>
                        <span className="text-[10px] font-mono text-[#E0AAFF] font-semibold">
                          {track.progressPct} Complete
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 text-center">
                        {track.stages.map((stage, idx) => (
                          <div 
                            key={idx}
                            className={`py-1.5 px-1 rounded-lg border text-[9px] font-mono uppercase tracking-wider flex flex-col items-center gap-1 ${
                              stage.done
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : stage.active
                                ? 'bg-[#9D4EDD]/20 border-[#9D4EDD] text-white font-bold shadow-md shadow-[#9D4EDD]/30'
                                : 'bg-white/[0.02] border-white/5 text-white/20'
                            }`}
                          >
                            <span className="text-[8px] opacity-70">0{idx + 1}</span>
                            <span className="truncate w-full">{stage.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Download Audio Section (Email Gated) */}
                    <div className="pt-2 border-t border-white/5">
                      {downloadUnlocked ? (
                        <div className="p-3 rounded-xl bg-gradient-to-r from-[#9D4EDD]/15 to-[#ec4899]/15 border border-[#9D4EDD]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <div className="text-left">
                              <span className="text-xs font-mono font-bold text-white block">Vault Unlocked</span>
                              <span className="text-[10px] font-mono text-white/50">High-resolution audio stems ready</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap justify-end">
                            {track.downloads.map((dl, i) => (
                              <a
                                key={i}
                                href={dl.url}
                                download={dl.filename}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
                                  dl.isPrimary
                                    ? 'bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] text-white shadow hover:opacity-90'
                                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                                }`}
                              >
                                <Download className="w-3 h-3" />
                                <span>{dl.format}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : showDownloadForm ? (
                        <form onSubmit={handleDownloadSubmit} className="p-3.5 rounded-xl bg-black/60 border border-[#9D4EDD]/50 flex flex-col gap-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-white flex items-center gap-1.5">
                              <Lock className="w-3.5 h-3.5 text-[#E0AAFF]" />
                              Unlock Full Lossless Audio
                            </span>
                            <button
                              type="button"
                              onClick={() => setShowDownloadForm(false)}
                              className="text-[9px] font-mono text-white/40 hover:text-white"
                            >
                              Cancel
                            </button>
                          </div>
                          <p className="text-[10px] font-mono text-white/50">
                            Enter your email to download the studio WAV & MP3 of <strong>{track.title}</strong> directly.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input
                              type="text"
                              required
                              value={downloadName}
                              onChange={(e) => setDownloadName(e.target.value)}
                              placeholder="Your Name"
                              className="bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-xs font-mono placeholder:text-white/20 focus:outline-none focus:border-[#9D4EDD]"
                            />
                            <input
                              type="email"
                              required
                              value={downloadEmail}
                              onChange={(e) => setDownloadEmail(e.target.value)}
                              placeholder="your@email.com"
                              className="bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-xs font-mono placeholder:text-white/20 focus:outline-none focus:border-[#9D4EDD]"
                            />
                            <button
                              type="submit"
                              disabled={downloadSubmitting}
                              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] text-white font-mono text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 disabled:opacity-50 cursor-pointer"
                            >
                              {downloadSubmitting ? 'Unlocking...' : 'Unlock Audio'}
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
                          <span>Free Lossless Audio Download</span>
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

        {/* Promo Bridge to Mastering */}
        <div className="w-full mt-8 p-5 rounded-2xl bg-gradient-to-b from-[#140f26] to-[#0a0a10] border border-[#9D4EDD]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#E0AAFF] uppercase block mb-1">
              NEED YOUR TRACK TO SOUND LIKE THIS?
            </span>
            <h3 className="font-modern text-white text-base font-bold">
              Week Mastering Flash Promo — $45
            </h3>
            <p className="font-mono text-xs text-white/50 mt-0.5">
              True Peak calibration, 48h turnaround, Spotify-ready masters.
            </p>
          </div>
          <a
            href="/mastering"
            onClick={(e) => navigateTo(e, '/mastering')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-md hover:opacity-95 shrink-0"
          >
            Claim $45 Promo ↗
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-10 border-t border-white/5 flex flex-col items-center justify-center gap-4 relative z-10 bg-[#050505] text-center px-4">
        <a 
          href="/" 
          onClick={(e) => navigateTo(e, '/')}
          className="font-modern text-base text-white font-light tracking-tighter lowercase flex items-center gap-1"
        >
          napbak<span className="font-serif italic text-white tracking-normal">.studio</span>
          <span className="animate-pulse text-[#9D4EDD] font-mono ml-0.5">_</span>
        </a>

        <div className="flex flex-wrap gap-4 text-[10px] tracking-widest uppercase text-[#9ca3af] items-center justify-center font-mono">
          <a href="/links" onClick={(e) => navigateTo(e, '/links')} className="hover:text-white transition-colors">
            Links Hub
          </a>
          <span>•</span>
          <a href="/" onClick={(e) => navigateTo(e, '/')} className="hover:text-white transition-colors">
            Soundscape Home
          </a>
          <span>•</span>
          <a href="https://ctrl.napbak.studio" target="_blank" rel="noreferrer" className="hover:text-[#9D4EDD] transition-colors">
            CTRL Analyzer ↗
          </a>
          <span>•</span>
          <a href="https://ig.me/m/napbak.studio" target="_blank" rel="noreferrer" className="hover:text-[#E0AAFF] transition-colors">
            Instagram @napbak.studio ↗
          </a>
        </div>

        <p className="text-[9px] tracking-widest text-white/30 font-mono">
          © {new Date().getFullYear()} NAPBAK. DARK SYNTH PRODUCTION & AUDIO ENGINEERING.
        </p>
      </footer>

    </div>
  );
}

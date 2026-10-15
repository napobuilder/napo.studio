import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Download, Disc, Music, Layers, 
  Sliders, ShieldCheck, Check, ExternalLink, ArrowRight, Sparkles, 
  Zap, Clock, Radio, FileCode, FolderArchive, ArrowLeft, ChevronDown, 
  ChevronUp, Lock, Share2
} from 'lucide-react';

export default function NemesisKitPage({ onNavigate }) {
  // --- Audio Player State ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const PAYHIP_URL = "https://payhip.com/b/c0hzb";

  useEffect(() => {
    document.title = '"NEMESIS" — Dark Synthwave FLP & Loop Kit | napbak.studio';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // --- Dynamic Particle Background ---
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
        this.size = Math.random() * 1.8 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(Math.random() * 0.4 + 0.15);
        this.alpha = Math.random() * 0.6 + 0.2;
        const palette = ['157, 78, 221', '236, 72, 153', '168, 85, 247', '244, 63, 94', '255, 255, 255'];
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
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha * 0.4})`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 45 }, () => new Particle());

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

  // --- Audio Player Controls ---
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio play blocked or error:", err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = pct * (duration || 1);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const seekTo = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = seconds;
    setCurrentTime(seconds);
    if (!isPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (timeInSec) => {
    if (isNaN(timeInSec)) return '0:00';
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/nemesis');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const navigateTo = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const faqs = [
    {
      q: "Do I need FL Studio to use this kit?",
      a: "No. While we include the full native FL Studio project (.FLP zipped package with mixer routing, sidechaining, and automation), every single pattern, synth lead, bassline, and drum element is pre-rendered in high-quality 24-bit WAV format. You can drag and drop them straight into Ableton Live, Logic Pro, Reaper, Cubase, Studio One, or any DAW right out of the box."
    },
    {
      q: "What if I don't have Serum or Sylenth1 installed?",
      a: "No problem at all! Every sound crafted with Serum and Sylenth1 comes with its corresponding pre-rendered WAV audio stem with all filters, saturation, and effects baked in. If you have the plugins, you can tweak the presets inside the FLP; if you don't, you simply work with the audio stems with zero missing plugin errors."
    },
    {
      q: "Are these sounds 100% Royalty-Free?",
      a: "Yes, 100%. You get a lifetime royalty-free commercial license to use the loops, melodies, drum fills, and FX in your own original tracks, beats sold on Beatstars, streaming releases on Spotify/Apple Music, video games, YouTube videos, and client productions without paying any additional royalties."
    },
    {
      q: "How and when do I receive the files after checkout?",
      a: "Delivery is instant and automated via Payhip. The moment your checkout of $7.00 USD is completed (via debit/credit card or PayPal), you will be directed straight to your instant .ZIP download page, and an email confirmation with your download link will also be sent to your inbox."
    },
    {
      q: "What tempo and key was this project produced in?",
      a: "It is produced at 155 BPM in the key of C Minor—the optimal tempo for building high-tension dark synthwave where an eerie cinematic intro transitions seamlessly into an energetic, driving groove."
    }
  ];

  return (
    <div className="bg-[#050505] text-[#9ca3af] font-mono selection:bg-[#ec4899] selection:text-white min-h-screen relative overflow-x-hidden">
      
      {/* Global Embedded Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@100;300;400;500;600;700&family=Outfit:wght@100;300;400;500;600;700;800;900&display=swap');
        
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

        .neon-glow-pink {
          box-shadow: 0 0 45px -10px rgba(236, 72, 153, 0.45), 0 0 20px -5px rgba(157, 78, 221, 0.35);
        }

        .neon-glow-purple {
          box-shadow: 0 0 50px -5px rgba(157, 78, 221, 0.3), 0 0 30px -10px rgba(236, 72, 153, 0.25);
        }

        .cyber-grid {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 36px 36px;
        }

        @keyframes wave-bar {
          0%, 100% { height: 15%; }
          50% { height: 95%; }
        }
      `}</style>

      {/* Reactive particle canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-85"
      />

      {/* Film grain noise overlay */}
      <div className="noise-overlay"></div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/nemesis-preview.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* --- FLOATING HEADER --- */}
      <header className="sticky top-0 w-full z-40 py-3.5 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          
          {/* Back to Links Hub / Home */}
          <div className="flex items-center gap-3">
            <a 
              href="/links" 
              onClick={(e) => navigateTo(e, '/links')}
              className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white px-2.5 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline font-mono">Links Hub</span>
            </a>

            <a 
              href="/" 
              onClick={(e) => navigateTo(e, '/')}
              className="flex items-center gap-1 group cursor-pointer select-none"
            >
              <span className="font-modern text-lg text-white font-light tracking-tighter lowercase">
                napbak<span className="font-serif italic text-white tracking-normal">.studio</span>
                <span className="animate-pulse text-[#ec4899] font-mono ml-0.5">_</span>
              </span>
            </a>
          </div>

          {/* Quick Buy & Share Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              title="Share link"
              className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <a
              href={PAYHIP_URL}
              target="_blank"
              rel="noreferrer"
              className="font-modern font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9D4EDD] hover:brightness-110 text-white px-4 py-2 rounded-full shadow-lg shadow-[#ec4899]/30 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span>Get Kit $7</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Share Toast Feedback */}
      {copiedLink && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#ec4899] text-white text-xs font-mono px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <Check className="w-3.5 h-3.5" />
          <span>NEMESIS link copied to clipboard!</span>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 pt-8 sm:pt-14 pb-24 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Launch Special Promo Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ec4899]/40 bg-[#ec4899]/10 backdrop-blur-md mb-6 animate-pulse">
          <Zap className="w-3.5 h-3.5 text-[#ec4899]" />
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-white uppercase">
            ⚡ LAUNCH SPECIAL: $7.00 USD (Regular Price: $15.00 — Save 53%)
          </span>
        </div>

        {/* Headline & Subtitle */}
        <div className="text-center max-w-3xl mb-8 sm:mb-12">
          <h1 className="font-modern text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-none mb-4">
            "NEMESIS"<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9D4EDD]">_</span>
          </h1>
          <p className="font-modern text-lg sm:text-2xl text-white/90 font-light tracking-wide mb-3">
            Dark Synthwave Construction Kit
          </p>
          <p className="font-mono text-xs sm:text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
            Full FL Studio project, Serum & Sylenth1 sound design, and 100% royalty-free WAV construction kit • 155 BPM.
          </p>
        </div>

        {/* --- MAIN HERO CARD: Cover Art + Immediate Player & Buy Area --- */}
        <div className="w-full rounded-3xl border border-white/10 bg-gradient-to-b from-[#170a1c]/90 via-[#0a0710]/95 to-[#050505] p-5 sm:p-8 backdrop-blur-2xl neon-glow-purple mb-16 relative overflow-hidden">
          
          {/* Subtle Grid Accent in card */}
          <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: 3D-Look Cover Presentation */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-[#ec4899]/40 shadow-2xl shadow-black">
                <img
                  src="/nemesis-cover.jpg"
                  alt="NEMESIS Dark Synthwave FLP & Loop Kit by Napbak"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating pill over cover */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-[10px] font-mono text-white flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>155 BPM // C MINOR</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-[#ec4899]/40 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#ec4899] shadow-lg">
                  FLP + WAV STEMS
                </div>
              </div>

              {/* Badges under cover */}
              <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-white/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Royalty-Free • Instant .ZIP Digital Download</span>
              </div>
            </div>

            {/* Right: Pitch, Interactive Audio Player & Buy Action */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-[#ec4899] uppercase bg-[#ec4899]/15 px-2.5 py-1 rounded-full border border-[#ec4899]/30">
                    FL STUDIO 20+ READY
                  </span>
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-[#9D4EDD] uppercase bg-[#9D4EDD]/15 px-2.5 py-1 rounded-full border border-[#9D4EDD]/30">
                    UNIVERSAL DAW STEMS
                  </span>
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-emerald-300 uppercase bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    SERUM & SYLENTH1 SOUND DESIGN
                  </span>
                </div>

                <h2 className="font-modern text-xl sm:text-2xl font-bold text-white mb-3">
                  Dissect how the mysterious dark synthwave intro transitions into an upbeat groove
                </h2>

                <p className="font-modern text-sm text-white/80 leading-relaxed font-light mb-6">
                  Get full studio access to the <strong className="text-white font-medium">"NEMESIS"</strong> Dark Synthwave Construction Kit. Explore the exact Serum & Sylenth1 sound design, automation curves, and mixer chains, or drag and drop the pre-rendered 24-bit WAV loops straight into your own DAW.
                </p>
              </div>

              {/* --- CUSTOM AUDIO PLAYER --- */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Radio className={`w-4 h-4 ${isPlaying ? 'text-[#ec4899] animate-pulse' : 'text-white/40'}`} />
                    <span className="font-mono text-xs font-semibold text-white">
                      STUDIO DEMO PREVIEW (155 BPM)
                    </span>
                  </div>
                  <span className="font-mono text-xs text-white/50">
                    {formatTime(currentTime)} / {duration ? formatTime(duration) : '0:48'}
                  </span>
                </div>

                {/* Progress Scrubber */}
                <div 
                  onClick={handleSeek}
                  className="w-full h-3 bg-white/10 hover:bg-white/15 rounded-full relative cursor-pointer mb-3.5 group overflow-hidden"
                >
                  <div 
                    className="h-full bg-gradient-to-r from-[#9D4EDD] via-[#ec4899] to-[#f43f5e] rounded-full relative transition-all duration-100"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md"></div>
                  </div>
                </div>

                {/* Player Controls & Visual Wave Bars */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-11 h-11 rounded-full bg-gradient-to-r from-[#ec4899] to-[#9D4EDD] hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#ec4899]/30 transition-all cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Simulated Waveform Visualizer */}
                  <div className="flex items-end gap-1 h-6 px-2">
                    {[35, 60, 85, 45, 95, 70, 40, 90, 65, 80, 50, 100, 75, 45, 85, 60, 40, 70, 95, 55].map((h, i) => (
                      <span 
                        key={i} 
                        className={`w-1 rounded-full transition-all duration-150 ${
                          isPlaying 
                            ? 'bg-gradient-to-t from-[#9D4EDD] to-[#ec4899]' 
                            : 'bg-white/20'
                        }`}
                        style={{
                          height: isPlaying ? `${Math.max(15, (h * Math.random()).toFixed(0))}%` : `${h * 0.4}%`,
                          animation: isPlaying ? `wave-bar 0.7s ease-in-out infinite ${i * 0.05}s` : 'none'
                        }}
                      ></span>
                    ))}
                  </div>
                </div>

                {/* Clickable Cue Markers */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-white/5 text-[9px] font-mono">
                  <button
                    onClick={() => seekTo(0)}
                    className="text-left px-2 py-1 rounded bg-white/[0.03] hover:bg-[#ec4899]/20 hover:text-white text-white/60 transition-colors cursor-pointer truncate"
                  >
                    0:00 • Dark Intro
                  </button>
                  <button
                    onClick={() => seekTo(12)}
                    className="text-left px-2 py-1 rounded bg-white/[0.03] hover:bg-[#ec4899]/20 hover:text-white text-white/60 transition-colors cursor-pointer truncate"
                  >
                    0:12 • Tension & Arp
                  </button>
                  <button
                    onClick={() => seekTo(25)}
                    className="text-left px-2 py-1 rounded bg-white/[0.03] hover:bg-[#ec4899]/20 hover:text-white text-white/60 transition-colors cursor-pointer truncate"
                  >
                    0:25 • Drum Fill
                  </button>
                  <button
                    onClick={() => seekTo(28)}
                    className="text-left px-2 py-1 rounded bg-white/[0.03] hover:bg-[#ec4899]/20 hover:text-white text-white/60 transition-colors cursor-pointer truncate"
                  >
                    0:28 • Synth Drop 🔥
                  </button>
                </div>
              </div>

              {/* Price & Primary CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-modern text-3xl sm:text-4xl font-extrabold text-white">
                      $7.00
                    </span>
                    <span className="font-mono text-xs text-white/40 uppercase">USD</span>
                    <span className="line-through font-mono text-sm text-white/40 ml-1">
                      $15.00
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-emerald-400 mt-0.5">
                    ⚡ Launch Special: You save $8.00 (53% OFF)
                  </p>
                </div>

                <a
                  href={PAYHIP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto font-modern font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9D4EDD] hover:brightness-110 text-white px-7 py-3.5 rounded-full shadow-xl shadow-[#ec4899]/30 flex items-center justify-center gap-2 transition-all active:scale-95 group text-center"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Get Kit for $7</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* 2. WHAT'S INCLUDED IN THIS KIT (Detailed Atomic Breakdown) */}
        {/* ========================================================= */}
        <section className="w-full mb-16">
          <div className="text-center mb-10">
            <h2 className="font-modern text-2xl sm:text-4xl font-bold text-white mb-2">
              What's Included in This Kit
            </h2>
            <p className="font-mono text-xs sm:text-sm text-white/60 max-w-lg mx-auto">
              Everything you need to dissect the production or drop the sounds straight into your own tracks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Pillar 1: Full FL Studio Project */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#130d1d] to-[#08060c] p-6 hover:border-[#ec4899]/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ec4899]/15 border border-[#ec4899]/30 flex items-center justify-center text-[#ec4899] mb-4 group-hover:scale-105 transition-transform">
                  <FileCode className="w-6 h-6" />
                </div>
                <h3 className="font-modern text-lg font-bold text-white mb-2 group-hover:text-[#ec4899] transition-colors">
                  Full FL Studio Project (.FLP)
                </h3>
                <p className="font-modern text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                  Complete zipped project package ready to open in FL Studio 20.8 or newer.
                </p>

                <ul className="space-y-2 text-xs font-mono text-white/60 mb-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Complete arrangement and structure at 155 BPM.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Transition drum fills and cinematic impacts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Filter automation, spatial delays, and sidechaining.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Complete mixer routing and bus processing chains.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-[#ec4899]">
                FL STUDIO 20+ // ZIPPED PACKAGE
              </div>
            </div>

            {/* Pillar 2: 100% Royalty-Free WAV Loops */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#130d1d] to-[#08060c] p-6 hover:border-[#9D4EDD]/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#9D4EDD]/15 border border-[#9D4EDD]/30 flex items-center justify-center text-[#9D4EDD] mb-4 group-hover:scale-105 transition-transform">
                  <Music className="w-6 h-6" />
                </div>
                <h3 className="font-modern text-lg font-bold text-white mb-2 group-hover:text-[#9D4EDD] transition-colors">
                  100% Royalty-Free WAV Loops & Samples
                </h3>
                <p className="font-modern text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                  All synths, rolling analog basslines, punchy drums, and textures pre-rendered in 24-bit studio WAV format.
                </p>

                <ul className="space-y-2 text-xs font-mono text-white/60 mb-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dark synth leads and driving rolling basslines.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Punchy 80s drum grooves and transition fills.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Orchestral tension fills, risers, and impact FX.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Commercial release clearance without paying royalties.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-[#9D4EDD]">
                24-BIT LOSSLESS WAV // COMMERCIAL CLEARANCE
              </div>
            </div>

            {/* Pillar 3: Universal DAW Compatibility */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#130d1d] to-[#08060c] p-6 hover:border-emerald-500/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-modern text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  Universal DAW Compatibility
                </h3>
                <p className="font-modern text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-4">
                  Don't have Serum, Sylenth1, or FL Studio? No problem. Drag and drop the WAVs straight into your DAW.
                </p>

                <ul className="space-y-2 text-xs font-mono text-white/60 mb-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Compatible with Ableton Live, Logic Pro, Reaper.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Works in Cubase, Studio One, Bitwig, or any sampler.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Zero missing-plugin errors with pre-rendered stems.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>All loops organized and tagged with BPM & Key.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-emerald-400">
                DRAG & DROP // ZERO PLUGIN DEPENDENCY
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. TECHNICAL SPECIFICATIONS MATRIX                        */}
        {/* ========================================================= */}
        <section className="w-full mb-16 rounded-2xl border border-white/10 bg-black/50 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <h3 className="font-modern text-xl font-bold text-white">
                Studio Technical Specifications
              </h3>
              <p className="font-mono text-xs text-white/50">
                Exact package details and requirements.
              </p>
            </div>
            <div className="font-mono text-xs text-[#ec4899] bg-[#ec4899]/10 px-3 py-1.5 rounded-full border border-[#ec4899]/30 self-start sm:self-auto">
              SKU: NPBK-NMS-004
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
            <div>
              <span className="text-white/40 block mb-1">TEMPO</span>
              <strong className="text-white text-sm font-semibold">155 BPM</strong>
            </div>
            <div>
              <span className="text-white/40 block mb-1">KEY</span>
              <strong className="text-white text-sm font-semibold">C Minor</strong>
            </div>
            <div>
              <span className="text-white/40 block mb-1">FILE FORMAT</span>
              <strong className="text-white text-sm font-semibold">.ZIP (FLP + 24-Bit WAV)</strong>
            </div>
            <div>
              <span className="text-white/40 block mb-1">LICENSE</span>
              <strong className="text-emerald-400 text-sm font-semibold">100% Royalty-Free</strong>
            </div>
            <div>
              <span className="text-white/40 block mb-1">PRIMARY DAW</span>
              <strong className="text-white text-sm font-semibold">FL Studio 20.8+</strong>
            </div>
            <div>
              <span className="text-white/40 block mb-1">WAV COMPATIBILITY</span>
              <strong className="text-white text-sm font-semibold">Any DAW or Sampler</strong>
            </div>
            <div>
              <span className="text-white/40 block mb-1">PLUGINS USED</span>
              <strong className="text-white text-sm font-semibold">Serum & Sylenth1 (Optional)</strong>
            </div>
            <div>
              <span className="text-white/40 block mb-1">DELIVERY</span>
              <strong className="text-emerald-400 text-sm font-semibold">Instant Download</strong>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. FREQUENTLY ASKED QUESTIONS (Accordion)                 */}
        {/* ========================================================= */}
        <section className="w-full max-w-3xl mb-16">
          <div className="text-center mb-8">
            <h2 className="font-modern text-2xl sm:text-3xl font-bold text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="font-mono text-xs text-white/50">
              Quick answers before getting your copy.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 text-white font-modern font-medium text-sm sm:text-base cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#ec4899] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
                  )}
                </button>

                {activeFaq === idx && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 font-modern text-xs sm:text-sm text-white/70 leading-relaxed font-light border-t border-white/5 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. FINAL CALL TO ACTION                                   */}
        {/* ========================================================= */}
        <section className="w-full rounded-3xl border border-[#ec4899]/40 bg-gradient-to-r from-[#170a1c] via-[#100717] to-[#170a1c] p-8 sm:p-12 text-center relative overflow-hidden neon-glow-pink">
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#ec4899] uppercase bg-[#ec4899]/15 px-3 py-1 rounded-full border border-[#ec4899]/30 mb-4">
              INSTANT FULL STUDIO ACCESS
            </span>

            <h2 className="font-modern text-3xl sm:text-5xl font-extrabold text-white mb-3">
              Bring "NEMESIS" Into Your DAW Today
            </h2>

            <p className="font-modern text-sm sm:text-base text-white/80 font-light mb-6">
              Learn the routing, sound design, and transition secrets behind the project, or drag and drop the loops straight into your next production.
            </p>

            <div className="flex items-baseline justify-center gap-2 mb-6">
              <span className="font-modern text-4xl sm:text-5xl font-black text-white">
                $7.00
              </span>
              <span className="font-mono text-sm text-white/50 uppercase">USD</span>
              <span className="line-through font-mono text-base text-white/40 ml-2">
                $15.00
              </span>
            </div>

            <a
              href={PAYHIP_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto font-modern font-bold text-sm sm:text-base uppercase tracking-wider bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#9D4EDD] hover:brightness-110 text-white px-9 py-4 rounded-full shadow-2xl shadow-[#ec4899]/40 flex items-center justify-center gap-2.5 transition-all active:scale-95 group cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>Download NEMESIS for $7.00 USD</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-[11px] font-mono text-white/50">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Secure SSL Checkout (Payhip)
              </span>
              <span>•</span>
              <span>PayPal & Debit / Credit Cards</span>
              <span>•</span>
              <span>Instant Digital Download (.ZIP)</span>
            </div>

          </div>
        </section>

      </main>

      {/* --- STICKY MOBILE BOTTOM BAR --- */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 p-3.5 sm:hidden flex items-center justify-between gap-3 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/nemesis-cover.jpg"
            alt="NEMESIS"
            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-white/10"
          />
          <div className="min-w-0">
            <h4 className="font-modern font-bold text-xs text-white truncate">
              "NEMESIS" Kit
            </h4>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-xs font-bold text-emerald-400">$7.00</span>
              <span className="line-through font-mono text-[10px] text-white/40">$15</span>
            </div>
          </div>
        </div>

        <a
          href={PAYHIP_URL}
          target="_blank"
          rel="noreferrer"
          className="font-modern font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#ec4899] to-[#9D4EDD] text-white px-4 py-2.5 rounded-full shrink-0 flex items-center gap-1 shadow-md shadow-[#ec4899]/30"
        >
          <span>Buy $7</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* --- FOOTER --- */}
      <footer className="w-full py-12 border-t border-white/5 flex flex-col items-center justify-center gap-4 relative z-10 bg-[#050505] text-center px-4">
        <a 
          href="/" 
          onClick={(e) => navigateTo(e, '/')}
          className="font-modern text-lg text-white font-light tracking-tighter lowercase flex items-center gap-1"
        >
          napbak<span className="font-serif italic text-white tracking-normal">.studio</span>
          <span className="animate-pulse text-[#ec4899] font-mono ml-0.5">_</span>
        </a>

        <div className="flex items-center gap-4 text-xs font-mono text-white/50">
          <a href="/links" onClick={(e) => navigateTo(e, '/links')} className="hover:text-white transition-colors">
            Links
          </a>
          <span>•</span>
          <a href="/mastering" onClick={(e) => navigateTo(e, '/mastering')} className="hover:text-white transition-colors">
            Mastering
          </a>
          <span>•</span>
          <a href="/diary" onClick={(e) => navigateTo(e, '/diary')} className="hover:text-white transition-colors">
            Studio Diary
          </a>
        </div>

        <p className="font-mono text-[10px] text-white/30">
          © {new Date().getFullYear()} napbak.studio. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

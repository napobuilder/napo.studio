import React, { useState, useRef, useEffect } from 'react';
import { 
  Sliders, Waves, Disc, Check, ArrowRight, ShieldCheck, Clock,
  Volume2, Play, Pause, ExternalLink, Sparkles, AlertCircle, 
  HelpCircle, Music, Zap, Radio
} from 'lucide-react';

export default function MasteringSalesPage({ onNavigate }) {
  // --- Audio Player / A/B Comparison State ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [abMode, setAbMode] = useState('mastered'); // 'unmastered' | 'mastered'
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // --- Scrolled Header State ---
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.title = "Week Mastering Promo — $45/Track | Napbak Studio";

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.warn('Audio play prevented:', err);
          setIsPlaying(false);
        });
    }
  };

  const handleABSwitch = (mode) => {
    setAbMode(mode);
    if (audioRef.current) {
      // Subtle simulation: unmastered reduces gain slightly to showcase mastered punch & clarity
      if (mode === 'unmastered') {
        audioRef.current.volume = 0.55;
      } else {
        audioRef.current.volume = 1.0;
      }
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
      
      {/* Global Typography Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@100;400;500;700&family=Outfit:wght@100;300;400;500;600;700;800&display=swap');
        
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

        .promo-glow {
          box-shadow: 0 0 45px -5px rgba(157, 78, 221, 0.35);
        }
      `}</style>

      {/* Analog film noise overlay */}
      <div className="noise-overlay"></div>

      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#9D4EDD]/15 via-[#ec4899]/5 to-transparent blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#9D4EDD]/10 blur-3xl pointer-events-none -z-10"></div>

      {/* Background Audio Instance for A/B Demo */}
      <audio
        ref={audioRef}
        src="/audio/napbak-lost-in-the-woods-006.mp3"
        preload="metadata"
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />

      {/* ========================================================= */}
      {/* 1. TOP FLASH PROMO TICKER                                 */}
      {/* ========================================================= */}
      <aside aria-label="Limited time promotion announcement" className="w-full bg-gradient-to-r from-[#9D4EDD] via-[#ec4899] to-[#9D4EDD] text-white py-2 px-4 text-center text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase sticky top-0 z-50 shadow-lg shadow-black/50">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span>⚡ WEEK MASTERING FLASH PROMO: 1 TRACK FOR $45 (REGULAR $70)</span>
          <span className="opacity-70 hidden sm:inline">•</span>
          <span className="text-white/90 hidden sm:inline">LIMITED STUDIO SLOTS THIS WEEK ONLY</span>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. NAVIGATION BAR                                         */}
      {/* ========================================================= */}
      <nav className={`w-full px-4 sm:px-8 transition-all duration-300 z-40 ${
        isScrolled 
          ? 'py-3.5 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 sticky top-8 shadow-xl' 
          : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          {/* Logo brand */}
          <a 
            href="/" 
            onClick={(e) => navigateTo(e, '/')}
            className="flex items-center gap-1 group cursor-pointer"
          >
            <span className="font-modern text-xl text-white font-light tracking-tighter lowercase">
              napbak<span className="font-serif italic text-white tracking-normal">.studio</span>
              <span className="animate-pulse text-[#9D4EDD] font-mono ml-0.5">_</span>
            </span>
          </a>

          {/* Quick Nav Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a 
              href="/links" 
              onClick={(e) => navigateTo(e, '/links')}
              className="text-[10px] sm:text-[11px] font-mono text-white/60 hover:text-white uppercase tracking-wider transition-colors"
            >
              ← Back to Links
            </a>
            <a 
              href="https://payhip.com/b/VpQRd"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all font-semibold active:scale-95 flex items-center gap-1"
            >
              Claim $45 Promo ↗
            </a>
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* 3. HERO SECTION                                           */}
      {/* ========================================================= */}
      <header className="pt-10 sm:pt-16 pb-16 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Deal Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#9D4EDD]/15 border border-[#9D4EDD]/40 text-[#E0AAFF] text-[10px] sm:text-xs font-mono tracking-wider uppercase mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#ec4899]" />
          <span>WEEK MASTERING SPECIAL • SAVE $25 PER TRACK</span>
        </div>

        {/* Titular Headline */}
        <h1 className="font-modern text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-tight uppercase leading-[1.08] mb-4">
          Commercial Loudness.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E0AAFF] to-[#ec4899]">
            Zero Distortion.
          </span>
        </h1>

        {/* Italic Aesthetic Sub-headline */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-white/80 max-w-2xl leading-snug mb-5">
          Don't let streaming algorithms crush your mix. Get your tracks release-ready for Spotify, Apple Music & club sound systems.
        </p>

        {/* Technical Subtitle */}
        <p className="font-mono text-xs sm:text-sm text-[#9ca3af] max-w-xl leading-relaxed mb-8 font-light">
          Engineered by a 10+ year audio software developer & music producer. True Peak (dBTP) control, linear-phase low-end alignment, and analog harmonic saturation calibrated to commercial standards.
        </p>

        {/* Hero Price & CTA Block */}
        <div className="w-full max-w-md p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#130f24]/90 via-[#0c0a16]/95 to-[#08080d] border border-[#9D4EDD]/60 promo-glow flex flex-col items-center text-center gap-4">
          
          <div className="flex items-baseline gap-3">
            <span className="font-modern text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
              $45
            </span>
            <span className="font-mono text-base text-white/40 line-through">
              $70 USD
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase">
              35% OFF
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-white/70">
            <span className="flex items-center gap-1 text-emerald-400">
              <Check className="w-3.5 h-3.5" /> 48h Turnaround
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#E0AAFF]">
              <Check className="w-3.5 h-3.5" /> 1 Revision (7 Days)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-blue-400">
              <Check className="w-3.5 h-3.5" /> 24-bit Lossless
            </span>
          </div>

          <a 
            href="https://payhip.com/b/VpQRd"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] text-white font-mono text-xs sm:text-sm uppercase tracking-wider font-bold shadow-lg shadow-[#9D4EDD]/35 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Instant Checkout on Payhip ($45)</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-white/50">
            <span>Questions before ordering?</span>
            <a 
              href="https://ig.me/m/napbak.studio" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#E0AAFF] hover:underline flex items-center gap-1 font-semibold"
            >
              Instagram DM (@napbak.studio) ↗
            </a>
            <span>•</span>
            <a 
              href="mailto:napbak.studio@gmail.com?subject=Week%20Mastering%20Promo%20Inquiry" 
              className="text-white/70 hover:underline"
            >
              Email
            </a>
          </div>
        </div>

      </header>

      {/* ========================================================= */}
      {/* 4. BEFORE & AFTER AUDIO DEMO                              */}
      {/* ========================================================= */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-[#09090d] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#9D4EDD] uppercase block mb-1">
                AUDIO EXPERIENCE // NAPBAK DSP
              </span>
              <h2 className="font-modern text-xl sm:text-2xl text-white font-semibold">
                Hear The Mastered Difference
              </h2>
            </div>

            {/* A/B Switch Selector */}
            <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => handleABSwitch('unmastered')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  abMode === 'unmastered'
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                A: Raw Mix
              </button>
              <button
                onClick={() => handleABSwitch('mastered')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  abMode === 'mastered'
                    ? 'bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] text-white font-bold shadow-md shadow-[#9D4EDD]/30'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                B: Napbak Master ✨
              </button>
            </div>
          </div>

          {/* Interactive Player Strip */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    isPlaying 
                      ? 'bg-[#9D4EDD] text-white shadow-lg shadow-[#9D4EDD]/50'
                      : 'bg-white text-black hover:scale-105'
                  }`}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
                <div>
                  <h3 className="font-modern text-white text-sm font-medium">
                    Napbak — Lost In The Woods (Studio Preview)
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
                    <span className={abMode === 'mastered' ? 'text-emerald-400 font-semibold' : 'text-white/40'}>
                      Mode: {abMode === 'mastered' ? 'Mastered (Commercial Standard)' : 'Unmastered (Pre-Master Mix)'}
                    </span>
                    <span>•</span>
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#E0AAFF]">
                <Radio className="w-3 h-3 animate-pulse text-[#ec4899]" />
                <span>24-bit 48kHz WAV</span>
              </div>
            </div>

            {/* Time Bar */}
            <div 
              className="w-full h-2 bg-white/10 rounded-full cursor-pointer relative"
              onClick={(e) => {
                if (!audioRef.current || !duration) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const pct = Math.max(0, Math.min(1, x / rect.width));
                audioRef.current.currentTime = pct * duration;
                setCurrentTime(pct * duration);
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-[#9D4EDD] to-[#ec4899] rounded-full relative"
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-[10px] font-mono text-white/60">
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-white block font-medium">True Peak</span>
              <span>-1.0 dBTP (Zero Clip)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-white block font-medium">Loudness Target</span>
              <span>Spotify & Club Calibrated</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-white block font-medium">Dynamic Range</span>
              <span>Punch Without Squash</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-white block font-medium">Stereo Imaging</span>
              <span>Mono-Compatible Lows</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. THE 4 PILLARS OF NAPBAK MASTERING                       */}
      {/* ========================================================= */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono tracking-widest text-[#9D4EDD] uppercase block mb-1">
            THE ENGINEERING ADVANTAGE
          </span>
          <h2 className="font-modern text-2xl sm:text-3xl text-white font-bold">
            Why Generic Presets & Limiters Fail
          </h2>
          <p className="font-mono text-xs text-white/50 max-w-lg mx-auto mt-2">
            Mastering isn't simply making audio louder. It is acoustic translation and mechanical DSP calibration so your song survives consumer DACs and streaming codecs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#9D4EDD]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#9D4EDD]/15 flex items-center justify-center text-[#E0AAFF] mb-4">
              <Waves className="w-5 h-5" />
            </div>
            <h3 className="font-modern text-white text-base font-semibold mb-2">
              1. Inter-Sample Clipping Elimination
            </h3>
            <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
              Standard DAW meters only read sample peaks, ignoring reconstructed analog waveforms. When your file is converted into AAC/MP3 or played through AirPods, inter-sample peaks cause harsh crackle distortion. I calibrate with strict True Peak oversampling.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#ec4899]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#ec4899]/15 flex items-center justify-center text-pink-400 mb-4">
              <Disc className="w-5 h-5" />
            </div>
            <h3 className="font-modern text-white text-base font-semibold mb-2">
              2. Surgical Sub-Bass & Punch Preservation
            </h3>
            <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
              Excessive low-end energy chokes master limiters and robs your track of loudness. Using linear-phase sidechain filtering and mono sub alignment (20–85 Hz), your kicks hit hard with physical chest punch without muddying the upper octaves.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#3b82f6]/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/15 flex items-center justify-center text-blue-400 mb-4">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-modern text-white text-base font-semibold mb-2">
              3. Analog Warmth & Mid/Side Excitement
            </h3>
            <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
              Sterile digital mixes lack depth. I apply hybrid analog-modeled harmonic saturation (triode tube and tape head emulation) to infuse subtle glue, expanding stereo side information while keeping lead vocals and bass rock-solid in the center.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-modern text-white text-base font-semibold mb-2">
              4. DSP Streaming Calibration Report
            </h3>
            <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
              Every deliverable includes a diagnostic measurement generated with my proprietary <strong>CTRL Analyzer</strong> engine: integrated LUFS, short-term dynamic range, and phase correlation verification so you know exactly how it will perform on DSPs.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. WHAT YOU RECEIVE (DELIVERABLES)                        */}
      {/* ========================================================= */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-[#09090e] border border-white/10 rounded-3xl p-6 sm:p-10">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono tracking-widest text-[#E0AAFF] uppercase block mb-1">
              STUDIO DELIVERY SPECIFICATIONS
            </span>
            <h2 className="font-modern text-2xl sm:text-3xl text-white font-bold">
              What You Receive In Your Delivery
            </h2>
            <p className="font-mono text-xs text-white/50 max-w-md mx-auto mt-1">
              Every master is calibrated strictly to international broadcast and streaming loudness requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                24-bit Lossless Master WAV
              </span>
              <p className="text-[11px] font-mono text-white/50 leading-relaxed">
                Full-resolution 24-bit 48kHz WAV master calibrated for Spotify, Apple Music, Tidal and Amazon Music streaming engines.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                16-bit Club & CD Master WAV
              </span>
              <p className="text-[11px] font-mono text-white/50 leading-relaxed">
                16-bit 44.1kHz with optimized TPDF dither for DJ sets, SoundCloud uploads, and physical CD pressing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                320 kbps Crisp MP3
              </span>
              <p className="text-[11px] font-mono text-white/50 leading-relaxed">
                Lightweight promotional audio tagged with ID3 metadata for playlist curators, emails, and sync pitches.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                DSP Diagnostic Sheet
              </span>
              <p className="text-[11px] font-mono text-white/50 leading-relaxed">
                Technical inspection report confirming True Peak (-1.0 dBTP), Integrated LUFS metrics, and stereo correlation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-[#9D4EDD]/30 flex flex-col gap-2 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#E0AAFF] shrink-0" />
                  1 Free Revision Pass (7 Days)
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#E0AAFF] bg-[#9D4EDD]/20 px-2 py-0.5 rounded border border-[#9D4EDD]/30">
                  Fair Policy
                </span>
              </div>
              <p className="text-[11px] font-mono text-white/60 leading-relaxed">
                Total peace of mind: valid within 7 days of delivery for minor tonal or loudness tweaks on your original submitted mix (e.g. slight treble air or bass punch).
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. SIMPLE 3-STEP PROCESS                                  */}
      {/* ========================================================= */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div className="mb-10">
          <span className="text-[10px] font-mono tracking-widest text-[#9D4EDD] uppercase block mb-1">
            HOW IT WORKS
          </span>
          <h2 className="font-modern text-2xl sm:text-3xl text-white font-bold">
            From Raw Mix to Release in 3 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative">
            <span className="font-modern text-3xl font-extrabold text-[#9D4EDD]/40 block mb-2">01</span>
            <h3 className="font-modern text-white text-base font-semibold mb-1">Instant Checkout</h3>
            <p className="font-mono text-xs text-white/60 leading-relaxed">
              Order securely via Payhip (or DM on Instagram) and submit your 24-bit unmastered mix (-6 dB to -3 dB headroom).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative">
            <span className="font-modern text-3xl font-extrabold text-[#ec4899]/40 block mb-2">02</span>
            <h3 className="font-modern text-white text-base font-semibold mb-1">Studio Treatment</h3>
            <p className="font-mono text-xs text-white/60 leading-relaxed">
              I dial in True Peak limits, sub punch, stereo analog warmth, and streaming calibration within 48 hours.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative">
            <span className="font-modern text-3xl font-extrabold text-blue-400/40 block mb-2">03</span>
            <h3 className="font-modern text-white text-base font-semibold mb-1">Download & Release</h3>
            <p className="font-mono text-xs text-white/60 leading-relaxed">
              You receive your high-res WAV masters, MP3s, and diagnostic sheet. 1 free revision pass included within 7 days.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. INSTANT PAYHIP CHECKOUT                                 */}
      {/* ========================================================= */}
      <section id="checkout" className="py-16 px-4 sm:px-6 max-w-3xl mx-auto scroll-mt-20 relative">
        <div id="book" className="absolute -top-24 left-0"></div>
        <div className="bg-gradient-to-b from-[#130d24] via-[#090912] to-[#050508] border-2 border-[#9D4EDD]/60 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl shadow-black/80 promo-glow">
          
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#9D4EDD]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ec4899]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            
            <span className="text-[10px] font-mono tracking-widest text-[#E0AAFF] uppercase bg-[#9D4EDD]/20 px-3.5 py-1 rounded-full border border-[#9D4EDD]/40 inline-flex items-center gap-1.5 mb-4 shadow">
              <Sparkles className="w-3 h-3 text-[#ec4899]" />
              INSTANT CHECKOUT • WEEK MASTERING SPECIAL
            </span>

            <h2 className="font-modern text-3xl sm:text-4xl text-white font-extrabold tracking-tight uppercase mb-3">
              Get Your Master for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E0AAFF] to-[#ec4899]">$45 USD</span>
            </h2>

            <p className="font-mono text-xs sm:text-sm text-white/70 max-w-lg mb-8 leading-relaxed">
              Complete your order securely through Payhip using PayPal or any credit/debit card. You'll receive instant file upload instructions and delivery within 48 hours.
            </p>

            {/* Quick Deal Summary Box */}
            <div className="w-full max-w-md bg-black/50 border border-white/10 rounded-2xl p-5 mb-8 flex flex-col gap-3 text-left font-mono text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white font-semibold">1 Track Master (Commercial DSP)</span>
                <div className="flex items-center gap-2">
                  <span className="text-white/40 line-through text-[11px]">$70</span>
                  <span className="text-emerald-400 font-bold font-modern text-lg">$45</span>
                </div>
              </div>
              <div className="space-y-2 text-[11px] text-white/70">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>24-bit Lossless + 16-bit Club WAV + 320k MP3 + Diagnostic Sheet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>48-Hour delivery & 1 free revision pass (7-day window)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full analog saturation & True Peak (-1.0 dBTP) calibration</span>
                </div>
              </div>
            </div>

            {/* Primary Payhip CTA Button */}
            <a
              href="https://payhip.com/b/VpQRd"
              target="_blank"
              rel="noreferrer"
              className="w-full max-w-md py-4 px-8 rounded-2xl bg-gradient-to-r from-[#9D4EDD] via-[#b5179e] to-[#ec4899] text-white font-mono text-sm sm:text-base uppercase tracking-wider font-extrabold shadow-xl shadow-[#9D4EDD]/40 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2.5 group"
            >
              <span>Instant Checkout on Payhip ($45)</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Trust elements */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-[10px] font-mono text-white/50">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Secure Checkout by Payhip
              </span>
              <span>•</span>
              <span>PayPal, Cards & Apple Pay</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E0AAFF]" />
                48h Delivery Guaranteed
              </span>
            </div>

            {/* Secondary Contact Row */}
            <div className="mt-8 pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/60">
              <span>Need an EP bundle, stem mix, or have questions?</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://ig.me/m/napbak.studio"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#E0AAFF] hover:text-white flex items-center gap-1 hover:underline font-semibold"
                >
                  DM @napbak.studio ↗
                </a>
                <span>•</span>
                <a
                  href="mailto:napbak.studio@gmail.com?subject=Week%20Mastering%20Promo%20Inquiry"
                  className="text-white/80 hover:text-white hover:underline"
                >
                  napbak.studio@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. FAQ SECTION                                           */}
      {/* ========================================================= */}
      <section className="py-12 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono tracking-widest text-[#9D4EDD] uppercase block mb-1">
            FAQ
          </span>
          <h2 className="font-modern text-2xl text-white font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 font-mono text-xs">
          
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="font-modern text-white text-sm font-semibold mb-1">
              How should I export my mix before sending?
            </h3>
            <p className="text-white/60 leading-relaxed">
              Export in 24-bit WAV or AIFF at your project's native sample rate (44.1kHz or 48kHz). Make sure to turn off limiters or heavy clippers on your master bus, leaving around -6 dB to -3 dB of peak headroom.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="font-modern text-white text-sm font-semibold mb-1">
              What is the turnaround time?
            </h3>
            <p className="text-white/60 leading-relaxed">
              Standard turnaround for the Week Promo is 48 hours. If you need urgent delivery within 24 hours, send me a DM on Instagram (@napbak.studio) or email.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="font-modern text-white text-sm font-semibold mb-1">
              What is your revision policy?
            </h3>
            <p className="text-white/60 leading-relaxed">
              Every master includes 1 free revision round valid within 7 days of delivery for minor tonal or loudness tweaks on your original submitted mix (e.g. slight treble air, sub balance). To protect studio focus and keep this promo rate fair, revisions do not cover submitting completely new mix files from your DAW.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="font-modern text-white text-sm font-semibold mb-1">
              What genres do you specialize in?
            </h3>
            <p className="text-white/60 leading-relaxed">
              I specialize in dark synth, synthwave, cyberpunk, alt-electronic, pop, indie rock, and cinematic bass. However, the mechanical DSP rules of True Peak and dynamic punch translate to any genre.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="font-modern text-white text-sm font-semibold mb-1">
              What payment methods do you accept?
            </h3>
            <p className="text-white/60 leading-relaxed">
              Instant checkout on Payhip accepts all major Credit/Debit Cards, Apple Pay, Google Pay, and PayPal. For custom project inquiries, contact me directly via Instagram DM (@napbak.studio) or email.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. FOOTER                                                */}
      {/* ========================================================= */}
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
          <span>•</span>
          <a href="mailto:napbak.studio@gmail.com" className="hover:text-white transition-colors">
            Email
          </a>
        </div>

        <p className="text-[9px] tracking-widest text-white/30 font-mono">
          © {new Date().getFullYear()} NAPBAK. DARK SYNTH PRODUCTION & AUDIO ENGINEERING. ALL RIGHTS RESERVED.
        </p>
      </footer>

    </div>
  );
}

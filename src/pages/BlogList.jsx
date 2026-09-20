import React, { useState, useEffect } from 'react';
import { POSTS } from '../content/posts.js';
import { ArrowLeft, Clock, Tag, ArrowUpRight, Sparkles, Sliders, Volume2 } from 'lucide-react';
import { subscribeSoundscape, toggleSoundscapePlayback, getStatus } from '../utils/soundscapeManager.js';

export default function BlogList({ onNavigate }) {
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [soundscape, setSoundscape] = useState(getStatus());

  useEffect(() => {
    document.body.classList.remove('cursor-stolen');
    const unsubscribe = subscribeSoundscape((status) => {
      setSoundscape(status);
    });
    return unsubscribe;
  }, []);

  const allTags = ['ALL', ...Array.from(new Set(POSTS.flatMap(p => p.tags)))];

  const filteredPosts = selectedTag === 'ALL' 
    ? POSTS 
    : POSTS.filter(p => p.tags.includes(selectedTag));

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // --- SEO dinámico para /blog ---
  useEffect(() => {
    const prev = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    };
    document.title = 'Blog Técnico de Mastering y Audio | Napbak Studio';
    const setM = (n, v, a = 'name') => {
      let el = document.querySelector(`meta[${a}="${n}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(a, n); document.head.appendChild(el); }
      el.setAttribute('content', v);
    };
    const setC = (h) => {
      let el = document.querySelector('link[rel="canonical"]');
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', 'canonical'); document.head.appendChild(el); }
      el.setAttribute('href', h);
    };
    setM('description', 'Artículos técnicos sobre mastering, LUFS, True Peak, DSP y herramientas de audio para productores profesionales. Sin humo, solo mecánica.');
    setC('https://napbak.studio/blog');
    setM('og:type', 'website', 'property');
    setM('og:url', 'https://napbak.studio/blog', 'property');
    setM('og:title', 'Blog Técnico de Mastering y Audio | Napbak Studio', 'property');
    setM('og:description', 'Artículos técnicos sobre mastering, LUFS, True Peak, DSP y herramientas de audio para productores profesionales.', 'property');
    return () => {
      document.title = prev.title || 'Napbak | Creative Developer & Music Producer';
      setM('description', prev.desc || 'Interactive audio portfolio of Napbak.');
      setC('https://napbak.studio/');
      setM('og:type', 'website', 'property');
      setM('og:url', 'https://napbak.studio/', 'property');
      setM('og:title', 'Napbak | Creative Developer & Music Producer', 'property');
      setM('og:description', 'I build immersive sonic landscapes where technology meets raw emotion.', 'property');
    };
  }, []);

  return (
    <div className="bg-[#050505] text-[#9ca3af] font-mono min-h-screen selection:bg-[#9D4EDD] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@100;400;700&family=Outfit:wght@100;300;400;700&display=swap');
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-modern { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
      `}</style>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 px-6 md:px-12 py-6 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
        <div className="flex flex-col">
          <a 
            href="/" 
            onClick={(e) => handleLinkClick(e, '/')} 
            className="font-modern text-2xl text-white font-light tracking-tighter lowercase flex items-baseline hover:opacity-80 transition-opacity"
          >
            napbak<span className="font-serif italic text-white px-[1px]">.</span><span className="font-serif italic text-white/70">studio</span>
            <span className="animate-pulse text-[#9D4EDD] ml-1">_</span>
          </a>
          <span className="text-[8px] tracking-[0.4em] text-[#6b7280] uppercase mt-0.5">TECHNICAL JOURNAL</span>
        </div>

        <div className="flex items-center gap-3">
          {soundscape.isSessionStarted && (
            <button
              onClick={toggleSoundscapePlayback}
              className={`text-[10px] tracking-widest uppercase px-3.5 py-2 rounded-full border flex items-center gap-2 transition-all ${
                soundscape.isPlaying
                  ? 'border-[#1DB954]/50 bg-[#1DB954]/10 text-[#1DB954] hover:bg-[#1DB954]/20 shadow-[0_0_12px_rgba(29,185,84,0.3)]'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30'
              }`}
              title={soundscape.isPlaying ? "Pausar música ambiental" : "Reanudar música ambiental"}
            >
              {soundscape.isPlaying ? (
                <>
                  <span className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-[#1DB954] animate-pulse"></span>
                    <span className="w-0.5 h-3 bg-[#1DB954] animate-pulse delay-75"></span>
                    <span className="w-0.5 h-1.5 bg-[#1DB954] animate-pulse delay-150"></span>
                  </span>
                  <span className="hidden sm:inline font-mono">Pausar Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-gray-400" />
                  <span className="hidden sm:inline font-mono">Reanudar Audio</span>
                </>
              )}
            </button>
          )}

          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-[10px] md:text-[11px] tracking-widest uppercase px-4 py-2 rounded-full border border-white/10 hover:border-[#9D4EDD]/60 hover:text-white transition-all flex items-center gap-2 group"
          >
            <Sliders className="w-3.5 h-3.5 text-[#9D4EDD] group-hover:rotate-45 transition-transform" />
            <span className="hidden sm:inline">Soundscape Studio</span>
            <span className="sm:hidden">Studio</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-24">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9D4EDD]/10 border border-[#9D4EDD]/30 text-[#E0AAFF] text-[10px] tracking-widest uppercase mb-4">
            <Sparkles className="w-3 h-3" />
            Voz de Estudio & DSP Engineering
          </div>

          <h1 className="font-modern text-4xl sm:text-6xl text-white font-light tracking-tight mb-4">
            Artículos Técnicos & <span className="font-serif italic text-[#E0AAFF]">Audio Lab</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl font-light leading-relaxed">
            Sin rodeos ni frases de gurú. Principios matemáticos, estándares de loudness para plataformas de streaming, optimización de DSP y lecciones reales tras 10 años en el estudio.
          </p>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2 mt-8">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-[10px] tracking-widest uppercase px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-[#9D4EDD] text-white border-[#9D4EDD] shadow-[0_0_15px_rgba(157,78,221,0.4)]'
                    : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map(post => (
            <article
              key={post.slug}
              onClick={(e) => handleLinkClick(e, `/blog/${post.slug}`)}
              className="group cursor-pointer flex flex-col justify-between rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-[#9D4EDD]/50 transition-all duration-500 p-6 md:p-8 relative overflow-hidden hover:shadow-[0_10px_40px_rgba(157,78,221,0.12)]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9D4EDD]/5 rounded-full blur-2xl group-hover:bg-[#9D4EDD]/15 transition-all duration-500"></div>

              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between gap-4 text-[10px] text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-[#9D4EDD]" />
                    <span>{post.readTime}</span>
                  </div>
                  <span>{post.date}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map(t => (
                    <span
                      key={t}
                      className="text-[9px] tracking-wider uppercase px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="font-modern text-xl md:text-2xl text-white font-normal tracking-tight group-hover:text-[#E0AAFF] transition-colors leading-snug mb-3">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Read Action */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/70 group-hover:text-white">
                <span className="tracking-widest uppercase text-[10px] flex items-center gap-1.5">
                  Leer Artículo
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#9D4EDD] flex items-center justify-center transition-colors text-white">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTRL Analyzer Banner */}
        <section className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#12081f] to-[#0a0a0a] border border-[#9D4EDD]/30 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] tracking-widest text-[#9D4EDD] uppercase font-bold block mb-2">
                HERRAMIENTA RECOMENDADA
              </span>
              <h3 className="font-modern text-2xl md:text-3xl text-white font-light mb-3">
                ¿Quieres comprobar el True Peak de tus mezclas?
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                Utiliza **CTRL**, nuestro analizador de audio profesional en tiempo real para detectar clipping inter-muestra, desbalance de fase y penalización de LUFS antes de enviar tu master.
              </p>
            </div>
            <a
              href="https://ctrl.napbak.studio"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#9D4EDD] hover:bg-[#b05eed] text-white text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(157,78,221,0.4)] whitespace-nowrap"
            >
              Probar CTRL Analyzer
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-[10px] text-gray-600">
        napbak.studio &copy; {new Date().getFullYear()} — Audio Engineering & Software Development
      </footer>
    </div>
  );
}

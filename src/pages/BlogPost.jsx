import React, { useState } from 'react';
import { POSTS } from '../content/posts.js';
import { ArrowLeft, Clock, Tag, Share2, Check, Sparkles, Sliders, ExternalLink } from 'lucide-react';

export default function BlogPost({ slug, onNavigate }) {
  const [copied, setCopied] = useState(false);
  const post = POSTS.find(p => p.slug === slug);

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) {
    return (
      <div className="bg-[#050505] text-[#9ca3af] font-mono min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-modern text-4xl text-white mb-4">Artículo no encontrado</h1>
        <p className="text-sm text-gray-400 mb-8 max-w-md">
          El artículo que buscas no existe o ha sido movido.
        </p>
        <button
          onClick={(e) => handleLinkClick(e, '/blog')}
          className="px-6 py-3 rounded-full bg-[#9D4EDD] text-white text-xs uppercase tracking-widest hover:bg-[#b05eed] transition-all"
        >
          Volver al Blog
        </button>
      </div>
    );
  }

  const renderFormattedText = (text) => {
    // Parser simple y seguro para negritas **texto**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="bg-[#050505] text-[#9ca3af] font-mono min-h-screen selection:bg-[#9D4EDD] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@100;400;700&family=Outfit:wght@100;300;400;700&display=swap');
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-modern { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
      `}</style>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 px-6 md:px-12 py-5 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => handleLinkClick(e, '/blog')}
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Todos los Artículos</span>
            <span className="sm:hidden">Blog</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-gray-300 flex items-center gap-1.5 transition-all"
            title="Copiar enlace"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado' : 'Compartir'}</span>
          </button>

          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-[10px] tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-[#9D4EDD]/40 text-[#E0AAFF] hover:bg-[#9D4EDD]/20 transition-all flex items-center gap-1.5"
          >
            <Sliders className="w-3 h-3 text-[#9D4EDD]" />
            <span className="hidden sm:inline">Soundscape Studio</span>
          </a>
        </div>
      </header>

      {/* Article Content Container */}
      <article className="max-w-3xl mx-auto px-6 md:px-8 pt-12 pb-24">
        {/* Breadcrumb & Meta */}
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500 mb-6">
          <div className="flex items-center gap-1.5 text-[#9D4EDD]">
            <Clock className="w-3 h-3" />
            <span>{post.readTime}</span>
          </div>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>Por {post.author}</span>
        </div>

        {/* Title */}
        <h1 className="font-modern text-3xl sm:text-5xl text-white font-light tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed mb-8 border-l-2 border-[#9D4EDD] pl-4 italic font-serif">
            {post.subtitle}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pb-8 mb-10 border-b border-white/5">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-[9px] tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Body Blocks */}
        <div className="space-y-6 text-sm sm:text-base text-gray-300 font-light leading-relaxed">
          {post.content.map((block, idx) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={idx} className="leading-relaxed">
                    {renderFormattedText(block.text)}
                  </p>
                );

              case 'heading':
                return (
                  <h2 key={idx} className="font-modern text-xl sm:text-2xl text-white font-normal tracking-tight pt-6 pb-2">
                    {block.text}
                  </h2>
                );

              case 'callout':
                return (
                  <div key={idx} className="my-6 p-5 sm:p-6 rounded-xl bg-[#0f0b17] border-l-4 border-[#9D4EDD] border-t border-r border-b border-white/5 relative">
                    <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#E0AAFF] font-bold mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#9D4EDD]" />
                      {block.title}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                      {renderFormattedText(block.text)}
                    </p>
                  </div>
                );

              case 'code':
                return (
                  <div key={idx} className="my-6 rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
                    <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between text-[10px] text-gray-400">
                      <span>CONSOLE / LOG</span>
                      <span>{block.language}</span>
                    </div>
                    <pre className="p-4 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed">
                      <code>{block.code}</code>
                    </pre>
                  </div>
                );

              case 'list':
                return (
                  <ul key={idx} className="my-4 space-y-3 pl-4">
                    {block.items.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9D4EDD] mt-2 shrink-0"></span>
                        <span className="leading-relaxed">{renderFormattedText(item)}</span>
                      </li>
                    ))}
                  </ul>
                );

              case 'ctrl_cta':
                return (
                  <div key={idx} className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#170926] to-[#0d0d0d] border border-[#9D4EDD]/40 text-center flex flex-col items-center">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#9D4EDD] font-bold mb-2">
                      SOLUCIÓN MECÁNICA
                    </span>
                    <h3 className="font-modern text-xl sm:text-2xl text-white font-light mb-2">
                      {block.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 max-w-lg mb-6 leading-relaxed">
                      {block.description}
                    </p>
                    <a
                      href="https://ctrl.napbak.studio"
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-full bg-[#9D4EDD] hover:bg-[#b05eed] text-white text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(157,78,221,0.5)] flex items-center gap-2"
                    >
                      Probar Analizador CTRL
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>

        {/* Author Bio Box */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center gap-5 bg-white/[0.02] p-6 rounded-2xl border">
          <div className="relative w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#9D4EDD] via-[#a855f7] to-[#3b82f6] shadow-[0_0_25px_rgba(157,78,221,0.6)] shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#050505]">
              <img
                src="/napbak.png"
                alt="Napbak"
                className="w-full h-full object-cover scale-[1.26]"
              />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-modern text-base text-white font-normal mb-1">
              Napbak
            </h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Productor musical con más de 10 años en sesiones de estudio y desarrollador de software de audio (Web Audio API, DSP, C++, React). Creador de CTRL Analyzer.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <button
            onClick={(e) => handleLinkClick(e, '/blog')}
            className="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
          >
            ← Volver a todos los artículos
          </button>
        </div>
      </article>
    </div>
  );
}

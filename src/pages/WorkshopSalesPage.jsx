import React, { useState, useEffect } from 'react';
import { 
  Check, Clock, Users, Zap, ChevronDown, ChevronUp, 
  ExternalLink, Play, Shield, Sparkles, Volume2, Award, 
  ArrowRight, AlertCircle, Headphones, Lock, Sliders, ArrowUpRight
} from 'lucide-react';

export default function WorkshopSalesPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 22, seconds: 45 });
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const CHECKOUT_URL = "https://ctrl.napbak.studio";

  return (
    <div className="min-h-screen bg-[#050505] text-[#9ca3af] font-mono selection:bg-[#9D4EDD] selection:text-white relative overflow-hidden">
      
      {/* ── Google Fonts Injected ────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@100;300;400;600;700&family=Outfit:wght@100;300;400;500;600;700&display=swap');
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-modern { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
      `}</style>

      {/* ── Ambient Background Glows ─────────────────── */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-[#9D4EDD]/10 blur-[160px] pointer-events-none rounded-full"></div>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#3b82f6]/5 blur-[150px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#9D4EDD]/5 blur-[180px] pointer-events-none rounded-full"></div>

      {/* ── BARRA SUPERIOR DE ESTADO EN DIRECTO ──────── */}
      <div className="bg-[#08080c] border-b border-[#9D4EDD]/25 text-[#E0AAFF] text-[10px] md:text-xs tracking-widest uppercase py-2.5 px-4 sticky top-0 z-50 backdrop-blur-md flex items-center justify-center gap-3 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
        <span className="flex items-center gap-1.5 text-white font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></span>
          LIVE COHORT EN DIRECTO
        </span>
        <span className="text-white/20 hidden sm:inline">•</span>
        <span className="text-[#9ca3af] hidden sm:inline">Próximo Sábado 7:00 PM EST</span>
        <span className="text-white/20">•</span>
        <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
          Solo 30 Cupos (Auditoría Quirúrgica en Directo)
        </span>
      </div>

      {/* ── HEADER NAPBAK.STUDIO BRANDED ─────────────── */}
      <header className="border-b border-white/5 bg-[#050505]/90 backdrop-blur-md sticky top-9 z-40 px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <a href="/" className="font-modern text-2xl text-white font-light tracking-tighter lowercase flex items-baseline hover:opacity-85 transition-opacity">
            napbak<span className="font-serif italic text-white px-[1px]">.</span><span className="font-serif italic text-white/70">studio</span>
            <span className="animate-pulse text-[#9D4EDD] ml-1">_</span>
          </a>
          <span className="text-[8px] tracking-[0.4em] text-[#6b7280] uppercase mt-0.5">WORKSHOP LAB // 2026 COHORT</span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#inscribirme"
            className="px-5 py-2.5 rounded-full bg-[#9D4EDD] hover:bg-[#8338ec] text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(157,78,221,0.35)] hover:shadow-[0_0_30px_rgba(157,78,221,0.6)] hover:scale-105"
          >
            Reservar Cupo ($47)
          </a>
        </div>
      </header>

      {/* ── HERO SECTION ─────────────────────────────── */}
      <section className="relative pt-16 pb-20 px-6 md:px-12 max-w-6xl mx-auto z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Pill Badge Multi-Género */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 px-4 py-2 rounded-2xl sm:rounded-full bg-[#9D4EDD]/10 border border-[#9D4EDD]/30 text-[#E0AAFF] text-[10px] tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(157,78,221,0.2)]">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#E0AAFF]" />
              EXCLUSIVO PARA PRODUCTORES INDEPENDIENTES & INGENIEROS DE MEZCLA
            </span>
            <span className="text-[#E0AAFF]/80 text-[9px] font-mono sm:before:content-['•'] sm:before:mr-1.5">
              (Rock • Synthwave • R&B • Trap • Electrónica)
            </span>
          </div>

          {/* Main Title - Napbak Typography Duo */}
          <h1 className="font-modern text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[1.12] tracking-tight mb-6">
            Deja de adivinar por qué tus temas <br className="hidden sm:block" />
            <span className="font-serif italic text-[#E0AAFF] font-normal">pierden pegada, brillo o volumen</span> en Spotify.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#9ca3af] max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            En una sesión en vivo de <strong className="text-white font-semibold">2.5 horas</strong>, abriremos el DAW para mostrarte la arquitectura acústica real de un master competitivo: separación quirúrgica de graves, baterías que cortan la mezcla y loudness profesional sin aplastar la dinámica. <span className="text-[#E0AAFF]">Incluye licencia vitalicia de nuestra suite analítica CTRL.</span>
          </p>

          {/* HARDWARE-STYLE COUNTDOWN */}
          <div className="bg-[#0a0a0d]/90 border border-white/10 rounded-2xl p-5 max-w-md mx-auto mb-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between text-[8px] text-[#6b7280] uppercase tracking-[0.3em] mb-3 pb-2 border-b border-white/5 font-mono">
              <span>[ TIMER // ENTRADA TEMPRANA ]</span>
              <span className="text-[#E0AAFF]">PRECIO SUBE A $97</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-[#050505] p-2.5 rounded-xl border border-white/5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white">{timeLeft.days}</span>
                <span className="block text-[9px] text-[#6b7280] tracking-widest uppercase mt-0.5">Días</span>
              </div>
              <div className="bg-[#050505] p-2.5 rounded-xl border border-white/5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="block text-[9px] text-[#6b7280] tracking-widest uppercase mt-0.5">Horas</span>
              </div>
              <div className="bg-[#050505] p-2.5 rounded-xl border border-white/5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#E0AAFF]">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="block text-[9px] text-[#6b7280] tracking-widest uppercase mt-0.5">Min</span>
              </div>
              <div className="bg-[#050505] p-2.5 rounded-xl border border-white/5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#9D4EDD]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="block text-[9px] text-[#6b7280] tracking-widest uppercase mt-0.5">Seg</span>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION BUTTON */}
          <div className="max-w-md mx-auto mb-4">
            <a 
              href="#inscribirme"
              className="w-full py-4 px-8 rounded-full bg-[#9D4EDD] hover:bg-[#8338ec] text-white font-bold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_0_35px_rgba(157,78,221,0.45)] hover:shadow-[0_0_55px_rgba(157,78,221,0.75)] hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Reservar Mi Cupo + Licencia CTRL ($47)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-[10px] text-[#6b7280] tracking-wider uppercase font-mono mt-3">
              Acceso inmediato al software + Grabación 4K vitalicia + Garantía de 7 días
            </p>
          </div>

          {/* Social Proof & Guarantee Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] tracking-widest uppercase text-[#9ca3af] mt-6">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#1DB954]" /> Garantía 7 Días</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#E0AAFF]" /> 18/30 Cupos Confirmados</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#9D4EDD]" /> Sesión + Grabación 4K</span>
          </div>

        </div>
      </section>

      {/* ── THE PAIN: POR QUÉ NO FUNCIONAN LOS PREGRABADOS ─ */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-[#060608]/80 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-14">
            <span className="text-[10px] tracking-[0.4em] text-[#9D4EDD] uppercase">01 // LA REALIDAD DE LA INDUSTRIA</span>
            <h2 className="font-modern text-3xl sm:text-5xl font-light text-white mt-2">
              ¿Por qué los cursos de 40 horas en Google Drive <br />
              <span className="font-serif italic text-white/70">se quedan juntando polvo digital</span>?
            </h2>
            <p className="text-xs sm:text-sm text-[#9ca3af] max-w-xl mx-auto mt-4 font-light leading-relaxed">
              En 2026 nadie tiene tiempo para devorarse 15 horas de teoría confusa. Cuando estás en el estudio necesitas soluciones mecánicas, directas y con oídos entrenados revisando tu trabajo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#9D4EDD]/30 transition-all duration-300 group">
              <div className="text-[10px] tracking-widest text-[#E0AAFF] font-mono mb-2">01 // MUD & MÁSCARA FRECUENCIAL</div>
              <h3 className="font-modern text-lg text-white font-medium mb-3">El bajo se traga al bombo y los sintes ensucian la voz</h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                El bajo se traga el bombo, las guitarras ahogan a la voz y los sintes ensucian el campo estéreo. Intentas empujar el limitador para que suene "grande", pero el compresor frena todo y el track pierde vida.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#9D4EDD]/30 transition-all duration-300 group">
              <div className="text-[10px] tracking-widest text-[#E0AAFF] font-mono mb-2">02 // STREAMING PENALTY</div>
              <h3 className="font-modern text-lg text-white font-medium mb-3">El castigo del algoritmo de Spotify</h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                Crees que apretar a -7 LUFS te hará sonar comercial. Spotify detecta el exceso de energía acumulada, activa la normalización algorítmica y baja tu canción un 30% más que las referencias profesionales.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#9D4EDD]/30 transition-all duration-300 group">
              <div className="text-[10px] tracking-widest text-[#E0AAFF] font-mono mb-2">03 // FALTA DE CRITERIO OBJETIVO</div>
              <h3 className="font-modern text-lg text-white font-medium mb-3">Falta de criterio analítico objetivo</h3>
              <p className="text-xs text-[#9ca3af] leading-relaxed font-light">
                Muchos tutoriales te recomiendan cadenas de plugins analógicos caros, pero nadie te enseña a leer qué está pasando matemáticamente con tus transientes en tu propia sala.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── AGENDA EN DIRECTO (2.5 HORAS PRÁCTICAS) ─── */}
      <section className="py-24 px-6 md:px-12 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] text-[#9D4EDD] uppercase">02 // ESTRUCTURA DE LA SESIÓN</span>
            <h2 className="font-modern text-3xl sm:text-5xl font-light text-white mt-2">
              Lo que vamos a desarmar juntos <br />
              <span className="font-serif italic text-[#E0AAFF]">en 2.5 horas paso a paso</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9ca3af] mt-3 font-light">
              Sin relleno. Abrimos el DAW, tomamos un track crudo con múltiples capas e instrumentos y lo llevamos a estándar comercial.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Bloque 01 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#9D4EDD]/40 transition-colors flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#9D4EDD]/10 border border-[#9D4EDD]/30 text-[#E0AAFF] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                01
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] tracking-widest uppercase text-[#9D4EDD] font-mono">00:00 — 00:45</span>
                  <span className="text-[8px] tracking-widest text-[#6b7280] uppercase font-mono">[ ARCHITECTURE & BALANCE ]</span>
                </div>
                <h3 className="font-modern text-lg sm:text-xl font-light text-white">Separación Quirúrgica en Graves y Transientes</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] mt-2 font-light leading-relaxed">
                  Cómo tallar espacio entre bombos (acústicos o sintéticos), líneas de bajo y subgraves. Gestión de fase, sidechain dinámico por bandas y cómo hacer que cajas, claps y guitarras corten la mezcla con definición y pegada limpia.
                </p>
              </div>
            </div>

            {/* Bloque 02 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#9D4EDD]/40 transition-colors flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#9D4EDD]/10 border border-[#9D4EDD]/30 text-[#E0AAFF] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                02
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] tracking-widest uppercase text-[#9D4EDD] font-mono">00:45 — 01:30</span>
                  <span className="text-[8px] tracking-widest text-[#6b7280] uppercase font-mono">[ STREAMING DSP ]</span>
                </div>
                <h3 className="font-modern text-lg sm:text-xl font-light text-white">Mastering Analítico con CTRL: El Secreto de los LUFS</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] mt-2 font-light leading-relaxed">
                  Aprenderás a interpretar LUFS Integrado, Short-Term y True Peak (dBTP) con 4x oversampling sin confusiones matemáticas. Sabrás exactamente cuándo detenerte para que tu track suene alto pero dinámico.
                </p>
              </div>
            </div>

            {/* Bloque 03 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#9D4EDD]/40 transition-colors flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#9D4EDD]/10 border border-[#9D4EDD]/30 text-[#E0AAFF] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                03
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] tracking-widest uppercase text-[#9D4EDD] font-mono">01:30 — 02:30</span>
                  <span className="text-[8px] tracking-widest text-[#6b7280] uppercase font-mono">[ CLINIC DE DIAGNÓSTICO EN VIVO ]</span>
                </div>
                <h3 className="font-modern text-lg sm:text-xl font-light text-white">Auditoría Quirúrgica de Pistas en Tiempo Real</h3>
                <p className="text-xs sm:text-sm text-[#9ca3af] mt-2 font-light leading-relaxed">
                  Subirás tu pista a nuestro enlace privado. Seleccionaremos proyectos en pantalla compartida y pasaremos los tracks por CTRL en directo. Verás con tus propios ojos y oídos la diferencia entre ecualizar a ciegas y ajustar milimétricamente el espacio dinámico. Te llevarás las notas exactas para corregir tu mezcla esa misma noche.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── EL BUNDLE COMPLETO (THE STACK $47) ───────── */}
      <section id="inscribirme" className="py-24 px-6 md:px-12 border-t border-white/5 bg-[#060608]/90 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.4em] text-[#9D4EDD] uppercase">03 // OFERTA ESPECIAL</span>
            <h2 className="font-modern text-3xl sm:text-5xl font-light text-white mt-2">
              Todo lo que recibes <span className="font-serif italic text-[#E0AAFF]">hoy por $47 USD</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9ca3af] mt-2 font-light">
              Pago único. Sin suscripciones recurrentes ni costes ocultos.
            </p>
          </div>

          {/* Hardware Container Style */}
          <div className="bg-[#08080c] border border-white/10 hover:border-[#9D4EDD]/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative transition-all duration-500">
            
            {/* Top Tag */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-white font-bold">[ FULL ACCESS COHORT ]</span>
              </div>
              <span className="text-[10px] tracking-widest text-[#E0AAFF] font-mono">EDICIÓN 2026</span>
            </div>

            {/* Stack Items */}
            <div className="space-y-4 mb-8">
              
              <div className="flex items-start gap-3.5 pb-3 border-b border-white/[0.03]">
                <div className="w-5 h-5 rounded-full bg-[#9D4EDD]/20 text-[#E0AAFF] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <p className="font-modern text-white text-sm sm:text-base font-normal">Sesión Interactiva Masterclass en Vivo (2.5 Horas)</p>
                  <p className="text-xs text-[#6b7280] font-light mt-0.5">Arquitectura acústica, apertura de DAW y resolución directa de dudas.</p>
                </div>
                <span className="text-xs font-mono text-[#6b7280] line-through">$97</span>
              </div>

              {/* CTRL Spotlight Item - The Trojan Horse */}
              <div className="flex items-start gap-3.5 pb-3 border-b border-[#9D4EDD]/30 bg-[#9D4EDD]/10 -mx-4 px-4 py-3 rounded-2xl border border-[#9D4EDD]/20 shadow-[0_0_20px_rgba(157,78,221,0.15)]">
                <div className="w-5 h-5 rounded-full bg-[#9D4EDD] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(157,78,221,0.7)]">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-modern text-white text-sm sm:text-base font-medium">Licencia Vitalicia: Suite Analítica DSP "CTRL"</p>
                    <span className="text-[8px] bg-[#9D4EDD] text-white font-mono px-2 py-0.5 rounded uppercase font-bold tracking-wider">ACTIVO EXCLUSIVO</span>
                  </div>
                  <p className="text-xs text-[#E0AAFF]/80 font-light mt-1 leading-relaxed">
                    Software propietario desarrollado para calcular EBU R128, True Peak con 4x oversampling y simulación de penalización algorítmica. Olvídate de depender de plugins de $300.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#E0AAFF] line-through">$120</span>
              </div>

              <div className="flex items-start gap-3.5 pb-3 border-b border-white/[0.03]">
                <div className="w-5 h-5 rounded-full bg-[#9D4EDD]/20 text-[#E0AAFF] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <p className="font-modern text-white text-sm sm:text-base font-normal">Grabación Maestra 4K con Acceso Ilimitado</p>
                  <p className="text-xs text-[#6b7280] font-light mt-0.5">Acceso permanente alojado en tu área privada para repasar cada detalle siempre.</p>
                </div>
                <span className="text-xs font-mono text-[#6b7280] line-through">$49</span>
              </div>

              <div className="flex items-start gap-3.5 pb-3 border-b border-white/[0.03]">
                <div className="w-5 h-5 rounded-full bg-[#9D4EDD]/20 text-[#E0AAFF] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <p className="font-modern text-white text-sm sm:text-base font-normal">Cheat Sheet PDF: Arquitectura de Frecuencias y Sidechain Quirúrgico</p>
                  <p className="text-xs text-[#6b7280] font-light mt-0.5">Mapa de bolsillo para limpiar resonancias de guitarras, sintes, 808s y abrir espacio espectral en segundos.</p>
                </div>
                <span className="text-xs font-mono text-[#6b7280] line-through">$27</span>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-[#9D4EDD]/20 text-[#E0AAFF] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <p className="font-modern text-white text-sm sm:text-base font-normal">Acceso a la Comunidad Privada de Productores</p>
                  <p className="text-xs text-[#6b7280] font-light mt-0.5">Networking, intercambio de stems, feedback continuo y colaboraciones.</p>
                </div>
                <span className="text-xs font-mono text-[#6b7280] line-through">$37</span>
              </div>

            </div>

            {/* Price Calculation Box */}
            <div className="pt-6 border-t border-white/10 text-center">
              <p className="text-[10px] text-[#6b7280] uppercase tracking-[0.3em] font-mono mb-1">
                VALOR REAL INTEGRADO: <span className="line-through text-white/40">$330 USD</span>
              </p>
              
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl sm:text-6xl font-light font-modern text-white tracking-tight">$47</span>
                <span className="text-[#E0AAFF] text-sm font-mono tracking-widest">USD</span>
              </div>

              <p className="text-[11px] text-amber-400 font-mono tracking-wider mb-6">
                ⚡ Precio especial de prelanzamiento para los primeros 30 registros
              </p>

              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full block py-4 px-8 rounded-full bg-[#9D4EDD] hover:bg-[#8338ec] text-white font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_0_35px_rgba(157,78,221,0.45)] hover:shadow-[0_0_55px_rgba(157,78,221,0.75)] hover:scale-[1.01]"
              >
                Asegurar Mi Cupo + Licencia CTRL ($47 USD)
              </a>

              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-[#6b7280] font-mono uppercase tracking-widest">
                <span className="flex items-center gap-1 text-[#1DB954]"><Lock className="w-3 h-3" /> Transacción Segura SSL</span>
                <span>•</span>
                <span>Licencia Vitalicia Inmediata</span>
              </div>
            </div>

          </div>

          {/* 100% Risk Free Guarantee */}
          <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1DB954]/10 text-[#1DB954] flex items-center justify-center shrink-0 border border-[#1DB954]/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-modern text-sm sm:text-base font-medium text-white">Garantía Incondicional de 7 Días</h4>
              <p className="text-xs text-[#9ca3af] font-light mt-1 leading-relaxed">
                Asiste a la primera hora del workshop en vivo. Si sientes que no aprendiste nada que transforme la claridad y el volumen de tus pistas, solo escríbenos un email y te devolvemos el 100% de tus $47 sin preguntas ni letra chica. Te quedas con la guía de frecuencias.
              </p>
            </div>
          </div>

          {/* THE HIGH-TICKET SEED // LA SEMILLA INVISIBLE */}
          <div className="mt-8 p-8 rounded-3xl bg-gradient-to-b from-[#9D4EDD]/10 to-transparent border border-[#9D4EDD]/30 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#9D4EDD]/15 blur-3xl pointer-events-none rounded-full"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[#9D4EDD]/20 border border-[#9D4EDD]/40 text-[#E0AAFF] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(157,78,221,0.3)]">
                <Sparkles className="w-6 h-6 text-[#E0AAFF]" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] tracking-[0.35em] text-[#E0AAFF] uppercase font-mono font-semibold">
                  [ CRITERIO PROFESIONAL // THE NEXT LEVEL ]
                </span>
                <p className="font-serif italic text-xl sm:text-2xl text-white font-normal leading-snug">
                  "Aprender a medir te da el control para no arruinar tus temas. Pero entender la acústica avanzada es lo que te permite cobrar como profesional."
                </p>
                <p className="text-xs text-[#9ca3af] font-light leading-relaxed">
                  La suite <strong className="text-white font-medium">CTRL</strong> automatiza la precisión técnica y algorítmica para que nunca más dudes en Spotify. En esta masterclass te enseñamos el criterio analítico de estudio para ejecutar como un ingeniero de primer nivel.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ INTERACTIVA ──────────────────────────── */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 relative z-10">
        <div className="max-w-2xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.4em] text-[#9D4EDD] uppercase">04 // DESPEJANDO DUDAS</span>
            <h2 className="font-modern text-2xl sm:text-4xl font-light text-white mt-1">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-3 font-mono">
            {[
              {
                q: "¿Qué pasa si no puedo asistir en vivo a esa hora?",
                a: "No te quedas por fuera. Todo el evento se graba en resolución 4K y se carga en tu cuenta en menos de 24 horas con acceso de por vida."
              },
              {
                q: "¿Funciona si uso FL Studio, Ableton Live o Logic Pro?",
                a: "Totalmente. Los principios psicoacústicos, el balance tonal, la gestión de fase y el medidor de LUFS son universales y aplican idéntico en cualquier DAW."
              },
              {
                q: "¿Cómo accedo a la suite CTRL?",
                a: "Inmediatamente después de confirmar tu cupo recibirás un email con tu enlace y credenciales para usar CTRL desde hoy mismo."
              },
              {
                q: "¿Necesito tener plugins caros de terceros?",
                a: "No. Aprenderás a dominar la mezcla usando los plugins nativos (stock) de tu DAW combinados con las herramientas de medición analítica de CTRL."
              },
              {
                q: "¿Cómo funcionará la auditoría de pistas durante el clinic en directo?",
                a: "Durante el Clinic de Diagnóstico habilitaremos un enlace privado para subir tus tracks o stems .wav. Seleccionaremos casos representativos en pantalla compartida y los pasaremos por CTRL en tiempo real para diagnosticar y resolver problemas de fase, dinámica y frecuencias, extrayendo las notas exactas para que todos los asistentes puedan aplicarlas en sus propias mezclas esa misma noche."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden transition-colors hover:border-white/15"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-5 text-left text-xs sm:text-sm text-white flex items-center justify-between hover:text-[#E0AAFF] transition-colors"
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#9D4EDD] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#6b7280] shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-[#9ca3af] font-light leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ESTILO NAPBAK ─────────────────────── */}
      <footer className="border-t border-white/5 py-12 px-6 md:px-12 text-center text-[10px] text-[#6b7280] font-mono tracking-widest relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-modern text-sm text-white font-light">napbak<span className="font-serif italic text-white/70">.studio</span></span>
            <span>© 2026 // ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-white transition-colors">ESTUDIO</a>
            <a href="/blog" className="hover:text-white transition-colors">BLOG</a>
            <a href="https://ctrl.napbak.studio" target="_blank" rel="noreferrer" className="text-[#E0AAFF] hover:text-white transition-colors">CTRL APP ↗</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

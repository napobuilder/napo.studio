import React, { useState, useEffect } from 'react';
import { 
  Check, Clock, Users, Zap, ChevronDown, ChevronUp, 
  ExternalLink, Play, Shield, Sparkles, Volume2, Award, 
  ArrowRight, AlertCircle, Headphones, Lock, Sliders, ArrowUpRight,
  Copy, CheckCheck, QrCode, CreditCard, Send, CheckCircle2, Wallet, Smartphone
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

  // ── Configuración de Pagos ──
  const GUMROAD_URL = "https://napoacademy.gumroad.com/l/workshop"; // Enlace oficial de Gumroad
  const PAYPAL_ME_URL = "https://www.paypal.com/paypalme/norkafarina/47";
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/moevjjpq";

  const [paymentTab, setPaymentTab] = useState('gumroad'); // 'gumroad' | 'pagomovil' | 'binance' | 'paypal'
  const [copiedKey, setCopiedKey] = useState(null);
  
  // Estado del formulario manual
  const [reportForm, setReportForm] = useState({
    name: '',
    email: '',
    reference: '',
    notes: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const copyToClipboard = (text, keyName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(keyName);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportForm.name.trim() || !reportForm.email.trim() || !reportForm.reference.trim()) {
      setErrorMessage('Por favor completa tu nombre, correo y número de referencia.');
      return;
    }

    setFormStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[WORKSHOP 2026] Reporte de Pago - ${reportForm.name} (${paymentTab.toUpperCase()})`,
          tipo_de_pago: paymentTab === 'pagomovil' ? 'Pago Móvil (Bs)' : paymentTab === 'binance' ? 'Binance Pay (USDT)' : 'PayPal Directo',
          nombre_completo: reportForm.name,
          email_acceso: reportForm.email,
          referencia_comprobante: reportForm.reference,
          notas_adicionales: reportForm.notes || 'Sin notas adicionales',
          monto_equivalente: '$47 USD'
        })
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        const data = await response.json();
        setErrorMessage(data?.error || 'Hubo un inconveniente al enviar tu reporte. Intenta de nuevo.');
        setFormStatus('error');
      }
    } catch (err) {
      console.error('Error enviando formulario:', err);
      setErrorMessage('Error de conexión. Verifica tu internet e intenta nuevamente.');
      setFormStatus('error');
    }
  };

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

            {/* Price Calculation Box & Multi-Gateway Checkout */}
            <div className="pt-6 border-t border-white/10">
              <div className="text-center mb-6">
                <p className="text-[10px] text-[#6b7280] uppercase tracking-[0.3em] font-mono mb-1">
                  VALOR REAL INTEGRADO: <span className="line-through text-white/40">$330 USD</span>
                </p>
                
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl sm:text-6xl font-light font-modern text-white tracking-tight">$47</span>
                  <span className="text-[#E0AAFF] text-sm font-mono tracking-widest">USD</span>
                </div>

                <p className="text-[11px] text-amber-400 font-mono tracking-wider">
                  ⚡ Precio especial de prelanzamiento para los primeros 30 registros
                </p>
              </div>

              {/* TABS DE MÉTODOS DE PAGO */}
              <div className="mb-6">
                <p className="text-[10px] text-[#6b7280] font-mono uppercase tracking-widest text-center mb-3">
                  SELECCIONA TU FORMA DE PAGO PREFERIDA:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Gumroad Tab */}
                  <button
                    type="button"
                    onClick={() => setPaymentTab('gumroad')}
                    className={`py-3 px-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 relative ${
                      paymentTab === 'gumroad'
                        ? 'bg-[#9D4EDD]/15 border-[#9D4EDD] text-white shadow-[0_0_15px_rgba(157,78,221,0.25)]'
                        : 'bg-white/[0.02] border-white/5 text-[#9ca3af] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#E0AAFF]" />
                      <span className="text-xs font-modern font-semibold">Gumroad</span>
                    </div>
                    <span className="text-[8px] text-[#1DB954] font-mono tracking-tight uppercase font-bold">Tarjeta & PayPal</span>
                  </button>

                  {/* Pago Móvil Tab */}
                  <button
                    type="button"
                    onClick={() => setPaymentTab('pagomovil')}
                    className={`py-3 px-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentTab === 'pagomovil'
                        ? 'bg-[#9D4EDD]/15 border-[#9D4EDD] text-white shadow-[0_0_15px_rgba(157,78,221,0.25)]'
                        : 'bg-white/[0.02] border-white/5 text-[#9ca3af] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-[#38bdf8]" />
                      <span className="text-xs font-modern font-semibold">Pago Móvil</span>
                    </div>
                    <span className="text-[8px] text-[#38bdf8] font-mono tracking-tight uppercase font-bold">Bolívares (Bs)</span>
                  </button>

                  {/* Binance Tab */}
                  <button
                    type="button"
                    onClick={() => setPaymentTab('binance')}
                    className={`py-3 px-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentTab === 'binance'
                        ? 'bg-[#9D4EDD]/15 border-[#9D4EDD] text-white shadow-[0_0_15px_rgba(157,78,221,0.25)]'
                        : 'bg-white/[0.02] border-white/5 text-[#9ca3af] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Wallet className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-modern font-semibold">Binance</span>
                    </div>
                    <span className="text-[8px] text-amber-400 font-mono tracking-tight uppercase font-bold">USDT / Pay</span>
                  </button>

                  {/* PayPal Directo Tab */}
                  <button
                    type="button"
                    onClick={() => setPaymentTab('paypal')}
                    className={`py-3 px-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentTab === 'paypal'
                        ? 'bg-[#9D4EDD]/15 border-[#9D4EDD] text-white shadow-[0_0_15px_rgba(157,78,221,0.25)]'
                        : 'bg-white/[0.02] border-white/5 text-[#9ca3af] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-[#60a5fa]" />
                      <span className="text-xs font-modern font-semibold">PayPal.me</span>
                    </div>
                    <span className="text-[8px] text-[#60a5fa] font-mono tracking-tight uppercase font-bold">Saldo Directo</span>
                  </button>
                </div>
              </div>

              {/* ── CONTENIDO DEL TAB SELECCIONADO ── */}
              
              {/* TAB 1: GUMROAD (AUTOMÁTICO) */}
              {paymentTab === 'gumroad' && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center animate-fadeIn">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/25 text-[#1DB954] text-[9px] font-mono uppercase tracking-widest mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse"></span>
                    ENTREGA AUTOMÁTICA E INMEDIATA 24/7
                  </div>

                  <h3 className="font-modern text-lg sm:text-xl text-white font-light mb-2">
                    Pago Internacional con Tarjeta o PayPal
                  </h3>
                  <p className="text-xs text-[#9ca3af] font-light max-w-lg mx-auto mb-6">
                    Procesado de forma 100% segura por <strong className="text-white">Gumroad</strong>. Acepta tarjetas de crédito/débito internacionales y cuenta de PayPal. Recibirás tu acceso y licencia en segundos.
                  </p>

                  <a
                    href={GUMROAD_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full block py-4 px-8 rounded-full bg-[#9D4EDD] hover:bg-[#8338ec] text-white font-bold text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_0_35px_rgba(157,78,221,0.45)] hover:shadow-[0_0_55px_rgba(157,78,221,0.75)] hover:scale-[1.01]"
                  >
                    Pagar $47 USD con Tarjeta o PayPal en Gumroad ↗
                  </a>
                </div>
              )}

              {/* TAB 2: PAGO MÓVIL (BOLÍVARES) */}
              {paymentTab === 'pagomovil' && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/5">
                    <div>
                      <h3 className="font-modern text-lg text-white font-light flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#38bdf8]" />
                        Datos para Pago Móvil (Venezuela)
                      </h3>
                      <p className="text-xs text-[#9ca3af] font-light mt-0.5">
                        Transfiere el equivalente a <strong className="text-white">$47 USD</strong> a la tasa oficial del BCV del día.
                      </p>
                    </div>
                    <span className="text-[9px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/25 px-2.5 py-1 rounded-full uppercase tracking-wider w-fit">
                      TASA OFICIAL BCV
                    </span>
                  </div>

                  {/* Fila de Datos Bancarios con botones copiar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    
                    {/* Banco */}
                    <div className="bg-[#050505] p-3 rounded-xl border border-white/5">
                      <span className="block text-[9px] text-[#6b7280] font-mono uppercase tracking-wider mb-1">Banco</span>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-xs font-semibold">Provincial (0108)</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('0108', 'pm_banco')}
                          className="text-[#6b7280] hover:text-white p-1"
                          title="Copiar código de banco"
                        >
                          {copiedKey === 'pm_banco' ? <CheckCheck className="w-3.5 h-3.5 text-[#1DB954]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Teléfono */}
                    <div className="bg-[#050505] p-3 rounded-xl border border-white/5">
                      <span className="block text-[9px] text-[#6b7280] font-mono uppercase tracking-wider mb-1">Teléfono</span>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-xs font-mono font-semibold">04121479466</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('04121479466', 'pm_tel')}
                          className="text-[#6b7280] hover:text-white p-1"
                          title="Copiar teléfono"
                        >
                          {copiedKey === 'pm_tel' ? <CheckCheck className="w-3.5 h-3.5 text-[#1DB954]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Cédula */}
                    <div className="bg-[#050505] p-3 rounded-xl border border-white/5">
                      <span className="block text-[9px] text-[#6b7280] font-mono uppercase tracking-wider mb-1">Cédula</span>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-xs font-mono font-semibold">19531198</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('19531198', 'pm_ci')}
                          className="text-[#6b7280] hover:text-white p-1"
                          title="Copiar cédula"
                        >
                          {copiedKey === 'pm_ci' ? <CheckCheck className="w-3.5 h-3.5 text-[#1DB954]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                  </div>

                  {copiedKey && (
                    <div className="text-center text-[10px] text-[#1DB954] font-mono mb-4 animate-pulse">
                      ✓ Dato copiado al portapapeles
                    </div>
                  )}

                  <p className="text-[11px] text-[#9ca3af] font-mono text-center mb-4">
                    👇 Realiza tu pago móvil y notifícalo con el formulario inferior para reservar tu cupo y software de inmediato:
                  </p>
                </div>
              )}

              {/* TAB 3: BINANCE PAY (USDT) */}
              {paymentTab === 'binance' && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/5">
                    <div>
                      <h3 className="font-modern text-lg text-white font-light flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-amber-400" />
                        Pagar con Binance Pay / Cripto
                      </h3>
                      <p className="text-xs text-[#9ca3af] font-light mt-0.5">
                        Transfiere <strong className="text-white">47 USDT</strong> a través de Binance Pay sin comisiones.
                      </p>
                    </div>
                    <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded-full uppercase tracking-wider w-fit">
                      0% COMISIÓN
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                    {/* Código QR oficial de Binance Pay */}
                    <div className="bg-white p-2.5 rounded-2xl shadow-xl flex flex-col items-center shrink-0">
                      <img 
                        src="/binance-qr.png" 
                        alt="QR Oficial Binance Pay 93927162" 
                        className="w-32 h-32 object-contain rounded-lg"
                      />
                      <span className="text-[8px] font-mono text-black uppercase font-bold tracking-wider mt-1.5">
                        Escanear en App Binance
                      </span>
                    </div>

                    {/* Datos de Binance */}
                    <div className="space-y-3 w-full">
                      <div className="bg-[#050505] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="block text-[9px] text-[#6b7280] font-mono uppercase tracking-wider">Binance Pay ID</span>
                          <span className="text-white text-sm font-mono font-bold">93927162</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('93927162', 'binance_id')}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#E0AAFF] font-mono flex items-center gap-1.5 transition-colors"
                        >
                          {copiedKey === 'binance_id' ? <CheckCheck className="w-3.5 h-3.5 text-[#1DB954]" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'binance_id' ? 'Copiado' : 'Copiar ID'}</span>
                        </button>
                      </div>

                      <div className="bg-[#050505] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="block text-[9px] text-[#6b7280] font-mono uppercase tracking-wider">Correo Binance</span>
                          <span className="text-white text-sm font-mono font-bold">napbak@gmail.com</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('napbak@gmail.com', 'binance_mail')}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#E0AAFF] font-mono flex items-center gap-1.5 transition-colors"
                        >
                          {copiedKey === 'binance_mail' ? <CheckCheck className="w-3.5 h-3.5 text-[#1DB954]" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'binance_mail' ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#9ca3af] font-mono text-center mb-2">
                    👇 Pega tu Order ID o Referencia de Binance en el formulario inferior para verificar tu acceso:
                  </p>
                </div>
              )}

              {/* TAB 4: PAYPAL DIRECTO */}
              {paymentTab === 'paypal' && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/5">
                    <div>
                      <h3 className="font-modern text-lg text-white font-light flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-[#60a5fa]" />
                        Transferencia Directa por PayPal
                      </h3>
                      <p className="text-xs text-[#9ca3af] font-light mt-0.5">
                        Envía <strong className="text-white">$47 USD</strong> directamente desde tu saldo de PayPal personal.
                      </p>
                    </div>
                    <span className="text-[9px] font-mono text-[#60a5fa] bg-[#60a5fa]/10 border border-[#60a5fa]/25 px-2.5 py-1 rounded-full uppercase tracking-wider w-fit">
                      PAYPAL.ME
                    </span>
                  </div>

                  <div className="bg-[#050505] p-4 rounded-xl border border-white/5 mb-6 text-center">
                    <p className="text-xs text-white mb-3 font-mono">
                      Enlace de pago configurado por $47 USD:
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={PAYPAL_ME_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="py-3 px-6 rounded-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,112,186,0.4)]"
                      >
                        <span>Abrir PayPal.me ($47 USD)</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(PAYPAL_ME_URL, 'paypal_url')}
                        className="py-3 px-4 rounded-full bg-white/5 hover:bg-white/10 text-xs text-white font-mono flex items-center gap-2 border border-white/10 transition-colors"
                      >
                        {copiedKey === 'paypal_url' ? <CheckCheck className="w-4 h-4 text-[#1DB954]" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedKey === 'paypal_url' ? 'Enlace Copiado' : 'Copiar Link'}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#9ca3af] font-mono text-center mb-2">
                    👇 Tras completar la transferencia en PayPal, introduce tu ID de transacción o correo en el formulario:
                  </p>
                </div>
              )}

              {/* ── FORMULARIO FORMSPREE PARA PAGOS MANUALES ── */}
              {paymentTab !== 'gumroad' && (
                <div className="mt-6 p-6 rounded-2xl bg-[#09090d] border border-[#9D4EDD]/30 shadow-[0_0_30px_rgba(157,78,221,0.15)]">
                  
                  {formStatus === 'success' ? (
                    <div className="text-center py-6 space-y-4 animate-fadeIn">
                      <div className="w-14 h-14 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/40 text-[#1DB954] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(29,185,84,0.4)]">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="font-modern text-xl text-white font-light">
                        ¡Comprobante Recibido con Éxito!
                      </h4>
                      <p className="text-xs text-[#9ca3af] max-w-md mx-auto leading-relaxed">
                        Hemos registrado tu reporte para <strong className="text-white">{reportForm.name}</strong>. En un plazo máximo de 2 horas validaremos tu referencia y te enviaremos a <strong className="text-[#E0AAFF]">{reportForm.email}</strong> el enlace de acceso al aula del workshop y las instrucciones de tu suite <strong className="text-white">CTRL</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFormStatus('idle');
                          setReportForm({ name: '', email: '', reference: '', notes: '' });
                        }}
                        className="mt-4 text-xs font-mono text-[#E0AAFF] underline hover:text-white transition-colors"
                      >
                        Reportar otro pago o enviar una aclaración
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleReportSubmit} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                          <Send className="w-3.5 h-3.5 text-[#E0AAFF]" />
                          <h4 className="font-modern text-sm text-white font-medium">
                            Notificar Pago // {paymentTab === 'pagomovil' ? 'Pago Móvil Bs' : paymentTab === 'binance' ? 'Binance USDT' : 'PayPal'}
                          </h4>
                        </div>
                        <span className="text-[8px] font-mono text-[#6b7280] uppercase tracking-widest">
                          CONFIRMACIÓN RÁPIDA
                        </span>
                      </div>

                      {errorMessage && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-[#6b7280] font-mono uppercase tracking-wider mb-1">
                            Tu Nombre y Apellido *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Carlos Rodríguez"
                            value={reportForm.name}
                            onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#9D4EDD] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#6b7280] font-mono uppercase tracking-wider mb-1">
                            Correo de Acceso (Donde recibirás CTRL) *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="tu.correo@ejemplo.com"
                            value={reportForm.email}
                            onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#9D4EDD] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-[#6b7280] font-mono uppercase tracking-wider mb-1">
                            {paymentTab === 'pagomovil' ? 'Número de Referencia (Últimos dígitos) *' : paymentTab === 'binance' ? 'Binance Order ID / TxID *' : 'ID de Transacción PayPal *'}
                          </label>
                          <input
                            type="text"
                            required
                            placeholder={paymentTab === 'pagomovil' ? 'Ej. 847291' : paymentTab === 'binance' ? 'Ej. 248910248' : 'Ej. 4XY12894...'}
                            value={reportForm.reference}
                            onChange={(e) => setReportForm({ ...reportForm, reference: e.target.value })}
                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#9D4EDD] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#6b7280] font-mono uppercase tracking-wider mb-1">
                            Nota o Banco Emisor (Opcional)
                          </label>
                          <input
                            type="text"
                            placeholder="Ej. Banesco a Provincial / Titular..."
                            value={reportForm.notes}
                            onChange={(e) => setReportForm({ ...reportForm, notes: e.target.value })}
                            className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#9D4EDD] transition-colors"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === 'sending'}
                        className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#9D4EDD] hover:bg-[#8338ec] text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(157,78,221,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {formStatus === 'sending' ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Validando y Enviando Reporte...</span>
                          </>
                        ) : (
                          <>
                            <span>Enviar Comprobante y Asegurar Cupo ($47 USD)</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-[9px] text-[#6b7280] text-center font-mono">
                        🔒 Tu información está cifrada. Tras el envío recibirás la confirmación en tu correo.
                      </p>
                    </form>
                  )}

                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[10px] text-[#6b7280] font-mono uppercase tracking-widest">
                <span className="flex items-center gap-1 text-[#1DB954]"><Lock className="w-3 h-3" /> Transacción Segura</span>
                <span>•</span>
                <span>Licencia Vitalicia CTRL Incluida</span>
                <span>•</span>
                <span>Auditoría de stems en Directo</span>
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

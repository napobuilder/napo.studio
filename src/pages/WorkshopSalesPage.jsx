import React, { useState, useEffect } from 'react';
import { 
  Check, Clock, Users, Zap, ChevronDown, ChevronUp, 
  ExternalLink, Shield, Sparkles, Volume2, 
  ArrowRight, AlertCircle, Lock, Sliders, ArrowUpRight,
  Copy, CheckCheck, CreditCard, Send, CheckCircle2, Wallet, Smartphone, Piano
} from 'lucide-react';

export default function WorkshopSalesPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 22, seconds: 45 });
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = "Workshop FL Studio: De Mezcla Opaca a Master Comercial (+ Suite CTRL)";
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', 'https://napbak.studio/toma-el-control.png');
    const twitterImg = document.querySelector('meta[property="twitter:image"]');
    if (twitterImg) twitterImg.setAttribute('content', 'https://napbak.studio/toma-el-control.png');
  }, []);

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

  // Configuración de Pasarelas & Add-ons
  const [includeMastering, setIncludeMastering] = useState(false); // +$20
  const [includeTemplate, setIncludeTemplate] = useState(false);   // +$15
  const [includeVipAudit, setIncludeVipAudit] = useState(false);   // +$27

  // Tasa Oficial BCV en tiempo real
  const [bcvRate, setBcvRate] = useState(null);
  const [loadingBcv, setLoadingBcv] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchBcv() {
      try {
        const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
        if (res.ok) {
          const data = await res.json();
          if (data && data.promedio && isMounted) {
            setBcvRate(data.promedio);
            setLoadingBcv(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Error al obtener tasa BCV oficial:', err);
      }
      if (isMounted) {
        setBcvRate(855.66); // Fallback de contingencia
        setLoadingBcv(false);
      }
    }
    fetchBcv();
    return () => { isMounted = false; };
  }, []);

  const currentTotal = 47 
    + (includeMastering ? 20 : 0) 
    + (includeTemplate ? 15 : 0) 
    + (includeVipAudit ? 27 : 0);

  const totalBs = bcvRate ? (currentTotal * bcvRate) : null;
  const formattedBs = totalBs
    ? totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : null;

  const baseStrikePrice = 147 
    + (includeMastering ? 60 : 0) 
    + (includeTemplate ? 45 : 0) 
    + (includeVipAudit ? 80 : 0);

  const selectedAddonsList = [
    includeMastering ? 'Mastering 1 Tema (+ $20)' : null,
    includeTemplate ? 'Plantilla FL Studio .FLP (+ $15)' : null,
    includeVipAudit ? 'Pase VIP Auditoría Garantizada (+ $27)' : null,
  ].filter(Boolean);

  const GUMROAD_URL = `https://napoacademy.gumroad.com/l/workshop?price=${currentTotal}&wanted=true`;
  const PAYPAL_ME_URL = `https://www.paypal.com/paypalme/norkafarina/${currentTotal}`;
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/moevjjpq";

  const [paymentTab, setPaymentTab] = useState('gumroad'); // 'gumroad' | 'pagomovil' | 'binance' | 'paypal'
  const [copiedKey, setCopiedKey] = useState(null);
  
  const [reportForm, setReportForm] = useState({
    name: '',
    email: '',
    reference: '',
    notes: ''
  });
  const [formStatus, setFormStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyToClipboard = (text, keyName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(keyName);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportForm.name.trim() || !reportForm.email.trim() || !reportForm.reference.trim()) {
      setErrorMessage('Por favor completa nombre, correo y número de referencia.');
      return;
    }
    setErrorMessage('');
    setFormStatus('sending');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          método_pago: paymentTab,
          nombre: reportForm.name,
          email: reportForm.email,
          referencia: reportForm.reference,
          notas: reportForm.notes,
          monto_total: `${currentTotal} USD`,
          monto_bolivares: formattedBs ? `Bs. ${formattedBs}` : 'N/A',
          tasa_bcv: bcvRate ? `Bs. ${bcvRate.toFixed(2)}` : 'N/A',
          add_ons_seleccionados: selectedAddonsList.join(', ') || 'Ninguno (Solo Workshop Base)',
          fecha: new Date().toISOString(),
          producto: `Workshop FL Studio (${currentTotal} USD)`
        })
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
        setErrorMessage('Error al enviar comprobante. Escríbenos a soporte@napbak.studio');
      }
    } catch {
      setFormStatus('error');
      setErrorMessage('Hubo un problema de conexión. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f3f4f6] selection:bg-[#9D4EDD] selection:text-white relative overflow-hidden font-modern">
      
      {/* Tipografías Napbak */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500;600&family=Outfit:wght@200;300;400;500;600;700&display=swap');
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-modern { font-family: 'Outfit', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
      `}</style>

      {/* Sutil Glow Ambiental */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[350px] bg-[#9D4EDD]/10 blur-[130px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#3b82f6]/5 blur-[140px] pointer-events-none rounded-full"></div>

      {/* Barra Superior Compacta */}
      <div className="bg-[#08080c]/90 border-b border-white/5 text-[11px] py-2 px-4 backdrop-blur-md flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></span>
          <span className="text-white font-mono tracking-wider uppercase text-[10px]">COHORT LIVE 2026</span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-[#9ca3af] hidden sm:inline text-[11px]">Sábado 7:00 PM EST</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-mono text-[10px] bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/25">
            Solo 30 Cupos
          </span>
          <a href="#checkout" className="text-white hover:text-[#E0AAFF] font-mono text-[11px] underline">
            Inscribirme ($47)
          </a>
        </div>
      </div>

      {/* Header Minimal */}
      <header className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between border-b border-white/5">
        <a href="/" className="font-modern text-xl text-white font-light tracking-tight flex items-baseline">
          napbak<span className="font-serif italic text-white/70">.studio</span>
          <span className="animate-pulse text-[#9D4EDD] ml-1">_</span>
        </a>
        <div className="flex items-center gap-3 font-mono text-xs text-[#9ca3af]">
          <span>Workshop // 2.5h</span>
        </div>
      </header>

      {/* ── HERO COMPACTO & DIRECTO ── */}
      <main className="max-w-5xl mx-auto px-6 pt-10 pb-16">
        
        {/* Titular Principal */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9D4EDD]/10 border border-[#9D4EDD]/25 text-[#E0AAFF] text-[10px] font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3 text-[#E0AAFF]" />
            PARA PRODUCTORES MUSICALES & COMPOSITORES EN FL STUDIO
          </div>

          <h1 className="text-3xl sm:text-5xl font-light text-white leading-[1.15] tracking-tight mb-4">
            El Método Paso a Paso en{' '}
            <span className="inline-flex items-center gap-2 text-[#ff5e00] font-normal align-middle">
              <img 
                src="/fl-studio-logo.png" 
                alt="FL Studio Logo" 
                className="w-7 h-7 sm:w-10 sm:h-10 object-contain inline-block drop-shadow-[0_0_16px_rgba(255,94,0,0.5)]" 
              />
              FL Studio
            </span>{' '}
            para sonar con <span className="font-serif italic text-[#E0AAFF] font-normal">pegada y loudness comercial</span>.
          </h1>

          <p className="text-sm sm:text-base text-[#9ca3af] font-light max-w-2xl mx-auto leading-relaxed">
            Sin cursos eternos de 40 horas ni jerga confusa. En <strong className="text-white font-medium">2.5 horas prácticas dentro de FL Studio</strong>, aprenderás los detalles técnicos exactos que marcan la diferencia entre una maqueta casera y un track competitivo en Spotify, <span className="text-white/80">sin necesidad de ser ingeniero de sonido ni tener plugins caros.</span>
          </p>
        </div>

        {/* Tira Resumen: Lo que te llevas por $47 (Grid Atómico) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <img 
              src="/fl-studio-logo.png" 
              alt="FL Studio" 
              className="w-4 h-4 object-contain mx-auto mb-1.5 opacity-90 drop-shadow-[0_0_8px_rgba(255,94,0,0.5)]" 
            />
            <div className="text-xs font-semibold text-white">FL Studio en Vivo</div>
            <div className="text-[10px] text-[#6b7280]">2.5h de sesión práctica</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#9D4EDD]/10 border border-[#9D4EDD]/30 text-center shadow-[0_0_15px_rgba(157,78,221,0.15)]">
            <Zap className="w-4 h-4 text-[#E0AAFF] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-white">Suite DSP CTRL</div>
            <div className="text-[10px] text-[#E0AAFF]">Licencia vitalicia incluida</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <Volume2 className="w-4 h-4 text-[#9D4EDD] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-white">Casos Clínicos</div>
            <div className="text-[10px] text-[#6b7280]">Auditoría de pistas en directo</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <Check className="w-4 h-4 text-[#1DB954] mx-auto mb-1.5" />
            <div className="text-xs font-semibold text-white">Grabación 4K</div>
            <div className="text-[10px] text-[#6b7280]">Acceso permanente de por vida</div>
          </div>
        </div>

        {/* ── GRID PRINCIPAL: TEMARIO + CHECKOUT LADO A LADO ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* COLUMNA IZQUIERDA: TEMARIO CONCISO (7 columnas) */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="pb-2 border-b border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-[#9D4EDD] uppercase font-bold">
                EL SISTEMA FL STUDIO // 3 ETAPAS
              </span>
              <span className="text-[10px] font-mono text-[#6b7280]">Paso a paso en el mixer</span>
            </div>

            {/* Módulo 1 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#9D4EDD]/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold text-[#E0AAFF] bg-[#9D4EDD]/20 px-2 py-0.5 rounded">01</span>
                <h3 className="text-sm font-medium text-white">Arquitectura & Ruteo en FL Studio: Graves Limpios</h3>
              </div>
              <p className="text-xs text-[#9ca3af] font-light leading-relaxed pl-7">
                Cómo configurar el mixer de FL Studio: buses de batería, sidechain por ruteo nativo, gestión de fase y cómo tallar espacio para que el bombo y el subgrave convivan sin ensuciar.
              </p>
            </div>

            {/* Módulo 2 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#9D4EDD]/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold text-[#E0AAFF] bg-[#9D4EDD]/20 px-2 py-0.5 rounded">02</span>
                <h3 className="text-sm font-medium text-white">Mastering Analítico & Los Secretos de los LUFS</h3>
              </div>
              <p className="text-xs text-[#9ca3af] font-light leading-relaxed pl-7">
                Cómo empujar tu cadena de master en FL Studio a niveles competitivos (-9 a -7 LUFS) sin clipping áspero ni penalización de Spotify, usando la suite de medición CTRL.
              </p>
            </div>

            {/* Módulo 3 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#9D4EDD]/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold text-[#E0AAFF] bg-[#9D4EDD]/20 px-2 py-0.5 rounded">03</span>
                <h3 className="text-sm font-medium text-white">Clinic en Vivo: Auditoría de Casos Seleccionados</h3>
              </div>
              <p className="text-xs text-[#9ca3af] font-light leading-relaxed pl-7">
                Elegimos 3-4 proyectos representativos postulados por los asistentes para diagnosticar y corregir en directo. Verás las soluciones reales aplicadas paso a paso a casos típicos.
              </p>
            </div>

            {/* Garantía & Social Proof Compacto */}
            <div className="p-4 rounded-xl bg-[#1DB954]/5 border border-[#1DB954]/20 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#1DB954] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white">Garantía Incondicional de 7 Días</h4>
                <p className="text-[11px] text-[#9ca3af] font-light leading-snug mt-0.5">
                  Si tras la primera hora sientes que no transformó tu criterio de mezcla en FL Studio, te reembolsamos el 100% de tus $47 sin preguntas. Te quedas con el material de apoyo.
                </p>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: TARJETA DE CHECKOUT DIRECTO (5 columnas) */}
          <div id="checkout" className="lg:col-span-6 bg-[#09090d] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
            
            {/* Header del Ticket con Bundle Visual 3-en-1 */}
            <div className="pb-4 mb-4 border-b border-white/5">
              
              {/* Barra superior de estado / temporizador */}
              <div className="flex items-center justify-between gap-1 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></span>
                  <span className="text-[9px] font-mono uppercase text-[#E0AAFF] tracking-wider font-bold">
                    BUNDLE 3 EN 1 // ACCESO COMPLETO
                  </span>
                </div>
                <div className="bg-[#050505] px-2.5 py-0.5 rounded border border-white/5 font-mono">
                  <span className="text-[8px] text-[#6b7280] uppercase">Cierra: </span>
                  <span className="text-[10px] font-bold text-[#E0AAFF]">
                    {timeLeft.days}d {String(timeLeft.hours).padStart(2,'0')}h {String(timeLeft.minutes).padStart(2,'0')}m
                  </span>
                </div>
              </div>

              {/* Tira Visual del Bundle: [Caja 3D] + [Suite CTRL UI] + [Piano VST] */}
              <div className="bg-[#050505]/80 border border-white/5 rounded-xl p-3 mb-4 flex items-center justify-between gap-1.5 sm:gap-2">
                
                {/* 1. Caja Mockup 3D */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-[#9D4EDD]/25 blur-sm rounded-lg pointer-events-none"></div>
                    <img 
                      src="/toma-el-control.png" 
                      alt="Masterclass FL Studio" 
                      className="w-14 sm:w-16 h-auto object-contain relative drop-shadow-[0_8px_20px_rgba(157,78,221,0.4)]" 
                    />
                  </div>
                  <span className="text-[9px] font-mono text-white font-medium mt-1">Masterclass</span>
                  <span className="text-[8px] font-mono text-[#6b7280]">FL Studio 2.5h</span>
                </div>

                {/* Signo Más */}
                <span className="text-white/40 font-mono text-sm sm:text-base font-bold select-none">+</span>

                {/* 2. Suite DSP CTRL UI */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 sm:w-28 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                    <img 
                      src="/ctrl-suite-ui.png" 
                      alt="Suite DSP CTRL" 
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                  <span className="text-[9px] font-mono text-white font-medium mt-1">Suite CTRL</span>
                  <span className="text-[8px] font-mono text-[#E0AAFF]">Web DSP</span>
                </div>

                {/* Signo Más */}
                <span className="text-white/40 font-mono text-sm sm:text-base font-bold select-none">+</span>

                {/* 3. Piano VST Instrument */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 sm:w-16 h-12 sm:h-14 rounded-lg bg-gradient-to-br from-[#161622] to-[#0a0a10] border border-[#9D4EDD]/40 flex flex-col items-center justify-center p-1 shadow-md relative overflow-hidden">
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#9D4EDD]/30 rounded-full blur-xs"></div>
                    <Piano className="w-5 h-5 text-[#E0AAFF] mb-0.5" />
                    <span className="text-[7px] font-mono font-bold text-white tracking-wider">PIANO VST</span>
                  </div>
                  <span className="text-[9px] font-mono text-white font-medium mt-1">Piano VST</span>
                  <span className="text-[8px] font-mono text-[#1DB954]">Plugin Gratis</span>
                </div>

              </div>

              {/* Fila de Precio y Entrega */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-light text-white font-modern transition-all">${currentTotal}</span>
                    <span className="text-xs font-mono text-[#9ca3af]">USD</span>
                    <span className="text-xs font-mono text-[#6b7280] line-through ml-1.5">${baseStrikePrice}</span>
                  </div>
                  <p className="text-[10px] text-[#6b7280] font-mono">
                    {selectedAddonsList.length > 0 
                      ? `Workshop Base + ${selectedAddonsList.length} Add-on${selectedAddonsList.length > 1 ? 's' : ''}` 
                      : 'Todo el bundle incluido • Acceso de por vida'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono text-[#1DB954] bg-[#1DB954]/10 border border-[#1DB954]/25 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse"></span>
                    Entrega Inmediata
                  </span>
                </div>
              </div>

            </div>

            {/* ── ADD-ONS EXCLUSIVOS DE CHECKOUT (OPCIONALES) ── */}
            <div className="mb-4 space-y-2">
              <span className="text-[9px] font-mono text-[#E0AAFF] uppercase tracking-wider block font-bold">
                ⚡ POTENCIA TU INSCRIPCIÓN (ADD-ONS OPCIONALES):
              </span>

              {/* Add-on 1: Mastering de 1 tema (+ $20) */}
              <div 
                onClick={() => setIncludeMastering(!includeMastering)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                  includeMastering 
                    ? 'bg-[#9D4EDD]/15 border-[#9D4EDD] shadow-[0_0_15px_rgba(157,78,221,0.2)]' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <input 
                    type="checkbox"
                    checked={includeMastering}
                    onChange={(e) => setIncludeMastering(e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 text-[#9D4EDD] focus:ring-0 cursor-pointer accent-[#9D4EDD]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-white">
                        Mastering de 1 Tema por Napbak
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#E0AAFF] bg-[#9D4EDD]/20 px-1.5 py-0.5 rounded">
                        + $20 USD
                      </span>
                    </div>
                    <p className="text-[10px] text-[#9ca3af] font-light leading-snug mt-0.5">
                      Envías el .WAV de tu track y Napbak lo masteriza con CTRL para entrega 24-bit listo para streaming (Valor regular: $60 USD).
                    </p>
                  </div>
                </div>
              </div>

              {/* Add-on 2: Plantilla Mixer Pro FL Studio (.FLP) (+ $15) */}
              <div 
                onClick={() => setIncludeTemplate(!includeTemplate)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                  includeTemplate 
                    ? 'bg-[#9D4EDD]/15 border-[#9D4EDD] shadow-[0_0_15px_rgba(157,78,221,0.2)]' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <input 
                    type="checkbox"
                    checked={includeTemplate}
                    onChange={(e) => setIncludeTemplate(e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 text-[#9D4EDD] focus:ring-0 cursor-pointer accent-[#9D4EDD]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-white">
                        Plantilla Mixer Pro FL Studio (.FLP)
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#E0AAFF] bg-[#9D4EDD]/20 px-1.5 py-0.5 rounded">
                        + $15 USD
                      </span>
                    </div>
                    <p className="text-[10px] text-[#9ca3af] font-light leading-snug mt-0.5">
                      Proyecto base de FL Studio listo para usar: buses por color, sidechain ruteado, cadenas nativas y ganancia calibrada a -6dB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Add-on 3: Pase VIP Auditoría Garantizada (+ $27) */}
              <div 
                onClick={() => setIncludeVipAudit(!includeVipAudit)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                  includeVipAudit 
                    ? 'bg-amber-400/10 border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.15)]' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <input 
                    type="checkbox"
                    checked={includeVipAudit}
                    onChange={(e) => setIncludeVipAudit(e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 text-amber-400 focus:ring-0 cursor-pointer accent-amber-400"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white">
                          Pase VIP: Auditoría Garantizada en Vivo
                        </span>
                        <span className="text-[7px] font-mono bg-amber-400/20 text-amber-300 px-1 rounded uppercase font-bold">
                          Solo 5 cupos
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded">
                        + $27 USD
                      </span>
                    </div>
                    <p className="text-[10px] text-[#9ca3af] font-light leading-snug mt-0.5">
                      Asegura que tu tema o stems sean abiertos y corregidos sí o sí en pantalla compartida durante el clinic del workshop.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Selector de Pasarela */}
            <div className="mb-4">
              <span className="text-[9px] font-mono text-[#6b7280] uppercase tracking-wider block mb-2">
                Selecciona tu método de pago:
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => setPaymentTab('gumroad')}
                  className={`py-2 px-1 rounded-lg text-center font-mono text-[10px] transition-all border ${
                    paymentTab === 'gumroad'
                      ? 'bg-[#9D4EDD]/20 border-[#9D4EDD] text-white font-bold'
                      : 'bg-white/[0.02] border-white/5 text-[#9ca3af] hover:text-white'
                  }`}
                >
                  Gumroad
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab('pagomovil')}
                  className={`py-2 px-1 rounded-lg text-center font-mono text-[10px] transition-all border ${
                    paymentTab === 'pagomovil'
                      ? 'bg-[#9D4EDD]/20 border-[#9D4EDD] text-white font-bold'
                      : 'bg-white/[0.02] border-white/5 text-[#9ca3af] hover:text-white'
                  }`}
                >
                  Pago Móvil
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab('binance')}
                  className={`py-2 px-1 rounded-lg text-center font-mono text-[10px] transition-all border ${
                    paymentTab === 'binance'
                      ? 'bg-[#9D4EDD]/20 border-[#9D4EDD] text-white font-bold'
                      : 'bg-white/[0.02] border-white/5 text-[#9ca3af] hover:text-white'
                  }`}
                >
                  Binance
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab('paypal')}
                  className={`py-2 px-1 rounded-lg text-center font-mono text-[10px] transition-all border ${
                    paymentTab === 'paypal'
                      ? 'bg-[#9D4EDD]/20 border-[#9D4EDD] text-white font-bold'
                      : 'bg-white/[0.02] border-white/5 text-[#9ca3af] hover:text-white'
                  }`}
                >
                  PayPal
                </button>
              </div>
            </div>

            {/* CONTENIDO DE PAGO */}
            
            {/* Opción 1: Gumroad (Instantáneo) */}
            {paymentTab === 'gumroad' && (
              <div className="space-y-3">
                <div className="bg-[#050505] p-3 rounded-xl border border-white/5 text-xs text-[#9ca3af] font-light">
                  <span className="text-white font-medium block mb-1">Tarjeta de Débito/Crédito o PayPal Global</span>
                  Procesado con cifrado seguro en Gumroad. Recibes acceso inmediato al aula y tu licencia de software al instante.
                </div>
                <a
                  href={GUMROAD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#9D4EDD] hover:bg-[#8338ec] text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(157,78,221,0.4)] flex items-center justify-center gap-2"
                >
                  <span>Pagar ${currentTotal} USD en Gumroad</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                {selectedAddonsList.length > 0 && (
                  <p className="text-[10px] text-center text-[#E0AAFF]/70 font-mono">
                    ✓ Incluye Workshop + {selectedAddonsList.length} add-on{selectedAddonsList.length > 1 ? 's' : ''} en el checkout directo
                  </p>
                )}
              </div>
            )}

            {/* Opción 2: Pago Móvil (Venezuela) */}
            {paymentTab === 'pagomovil' && (
              <div className="space-y-3">
                <div className="bg-[#050505] p-3 rounded-xl border border-white/5 text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-white/5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse"></span>
                      <span className="text-[#9ca3af] font-mono">Tasa oficial BCV:</span>
                      <span className="text-white font-mono font-medium">
                        {loadingBcv ? 'Consultando...' : `Bs. ${bcvRate?.toFixed(2)} / USD`}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#38bdf8] font-mono font-bold text-xs">
                        {formattedBs ? `Bs. ${formattedBs}` : `$${currentTotal} USD al cambio`}
                      </span>
                    </div>
                  </div>

                  {formattedBs && (
                    <div className="bg-[#38bdf8]/10 border border-[#38bdf8]/20 p-2.5 rounded-lg flex items-center justify-between font-mono text-[11px]">
                      <div>
                        <span className="text-[#9ca3af] text-[10px] block">Monto total exacto a transferir:</span>
                        <span className="text-[#38bdf8] font-bold text-sm">Bs. {formattedBs}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(formattedBs.replace(/\./g, '').replace(',', '.'), 'pm_monto')}
                        className="px-2.5 py-1.5 rounded bg-[#38bdf8]/20 hover:bg-[#38bdf8]/30 text-[#38bdf8] text-[10px] flex items-center gap-1 transition-all"
                      >
                        {copiedKey === 'pm_monto' ? <CheckCheck className="w-3.5 h-3.5 text-[#1DB954]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'pm_monto' ? 'Copiado' : 'Copiar Bs.'}</span>
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
                    <div className="bg-white/[0.02] p-1.5 rounded flex items-center justify-between">
                      <span>Provincial</span>
                      <button type="button" onClick={() => copyToClipboard('0108', 'pm_b')} className="text-[#9D4EDD]">
                        {copiedKey === 'pm_b' ? <CheckCheck className="w-3 h-3 text-[#1DB954]" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="bg-white/[0.02] p-1.5 rounded flex items-center justify-between">
                      <span>04121479466</span>
                      <button type="button" onClick={() => copyToClipboard('04121479466', 'pm_t')} className="text-[#9D4EDD]">
                        {copiedKey === 'pm_t' ? <CheckCheck className="w-3 h-3 text-[#1DB954]" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="bg-white/[0.02] p-1.5 rounded flex items-center justify-between">
                      <span>19531198</span>
                      <button type="button" onClick={() => copyToClipboard('19531198', 'pm_c')} className="text-[#9D4EDD]">
                        {copiedKey === 'pm_c' ? <CheckCheck className="w-3 h-3 text-[#1DB954]" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  {copiedKey && <span className="text-[10px] text-[#1DB954] block text-center font-mono">✓ Copiado al portapapeles</span>}
                </div>
              </div>
            )}

            {/* Opción 3: Binance Pay */}
            {paymentTab === 'binance' && (
              <div className="space-y-3">
                <div className="bg-[#050505] p-3 rounded-xl border border-white/5 text-xs flex items-center justify-between gap-3">
                  <div className="space-y-1 font-mono">
                    <span className="text-[10px] text-[#6b7280] block">Binance Pay ID ({currentTotal} USDT)</span>
                    <span className="text-white font-bold text-sm">93927162</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('93927162', 'bn_id')}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 font-mono text-[10px] text-[#E0AAFF] flex items-center gap-1"
                  >
                    {copiedKey === 'bn_id' ? <CheckCheck className="w-3.5 h-3.5 text-[#1DB954]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'bn_id' ? 'Copiado' : 'Copiar ID'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Opción 4: PayPal Directo */}
            {paymentTab === 'paypal' && (
              <div className="space-y-3">
                <div className="bg-[#050505] p-3 rounded-xl border border-white/5 text-xs text-[#9ca3af] font-light">
                  Transfiere los ${currentTotal} USD directamente a nuestro enlace oficial de PayPal:
                </div>
                <a
                  href={PAYPAL_ME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#0070ba] hover:bg-[#005ea6] text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Abrir PayPal.me (${currentTotal})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Formulario Rápido de Confirmación (Solo si no es Gumroad) */}
            {paymentTab !== 'gumroad' && (
              <div className="mt-4 pt-3 border-t border-white/5">
                {formStatus === 'success' ? (
                  <div className="p-3 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/30 text-center font-mono text-xs text-[#1DB954]">
                    ✓ Comprobante recibido. En breve recibirás tu acceso a {reportForm.email}.
                  </div>
                ) : (
                  <form onSubmit={handleReportSubmit} className="space-y-2">
                    <span className="text-[9px] font-mono text-[#6b7280] uppercase tracking-wider block">
                      Notificar referencia del pago:
                    </span>
                    {errorMessage && (
                      <div className="text-[11px] text-red-400 font-mono">{errorMessage}</div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Tu Nombre"
                        value={reportForm.name}
                        onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
                        className="bg-[#050505] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#9D4EDD]"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Tu Correo"
                        value={reportForm.email}
                        onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                        className="bg-[#050505] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#9D4EDD]"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Nº de Referencia / TxID"
                      value={reportForm.reference}
                      onChange={(e) => setReportForm({ ...reportForm, reference: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#9D4EDD]"
                    />
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#9D4EDD] hover:bg-[#8338ec] text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      {formStatus === 'sending' ? 'Enviando...' : `Confirmar y Asegurar Cupo ($${currentTotal} USD)`}
                    </button>
                  </form>
                )}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-[#6b7280] font-mono">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#1DB954]" /> Pago Seguro</span>
              <span>Acceso Inmediato a CTRL</span>
            </div>

          </div>

        </div>

        {/* ── FILTRO CLAVE: ¿PARA QUIÉN ES Y PARA QUIÉN NO? ── */}
        <div className="mt-14 max-w-4xl mx-auto border-t border-white/5 pt-10">
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono tracking-widest text-[#E0AAFF] uppercase font-bold">
              CLARIDAD TOTAL // FILTRO DE ADMISIÓN
            </span>
            <h2 className="text-xl sm:text-2xl font-light text-white mt-1">
              ¿Es este workshop para ti?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* SÍ ES PARA TI */}
            <div className="p-5 rounded-2xl bg-[#1DB954]/[0.03] border border-[#1DB954]/20 space-y-3">
              <div className="flex items-center gap-2 text-[#1DB954] text-xs font-mono font-bold uppercase tracking-wider">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Sí es para ti si:</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#d1d5db] font-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#1DB954] font-bold">✓</span>
                  <span>Produces o compones música en FL Studio y sientes que tus temas suenan "pequeños", opacos o pierden pegada al escucharlos en Spotify y en el auto.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1DB954] font-bold">✓</span>
                  <span>No eres ingeniero de sonido ni te interesa la física acústica aburrida: quieres entender los <strong>detalles prácticos</strong> explicados en lenguaje humano.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1DB954] font-bold">✓</span>
                  <span>Buscas un método claro para estructurar tu mixer, separar frecuencias y sonar comercial con los plugins de FL Studio + nuestra suite CTRL.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1DB954] font-bold">✓</span>
                  <span>Eres DJ y quieres entender más sobre producción y sonido para hacer tu propia música y lanzarla comercialmente.</span>
                </li>
              </ul>
            </div>

            {/* NO ES PARA TI */}
            <div className="p-5 rounded-2xl bg-red-500/[0.02] border border-red-500/15 space-y-3">
              <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                <span className="w-4 h-4 rounded-full border border-red-400/40 flex items-center justify-center text-[10px] font-bold">✕</span>
                <span>NO es para ti si:</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#9ca3af] font-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">×</span>
                  <span>Eres un ingeniero de mastering veterano que busca debates teóricos de conservatorio o cálculos de acústica cuántica.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">×</span>
                  <span>Buscas "presets mágicos de 1 clic" que prometen resolver todo sin entender cómo equilibrar tu cadena de mezcla.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">×</span>
                  <span>No estás dispuesto a abrir FL Studio para practicar 2.5 horas enfocadas y aplicar mejoras reales a tus temas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">×</span>
                  <span>No quieres sonar como un pro.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── FAQ COMPACTA (3 PREGUNTAS CLAVE) ── */}
        <div className="mt-14 max-w-2xl mx-auto border-t border-white/5 pt-8">
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono tracking-widest text-[#9D4EDD] uppercase">DUDAS RÁPIDAS</span>
          </div>

          <div className="space-y-2">
            {[
              {
                q: "¿Qué pasa si no puedo estar conectado a esa hora?",
                a: "No te preocupes. La sesión completa se graba en resolución 4K y se sube con acceso permanente de por vida en tu panel de alumno."
              },
              {
                q: "¿Por qué en FL Studio y qué pasa si utilizo otro DAW (Ableton, Logic, Reaper)?",
                a: "La sesión en vivo y el método de ruteo se construirán 100% dentro de FL Studio (utilizando su mixer y plugins stock). Los principios de separación espectral, acústica y medición con CTRL son universales y aplican idéntico en cualquier programa, pero si produces en FL Studio te llevarás el flujo de trabajo exacto y listo para aplicar."
              },
              {
                q: "¿Cómo funciona la auditoría en directo?",
                a: "Podrás postular tu tema antes del workshop. En vivo seleccionaremos 3–4 casos representativos con problemas comunes (graves que chocan, opacidad o exceso de limitación) para corregirlos en pantalla compartida; así todos aprenden a solucionar esos mismos fallos en sus pistas."
              }
            ].map((faq, idx) => (
              <div key={idx} className="rounded-lg bg-white/[0.02] border border-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-3 px-4 text-left text-xs text-white flex items-center justify-between hover:text-[#E0AAFF]"
                >
                  <span className="font-medium pr-2">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-3.5 h-3.5 text-[#9D4EDD]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#6b7280]" />}
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-3 text-xs text-[#9ca3af] font-light border-t border-white/5 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer Minimalista */}
      <footer className="border-t border-white/5 py-8 px-6 text-center text-[10px] text-[#6b7280] font-mono max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>napbak.studio © 2026 // Todos los derechos reservados</div>
        <div className="flex items-center gap-4">
          <a href="/" className="hover:text-white">Estudio</a>
          <a href="/blog" className="hover:text-white">Blog</a>
          <a href="#checkout" className="text-[#E0AAFF] hover:text-white">Inscribirme ($47)</a>
        </div>
      </footer>

    </div>
  );
}

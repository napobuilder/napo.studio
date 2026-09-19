export const POSTS = [
  {
    slug: 'ctrl-vs-youlean-loudness-meter-que-medidor-necesitas',
    title: 'CTRL vs Youlean Loudness Meter: ¿Cuál necesitas realmente en tu flujo de trabajo?',
    subtitle: 'Una comparativa honesta entre el medidor gratuito de referencia de la industria y el analizador web con simulación DSP en tiempo real. Sin afiliaciones, sin humo.',
    date: '2026-09-19',
    readTime: '7 min de lectura',
    author: 'Napbak',
    tags: ['CTRL', 'Herramientas', 'Mastering', 'LUFS', 'DSP'],
    excerpt: 'Youlean Loudness Meter lleva años siendo el plugin gratuito de referencia para medir LUFS. Pero si ya sabes qué es el True Peak y por qué importa, el problema real no es medir: es saber cómo sonará tu canción ANTES de subirla. Ahí es donde cambia todo.',
    cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    content: [
      {
        type: 'paragraph',
        text: 'Esta comparativa no existe porque uno sea mejor que otro en abstracto. Existe porque son herramientas diseñadas para momentos diferentes del flujo de trabajo. Youlean vive dentro de tu DAW como plugin VST/AU. CTRL vive en el browser y actúa después de exportar. Si entiendes esa diferencia, ya sabes cuál usar cuándo. Pero hay más.'
      },
      {
        type: 'heading',
        level: 2,
        text: '1. El terreno común: ¿con qué se come el ITU-R BS.1770?'
      },
      {
        type: 'paragraph',
        text: 'ITU-R BS.1770 — suena a código de acceso a un búnker nuclear, pero es simplemente el estándar internacional que define **cómo medir el volumen percibido del audio** (loudness). Lo publicó la Unión Internacional de Telecomunicaciones y lo adoptaron todas las plataformas de streaming como referencia. En la práctica, es el algoritmo detrás del número LUFS que ves en tu medidor: aplica filtros de ponderación al espectro (K-weighting), promedia la potencia en el tiempo y te da un valor que se aproxima a cómo el oído humano percibe el volumen. Spotify, Apple Music, YouTube — todos normalizan usando este estándar.'
      },
      {
        type: 'paragraph',
        text: 'Dicho esto: tanto Youlean como CTRL implementan **ITU-R BS.1770** para calcular LUFS integrados, LUFS short-term, LRA (Loudness Range) y True Peak con oversampling. En medición base, Youlean Loudness Meter 3 Free es sólido y gratuito. Si solo necesitas un medidor dentro de tu DAW mientras mezclas, Youlean cumple.'
      },
      {
        type: 'callout',
        title: 'La pregunta que separa los casos de uso',
        text: 'Youlean te dice cuánto mide tu señal en tiempo real DENTRO del DAW. CTRL te dice cómo sonará tu master exportado cuando Spotify lo normalice y lo reproduzca en un iPhone, un altavoz Bluetooth o un sistema de cine en casa. No es lo mismo.'
      },
      {
        type: 'heading',
        level: 2,
        text: '2. Lo que Youlean no puede hacer por diseño'
      },
      {
        type: 'paragraph',
        text: 'Youlean es un plugin de medición. Mide la señal que pasa por él en el contexto de tu sesión. Eso tiene un límite estructural: **no puede simular lo que le ocurre a tu audio después de la codificación lossy y la reconstrucción DAC en dispositivos de consumo**. Ese gap es exactamente donde nacen los problemas reales en streaming.'
      },
      {
        type: 'list',
        items: [
          '**Simulación de plataformas con ganancia real**: CTRL aplica la ganancia de normalización exacta de Spotify (-14 LUFS), Apple Music (-16 LUFS), Deezer (-15 LUFS), YouTube y Amazon sobre tu master exportado para que escuches cómo sonará con la penalización real, no estimada.',
          '**Simulación de dispositivos con EQ DSP real**: CTRL modela las curvas de respuesta de frecuencia de iPhone (HPF a 250 Hz + peaking +4 dB a 2.5 kHz + LPF a 12 kHz), altavoces Bluetooth, sistema de cine en casa, MacBook, auriculares, car audio y más — usando biquad filters reales en la Web Audio API.',
          '**Modo Mono con sumado real**: CTRL suma L+R con ganancia de compensación (0.5x por canal) y te hace escuchar exactamente cómo colapsa tu stereo en mono. No es una representación visual: es el audio real pasando por los filtros.',
          '**Comparador A/B con crossfader en vivo**: CTRL incluye un Dual Reference Comparator que carga dos masters, los analiza con métricas independientes (LUFS, True Peak, LRA) y permite cruzar entre ambos en tiempo real con un fader — con opción de loudness matching automático para comparar sin trampa de volumen.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: '3. Tabla de comparativa directa'
      },
      {
        type: 'comparison_table',
        headers: ['Feature', 'Youlean Free', 'CTRL'],
        rows: [
          ['LUFS Integrado (ITU-R BS.1770)', '✅', '✅'],
          ['True Peak con Oversampling', '✅', '✅'],
          ['Loudness Range (LRA)', '✅', '✅'],
          ['Funciona sin instalar nada (browser)', '❌ requiere instalación', '✅ abre en browser, ya'],
          ['Simulación de normalización por plataforma', '❌', '✅ Spotify / Apple / Deezer / YouTube / Amazon'],
          ['Simulación de dispositivos con DSP real', '❌', '✅ iPhone / Bluetooth / Car / MacBook / TV / Headphones'],
          ['Modo Mono con sumado real', '❌', '✅'],
          ['Comparador A/B con crossfader en vivo', '❌', '✅ + Loudness Matching automático'],
          ['Waveform visual con playhead sincronizado', '❌', '✅'],
          ['Precio', 'Gratis', 'Gratis (3 análisis/semana) / Pro $9.99/mes'],
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: '4. ¿Cuándo usar cada uno?'
      },
      {
        type: 'paragraph',
        text: 'La respuesta correcta no es elegir uno: **son complementarios si entiendes para qué sirve cada fase del flujo de trabajo**.'
      },
      {
        type: 'list',
        items: [
          '**Durante la mezcla (pre-export):** Usa Youlean dentro de tu DAW para monitorear LUFS en tiempo real mientras ajustas el limitador final. Es rápido, gratis y no requiere salir de tu sesión.',
          '**Después de exportar (pre-distribución):** Arrastra tu master WAV/MP3 a CTRL. Escucha cómo lo va a reproducir Spotify, cómo colapsa en un altavoz Bluetooth barato, si sobrevive en mono y si el True Peak está controlado con oversampling real antes de que el DAC lo destroce.',
          '**Comparación de versiones:** Si tienes un master v1 y un master v2 y quieres saber cuál tiene mejor PLR (Peak to Loudness Ratio) y cuál suena más abierto sin trampa de volumen, el Comparador A/B de CTRL con loudness matching te lo resuelve en 60 segundos.'
        ]
      },
      {
        type: 'callout',
        title: 'El workflow pro que uso antes de enviar a distribución',
        text: 'Youlean en el bus master para confirmar que estoy en rango (-11 a -9 LUFS, True Peak por debajo de -1.0 dBTP). Exporto el WAV. Subo a CTRL, activo simulación Spotify + iPhone, escucho en mono. Si el kick sigue teniendo impacto en Bluetooth y el vocal no distorsiona en iPhone: listo para distribuir.'
      },
      {
        type: 'ctrl_cta',
        title: 'Prueba CTRL gratis ahora mismo',
        description: 'Sin instalar nada. Arrastra tu master, selecciona Spotify o Apple Music y escucha exactamente cómo llegará a los oídos de tu audiencia — en iPhone, Bluetooth o sistema home theater. 3 análisis gratis por semana, sin tarjeta.'
      }
    ]
  },

  {
    slug: 'por-que-tus-masters-pierden-pegada-en-spotify',
    title: 'Por qué tus masters pierden pegada en Spotify (y cómo solucionarlo con True Peak y LUFS)',
    subtitle: 'La guía mecánica definitiva para vencer la penalización de volumen sin sacrificar la pegada ni distorsionar en convertidores DAC de consumo.',
    date: '2026-03-15',
    readTime: '6 min de lectura',
    author: 'Napbak',
    tags: ['Mastering', 'True Peak', 'LUFS', 'DSP'],
    excerpt: '¿Tu mezcla suena enorme en tu DAW a -7 LUFS, pero cuando llega a Spotify o Apple Music suena apagada y sin vida? No es culpa del algoritmo: es un error mecánico en la gestión de picos inter-sample y rango dinámico.',
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    content: [
      {
        type: 'paragraph',
        text: 'Llevas 15 horas en el estudio. Ajustaste la compresión paralela del bombo, limpiaste el rango de 250 a 400 Hz en las guitarras y metiste un limitador apretado para llegar a -7.5 LUFS integrados. En tus monitores y en tus cascos de estudio suena arrollador. Pero subes la pista a tu distribuidora, la escuchas en Spotify dos semanas después y la decepción es inmediata: suena plana, sin transientes y más baja que las canciones de referencia de tu playlist favorita.'
      },
      {
        type: 'heading',
        level: 2,
        text: '1. El mito del volumen absoluto: La normalización de Loudness'
      },
      {
        type: 'paragraph',
        text: 'Spotify normaliza por defecto a **-14 LUFS integrados** (usando el estándar ITU-R BS.1770). Si tu track entra a -7 LUFS, el reproductor simplemente bajará el fader digital de tu canción exactamente **7 dB**. Aquí es donde ocurre el desastre psicoacústico:'
      },
      {
        type: 'callout',
        title: 'Principio Mecánico de Estudio',
        text: 'Si aplastaste tu rango dinámico para ganar 7 dB de volumen ficticio, cuando Spotify le baje 7 dB a tu canción, te quedarás con una pista de bajo volumen Y sin dinámica. Una canción mezclada con transientes vivas a -11 LUFS solo sufrirá una reducción de 3 dB y conservará todo el impacto del bombo y la caja.'
      },
      {
        type: 'heading',
        level: 2,
        text: '2. El enemigo invisible: Inter-Sample Peaks y Distorsión DAC'
      },
      {
        type: 'paragraph',
        text: 'La mayoría de medidores convencionales en los DAWs solo miden **Sample Peak** (el valor exacto de las muestras discretas en el dominio digital). Si el limitador está seteado a -0.1 dBFS, el DAW jura que nunca pasaste de cero.'
      },
      {
        type: 'paragraph',
        text: 'Sin embargo, cuando el archivo se codifica a **Ogg Vorbis / AAC** para streaming y luego el chip DAC de un teléfono o unos AirPods reconstruye la onda analógica continua, los puntos intermedios entre muestras se disparan por encima de 0 dBFS. Esto genera **inter-sample clipping** y una distorsión áspera en los agudos.'
      },
      {
        type: 'code',
        language: 'text',
        code: `// Reglas de Oro de Entrega de Master
1. Margen True Peak recomendado: -1.0 dBTP (especialmente para pistas agresivas)
2. Para masters ultra-densos: Mínimo -0.7 dBTP
3. Rango de Loudness Integrado competitivo: Entre -11.0 y -9.0 LUFS
4. Factor de Cresta (PLR - Peak to Loudness Ratio): Entre 8 dB y 11 dB`
      },
      {
        type: 'heading',
        level: 2,
        text: '3. Checklist de 4 pasos antes de enviar a distribución'
      },
      {
        type: 'list',
        items: [
          '**Activa la detección de True Peak (Oversampling 4x o 8x)** en tu limitador final para capturar los picos inter-muestra reales.',
          '**Deja un techo (Ceiling) de -1.0 dBTP**: El códec con pérdida de Spotify genera hasta +0.8 dB de sobreimpulso durante la compresión a 160/320 kbps.',
          '**Compara con loudness matching**: Escucha tu master y tu mezcla previa igualando el volumen en LUFS. Si al igualar el volumen la versión masterizada suena más pequeña, el limitador está ahogando el groove.',
          '**Revisa el subgrave en mono**: Cualquier desfase por debajo de 35 Hz resta headroom innecesario que hace que el limitador trabaje el doble de lo necesario.'
        ]
      },
      {
        type: 'ctrl_cta',
        title: 'Diagnostica tu Master en Tiempo Real',
        description: '¿No estás seguro de si tu canción tiene clipping inter-sample o exceso de compresión? Prueba nuestro analizador CTRL en tiempo real y descarga un informe técnico completo.'
      }
    ]
  },
  {
    slug: 'inter-sample-clipping-la-distorsion-que-tu-limitador-no-muestra',
    title: 'Inter-sample Clipping: La distorsión que tu limitador tradicional no te muestra',
    subtitle: 'Por qué un master marcando -0.1 dB en tu DAW sigue distorsionando en altavoces de consumo y cómo los filtros de interpolación salvan tu audio.',
    date: '2026-03-10',
    readTime: '5 min de lectura',
    author: 'Napbak',
    tags: ['DSP', 'Mastering', 'Audio Engineering'],
    excerpt: 'Si tu medidor de master no tiene oversampling activo, estás volando a ciegas. Descubre cómo se forman los picos entre muestras y cómo medir la reconstrucción analógica real.',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    content: [
      {
        type: 'paragraph',
        text: 'En el mundo del audio digital existe una mentira muy extendida: si ninguna muestra individual supera el valor 1.0 (o 0 dBFS), entonces el audio es perfecto y no hay clipping. En teoría matemática discreta esto parece lógico. En la física del mundo real y los convertidores DAC, es completamente falso.'
      },
      {
        type: 'heading',
        level: 2,
        text: '¿Qué es exactamente un Inter-Sample Peak (ISP)?'
      },
      {
        type: 'paragraph',
        text: 'El audio digital no es una onda continua, sino una serie de muestras fijas tomadas a intervalos regulares (por ejemplo, 44,100 veces por segundo). Cuando dos muestras consecutivas alcanzan valores cercanos a 0 dBFS (como -0.2 dB y -0.1 dB), la curva analógica continua generada por el filtro de reconstrucción del convertidor analógico-digital necesariamente viaja por encima de 0 dBFS entre esas dos muestras.'
      },
      {
        type: 'callout',
        title: 'El Impacto en el Usuario Final',
        text: 'En monitores profesionales de estudio con convertidores de gama alta, el margen analógico (analog headroom) puede tolerar pequeños desbordamientos. Pero en unos auriculares económicos, barras de sonido Bluetooth o smartphones, esos picos saturan directamente el amplificador integrado produciendo un chasquido granulado en la voz y las cajas.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'La Solución de DSP: True Peak Metering'
      },
      {
        type: 'paragraph',
        text: 'Los medidores conformes al estándar ITU-R BS.1770 aplican un filtro de sobremuestreo (oversampling) 4x o superior para aproximar matemáticamente la curva analógica reconstruida. Esto es exactamente lo que hace el motor de análisis de **CTRL**.'
      },
      {
        type: 'ctrl_cta',
        title: 'Analiza tus señales con CTRL',
        description: 'Pasa tu pista por el motor de medición de CTRL para verificar la correlación de fase, True Peak y rango dinámico antes de exportar.'
      }
    ]
  }
];

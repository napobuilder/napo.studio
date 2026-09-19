export const POSTS = [
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

import { BibliographicReference, SlideData, SpeakerInfo } from '../types';

export const INITIAL_SPEAKERS: Record<string, SpeakerInfo> = {
  estudianteA: {
    id: 'estudianteA',
    defaultName: 'Estudiante A',
    role: 'Moderador/a & Síntesis',
    color: 'text-sky-700 dark:text-sky-400',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
  },
  estudianteB: {
    id: 'estudianteB',
    defaultName: 'Estudiante B',
    role: 'Fundamentación Pedagógica',
    color: 'text-emerald-700 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
  },
  estudianteC: {
    id: 'estudianteC',
    defaultName: 'Estudiante C',
    role: 'Estrategias y Recursos',
    color: 'text-amber-700 dark:text-amber-400',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  },
};

export const BIBLIOGRAPHIC_REFERENCES: BibliographicReference[] = [
  {
    id: 'ref-1',
    authors: 'Jaramillo, Doralba',
    year: '2012',
    title: 'La clase virtual: espacio didáctico de encuentro, interacción e investigación (Capítulo 3)',
    source: 'Fundación Universitaria Católica del Norte',
    chapterOrContext: 'Capítulo 3 del Texto Base de Didáctica Virtual',
    quoteOrSummary: 'Define la clase virtual no como un repositorio pasivo de archivos, sino como un ecosistema vivo articulado en tres dimensiones complementarias: el campo interactivo, el espacio de encuentro y el campo investigativo.',
    keyContributions: [
      'Superación del concepto de aula virtual como simple software',
      'El campo interactivo promueve la empatía y la comunicación fluida',
      'El aula como escenario problémico donde se aprende formulando preguntas',
    ],
  },
  {
    id: 'ref-2',
    authors: 'Roldán, Nelson',
    year: '2014',
    title: 'Mediaciones comunicativas y pedagógicas en la virtualidad: intencionalidad y uso de herramientas didácticas (Capítulo 6)',
    source: 'Fundación Universitaria Católica del Norte',
    chapterOrContext: 'Capítulo 6 del Texto Base de Didáctica Virtual',
    quoteOrSummary: 'Plantea que los contenidos no son lecciones estáticas sino mediadores pedagógicos que deben detonar el diálogo continuo. Clasifica el correo (asincrónico/reflexivo), el chat (inmediatez dialógica) y los foros (argumentación colectiva).',
    keyContributions: [
      'Los contenidos educativos concebidos como detonantes del diálogo',
      'Clasificación por intencionalidad pedagógica (Correo, Chat, Foros)',
      'Construcción social y negociación conceptual en foros de debate',
    ],
  },
  {
    id: 'ref-3',
    authors: 'Yepes, Claudia & Parra, María',
    year: '2016',
    title: 'La dimensión socio-afectiva en la educación virtual: presencia docente, calidez y motivación',
    source: 'Revista Virtual Universidad Católica del Norte',
    chapterOrContext: 'Acompañamiento tutorial y clima relacional',
    quoteOrSummary: 'Enfatiza que en la virtualidad el calor humano, el respeto, la contención y la motivación se transmiten mediante la intención comunicativa y el tono con el que el docente guía la interacción.',
    keyContributions: [
      'Importancia del tono comunicativo y la empatía tutorial para evitar la deserción',
      'Diseño de ambientes de confianza y seguridad emocional',
      'La presencia social del docente como motor de éxito pedagógico',
    ],
  },
  {
    id: 'ref-4',
    authors: 'Fundación Universitaria Católica del Norte (FUCN)',
    year: '2018',
    title: 'Lineamientos didácticos y comunicativos para el diseño y mediación en Entornos Virtuales de Aprendizaje (EVA)',
    source: 'Dirección Académica y Pedagógica FUCN, Santa Rosa de Osos',
    chapterOrContext: 'Modelo Pedagógico y Didáctica Virtual',
    quoteOrSummary: 'Marco institucional que fundamenta la transición del medio tecnológico a la mediación pedagógica, orientando el rol del estudiante como protagonista autónomo y colaborativo.',
    keyContributions: [
      'La tecnología al servicio de la pedagogía y no como fin en sí misma',
      'Evaluación formativa y retroalimentación motivadora continua',
      'Articulación de actividades grupales y comunitarias de aprendizaje',
    ],
  },
];

export const SLIDES: SlideData[] = [
  {
    id: 1,
    slideNumber: 1,
    totalSlides: 5,
    category: 'Portada & Apertura',
    title: 'Propuesta de Estrategias Comunicativas para Entornos Virtuales de Aprendizaje (EVA)',
    subtitle: 'Del medio tecnológico a la mediación pedagógica y socio-afectiva',
    timeRange: 'Minuto 0:00 a 2:30',
    durationMin: '2.5 min',
    keyPoints: [
      'De la transmisión fría de contenidos a una experiencia dialogante y significativa',
      'Superación de la réplica presencial y la simple colección de PDFs',
      'Metas claras: interacción multidireccional, vínculo socio-afectivo y trabajo colaborativo',
    ],
    contentDetails: {
      format: 'Conversatorio Dinámico (3 Integrantes)',
      durationTotal: '12 Minutos en Total',
      pillars: [
        {
          title: 'Interacción Multidireccional',
          description: 'Flujo bidireccional y reticular entre tutor, estudiante y contenidos pedagógicos.',
          icon: 'Users',
        },
        {
          title: 'Mediación Socio-Afectiva',
          description: 'Cercanía, empatía comunicativa y contención humana en el aula digital.',
          icon: 'HeartHandshake',
        },
        {
          title: 'Protagonismo Activo',
          description: 'El estudiante construye saberes mediante el diálogo y el trabajo colaborativo.',
          icon: 'Sparkles',
        },
      ],
    },
    script: [
      {
        speakerId: 'estudianteA',
        speakerRole: 'Moderador/a',
        text: '¡Un saludo cordial para todos! Hoy nos reunimos en este conversatorio para presentar nuestra propuesta de Estrategias Comunicativas para Entornos Virtuales de Aprendizaje. A lo largo de esta unidad nos hemos hecho una pregunta clave: ¿cómo lograr que la educación virtual deje de ser una fría transmisión de contenidos y se convierta en una experiencia dialogante y significativa?',
      },
      {
        speakerId: 'estudianteB',
        text: 'Así es, {nombreA}. Nuestra propuesta se justifica en la necesidad de superar la idea de que lo virtual es una mera réplica de la clase presencial o una simple colección de PDFs subidos a una plataforma. La literatura base, especialmente las reflexiones de la Católica del Norte, nos recuerda que la tecnología por sí sola no educa; lo que transforma la experiencia es el diseño comunicativo y pedagógico.',
      },
      {
        speakerId: 'estudianteC',
        text: 'Exacto. Buscamos metas claras: potenciar la interacción multidireccional (entre tutor, estudiante y contenidos), afianzar el componente socio-afectivo y garantizar que el estudiante sea el protagonista activo de su aprendizaje a través del trabajo colaborativo.',
      },
    ],
  },
  {
    id: 2,
    slideNumber: 2,
    totalSlides: 5,
    category: 'Marco Conceptual',
    title: 'Fundamentos de la Didáctica Virtual',
    subtitle: 'Articulación de campos didácticos, mediaciones de contenidos y clima afectivo',
    timeRange: 'Minuto 2:30 a 6:00',
    durationMin: '3.5 min',
    keyPoints: [
      'La Clase Virtual (Cap. 3 - Jaramillo): Campo Interactivo | Espacio de Encuentro | Campo Investigativo.',
      'Mediaciones Comunicativas (Cap. 6 - Roldán): El contenido como canal de diálogo; uso del correo, chat y foros.',
      'Dimensiones Centrales: Interacción pedagógica articulada con acompañamiento socio-afectivo (Yepes & Parra).',
    ],
    contentDetails: {
      jaramilloFields: [
        {
          name: 'Campo Interactivo',
          subtitle: 'Empatía y Fluidez',
          desc: 'Espacio donde florece la empatía, el lenguaje cercano y la comunicación fluida horizontal.',
          badge: 'Capítulo 3',
        },
        {
          name: 'Espacio de Encuentro',
          subtitle: 'Negociación Conceptual',
          desc: 'Lugar dialógico donde docente y estudiante acuerdan metas, ritmos y aprendizajes autónomos.',
          badge: 'Capítulo 3',
        },
        {
          name: 'Campo Investigativo',
          subtitle: 'Escenario Problémico',
          desc: 'Transforma el aula en un laboratorio de preguntas, resolución de problemas y curiosidad.',
          badge: 'Capítulo 3',
        },
      ],
      roldanTools: [
        {
          tool: 'Correo Electrónico',
          intention: 'Comunicación Asincrónica y Reflexiva',
          purpose: 'Orientación individual, retroalimentación profunda y seguimiento detallado.',
        },
        {
          tool: 'Chat Pedagógico',
          intention: 'Inmediatez e Interacción Dialógica',
          purpose: 'Resolución de dudas en tiempo real, sintonía sincrónica y preguntas detonantes.',
        },
        {
          tool: 'Foros de Debate',
          intention: 'Argumentación y Coconstrucción',
          purpose: 'Discusión colectiva, negociación conceptual y aprendizaje colaborativo.',
        },
      ],
    },
    script: [
      {
        speakerId: 'estudianteA',
        text: 'Pasando a la fundamentación teórica, nos basamos principalmente en los capítulos 3 y 6 del texto base. Doralba Jaramillo, en el capítulo 3, nos presenta la clase virtual no como un simple software, sino como un lugar de encuentro didáctico articulado en tres campos. {nombreB}, ¿cómo se reflejan esos campos en la comunicación?',
      },
      {
        speakerId: 'estudianteB',
        text: 'Se reflejan totalmente. El campo interactivo es donde se da la empatía y la comunicación fluida. El espacio de encuentro permite al docente y al estudiante negociar conceptos y aprendizajes autónomos. Y el campo investigativo convierte el aula en un escenario problémico, donde se aprende haciendo preguntas.',
      },
      {
        speakerId: 'estudianteC',
        text: 'Aportando a esto, Nelson Roldán en el capítulo 6 resalta que los contenidos son mediadores comunicativos y pedagógicos. No son lecciones estáticas; deben detonar el diálogo. Roldán clasifica las herramientas según su intención: el correo electrónico para la comunicación asincrónica y reflexiva; el chat para la inmediatez y la interacción dialógica en tiempo real; y los foros de debate para la argumentación y la construcción colectiva de conocimiento.',
      },
      {
        speakerId: 'estudianteA',
        text: 'Además, no podemos olvidar la dimensión socio-afectiva planteada por autoras como Yepes y Parra. En la virtualidad, el calor humano, el respeto y la motivación se transmiten mediante la intención comunicativa y el tono con el que el docente orienta la clase.',
      },
    ],
  },
  {
    id: 3,
    slideNumber: 3,
    totalSlides: 5,
    category: 'Metodología Didáctica',
    title: 'Secuencia de Estrategias Comunicativas',
    subtitle: 'Ruta procesal en 4 fases: del vínculo inicial a la evaluación formativa',
    timeRange: 'Minuto 6:00 a 9:30',
    durationMin: '3.5 min',
    keyPoints: [
      '1. Acogida y Vinculación: Correo / Mensajería → Creación de confianza.',
      '2. Diálogo y Construcción: Chat / Videollamada → Encuentro sincrónico.',
      '3. Debate Colaborativo: Foros / Weblogs → Argumentación y coconstrucción.',
      '4. Síntesis y Evaluación: Portafolio / Feedback → Evaluación formativa.',
    ],
    contentDetails: {
      phases: [
        {
          step: '1',
          name: 'Acogida y Vinculación',
          tools: 'Correo / Mensajería / Foro Social',
          action: 'Creación de confianza',
          objective: 'Romper el hielo, diagnosticar saberes previos y establecer un clima socio-afectivo cálido desde el primer día.',
          color: 'from-blue-500 to-cyan-500',
          badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
        },
        {
          step: '2',
          name: 'Diálogo y Construcción',
          tools: 'Chat / Videollamadas Cortas',
          action: 'Encuentro sincrónico guiado',
          objective: 'Preguntas detonantes, resolución de dudas en tiempo real y dinamización dialógica sin conferencias agotadoras.',
          color: 'from-teal-500 to-emerald-500',
          badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300',
        },
        {
          step: '3',
          name: 'Debate Colaborativo',
          tools: 'Foros / Weblogs / Docs Compartidos',
          action: 'Argumentación y coconstrucción',
          objective: 'Abordaje de casos reales, defensa de posturas en pares y relatorías colectivas por negociación conceptual.',
          color: 'from-amber-500 to-orange-500',
          badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
        },
        {
          step: '4',
          name: 'Síntesis y Evaluación',
          tools: 'Portafolio Digital / Feedback',
          action: 'Evaluación formativa continua',
          objective: 'Recopilación reflexiva de evidencias, retroalimentación tutorial oportuna, detallada y altamente motivadora.',
          color: 'from-purple-500 to-indigo-500',
          badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300',
        },
      ],
    },
    script: [
      {
        speakerId: 'estudianteC',
        text: 'Con estos insumos teóricos, estructuramos nuestra propuesta en una secuencia de cuatro fases clave. La Fase 1 es la Acogida y Vinculación. Usamos el correo electrónico y foros sociales para romper el hielo, diagnosticar saberes previos y establecer un clima socio-afectivo cálido desde el primer día.',
      },
      {
        speakerId: 'estudianteB',
        text: 'La Fase 2 corresponde a la Construcción Guiada y Dialogante. Aquí entran las herramientas sincrónicas como el chat pedagógico o las videollamadas corto-formativas. No se trata de dar una conferencia de dos horas, sino de hacer preguntas detonantes, resolver dudas en tiempo real y dinamizar la interacción guiada.',
      },
      {
        speakerId: 'estudianteA',
        text: 'Posteriormente pasamos a la Fase 3: Debate y Trabajo Colaborativo. Hacemos uso intensivo de los foros de discusión y entornos colaborativos. Los estudiantes abordan casos reales, argumentan postura en pares y sistematizan aprendizajes mediante relatorías colectivas. Como señalan las lecturas, el grupo aprende unido mediante la negociación conceptual.',
      },
      {
        speakerId: 'estudianteC',
        text: 'Y cerramos con la Fase 4: Consolidación y Retroalimentación. Se evalúa de manera formativa mediante portafolios digitales donde el estudiante recopila sus evidencias. El rol del docente aquí es vital: brindar retroalimentación oportuna, detallada y motivadora.',
      },
    ],
  },
  {
    id: 4,
    slideNumber: 4,
    totalSlides: 5,
    category: 'Conclusiones y Práctica',
    title: 'Recomendaciones Finales y Cierre',
    subtitle: 'Directrices estratégicas para la docencia y la gestión institucional en EVA',
    timeRange: 'Minuto 9:30 a 12:00',
    durationMin: '2.5 min',
    keyPoints: [
      'Priorizar la empatía y la presencia tutorial cercana en cada interacción.',
      'Diseñar reglas claras e intencionalidad pedagógica para cada herramienta comunicativa.',
      'Usar la tecnología como medio pedagógico transformador, nunca como fin instrumental.',
      'Promover la autoevaluación, coevaluación y construcción de comunidades de aprendizaje.',
    ],
    contentDetails: {
      recommendations: [
        {
          num: '01',
          title: 'Empatía y Presencia Tutorial Cercana',
          desc: 'Detrás de la pantalla hay personas. La empatía comunicativa del tutor es el motor de la retención, la resiliencia y el éxito académico integral.',
          icon: 'HeartHandshake',
          tag: 'Calidez Humana',
        },
        {
          num: '02',
          title: 'Reglas Claras e Intención Pedagógica',
          desc: 'Definir "reglas de juego" y propósitos previos antes de habilitar herramientas para evitar que los foros y chats se vuelvan espacios dispersos.',
          icon: 'FileCheck2',
          tag: 'Estructura Didáctica',
        },
        {
          num: '03',
          title: 'Tecnología como Medio, no como Fin',
          desc: 'El valor educativo reside en el diseño instruccional y la mediación dialogante, no en la sofisticación tecnológica o acumulación de software.',
          icon: 'Compass',
          tag: 'Enfoque Crítico',
        },
        {
          num: '04',
          title: 'Evaluación y Comunidad Participativa',
          desc: 'Fomentar la coevaluación entre pares y la autoevaluación reflexiva para transformar el grupo en una verdadera comunidad del conocimiento.',
          icon: 'UsersRound',
          tag: 'Aprendizaje Colectivo',
        },
      ],
      closingPhrase: 'Cuando la tecnología se combina con una didáctica reflexiva, el diálogo pedagógico florece y se construyen verdaderas comunidades del conocimiento.',
    },
    script: [
      {
        speakerId: 'estudianteB',
        text: 'Para finalizar este conversatorio, queremos enfatizar algunas recomendaciones clave para cualquier institución o docente que desee aplicar este modelo: Primero, recordar siempre que detrás de la pantalla hay personas; la empatía comunicativa del tutor es el motor de la retención y el éxito académico.',
      },
      {
        speakerId: 'estudianteC',
        text: 'Segundo, es fundamental definir "reglas de juego" e intenciones pedagógicas claras para cada herramienta antes de usarla. Un foro sin moderación previa o un chat sin propósito se convierten en espacios de dispersión.',
      },
      {
        speakerId: 'estudianteA',
        text: 'En conclusión, la propuesta que presentamos demuestra que los Entornos Virtuales de Aprendizaje no están alejados de la realidad ni de la calidez humana. Cuando la tecnología se combina con una didáctica reflexiva, el diálogo pedagógico florece y se construyen verdaderas comunidades del conocimiento. ¡Muchas gracias a todos por su atención!',
      },
    ],
  },
  {
    id: 5,
    slideNumber: 5,
    totalSlides: 5,
    category: 'Sustento Académico',
    title: 'Referencias Bibliográficas y Lecturas Base',
    subtitle: 'Corpus teórico que fundamenta la propuesta de mediación didáctica y comunicativa',
    timeRange: 'Lecturas de Respaldo',
    durationMin: 'Corpus Base',
    keyPoints: [
      'Fundación Universitaria Católica del Norte: Texto Base de Didáctica en EVA.',
      'Doralba Jaramillo (Cap. 3): La clase virtual como encuentro, interacción e investigación.',
      'Nelson Roldán (Cap. 6): El contenido como mediador pedagógico y tipología de herramientas.',
      'Yepes & Parra: La dimensión socio-afectiva y acompañamiento tutorial en la virtualidad.',
    ],
    contentDetails: {
      citationStandard: 'Normas APA 7ma Edición',
      summary: 'Cada una de las fases y recomendaciones propuestas surge directamente del análisis de las obras fundamentales de didáctica y mediación pedagógica de la Universidad Católica del Norte.',
    },
    script: [
      {
        speakerId: 'estudianteA',
        speakerRole: 'Moderador/a',
        text: 'Para el sustento de nuestra propuesta, hemos articulado rigurosamente los aportes de Doralba Jaramillo en el capítulo 3 sobre los tres campos de la clase virtual, y de Nelson Roldán en el capítulo 6 sobre las mediaciones y la intencionalidad comunicativa.',
      },
      {
        speakerId: 'estudianteB',
        text: 'Asimismo, incorporamos los desarrollos de Yepes y Parra respecto al clima socio-afectivo y la presencia docente cercana, complementados con los lineamientos institucionales y didácticos de la Fundación Universitaria Católica del Norte.',
      },
      {
        speakerId: 'estudianteC',
        text: 'Estas referencias garantizan que nuestra propuesta tenga un sólido arraigo pedagógico, demostrando que la innovación en los EVA proviene de la didáctica y del diálogo humano.',
      },
    ],
  },
];

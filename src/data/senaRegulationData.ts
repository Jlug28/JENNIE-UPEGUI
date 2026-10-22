import { RegulationModule, CaseDilemma, QuizQuestion, Badge } from '../types/induction';

export const INITIAL_REGULATION_MODULES: RegulationModule[] = [
  {
    id: 'mod-1',
    number: '01',
    title: 'Identidad, Principios y Enfoque Diferencial SENA',
    shortDesc: 'Naturaleza de la formación profesional integral, gratuidad total, valores y marco del nuevo reglamento.',
    normativeRef: 'Acuerdo 009 de 2024 (D.O. 52.947) - Cap. I',
    estimatedMinutes: 6,
    iconName: 'Building2',
    accentColor: '#39A900',
    summary: 'El SENA adopta el Acuerdo 009 de 2024 (publicado en el Diario Oficial No. 52.947), el cual deroga en su totalidad el antiguo Acuerdo 007 de 2012 y unifica las normas de formación, enfoque diferencial, derechos, deberes y debido proceso.',
    coreConcepts: [
      {
        title: 'Misión Institucional y Gratuidad Universal',
        description: 'El SENA está encargado de cumplir la función del Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral con gratuidad total y universalidad.',
        articles: 'Acuerdo 009 de 2024, Arts. 1 - 3',
        examples: [
          'La formación profesional del SENA es 100% gratuita; ningún servidor o tercero está autorizado a cobrar matrículas, exámenes o certificaciones.',
          'El reglamento deroga el Acuerdo 007 de 2012, modernizando la convivencia formativa con enfoque de derechos humanos y no discriminación.'
        ]
      },
      {
        title: 'Símbolos Institucionales y Mística SENA',
        description: 'El escudo, la bandera, el himno y el logotipo oficial simbolizan los sectores económicos del país (primario, secundario y terciario) y la dignificación del trabajador colombiano hacia el futuro.',
        articles: 'Acuerdo 009 de 2024, Art. 4',
        examples: ['El logotipo estilizado representa al aprendiz avanzando hacia adelante con respaldo institucional.']
      },
      {
        title: 'Plan Integral de Bienestar y Enfoque Pluralista',
        description: 'Estrategias orientadas al desarrollo multidimensional del aprendiz (física, psicoafectiva, cultural, espiritual y social), incorporando el enfoque diferencial e inclusivo para poblaciones de especial protección constitucional.',
        articles: 'Acuerdo 009 de 2024, Art. 5 y 6',
        examples: [
          'Acceso a apoyos de sostenimiento (regular y FIC), monitorías, rutas de salud mental y orientación pedagógica.',
          'Garantía de inclusión y accesibilidad para personas con discapacidad, grupos étnicos y víctimas del conflicto.'
        ]
      }
    ],
    quickCheck: {
      question: '¿Cuál es el reglamento vigente del aprendiz SENA que derogó el Acuerdo 007 de 2012 y rige actualmente en todo el país?',
      options: [
        'La Ley 119 de 1994 únicamente',
        'El Acuerdo No. 009 de 2024 (Diario Oficial No. 52.947)',
        'El Decreto 1072 de 2015 en su capítulo de educación',
        'El Código Sustantivo del Trabajo de forma supletoria'
      ],
      correctIndex: 1,
      explanation: 'El Consejo Directivo Nacional del SENA adoptó el nuevo Reglamento del Aprendiz mediante el Acuerdo No. 009 de 2024, publicado en el Diario Oficial No. 52.947, derogando expresamente el Acuerdo 007 de 2012 y sus reformas previas.'
    }
  },
  {
    id: 'mod-2',
    number: '02',
    title: 'Derechos del Aprendiz SENA',
    shortDesc: 'Garantías sustanciales, prerrogativas académicas y protección del debido proceso durante la formación.',
    normativeRef: 'Acuerdo 009 de 2024 - Cap. II, Art. 7',
    estimatedMinutes: 8,
    iconName: 'ShieldCheck',
    accentColor: '#00703C',
    summary: 'El Capítulo II del Acuerdo 009 de 2024 consagra las garantías inalienables del aprendiz: inducción completa, formación de calidad, debido proceso, planes de mejoramiento concertados y representación democrática.',
    coreConcepts: [
      {
        title: 'Derecho a la Inducción y a Ambientes Dignos',
        description: 'Recibir una inducción oportuna e integral al inicio del proceso formativo sobre el reglamento, el centro, bienestar y su programa, así como disponer de ambientes de aprendizaje seguros y herramientas tecnológicas aptas.',
        articles: 'Art. 7, Numerales 1 y 2',
        examples: [
          'Conocer desde el primer día la ruta de aprendizaje, las competencias y los criterios de evaluación de la ficha.',
          'Acceder a maquinaria, software, bibliotecas y talleres que cumplan las normas de bioseguridad y SST.'
        ]
      },
      {
        title: 'Debido Proceso y Derecho a la Defensa',
        description: 'Ser escuchado en audiencia formal de descargos ante el Comité de Evaluación y Seguimiento, controvertir pruebas, contar con asistencia de su vocero y presentar los recursos legales que correspondan.',
        articles: 'Art. 7, Numeral 6 y Cap. VII',
        examples: [
          'Ningún aprendiz puede ser expulsado o sancionado sin previa notificación formal y oportunidad real de descargos.',
          'Derecho a interponer Recurso de Reposición ante la Subdirección de Centro contra actos sancionatorios.'
        ]
      },
      {
        title: 'Planes de Mejoramiento Pedagógico',
        description: 'Contar con un plan de mejoramiento concertado con el instructor cuando no se evidencie el logro de resultados de aprendizaje, como medida pedagógica previa a medidas sancionatorias definitivas.',
        articles: 'Art. 7, Numeral 8 y Art. 14',
        examples: ['El instructor define actividades complementarias con fechas límites claras para subsanar deficiencias técnicas.']
      },
      {
        title: 'Participación Democrática y Vocería',
        description: 'Elegir y ser elegido democráticamente como vocero de ficha o representante de los aprendices ante el Centro de Formación y la Dirección Regional.',
        articles: 'Art. 7, Numeral 5',
        examples: ['Participar con voz y voto en las deliberaciones del Comité de Evaluación y Seguimiento de su ficha.']
      }
    ],
    quickCheck: {
      question: 'Bajo el Acuerdo 009 de 2024, si un aprendiz no alcanza una competencia técnica, ¿cuál es su derecho pedagógico previo a cualquier trámite sancionatorio?',
      options: [
        'La cancelación inmediata de su matrícula sin mediación',
        'La concertación formal de un Plan de Mejoramiento Académico con su instructor',
        'La pérdida automática del trimestre lectivo',
        'El traslado compulsivo a otra sede o jornada'
      ],
      correctIndex: 1,
      explanation: 'El Acuerdo 009 de 2024 ratifica que el Plan de Mejoramiento es el instrumento pedagógico preventivo obligatorio para brindar al aprendiz la oportunidad de alcanzar los resultados de aprendizaje pendientes.'
    }
  },
  {
    id: 'mod-3',
    number: '03',
    title: 'Deberes del Aprendiz SENA',
    shortDesc: 'Compromisos de corresponsabilidad, asistencia, cuidado de recursos y protocolos institucionales.',
    normativeRef: 'Acuerdo 009 de 2024 - Cap. III, Art. 8',
    estimatedMinutes: 8,
    iconName: 'UserCheck',
    accentColor: '#166534',
    summary: 'El aprendiz asume una responsabilidad ética y comunitaria: portar el carné en lugar visible, asistir puntualmente, justificar novedades en los plazos legales y velar por el patrimonio del SENA.',
    coreConcepts: [
      {
        title: 'Porte Permanente y Visible del Carné',
        description: 'Portar el carné de manera visible en todo momento dentro de las sedes del SENA o en actividades externas autorizadas, siendo intransferible y de uso estrictamente personal.',
        articles: 'Art. 8, Numeral 1',
        examples: [
          'Presentarlo en el control de acceso y durante las prácticas de taller.',
          'Reportar inmediatamente la pérdida o deterioro ante la coordinación correspondiente.'
        ]
      },
      {
        title: 'Asistencia y Justificación de Novedades (3 Días Hábiles)',
        description: 'Cumplir con los horarios y actividades formativas. Ante enfermedad o fuerza mayor, radicar la incapacidad médica EPS/IPS o soporte dentro de los tres (3) días hábiles siguientes.',
        articles: 'Art. 8, Numerales 4 y 5',
        examples: [
          'Radicar ante el instructor y la coordinación la incapacidad emitida por la EPS dentro del término reglamentario de 3 días.',
          'Evitar la configuración de deserción injustificada en el sistema Zajuna/SofíaPlus.'
        ]
      },
      {
        title: 'Cuidado y Uso Adecuado de Bienes y Recursos TIC',
        description: 'Proteger instalaciones, maquinaria, herramientas, simuladores y redes informáticas, utilizándolos exclusivamente para el aprendizaje.',
        articles: 'Art. 8, Numeral 7',
        examples: [
          'No manipular equipos sin autorización previa del instructor ni alterar el software institucional.',
          'Acatar las normas de Seguridad y Salud en el Trabajo (SST) y el uso de Elementos de Protección Personal (EPP).'
        ]
      },
      {
        title: 'Respeto a la Comunidad Educativa y Convivencia',
        description: 'Tratar con dignidad, cortesía y respeto a aprendices, instructores, directivos, personal administrativo y de servicios de apoyo, rechazando toda forma de acoso o discriminación.',
        articles: 'Art. 8, Numeral 2',
        examples: ['Fomentar un clima de diálogo pacífico, inclusión, resolución pacífica de diferencias y empatía comunitaria.']
      }
    ],
    quickCheck: {
      question: 'Según el Acuerdo 009 de 2024, ¿cuál es el plazo máximo para justificar documentalmente una inasistencia por motivos de salud o fuerza mayor?',
      options: [
        'El mismo día antes de finalizar la jornada',
        'Hasta tres (3) días hábiles posteriores a la novedad con soporte válido',
        'Hasta el cierre del trimestre o periodo evaluativo',
        'Diez (10) días calendario mediante declaración notariada'
      ],
      correctIndex: 1,
      explanation: 'El reglamento estipula con claridad que el aprendiz cuenta con hasta tres (3) días hábiles siguientes al hecho para presentar formalmente la incapacidad médica o justificación ante su equipo instructor.'
    }
  },
  {
    id: 'mod-4',
    number: '04',
    title: 'Prohibiciones, Faltas y Régimen Sancionatorio',
    shortDesc: 'Conductas prohibidas, calificación de faltas (Leves, Graves, Gravísimas), medidas formativas y sanciones.',
    normativeRef: 'Acuerdo 009 de 2024 - Cap. IV, V y VI',
    estimatedMinutes: 9,
    iconName: 'AlertOctagon',
    accentColor: '#DC2626',
    summary: 'El nuevo marco normativo diferencia entre medidas formativas pedagógicas y sanciones disciplinarias formales, estableciendo la competencia privativa de la Subdirección de Centro para imponer sanciones mayores.',
    coreConcepts: [
      {
        title: 'Prohibiciones Críticas en la Comunidad SENA',
        description: 'Conductas taxativamente prohibidas: plagio de obras y tareas, alteración o falsificación de documentos, consumo o comercialización de licor o sustancias psicoactivas, porte de armas de cualquier tipo, y uso de redes para actos ilegales o acoso.',
        articles: 'Art. 9 (Prohibiciones)',
        examples: [
          'Copiar proyectos de internet sin atribución o presentar trabajos desarrollados por terceros (falta grave o gravísima).',
          'Ingresar al Centro de Formación bajo efectos del alcohol o sustancias psicoactivas.'
        ]
      },
      {
        title: 'Clasificación de Faltas: Académicas y Disciplinarias',
        description: 'Las faltas se clasifican en Leves, Graves o Gravísimas atendiendo al daño, la reiteración, el dolo o culpa grave y la afectación al proceso formativo.',
        articles: 'Arts. 10 - 13',
        examples: [
          'Falta leve: Incumplimiento menor subsanable por primera vez.',
          'Falta gravísima: Agresión física, fraude en certificaciones o notas, o posesión de estupefacientes/armas.'
        ]
      },
      {
        title: 'Medidas Formativas vs. Sanciones Disciplinarias',
        description: 'Medidas formativas (pedagógicas, no constituyen sanción): Llamado de atención verbal y plan de mejoramiento con compromiso escrito. Sanciones formales (registradas en SofíaPlus/Zajuna): Llamado de atención escrito con plan de mejora, Condicionamiento de matrícula y Cancelación definitiva de matrícula.',
        articles: 'Arts. 14 - 18',
        examples: [
          'El llamado verbal busca la corrección pedagógica inmediata.',
          'La cancelación de matrícula inhabilita al aprendiz para ingresar al SENA entre 6 meses y hasta 2 años según la gravedad.'
        ]
      },
      {
        title: 'Comité de Evaluación y Seguimiento y Debido Proceso',
        description: 'Órgano consultivo colegiado encargado de recepcionar los informes, citar al aprendiz con mínimo 3 días de antelación, escuchar sus descargos, valorar pruebas y recomendar al Subdirector de Centro la decisión a adoptar.',
        articles: 'Cap. VII, Arts. 19 - 25',
        examples: ['El Subdirector de Centro es la única autoridad competente para expedir la resolución sancionatoria de cancelación.']
      }
    ],
    quickCheck: {
      question: 'En el marco del Acuerdo 009 de 2024, ¿cuál de las siguientes opciones es una MEDIDA FORMATIVA (pedagógica) y NO una sanción disciplinaria registrada?',
      options: [
        'Condicionamiento de matrícula',
        'Cancelación definitiva de matrícula con inhabilidad',
        'Llamado de atención verbal con compromiso pedagógico',
        'Llamado de atención escrito registrado en hoja de vida'
      ],
      correctIndex: 2,
      explanation: 'El llamado de atención verbal es una medida formativa pedagógica de carácter reflexivo que no constituye sanción disciplinaria formal en el historial del aprendiz.'
    }
  },
  {
    id: 'mod-5',
    number: '05',
    title: 'Etapa Productiva y Certificación (Art. 48 Mod. Acuerdo 0002 de 2026)',
    shortDesc: 'Modalidades vigentes de etapa práctica, deberes empresariales, bitácoras y requisitos de titulación.',
    normativeRef: 'Acuerdo 009 de 2024, Art. 48 (Modificado por Acuerdo 0002 de 2026)',
    estimatedMinutes: 7,
    iconName: 'Award',
    accentColor: '#D97706',
    summary: 'El Artículo 48 del Acuerdo 009 de 2024 (modificado por el Acuerdo 0002 de 2026 en el Diario Oficial No. 53.490) regula las alternativas formales para la etapa productiva, asegurando su articulación directa con el perfil de competencias del programa.',
    coreConcepts: [
      {
        title: 'Alternativas Válidas de Etapa Productiva (Art. 48 Vigente)',
        description: 'El aprendiz puede optar por cualquiera de las alternativas autorizadas: 1) Contrato de Aprendizaje (Ley 789 de 2002 con patrocinio y EPS/ARL), 2) Vínculo Laboral o Contractual en el área formativa, 3) Proyecto Productivo / Fondo Emprender SENA, 4) Pasantía en entidades públicas, ONG o empresas, 5) Monitoría institucional en el Centro.',
        articles: 'Art. 48 (Mod. Acuerdo 0002 de 2026)',
        examples: [
          'En el Contrato de Aprendizaje, la empresa paga el apoyo de sostenimiento y afilia al aprendiz a salud y riesgos laborales (ARL).',
          'Si el aprendiz ya trabaja en labores afines a su perfil técnico/tecnológico, puede legalizar la etapa mediante Vínculo Laboral formal.'
        ]
      },
      {
        title: 'Registro de Bitácoras y Visitas de Seguimiento',
        description: 'Durante la etapa productiva, el aprendiz debe registrar periódicamente sus bitácoras de actividades en el sistema y atender las visitas de concertación y seguimiento de su instructor asignado.',
        articles: 'Acuerdo 009 de 2024, Art. 49',
        examples: ['La entrega oportuna de bitácoras cada 15 o 30 días es obligatoria para la evaluación final de la etapa práctica.']
      },
      {
        title: 'Requisitos para la Certificación y Paz y Salvo',
        description: 'Aprobar el 100% de los resultados de aprendizaje (etapa lectiva y práctica), estar a paz y salvo institucional (biblioteca, almacén, bienestar) y contar con documentos de identidad actualizados.',
        articles: 'Acuerdo 009 de 2024, Art. 51',
        examples: ['El título expedido por el SENA acredita las competencias laborales con validez en todo el territorio nacional e internacional.']
      }
    ],
    quickCheck: {
      question: 'Conforme al Artículo 48 del Acuerdo 009 de 2024 (modificado por el Acuerdo 0002 de 2026), ¿cuál de las siguientes opciones describe una alternativa legítima de etapa productiva?',
      options: [
        'Trabajo informal sin supervisión ni relación con las competencias del programa',
        'Contrato de Aprendizaje, Vínculo Laboral afín, Proyecto Productivo SENA, Pasantía o Monitoría institucional',
        'Presentar únicamente una carta de recomendación de un familiar',
        'Abonar el valor de la práctica al Fondo de la Industria de la Construcción (FIC)'
      ],
      correctIndex: 1,
      explanation: 'El Artículo 48 (modificado por el Acuerdo 0002 de 2026) taxativamente establece el Contrato de Aprendizaje, Vínculo Laboral, Proyecto Productivo, Pasantía y Monitoría como las únicas vías oficiales avaladas para la etapa productiva.'
    }
  }
];

export const CASE_DILEMMAS: CaseDilemma[] = [
  {
    id: 'case-1',
    category: 'prohibiciones',
    categoryLabel: 'Propiedad Intelectual & Integridad',
    title: 'El Proyecto Final Descargado de la Red',
    contextLocation: 'Ambiente de Sistemas e Informática',
    character: 'Camilo, aprendiz de etapa lectiva',
    scenario: 'Faltan 48 horas para la entrega del proyecto integrador del trimestre. Camilo y su equipo están atrasados debido a problemas personales. Un amigo de otro grupo le comparte un repositorio completo descargado de GitHub sin licencia abierta, sugiriéndole que cambien los nombres de los autores y el logotipo para entregarlo como propio.',
    options: [
      {
        text: 'Cambiar los nombres y entregar el proyecto ajeno para no perder la entrega del trimestre.',
        isOptimal: false,
        xp: 10,
        feedback: 'Incurrirías en Plagio y Fraude Académico, tipificado en el Acuerdo 009 de 2024 como una falta GRAVE o GRAVÍSIMA contra la propiedad intelectual, con posible sanción de Cancelación de Matrícula.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 9 (Prohibiciones): Queda prohibido plagiar materiales, trabajos o documentos generados en el proceso formativo.'
      },
      {
        text: 'Hablar con franqueza con el instructor, exponer la situación real del avance y solicitar asesoría o un plan concertado de entrega.',
        isOptimal: true,
        xp: 150,
        feedback: '¡Excelente decisión ética! La honestidad académica permite activar el acompañamiento pedagógico del instructor. El reglamento respalda la concertación pedagógica antes que el fraude.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 7 Numeral 8 y Art. 8 Numeral 4: Derecho a recibir orientación y deber de comunicar oportunamente novedades al instructor.'
      },
      {
        text: 'No presentarse a la sesión evaluativa ni avisar al instructor para ganar tiempo.',
        isOptimal: false,
        xp: 20,
        feedback: 'La inasistencia injustificada a una entrega programada genera reporte de falta académica o riesgo de deserción en SofíaPlus/Zajuna.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 8: Es deber del aprendiz asistir puntualmente y justificar en un plazo máximo de 3 días hábiles.'
      }
    ]
  },
  {
    id: 'case-2',
    category: 'deberes',
    categoryLabel: 'Seguridad en Talleres & Porte de Carné',
    title: 'El Olvido del Carné y la Entrada al Taller Mecánico',
    contextLocation: 'Portería Principal y Taller de Máquinas Herramientas',
    character: 'Valentina, aprendiz de Mecatrónica Industrial',
    scenario: 'Valentina llega a su Centro de Formación para una práctica de mecanizado en torno. En la portería se da cuenta de que olvidó su carné institucional en otra maleta. Además, olvidó sus gafas de protección reglamentarias (EPP). Su compañero le propone prestarle un carné viejo de otro aprendiz para entrar sin que el guarda de seguridad lo note.',
    options: [
      {
        text: 'Usar el carné prestado de su compañero para pasar desapercibida y entrar rápido al taller.',
        isOptimal: false,
        xp: 15,
        feedback: 'La suplantación de identidad y el uso indebido de carné es una prohibición expresa en el Acuerdo 009 de 2024 clasificada como falta disciplinaria grave.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 8 Numeral 1 y Art. 9: El carné es personal e intransferible. La suplantación da lugar a apertura de proceso disciplinario.'
      },
      {
        text: 'Dirigirse a la oficina de Bienestar o Coordinación para tramitar el pase provisional y solicitar EPP prestado en almacén de taller.',
        isOptimal: true,
        xp: 150,
        feedback: '¡Correcto! Sigues el conducto regular institucional. El carné provisional certifica tu identidad y jamás se debe ingresar a un taller sin los Elementos de Protección Personal (EPP).',
        legalArticle: 'Acuerdo 009 de 2024, Art. 8: Cumplir con los protocolos de seguridad y salud en el trabajo (SST) y portar la identificación institucional debida.'
      },
      {
        text: 'Saltarse la reja lateral del centro e ingresar al taller esperando que el instructor no revise los EPP.',
        isOptimal: false,
        xp: 0,
        feedback: 'Pone en peligro tu integridad física y constituye una falta gravísima contra la seguridad de las instalaciones institucionales.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 9: Prohibido ingresar por zonas no autorizadas o vulnerar la seguridad física del Centro.'
      }
    ]
  },
  {
    id: 'case-3',
    category: 'derechos',
    categoryLabel: 'Debido Proceso & Garantía de Defensa',
    title: 'El Malentendido en el Salón y la Citación a Comité',
    contextLocation: 'Coordinación Académica',
    character: 'Mateo, aprendiz vocero de ficha',
    scenario: 'Durante un trabajo grupal se rompió una pantalla táctil en la sala multimedia. Un grupo acusa verbalmente a Mateo de haber sido el causante directo sin pruebas. El instructor molesto le dice a Mateo: "Quedas expulsado del SENA desde hoy mismo sin derecho a regresar". ¿Cómo opera el reglamento ante esta situación?',
    options: [
      {
        text: 'Aceptar la orden verbal del instructor e irse a casa porque el instructor tiene la potestad de expulsar aprendices en el momento.',
        isOptimal: false,
        xp: 20,
        feedback: 'Incorrecto. Ningún instructor tiene la facultad legal de expulsar a un aprendiz verbalmente. La sanción de cancelación de matrícula solo la emite el Subdirector de Centro tras debido proceso.',
        legalArticle: 'Acuerdo 009 de 2024, Cap. VII: Garantía del Debido Proceso y competencia privativa de la Subdirección de Centro.'
      },
      {
        text: 'Solicitar respetuosamente la apertura del debido proceso, aportar pruebas, testimonios y acudir al Comité de Evaluación y Seguimiento con su vocero.',
        isOptimal: true,
        xp: 150,
        feedback: '¡Respuesta impecable! Todo aprendiz goza de presunción de inocencia y derecho a la defensa. El Comité de Evaluación y Seguimiento investiga los hechos objetivos antes de que el Subdirector dicte resolución.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 7 Numeral 6 y Arts. 19 - 25: Derecho a ser escuchado, presentar descargos y controvertir pruebas.'
      },
      {
        text: 'Agredir verbalmente al instructor y convocar un paro bloqueando la entrada del centro de formación.',
        isOptimal: false,
        xp: 5,
        feedback: 'La agresión verbal y las vías de hecho constituyen faltas gravísimas que justificarían una sanción disciplinaria real inmediata.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 9: Prohibidas las agresiones físicas o verbales y la obstrucción de la actividad institucional.'
      }
    ]
  },
  {
    id: 'case-4',
    category: 'deberes',
    categoryLabel: 'Incapacidad Médica & Términos Legales',
    title: 'La Urgencia de Salud y el Plazo Reglamentario',
    contextLocation: 'Servicio de Salud / Hogar del Aprendiz',
    character: 'Daniela, aprendiz de Gestión Empresarial',
    scenario: 'Daniela tuvo una emergencia médica el lunes y fue intervenida quirúrgicamente. Su médico le dio 5 días de incapacidad oficial en la EPS. Ella se siente preocupada por las clases que se está perdiendo de la semana de parciales.',
    options: [
      {
        text: 'Esperar a que termine la incapacidad y presentarse el siguiente mes a explicar lo sucedido informalmente.',
        isOptimal: false,
        xp: 25,
        feedback: 'Excederías los tiempos reglamentarios y el sistema podría reportar deserción preventiva injustificada.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 8 Numeral 5: Se debe comunicar y radicar la justificación dentro de los 3 días hábiles.'
      },
      {
        text: 'Enviar escaneo o foto de la incapacidad médica formal al instructor y coordinador dentro de los 3 días hábiles siguientes.',
        isOptimal: true,
        xp: 150,
        feedback: '¡Excelente gestión! Al notificar dentro del plazo legal de 3 días hábiles, los instructores reprograman las evidencias y actividades sin perjuicio académico alguno.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 8: El soporte médico válido ante EPS o IPS protege la vigencia de la matrícula durante convalecencia.'
      },
      {
        text: 'Pagarle a un tercero para que firme su asistencia en las listas diarias durante la semana.',
        isOptimal: false,
        xp: 0,
        feedback: 'Falsedad en documento público y suplantación: falta gravísima con consecuencias penales y disciplinarias.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 9: Prohibida la falsificación o alteración de registros institucionales.'
      }
    ]
  },
  {
    id: 'case-5',
    category: 'etapa_practica',
    categoryLabel: 'Contrato de Aprendizaje (Art. 48 Mod. 2026)',
    title: 'La Oportunidad de Contrato de Aprendizaje',
    contextLocation: 'Oficina de Relaciones Corporativas / Empresa',
    character: 'Sebastián, aprendiz en transición a etapa productiva',
    scenario: 'Sebastián recibe una propuesta de una empresa para firmar un contrato de aprendizaje. Sin embargo, la empresa le solicita firmar un pagaré en blanco y le pide realizar labores de aseo general en la casa particular del gerente.',
    options: [
      {
        text: 'Aceptar inmediatamente porque lo importante es firmar cualquier contrato sin importar las condiciones.',
        isOptimal: false,
        xp: 10,
        feedback: 'El contrato de aprendizaje exige que las labores desempeñadas sean afines y coherentes con el perfil ocupacional del programa de formación SENA.',
        legalArticle: 'Ley 789 de 2002 y Acuerdo 009 de 2024 (Art. 48 modificado por Acuerdo 0002 de 2026): Las actividades prácticas deben desarrollar las competencias del programa matriculado.'
      },
      {
        text: 'Acudir al gestor de etapa práctica del SENA en su Centro de Formación para asesorarse antes de firmar y validar la idoneidad empresarial.',
        isOptimal: true,
        xp: 150,
        feedback: '¡Muy bien! El SENA cuenta con coordinadores y gestores de contratos que verifican las condiciones legales y protegen los derechos del aprendiz frente a abusos laborales.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 48: Acompañamiento institucional permanente en la legalización de alternativas de etapa práctica.'
      },
      {
        text: 'Renunciar al programa SENA para trabajar informalmente sin soporte.',
        isOptimal: false,
        xp: 10,
        feedback: 'Perderías la oportunidad de titularte como profesional técnico o tecnólogo certificado.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 48 y 51: La etapa productiva es requisito indispensable para la certificación.'
      }
    ]
  },
  {
    id: 'case-6',
    category: 'sanciones',
    categoryLabel: 'Plan de Mejoramiento & Superación',
    title: 'El Plan de Mejoramiento no Aprobado en Primera Instancia',
    contextLocation: 'Ambiente de Aprendizaje',
    character: 'Laura, aprendiz de Cocina',
    scenario: 'Laura no logró alcanzar el resultado de aprendizaje de "Seguridad e Inocuidad Alimentaria". Su instructor le formuló un plan de mejoramiento con fecha de entrega para el viernes. Laura entrega la mitad del trabajo y argumenta que tuvo poco tiempo libre.',
    options: [
      {
        text: 'Ignorar las observaciones del instructor y exigir que le aprueben la competencia por haber asistido a clases.',
        isOptimal: false,
        xp: 15,
        feedback: 'La formación en el SENA se basa en competencias demostradas mediante evidencias objetivas, no en mera asistencia.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 8: Es deber cumplir a cabalidad con las actividades del plan de mejoramiento concertado.'
      },
      {
        text: 'Revisar la retroalimentación del instructor, comprometerse formalmente en el comité a subsanar los puntos faltantes y cumplir las fechas estipuladas.',
        isOptimal: true,
        xp: 150,
        feedback: '¡Actitud constructiva! El plan de mejoramiento es la oportunidad pedagógica antes del condicionamiento de matrícula. Asumirlo con rigor asegura tu continuidad.',
        legalArticle: 'Acuerdo 009 de 2024, Arts. 14 y 15: Los compromisos escritos permiten superar deficiencias previas a sanciones mayores.'
      },
      {
        text: 'Abandonar la formación sin presentar retiro voluntario formal.',
        isOptimal: false,
        xp: 5,
        feedback: 'El abandono injustificado activa la deserción con sanción de inhabilidad de seis meses en la plataforma Zajuna/SofíaPlus.',
        legalArticle: 'Acuerdo 009 de 2024, Art. 22: Deserción por inasistencia no justificada durante tres días continuos.'
      }
    ]
  }
];

export const EVALUATION_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    topic: 'Desafío Lúdico: Completa la Frase Normativa',
    question: 'Completa correctamente las palabras clave del nuevo marco normativo del Acuerdo 009 de 2024:',
    options: ['Opción Interactiva'],
    correctIndex: 0,
    legalBasis: 'Acuerdo 009 de 2024, Arts. 1, 3 y 8.',
    explanation: '¡Excelente! El Reglamento del Aprendiz fue adoptado mediante el Acuerdo 009 de 2024, garantizando formación 100% gratuita y estableciendo el plazo de 3 días hábiles para justificar inasistencias.',
    points: 100
  },
  {
    id: 'q2',
    topic: 'Derechos del Aprendiz',
    question: '¿Cuál es la primera medida formativa pedagógica que debe concertarse cuando un aprendiz no evidencia el logro de una competencia?',
    options: [
      'Cancelación definitiva de la matrícula con inhabilidad de 2 años',
      'Asignación concertada de un Plan de Mejoramiento Académico con su instructor',
      'Multa económica descontable del apoyo de sostenimiento',
      'Llamado de atención escrito directo en la hoja de vida'
    ],
    correctIndex: 1,
    legalBasis: 'Acuerdo 009 de 2024, Art. 7 y Art. 14.',
    explanation: 'El plan de mejoramiento es el mecanismo pedagógico preventivo que otorga al aprendiz una ruta clara de actividades para alcanzar los resultados de aprendizaje pendientes.',
    points: 100
  },
  {
    id: 'q3',
    topic: 'Deberes del Aprendiz',
    question: 'Si un aprendiz presenta una calamidad doméstica o enfermedad que le impide asistir al centro de formación, ¿cuál es el plazo reglamentario para justificar su inasistencia?',
    options: [
      'Al momento de graduarse',
      'Dentro de los 3 días hábiles siguientes al hecho con los soportes debidos',
      'Quince días calendario mediante carta notariada',
      'El mismo día en horas de la mañana exclusivamente'
    ],
    correctIndex: 1,
    legalBasis: 'Acuerdo 009 de 2024, Art. 8 Numeral 5.',
    explanation: 'El aprendiz debe presentar la justificación debidamente soportada ante el instructor y la coordinación en un término máximo de tres (3) días hábiles.',
    points: 100
  },
  {
    id: 'q4',
    topic: 'Prohibiciones Críticas',
    question: '¿Qué consecuencia directa acarrea el plagio de un proyecto de formación o evidencia en el SENA?',
    options: [
      'Se le pide que imprima el documento nuevamente',
      'Constituye una falta grave o gravísima que da lugar a proceso disciplinario ante el Comité de Evaluación y Seguimiento',
      'Se le rebaja 10 puntos en la lista de asistencia',
      'No tiene consecuencias si se descargó de una página web pública'
    ],
    correctIndex: 1,
    legalBasis: 'Acuerdo 009 de 2024, Art. 9 y Art. 12.',
    explanation: 'El plagio vulnera la propiedad intelectual y la integridad académica. Es catalogado como falta grave o gravísima según la reiteración y el impacto.',
    points: 100
  },
  {
    id: 'q5',
    topic: 'Debido Proceso',
    question: '¿Quién es la única autoridad competente para expedir la resolución de cancelación de matrícula de un aprendiz?',
    options: [
      'El instructor técnico de la ficha',
      'El Subdirector del Centro de Formación',
      'El vigilante de la portería principal',
      'El vocero estudiantil de los aprendices'
    ],
    correctIndex: 1,
    legalBasis: 'Acuerdo 009 de 2024, Cap. VII (Procedimiento para la aplicación de sanciones).',
    explanation: 'Las sanciones de condicionamiento y cancelación de matrícula son actos administrativos expedidos exclusivamente por el Subdirector del Centro de Formación correspondiente, previo concepto del Comité.',
    points: 100
  },
  {
    id: 'q6',
    topic: 'Deberes y Seguridad',
    question: '¿Cuál es la política institucional sobre el uso del carné del SENA?',
    options: [
      'Es opcional y solo se pide para solicitar libros en biblioteca',
      'Debe portarse de manera permanente y visible en las instalaciones del SENA y es de uso personal e intransferible',
      'Se puede prestar a amigos o familiares para que visiten la cafetería',
      'Solo se exige a los instructores y directivos'
    ],
    correctIndex: 1,
    legalBasis: 'Acuerdo 009 de 2024, Art. 8 Numeral 1.',
    explanation: 'El carné institucional acredita la condición de aprendiz SENA, garantiza la seguridad perimetral de los ambientes y nunca debe ser cedido o prestado.',
    points: 100
  },
  {
    id: 'q7',
    topic: 'Etapa Práctica (Art. 48 Mod. 2026)',
    question: 'Conforme al Artículo 48 del Acuerdo 009 de 2024 (modificado por el Acuerdo 0002 de 2026), ¿cuáles de las siguientes son modalidades válidas para la etapa productiva?',
    options: [
      'Contrato de aprendizaje con patrocinio empresarial',
      'Proyecto productivo avalado institucionalmente (Fondo Emprender)',
      'Vínculo laboral afín o pasantía en entidad pública/ONG',
      'Todas las anteriores son modalidades válidas avaladas por el SENA'
    ],
    correctIndex: 3,
    legalBasis: 'Acuerdo 009 de 2024, Art. 48 (Modificado por Acuerdo 0002 de 2026 en D.O. 53.490).',
    explanation: 'El SENA ofrece múltiples alternativas de etapa productiva: contrato de aprendizaje, vínculo laboral, proyecto formativo/emprendimiento, pasantía y monitoría.',
    points: 100
  },
  {
    id: 'q8',
    topic: 'Sanciones Disciplinarias',
    question: '¿En qué consiste la sanción de "Condicionamiento de Matrícula"?',
    options: [
      'En suspender al aprendiz por 6 meses de todo acceso a internet',
      'En un acto sancionatorio formal por faltas académicas o disciplinarias que condiciona la permanencia del aprendiz al cumplimiento estricto de compromisos y plan de mejora',
      'En cobrarle una fianza económica reembolsable al graduarse',
      'En cambiarlo de ciudad de manera forzosa'
    ],
    correctIndex: 1,
    legalBasis: 'Acuerdo 009 de 2024, Art. 17.',
    explanation: 'El condicionamiento de matrícula alerta al aprendiz de que cualquier reincidencia causará la cancelación definitiva. Cesa cuando cumple satisfactoriamente el plan concertado.',
    points: 100
  },
  {
    id: 'q9',
    topic: 'Debido Proceso & Recursos',
    question: 'Si un aprendiz recibe una sanción que considera injusta, ¿qué recurso legal puede interponer ante el Subdirector de Centro?',
    options: [
      'Recurso de Reposición en los términos establecidos por la ley y el reglamento',
      'Demanda directa sin agotar la vía institucional',
      'Queja verbal al celador de turno',
      'No existe ningún recurso legal de defensa en el SENA'
    ],
    correctIndex: 0,
    legalBasis: 'Acuerdo 009 de 2024, Art. 25 (Garantía del Derecho a la Defensa).',
    explanation: 'Contra el acto administrativo que impone una sanción procede el Recurso de Reposición ante el mismo Subdirector de Centro para que aclare, modifique o revoque la decisión.',
    points: 100
  },
  {
    id: 'q10',
    topic: 'Convivencia y Sustancias Prohibidas',
    question: '¿Qué dispone el reglamento acerca del ingreso o consumo de bebidas alcohólicas o sustancias psicoactivas dentro de los centros formativos?',
    options: [
      'Está permitido únicamente los viernes después de las 6:00 pm',
      'Está estrictamente prohibido y se califica como falta disciplinaria grave o gravísima',
      'Solo se permite si el aprendiz tiene buenas calificaciones',
      'Es un asunto privado que no le concierne a la institución'
    ],
    correctIndex: 1,
    legalBasis: 'Acuerdo 009 de 2024, Art. 9.',
    explanation: 'El SENA es un espacio libre de alcohol y drogas para resguardar la seguridad ocupacional de talleres y laboratorios y fomentar la convivencia sana.',
    points: 100
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b-welcome',
    title: 'Aprendiz Pionero',
    description: 'Iniciaste el recorrido oficial de inducción y configuraste tu perfil institucional.',
    icon: 'Sparkles',
    unlocked: true,
    earnedAt: 'Al inicio'
  },
  {
    id: 'b-modules',
    title: 'Guardián Normativo',
    description: 'Completaste los 5 módulos interactivos del Reglamento del Aprendiz (Acuerdo 009 de 2024 / Mod. Acuerdo 0002 de 2026).',
    icon: 'BookOpenCheck',
    unlocked: false
  },
  {
    id: 'b-dilemmas',
    title: 'Líder Ético SENA',
    description: 'Resolviste con criterio los 6 dilemas y casos prácticos reales del centro de formación.',
    icon: 'Scale',
    unlocked: false
  },
  {
    id: 'b-master',
    title: 'Maestro del Reglamento',
    description: 'Aprobaste la evaluación final con una calificación sobresaliente (>= 80%).',
    icon: 'Trophy',
    unlocked: false
  },
  {
    id: 'b-certified',
    title: 'Certificado de Inducción',
    description: 'Obtuviste el diploma oficial verificable de Inducción del Aprendiz SENA.',
    icon: 'Medal',
    unlocked: false
  }
];

export const STRUCTURED_INDUCTION_PLAN = {
  title: 'Plan Estructurado de Inducción Gamificada SENA 2024-2026',
  subtitle: 'Marco Metodológico Oficial bajo el Acuerdo No. 009 de 2024 (D.O. 52.947) y Acuerdo 0002 de 2026 (D.O. 53.490)',
  objective: 'Garantizar que el 100% de los nuevos aprendices comprendan y apropien sus derechos, deberes, prohibiciones, alternativas de etapa práctica (Art. 48 modificado) y canales de debido proceso de manera amigable, medible y certificada.',
  phases: [
    {
      phaseNumber: 'Fase 1',
      name: 'Sensibilización & Mística Institucional',
      duration: 'Día 1 (4 Horas)',
      activities: [
        'Bienvenida por Subdirección de Centro y Equipo de Bienestar al Aprendiz.',
        'Presentación del nuevo marco normativo del Acuerdo 009 de 2024 (derogatorio del Acuerdo 007 de 2012).',
        'Registro y perfilamiento en la plataforma interactiva (Nombre, Ficha, Programa, Regional).'
      ],
      deliverable: 'Perfil creado + Badge "Aprendiz Pionero" otorgado.'
    },
    {
      phaseNumber: 'Fase 2',
      name: 'Inmersión Normativa Interactiva',
      duration: 'Día 2 (6 Horas)',
      activities: [
        'Exploración de los 5 módulos temáticos: Identidad, Derechos, Deberes, Faltas/Sanciones y Etapa Práctica.',
        'Revisión de artículos clave del nuevo Acuerdo 009 de 2024 y el Art. 48 modificado por el Acuerdo 0002 de 2026.',
        'Micro-evaluaciones diagnósticas instantáneas en cada módulo con animación de confeti.'
      ],
      deliverable: 'Módulos 1 al 5 aprobados + Badge "Guardián Normativo".'
    },
    {
      phaseNumber: 'Fase 3',
      name: 'Gamificación & Simulación de Casos Reales',
      duration: 'Día 3 (4 Horas)',
      activities: [
        'Resolución guiada de 6 dilemas éticos y casos de estudio reales.',
        'Análisis interactivo de situaciones: plagio, carné, incapacidades médicas, comités disciplinarios y alternativas laborales.',
        'Debates grupales mediados por instructores de Ética y Comunicación.'
      ],
      deliverable: 'Casos resueltos con retroalimentación jurídica + Badge "Líder Ético SENA".'
    },
    {
      phaseNumber: 'Fase 4',
      name: 'Evaluación de Salida & Certificación Oficial',
      duration: 'Día 4 (2 Horas)',
      activities: [
        'Evaluación integral gamificada de 10 competencias del reglamento vigente.',
        'Umbral mínimo de aprobación: 80% (800 / 1000 XP). Posibilidad de retroalimentación en preguntas erróneas.',
        'Generación automática del Certificado Oficial con código de verificación QR, firmas y descarga en PNG alta resolución.',
        'Consolidación de métricas en el Panel de Instructores para reporte a Dirección de Formación.'
      ],
      deliverable: 'Certificado oficial descargable (PNG/PDF) + Acta de Inducción consolidada.'
    }
  ],
  keyMetrics: [
    { label: 'Tasa de Aprobación Esperada', target: '>= 95%' },
    { label: 'Reducción de Faltas por Desconocimiento', target: '-65%' },
    { label: 'Tiempo Promedio de Inducción Autoguiada', target: '45 - 60 min' },
    { label: 'Normativa Oficial Vigente', target: 'Acuerdo 009 / 2024' }
  ]
};

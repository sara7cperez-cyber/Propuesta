import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  HeartHandshake, 
  Sparkles, 
  Clock, 
  Mail, 
  MessageSquare, 
  MessagesSquare, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Quote, 
  FileCheck2, 
  Compass, 
  UsersRound, 
  Copy, 
  Check, 
  ExternalLink,
  HelpCircle,
  Lightbulb,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SlideData, SpeakerId } from '../types';
import { BIBLIOGRAPHIC_REFERENCES } from '../data/slidesData';

interface SlideViewerProps {
  slide: SlideData;
  studentNames: Record<SpeakerId, string>;
  onOpenNamesModal: () => void;
  onSelectSlide: (slideNumber: number) => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  slide,
  studentNames,
  onOpenNamesModal,
  onSelectSlide,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  const [selectedField, setSelectedField] = useState<number>(0);
  const [copiedRefId, setCopiedRefId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const handleCopyRef = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRefId(id);
    setTimeout(() => setCopiedRefId(null), 2000);
  };

  const handleCopyAllRefs = () => {
    const allText = BIBLIOGRAPHIC_REFERENCES.map(
      (r, i) => `${i + 1}. ${r.authors} (${r.year}). ${r.title}. ${r.source}.`
    ).join('\n\n');
    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div 
      id={`slide-container-${slide.id}`} 
      className="relative w-full h-full min-h-[620px] lg:min-h-[680px] bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xs transition-all overflow-hidden"
    >
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100/40 dark:bg-sky-900/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Slide Top Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200/70 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-slate-900 text-white dark:bg-white dark:text-slate-950">
            Diapositiva {slide.slideNumber} / {slide.totalSlides}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {slide.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/60 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{slide.timeRange}</span>
            <span className="text-amber-400 dark:text-amber-600">|</span>
            <span className="font-semibold">{slide.durationMin}</span>
          </div>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="my-auto py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full"
          >
            {/* SLIDE 1: PORTADA & INTRODUCCIÓN */}
            {slide.id === 1 && (
              <div className="space-y-6">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 text-xs font-medium mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    Propuesta Didáctica • Conversatorio Virtual
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                    {slide.title}
                  </h1>
                  <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Central question banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-800/80 dark:to-indigo-950/40 border border-sky-100 dark:border-slate-700/80 flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-sky-600 text-white shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-sky-800 dark:text-sky-300 uppercase tracking-wide">
                      Pregunta Detonante del Conversatorio
                    </span>
                    <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 italic mt-0.5 font-medium">
                      "¿Cómo lograr que la educación virtual deje de ser una fría transmisión de contenidos y se convierta en una experiencia dialogante y significativa?"
                    </p>
                  </div>
                </div>

                {/* 3 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {slide.contentDetails.pillars.map((pillar: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700 transition-all shadow-2xs group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400 group-hover:scale-105 transition-transform">
                          {index === 0 && <Users className="w-4 h-4" />}
                          {index === 1 && <HeartHandshake className="w-4 h-4" />}
                          {index === 2 && <Sparkles className="w-4 h-4" />}
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                          {pillar.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Presenters Box */}
                <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Integrantes:
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-medium text-slate-800 dark:text-slate-200">
                        <strong className="text-sky-600 dark:text-sky-400 font-semibold">{studentNames.estudianteA}</strong> (Moderador/a)
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-medium text-slate-800 dark:text-slate-200">
                        <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{studentNames.estudianteB}</strong> (Fundamentación)
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-medium text-slate-800 dark:text-slate-200">
                        <strong className="text-amber-600 dark:text-amber-400 font-semibold">{studentNames.estudianteC}</strong> (Estrategias)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onOpenNamesModal}
                    className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1 shrink-0"
                  >
                    Personalizar nombres →
                  </button>
                </div>
              </div>
            )}

            {/* SLIDE 2: FUNDAMENTACIÓN TEÓRICA */}
            {slide.id === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {slide.title}
                  </h2>
                  <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    {slide.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left Column: Doralba Jaramillo - 3 Campos */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          La Clase Virtual <span className="font-normal text-slate-500">(Cap. 3 - Jaramillo)</span>
                        </h3>
                      </div>
                      <span className="text-[11px] font-medium text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/70 px-2 py-0.5 rounded-full border border-sky-200/60 dark:border-sky-800">
                        Lugar de Encuentro Didáctico
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {slide.contentDetails.jaramilloFields.map((f: any, idx: number) => {
                        const isSelected = selectedField === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedField(idx)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-sky-50/80 dark:bg-sky-950/40 border-sky-300 dark:border-sky-700 ring-1 ring-sky-400/40'
                                : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-sky-500' : idx === 1 ? 'bg-indigo-500' : 'bg-purple-500'}`} />
                                {f.name}
                              </span>
                              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                {f.subtitle}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {f.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Nelson Roldán - Mediaciones & Herramientas */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          <MessagesSquare className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Mediaciones Comunicativas <span className="font-normal text-slate-500">(Cap. 6 - Roldán)</span>
                        </h3>
                      </div>
                      <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800">
                        Contenidos como Mediadores
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {slide.contentDetails.roldanTools.map((t: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {idx === 0 && <Mail className="w-3.5 h-3.5 text-blue-600" />}
                            {idx === 1 && <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />}
                            {idx === 2 && <MessagesSquare className="w-3.5 h-3.5 text-amber-600" />}
                            <span className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                              {t.tool}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 ml-auto">
                              {t.intention}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300">
                            {t.purpose}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Dimension Banner: Yepes & Parra */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-amber-500 text-white shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide">
                      Dimensión Socio-Afectiva en la Virtualidad (Yepes & Parra)
                    </h4>
                    <p className="text-xs text-amber-950/80 dark:text-amber-300/90 mt-0.5">
                      "El calor humano, el respeto y la motivación se transmiten mediante la intención comunicativa y el tono con el que el docente orienta la clase."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 3: SECUENCIA DE ESTRATEGIAS Y RECURSOS */}
            {slide.id === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {slide.title}
                  </h2>
                  <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    {slide.subtitle}
                  </p>
                </div>

                {/* 4 Interactive Phases Process Line */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {slide.contentDetails.phases.map((phase: any, index: number) => {
                    const isSelected = selectedPhase === index;
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedPhase(index)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white dark:bg-slate-800 border-sky-500 dark:border-sky-400 shadow-md ring-2 ring-sky-500/20'
                            : 'bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-7 h-7 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs flex items-center justify-center">
                            {phase.step}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${phase.badgeColor}`}>
                            Fase {phase.step}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                            {phase.name}
                          </h4>
                          <p className="text-xs font-medium text-sky-700 dark:text-sky-400 mb-2">
                            {phase.tools}
                          </p>
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-0.5">
                              Propósito Didáctico:
                            </span>
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                              → {phase.action}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="mt-3 pt-2 text-[11px] font-medium text-sky-600 dark:text-sky-400 flex items-center gap-1">
                            <span>Seleccionada</span>
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Selected Phase Detail Showcase */}
                <div className="p-4 sm:p-5 rounded-xl bg-sky-50/90 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 transition-all">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-sky-200/60 dark:border-sky-800/60">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                        {slide.contentDetails.phases[selectedPhase].step}
                      </span>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        Detalle de la Fase: {slide.contentDetails.phases[selectedPhase].name}
                      </h4>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-700">
                      Herramientas: {slide.contentDetails.phases[selectedPhase].tools}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                    {slide.contentDetails.phases[selectedPhase].objective}
                  </p>
                </div>
              </div>
            )}

            {/* SLIDE 4: RECOMENDACIONES Y CIERRE */}
            {slide.id === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {slide.title}
                  </h2>
                  <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    {slide.subtitle}
                  </p>
                </div>

                {/* 4 Value Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {slide.contentDetails.recommendations.map((rec: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:shadow-xs transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                            {index === 0 && <HeartHandshake className="w-4 h-4" />}
                            {index === 1 && <FileCheck2 className="w-4 h-4" />}
                            {index === 2 && <Compass className="w-4 h-4" />}
                            {index === 3 && <UsersRound className="w-4 h-4" />}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                              Clave {rec.num} • {rec.tag}
                            </span>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                              {rec.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
                        {rec.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Closing quote */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-xs">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm sm:text-base font-medium italic text-slate-100">
                        "{slide.contentDetails.closingPhrase}"
                      </p>
                      <span className="text-[11px] text-sky-300 font-semibold block mt-1">
                        — Síntesis final de Estudiante A (Moderador/a)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 5: REFERENCIAS BIBLIOGRÁFICAS */}
            {slide.id === 5 && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {slide.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {slide.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={handleCopyAllRefs}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-2xs"
                  >
                    {copiedAll ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>¡Copiadas en Portapapeles!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar todas (APA 7)</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {BIBLIOGRAPHIC_REFERENCES.map((ref) => {
                    const apaString = `${ref.authors} (${ref.year}). ${ref.title}. ${ref.source}.`;
                    const isCopied = copiedRefId === ref.id;

                    return (
                      <div
                        key={ref.id}
                        className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/70 px-2 py-0.5 rounded-md border border-sky-200/50 dark:border-sky-900">
                              {ref.chapterOrContext}
                            </span>
                            <button
                              onClick={() => handleCopyRef(ref.id, apaString)}
                              className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                              title="Copiar cita APA"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">
                            {ref.authors} ({ref.year})
                          </h4>
                          <p className="text-xs text-slate-700 dark:text-slate-300 italic mt-0.5 font-medium">
                            {ref.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {ref.source}
                          </p>

                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                            "{ref.quoteOrSummary}"
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap gap-1.5">
                          {ref.keyContributions.slice(0, 2).map((contrib, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[10px] px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300"
                            >
                              • {contrib}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Bottom Bar: Quick jump hint & indicator */}
      <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <span className="font-medium">Navegación:</span>
          <span>Usa los botones interactivos inferiores o las flechas del teclado</span>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => onSelectSlide(num)}
              className={`w-2 h-2 rounded-full transition-all ${
                slide.slideNumber === num
                  ? 'w-6 bg-sky-600 dark:bg-sky-400'
                  : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              }`}
              title={`Ir a diapositiva ${num}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

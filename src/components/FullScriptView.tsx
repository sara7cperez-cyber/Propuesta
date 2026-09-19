import React, { useState } from 'react';
import { 
  Clock, 
  User, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ArrowRight,
  Printer,
  Sparkles,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { SlideData, SpeakerId } from '../types';
import { INITIAL_SPEAKERS } from '../data/slidesData';

interface FullScriptViewProps {
  slides: SlideData[];
  studentNames: Record<SpeakerId, string>;
  onSelectSlide: (index: number) => void;
}

export const FullScriptView: React.FC<FullScriptViewProps> = ({
  slides,
  studentNames,
  onSelectSlide,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);

  const renderText = (rawText: string) => {
    return rawText
      .replace(/{nombreA}/g, studentNames.estudianteA)
      .replace(/{nombreB}/g, studentNames.estudianteB)
      .replace(/{nombreC}/g, studentNames.estudianteC)
      .replace(/\[Nombre de Estudiante A\]/g, studentNames.estudianteA)
      .replace(/\[Nombre de Estudiante B\]/g, studentNames.estudianteB)
      .replace(/\[Nombre de Estudiante C\]/g, studentNames.estudianteC)
      .replace(/\[Nombres de los 3 integrantes\]/g, `${studentNames.estudianteA}, ${studentNames.estudianteB} y ${studentNames.estudianteC}`);
  };

  const handleCopyFullConversatorio = () => {
    let output = "=== PARTE 2: GUION DEL CONVERSATORIO Y DISEÑO DE DIAPOSITIVAS ===\n";
    output += "Duración Total: 12 Minutos | Conversatorio dinámico entre 3 integrantes\n\n";

    slides.forEach(s => {
      output += `\n--- DIAPOSITIVA ${s.slideNumber}: ${s.title.toUpperCase()} ---\n`;
      output += `Tramo: ${s.timeRange} (${s.durationMin})\n\n`;
      s.script.forEach(line => {
        const name = studentNames[line.speakerId];
        const role = line.speakerRole || INITIAL_SPEAKERS[line.speakerId]?.role;
        output += `• ${name} (${role}):\n"${renderText(line.text)}"\n\n`;
      });
    });

    navigator.clipboard.writeText(output);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guion Completo de Ensayo • 12 Minutos</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Conversatorio: Estrategias Comunicativas para EVA
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Interacción articulada entre {studentNames.estudianteA} (Moderador/a), {studentNames.estudianteB} y {studentNames.estudianteC}.
          </p>
        </div>

        <button
          onClick={handleCopyFullConversatorio}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors shrink-0 shadow-xs"
        >
          {copiedAll ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copiedAll ? '¡Guion Copiado!' : 'Copiar Guion Completo'}</span>
        </button>
      </div>

      {/* Script Sections */}
      <div className="space-y-6">
        {slides.map((s, sIdx) => (
          <div
            key={s.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-bold text-sm flex items-center justify-center">
                  {s.slideNumber}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Diapositiva {s.slideNumber}: {s.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{s.timeRange} ({s.durationMin})</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectSlide(sIdx)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
              >
                <span>Ver diapositiva</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Script lines */}
            <div className="mt-5 space-y-4">
              {s.script.map((line, lIdx) => {
                const spk = INITIAL_SPEAKERS[line.speakerId];
                const name = studentNames[line.speakerId];

                return (
                  <div
                    key={lIdx}
                    className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${spk?.badgeBg}`}>
                        {name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {line.speakerRole || spk?.role}
                      </span>
                    </div>
                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed pl-1">
                      "{renderText(line.text)}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

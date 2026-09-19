import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Clock, 
  MessageSquareQuote, 
  Sparkles, 
  User,
  Users
} from 'lucide-react';
import { SlideData, SpeakerId, SpeakerInfo } from '../types';
import { INITIAL_SPEAKERS } from '../data/slidesData';

interface ScriptCompanionProps {
  slide: SlideData;
  studentNames: Record<SpeakerId, string>;
  onOpenNamesModal: () => void;
}

export const ScriptCompanion: React.FC<ScriptCompanionProps> = ({
  slide,
  studentNames,
  onOpenNamesModal,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isPlayingSpeech, setIsPlayingSpeech] = useState<boolean>(false);
  const [activeSpeechIndex, setActiveSpeechIndex] = useState<number | null>(null);

  // Substitute variable placeholders with actual student names
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

  const handleCopyScript = () => {
    const fullScript = slide.script.map(line => {
      const speakerName = studentNames[line.speakerId];
      const role = line.speakerRole || INITIAL_SPEAKERS[line.speakerId]?.role;
      return `${speakerName} (${role}):\n"${renderText(line.text)}"\n`;
    }).join('\n');

    navigator.clipboard.writeText(`--- GUION: ${slide.title} (${slide.timeRange}) ---\n\n${fullScript}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeechLine = (index: number, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta síntesis de voz.');
      return;
    }

    if (isPlayingSpeech && activeSpeechIndex === index) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
      setActiveSpeechIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = renderText(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;

    utterance.onstart = () => {
      setIsPlayingSpeech(true);
      setActiveSpeechIndex(index);
    };

    utterance.onend = () => {
      setIsPlayingSpeech(false);
      setActiveSpeechIndex(null);
    };

    utterance.onerror = () => {
      setIsPlayingSpeech(false);
      setActiveSpeechIndex(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div 
      id="script-companion-panel"
      className="h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between shadow-xs"
    >
      <div>
        {/* Header of Script Panel */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Guion del Conversatorio
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Libreto guiado con tiempos estimados
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyScript}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
              title="Copiar guion de esta diapositiva"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px] font-medium">{copied ? 'Copiado' : 'Copiar'}</span>
            </button>

            <button
              onClick={onOpenNamesModal}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
              title="Personalizar nombres"
            >
              <Users className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Timestamp Info */}
        <div className="my-3 px-3 py-2 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-indigo-900 dark:text-indigo-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Tramo: <strong>{slide.timeRange}</strong></span>
          </div>
          <span className="font-semibold px-2 py-0.5 rounded-sm bg-white dark:bg-slate-800 text-indigo-800 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
            {slide.durationMin}
          </span>
        </div>

        {/* Script Dialogue Lines */}
        <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1">
          {slide.script.map((line, index) => {
            const speaker = INITIAL_SPEAKERS[line.speakerId];
            const currentName = studentNames[line.speakerId];
            const isSpeakingThis = isPlayingSpeech && activeSpeechIndex === index;

            return (
              <div
                key={index}
                className={`p-3.5 rounded-xl border transition-all ${
                  isSpeakingThis 
                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-400 ring-2 ring-sky-400/20' 
                    : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-700/80 hover:border-slate-300'
                }`}
              >
                {/* Speaker Header */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${speaker?.badgeBg}`}>
                      {currentName}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {line.speakerRole || speaker?.role}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSpeechLine(index, line.text)}
                    className="p-1 rounded-md text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                    title={isSpeakingThis ? 'Detener lectura' : 'Escuchar intervención con voz'}
                  >
                    {isSpeakingThis ? (
                      <VolumeX className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Speech text */}
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed pl-1 font-normal">
                  "{renderText(line.text)}"
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer hint */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Práctica de ensayo vocal</span>
        <span>Duración total recomendada: 12 min</span>
      </div>
    </div>
  );
};

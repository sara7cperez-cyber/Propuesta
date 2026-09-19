import React from 'react';
import { 
  Maximize2, 
  Minimize2, 
  Users, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  SplitSquareVertical, 
  BookOpen,
  GraduationCap
} from 'lucide-react';

interface HeaderProps {
  viewMode: 'slide' | 'split' | 'script';
  setViewMode: (mode: 'slide' | 'split' | 'script') => void;
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onOpenNamesModal: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onOpenNamesModal,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const timerPercentage = Math.min(100, (timerSeconds / 720) * 100);

  return (
    <header 
      id="main-app-header"
      className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo / Topic indicator */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white tracking-tight text-sm sm:text-base">
                    Estrategias Comunicativas en EVA
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-medium rounded-md bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800">
                    Conversatorio • 12 min
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                  Didáctica Virtual & Mediación Socio-Afectiva
                </p>
              </div>
            </div>

            {/* Mobile buttons */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={onOpenNamesModal}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                title="Integrantes"
              >
                <Users className="w-4 h-4" />
              </button>
              <button
                onClick={onToggleFullscreen}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                title="Pantalla Completa"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Center: Practice Timer */}
          <div className="flex items-center gap-2.5 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 w-full sm:w-auto justify-between sm:justify-center">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className={`font-mono text-sm font-semibold ${timerSeconds > 720 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {formatTime(timerSeconds)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">/ 12:00</span>
                </div>
              </div>
            </div>

            {/* Mini visual bar */}
            <div className="hidden lg:block w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${timerSeconds > 720 ? 'bg-rose-500' : 'bg-sky-500'}`}
                style={{ width: `${timerPercentage}%` }}
              />
            </div>

            <div className="flex items-center gap-1">
              <button
                id="toggle-timer-btn"
                onClick={onToggleTimer}
                className={`p-1 rounded-md text-xs font-medium transition-colors ${
                  isTimerRunning 
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' 
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200'
                }`}
                title={isTimerRunning ? 'Pausar cronómetro' : 'Iniciar cronómetro de ensayo'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                id="reset-timer-btn"
                onClick={onResetTimer}
                className="p-1 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Reiniciar a 0:00"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* View Mode controls & Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* View Mode segmented control */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs">
              <button
                id="viewmode-slide-btn"
                onClick={() => setViewMode('slide')}
                className={`px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                  viewMode === 'slide'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Solo diapositiva para proyectar"
              >
                <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span className="hidden sm:inline">Diapositiva</span>
              </button>

              <button
                id="viewmode-split-btn"
                onClick={() => setViewMode('split')}
                className={`px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                  viewMode === 'split'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Diapositiva + Guion sincronizado"
              >
                <SplitSquareVertical className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Diapositiva + Guion</span>
              </button>

              <button
                id="viewmode-script-btn"
                onClick={() => setViewMode('script')}
                className={`px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                  viewMode === 'script'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Libreto completo de conversatorio"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Guion</span>
              </button>
            </div>

            {/* Edit students button */}
            <button
              id="header-edit-names-btn"
              onClick={onOpenNamesModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Integrantes</span>
            </button>

            {/* Fullscreen toggle */}
            <button
              id="header-fullscreen-btn"
              onClick={onToggleFullscreen}
              className="hidden sm:flex p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Modo pantalla completa'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

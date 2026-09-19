import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Layers, 
  FileText, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SlideData } from '../types';

interface SlideNavigationProps {
  slides: SlideData[];
  currentSlideIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
}

export const SlideNavigation: React.FC<SlideNavigationProps> = ({
  slides,
  currentSlideIndex,
  onPrev,
  onNext,
  onSelectSlide,
}) => {
  const currentSlide = slides[currentSlideIndex];
  const isFirst = currentSlideIndex === 0;
  const isLast = currentSlideIndex === slides.length - 1;

  return (
    <div 
      id="interactive-slide-navigation"
      className="sticky bottom-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Previous Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <button
            id="nav-prev-slide-btn"
            onClick={onPrev}
            disabled={isFirst}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              isFirst
                ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs hover:border-sky-400'
            }`}
            title="Ir a la diapositiva anterior (Flecha Izquierda)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <span className="text-xs font-medium text-slate-500 sm:hidden">
            {currentSlideIndex + 1} de {slides.length}
          </span>

          {/* Next Button for mobile */}
          <button
            id="nav-next-slide-btn-mobile"
            onClick={onNext}
            disabled={isLast}
            className={`sm:hidden flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              isLast
                ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                : 'border-sky-600 bg-sky-600 text-white hover:bg-sky-700 shadow-xs'
            }`}
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Interactive Slide Tabs / Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1 px-1">
          {slides.map((s, idx) => {
            const isActive = currentSlideIndex === idx;
            return (
              <button
                key={s.id}
                id={`slide-tab-btn-${s.id}`}
                onClick={() => onSelectSlide(idx)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                title={`Diapositiva ${s.slideNumber}: ${s.title}`}
              >
                <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                  isActive 
                    ? 'bg-sky-500 text-white' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {s.slideNumber}
                </span>
                
                <span className="hidden lg:inline truncate max-w-[140px]">
                  {s.id === 1 ? 'Portada' : s.id === 2 ? 'Fundamentación' : s.id === 3 ? 'Estrategias' : s.id === 4 ? 'Recomendaciones' : 'Bibliografía'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Button for Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-900 dark:text-white block">
              {currentSlide.category}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {currentSlideIndex + 1} de {slides.length} diapositivas
            </span>
          </div>

          <button
            id="nav-next-slide-btn"
            onClick={onNext}
            disabled={isLast}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              isLast
                ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                : 'border-sky-600 bg-sky-600 text-white hover:bg-sky-700 shadow-xs hover:shadow-md'
            }`}
            title="Ir a la siguiente diapositiva (Flecha Derecha o Espacio)"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

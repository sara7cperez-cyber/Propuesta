import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES, INITIAL_SPEAKERS } from './data/slidesData';
import { SpeakerId } from './types';
import { Header } from './components/Header';
import { SlideViewer } from './components/SlideViewer';
import { ScriptCompanion } from './components/ScriptCompanion';
import { SlideNavigation } from './components/SlideNavigation';
import { StudentNamesModal } from './components/StudentNamesModal';
import { FullScriptView } from './components/FullScriptView';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'slide' | 'split' | 'script'>('split');
  const [isNamesModalOpen, setIsNamesModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Participant Names State with localStorage persistence
  const [studentNames, setStudentNames] = useState<Record<SpeakerId, string>>(() => {
    try {
      const saved = localStorage.getItem('conversatorio_student_names');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      estudianteA: 'Estudiante A',
      estudianteB: 'Estudiante B',
      estudianteC: 'Estudiante C',
    };
  });

  const handleSaveNames = (newNames: Record<SpeakerId, string>) => {
    setStudentNames(newNames);
    try {
      localStorage.setItem('conversatorio_student_names', JSON.stringify(newNames));
    } catch {
      // ignore
    }
  };

  // 12-Minute Practice Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isTimerRunning && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleToggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  // Navigation handlers
  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(SLIDES.length - 1, prev + 1));
  }, []);

  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
    if (viewMode === 'script') {
      setViewMode('split');
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input or modal
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        isNamesModalOpen
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key >= '1' && e.key <= '5') {
        const targetIndex = parseInt(e.key, 10) - 1;
        if (targetIndex < SLIDES.length) {
          setCurrentSlideIndex(targetIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, isNamesModalOpen]);

  // Fullscreen toggle handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <div className="min-h-screen bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Top Application Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        onToggleTimer={handleToggleTimer}
        onResetTimer={handleResetTimer}
        onOpenNamesModal={() => setIsNamesModalOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {viewMode === 'script' ? (
          <FullScriptView
            slides={SLIDES}
            studentNames={studentNames}
            onSelectSlide={handleSelectSlide}
          />
        ) : viewMode === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Slide Presentation Area (7 cols on large) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
              <SlideViewer
                slide={currentSlide}
                studentNames={studentNames}
                onOpenNamesModal={() => setIsNamesModalOpen(true)}
                onSelectSlide={(num) => setCurrentSlideIndex(num - 1)}
              />
            </div>

            {/* Companion Script Teleprompter (5 cols on large) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
              <ScriptCompanion
                slide={currentSlide}
                studentNames={studentNames}
                onOpenNamesModal={() => setIsNamesModalOpen(true)}
              />
            </div>
          </div>
        ) : (
          /* Slide Only Mode (Full Width) */
          <div className="w-full max-w-5xl mx-auto flex flex-col">
            <SlideViewer
              slide={currentSlide}
              studentNames={studentNames}
              onOpenNamesModal={() => setIsNamesModalOpen(true)}
              onSelectSlide={(num) => setCurrentSlideIndex(num - 1)}
            />
          </div>
        )}
      </main>

      {/* Bottom Interactive Navigation */}
      <SlideNavigation
        slides={SLIDES}
        currentSlideIndex={currentSlideIndex}
        onPrev={handlePrevSlide}
        onNext={handleNextSlide}
        onSelectSlide={setCurrentSlideIndex}
      />

      {/* Student Names Customization Modal */}
      <StudentNamesModal
        isOpen={isNamesModalOpen}
        onClose={() => setIsNamesModalOpen(false)}
        names={studentNames}
        onSave={handleSaveNames}
      />
    </div>
  );
}

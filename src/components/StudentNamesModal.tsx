import React, { useState } from 'react';
import { X, UserCheck, Users } from 'lucide-react';
import { SpeakerId } from '../types';

interface StudentNamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  names: Record<SpeakerId, string>;
  onSave: (newNames: Record<SpeakerId, string>) => void;
}

export const StudentNamesModal: React.FC<StudentNamesModalProps> = ({
  isOpen,
  onClose,
  names,
  onSave,
}) => {
  const [tempNames, setTempNames] = useState<Record<SpeakerId, string>>(names);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(tempNames);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div 
        id="student-names-modal"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                Integrantes del Conversatorio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personaliza los nombres que aparecerán en las diapositivas y el guión
              </p>
            </div>
          </div>
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Estudiante A <span className="text-sky-600 dark:text-sky-400 font-normal">(Moderador/a)</span>
            </label>
            <input
              id="input-estudiante-a"
              type="text"
              value={tempNames.estudianteA}
              onChange={(e) => setTempNames({ ...tempNames, estudianteA: e.target.value })}
              placeholder="Ej. Sara Pérez"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Estudiante B <span className="text-emerald-600 dark:text-emerald-400 font-normal">(Fundamentación)</span>
            </label>
            <input
              id="input-estudiante-b"
              type="text"
              value={tempNames.estudianteB}
              onChange={(e) => setTempNames({ ...tempNames, estudianteB: e.target.value })}
              placeholder="Ej. Carlos Mendoza"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Estudiante C <span className="text-amber-600 dark:text-amber-400 font-normal">(Estrategias y Recursos)</span>
            </label>
            <input
              id="input-estudiante-c"
              type="text"
              value={tempNames.estudianteC}
              onChange={(e) => setTempNames({ ...tempNames, estudianteC: e.target.value })}
              placeholder="Ej. Elena Restrepo"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="pt-3 flex gap-3">
            <button
              id="cancel-modal-btn"
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              id="save-names-btn"
              type="submit"
              className="flex-1 py-2 px-4 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              Guardar Nombres
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

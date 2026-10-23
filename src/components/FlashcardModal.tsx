import React, { useState } from 'react';
import { Layers, Search, Award, BookOpen, Compass, Eye, EyeOff, RotateCw, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { MapLayer, LearningMode } from '../types/atlas';
import { flashcards } from '../data/atlas';

export const FlashcardModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  if (!isOpen) return null;

  const card = flashcards[currentIdx] || flashcards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIdx((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIdx((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans">
        <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Daily 10 Revision Flashcards</h3>
              <p className="text-[11px] text-slate-400">Card {currentIdx + 1} of {flashcards.length}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Card Content Area */}
        <div className="p-6 flex flex-col items-center justify-center min-h-[260px] text-center select-none cursor-pointer"
             onClick={() => setIsFlipped(!isFlipped)}>
          <div className="w-full p-6 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-inner min-h-[220px] flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-semibold">{card.topic}</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/60">{card.examTag}</span>
            </div>

            <div className="my-auto py-4">
              {!isFlipped ? (
                <div>
                  <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-2">Question / Prompt</span>
                  <p className="text-sm font-bold text-slate-100 leading-snug">{card.front}</p>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <span className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase block mb-2">Verified Answer</span>
                  <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line text-left font-sans">{card.back}</p>
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-2 border-t border-slate-800/80">
              <RotateCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Tap card to {isFlipped ? 'show question' : 'flip answer'}</span>
            </div>
          </div>

          {/* Hint option */}
          {card.hint && (
            <div className="mt-3">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowHint(!showHint); }}
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" /> {showHint ? `Hint: ${card.hint}` : 'Show Hint'}
              </button>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button
            onClick={handleNext}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1 transition-colors"
          >
            Next Card <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, RotateCcw, Award, Sparkles, 
  ChevronRight, BookOpen, Layers, Filter 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizQuestions } from '../data/atlas';
import { QuizQuestion } from '../types/atlas';

export const ExamQuizModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  // Filter questions
  const filteredQuestions = selectedCategory === 'All' 
    ? quizQuestions 
    : quizQuestions.filter(q => q.category === selectedCategory);

  const currentQ: QuizQuestion = filteredQuestions[currentIdx] || quizQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < filteredQuestions.length) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">UPSC & State PSC Exam Map Quiz</h3>
              <p className="text-xs text-slate-400">Authentic Multiple Choice & Map Identification Assessment</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Category Filters */}
        {!isFinished && (
          <div className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-950/30 border-b border-slate-800/80 overflow-x-auto text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            {['All', 'Geography', 'Rivers & Water', 'History', 'Environment', 'Polity'].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIdx(0);
                  setSelectedOption(null);
                  setIsAnswered(false);
                  setIsFinished(false);
                }}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isFinished ? (
            <>
              {/* Question metadata */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                  Question {currentIdx + 1} of {filteredQuestions.length}
                </span>
                <span className="font-semibold text-amber-400">
                  Category: {currentQ.category}
                </span>
              </div>

              {/* Question Text */}
              <h4 className="text-base font-bold text-white leading-snug">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600';
                  
                  if (isAnswered) {
                    if (idx === currentQ.correctAnswer) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'opacity-50 bg-slate-800/40 border-slate-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === currentQ.correctAnswer && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box after answer */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 animate-fade-in">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5" /> Exam Explanation & Key Rationale
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Finished Summary Screen */
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white">Quiz Completed!</h3>
              <p className="text-sm text-slate-400">
                You scored <strong className="text-emerald-400 text-lg">{score}</strong> out of <strong className="text-slate-200">{filteredQuestions.length}</strong>
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isFinished && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Score: <strong className="text-amber-400">{score}</strong>
            </div>
            {isAnswered && (
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
              >
                <span>{currentIdx + 1 === filteredQuestions.length ? 'View Results' : 'Next Question'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

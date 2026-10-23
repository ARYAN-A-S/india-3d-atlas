import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, ChevronLeft, ChevronRight, Droplet, 
  MapPin, Compass, Award, ExternalLink, Sparkles, Navigation, CheckCircle2 
} from 'lucide-react';
import { riverTraces } from '../data/atlas';
import { RiverTraceJourney, RiverTraceWaypoint } from '../types/atlas';

interface TraceRiverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFocusWaypoint: (coords: [number, number]) => void;
  initialRiverId?: string;
}

export const TraceRiverModal: React.FC<TraceRiverModalProps> = ({
  isOpen,
  onClose,
  onFocusWaypoint,
  initialRiverId = 'ganga'
}) => {
  const journeys = riverTraces;
  const [selectedRiverIdx, setSelectedRiverIdx] = useState<number>(0);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Set initial river if provided
  useEffect(() => {
    if (initialRiverId) {
      const idx = journeys.findIndex(j => j.riverId === initialRiverId);
      if (idx !== -1) {
        setSelectedRiverIdx(idx);
        setCurrentStepIdx(0);
      }
    }
  }, [initialRiverId]);

  const currentJourney = journeys[selectedRiverIdx] || journeys[0];
  const waypoints = currentJourney.waypoints;
  const currentWaypoint: RiverTraceWaypoint = waypoints[currentStepIdx] || waypoints[0];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev < waypoints.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 4200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, waypoints.length]);

  // Center camera whenever step changes
  useEffect(() => {
    if (currentWaypoint) {
      onFocusWaypoint(currentWaypoint.coordinates);
    }
  }, [currentStepIdx, selectedRiverIdx]);

  if (!isOpen) return null;

  const progressPercent = Math.round(((currentStepIdx + 1) / waypoints.length) * 100);

  const getStageBadgeColor = (stage: string) => {
    switch (stage) {
      case 'Origin': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Confluence': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Dam/Barrage': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Key City': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Bifurcation': return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'Mouth/Delta': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">Follow the River (Source-to-Mouth)</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                  Interactive Guided Journey
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Trace major river systems step-by-step from glacial origins to delta mouths with UPSC exam notes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* River Selector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 py-2.5 overflow-x-auto scrollbar-none gap-2 shrink-0">
          {journeys.map((j, idx) => (
            <button
              key={j.riverId}
              onClick={() => {
                setSelectedRiverIdx(idx);
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedRiverIdx === idx
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
              }`}
            >
              <span>{j.riverName.split('(')[0].trim()}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                selectedRiverIdx === idx ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-900 text-slate-400'
              }`}>
                {j.totalLengthKm} km
              </span>
            </button>
          ))}
        </div>

        {/* Journey Progress Bar */}
        <div className="px-5 pt-4 pb-2 shrink-0">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 flex items-center gap-1 font-semibold">
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              Waypoint {currentStepIdx + 1} of {waypoints.length}
            </span>
            <span className="text-cyan-400 font-mono font-bold">{progressPercent}% from Source to Sea</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/60">
            <div 
              className="bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Waypoint Steps Breadcrumbs */}
        <div className="flex gap-2 overflow-x-auto px-5 py-2.5 scrollbar-none shrink-0 border-b border-slate-800/60">
          {waypoints.map((wp, idx) => (
            <button
              key={wp.id}
              onClick={() => {
                setCurrentStepIdx(idx);
                setIsPlaying(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                currentStepIdx === idx
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{wp.stage}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Main Stage Card */}
          <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${getStageBadgeColor(currentWaypoint.stage)}`}>
                  {currentWaypoint.stage}
                </span>
                <h4 className="text-xl font-black text-white mt-2 leading-tight">
                  {currentWaypoint.title}
                </h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  Coordinates: {currentWaypoint.coordinates[1]}° N, {currentWaypoint.coordinates[0]}° E
                </p>
              </div>

              <button
                onClick={() => onFocusWaypoint(currentWaypoint.coordinates)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
                title="Fly camera to this coordinate on the 3D map"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Fly Camera</span>
              </button>
            </div>

            {/* Geographical Description */}
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
              {currentWaypoint.description}
            </div>

            {/* High-Yield Exam Note */}
            <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" /> High-Yield Exam Note (UPSC / State PSC)
              </span>
              <p className="text-xs text-amber-200 leading-relaxed font-sans">
                {currentWaypoint.examNote}
              </p>
            </div>
          </div>

          {/* Quick Basin Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Glacial / Geographical Origin</span>
              <span className="text-xs font-semibold text-slate-200 mt-1 block">{currentJourney.originText}</span>
            </div>
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Mouth / Sea Drainage</span>
              <span className="text-xs font-semibold text-slate-200 mt-1 block">{currentJourney.mouthText}</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isPlaying 
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Auto-Trace' : 'Auto-Trace Journey'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentStepIdx === 0}
              onClick={() => {
                setCurrentStepIdx(i => Math.max(0, i - 1));
                setIsPlaying(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-slate-200 border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              disabled={currentStepIdx === waypoints.length - 1}
              onClick={() => {
                setCurrentStepIdx(i => Math.min(waypoints.length - 1, i + 1));
                setIsPlaying(false);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-slate-950 flex items-center gap-1 transition-all shadow-md"
            >
              <span>Next Stage</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

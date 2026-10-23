import React, { useState } from 'react';
import { 
  Search, Layers, BookOpen, Compass, Award, 
  Droplet, Mountain, ShieldCheck, Sparkles, X, ChevronDown 
} from 'lucide-react';
import { MapLayer, LearningMode } from '../types/atlas';
import { searchAtlas, UniversalSearchResult } from '../data/atlas';
import { getStateData } from '../data/atlas/states';

interface TopNavbarProps {
  learningMode: LearningMode;
  setLearningMode: (mode: LearningMode) => void;
  activeLayers: Record<MapLayer, boolean>;
  toggleLayer: (layer: MapLayer) => void;
  onSelectSearchResult: (result: UniversalSearchResult) => void;
  onOpenQuiz: () => void;
  onOpenFlashcards: () => void;
  onOpenTraceRiver: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  learningMode,
  setLearningMode,
  activeLayers,
  toggleLayer,
  onSelectSearchResult,
  onOpenQuiz,
  onOpenFlashcards,
  onOpenTraceRiver
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<UniversalSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showLayerMenu, setShowLayerMenu] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 1) {
      const res = searchAtlas(val);
      setSearchResults(res);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSelectResult = (item: UniversalSearchResult) => {
    onSelectSearchResult(item);
    setIsSearching(false);
    setSearchQuery('');
  };

  return (
    <header className="h-16 bg-slate-900/90 border-b border-slate-800 px-4 flex items-center justify-between gap-4 backdrop-blur-md z-30 select-none relative font-sans">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-emerald-600 p-[1.5px] shadow-lg">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400 font-black text-sm">
            IN
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-black tracking-tight text-white uppercase">
              India 3D Learning Atlas
            </h1>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              EXAM PRO
            </span>
          </div>
          <p className="text-[10px] text-slate-400 hidden sm:block">
            UPSC • State PSCs • SSC • CDS • NDA • Railway
          </p>
        </div>
      </div>

      {/* Universal Search Bar */}
      <div className="flex-1 max-w-md relative">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search state, river, peak, dam, park, history, polity..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery.trim().length > 1 && setIsSearching(true)}
            className="w-full pl-9 pr-8 py-1.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setIsSearching(false); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Autocomplete Dropdown */}
        {isSearching && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto z-50">
            {searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectResult(item)}
                className="p-2.5 border-b border-slate-800/80 hover:bg-slate-800/60 cursor-pointer transition-colors flex items-start gap-2.5"
              >
                <div className="p-1 rounded bg-slate-800 text-amber-400 text-xs shrink-0 mt-0.5">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 ml-2 shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Layer Toggles & Exam Controls (Desktop) */}
      <div className="hidden md:flex items-center gap-2 shrink-0">
        {/* Layer Visibility Menu */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Map Layers</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showLayerMenu && (
            <div className="absolute right-0 top-full mt-1.5 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 space-y-1">
              {[
                { id: 'states', label: 'States & UTs' },
                { id: 'rivers', label: 'Rivers & Basins' },
                { id: 'mountains', label: 'Mountains & Peaks' },
                { id: 'passes', label: 'Passes & Channels' },
                { id: 'dams', label: 'Dams & Reservoirs' },
                { id: 'parks', label: 'National Parks' },
                { id: 'minerals', label: 'Minerals & Mines' },
                { id: 'infrastructure', label: 'Ports & Infra' },
                { id: 'history', label: 'Historical Sites' },
                { id: 'districts', label: 'Districts (594)' },
              ].map((layer) => (
                <label
                  key={layer.id}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer text-xs text-slate-300"
                >
                  <span>{layer.label}</span>
                  <input
                    type="checkbox"
                    checked={activeLayers[layer.id as MapLayer] ?? false}
                    onChange={() => toggleLayer(layer.id as MapLayer)}
                    className="accent-amber-500 rounded"
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Trace River Guided Mode Button */}
        <button
          onClick={onOpenTraceRiver}
          className="px-3 py-1.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 text-xs font-bold text-cyan-300 flex items-center gap-1.5 transition-all shadow-sm"
          title="Step-by-step guided journey from river source to mouth"
        >
          <Droplet className="w-3.5 h-3.5 text-cyan-400" />
          <span>Trace River</span>
        </button>

        {/* Flashcards Button */}
        <button
          onClick={onOpenFlashcards}
          className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Daily 10 Cards</span>
        </button>

        {/* Exam Quiz Modal Button */}
        <button
          onClick={onOpenQuiz}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
        >
          <Award className="w-3.5 h-3.5" />
          <span>Exam Quiz</span>
        </button>
      </div>

      {/* Layer Visibility Sheet for Mobile (When activated via bottom or top) */}
      {showLayerMenu && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end justify-center p-3">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-4 shadow-2xl space-y-2 animate-slide-up mb-16">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">Interactive Map Layers</h4>
              </div>
              <button
                onClick={() => setShowLayerMenu(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1 max-h-60 overflow-y-auto">
              {[
                { id: 'states', label: 'States & UTs' },
                { id: 'rivers', label: 'Rivers System' },
                { id: 'mountains', label: 'Mountains & Peaks' },
                { id: 'passes', label: 'Passes & Channels' },
                { id: 'dams', label: 'Dams & Reservoirs' },
                { id: 'parks', label: 'National Parks' },
                { id: 'minerals', label: 'Minerals & Mines' },
                { id: 'infrastructure', label: 'Ports & Infra' },
                { id: 'history', label: 'Historical Sites' },
                { id: 'districts', label: 'Districts (594)' },
              ].map((layer) => (
                <label
                  key={layer.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 text-xs text-slate-200"
                >
                  <span className="truncate pr-1">{layer.label}</span>
                  <input
                    type="checkbox"
                    checked={activeLayers[layer.id as MapLayer] ?? false}
                    onChange={() => toggleLayer(layer.id as MapLayer)}
                    className="accent-amber-500 rounded h-4 w-4 shrink-0"
                  />
                </label>
              ))}
            </div>
            <button
              onClick={() => setShowLayerMenu(false)}
              className="w-full py-2 bg-amber-500 text-slate-950 rounded-xl font-bold text-xs mt-2"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Mobile Native Bottom Navigation Bar (Fixed at bottom on phones) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 border-t border-slate-800 backdrop-blur-lg flex items-center justify-around py-2 px-2 shadow-2xl">
        <button
          onClick={() => setShowLayerMenu(!showLayerMenu)}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${showLayerMenu ? 'text-amber-400' : 'text-slate-400 hover:text-white'}`}
        >
          <Layers className="w-4 h-4" />
          <span>Layers</span>
        </button>

        <button
          onClick={onOpenTraceRiver}
          className="flex flex-col items-center gap-1 text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <Droplet className="w-4 h-4" />
          <span>Voyage</span>
        </button>

        <button
          onClick={onOpenFlashcards}
          className="flex flex-col items-center gap-1 text-[10px] font-semibold text-amber-300 hover:text-amber-200 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>Cards</span>
        </button>

        <button
          onClick={onOpenQuiz}
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <Award className="w-4 h-4" />
          <span>Quiz</span>
        </button>
      </nav>
    </header>
  );
};

import React, { useState } from 'react';
import { 
  X, BookOpen, MapPin, ExternalLink, Award, Landmark, 
  Layers, Compass, Droplet, Trees, Flame, ShieldAlert, CheckCircle2,
  Sparkles, Factory, Wheat, Gem, Anchor, Mountain, Info,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { StateData, RiverData, PhysicalFeature, DamData, LakeData, ProtectedArea, HistoricalSite } from '../types/atlas';

interface DetailPanelProps {
  selectedFeature: any | null;
  featureType: string;
  onClose: () => void;
  onSelectFeatureByName?: (name: string, type: string) => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({
  selectedFeature,
  featureType,
  onClose,
  onSelectFeatureByName
}) => {
  // Default to 'all' so clicking ANY state immediately reveals its complete geography, exam facts, economy, history, and environment
  const [activeTab, setActiveTab] = useState<'all' | 'geo' | 'exam' | 'economy' | 'history' | 'environment' | 'admin'>('all');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  if (!selectedFeature) return null;

  // Mobile Minimized Peek Bar
  if (isMinimized) {
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl mx-2 mb-2 p-3 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 text-slate-100 font-sans">
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsMinimized(false)}>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              {featureType.toUpperCase()}
            </span>
            <h3 className="text-sm font-black text-white truncate">{selectedFeature.name}</h3>
          </div>
          <p className="text-[11px] text-slate-400 truncate mt-0.5">
            {featureType === 'state' 
              ? `Capital: ${selectedFeature.capital} • ${selectedFeature.administrativeDivisions?.districtsCount || ''} Districts` 
              : selectedFeature.type || selectedFeature.category || selectedFeature.summary || 'Tap to expand full exam notes'}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsMinimized(false)}
            className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 shadow"
            title="Expand Full Details"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span className="text-[11px]">Notes</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Render State / UT Comprehensive View
  if (featureType === 'state') {
    const s = selectedFeature as (StateData & { selectedDistrict?: any });
    const isAll = activeTab === 'all';

    return (
      <div className="h-full flex flex-col bg-slate-900 border-l border-slate-800 text-slate-100 shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md flex items-start justify-between relative shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {s.type || 'State / UT'}
              </span>
              {s.administrativeDivisions?.districtsCount && (
                <span className="text-xs text-slate-400 font-medium">
                  {s.administrativeDivisions.districtsCount} Districts
                </span>
              )}
              {s.areaSqKm && (
                <span className="text-xs text-slate-400">
                  • {s.areaSqKm.toLocaleString()} km²
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">{s.name}</h2>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-0.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" /> 
              Capital: <strong className="text-amber-300">{s.capital}</strong>
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button 
              onClick={() => setIsMinimized(true)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors md:hidden"
              title="Minimize to Peek Map"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Section Tabs Filter */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 overflow-x-auto scrollbar-none text-xs font-semibold px-2 shrink-0">
          {[
            { id: 'all', label: '🌟 All Details' },
            { id: 'exam', label: '🏆 Exam Facts' },
            { id: 'geo', label: '🌊 Geography & Rivers' },
            { id: 'economy', label: '🌾 Economy & Minerals' },
            { id: 'history', label: '🏛️ History & Culture' },
            { id: 'environment', label: '🌲 Environment & Parks' },
            { id: 'admin', label: '📜 Administration' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 whitespace-nowrap transition-all border-b-2 text-xs ${
                activeTab === tab.id
                  ? 'border-amber-400 text-amber-300 bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Unified Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-7 text-sm text-slate-300">
          
          {/* Selected District Callout (if clicked via district) */}
          {s.selectedDistrict && (
            <div className="bg-amber-950/30 border border-amber-500/40 p-4 rounded-2xl animate-fade-in shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4 text-amber-400" /> Inspected District: {s.selectedDistrict.name}
              </div>
              <p className="text-xs text-slate-200 mt-1">
                <strong>District Headquarters:</strong> {s.selectedDistrict.headquarters}
              </p>
              {s.selectedDistrict.examFact && (
                <p className="text-xs text-amber-200/90 mt-1.5 leading-relaxed bg-amber-950/40 p-2.5 rounded-lg border border-amber-700/30">
                  ⚡ {s.selectedDistrict.examFact}
                </p>
              )}
            </div>
          )}

          {/* Quick Key Metrics Grid */}
          {(isAll || activeTab === 'admin') && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Formation</span>
                  <span className="text-xs font-semibold text-slate-200 mt-0.5 block truncate">{s.formationDate || 'N/A'}</span>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Area</span>
                  <span className="text-xs font-semibold text-slate-200 mt-0.5 block">{s.areaSqKm?.toLocaleString()} km²</span>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Population</span>
                  <span className="text-xs font-semibold text-slate-200 mt-0.5 block">{s.population2011 ? `${(s.population2011 / 10000000).toFixed(2)} Cr` : 'N/A'}</span>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Parliamentary</span>
                  <span className="text-xs font-semibold text-slate-200 mt-0.5 block">LS: {s.administrativeDivisions?.lokSabhaSeats} | RS: {s.administrativeDivisions?.rajyaSabhaSeats}</span>
                </div>
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Judicial Jurisdiction</span>
                  <span className="text-xs font-semibold text-slate-200 mt-0.5 block truncate">{s.administrativeDivisions?.highCourt}</span>
                </div>
              </div>

              {/* Official Languages */}
              {s.officialLanguages && s.officialLanguages.length > 0 && (
                <div className="flex items-center gap-2 p-2.5 bg-slate-800/40 rounded-xl border border-slate-700/50 text-xs">
                  <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-slate-400 font-medium">Official Languages:</span>
                  <span className="text-slate-200 font-semibold">{s.officialLanguages.join(', ')}</span>
                </div>
              )}

              {/* Neighboring States */}
              {s.neighboringStates && s.neighboringStates.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Bordering States & UTs</span>
                  <div className="flex flex-wrap gap-1.5">
                    {s.neighboringStates.map((nb, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700">
                        {nb}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* International Boundaries */}
              {s.internationalBorders && s.internationalBorders.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-1.5">International Boundaries</span>
                  <div className="flex flex-wrap gap-1.5">
                    {s.internationalBorders.map((ib, i) => (
                      <span key={i} className="px-2.5 py-1 bg-rose-950/40 text-rose-300 text-xs rounded-md border border-rose-800/60 font-semibold">
                        {ib}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 1. Verified Competitive Exam Facts */}
          {(isAll || activeTab === 'exam') && s.examFacts && s.examFacts.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" /> High-Yield Facts for UPSC & State PSCs
                </span>
                <span className="text-[11px] text-amber-400/80 font-mono font-bold">{s.examFacts.length} Verified Facts</span>
              </div>
              <div className="space-y-2.5">
                {s.examFacts.map((fact, idx) => (
                  <div key={idx} className="bg-slate-800/50 hover:bg-slate-800/80 transition-colors p-3.5 rounded-xl border border-slate-700/60 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/40">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Complete Physical Geography & Hydrology */}
          {(isAll || activeTab === 'geo') && s.geography && (
            <div className="space-y-4 pt-2">
              <div className="pb-2 border-b border-slate-800 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Physical Geography & River Systems</h3>
              </div>

              {/* Physiography Description */}
              {s.geography.physiography && (
                <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Physiographic Classification</span>
                  <p className="text-xs text-slate-200 leading-relaxed">{s.geography.physiography}</p>
                </div>
              )}

              {/* Major Rivers */}
              {s.geography.majorRivers && s.geography.majorRivers.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-cyan-400" /> Major Rivers & Drainage
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {s.geography.majorRivers.map((r, i) => (
                      <span key={i} className="px-2.5 py-1 bg-cyan-950/40 text-cyan-300 text-xs rounded-lg border border-cyan-800/60 font-medium">
                        💧 {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mountains & Hills */}
              {s.geography.mountainsHills && s.geography.mountainsHills.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Mountain className="w-3.5 h-3.5 text-amber-400" /> Mountain Ranges, Hills & Peaks
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {s.geography.mountainsHills.map((m, i) => (
                      <span key={i} className="px-2.5 py-1 bg-amber-950/30 text-amber-300 text-xs rounded-lg border border-amber-800/50 font-medium">
                        ⛰️ {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Climate, Forest & Soil Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {s.geography.forestCoverPercent !== undefined && (
                  <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Forest Cover (ISFR)</span>
                    <span className="text-xs font-bold text-emerald-400 mt-1 block">{s.geography.forestCoverPercent}% of state area</span>
                  </div>
                )}
                {s.geography.climate && (
                  <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Climate Type</span>
                    <span className="text-xs font-medium text-slate-200 mt-1 block">{s.geography.climate}</span>
                  </div>
                )}
              </div>

              {/* Soil Types */}
              {s.geography.soilTypes && s.geography.soilTypes.length > 0 && (
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Predominant Soil Types</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {s.geography.soilTypes.map((soil, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">
                        {soil}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Economy, Agriculture & Minerals */}
          {(isAll || activeTab === 'economy') && s.economy && (
            <div className="space-y-4 pt-2">
              <div className="pb-2 border-b border-slate-800 flex items-center gap-2">
                <Wheat className="w-4 h-4 text-lime-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-lime-400">Economy, Agriculture & Minerals</h3>
              </div>

              {/* Major Crops */}
              {s.economy.majorCrops && s.economy.majorCrops.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Major Agricultural Crops</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {s.economy.majorCrops.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 bg-lime-950/40 text-lime-300 text-xs rounded-lg border border-lime-800/50 font-medium">
                        🌾 {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Minerals */}
              {s.economy.majorMinerals && s.economy.majorMinerals.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Minerals & Energy Resources</h4>
                  <div className="space-y-1.5">
                    {s.economy.majorMinerals.map((m, i) => (
                      <div key={i} className="p-2.5 bg-slate-800/50 rounded-xl border border-slate-700/60 text-xs text-slate-200 flex items-start gap-2">
                        <Gem className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Industrial Clusters */}
              {s.economy.majorIndustries && s.economy.majorIndustries.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Manufacturing & Industrial Hubs</h4>
                  <div className="space-y-1.5">
                    {s.economy.majorIndustries.map((ind, i) => (
                      <div key={i} className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-700/50 text-xs text-slate-200 flex items-start gap-2">
                        <Factory className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ports & Power Projects */}
              {s.economy.majorPortsPower && s.economy.majorPortsPower.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Major Ports & Power Projects</h4>
                  <div className="space-y-1.5">
                    {s.economy.majorPortsPower.map((pp, i) => (
                      <div key={i} className="p-2.5 bg-indigo-950/20 rounded-xl border border-indigo-800/40 text-xs text-indigo-200 flex items-start gap-2">
                        <Anchor className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{pp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. History, Architecture & Culture */}
          {(isAll || activeTab === 'history') && s.historyCulture && (
            <div className="space-y-4 pt-2">
              <div className="pb-2 border-b border-slate-800 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">History, Architecture & Cultural Heritage</h3>
              </div>

              {/* Historical Kingdoms */}
              {s.historyCulture.historicalKingdoms && s.historyCulture.historicalKingdoms.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Historical Dynasties & Kingdoms</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {s.historyCulture.historicalKingdoms.map((k, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-800 text-slate-200 text-xs rounded-lg border border-slate-700 font-medium">
                        👑 {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Monuments */}
              {s.historyCulture.majorMonuments && s.historyCulture.majorMonuments.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Architectural Monuments & Heritage Sites</h4>
                  <div className="space-y-1.5">
                    {s.historyCulture.majorMonuments.map((mon, i) => (
                      <div key={i} className="p-2.5 bg-slate-800/50 rounded-xl border border-slate-700/60 text-xs text-slate-200">
                        🏛️ {mon}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Classical & Folk Dances */}
              {s.historyCulture.classicalFolkDances && s.historyCulture.classicalFolkDances.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Classical & Folk Dances</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {s.historyCulture.classicalFolkDances.map((d, i) => (
                      <span key={i} className="px-2.5 py-1 bg-purple-950/40 text-purple-300 text-xs rounded-lg border border-purple-800/50 font-medium">
                        🎭 {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Festivals */}
              {s.historyCulture.festivals && s.historyCulture.festivals.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Prominent Festivals</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {s.historyCulture.festivals.map((f, i) => (
                      <span key={i} className="px-2.5 py-1 bg-rose-950/30 text-rose-300 text-xs rounded-lg border border-rose-800/50 font-medium">
                        🎉 {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* GI Tags */}
              {s.historyCulture.giTaggedProducts && s.historyCulture.giTaggedProducts.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">GI-Tagged Indigenous Products</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {s.historyCulture.giTaggedProducts.map((gi, i) => (
                      <span key={i} className="px-2.5 py-1 bg-emerald-950/30 text-emerald-300 text-xs rounded-lg border border-emerald-800/50 font-medium">
                        🏷️ {gi}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* UNESCO Sites */}
              {s.historyCulture.unescoSites && s.historyCulture.unescoSites.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">UNESCO World Heritage Sites</h4>
                  <div className="space-y-1.5">
                    {s.historyCulture.unescoSites.map((u, i) => (
                      <div key={i} className="p-2.5 bg-amber-950/25 rounded-xl border border-amber-800/40 text-xs text-amber-200 font-semibold">
                        🌐 {u}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. Environment, Protected Forests & Wildlife */}
          {(isAll || activeTab === 'environment') && s.environment && (
            <div className="space-y-4 pt-2">
              <div className="pb-2 border-b border-slate-800 flex items-center gap-2">
                <Trees className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Environment, Protected Areas & Wildlife</h3>
              </div>

              {/* National Parks */}
              {s.environment.nationalParks && s.environment.nationalParks.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Trees className="w-3.5 h-3.5 text-emerald-400" /> National Parks
                  </h4>
                  <div className="space-y-1.5">
                    {s.environment.nationalParks.map((np, i) => (
                      <div key={i} className="p-2.5 bg-emerald-950/20 rounded-xl border border-emerald-800/40 text-xs text-emerald-200 flex items-center gap-2">
                        <span>🌲</span>
                        <span className="font-medium">{np}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tiger Reserves */}
              {s.environment.tigerReserves && s.environment.tigerReserves.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Project Tiger Reserves</h4>
                  <div className="space-y-1.5">
                    {s.environment.tigerReserves.map((tr, i) => (
                      <div key={i} className="p-2.5 bg-amber-950/20 rounded-xl border border-amber-800/40 text-xs text-amber-200 flex items-center gap-2 font-medium">
                        <span>🐅</span>
                        <span>{tr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ramsar Wetlands */}
              {s.environment.ramsarSites && s.environment.ramsarSites.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Ramsar Wetlands of International Importance</h4>
                  <div className="space-y-1.5">
                    {s.environment.ramsarSites.map((rs, i) => (
                      <div key={i} className="p-2.5 bg-cyan-950/20 rounded-xl border border-cyan-800/40 text-xs text-cyan-200 flex items-center gap-2 font-medium">
                        <span>🌊</span>
                        <span>{rs}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Wildlife Species */}
              {s.environment.keySpecies && s.environment.keySpecies.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Endemic & Protected Wildlife</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {s.environment.keySpecies.map((sp, i) => (
                      <span key={i} className="px-2.5 py-1 bg-emerald-950/30 text-emerald-300 text-xs rounded-lg border border-emerald-800/50 font-medium">
                        🐾 {sp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. Authoritative Sources */}
          {(isAll || activeTab === 'admin') && s.sources && s.sources.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Authoritative Data Provenance</span>
              <div className="grid grid-cols-1 gap-2">
                {s.sources.map((src, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-slate-800/30 rounded-lg border border-slate-700/40 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{src}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // Render Generic Detail View for Rivers, Mountains, Dams, Lakes, Minerals, Ports, etc.
  return (
    <div className="h-full flex flex-col bg-slate-900 border-l border-slate-800 text-slate-100 shadow-2xl overflow-hidden font-sans">
      <div className="p-5 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md flex items-start justify-between shrink-0">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            {featureType.toUpperCase()}
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1.5">{selectedFeature.name}</h2>
          {selectedFeature.category && (
            <p className="text-xs text-slate-400 mt-0.5">{selectedFeature.category}</p>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button 
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors md:hidden"
            title="Minimize to Peek Map"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm text-slate-300">
        
        {/* River Details */}
        {featureType === 'river' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Total Length</span>
                <span className="text-xs font-bold text-cyan-400 mt-1 block">{selectedFeature.lengthKm} km</span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Flow Direction</span>
                <span className="text-xs font-medium text-slate-200 mt-1 block">{selectedFeature.directionOfFlow}</span>
              </div>
            </div>

            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50 space-y-2">
              <div>
                <span className="text-[11px] text-slate-400 block font-bold">Glacial / Geographical Origin</span>
                <span className="text-xs font-semibold text-slate-200">{selectedFeature.origin}</span>
              </div>
              <div className="pt-2 border-t border-slate-700/50">
                <span className="text-[11px] text-slate-400 block font-bold">Mouth / Drainage Destination</span>
                <span className="text-xs text-slate-200">{selectedFeature.mouth}</span>
              </div>
            </div>

            {selectedFeature.statesCrossed && (
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">States Crossed</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFeature.statesCrossed.map((st: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* District Details */}
        {featureType === 'district' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">State / UT</span>
                <span className="text-xs font-bold text-amber-400 mt-1 block">{selectedFeature.state}</span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Headquarters</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">{selectedFeature.headquarters}</span>
              </div>
            </div>
            {selectedFeature.examFact && (
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block mb-1">Key Administrative & Exam Fact</span>
                <p className="text-xs text-slate-200 leading-relaxed">{selectedFeature.examFact}</p>
              </div>
            )}
          </div>
        )}

        {/* Mineral Deposit Details */}
        {featureType === 'mineral' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Mineral / Commodity</span>
                <span className="text-xs font-bold text-amber-400 mt-1 block">{selectedFeature.mineral}</span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Geological Type</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">{selectedFeature.type}</span>
              </div>
            </div>
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block font-bold">Location</span>
              <span className="text-xs text-slate-200 mt-0.5 block">{selectedFeature.district}, {selectedFeature.state}</span>
              {selectedFeature.description && (
                <div className="mt-2 pt-2 border-t border-slate-700/50">
                  <span className="text-[11px] text-slate-400 block font-bold">Geological Description</span>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{selectedFeature.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Infrastructure & Seaport Details */}
        {featureType === 'infrastructure' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Category</span>
                <span className="text-xs font-bold text-sky-400 mt-1 block">{selectedFeature.category}</span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Port Type</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">{selectedFeature.type}</span>
              </div>
            </div>
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block font-bold">State & District</span>
              <span className="text-xs text-slate-200 mt-0.5 block">{selectedFeature.district}, {selectedFeature.state}</span>
              {selectedFeature.significance && (
                <div className="mt-2 pt-2 border-t border-slate-700/50">
                  <span className="text-[11px] text-slate-400 block font-bold">Economic Significance</span>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{selectedFeature.significance}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mountain & Physical Details */}
        {featureType === 'mountain' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Feature Category</span>
                <span className="text-xs font-bold text-orange-400 mt-1 block">{selectedFeature.category}</span>
              </div>
              {selectedFeature.elevationM && (
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block font-bold">Elevation</span>
                  <span className="text-xs font-bold text-slate-200 mt-1 block">{selectedFeature.elevationM.toLocaleString()} meters</span>
                </div>
              )}
            </div>
            {selectedFeature.statesCovered && (
              <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50">
                <span className="text-[11px] text-slate-400 block mb-1 font-bold">States Covered</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFeature.statesCovered.map((st: string, idx: number) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selectedFeature.highestPeakInfo && (
              <div className="bg-amber-950/20 p-3.5 rounded-xl border border-amber-800/40">
                <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block mb-1">Highest Peak Convention</span>
                <p className="text-xs text-amber-200 leading-relaxed">{selectedFeature.highestPeakInfo}</p>
              </div>
            )}
            {selectedFeature.description && (
              <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-300 leading-relaxed">{selectedFeature.description}</p>
              </div>
            )}
          </div>
        )}

        {/* Protected Area (Park / Tiger Reserve) Details */}
        {featureType === 'park' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Classification</span>
                <span className="text-xs font-bold text-emerald-400 mt-1 block">{selectedFeature.category}</span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Formation Year</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">{selectedFeature.formationYear || 'N/A'}</span>
              </div>
            </div>
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block font-bold">State & District</span>
              <span className="text-xs text-slate-200 mt-0.5 block">{selectedFeature.district ? `${selectedFeature.district}, ` : ''}{selectedFeature.state}</span>
              {selectedFeature.areaSqKm && (
                <div className="mt-2 pt-2 border-t border-slate-700/50">
                  <span className="text-[11px] text-slate-400 block font-bold">Total Protected Area</span>
                  <span className="text-xs font-semibold text-emerald-300">{selectedFeature.areaSqKm} sq km</span>
                </div>
              )}
            </div>
            {selectedFeature.keySpecies && selectedFeature.keySpecies.length > 0 && (
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Flagship Fauna</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFeature.keySpecies.map((sp: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-1 bg-emerald-950/40 text-emerald-300 text-xs rounded-lg border border-emerald-800/50 font-medium">
                      🐾 {sp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Historical Site Details */}
        {featureType === 'history' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Historical Era</span>
                <span className="text-xs font-bold text-yellow-400 mt-1 block">{selectedFeature.period}</span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Time Period</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">{selectedFeature.yearPeriod}</span>
              </div>
            </div>
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block font-bold">Historical Causes & Significance</span>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">{selectedFeature.causesConsequences}</p>
            </div>
            {selectedFeature.associatedPersonalities && selectedFeature.associatedPersonalities.length > 0 && (
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Associated Personalities</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFeature.associatedPersonalities.map((p: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-1 bg-yellow-950/30 text-yellow-300 text-xs rounded-lg border border-yellow-800/50">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Lake & Wetland Details */}
        {featureType === 'lake' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Hydrological Type</span>
                <span className="text-xs font-bold text-cyan-400 mt-1 block">{selectedFeature.type}</span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Ramsar Status</span>
                <span className="text-xs font-bold text-emerald-400 mt-1 block">{selectedFeature.ramsarStatus ? 'Designated Ramsar Site' : 'Not designated'}</span>
              </div>
            </div>
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block font-bold">State</span>
              <span className="text-xs text-slate-200 mt-0.5 block">{selectedFeature.state}</span>
              {selectedFeature.ecologicalImportance && (
                <div className="mt-2 pt-2 border-t border-slate-700/50">
                  <span className="text-[11px] text-slate-400 block font-bold">Ecological Importance</span>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{selectedFeature.ecologicalImportance}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mountain Pass Details */}
        {featureType === 'pass' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Mountain Range</span>
                <span className="text-xs font-bold text-violet-400 mt-1 block">{selectedFeature.range}</span>
              </div>
              {selectedFeature.elevationM && (
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block font-bold">Elevation</span>
                  <span className="text-xs font-bold text-slate-200 mt-1 block">{selectedFeature.elevationM.toLocaleString()} meters</span>
                </div>
              )}
            </div>
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50 space-y-2">
              <div>
                <span className="text-[11px] text-slate-400 block font-bold">Connects / Route</span>
                <span className="text-xs font-semibold text-slate-200">{selectedFeature.connects}</span>
              </div>
              {selectedFeature.strategicSignificance && (
                <div className="pt-2 border-t border-slate-700/50">
                  <span className="text-[11px] text-slate-400 block font-bold">Strategic Significance</span>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{selectedFeature.strategicSignificance}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Maritime Channel & Strait Details */}
        {featureType === 'channel' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {selectedFeature.latitudeDeg && (
                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block font-bold">Latitude</span>
                  <span className="text-xs font-bold text-cyan-400 mt-1 block">{selectedFeature.latitudeDeg}° N Latitude</span>
                </div>
              )}
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Category</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">Maritime Strait / Channel</span>
              </div>
            </div>
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50 space-y-2">
              <div>
                <span className="text-[11px] text-slate-400 block font-bold">Separates Geographic Landmasses</span>
                <span className="text-xs font-semibold text-slate-200">{selectedFeature.separates}</span>
              </div>
              {selectedFeature.significance && (
                <div className="pt-2 border-t border-slate-700/50">
                  <span className="text-[11px] text-slate-400 block font-bold">Strategic Importance</span>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{selectedFeature.significance}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dam Details */}
        {featureType === 'dam' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">River</span>
                <span className="text-xs font-bold text-sky-400 mt-1 block">{selectedFeature.river}</span>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-bold">Height</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">{selectedFeature.heightM} meters</span>
              </div>
            </div>
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block font-bold">Purpose & Utility</span>
              <span className="text-xs text-slate-200 mt-0.5 block">{selectedFeature.purpose}</span>
              {selectedFeature.reservoirName && (
                <div className="mt-2 pt-2 border-t border-slate-700/50">
                  <span className="text-[11px] text-slate-400 block font-bold">Reservoir Name</span>
                  <span className="text-xs font-semibold text-slate-200">{selectedFeature.reservoirName}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Exam Focus Points for All Generic Features */}
        {selectedFeature.examFacts && selectedFeature.examFacts.length > 0 && (
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Exam Focus Points
            </h4>
            <div className="space-y-2.5">
              {selectedFeature.examFacts.map((fact: string, idx: number) => (
                <div key={idx} className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60 text-xs text-slate-200 leading-relaxed font-sans">
                  • {fact}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

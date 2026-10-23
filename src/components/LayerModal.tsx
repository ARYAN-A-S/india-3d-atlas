import React from 'react';
import { 
  X, Layers, Check, Mountain, Droplet, Trees, 
  Landmark, Gem, Anchor, Compass, ShieldCheck, MapPin, Sparkles 
} from 'lucide-react';
import { MapLayer } from '../types/atlas';

interface LayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLayers: Record<MapLayer, boolean>;
  toggleLayer: (layer: MapLayer) => void;
}

const LAYER_CONFIG: Array<{
  id: MapLayer;
  label: string;
  count: string;
  icon: string;
  color: string;
  description: string;
}> = [
  { id: 'states', label: 'States & Union Territories', count: '28 + 8', icon: '🏛️', color: 'text-amber-400', description: 'Complete state boundaries, capitals, and administrative metadata' },
  { id: 'rivers', label: 'Major Rivers & Drainage', count: '97 Systems', icon: '🌊', color: 'text-cyan-400', description: 'Ganga, Indus, Brahmaputra, Godavari, Krishna & tributaries' },
  { id: 'mountains', label: 'Mountain Ranges & Peaks', count: '15 Peaks', icon: '🏔️', color: 'text-emerald-400', description: 'Himalayas, K2, Kanchenjunga, Western & Eastern Ghats' },
  { id: 'passes', label: 'Mountain Passes & Channels', count: '16 + 7', icon: '🧭', color: 'text-rose-400', description: 'Zoji La, Nathu La, Karakoram, 8°/9°/10° Maritime Channels' },
  { id: 'dams', label: 'Major Dams & Reservoirs', count: '15 Dams', icon: '💧', color: 'text-blue-400', description: 'Tehri, Bhakra Nangal, Hirakud, Sardar Sarovar' },
  { id: 'parks', label: 'National Parks & Reserves', count: '15 Parks', icon: '🐅', color: 'text-lime-400', description: 'Jim Corbett, Kaziranga, Sundarbans, Gir Lion Sanctuary' },
  { id: 'minerals', label: 'Minerals & Mining Belts', count: '10 Belts', icon: '💎', color: 'text-amber-300', description: 'Chota Nagpur, Kolar Gold, Kudremukh Iron, Digboi Oil' },
  { id: 'infrastructure', label: 'Major Seaports & Ports', count: '12 Ports', icon: '⚓', color: 'text-indigo-400', description: 'JNPT, Chennai, Kandla, Kolkata, Paradip, Cochin' },
  { id: 'history', label: 'Historical & Heritage Sites', count: '12 Sites', icon: '📜', color: 'text-purple-400', description: 'Harappa, Dholavira, Ajanta, Sanchi, Hampi, Konark' },
  { id: 'districts', label: 'District Boundaries', count: '594 Districts', icon: '📍', color: 'text-slate-300', description: 'Verified district lines with headquarters & exam facts' }
];

export const LayerModal: React.FC<LayerModalProps> = ({
  isOpen,
  onClose,
  activeLayers,
  toggleLayer
}) => {
  if (!isOpen) return null;

  const activeCount = Object.values(activeLayers).filter(Boolean).length;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md select-none"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">Interactive Map Layers</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {activeCount} Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Toggle thematic layers to customize your exam learning view
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Layer Toggle List */}
        <div 
          className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 touch-pan-y overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        >
          {LAYER_CONFIG.map((layer) => {
            const isActive = activeLayers[layer.id] ?? false;

            return (
              <div
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isActive 
                    ? 'bg-slate-800/80 border-cyan-500/50 shadow-md shadow-cyan-950/20' 
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40 opacity-70'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-xl w-8 h-8 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center shrink-0">
                    {layer.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">{layer.label}</h4>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                        {layer.count}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{layer.description}</p>
                  </div>
                </div>

                {/* Touch Checkbox Pill */}
                <div 
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                    isActive 
                      ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-sm' 
                      : 'border-slate-700 bg-slate-900/60'
                  }`}
                >
                  {isActive && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/80 flex items-center gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-slate-950 rounded-2xl font-black text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Apply & View Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};

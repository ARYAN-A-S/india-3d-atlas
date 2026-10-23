import React, { useState, useRef, useEffect } from 'react';
import { MapLayer } from '../types/atlas';
import { getStateData } from '../data/atlas/states';
import { 
  rivers, 
  physicalFeatures, 
  dams, 
  lakes, 
  protectedAreas, 
  historicalSites, 
  minerals, 
  infrastructure, 
  districts, 
  stateLabels,
  passes,
  channels
} from '../data/atlas';
import indiaSvgPaths from '../data/atlas/india_svg_paths.json';
import indiaRiverPaths from '../data/atlas/india_river_paths.json';
import stateColors from '../data/atlas/state_colors.json';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Compass, 
  MapPin, 
  Tag, 
  Navigation,
  Sparkles,
  Anchor,
  Layers
} from 'lucide-react';

interface Map3DCanvasProps {
  activeLayers: Record<MapLayer, boolean>;
  selectedFeature: any | null;
  onSelectFeature: (feature: any, type: string) => void;
  hoveredFeature: { name: string; type: string; summary?: string } | null;
  setHoveredFeature: (feat: { name: string; type: string; summary?: string } | null) => void;
  focusCoordinates?: [number, number] | null;
  activeWaypointCoords?: [number, number] | null;
  onOpenLayers?: () => void;
}

export const Map3DCanvas: React.FC<Map3DCanvasProps> = ({
  activeLayers,
  selectedFeature,
  onSelectFeature,
  hoveredFeature,
  setHoveredFeature,
  focusCoordinates,
  activeWaypointCoords,
  onOpenLayers
}) => {
  const [scale, setScale] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 0.72;
    }
    return 1.0;
  });
  const [translate, setTranslate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [tilt, setTilt] = useState<{ rotateX: number; rotateZ: number }>({ rotateX: 28, rotateZ: -4 });

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const initialPinchDistRef = useRef<number | null>(null);
  const initialScaleRef = useRef<number>(1);
  const hasMovedSignificantlyRef = useRef<boolean>(false);

  const pathsLookup = indiaSvgPaths as Record<string, string>;
  const colorsLookup = stateColors as Record<string, number>;

  // Convert hex number to CSS string
  const getHexColor = (num?: number) => {
    if (!num) return '#1e293b';
    return '#' + num.toString(16).padStart(6, '0');
  };

  // Mercator Projection Helper matching atlas data
  const projectCoords = (lon: number, lat: number): [number, number] => {
    const x = 21.819495 * lon - 1300.11705;
    const latRad = (lat * Math.PI) / 180;
    const mercY = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = -1249.85552 * mercY + 1042.16218;
    return [x, y];
  };

  // Mouse pan interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 || e.button === 1 || e.button === 2) {
      setIsPanning(true);
      hasMovedSignificantlyRef.current = false;
      setStartPan({ x: e.clientX - translate.x, y: e.clientY - translate.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    const newX = e.clientX - startPan.x;
    const newY = e.clientY - startPan.y;
    if (Math.abs(newX - translate.x) > 3 || Math.abs(newY - translate.y) > 3) {
      hasMovedSignificantlyRef.current = true;
    }
    setTranslate({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setTimeout(() => {
      hasMovedSignificantlyRef.current = false;
    }, 100);
  };

  // Mobile Touch Gestures (Single finger Pan & Two finger Pinch-Zoom)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX - translate.x,
        y: e.touches[0].clientY - translate.y
      };
      hasMovedSignificantlyRef.current = false;
      setIsPanning(true);
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchDistRef.current = dist;
      initialScaleRef.current = scale;
      setIsPanning(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && touchStartRef.current) {
      const newX = e.touches[0].clientX - touchStartRef.current.x;
      const newY = e.touches[0].clientY - touchStartRef.current.y;
      if (Math.abs(newX - translate.x) > 3 || Math.abs(newY - translate.y) > 3) {
        hasMovedSignificantlyRef.current = true;
      }
      setTranslate({ x: newX, y: newY });
    } else if (e.touches.length === 2 && initialPinchDistRef.current) {
      hasMovedSignificantlyRef.current = true;
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = currentDist / initialPinchDistRef.current;
      const newScale = Math.max(0.45, Math.min(6.5, initialScaleRef.current * factor));
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
    touchStartRef.current = null;
    initialPinchDistRef.current = null;
    setTimeout(() => {
      hasMovedSignificantlyRef.current = false;
    }, 120);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    setScale((prev) => Math.max(0.45, Math.min(6.5, prev * zoomFactor)));
  };

  const handleResetView = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    setScale(isMobile ? 0.72 : 1.0);
    setTranslate({ x: 0, y: 0 });
    setIs3DMode(false);
    setTilt({ rotateX: 28, rotateZ: -4 });
  };

  // Jump to specific geographic region
  const jumpToRegion = (region: string) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const mult = isMobile ? 0.75 : 1.0;
    const centers: Record<string, { x: number; y: number; s: number }> = {
      all: { x: 0, y: 0, s: isMobile ? 0.72 : 1.0 },
      north: { x: 50, y: 140, s: 1.6 * mult },
      south: { x: -30, y: -220, s: 1.7 * mult },
      east: { x: -160, y: -40, s: 1.7 * mult },
      west: { x: 180, y: 20, s: 1.6 * mult },
      central: { x: 0, y: -20, s: 1.6 * mult },
      northeast: { x: -380, y: 70, s: 2.1 * mult },
      islands: { x: -360, y: -290, s: 2.2 * mult }
    };
    const c = centers[region] || centers.all;
    setScale(c.s);
    setTranslate({ x: c.x, y: c.y });
  };

  // Center on coordinates when focusCoordinates change
  useEffect(() => {
    if (!focusCoordinates) return;
    const [lon, lat] = focusCoordinates;
    const [svgX, svgY] = projectCoords(lon, lat);
    // viewBox center is ~ (505, 550)
    const targetScale = 2.4;
    const dx = (505 - svgX) * targetScale * 0.7;
    const dy = (550 - svgY) * targetScale * 0.7;
    setScale(targetScale);
    setTranslate({ x: dx, y: dy });
  }, [focusCoordinates]);

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onWheel={handleWheel}
      onContextMenu={(e) => e.preventDefault()}
      className="relative w-full h-full select-none overflow-hidden bg-gradient-to-b from-[#030712] via-[#071328] to-[#020617] cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
      style={{ perspective: is3DMode ? '1100px' : 'none', touchAction: 'none' }}
    >
      {/* Precision Grid Matrix Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* Quick Region Bar at Top (Horizontally scrollable on mobile phones) */}
      <div className="absolute top-3 left-3 right-16 sm:right-auto sm:left-4 z-20 flex items-center gap-1.5 bg-slate-900/90 border border-slate-800/80 rounded-xl px-2.5 py-1.5 text-xs backdrop-blur-md shadow-2xl overflow-x-auto scrollbar-none max-w-[calc(100vw-80px)] sm:max-w-none">
        <Navigation className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline mr-1">Region:</span>
        {[
          { id: 'all', label: 'All India' },
          { id: 'north', label: 'North' },
          { id: 'south', label: 'South' },
          { id: 'central', label: 'Central' },
          { id: 'west', label: 'West' },
          { id: 'east', label: 'East' },
          { id: 'northeast', label: 'Northeast' },
          { id: 'islands', label: 'Islands' }
        ].map(r => (
          <button
            key={r.id}
            onClick={() => jumpToRegion(r.id)}
            className="px-2 py-0.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-[11px] font-medium whitespace-nowrap"
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* 3D Map Transform Stage */}
      <div 
        className="relative transition-transform duration-100 ease-out origin-center flex items-center justify-center w-full h-full"
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale}) ${is3DMode ? `rotateX(${tilt.rotateX}deg) rotateZ(${tilt.rotateZ}deg)` : ''}`,
          transformStyle: is3DMode ? 'preserve-3d' : 'flat'
        }}
      >
        {/* Subtle glow / elevation beneath mainland */}
        <div 
          className="absolute w-[620px] h-[680px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none"
          style={{ transform: is3DMode ? 'translateZ(-30px)' : 'none' }}
        />

        {/* Master SVG Canvas with tight, verified India viewBox */}
        <svg 
          viewBox="175 195 660 710" 
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-h-[92vh] max-w-[92vw] overflow-visible drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
          style={{ transform: is3DMode ? 'translateZ(10px)' : 'none' }}
        >
          <defs>
            <filter id="border-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* 1. Indian States Base Layer */}
          {activeLayers.states && (
            <g id="states-layer">
              {Object.entries(pathsLookup).map(([name, pathD]) => {
                const isSelected = selectedFeature?.name === name;
                const isHovered = hoveredFeature?.name === name;
                const baseColor = getHexColor(colorsLookup[name]);

                return (
                  <path
                    key={name}
                    d={pathD}
                    fill={isSelected ? '#F59E0B' : isHovered ? '#38BDF8' : baseColor}
                    fillOpacity={isSelected ? 0.95 : isHovered ? 0.88 : 0.72}
                    stroke={isSelected ? '#FDE68A' : isHovered ? '#FFFFFF' : '#38BDF8'}
                    strokeWidth={isSelected ? 3.0 : isHovered ? 2.2 : 0.9}
                    strokeLinejoin="round"
                    className="transition-colors duration-150 cursor-pointer"
                    onMouseEnter={() => {
                      const st = getStateData(name);
                      setHoveredFeature({
                        name,
                        type: 'STATE / UT',
                        summary: st ? `Capital: ${st.capital} | Area: ${st.areaSqKm?.toLocaleString()} sq km | Pop: ${(st.population2011 / 10000000).toFixed(2)} Cr` : undefined
                      });
                    }}
                    onMouseLeave={() => setHoveredFeature(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      const st = getStateData(name);
                      onSelectFeature(st || { name }, 'state');
                    }}
                  />
                );
              })}
            </g>
          )}

          {/* 2. District Boundaries Layer (when enabled) */}
          {activeLayers.districts && (
            <g id="districts-layer">
              {districts.map((dist) => {
                const isHovered = hoveredFeature?.name === dist.name;
                return (
                  <path
                    key={dist.id}
                    d={dist.path}
                    fill={isHovered ? 'rgba(251, 191, 36, 0.4)' : 'transparent'}
                    stroke={isHovered ? '#F59E0B' : 'rgba(226, 232, 240, 0.28)'}
                    strokeWidth={isHovered ? 1.6 : 0.65}
                    strokeDasharray={isHovered ? 'none' : '1.5,1.5'}
                    className="cursor-pointer transition-colors duration-100"
                    onMouseEnter={() => setHoveredFeature({
                      name: `${dist.name} District`,
                      type: 'DISTRICT',
                      summary: `State: ${dist.state} | HQ: ${dist.headquarters}`
                    })}
                    onMouseLeave={() => setHoveredFeature(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      const st = getStateData(dist.state);
                      if (st) {
                        onSelectFeature({ ...st, selectedDistrict: dist }, 'state');
                      } else {
                        onSelectFeature(dist, 'district');
                      }
                    }}
                  />
                );
              })}
            </g>
          )}

          {/* 3. Hydrology / Rivers System (Interactive) */}
          {activeLayers.rivers && (
            <g id="rivers-layer">
              {(indiaRiverPaths as any[]).map((r, i) => {
                const isHovered = hoveredFeature?.name === r.name;
                const rData = rivers.find(item => item.name.toLowerCase() === r.name?.toLowerCase());

                return (
                  <g key={i} className="cursor-pointer">
                    {/* Generous invisible click/hover hitbox */}
                    <path
                      d={r.path}
                      fill="none"
                      stroke="transparent"
                      strokeWidth={10}
                      strokeLinecap="round"
                      onMouseEnter={() => setHoveredFeature({
                        name: `${r.name} River`,
                        type: 'RIVER SYSTEM',
                        summary: rData ? `Length: ${rData.lengthKm} km | Origin: ${rData.origin} | Mouth: ${rData.mouth}` : `${r.name} River`
                      })}
                      onMouseLeave={() => setHoveredFeature(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (rData) onSelectFeature(rData, 'river');
                      }}
                    />
                    {/* Visual River Vector */}
                    <path
                      d={r.path}
                      fill="none"
                      stroke={isHovered ? '#67E8F9' : '#38BDF8'}
                      strokeWidth={isHovered ? 3.6 : 2.0}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={isHovered ? 1.0 : 0.85}
                      filter="url(#border-glow)"
                      className="pointer-events-none transition-all duration-150"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* 4. State Labels & Capitals (Interactive Toggle) */}
          {showLabels && (
            <g id="state-labels-layer" pointerEvents="none">
              {stateLabels.map((lbl) => (
                <g key={lbl.name} transform={`translate(${lbl.px}, ${lbl.py})`}>
                  {/* Capital city marker point */}
                  <circle r={2.2} fill="#FDE047" stroke="#000" strokeWidth={0.8} />
                  {/* State Name Label */}
                  <text
                    y={-5}
                    textAnchor="middle"
                    fontSize={8.5}
                    fontWeight="700"
                    fill="#F8FAFC"
                    stroke="#020617"
                    strokeWidth={2.4}
                    paintOrder="stroke"
                    letterSpacing="0.03em"
                    className="select-none font-sans opacity-90 drop-shadow-sm"
                  >
                    {lbl.name}
                  </text>
                  {/* Capital City Name (Subtext) */}
                  <text
                    y={6}
                    textAnchor="middle"
                    fontSize={6.5}
                    fontWeight="500"
                    fill="#93C5FD"
                    stroke="#020617"
                    strokeWidth={2.0}
                    paintOrder="stroke"
                    className="select-none font-sans opacity-80"
                  >
                    ★ {lbl.capital.split(',')[0]}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* 5. Dams & Multipurpose Reservoirs */}
          {activeLayers.dams && (
            <g id="dams-layer">
              {dams.map((d: any) => (
                <g 
                  key={d.id} 
                  transform={`translate(${d.px}, ${d.py})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFeature(d, 'dam');
                  }}
                  onMouseEnter={() => setHoveredFeature({
                    name: d.name,
                    type: 'DAM & RESERVOIR',
                    summary: `River: ${d.river} | State: ${d.state} | Capacity: ${d.installedCapacityMW || 'N/A'} MW`
                  })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <circle r={7.5} fill="#0284C7" stroke="#BAE6FD" strokeWidth={2} filter="url(#pin-shadow)" />
                  <text y={3.5} textAnchor="middle" fontSize={8} fill="#FFF" fontWeight="bold">🌊</text>
                  <text 
                    y={-12} 
                    textAnchor="middle" 
                    fontSize={8.5} 
                    fill="#38BDF8" 
                    fontWeight="bold"
                    stroke="#020617"
                    strokeWidth={2.5}
                    paintOrder="stroke"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {d.name}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* 6. Mountain Peaks & Physical Relief */}
          {activeLayers.mountains && (
            <g id="mountains-layer">
              {physicalFeatures.map((m: any) => (
                <g 
                  key={m.id} 
                  transform={`translate(${m.px}, ${m.py})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFeature(m, 'mountain');
                  }}
                  onMouseEnter={() => setHoveredFeature({
                    name: m.name,
                    type: 'MOUNTAIN / RELIEF',
                    summary: `${m.category} | ${m.elevationM ? `${m.elevationM}m | ` : ''}${m.statesCovered?.join(', ')}`
                  })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <polygon points="0,-11 9,5 -9,5" fill="#F97316" stroke="#FFEDD5" strokeWidth={2} filter="url(#pin-shadow)" />
                  <text 
                    y={-14} 
                    textAnchor="middle" 
                    fontSize={8.5} 
                    fill="#FB923C" 
                    fontWeight="bold"
                    stroke="#020617"
                    strokeWidth={2.5}
                    paintOrder="stroke"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {m.name}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* 7. National Parks & Tiger Reserves */}
          {activeLayers.parks && (
            <g id="parks-layer">
              {protectedAreas.map((p: any) => (
                <g 
                  key={p.id} 
                  transform={`translate(${p.px}, ${p.py})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFeature(p, 'park');
                  }}
                  onMouseEnter={() => setHoveredFeature({
                    name: p.name,
                    type: 'PROTECTED AREA',
                    summary: `${p.category} | State: ${p.state} | Fauna: ${p.keySpecies?.slice(0, 2).join(', ')}`
                  })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <circle r={7.5} fill="#10B981" stroke="#A7F3D0" strokeWidth={2} filter="url(#pin-shadow)" />
                  <text y={3.5} textAnchor="middle" fontSize={7.5} fill="#FFF" fontWeight="bold">🌲</text>
                  <text 
                    y={-12} 
                    textAnchor="middle" 
                    fontSize={8.5} 
                    fill="#34D399" 
                    fontWeight="bold"
                    stroke="#020617"
                    strokeWidth={2.5}
                    paintOrder="stroke"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {p.name}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* 8. Major Minerals & Mining Belts */}
          {activeLayers.minerals && (
            <g id="minerals-layer">
              {minerals.map((min: any) => (
                <g 
                  key={min.id} 
                  transform={`translate(${min.px}, ${min.py})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFeature(min, 'mineral');
                  }}
                  onMouseEnter={() => setHoveredFeature({
                    name: min.name,
                    type: 'MINERAL BELT',
                    summary: `${min.mineral} | ${min.district}, ${min.state}`
                  })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <circle r={7} fill="#D97706" stroke="#FEF3C7" strokeWidth={2} filter="url(#pin-shadow)" />
                  <text y={3.5} textAnchor="middle" fontSize={7.5} fill="#FFF" fontWeight="bold">💎</text>
                  <text 
                    y={-12} 
                    textAnchor="middle" 
                    fontSize={8.5} 
                    fill="#FBBF24" 
                    fontWeight="bold"
                    stroke="#020617"
                    strokeWidth={2.5}
                    paintOrder="stroke"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {min.name}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* 9. Major Infrastructure & Seaports */}
          {activeLayers.infrastructure && (
            <g id="infrastructure-layer">
              {infrastructure.map((inf: any) => (
                <g 
                  key={inf.id} 
                  transform={`translate(${inf.px}, ${inf.py})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFeature(inf, 'infrastructure');
                  }}
                  onMouseEnter={() => setHoveredFeature({
                    name: inf.name,
                    type: 'MAJOR PORT / INFRA',
                    summary: `${inf.type} | State: ${inf.state}`
                  })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <circle r={7.5} fill="#6366F1" stroke="#E0E7FF" strokeWidth={2} filter="url(#pin-shadow)" />
                  <text y={3.5} textAnchor="middle" fontSize={7.5} fill="#FFF" fontWeight="bold">⚓</text>
                  <text 
                    y={-12} 
                    textAnchor="middle" 
                    fontSize={8.5} 
                    fill="#A5B4FC" 
                    fontWeight="bold"
                    stroke="#020617"
                    strokeWidth={2.5}
                    paintOrder="stroke"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {inf.name}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* 10. Historical Sites & Freedom Movement */}
          {activeLayers.history && (
            <g id="history-layer">
              {historicalSites.map((h: any) => (
                <g 
                  key={h.id} 
                  transform={`translate(${h.px}, ${h.py})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFeature(h, 'history');
                  }}
                  onMouseEnter={() => setHoveredFeature({
                    name: h.name,
                    type: 'HISTORICAL SITE',
                    summary: `${h.period} (${h.yearPeriod}) | State: ${h.state}`
                  })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <rect x={-6} y={-6} width={12} height={12} transform="rotate(45)" fill="#CA8A04" stroke="#FEF08A" strokeWidth={1.8} filter="url(#pin-shadow)" />
                  <text y={3.5} textAnchor="middle" fontSize={7.5} fill="#FFF" fontWeight="bold">🏛️</text>
                  <text 
                    y={-13} 
                    textAnchor="middle" 
                    fontSize={8.5} 
                    fill="#FACC15" 
                    fontWeight="bold"
                    stroke="#020617"
                    strokeWidth={2.5}
                    paintOrder="stroke"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {h.name}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* 11. Lakes & Ramsar Wetlands */}
          {activeLayers.rivers && (
            <g id="lakes-layer">
              {lakes.map((l: any) => (
                <g 
                  key={l.id} 
                  transform={`translate(${l.px}, ${l.py})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFeature(l, 'lake');
                  }}
                  onMouseEnter={() => setHoveredFeature({
                    name: l.name,
                    type: 'LAKE / RAMSAR',
                    summary: `${l.type} | State: ${l.state} | Ramsar: ${l.ramsarStatus ? 'Yes' : 'No'}`
                  })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <circle r={6.5} fill="#06B6D4" stroke="#CFFAFE" strokeWidth={1.8} filter="url(#pin-shadow)" />
                  <text 
                    y={-11} 
                    textAnchor="middle" 
                    fontSize={8.5} 
                    fill="#67E8F9" 
                    fontWeight="bold"
                    stroke="#020617"
                    strokeWidth={2.5}
                    paintOrder="stroke"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {l.name}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* 12. Strategic Mountain Passes & Maritime Channels */}
          {activeLayers.passes && (
            <g id="passes-and-channels-layer">
              {/* Strategic Maritime Channels */}
              {channels.map((ch: any) => (
                <g 
                  key={ch.id} 
                  transform={`translate(${ch.px}, ${ch.py})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFeature(ch, 'channel');
                  }}
                  onMouseEnter={() => setHoveredFeature({
                    name: ch.name,
                    type: 'MARITIME CHANNEL',
                    summary: `Separates: ${ch.separates}`
                  })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Channel Width Indicator */}
                  <line x1={-30} y1={0} x2={30} y2={0} stroke="#38BDF8" strokeWidth={2.0} strokeDasharray="3,2" />
                  <circle r={7.5} fill="#0284C7" stroke="#BAE6FD" strokeWidth={1.8} filter="url(#pin-shadow)" />
                  <text y={3.5} textAnchor="middle" fontSize={7.5} fill="#FFF" fontWeight="bold">⚓</text>
                  <text 
                    y={-11} 
                    textAnchor="middle" 
                    fontSize={8.5} 
                    fill="#38BDF8" 
                    fontWeight="bold"
                    stroke="#020617"
                    strokeWidth={2.4}
                    paintOrder="stroke"
                    className="opacity-90 group-hover:opacity-100 transition-opacity font-mono"
                  >
                    {ch.name}
                  </text>
                </g>
              ))}

              {/* Strategic Mountain Passes */}
              {passes.map((pass: any) => (
                <g 
                  key={pass.id} 
                  transform={`translate(${pass.px}, ${pass.py})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFeature(pass, 'pass');
                  }}
                  onMouseEnter={() => setHoveredFeature({
                    name: pass.name,
                    type: 'MOUNTAIN PASS',
                    summary: `${pass.range} | Connects: ${pass.connects}`
                  })}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <rect x={-6.5} y={-6.5} width={13} height={13} rx={3} fill="#8B5CF6" stroke="#DDD6FE" strokeWidth={1.8} filter="url(#pin-shadow)" />
                  <text y={3.5} textAnchor="middle" fontSize={7.5} fill="#FFF" fontWeight="bold">🚪</text>
                  <text 
                    y={-12} 
                    textAnchor="middle" 
                    fontSize={8.5} 
                    fill="#C4B5FD" 
                    fontWeight="bold"
                    stroke="#020617"
                    strokeWidth={2.4}
                    paintOrder="stroke"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {pass.name} {pass.elevationM ? `(${pass.elevationM}m)` : ''}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* Active River Waypoint Beacon (When tracing river) */}
          {activeWaypointCoords && (() => {
            const [bX, bY] = projectCoords(activeWaypointCoords[0], activeWaypointCoords[1]);
            return (
              <g transform={`translate(${bX}, ${bY})`} className="pointer-events-none">
                <circle r={22} fill="none" stroke="#F59E0B" strokeWidth={2.5} opacity={0.7} className="animate-ping" />
                <circle r={10} fill="#F59E0B" stroke="#FFFFFF" strokeWidth={2.5} filter="url(#pin-shadow)" />
                <circle r={3.5} fill="#FFFFFF" />
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Floating Hover Tooltip (Bottom Left) */}
      {hoveredFeature && (
        <div className="absolute bottom-6 left-6 z-30 pointer-events-none bg-slate-900/95 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md max-w-sm animate-fade-in">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {hoveredFeature.type}
            </span>
          </div>
          <h4 className="text-base font-bold text-white leading-tight">{hoveredFeature.name}</h4>
          {hoveredFeature.summary && (
            <p className="text-xs text-slate-300 mt-1 font-sans leading-relaxed">{hoveredFeature.summary}</p>
          )}
          <p className="text-[10px] text-cyan-400 mt-2 font-mono flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Click feature to inspect complete exam facts
          </p>
        </div>
      )}

      {/* Viewport Floating Controls (Top Right) */}
      <div className="absolute top-14 sm:top-4 right-3 sm:right-4 z-20 flex flex-col gap-1.5">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-1.5 flex flex-col gap-1 shadow-2xl backdrop-blur-md">
          {onOpenLayers && (
            <button
              onClick={onOpenLayers}
              className="p-2 sm:p-2 rounded-xl text-cyan-400 hover:text-white hover:bg-slate-800 transition-colors bg-cyan-950/40 border border-cyan-500/30"
              title="Toggle Map Layers"
            >
              <Layers className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setScale(s => Math.min(6.5, s * 1.25))}
            className="p-2 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale(s => Math.max(0.45, s * 0.8))}
            className="p-2 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`p-2 rounded-xl transition-colors ${showLabels ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            title="Toggle State Names & Capital Labels"
          >
            <Tag className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className={`p-2 rounded-xl transition-colors ${is3DMode ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            title="Toggle 3D Perspective Tilt"
          >
            <Compass className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset Map to Default View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Angle Slider when 3D mode is toggled */}
        {is3DMode && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 text-[11px] text-slate-300 backdrop-blur-md shadow-xl flex flex-col gap-1.5 w-32 sm:w-36">
            <div className="flex justify-between items-center text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <span>3D Pitch</span>
              <span className="text-amber-400">{tilt.rotateX}°</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="50" 
              value={tilt.rotateX} 
              onChange={(e) => setTilt(t => ({ ...t, rotateX: Number(e.target.value) }))}
              className="accent-amber-500 w-full cursor-pointer h-1 bg-slate-700 rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Guide Badge Bottom Right (Hidden on mobile phones to maximize map area) */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden md:block">
        <div className="bg-slate-900/85 border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] text-slate-400 backdrop-blur-md shadow-xl flex items-center gap-2.5">
          <span>Click + Drag or Touch to Pan</span>
          <span>•</span>
          <span>Pinch / Scroll to Zoom</span>
          <span>•</span>
          <span className="text-amber-400 font-semibold">Tap any State to Learn</span>
        </div>
      </div>
    </div>
  );
};

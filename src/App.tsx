import React, { useState } from 'react';
import { Map3DCanvas } from './components/Map3DCanvas';
import { DetailPanel } from './components/DetailPanel';
import { TopNavbar } from './components/TopNavbar';
import { ExamQuizModal } from './components/ExamQuizModal';
import { FlashcardModal } from './components/FlashcardModal';
import { TraceRiverModal } from './components/TraceRiverModal';
import { MapLayer, LearningMode } from './types/atlas';
import { UniversalSearchResult, rivers, physicalFeatures, dams, lakes, protectedAreas, historicalSites } from './data/atlas';
import { getStateData } from './data/atlas/states';

export function App() {
  const [learningMode, setLearningMode] = useState<LearningMode>('explore');
  const [activeLayers, setActiveLayers] = useState<Record<MapLayer, boolean>>({
    states: true,
    districts: false,
    rivers: true,
    mountains: true,
    passes: true,
    dams: true,
    parks: true,
    history: true,
    minerals: true,
    culture: true,
    infrastructure: true
  });

  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  const [selectedFeatureType, setSelectedFeatureType] = useState<string>('state');
  const [hoveredFeature, setHoveredFeature] = useState<{ name: string; type: string; summary?: string } | null>(null);
  const [focusCoordinates, setFocusCoordinates] = useState<[number, number] | null>(null);
  const [activeWaypointCoords, setActiveWaypointCoords] = useState<[number, number] | null>(null);

  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isFlashcardOpen, setIsFlashcardOpen] = useState<boolean>(false);
  const [isTraceRiverOpen, setIsTraceRiverOpen] = useState<boolean>(false);

  // Toggle Layer visibility
  const toggleLayer = (layer: MapLayer) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Selection Handler
  const handleSelectFeature = (feat: any, type: string) => {
    setSelectedFeature(feat);
    setSelectedFeatureType(type);

    if (feat.coordinates) {
      setFocusCoordinates(feat.coordinates);
    }
  };

  // Search Result selection handler
  const handleSelectSearchResult = (result: UniversalSearchResult) => {
    if (result.category === 'State') {
      const st = getStateData(result.name);
      handleSelectFeature(st || result.data, 'state');
    } else if (result.category === 'River') {
      handleSelectFeature(result.data, 'river');
    } else if (result.category === 'Mountain/Feature') {
      handleSelectFeature(result.data, 'mountain');
    } else if (result.category === 'Dam') {
      handleSelectFeature(result.data, 'dam');
    } else if (result.category === 'Lake') {
      handleSelectFeature(result.data, 'lake');
    } else if (result.category === 'Protected Area') {
      handleSelectFeature(result.data, 'park');
    } else if (result.category === 'Historical Site') {
      handleSelectFeature(result.data, 'history');
    } else if (result.category === 'Culture') {
      handleSelectFeature(result.data, 'culture');
    } else if (result.category === 'Mineral') {
      handleSelectFeature(result.data, 'mineral');
    } else if (result.category === 'Infrastructure') {
      handleSelectFeature(result.data, 'infrastructure');
    } else if (result.category === 'District') {
      handleSelectFeature(result.data, 'district');
    } else if (result.category === 'Pass') {
      handleSelectFeature(result.data, 'pass');
    } else if (result.category === 'Channel') {
      handleSelectFeature(result.data, 'channel');
    }

    if (result.coordinates) {
      setFocusCoordinates(result.coordinates);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Top Universal Navbar */}
      <TopNavbar
        learningMode={learningMode}
        setLearningMode={setLearningMode}
        activeLayers={activeLayers}
        toggleLayer={toggleLayer}
        onSelectSearchResult={handleSelectSearchResult}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenFlashcards={() => setIsFlashcardOpen(true)}
        onOpenTraceRiver={() => setIsTraceRiverOpen(true)}
      />

      {/* Main Interactive Stage */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* 3D Map Canvas */}
        <div className="flex-1 h-full relative">
          <Map3DCanvas
            activeLayers={activeLayers}
            selectedFeature={selectedFeature}
            onSelectFeature={handleSelectFeature}
            hoveredFeature={hoveredFeature}
            setHoveredFeature={setHoveredFeature}
            focusCoordinates={focusCoordinates}
            activeWaypointCoords={activeWaypointCoords}
          />
        </div>

        {/* Sliding / Collapsible Detail Sidebar */}
        {selectedFeature && (
          <div className="w-full md:w-[480px] lg:w-[540px] xl:w-[600px] h-full z-40 animate-slide-left shrink-0">
            <DetailPanel
              selectedFeature={selectedFeature}
              featureType={selectedFeatureType}
              onClose={() => setSelectedFeature(null)}
            />
          </div>
        )}
      </div>

      {/* Exam Quiz Modal */}
      <ExamQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      {/* Spaced Repetition Flashcards Modal */}
      <FlashcardModal
        isOpen={isFlashcardOpen}
        onClose={() => setIsFlashcardOpen(false)}
      />

      {/* Trace River Guided Voyage Modal */}
      <TraceRiverModal
        isOpen={isTraceRiverOpen}
        onClose={() => {
          setIsTraceRiverOpen(false);
          setActiveWaypointCoords(null);
        }}
        onFocusWaypoint={(coords) => {
          setActiveWaypointCoords(coords);
          setFocusCoordinates(coords);
        }}
      />
    </div>
  );
}

export default App;

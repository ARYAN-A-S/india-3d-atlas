export type MapLayer = 
  | 'states' 
  | 'districts' 
  | 'rivers' 
  | 'mountains' 
  | 'passes'
  | 'dams' 
  | 'parks' 
  | 'history' 
  | 'minerals' 
  | 'culture' 
  | 'infrastructure';

export type LearningMode = 
  | 'explore' 
  | 'physical' 
  | 'history' 
  | 'polity' 
  | 'economy' 
  | 'culture' 
  | 'environment' 
  | 'trace_river'
  | 'exam_quiz' 
  | 'flashcards';

export interface StateData {
  id: string;
  name: string;
  type: 'State' | 'Union Territory';
  capital: string;
  seasonalCapitals?: string;
  formationDate: string;
  areaSqKm: number;
  population2011: number;
  officialLanguages: string[];
  neighboringStates: string[];
  internationalBorders: string[];
  administrativeDivisions: {
    districtsCount: number;
    lokSabhaSeats: number;
    rajyaSabhaSeats: number;
    highCourt: string;
  };
  geography: {
    majorRivers: string[];
    mountainsHills: string[];
    physiography: string;
    majorLakes: string[];
    climate: string;
    forestCoverPercent: number;
    soilTypes: string[];
  };
  economy: {
    majorCrops: string[];
    majorMinerals: string[];
    majorIndustries: string[];
    majorPortsPower: string[];
  };
  historyCulture: {
    historicalKingdoms: string[];
    majorMonuments: string[];
    classicalFolkDances: string[];
    festivals: string[];
    unescoSites: string[];
    giTaggedProducts: string[];
  };
  environment: {
    nationalParks: string[];
    tigerReserves: string[];
    ramsarSites: string[];
    keySpecies: string[];
  };
  examFacts: string[];
  sources: string[];
}

export interface RiverData {
  id: string;
  name: string;
  lengthKm: number;
  origin: string;
  sourceLocation: string;
  elevationSourceM: number;
  statesCrossed: string[];
  majorTributariesLeft: string[];
  majorTributariesRight: string[];
  directionOfFlow: 'Eastward (Bay of Bengal)' | 'Westward (Arabian Sea)' | 'Inland Drainage';
  majorDams: string[];
  importantCities: string[];
  basinAreaSqKm: number;
  mouth: string;
  interStateSignificance: string;
  examFacts: string[];
}

export interface PhysicalFeature {
  id: string;
  name: string;
  category: 'Mountain Range' | 'Peak' | 'Plateau' | 'Desert' | 'Plains' | 'Island' | 'Ghats';
  elevationM?: number;
  statesCovered: string[];
  coordinates: [number, number]; // [lon, lat]
  description: string;
  highestPeakInfo?: string;
  examFacts: string[];
}

export interface DamData {
  id: string;
  name: string;
  river: string;
  state: string;
  district: string;
  coordinates: [number, number];
  type: string;
  heightM: number;
  purpose: string;
  installedCapacityMW?: number;
  reservoirName?: string;
  examFacts: string[];
}

export interface LakeData {
  id: string;
  name: string;
  type: 'Freshwater' | 'Brackish Lagoon' | 'Saline/Salt Lake' | 'Oxbow' | 'Tectonic' | 'Glacial';
  state: string;
  coordinates: [number, number];
  areaSqKm?: number;
  ramsarStatus: boolean;
  ecologicalImportance: string;
  examFacts: string[];
}

export interface ProtectedArea {
  id: string;
  name: string;
  category: 'National Park' | 'Tiger Reserve' | 'Biosphere Reserve' | 'Ramsar Wetland' | 'Wildlife Sanctuary';
  state: string;
  district?: string;
  coordinates: [number, number];
  keySpecies: string[];
  formationYear: number;
  areaSqKm: number;
  unescoStatus?: string;
  examFacts: string[];
}

export interface HistoricalSite {
  id: string;
  name: string;
  period: 'Ancient' | 'Medieval' | 'Modern (Freedom Movement)' | 'Post-Independence';
  yearPeriod: string;
  state: string;
  coordinates: [number, number];
  associatedPersonalities: string[];
  causesConsequences: string;
  examFacts: string[];
}

export interface EconomyFeature {
  id: string;
  name: string;
  category: 'Mineral' | 'Major Port' | 'Industrial Cluster' | 'Power Plant';
  state: string;
  coordinates: [number, number];
  details: string;
  examFacts: string[];
}

export interface MineralFeature {
  id: string;
  name: string;
  mineral: string;
  state: string;
  district: string;
  coordinates: [number, number];
  type: string;
  description: string;
  examFacts: string[];
  px?: number;
  py?: number;
}

export interface InfrastructureFeature {
  id: string;
  name: string;
  category: string;
  type: string;
  state: string;
  district: string;
  coordinates: [number, number];
  significance: string;
  examFacts: string[];
  px?: number;
  py?: number;
}

export interface DistrictFeature {
  id: string;
  name: string;
  state: string;
  path: string;
  cx: number;
  cy: number;
  headquarters: string;
  examFact: string;
}

export interface CultureFeature {
  id: string;
  name: string;
  category: 'Classical Dance' | 'Folk Dance' | 'UNESCO Heritage' | 'Craft / GI Tag' | 'Festival';
  associatedRegion: string;
  state: string;
  coordinates: [number, number];
  significance: string;
  examFacts: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  category: 'Geography' | 'Rivers & Water' | 'History' | 'Environment' | 'Polity' | 'Economy';
  type: 'mcq' | 'identify_map' | 'true_false';
  options: string[];
  correctAnswer: string | number; // index or string
  explanation: string;
  examFacts: string[];
  coordinates?: [number, number];
  targetFeatureId?: string;
}

export interface Flashcard {
  id: string;
  topic: string;
  front: string;
  back: string;
  examTag: 'UPSC' | 'State PSC' | 'SSC' | 'CDS/NDA' | 'All Exams';
  hint?: string;
}

export interface MountainPass {
  id: string;
  name: string;
  range: string;
  state: string;
  elevationM?: number;
  coordinates: [number, number];
  connects: string;
  strategicSignificance: string;
  examFacts: string[];
  px?: number;
  py?: number;
}

export interface MaritimeChannel {
  id: string;
  name: string;
  latitudeDeg?: number;
  separates: string;
  coordinates: [number, number];
  significance: string;
  examFacts: string[];
  px?: number;
  py?: number;
}

export interface RiverTraceWaypoint {
  id: string;
  title: string;
  stage: 'Origin' | 'Confluence' | 'Dam/Barrage' | 'Key City' | 'Bifurcation' | 'Mouth/Delta';
  description: string;
  coordinates: [number, number];
  examNote: string;
  px: number;
  py: number;
}

export interface RiverTraceJourney {
  riverId: string;
  riverName: string;
  totalLengthKm: number;
  originText: string;
  mouthText: string;
  waypoints: RiverTraceWaypoint[];
}

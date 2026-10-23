import { 
  RiverData, PhysicalFeature, DamData, LakeData, ProtectedArea, 
  HistoricalSite, CultureFeature, QuizQuestion, Flashcard, 
  MineralFeature, InfrastructureFeature, DistrictFeature,
  MountainPass, MaritimeChannel, RiverTraceJourney
} from '../../types/atlas';

import riversData from './rivers.json';
import physicalData from './physical.json';
import damsData from './dams.json';
import lakesData from './lakes.json';
import parksData from './parks.json';
import historyData from './history.json';
import cultureData from './culture.json';
import polityData from './polity.json';
import quizzesData from './quizzes.json';
import flashcardsData from './flashcards.json';
import mineralsData from './minerals.json';
import infraData from './infrastructure.json';
import districtData from './india_district_paths.json';
import stateLabelsData from './state_labels.json';
import passesData from './passes.json';
import channelsData from './channels.json';
import riverTracesData from './river_traces.json';

export const rivers: RiverData[] = (riversData as unknown) as RiverData[];
export const physicalFeatures: PhysicalFeature[] = (physicalData as unknown) as PhysicalFeature[];
export const dams: DamData[] = (damsData as unknown) as DamData[];
export const lakes: LakeData[] = (lakesData as unknown) as LakeData[];
export const protectedAreas: ProtectedArea[] = (parksData as unknown) as ProtectedArea[];
export const historicalSites: HistoricalSite[] = (historyData as unknown) as HistoricalSite[];
export const cultureFeatures: CultureFeature[] = (cultureData as unknown) as CultureFeature[];
export const polityTopics = polityData;
export const quizQuestions: QuizQuestion[] = (quizzesData as unknown) as QuizQuestion[];
export const flashcards: Flashcard[] = (flashcardsData as unknown) as Flashcard[];
export const minerals: MineralFeature[] = (mineralsData as unknown) as MineralFeature[];
export const infrastructure: InfrastructureFeature[] = (infraData as unknown) as InfrastructureFeature[];
export const districts: DistrictFeature[] = (districtData as unknown) as DistrictFeature[];
export const stateLabels = stateLabelsData;
export const passes: MountainPass[] = (passesData as unknown) as MountainPass[];
export const channels: MaritimeChannel[] = (channelsData as unknown) as MaritimeChannel[];
export const riverTraces: RiverTraceJourney[] = (riverTracesData as unknown) as RiverTraceJourney[];

export interface UniversalSearchResult {
  id: string;
  name: string;
  category: 'State' | 'River' | 'Mountain/Feature' | 'Dam' | 'Lake' | 'Protected Area' | 'Historical Site' | 'Culture' | 'Polity' | 'Mineral' | 'Infrastructure' | 'District' | 'Pass' | 'Channel';
  coordinates?: [number, number];
  summary: string;
  data: any;
}

export const searchAtlas = (query: string): UniversalSearchResult[] => {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  const results: UniversalSearchResult[] = [];

  // Rivers
  rivers.forEach(r => {
    if (r.name.toLowerCase().includes(q) || r.statesCrossed.some(s => s.toLowerCase().includes(q)) || r.origin.toLowerCase().includes(q)) {
      results.push({
        id: r.id,
        name: r.name,
        category: 'River',
        summary: `Length: ${r.lengthKm} km | Origin: ${r.origin}`,
        data: r
      });
    }
  });

  // Physical features
  physicalFeatures.forEach(p => {
    if (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.statesCovered.some(s => s.toLowerCase().includes(q))) {
      results.push({
        id: p.id,
        name: p.name,
        category: 'Mountain/Feature',
        coordinates: p.coordinates,
        summary: `${p.category} | ${p.statesCovered.join(', ')}`,
        data: p
      });
    }
  });

  // Dams
  dams.forEach(d => {
    if (d.name.toLowerCase().includes(q) || d.river.toLowerCase().includes(q) || d.state.toLowerCase().includes(q)) {
      results.push({
        id: d.id,
        name: d.name,
        category: 'Dam',
        coordinates: d.coordinates,
        summary: `River: ${d.river} | State: ${d.state} | Capacity: ${d.installedCapacityMW || 'N/A'} MW`,
        data: d
      });
    }
  });

  // Lakes
  lakes.forEach(l => {
    if (l.name.toLowerCase().includes(q) || l.state.toLowerCase().includes(q) || l.type.toLowerCase().includes(q)) {
      results.push({
        id: l.id,
        name: l.name,
        category: 'Lake',
        coordinates: l.coordinates,
        summary: `Type: ${l.type} | State: ${l.state} | Ramsar: ${l.ramsarStatus ? 'Yes' : 'No'}`,
        data: l
      });
    }
  });

  // Parks
  protectedAreas.forEach(p => {
    if (p.name.toLowerCase().includes(q) || p.state.toLowerCase().includes(q) || p.keySpecies.some(s => s.toLowerCase().includes(q))) {
      results.push({
        id: p.id,
        name: p.name,
        category: 'Protected Area',
        coordinates: p.coordinates,
        summary: `${p.category} | State: ${p.state} | Key species: ${p.keySpecies.slice(0, 2).join(', ')}`,
        data: p
      });
    }
  });

  // History
  historicalSites.forEach(h => {
    if (h.name.toLowerCase().includes(q) || h.period.toLowerCase().includes(q) || h.associatedPersonalities.some(p => p.toLowerCase().includes(q))) {
      results.push({
        id: h.id,
        name: h.name,
        category: 'Historical Site',
        coordinates: h.coordinates,
        summary: `Period: ${h.period} (${h.yearPeriod}) | State: ${h.state}`,
        data: h
      });
    }
  });

  // Culture
  cultureFeatures.forEach(c => {
    if (c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.associatedRegion.toLowerCase().includes(q)) {
      results.push({
        id: c.id,
        name: c.name,
        category: 'Culture',
        coordinates: c.coordinates,
        summary: `${c.category} | Region: ${c.associatedRegion}`,
        data: c
      });
    }
  });

  // Minerals
  minerals.forEach(m => {
    if (m.name.toLowerCase().includes(q) || m.mineral.toLowerCase().includes(q) || m.state.toLowerCase().includes(q)) {
      results.push({
        id: m.id,
        name: m.name,
        category: 'Mineral',
        coordinates: m.coordinates,
        summary: `Mineral: ${m.mineral} | State: ${m.state} (${m.district})`,
        data: m
      });
    }
  });

  // Infrastructure & Ports
  infrastructure.forEach(inf => {
    if (inf.name.toLowerCase().includes(q) || inf.type.toLowerCase().includes(q) || inf.state.toLowerCase().includes(q)) {
      results.push({
        id: inf.id,
        name: inf.name,
        category: 'Infrastructure',
        coordinates: inf.coordinates,
        summary: `${inf.type} | State: ${inf.state}`,
        data: inf
      });
    }
  });

  // Mountain Passes
  passes.forEach(p => {
    if (p.name.toLowerCase().includes(q) || p.range.toLowerCase().includes(q) || p.connects.toLowerCase().includes(q)) {
      results.push({
        id: p.id,
        name: p.name,
        category: 'Pass',
        coordinates: p.coordinates,
        summary: `Pass | ${p.range} | Connects: ${p.connects}`,
        data: p
      });
    }
  });

  // Maritime Channels
  channels.forEach(ch => {
    if (ch.name.toLowerCase().includes(q) || ch.separates.toLowerCase().includes(q)) {
      results.push({
        id: ch.id,
        name: ch.name,
        category: 'Channel',
        coordinates: ch.coordinates,
        summary: `Channel | Separates: ${ch.separates}`,
        data: ch
      });
    }
  });

  return results.slice(0, 15);
};

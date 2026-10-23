import { StateData } from '../../types/atlas';
import statesJson from './states_complete.json';

export const statesDataset: Record<string, StateData> = statesJson as Record<string, StateData>;

export const getStateData = (name: string): StateData | undefined => {
  if (!name) return undefined;
  if (statesDataset[name]) return statesDataset[name];
  
  // Try case-insensitive or partial match
  const lower = name.toLowerCase().trim();
  const foundKey = Object.keys(statesDataset).find(k => k.toLowerCase().trim() === lower);
  if (foundKey) return statesDataset[foundKey];

  // Specific alias mappings
  if (lower.includes('andaman')) return statesDataset['Andaman and Nicobar Islands'] || statesDataset['Andaman and Nicobar'];
  if (lower.includes('daman') || lower.includes('dadra')) return statesDataset['Dadra and Nagar Haveli and Daman and Diu'];
  if (lower.includes('jammu') || lower.includes('kashmir')) return statesDataset['Jammu and Kashmir'];
  if (lower === 'delhi' || lower.includes('national capital')) return statesDataset['Delhi'];
  if (lower.includes('orissa')) return statesDataset['Odisha'];
  if (lower.includes('uttaranchal')) return statesDataset['Uttarakhand'];
  if (lower.includes('pondicherry')) return statesDataset['Puducherry'];

  return undefined;
};

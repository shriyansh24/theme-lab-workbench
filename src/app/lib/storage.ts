// Local storage utilities for persistence

const STORAGE_KEYS = {
  TAB: 'theme-lab-tab',
  SCREEN: 'theme-lab-screen',
  COMPARE_A: 'theme-lab-compare-a',
  COMPARE_B: 'theme-lab-compare-b',
  ARENA_SCORES: 'theme-lab-arena-scores',
  FAVORITES: 'theme-lab-favorites',
  LAB_OVERRIDES: 'theme-lab-overrides',
  NOTES: 'theme-lab-notes',
  FILTERS: 'theme-lab-filters'
} as const;

export const storage = {
  get<T>(key: keyof typeof STORAGE_KEYS, fallback: T): T {
    try {
      const item = localStorage.getItem(STORAGE_KEYS[key]);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },
  
  set<T>(key: keyof typeof STORAGE_KEYS, value: T): void {
    try {
      localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  },
  
  remove(key: keyof typeof STORAGE_KEYS): void {
    try {
      localStorage.removeItem(STORAGE_KEYS[key]);
    } catch (e) {
      console.warn('Failed to remove from localStorage:', e);
    }
  }
};
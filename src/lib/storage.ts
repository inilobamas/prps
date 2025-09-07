import { DayLog, UserStats, Settings, Booking, TrainerAvailability, UserBookingProfile, UserLocation, LocationPreference } from './types';

const STORAGE_VERSION = 1;

export const STORAGE_KEYS = {
  PROGRAMS: 'prps.programs',
  ACTIVE_PROGRAM: 'prps.activeProgram',
  STATS: 'prps.stats',
  SETTINGS: 'prps.settings',
  VERSION: 'prps.version',
  BOOKINGS: 'prps.bookings',
  USER_BOOKING_PROFILE: 'prps.userBookingProfile',
  TRAINER_AVAILABILITY: 'prps.trainerAvailability',
  USER_LOCATION: 'prps.userLocation',
  LOCATION_PREFERENCE: 'prps.locationPreference',
} as const;

export function getDayLogKey(programSlug: string, day: number, date: string): string {
  const formattedDate = date.replace(/-/g, '');
  return `prps.logs.${programSlug}.${day}.${formattedDate}`;
}

export function getStorageItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn(`Error reading storage key "${key}":`, error);
    return null;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting storage key "${key}":`, error);
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing storage key "${key}":`, error);
  }
}

export function getAllDayLogs(): DayLog[] {
  if (typeof window === 'undefined') return [];
  
  const logs: DayLog[] = [];
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('prps.logs.')) {
        const item = localStorage.getItem(key);
        if (item) {
          const log = JSON.parse(item) as DayLog;
          logs.push(log);
        }
      }
    }
  } catch (error) {
    console.warn('Error reading day logs:', error);
  }
  
  return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getDefaultUserStats(): UserStats {
  return {
    xp: 0,
    streakDays: 0,
    badges: [],
    totalWorkouts: 0,
    totalVolumeKg: 0,
  };
}

export function getDefaultSettings(): Settings {
  return {
    restTimerSound: true,
    units: 'kg',
    theme: 'system',
  };
}

export function migrate(): void {
  const currentVersion = getStorageItem<number>(STORAGE_KEYS.VERSION);
  
  if (!currentVersion || currentVersion < STORAGE_VERSION) {
    console.log(`Migrating storage from version ${currentVersion || 0} to ${STORAGE_VERSION}`);
    setStorageItem(STORAGE_KEYS.VERSION, STORAGE_VERSION);
  }
}

export function exportData(): string {
  const data = {
    version: STORAGE_VERSION,
    stats: getStorageItem<UserStats>(STORAGE_KEYS.STATS),
    settings: getStorageItem<Settings>(STORAGE_KEYS.SETTINGS),
    activeProgram: getStorageItem<string>(STORAGE_KEYS.ACTIVE_PROGRAM),
    logs: getAllDayLogs(),
  };
  
  return JSON.stringify(data, null, 2);
}

export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    
    if (data.stats) setStorageItem(STORAGE_KEYS.STATS, data.stats);
    if (data.settings) setStorageItem(STORAGE_KEYS.SETTINGS, data.settings);
    if (data.activeProgram) setStorageItem(STORAGE_KEYS.ACTIVE_PROGRAM, data.activeProgram);
    if (data.logs && Array.isArray(data.logs)) {
      data.logs.forEach((log: DayLog) => {
        const key = getDayLogKey(log.programSlug, log.day, log.date);
        setStorageItem(key, log);
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

// Booking Storage Functions
export function getAllBookings(): Booking[] {
  return getStorageItem<Booking[]>(STORAGE_KEYS.BOOKINGS) || [];
}

export function addBooking(booking: Booking): void {
  const bookings = getAllBookings();
  bookings.push(booking);
  setStorageItem(STORAGE_KEYS.BOOKINGS, bookings);
}

export function updateBooking(bookingId: string, updates: Partial<Booking>): boolean {
  const bookings = getAllBookings();
  const index = bookings.findIndex(b => b.id === bookingId);
  
  if (index === -1) return false;
  
  bookings[index] = { ...bookings[index], ...updates };
  setStorageItem(STORAGE_KEYS.BOOKINGS, bookings);
  return true;
}

export function getBookingById(bookingId: string): Booking | null {
  const bookings = getAllBookings();
  return bookings.find(b => b.id === bookingId) || null;
}

export function getBookingsByTrainer(trainerId: string): Booking[] {
  const bookings = getAllBookings();
  return bookings.filter(b => b.trainerId === trainerId);
}

export function getBookingsByUser(userId: string): Booking[] {
  const bookings = getAllBookings();
  return bookings.filter(b => b.userId === userId);
}

export function getUserBookingProfile(): UserBookingProfile | null {
  return getStorageItem<UserBookingProfile>(STORAGE_KEYS.USER_BOOKING_PROFILE);
}

export function updateUserBookingProfile(profile: Partial<UserBookingProfile>): void {
  const current = getUserBookingProfile();
  const updated = current ? { ...current, ...profile } : profile;
  setStorageItem(STORAGE_KEYS.USER_BOOKING_PROFILE, updated);
}

export function getTrainerAvailability(trainerId: string): TrainerAvailability[] {
  const availability = getStorageItem<Record<string, TrainerAvailability[]>>(STORAGE_KEYS.TRAINER_AVAILABILITY) || {};
  return availability[trainerId] || [];
}

export function setTrainerAvailability(trainerId: string, availability: TrainerAvailability[]): void {
  const allAvailability = getStorageItem<Record<string, TrainerAvailability[]>>(STORAGE_KEYS.TRAINER_AVAILABILITY) || {};
  allAvailability[trainerId] = availability;
  setStorageItem(STORAGE_KEYS.TRAINER_AVAILABILITY, allAvailability);
}

// Location Storage Functions
export function getUserLocation(): UserLocation | null {
  return getStorageItem<UserLocation>(STORAGE_KEYS.USER_LOCATION);
}

export function setUserLocation(location: UserLocation): void {
  setStorageItem(STORAGE_KEYS.USER_LOCATION, location);
}

export function getLocationPreference(): LocationPreference {
  return getStorageItem<LocationPreference>(STORAGE_KEYS.LOCATION_PREFERENCE) || {
    preferredLocations: [],
    maxDistance: 10, // 10km default
    showAllLocations: true
  };
}

export function setLocationPreference(preference: LocationPreference): void {
  setStorageItem(STORAGE_KEYS.LOCATION_PREFERENCE, preference);
}

export function updateLocationPreference(updates: Partial<LocationPreference>): void {
  const current = getLocationPreference();
  const updated = { ...current, ...updates };
  setLocationPreference(updated);
}
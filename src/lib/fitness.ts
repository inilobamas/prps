import { DayLog, ExerciseLog, Program } from './types';

// Parse sets string to number of sets
export function parseSets(sets: string): number {
  const parsed = parseInt(sets);
  return isNaN(parsed) ? 1 : parsed;
}

// Parse reps string to get min/max range
export function parseReps(reps: string): { min: number; max?: number; display: string } {
  const match = reps.match(/(\d+)(?:-(\d+))?/);
  if (!match) return { min: 1, display: reps };
  
  const min = parseInt(match[1]);
  const max = match[2] ? parseInt(match[2]) : undefined;
  
  return { min, max, display: reps };
}

// Parse rest string to seconds
export function parseRestToSeconds(rest: string): number {
  const normalized = rest.toLowerCase().replace(/\s+/g, '');
  
  // Match patterns like "90s", "2min", "1.5min"
  const secondsMatch = normalized.match(/(\d+(?:\.\d+)?)s/);
  if (secondsMatch) {
    return Math.round(parseFloat(secondsMatch[1]));
  }
  
  const minutesMatch = normalized.match(/(\d+(?:\.\d+)?)min/);
  if (minutesMatch) {
    return Math.round(parseFloat(minutesMatch[1]) * 60);
  }
  
  // Default to 90 seconds if unparseable
  return 90;
}

// Format duration in minutes and seconds
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (remainingSeconds === 0) {
    return `${minutes}m`;
  }
  
  return `${minutes}m ${remainingSeconds}s`;
}

// Get next recommended workout day for a program
export function getNextWorkoutDay(programSlug: string, completedDays: number[]): number | null {
  // Find the first day that hasn't been completed
  const program = getStorageItem<Program[]>('prps.programs')?.find(p => p.slug === programSlug);
  if (!program) return null;
  
  for (let i = 1; i <= program.days.length; i++) {
    if (!completedDays.includes(i)) {
      return i;
    }
  }
  
  // All days completed
  return null;
}

// Helper function to get storage item (duplicated from storage.ts to avoid circular imports)
function getStorageItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

// Check if exercise is completed (all sets done)
export function isExerciseCompleted(exerciseLog: ExerciseLog): boolean {
  return exerciseLog.setLogs.length > 0 && exerciseLog.setLogs.every(set => set.completed);
}

// Check if day is completed (all exercises done)
export function isDayCompleted(dayLog: DayLog): boolean {
  return dayLog.completedAt !== undefined && dayLog.exerciseLogs.every(isExerciseCompleted);
}

// Get completion percentage for a day
export function getDayCompletionPercentage(dayLog: DayLog): number {
  const totalSets = dayLog.exerciseLogs.reduce((total, exercise) => 
    total + exercise.setLogs.length, 0
  );
  
  if (totalSets === 0) return 0;
  
  const completedSets = dayLog.exerciseLogs.reduce((total, exercise) => 
    total + exercise.setLogs.filter(set => set.completed).length, 0
  );
  
  return Math.round((completedSets / totalSets) * 100);
}
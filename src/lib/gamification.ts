import { Badge, UserStats, DayLog } from './types';
import { getAllDayLogs, getStorageItem, setStorageItem, STORAGE_KEYS } from './storage';

export const BADGES: Badge[] = [
  {
    id: 'first-workout',
    name: 'First Step',
    description: 'Complete your first workout',
    icon: '🏃‍♂️',
    condition: (stats) => stats.totalWorkouts >= 1,
  },
  {
    id: 'week-one-complete',
    name: 'Week Warrior',
    description: 'Complete 3 workouts in 7 days',
    icon: '📅',
    condition: () => {
      const logs = getAllDayLogs();
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      
      const recentWorkouts = logs.filter(log => 
        log.completedAt && new Date(log.date) >= lastWeek
      );
      
      return recentWorkouts.length >= 3;
    },
  },
  {
    id: 'volume-5k',
    name: 'Heavy Lifter',
    description: 'Lift a total of 5,000kg',
    icon: '💪',
    condition: (stats) => stats.totalVolumeKg >= 5000,
  },
  {
    id: 'streak-5',
    name: 'Consistency King',
    description: 'Maintain a 5-day workout streak',
    icon: '🔥',
    condition: (stats) => stats.streakDays >= 5,
  },
  {
    id: 'streak-10',
    name: 'Unstoppable Force',
    description: 'Maintain a 10-day workout streak',
    icon: '⚡',
    condition: (stats) => stats.streakDays >= 10,
  },
  {
    id: 'program-finished',
    name: 'Program Master',
    description: 'Complete all days in a program',
    icon: '🏆',
    condition: () => {
      // This needs program context, will be checked separately
      return false;
    },
  },
  {
    id: 'volume-10k',
    name: 'Iron Mountain',
    description: 'Lift a total of 10,000kg',
    icon: '🏔️',
    condition: (stats) => stats.totalVolumeKg >= 10000,
  },
  {
    id: 'workout-25',
    name: 'Quarter Century',
    description: 'Complete 25 workouts',
    icon: '🎯',
    condition: (stats) => stats.totalWorkouts >= 25,
  },
];

// Calculate XP for a completed workout
export function calculateXP(dayLog: DayLog): number {
  if (!dayLog.completedAt) return 0;
  
  let xp = 0;
  
  // +10 XP per completed exercise
  const completedExercises = dayLog.exerciseLogs.filter(exercise => 
    exercise.setLogs.some(set => set.completed)
  );
  xp += completedExercises.length * 10;
  
  // +2 XP per completed set
  const completedSets = dayLog.exerciseLogs.reduce((total, exercise) => 
    total + exercise.setLogs.filter(set => set.completed).length, 0
  );
  xp += completedSets * 2;
  
  // +5 XP bonus for finishing the entire day
  const allExercisesComplete = dayLog.exerciseLogs.every(exercise =>
    exercise.setLogs.every(set => set.completed)
  );
  if (allExercisesComplete) {
    xp += 5;
  }
  
  return xp;
}

// Calculate streak based on workout dates
export function calculateStreak(workoutDates: string[]): number {
  if (workoutDates.length === 0) return 0;
  
  const sortedDates = workoutDates
    .map(date => new Date(date))
    .sort((a, b) => b.getTime() - a.getTime()); // Most recent first
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const mostRecent = new Date(sortedDates[0]);
  mostRecent.setHours(0, 0, 0, 0);
  
  // Streak broken if last workout was more than 1 day ago
  if (mostRecent.getTime() < yesterday.getTime()) {
    return 0;
  }
  
  let streak = 0;
  const targetDate = new Date(mostRecent);
  
  for (const workoutDate of sortedDates) {
    const workout = new Date(workoutDate);
    workout.setHours(0, 0, 0, 0);
    
    if (workout.getTime() === targetDate.getTime()) {
      streak++;
      targetDate.setDate(targetDate.getDate() - 1);
    } else if (workout.getTime() < targetDate.getTime()) {
      // Gap found, streak ends
      break;
    }
  }
  
  return streak;
}

// Calculate volume for a set
export function calculateSetVolume(setLog: { completed: boolean; weightKg?: number; actualReps?: number }): number {
  if (!setLog.completed || !setLog.weightKg || !setLog.actualReps) {
    return 0;
  }
  return setLog.weightKg * setLog.actualReps;
}

// Calculate total volume for an exercise
export function calculateExerciseVolume(exerciseLog: { setLogs: { completed: boolean; weightKg?: number; actualReps?: number }[] }): number {
  return exerciseLog.setLogs.reduce((total: number, setLog: { completed: boolean; weightKg?: number; actualReps?: number }) => {
    return total + calculateSetVolume(setLog);
  }, 0);
}

// Calculate total volume for a workout day
export function calculateDayVolume(dayLog: DayLog): number {
  return dayLog.exerciseLogs.reduce((total, exerciseLog) => {
    return total + calculateExerciseVolume(exerciseLog);
  }, 0);
}

// Calculate XP with streak bonus
export function calculateXPWithBonus(dayLog: DayLog, currentStreak: number): number {
  let xp = calculateXP(dayLog);
  
  // +10 XP streak bonus if today continues streak
  if (currentStreak > 0) {
    xp += 10;
  }
  
  return xp;
}

// Update user stats after completing a workout
export function updateStatsAfterWorkout(dayLog: DayLog): UserStats {
  const currentStats = getStorageItem<UserStats>(STORAGE_KEYS.STATS) || {
    xp: 0,
    streakDays: 0,
    badges: [],
    totalWorkouts: 0,
    totalVolumeKg: 0,
  };
  
  const dayVolume = dayLog.totalVolumeKg || 0;
  const xpEarned = dayLog.xpEarned || 0;
  
  // Update all workout dates to calculate new streak
  const allLogs = getAllDayLogs();
  const completedDates = allLogs
    .filter(log => log.completedAt)
    .map(log => log.date);
  
  if (dayLog.completedAt && dayLog.date) {
    completedDates.push(dayLog.date);
  }
  
  const uniqueDates = Array.from(new Set(completedDates)).sort();
  const newStreak = calculateStreak(uniqueDates);
  
  const updatedStats: UserStats = {
    ...currentStats,
    xp: currentStats.xp + xpEarned,
    streakDays: newStreak,
    lastWorkoutDate: dayLog.date,
    totalWorkouts: currentStats.totalWorkouts + 1,
    totalVolumeKg: currentStats.totalVolumeKg + dayVolume,
  };
  
  // Check for new badges
  const newBadges = checkNewBadges(currentStats, updatedStats);
  updatedStats.badges = [...currentStats.badges, ...newBadges];
  
  setStorageItem(STORAGE_KEYS.STATS, updatedStats);
  return updatedStats;
}

// Check for newly earned badges
export function checkNewBadges(oldStats: UserStats, newStats: UserStats): string[] {
  const newBadges: string[] = [];
  
  for (const badge of BADGES) {
    if (!oldStats.badges.includes(badge.id) && badge.condition(newStats)) {
      newBadges.push(badge.id);
    }
  }
  
  return newBadges;
}

// Get badge by ID
export function getBadge(badgeId: string): Badge | undefined {
  return BADGES.find(badge => badge.id === badgeId);
}

// Calculate XP needed for next level (simple level system)
export function getXPProgress(currentXP: number): { level: number; xpInLevel: number; xpForNext: number } {
  // Each level requires 100 * level XP (100, 200, 300, etc.)
  let level = 1;
  let totalXPNeeded = 0;
  
  while (currentXP >= totalXPNeeded + (level * 100)) {
    totalXPNeeded += level * 100;
    level++;
  }
  
  const xpInLevel = currentXP - totalXPNeeded;
  const xpForNext = (level * 100) - xpInLevel;
  
  return { level, xpInLevel, xpForNext };
}

// Check if program is completed
export function isProgramCompleted(programSlug: string, totalDays: number): boolean {
  const logs = getAllDayLogs().filter(log => 
    log.programSlug === programSlug && log.completedAt
  );
  
  const completedDays = new Set(logs.map(log => log.day));
  return completedDays.size >= totalDays;
}

// Format XP display
export function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k`;
  }
  return xp.toString();
}
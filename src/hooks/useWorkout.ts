import { useState, useEffect } from 'react';
import { DayLog, SetLog, UserStats, Program, Exercise } from '@/lib/types';
import { 
  getStorageItem, 
  setStorageItem, 
  getDayLogKey, 
  STORAGE_KEYS 
} from '@/lib/storage';
import { 
  calculateDayVolume, 
  calculateXPWithBonus, 
  updateStatsAfterWorkout 
} from '@/lib/gamification';
import { parseSets } from '@/lib/fitness';

export function useWorkout(programSlug: string, day: number) {
  const [dayLog, setDayLog] = useState<DayLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const logKey = getDayLogKey(programSlug, day, today);

  useEffect(() => {
    const existingLog = getStorageItem<DayLog>(logKey);
    if (existingLog) {
      setDayLog(existingLog);
    } else {
      // Initialize new day log
      const programs = getStorageItem<Program[]>(STORAGE_KEYS.PROGRAMS) || [];
      const program = programs.find(p => p.slug === programSlug);
      
      if (program) {
        const workoutDay = program.days.find(d => d.day === day);
        if (workoutDay) {
          const newDayLog: DayLog = {
            programSlug,
            day,
            date: today,
            exerciseLogs: workoutDay.exercises.map((exercise: Exercise) => ({
              exerciseName: exercise.name,
              setLogs: Array(parseSets(exercise.sets)).fill(null).map(() => ({
                completed: false,
              })),
            })),
          };
          setDayLog(newDayLog);
          setStorageItem(logKey, newDayLog);
        }
      }
    }
    setIsLoading(false);
  }, [programSlug, day, logKey, today]);

  const updateSetLog = (exerciseIndex: number, setIndex: number, updates: Partial<SetLog>) => {
    if (!dayLog) return;

    const newDayLog = { ...dayLog };
    newDayLog.exerciseLogs[exerciseIndex].setLogs[setIndex] = {
      ...newDayLog.exerciseLogs[exerciseIndex].setLogs[setIndex],
      ...updates,
    };

    if (updates.completed !== undefined) {
      newDayLog.exerciseLogs[exerciseIndex].setLogs[setIndex].timestamp = 
        updates.completed ? Date.now() : undefined;
    }

    setDayLog(newDayLog);
    setStorageItem(logKey, newDayLog);
  };

  const updateExerciseNotes = (exerciseIndex: number, notes: string) => {
    if (!dayLog) return;

    const newDayLog = { ...dayLog };
    newDayLog.exerciseLogs[exerciseIndex].notes = notes;

    setDayLog(newDayLog);
    setStorageItem(logKey, newDayLog);
  };

  const startWorkout = () => {
    if (!dayLog || dayLog.startedAt) return;

    const newDayLog = { ...dayLog, startedAt: Date.now() };
    setDayLog(newDayLog);
    setStorageItem(logKey, newDayLog);
  };

  const finishWorkout = (): UserStats | null => {
    if (!dayLog || dayLog.completedAt) return null;

    const stats = getStorageItem<UserStats>(STORAGE_KEYS.STATS);
    const currentStreak = stats?.streakDays || 0;

    const completedDayLog: DayLog = {
      ...dayLog,
      completedAt: Date.now(),
      totalVolumeKg: calculateDayVolume(dayLog),
      xpEarned: calculateXPWithBonus(dayLog, currentStreak),
    };

    setDayLog(completedDayLog);
    setStorageItem(logKey, completedDayLog);

    return updateStatsAfterWorkout(completedDayLog);
  };

  const isCompleted = dayLog?.completedAt !== undefined;
  const canFinish = dayLog?.exerciseLogs.some(exercise => 
    exercise.setLogs.some(set => set.completed)
  ) || false;

  return {
    dayLog,
    isLoading,
    isCompleted,
    canFinish,
    updateSetLog,
    updateExerciseNotes,
    startWorkout,
    finishWorkout,
  };
}

export function useTimer(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = (newSeconds?: number) => {
    setIsRunning(false);
    setSeconds(newSeconds ?? initialSeconds);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    seconds,
    isRunning,
    start,
    stop,
    reset,
    formatTime: () => formatTime(seconds),
    isFinished: seconds === 0,
  };
}
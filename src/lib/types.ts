export type Exercise = {
  name: string;
  sets: string;     // e.g. "4"
  reps: string;     // e.g. "8-10"
  rest: string;     // e.g. "90s" | "2 min"
  notes?: string;
};

export type WorkoutDay = {
  day: number;
  name: string;   // e.g. "Chest & Triceps"
  exercises: Exercise[];
};

export type WorkoutWeek = {
  week: number;
  focus?: string;             // e.g. "Volume Accumulation"
  workouts: WorkoutDay[];
};

export type Program = {
  slug: string;               // e.g. "beginner-strength"
  title: string;              // e.g. "Beginner Strength (Bodybuilding)"
  durationWeeks: number;      // e.g. 4
  frequencyPerWeek: number;   // e.g. 3
  level: "Pemula" | "Pemula serius" | "Intermediate" | "Advanced";
  equipment: string;          // quick summary
  weeks?: WorkoutWeek[];      // week-based programs (new structure)
  days?: WorkoutDay[];        // legacy day-based programs (backward compatibility)
};

// Progress & logs
export type SetLog = {
  completed: boolean;
  actualReps?: number;        // optional for RIR/RPE calc
  weightKg?: number;          // optional
  rpe?: number;               // 1-10
  timestamp?: number;
};

export type ExerciseLog = {
  exerciseName: string;
  setLogs: SetLog[];          // length equals intended sets parsed from Exercise.sets
  notes?: string;
};

export type DayLog = {
  programSlug: string;
  week?: number;              // for week-based programs
  day: number;
  date: string;               // YYYY-MM-DD
  startedAt?: number;
  completedAt?: number;
  exerciseLogs: ExerciseLog[];
  totalVolumeKg?: number;     // computed
  xpEarned?: number;          // computed
};

export type UserStats = {
  xp: number;
  streakDays: number;         // continuous days
  lastWorkoutDate?: string;   // YYYY-MM-DD
  badges: string[];           // e.g. ["first-workout", "5-day-streak"]
  totalWorkouts: number;
  totalVolumeKg: number;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
};

export type Settings = {
  restTimerSound: boolean;
  units: "kg" | "lbs";
  theme?: "light" | "dark" | "system";
};
import { Program } from './types';
import { FEATURED_PLANS } from './constants';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from './storage';

// Convert existing plans to workout programs
export const PROGRAMS: Program[] = FEATURED_PLANS.map(plan => ({
  slug: plan.id,
  title: plan.title,
  durationWeeks: plan.durationWeeks,
  frequencyPerWeek: parseInt(plan.daysPerWeek.split('x')[0]),
  level: plan.level,
  equipment: plan.equipment?.join(', ') || 'Standard gym equipment',
  days: plan.workoutOverview?.[0]?.workouts.map(workout => ({
    day: workout.day,
    name: workout.name,
    exercises: workout.exercises.map(exercise => ({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      rest: exercise.rest,
      notes: exercise.notes,
    }))
  })) || []
})).filter(program => program.days.length > 0);

// Add a simple beginner program for better user experience
PROGRAMS.push({
  slug: "home-bodyweight",
  title: "Home Bodyweight Training",
  durationWeeks: 6,
  frequencyPerWeek: 4,
  level: "Pemula",
  equipment: "No equipment needed",
  days: [
    {
      day: 1,
      name: "Upper Body Push",
      exercises: [
        { name: "Push-ups", sets: "4", reps: "8-12", rest: "90s", notes: "Knee variation if needed" },
        { name: "Pike Push-ups", sets: "3", reps: "6-10", rest: "90s", notes: "Shoulder focus" },
        { name: "Tricep Dips", sets: "3", reps: "8-12", rest: "60s", notes: "Chair or edge" },
        { name: "Mountain Climbers", sets: "3", reps: "20", rest: "45s", notes: "Each leg" },
        { name: "Plank", sets: "3", reps: "30-60s", rest: "60s", notes: "Hold position" }
      ]
    },
    {
      day: 2,
      name: "Lower Body",
      exercises: [
        { name: "Bodyweight Squats", sets: "4", reps: "15-20", rest: "90s", notes: "Full range" },
        { name: "Lunges", sets: "3", reps: "12", rest: "60s", notes: "Each leg" },
        { name: "Single-leg Glute Bridge", sets: "3", reps: "10", rest: "45s", notes: "Each leg" },
        { name: "Calf Raises", sets: "4", reps: "15-20", rest: "30s", notes: "Slow controlled" },
        { name: "Wall Sit", sets: "3", reps: "30-45s", rest: "60s", notes: "Hold position" }
      ]
    },
    {
      day: 3,
      name: "Upper Body Pull",
      exercises: [
        { name: "Pull-ups/Assisted", sets: "4", reps: "5-8", rest: "2 min", notes: "Use band if needed" },
        { name: "Inverted Rows", sets: "3", reps: "8-12", rest: "90s", notes: "Under table/bar" },
        { name: "Reverse Flyes", sets: "3", reps: "12-15", rest: "60s", notes: "Squeeze shoulder blades" },
        { name: "Bicycle Crunches", sets: "3", reps: "20", rest: "45s", notes: "Each side" },
        { name: "Dead Bug", sets: "3", reps: "10", rest: "45s", notes: "Each side" }
      ]
    },
    {
      day: 4,
      name: "Full Body HIIT",
      exercises: [
        { name: "Burpees", sets: "4", reps: "8-10", rest: "60s", notes: "High intensity" },
        { name: "Jump Squats", sets: "4", reps: "12-15", rest: "60s", notes: "Explosive movement" },
        { name: "Push-up to T", sets: "3", reps: "8-10", rest: "60s", notes: "Each side" },
        { name: "High Knees", sets: "4", reps: "30s", rest: "30s", notes: "Fast tempo" },
        { name: "Plank Jacks", sets: "3", reps: "15-20", rest: "45s", notes: "Maintain plank" }
      ]
    }
  ]
});

export function initializePrograms(): void {
  const existingPrograms = getStorageItem<Program[]>(STORAGE_KEYS.PROGRAMS);
  if (!existingPrograms) {
    setStorageItem(STORAGE_KEYS.PROGRAMS, PROGRAMS);
  }
}
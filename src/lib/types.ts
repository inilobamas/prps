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

// Personal Trainer Features
export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinDate: string;
  programs: ClientProgram[];
  stats: ClientStats;
  subscription: ClientSubscription;
  lastActive: string;
};

export type ClientProgram = {
  programSlug: string;
  programTitle: string;
  startDate: string;
  endDate?: string;
  progress: number;
  isActive: boolean;
  totalWorkouts: number;
  completedWorkouts: number;
};

export type ClientStats = {
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  totalVolumeKg: number;
  averageWorkoutDuration: number;
  lastWorkoutDate?: string;
};

export type ClientSubscription = {
  type: "free" | "premium" | "custom";
  startDate: string;
  endDate?: string;
  programsIncluded: string[];
  monthlyFee?: number;
};

export type TrainerMessage = {
  id: string;
  clientId: string;
  trainerId: string;
  message: string;
  timestamp: number;
  type: "feedback" | "motivation" | "correction" | "general";
  workoutReference?: {
    programSlug: string;
    week?: number;
    day: number;
    exerciseName?: string;
  };
};

export type TrainerRevenue = {
  month: string;
  totalEarnings: number;
  commission: number;
  programSales: ProgramSale[];
  payoutStatus: "pending" | "processing" | "paid";
  payoutDate?: string;
};

export type ProgramSale = {
  id: string;
  programSlug: string;
  programTitle: string;
  clientName: string;
  saleDate: string;
  price: number;
  trainerShare: number;
  prpsShare: number;
  status: "active" | "completed" | "cancelled";
};

export type TrainerProfile = {
  id: string;
  name: string;
  email: string;
  specializations: string[];
  certifications: string[];
  yearsExperience: number;
  bio: string;
  profileImage?: string;
  commissionRate: number;
  totalClients: number;
  totalRevenue: number;
  rating: number;
  joinDate: string;
};

// PT Booking System Types
export type SessionType = "personal-training" | "group-session" | "assessment" | "consultation";

export type BookingSlot = {
  id: string;
  trainerId: string;
  date: string;           // YYYY-MM-DD
  startTime: string;      // HH:mm (24-hour format)
  endTime: string;        // HH:mm (24-hour format)
  sessionType: SessionType;
  price: number;          // in Rupiah
  isAvailable: boolean;
  location: string;       // gym name or "online"
  maxParticipants?: number; // for group sessions
  currentParticipants?: number;
  notes?: string;
};

export type Booking = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  trainerId: string;
  trainerName: string;
  slotId: string;
  date: string;           // YYYY-MM-DD
  startTime: string;      // HH:mm
  endTime: string;        // HH:mm
  sessionType: SessionType;
  price: number;
  location: string;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no-show";
  paymentStatus: "unpaid" | "paid" | "refunded";
  paymentMethod: "lynk-id" | "cash" | "transfer";
  paymentUrl?: string;    // Lynk.id payment URL
  bookedAt: string;       // ISO timestamp
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  notes?: string;
  rating?: number;        // 1-5 stars, post-session
  feedback?: string;
};

export type TrainerAvailability = {
  trainerId: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  startTime: string;      // HH:mm
  endTime: string;        // HH:mm
  sessionTypes: SessionType[];
  defaultPrice: number;
  location: string;
  isActive: boolean;
};

export type GymPartner = {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  trainers: string[];     // trainer IDs
  commissionRate: number; // percentage for gym
  facilities: string[];
  operatingHours: {
    [key: string]: {      // day name
      open: string;       // HH:mm
      close: string;      // HH:mm
      closed?: boolean;
    }
  };
  rating: number;
  totalBookings: number;
  joinDate: string;
};

export type BookingRevenue = {
  bookingId: string;
  trainerId: string;
  gymId?: string;
  totalAmount: number;
  trainerShare: number;
  gymShare: number;
  prpsShare: number;
  trainerCommission: number; // percentage
  gymCommission: number;     // percentage
  date: string;
  status: "pending" | "paid" | "disputed";
};

// Extended TrainerProfile for booking
export type TrainerBookingProfile = TrainerProfile & {
  hourlyRate: number;           // default PT rate
  groupSessionRate: number;     // group session rate
  assessmentRate: number;       // assessment session rate
  consultationRate: number;     // consultation rate
  locations: string[];          // available gym locations
  availability: TrainerAvailability[];
  totalBookings: number;
  completedSessions: number;
  cancelledSessions: number;
  averageRating: number;
  reviewCount: number;
  isActive: boolean;           // accepting bookings
  responseTime: string;        // e.g. "Usually responds within 2 hours"
  languages: string[];
  equipment?: string[];        // specialized equipment they use
  maxAdvanceBooking: number;   // days in advance
  cancellationPolicy: string;
};

// User booking history and preferences
export type UserBookingProfile = {
  userId: string;
  totalBookings: number;
  completedSessions: number;
  cancelledSessions: number;
  noShows: number;
  averageRating: number;       // rating user gives to trainers
  preferredTrainers: string[]; // trainer IDs
  preferredLocations: string[];
  preferredSessionTypes: SessionType[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  healthNotes?: string;
  fitnessGoals?: string[];
  joinDate: string;
};
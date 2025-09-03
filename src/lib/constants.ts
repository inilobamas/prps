export const SITE_CONFIG = {
  name: "PRPS",
  tagline: "your plan, your pace, keep showing",
  description: "Program gym ramah pemula untuk bodybuilding dan powerlifting. Your plan, your pace, keep showing.",
  url: "https://prps-landing.vercel.app",
  creator: "@prps_sport",
}

export const SOCIAL_LINKS = {
  tiktok: "https://tiktok.com/@prps_sport",
  instagram: "https://instagram.com/prps_sport", 
  youtube: "https://youtube.com/@prps_sport",
}

export const PLAN_CATEGORIES = [
  "Pemula",
  "Pemula serius", 
  "Intermediate",
  "Advanced"
] as const

export const PLAN_SCHEDULES = [
  "3-day",
  "4-day", 
  "5-day",
  "6-day"
] as const

export const PLAN_ENVIRONMENTS = [
  "Home",
  "Gym",
  "Home or Gym"
] as const

export type PlanCategory = typeof PLAN_CATEGORIES[number]
export type PlanSchedule = typeof PLAN_SCHEDULES[number]
export type PlanEnvironment = typeof PLAN_ENVIRONMENTS[number]

export interface WorkoutWeek {
  week: number
  focus: string
  workouts: {
    day: number
    name: string
    exercises: {
      name: string
      sets: string
      reps: string
      rest: string
      notes?: string
    }[]
  }[]
}

export interface Plan {
  id: string
  title: string
  level: PlanCategory
  durationWeeks: number
  daysPerWeek: string
  environment: PlanEnvironment
  price: string
  features: string[]
  href: string
  tags?: string[]
  description?: string
  image?: string
  equipment?: string[]
  targetAudience?: string[]
  goals?: string[]
  workoutOverview?: WorkoutWeek[]
}

export const FEATURED_PLANS: Plan[] = [
  {
    id: "powerbuilding-foundation",
    title: "Beginner Strength (Bodybuilding)",
    level: "Pemula",
    durationWeeks: 8,
    daysPerWeek: "3x/minggu, ±45-60 menit",
    environment: "Home or Gym",
    price: "Rp 199.000",
    features: ["Fondasi kekuatan & teknik", "Perbaikan postur & range", "Kebiasaan latihan sehat", "Video demo + PDF plan"],
    href: "https://lynk.id/prps.sport/q7mn77dz3w7m",
    tags: ["Popular"],
    description: "Program 8 minggu untuk membangun fondasi kekuatan dan teknik dasar. Cocok banget buat pemula yang mau mulai latihan serius tapi tetap aman dan terstruktur.",
    image: "/images/beginner-strength.jpg",
    equipment: ["Dumbbell 2-10kg", "Matras yoga", "Resistance band (opsional)"],
    targetAudience: ["Pemula total", "Comeback setelah lama tidak latihan", "Mau fokus teknik yang benar"],
    goals: ["Membangun kekuatan dasar", "Memperbaiki postur tubuh", "Membentuk kebiasaan latihan", "Persiapan ke program advanced"],
    workoutOverview: [
      {
        week: 1,
        focus: "Adaptasi & Teknik Dasar",
        workouts: [
          {
            day: 1,
            name: "Full Body A",
            exercises: [
              { name: "Goblet Squat", sets: "3", reps: "8-12", rest: "60-90s", notes: "Fokus kedalaman squat" },
              { name: "Push-up (knee/regular)", sets: "3", reps: "5-10", rest: "60s", notes: "Variasi sesuai kemampuan" },
              { name: "Dumbbell Row", sets: "3", reps: "8-12", rest: "60s", notes: "Tarik ke arah perut" },
              { name: "Plank Hold", sets: "3", reps: "20-45s", rest: "60s", notes: "Jaga postur lurus" }
            ]
          },
          {
            day: 2,
            name: "Active Recovery",
            exercises: [
              { name: "Walking/Light Jog", sets: "1", reps: "15-30 min", rest: "-", notes: "Low intensity" },
              { name: "Dynamic Stretching", sets: "1", reps: "10 min", rest: "-", notes: "Focus problem areas" }
            ]
          },
          {
            day: 3,
            name: "Full Body B",
            exercises: [
              { name: "Dumbbell Deadlift", sets: "3", reps: "6-10", rest: "90s", notes: "Hinge pattern" },
              { name: "Overhead Press", sets: "3", reps: "6-10", rest: "90s", notes: "Tight core" },
              { name: "Bulgarian Split Squat", sets: "3", reps: "6-10 each leg", rest: "60s", notes: "Balance & control" },
              { name: "Dead Bug", sets: "3", reps: "8-12 each side", rest: "45s", notes: "Slow & controlled" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "push-pull-legs",
    title: "Powerlifting Intro (SBD)",
    level: "Pemula serius", 
    durationWeeks: 6,
    daysPerWeek: "3-4x/minggu, fokus SBD",
    environment: "Gym",
    price: "Rp 299.000",
    features: ["Teknik dasar SBD", "Dasar RPE", "Progres beban terukur", "Video cue teknik"],
    href: "https://lynk.id/prps.sport/q7mn77dz3w7m",
    description: "Program 6 minggu khusus powerlifting untuk pemula serius. Focus pada Squat, Bench Press, dan Deadlift dengan teknik yang benar dan progres yang aman.",
    image: "/images/powerlifting-intro.jpg",
    equipment: ["Barbell + plates", "Squat rack", "Bench press", "Safety bars"],
    targetAudience: ["Mau serius powerlifting", "Sudah punya akses gym lengkap", "Siap komit 4-6x/minggu"],
    goals: ["Menguasai teknik SBD", "Memahami RPE system", "Membangun strength base", "Persiapan kompetisi lokal"],
    workoutOverview: [
      {
        week: 1,
        focus: "Teknik & Movement Pattern",
        workouts: [
          {
            day: 1,
            name: "Squat Focus",
            exercises: [
              { name: "Back Squat", sets: "5", reps: "5", rest: "3 min", notes: "Focus depth & technique" },
              { name: "Romanian Deadlift", sets: "3", reps: "8", rest: "2 min", notes: "Hip hinge pattern" },
              { name: "Leg Press", sets: "3", reps: "12", rest: "90s", notes: "Quad activation" },
              { name: "Plank", sets: "3", reps: "30-60s", rest: "60s", notes: "Core stability" }
            ]
          },
          {
            day: 2,
            name: "Bench Focus",
            exercises: [
              { name: "Bench Press", sets: "5", reps: "5", rest: "3 min", notes: "Arch & leg drive" },
              { name: "Incline Dumbbell Press", sets: "3", reps: "8", rest: "2 min", notes: "Upper chest focus" },
              { name: "Barbell Row", sets: "3", reps: "8", rest: "2 min", notes: "Retract scapula" },
              { name: "Face Pulls", sets: "3", reps: "15", rest: "60s", notes: "Rear delt activation" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "beginner-powerlifting",
    title: "Home Bodyweight Foundation",
    level: "Pemula",
    durationWeeks: 4,
    daysPerWeek: "3x/minggu, 30-45 menit", 
    environment: "Home",
    price: "Rp 149.000",
    features: ["Tanpa alat", "Progres bertahap", "Fleksibel waktu", "Video panduan lengkap"],
    href: "https://lynk.id/prps.sport/q7mn77dz3w7m",
    description: "Program 4 minggu bodyweight yang perfect untuk pemula atau yang mau latihan di rumah. No excuse, cukup ruang 2x2 meter dan 30-45 menit aja!",
    image: "/images/home-bodyweight.jpg",
    equipment: ["Matras/towel", "Chair/sofa (opsional)", "Wall space"],
    targetAudience: ["Pemula banget", "Ga ada akses gym", "Sibuk, butuh fleksibilitas waktu", "Mau latihan bareng keluarga"],
    goals: ["Membangun habit latihan", "Strengthen movement basics", "Improve mobility & flexibility", "Prepare untuk gym program"],
    workoutOverview: [
      {
        week: 1,
        focus: "Movement Basics & Habit Building",
        workouts: [
          {
            day: 1,
            name: "Upper Body Foundation",
            exercises: [
              { name: "Push-up (knee/wall)", sets: "3", reps: "5-10", rest: "60s", notes: "Start with easiest variation" },
              { name: "Bodyweight Row (table)", sets: "3", reps: "5-10", rest: "60s", notes: "Use sturdy table" },
              { name: "Pike Push-up", sets: "2", reps: "3-8", rest: "90s", notes: "Shoulders & arms" },
              { name: "Arm Circles", sets: "2", reps: "10 each direction", rest: "30s", notes: "Warm up shoulders" }
            ]
          },
          {
            day: 2,
            name: "Lower Body Foundation",
            exercises: [
              { name: "Bodyweight Squat", sets: "3", reps: "8-15", rest: "60s", notes: "Full range of motion" },
              { name: "Reverse Lunge", sets: "3", reps: "6-12 each leg", rest: "60s", notes: "Control the descent" },
              { name: "Single Leg Glute Bridge", sets: "3", reps: "5-10 each", rest: "45s", notes: "Squeeze at top" },
              { name: "Calf Raises", sets: "2", reps: "15-20", rest: "30s", notes: "Pause at top" }
            ]
          }
        ]
      }
    ]
  }
]

export const ALL_PLANS: Plan[] = [
  ...FEATURED_PLANS,
  {
    id: "bodybuilding-split",
    title: "Bodybuilding Split",
    level: "Intermediate",
    durationWeeks: 12,
    daysPerWeek: "6-day",
    environment: "Gym", 
    price: "$35",
    features: ["Muscle isolation", "High volume", "Aesthetic focus", "Supplement guide"],
    href: "https://lynk.id/prps.sport/q7mn77dz3w7m",
  },
  {
    id: "home-strength",
    title: "Home Strength Builder",
    level: "Pemula",
    durationWeeks: 8,
    daysPerWeek: "3-day",
    environment: "Home",
    price: "$18",
    features: ["Bodyweight focused", "Minimal equipment", "Space efficient", "Family friendly"],
    href: "https://lynk.id/prps.sport/q7mn77dz3w7m",
  },
  {
    id: "powerlifting-peaking",
    title: "Powerlifting Peaking",
    level: "Advanced", 
    durationWeeks: 6,
    daysPerWeek: "4-day",
    environment: "Gym",
    price: "$45",
    features: ["Competition prep", "1RM focus", "Peaking protocol", "Recovery strategies"],
    href: "https://lynk.id/prps.sport/q7mn77dz3w7m",
  }
]

export const TESTIMONIALS = [
  {
    name: "Rina, 27",
    quote: "Baru pertama kali ke gym dan nggak bingung lagi—latihannya jelas step by step.",
    rating: 5
  },
  {
    name: "Andi, 24", 
    quote: "Powerlifting ternyata bisa banget buat pemula, tekniknya dipecah detail.",
    rating: 5
  },
  {
    name: "Sari, 29",
    quote: "Fleksibel banget, bisa latihan di rumah kalau lagi sibuk atau ke gym pas weekend.",
    rating: 5
  },
  {
    name: "Budi, 31",
    quote: "Worth it banget! Komunitas supportive dan programnya beneran kerja.",
    rating: 5
  }
]

export const STATS = [
  { label: "Member Aktif", value: "2,500+" },
  { label: "Tingkat Completion", value: "89%" },
  { label: "Partner Gym", value: "50+" }
]

export const FAQ_ITEMS = [
  {
    question: "Saya pemula banget. Bisa ikut?",
    answer: "Bisa banget! Semua program punya variasi ringan dan video cue teknik yang detail. Mulai dari program Foundation dulu."
  },
  {
    question: "Harus ke gym?",
    answer: "Tidak harus. Ada opsi home (dumbbell/bodyweight) dan gym (barbell). Pilih sesuai akses dan preferensi kamu."
  },
  {
    question: "Bagaimana akses setelah bayar?",
    answer: "Setelah pembayaran via Lynk.id, kamu langsung dapat link untuk download materi (PDF, video, tracker)."
  },
  {
    question: "Kalau tidak cocok, bisa refund?", 
    answer: "Jika belum mengunduh materi, bisa ajukan refund dalam 7 hari sesuai kebijakan Lynk.id. Hubungi support@lynk.id."
  },
  {
    question: "Jadwalnya fleksibel?",
    answer: "Sangat fleksibel! Program bisa diadaptasi sesuai waktu luang. Ada panduan swap workout dan rest day adjustment."
  },
  {
    question: "Dapat support komunitas?",
    answer: "Tentu! Join grup WhatsApp dan follow Instagram @prps_sport untuk tips, motivasi, dan tanya-jawab."
  }
]
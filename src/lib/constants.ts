export const SITE_CONFIG = {
  name: "PRPS",
  tagline: "your plan, your pace, keep showing",
  description: "Program gym ramah pemula untuk bodybuilding dan powerlifting. Your plan, your pace, keep showing.",
  url: "https://prps-landing.vercel.app",
  creator: "@prps_sport",
}

export const SOCIAL_LINKS = {
  tiktok: "https://tiktok.com/@prps.sport",
  instagram: "https://instagram.com/prps.sport", 
  youtube: "https://youtube.com/@prps.sport",
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

export const SPORT_CATEGORIES = [
  "Powerlifting",
  "Bodybuilding", 
  "Running",
  "Boxing",
  "Athletic Performance"
] as const

export type PlanCategory = typeof PLAN_CATEGORIES[number]
export type PlanSchedule = typeof PLAN_SCHEDULES[number]
export type PlanEnvironment = typeof PLAN_ENVIRONMENTS[number]
export type SportCategory = typeof SPORT_CATEGORIES[number]

export interface PersonalTrainer {
  name: string
  credentials: string[]
  specialization: string[]
  experience: string
  image?: string
}

export const TRAINERS: PersonalTrainer[] = [
  {
    name: "Coach Andi Prasetya",
    credentials: ["Certified Strength & Conditioning Specialist (CSCS)", "Powerlifting Coach Level 2"],
    specialization: ["Powerlifting", "Strength Training", "Competition Prep"],
    experience: "8 tahun coaching powerlifting & strength training. Alumni juara Jatim Powerlifting Championship.",
    image: "/images/trainer-andi.jpg"
  },
  {
    name: "Coach Sari Indrawati", 
    credentials: ["Certified Personal Trainer (CPT)", "Bodybuilding Judge IFBB"],
    specialization: ["Bodybuilding", "Aesthetic Training", "Contest Prep"],
    experience: "6 tahun experience bodybuilding coaching. Mantan atlet bikini fitness nasional.",
    image: "/images/trainer-sari.jpg"
  },
  {
    name: "Coach Rio Mahendra",
    credentials: ["Running Coach Certified", "Marathon Finisher (Sub 3:00)"],
    specialization: ["Distance Running", "Marathon Training", "Endurance Coaching"],
    experience: "10 tahun coaching runners dari 5K sampai ultra marathon. PB marathon 2:58.",
    image: "/images/trainer-rio.jpg"
  },
  {
    name: "Coach Dimas Putra",
    credentials: ["Boxing Coach License", "Muay Thai Instructor"],
    specialization: ["Boxing", "Combat Sports", "Self Defense"],
    experience: "7 tahun coaching boxing & muay thai. Mantan atlet tinju PON Jawa Timur.",
    image: "/images/trainer-dimas.jpg"
  },
  {
    name: "Coach Fitri Ramadhani",
    credentials: ["Speed & Agility Specialist", "Athletic Performance Coach"],
    specialization: ["Speed Training", "Athletic Performance", "Sports Conditioning"],
    experience: "5 tahun coaching athletes dari berbagai sport. Spesialis speed & power development.",
    image: "/images/trainer-fitri.jpg"
  }
]

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
  sport: SportCategory
  trainer: PersonalTrainer
}

export const FEATURED_PLANS: Plan[] = [
  {
    id: "sbd-powerlifting",
    title: "SBD Powerlifting Program",
    level: "Intermediate",
    durationWeeks: 12,
    daysPerWeek: "4x/minggu, 60-90 menit",
    environment: "Gym",
    price: "Rp 399.000",
    features: ["Teknik SBD advanced", "Peaking protocol", "RPE & percentage training", "Competition prep"],
    href: "https://lynk.id/prps.sport/q7mn77dz3w7m",
    tags: ["Best Seller"],
    sport: "Powerlifting",
    trainer: TRAINERS[0],
    description: "Program 12 minggu powerlifting serius untuk master Squat, Bench Press, dan Deadlift. Dari strength building sampai peaking untuk kompetisi.",
    image: "/images/sbd-powerlifting.jpg",
    equipment: ["Barbell olympik", "Squat rack", "Bench press", "Plates", "Belt powerlifting"],
    targetAudience: ["Serious lifters", "Persiapan kompetisi", "Mau PR di SBD", "Level intermediate+"],
    goals: ["Master teknik SBD", "Increase 1RM significantly", "Competition ready", "Injury-free progression"],
    workoutOverview: [
      {
        week: 1,
        focus: "Volume Accumulation",
        workouts: [
          {
            day: 1,
            name: "Squat Emphasis",
            exercises: [
              { name: "Back Squat", sets: "5", reps: "5 @ RPE 7-8", rest: "3-4 min", notes: "Focus competition depth" },
              { name: "Front Squat", sets: "4", reps: "6-8", rest: "3 min", notes: "Quad emphasis" },
              { name: "Romanian Deadlift", sets: "3", reps: "8-10", rest: "2 min", notes: "Hip hinge reinforcement" },
              { name: "Leg Press", sets: "3", reps: "15-20", rest: "90s", notes: "High volume finisher" },
              { name: "Abs Circuit", sets: "3", reps: "45s work/15s rest", rest: "2 min", notes: "Core stability" }
            ]
          },
          {
            day: 2,
            name: "Bench Emphasis", 
            exercises: [
              { name: "Bench Press", sets: "5", reps: "5 @ RPE 7-8", rest: "3-4 min", notes: "Competition grip & setup" },
              { name: "Close Grip Bench", sets: "4", reps: "6-8", rest: "3 min", notes: "Tricep & lockout strength" },
              { name: "Barbell Row", sets: "4", reps: "8-10", rest: "2 min", notes: "Lat engagement" },
              { name: "Overhead Press", sets: "3", reps: "8-12", rest: "90s", notes: "Shoulder stability" },
              { name: "Tricep Dips", sets: "3", reps: "10-15", rest: "90s", notes: "Bodyweight finisher" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "bodybuilding-aesthetic",
    title: "Bodybuilding Aesthetic Split",
    level: "Intermediate",
    durationWeeks: 12,
    daysPerWeek: "5-6x/minggu, 60-75 menit",
    environment: "Gym",
    price: "Rp 349.000",
    features: ["Muscle isolation focus", "High volume training", "Aesthetic sculpting", "Nutrition & supplement guide"],
    href: "https://lynk.id/prps.sport/q7mn77dz3w7m",
    tags: ["Popular"],
    sport: "Bodybuilding",
    trainer: TRAINERS[1],
    description: "Program 12 minggu bodybuilding aesthetic untuk sculpt physique yang proporsional. Focus pada muscle definition, symmetry, dan visual impact.",
    image: "/images/bodybuilding-aesthetic.jpg",
    equipment: ["Full gym access", "Dumbbells", "Cable machine", "Barbells", "Preacher bench"],
    targetAudience: ["Goal aesthetic physique", "Mau compete/photoshoot", "Level intermediate", "Komit high volume training"],
    goals: ["Muscle definition & size", "Proportional physique", "Low body fat", "Stage/photo ready"],
    workoutOverview: [
      {
        week: 1,
        focus: "Hypertrophy Foundation",
        workouts: [
          {
            day: 1,
            name: "Chest & Triceps",
            exercises: [
              { name: "Barbell Bench Press", sets: "4", reps: "8-10", rest: "2 min", notes: "Muscle contraction focus" },
              { name: "Incline Dumbbell Press", sets: "4", reps: "10-12", rest: "90s", notes: "Upper chest development" },
              { name: "Cable Flyes", sets: "3", reps: "12-15", rest: "60s", notes: "Peak contraction" },
              { name: "Close Grip Bench", sets: "3", reps: "10-12", rest: "90s", notes: "Tricep mass focus" },
              { name: "Cable Tricep Extension", sets: "4", reps: "12-15", rest: "45s", notes: "Multiple angles" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "marathon-training",
    title: "Marathon Training Program",
    level: "Intermediate",
    durationWeeks: 16,
    daysPerWeek: "5-6x/minggu, 45-90 menit",
    environment: "Home",
    price: "Rp 299.000",
    features: ["Progressive mileage", "Speed work sessions", "Recovery protocols", "Race day strategy"],
    href: "https://lynk.id/prps.sport/q7mn77dz3w7m",
    sport: "Running",
    trainer: TRAINERS[2],
    description: "Program 16 minggu comprehensive untuk finish marathon dengan waktu yang optimal. Structured training dari base building sampai peak performance.",
    image: "/images/marathon-training.jpg",
    equipment: ["Running shoes", "GPS watch/phone", "Comfortable gear", "Water bottle & fuel"],
    targetAudience: ["Target marathon 6 bulan", "Sudah bisa lari 10K", "Komit high mileage", "Goal sub 4:30 marathon"],
    goals: ["Complete 42K distance", "Optimal race time", "Injury-free training", "Peak endurance fitness"],
    workoutOverview: [
      {
        week: 1,
        focus: "Base Building Phase",
        workouts: [
          {
            day: 1,
            name: "Easy Long Run",
            exercises: [
              { name: "Warm-up Jog", sets: "1", reps: "10 min", rest: "-", notes: "Very easy pace" },
              { name: "Long Run", sets: "1", reps: "8-10 km", rest: "-", notes: "Conversational pace, build aerobic base" },
              { name: "Cool-down Walk", sets: "1", reps: "5 min", rest: "-", notes: "Gradual recovery" },
              { name: "Stretching", sets: "1", reps: "15 min", rest: "-", notes: "Full body mobility" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "boxing-fundamentals",
    title: "Boxing Fundamentals",
    level: "Pemula",
    durationWeeks: 8,
    daysPerWeek: "3-4x/minggu, 45-60 menit",
    environment: "Home or Gym",
    price: "Rp 249.000",
    features: ["Basic boxing technique", "Cardio conditioning", "Shadowboxing drills", "Heavy bag combinations"],
    href: "https://lynk.id/prps.sport/q7mn77dz3w7m",
    sport: "Boxing",
    trainer: TRAINERS[3],
    description: "Program 8 minggu boxing fundamentals yang fun dan challenging. Perfect untuk cardio, stress relief, dan build confidence lewat martial arts.",
    image: "/images/boxing-fundamentals.jpg",
    equipment: ["Boxing gloves", "Hand wraps", "Heavy bag (opsional)", "Jump rope", "Timer app"],
    targetAudience: ["Pemula boxing", "Mau cardio yang engaging", "Stress relief", "Self-defense basics"],
    goals: ["Master basic punches", "Cardio improvement", "Coordination & timing", "Mental toughness"],
    workoutOverview: [
      {
        week: 1,
        focus: "Stance & Basic Punches",
        workouts: [
          {
            day: 1,
            name: "Boxing Basics A",
            exercises: [
              { name: "Jump Rope", sets: "3", reps: "2 min", rest: "1 min", notes: "Light on feet" },
              { name: "Stance Practice", sets: "5", reps: "1 min", rest: "30s", notes: "Orthodox/southpaw comfort" },
              { name: "Jab Technique", sets: "5", reps: "20 punches", rest: "30s", notes: "Snap & return" },
              { name: "Cross Technique", sets: "5", reps: "20 punches", rest: "30s", notes: "Hip rotation power" },
              { name: "Shadowboxing", sets: "3", reps: "1 min", rest: "1 min", notes: "Combine jab-cross" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sprinter-speed",
    title: "Sprinter Speed Development",
    level: "Intermediate",
    durationWeeks: 10,
    daysPerWeek: "4x/minggu, 60-75 menit",
    environment: "Gym",
    price: "Rp 349.000",
    features: ["Sprint technique", "Explosive power", "Plyometric training", "Speed endurance"],
    href: "https://lynk.id/prps.sport/q7mn77dz3w7m",
    sport: "Athletic Performance",
    trainer: TRAINERS[4],
    description: "Program 10 minggu untuk develop kecepatan maksimal dan power. Khusus untuk athletes yang butuh speed advantage di sport mereka.",
    image: "/images/sprinter-speed.jpg",
    equipment: ["Track/open field", "Barbell", "Plyometric box", "Agility ladder", "Resistance bands"],
    targetAudience: ["Athletes semua sport", "Soccer/basketball players", "Competitive runners", "Mau improve acceleration"],
    goals: ["Increase top speed", "Better acceleration", "Explosive power", "Sport-specific speed"],
    workoutOverview: [
      {
        week: 1,
        focus: "Speed Mechanics & Power Base",
        workouts: [
          {
            day: 1,
            name: "Speed & Power A",
            exercises: [
              { name: "Dynamic Warm-up", sets: "1", reps: "10 min", rest: "-", notes: "A-skips, high knees, butt kicks" },
              { name: "Acceleration Sprints", sets: "6", reps: "20m", rest: "2 min", notes: "Focus first 3-5 steps" },
              { name: "Box Jumps", sets: "4", reps: "5", rest: "2 min", notes: "Max height, soft landing" },
              { name: "Back Squat (Speed)", sets: "5", reps: "3 @ 60%", rest: "3 min", notes: "Explosive concentric" },
              { name: "Single Leg Bounds", sets: "3", reps: "8 each", rest: "90s", notes: "Distance focus" }
            ]
          }
        ]
      }
    ]
  }
]

export const ALL_PLANS: Plan[] = FEATURED_PLANS

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
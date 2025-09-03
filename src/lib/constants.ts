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
    href: "https://lynk.id/prps.sport/powerbuilding-foundation",
    tags: ["Popular"]
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
    href: "https://lynk.id/prps.sport/push-pull-legs"
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
    href: "https://lynk.id/prps.sport/beginner-powerlifting"
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
    href: "https://lynk.id/prps.sport/bodybuilding-split"
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
    href: "https://lynk.id/prps.sport/home-strength"
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
    href: "https://lynk.id/prps.sport/powerlifting-peaking"
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
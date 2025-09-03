export const SITE_CONFIG = {
  name: "PRPS",
  tagline: "your plan, your pace, keep showing",
  description: "Programs that fit your life. PRPS workout plans for bodybuilding and powerlifting.",
  url: "https://prps-landing.vercel.app",
  creator: "@prps_sport",
}

export const SOCIAL_LINKS = {
  tiktok: "https://tiktok.com/@prps_sport",
  instagram: "https://instagram.com/prps_sport", 
  youtube: "https://youtube.com/@prps_sport",
}

export const PLAN_CATEGORIES = [
  "Beginner",
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
    title: "Powerbuilding Foundation",
    level: "Beginner",
    durationWeeks: 8,
    daysPerWeek: "4-day",
    environment: "Home or Gym",
    price: "$19",
    features: ["Full body strength", "Muscle building focus", "Progressive overload", "Video guides"],
    href: "https://lynk.id/prps.sport/powerbuilding-foundation",
    tags: ["Popular"]
  },
  {
    id: "push-pull-legs",
    title: "Push/Pull/Legs 5-Day",
    level: "Intermediate", 
    durationWeeks: 12,
    daysPerWeek: "5-day",
    environment: "Gym",
    price: "$29",
    features: ["Split training", "Volume progression", "Advanced techniques", "Nutrition guide"],
    href: "https://lynk.id/prps.sport/push-pull-legs"
  },
  {
    id: "beginner-powerlifting",
    title: "Beginner Powerlifting 3-Day",
    level: "Beginner",
    durationWeeks: 4,
    daysPerWeek: "3-day", 
    environment: "Home or Gym",
    price: "$15",
    features: ["Big 3 focus", "Form tutorials", "Strength building", "Minimal equipment"],
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
    level: "Beginner",
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
    name: "Sarah M.",
    quote: "Finally found a program that fits my busy schedule. Lost 15lbs in 8 weeks!",
    rating: 5
  },
  {
    name: "David K.", 
    quote: "The progression is perfect. PR'd my squat after just 4 weeks.",
    rating: 5
  },
  {
    name: "Maya R.",
    quote: "Love the flexibility. Home workouts when I'm busy, gym when I have time.",
    rating: 5
  },
  {
    name: "Alex T.",
    quote: "Best investment I've made for my fitness. The community is amazing too.",
    rating: 5
  }
]

export const STATS = [
  { label: "Athletes Helped", value: "2,500+" },
  { label: "Avg. Plan Completion", value: "89%" },
  { label: "Community Partners", value: "50+" }
]

export const FAQ_ITEMS = [
  {
    question: "What makes PRPS plans different?",
    answer: "Our plans are designed by certified coaches with real-world experience. Each program adapts to your lifestyle - whether you have a home gym or prefer commercial gyms."
  },
  {
    question: "Do I need expensive equipment?",
    answer: "Most plans work with basic equipment: dumbbells, resistance bands, or just bodyweight. We clearly mark what's needed for each program."
  },
  {
    question: "What if I don't like my plan?",
    answer: "All purchases are handled through Lynk.id with their standard refund policy. Contact support@lynk.id for any issues."
  },
  {
    question: "Are these suitable for beginners?", 
    answer: "Absolutely! We have dedicated beginner programs with form videos and progression guides. Start with our Foundation programs."
  },
  {
    question: "How flexible are the schedules?",
    answer: "Very flexible! Most plans include workout swaps and rest day adjustments. You can adapt the timing to fit your schedule."
  },
  {
    question: "How do I get support?",
    answer: "Join our community on social media for peer support, or contact us directly for program questions."
  }
]
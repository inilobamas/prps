export const SITE_CONFIG = {
  name: "PRPS",
  tagline: "your plan, your pace, #KeepShowing",
  description: "Program gym ramah pemula untuk bodybuilding dan powerlifting. Your plan, your pace, #KeepShowing.",
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
    id: "sbd-powerbuilding",
    title: "Power Building Program",
    level: "Intermediate",
    durationWeeks: 12,
    daysPerWeek: "5x/minggu, 60-90 menit",
    environment: "Gym",
    price: "Rp 500.000",
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
              { name: "Back Squat (comp style)", sets: "5", reps: "5 @75–80% (RPE 7–8)", rest: "3–4 min", notes: "Depth konsisten, bracing solid" },
              { name: "Front Squat", sets: "4", reps: "6–8 @60–70%", rest: "3 min", notes: "Quad focus, torso upright" },
              { name: "Romanian Deadlift", sets: "3", reps: "8–10", rest: "2 min", notes: "Hip hinge, hamstring stretch" },
              { name: "Leg Press", sets: "3", reps: "15–20", rest: "90 s", notes: "High volume finisher" },
              { name: "Hanging Knee/Leg Raise", sets: "3", reps: "10–15", rest: "60–90 s", notes: "Core anti-extension" }
            ]
          },
          {
            day: 2,
            name: "Bench Emphasis",
            exercises: [
              { name: "Bench Press (comp pause)", sets: "5", reps: "5 @75–80% (RPE 7–8)", rest: "3–4 min", notes: "Pause 1 detik di chest" },
              { name: "Close-Grip Bench", sets: "4", reps: "6–8", rest: "3 min", notes: "Tricep/lockout" },
              { name: "Barbell Row", sets: "4", reps: "8–10", rest: "2 min", notes: "Lat engagement, torso stabil" },
              { name: "Overhead Press", sets: "3", reps: "8–12", rest: "90 s", notes: "Head-through, no layback" },
              { name: "Tricep Dips / Assisted", sets: "3", reps: "10–15", rest: "90 s", notes: "Full ROM" }
            ]
          },
          {
            day: 3,
            name: "Deadlift Emphasis",
            exercises: [
              { name: "Deadlift (sumo/conv)", sets: "4", reps: "4 @75–80% (RPE 7–8)", rest: "3–4 min", notes: "Pull slack, lats tight" },
              { name: "Pause Deadlift (mid-shin)", sets: "3", reps: "3 @65–70%", rest: "3 min", notes: "Pause 1–2 s" },
              { name: "Hip Thrust / 45° Back Extension", sets: "3", reps: "8–12", rest: "2 min", notes: "Glute squeeze" },
              { name: "Walking Lunge", sets: "3", reps: "12/leg", rest: "90 s", notes: "Knee track over toes" },
              { name: "Standing Calf Raise", sets: "3", reps: "10–12 (pause bawah)", rest: "90 s", notes: "Full ROM" }
            ]
          },
          {
            day: 4,
            name: "SBD Technique + Pump",
            exercises: [
              { name: "Squat (tempo 3-0-1)", sets: "3", reps: "6 @60–65%", rest: "2–3 min", notes: "Kontrol bawah" },
              { name: "Bench (touch-and-go)", sets: "3", reps: "8 @65–70%", rest: "2–3 min", notes: "Groove bar path" },
              { name: "Lat Pulldown / Pull-up", sets: "3", reps: "8–12", rest: "2 min", notes: "Scap depressed" },
              { name: "Lateral Raise", sets: "3", reps: "15–20", rest: "60–90 s", notes: "Constant tension" },
              { name: "Face Pull", sets: "3", reps: "15–20", rest: "60–90 s", notes: "Rear-delt + external rotation" }
            ]
          }
        ]
      },
      {
        week: 2,
        focus: "Volume Accumulation + Technique",
        workouts: [
          {
            day: 1,
            name: "Squat Volume",
            exercises: [
              { name: "Back Squat", sets: "5", reps: "5 @77–82% (RPE 8)", rest: "3–4 min", notes: "Bar speed dijaga" },
              { name: "Pause High-Bar Squat (2s)", sets: "3", reps: "4–6 @60–65%", rest: "3 min", notes: "Posisi tegak" },
              { name: "Good Morning (light)", sets: "3", reps: "8–10", rest: "2 min", notes: "Feel hamstrings" },
              { name: "Leg Extension", sets: "3", reps: "12–15", rest: "90 s", notes: "Lockout squeeze" },
              { name: "Cable Crunch / Ab Wheel", sets: "3", reps: "12–15", rest: "60–90 s", notes: "Neutral pelvis" }
            ]
          },
          {
            day: 2,
            name: "Bench Strength",
            exercises: [
              { name: "Bench Press (top set)", sets: "1", reps: "2 @85–90% (RPE 8)", rest: "4–5 min", notes: "Sisa ~2 rep" },
              { name: "Bench Press (back-off)", sets: "3", reps: "6 @75–78%", rest: "3 min", notes: "Pause singkat" },
              { name: "Chin-up (weighted if needed)", sets: "3", reps: "8–10", rest: "2–3 min", notes: "Chest to bar" },
              { name: "DB Arnold Press", sets: "2", reps: "10–12", rest: "2 min", notes: "Rotasi in-out" },
              { name: "Chest-Supported DB Row", sets: "2", reps: "12–15", rest: "90 s", notes: "Lat focus" },
              { name: "Lateral Raise + Face Pull (superset)", sets: "2+2", reps: "15–20", rest: "30–45 s", notes: "Pump & posture" }
            ]
          },
          {
            day: 3,
            name: "Deadlift Strength",
            exercises: [
              { name: "Deadlift", sets: "5", reps: "3 @80–82% (RPE 7–8)", rest: "3–4 min", notes: "Lat brace, chest tall" },
              { name: "Sumo Box Squat / High-Bar Pause", sets: "2", reps: "8 @RPE 7", rest: "2–3 min", notes: "Varian sesuai squat style" },
              { name: "Leg Curl (lying/NRD)", sets: "3", reps: "6–8", rest: "90 s", notes: "Hamstring bias" },
              { name: "Pull-Through (cable/band)", sets: "3", reps: "12–15", rest: "60–90 s", notes: "Glute drive" },
              { name: "Standing Calf Raise", sets: "3", reps: "8–10 (pause bawah)", rest: "90 s", notes: "Full squeeze" }
            ]
          },
          {
            day: 4,
            name: "Upper Hypertrophy",
            exercises: [
              { name: "Overhead Press", sets: "3", reps: "4 @~80%", rest: "3 min", notes: "Press up & slightly back" },
              { name: "Close-Grip Bench", sets: "2", reps: "12 @RPE 7", rest: "2–3 min", notes: "Elbow tuck" },
              { name: "Pendlay Row (light/clean)", sets: "2", reps: "10", rest: "2 min", notes: "No lower-back fatigue" },
              { name: "Single-Arm Lat Pulldown", sets: "2", reps: "10–12", rest: "2 min", notes: "Drive elbow down-in" },
              { name: "Pec Fly (cable/DB)", sets: "2", reps: "15–20", rest: "60–90 s", notes: "Full stretch" },
              { name: "Incline Shrug + Upright Row", sets: "2+2", reps: "15–20", rest: "30 s", notes: "Trap & mid-delt" }
            ]
          }
        ]
      },
      {
        week: 3,
        focus: "Volume → Strength Transition",
        workouts: [
          {
            day: 1,
            name: "Squat Top Set",
            exercises: [
              { name: "Back Squat (top set)", sets: "1", reps: "8 @72.5–77.5% (RPE 8.5)", rest: "4–5 min", notes: "Sisa 1–2 rep" },
              { name: "Back Squat (back-off)", sets: "2", reps: "6 @~75%", rest: "3–4 min", notes: "Form konsisten" },
              { name: "Overhead Press", sets: "3", reps: "8 @~72.5%", rest: "2–3 min", notes: "Reset tiap rep" },
              { name: "GHR / Nordic", sets: "2", reps: "8–10", rest: "1–2 min", notes: "Hips straight" },
              { name: "Helms Row", sets: "3", reps: "12–15", rest: "1–2 min", notes: "Strict" },
              { name: "Hammer Curl", sets: "3", reps: "20–25", rest: "60–90 s", notes: "Grip squeeze" }
            ]
          },
          {
            day: 2,
            name: "Deadlift + Bench",
            exercises: [
              { name: "Deadlift", sets: "4", reps: "2 @85%", rest: "3–5 min", notes: "Bar speed & tightness" },
              { name: "Bench Press (top set)", sets: "1", reps: "6 @75–80% (RPE 8.5)", rest: "4–5 min", notes: "Sisa 1–2 rep" },
              { name: "Bench Press (back-off)", sets: "2", reps: "8 @72.5%", rest: "2–3 min", notes: "Pause 1 s" },
              { name: "Weighted Pull-up", sets: "3", reps: "5–8", rest: "3–4 min", notes: "Chest to bar" },
              { name: "Standing Calf Raise", sets: "3", reps: "8", rest: "2–3 min", notes: "Pause bawah" }
            ]
          },
          {
            day: 3,
            name: "Squat + Dips",
            exercises: [
              { name: "Back Squat", sets: "4", reps: "4 @80%", rest: "3–4 min", notes: "Upper-back pressure to bar" },
              { name: "Weighted Dip", sets: "3", reps: "8", rest: "2–3 min", notes: "Alt: DB floor press" },
              { name: "Hanging Leg Raise", sets: "3", reps: "10–12", rest: "1–2 min", notes: "Controlled" },
              { name: "Lat Pullover", sets: "3", reps: "12–15", rest: "1–2 min", notes: "Stretch & squeeze" },
              { name: "Incline DB Curl", sets: "2", reps: "12–15", rest: "1–2 min", notes: "Start weak arm" },
              { name: "Face Pull", sets: "4", reps: "15–20", rest: "1–2 min", notes: "Scap retract" }
            ]
          },
          {
            day: 4,
            name: "Paused Pulls + Paused Bench",
            exercises: [
              { name: "Pause Deadlift (3s)", sets: "4", reps: "2 @77.5%", rest: "3–4 min", notes: "Pause tepat setelah lepas lantai" },
              { name: "Pause Bench Press (2–3s)", sets: "4", reps: "5 @75%", rest: "2–3 min", notes: "Kontrol bawah" },
              { name: "Chest-Supported Row / Pendlay", sets: "3", reps: "10", rest: "2–3 min", notes: "Minimize cheat" },
              { name: "Nordic Ham Curl / Lying Curl", sets: "2", reps: "6–8", rest: "90 s", notes: "Quality reps" },
              { name: "DB Shrug", sets: "3", reps: "20–25", rest: "60–90 s", notes: "Stretch & hard squeeze" }
            ]
          }
        ]
      },
      {
        week: 4,
        focus: "Strength Emphasis",
        workouts: [
          {
            day: 1,
            name: "Deadlift Heavy Double + Lower",
            exercises: [
              { name: "Deadlift (top set)", sets: "1", reps: "2 @87.5–92.5% (RPE 9)", rest: "4–5 min", notes: "Dekat PR, form rapih" },
              { name: "Deadlift (back-off)", sets: "3", reps: "3 @80%", rest: "3–4 min", notes: "Speed focus" },
              { name: "Sumo Box Squat / Pause High-Bar", sets: "2", reps: "8 @RPE 7", rest: "2–3 min", notes: "Varian sesuai style" },
              { name: "Pull-Through", sets: "3", reps: "12–15", rest: "60–90 s", notes: "Glute drive" },
              { name: "Leg Curl", sets: "3", reps: "6–8", rest: "90 s", notes: "Hamstring bias" },
              { name: "Standing Calf Raise", sets: "3", reps: "8–10", rest: "90 s", notes: "Pause bawah" }
            ]
          },
          {
            day: 2,
            name: "Upper Horizontal Push/Pull",
            exercises: [
              { name: "Bench Press", sets: "3", reps: "6 @77.5%", rest: "3–4 min", notes: "Arch nyaman, explode up" },
              { name: "Chin-up", sets: "3", reps: "8–10", rest: "2–3 min", notes: "Add load if needed" },
              { name: "DB Arnold Press", sets: "2", reps: "10–12", rest: "2 min", notes: "Rotate in-out" },
              { name: "Chest-Supported DB Row", sets: "2", reps: "12–15", rest: "90 s", notes: "Lat squeeze" },
              { name: "Face Pull + Lateral Raise", sets: "2+2", reps: "15–20", rest: "30–45 s", notes: "Posture & delts" },
              { name: "Concentration Curl", sets: "3", reps: "12–15", rest: "60–90 s", notes: "Elbow pinned" }
            ]
          },
          {
            day: 3,
            name: "Back Squat Volume",
            exercises: [
              { name: "Back Squat", sets: "3", reps: "6 @75%", rest: "3–4 min", notes: "Upper-back tight" },
              { name: "Good Morning (light)", sets: "2", reps: "10–12", rest: "2–3 min", notes: "Hamstrings feel" },
              { name: "Leg Extension", sets: "3", reps: "12–15", rest: "90 s", notes: "Quad pump" },
              { name: "Banded Lateral Walk / Hip Abduction", sets: "3", reps: "15–20", rest: "60–90 s", notes: "Glute medius" },
              { name: "V Sit-up", sets: "3", reps: "12–15", rest: "60–90 s", notes: "Control" }
            ]
          },
          {
            day: 4,
            name: "Pressing Power + Upper Back",
            exercises: [
              { name: "Overhead Press → Push Press (3+3)", sets: "3", reps: "3 strict + 3 push @~80%", rest: "3–4 min", notes: "Strict dulu, lalu gunakan leg drive" },
              { name: "Single-Arm Lat Pulldown", sets: "2", reps: "10–12", rest: "2–3 min", notes: "Elbow path down-in" },
              { name: "Barbell Floor Press", sets: "2", reps: "12 @RPE 7", rest: "1–2 min", notes: "Control eccentric" },
              { name: "Pendlay Row (light)", sets: "2", reps: "10", rest: "2 min", notes: "Explosive from floor" },
              { name: "Pec Fly (cable/DB)", sets: "2", reps: "15–20", rest: "60–90 s", notes: "Big stretch" },
              { name: "Incline Shrug + Reverse Fly", sets: "2+2", reps: "15–20", rest: "30–45 s", notes: "Trap + rear delt" },
              { name: "Barbell Skull Crusher", sets: "2", reps: "8–10", rest: "1–2 min", notes: "Constant tension" }
            ]
          }
        ]
      },
      {
        week: 5,
        focus: "Strength Building",
        workouts: [
          {
            day: 1,
            name: "Squat Top Triple",
            exercises: [
              { name: "Back Squat (top set)", sets: "1", reps: "3 @82.5–87.5% (RPE 8.5)", rest: "4–5 min", notes: "Dekat 3RM" },
              { name: "Back Squat (back-off)", sets: "2", reps: "4 @80%", rest: "3–4 min", notes: "Form identik" },
              { name: "Overhead Press", sets: "3", reps: "8 @75%", rest: "2–3 min", notes: "Reset tiap rep" },
              { name: "GHR / Nordic", sets: "2", reps: "8–10", rest: "90 s", notes: "Hips straight" },
              { name: "Helms Row", sets: "3", reps: "12–15", rest: "90 s", notes: "Strict" },
              { name: "Hammer Curl", sets: "3", reps: "20–25", rest: "60–90 s", notes: "Forearm pump" }
            ]
          },
          {
            day: 2,
            name: "Deadlift + Bench Heavy",
            exercises: [
              { name: "Deadlift", sets: "3", reps: "3 @85%", rest: "3–5 min", notes: "Slack-out + speed" },
              { name: "Bench Press (top set)", sets: "1", reps: "4 @82.5–87.5% (RPE 9)", rest: "4–5 min", notes: "Dekat 4RM" },
              { name: "Bench Press (back-off, pause 1s)", sets: "2", reps: "6 @80%", rest: "2–3 min", notes: "Tight setup" },
              { name: "Weighted Pull-up", sets: "3", reps: "5–8", rest: "3–4 min", notes: "Chest to bar" },
              { name: "Standing Calf Raise", sets: "3", reps: "8", rest: "2–3 min", notes: "Pause bawah" }
            ]
          },
          {
            day: 3,
            name: "Squat Volume + Upper Pump",
            exercises: [
              { name: "Back Squat", sets: "3", reps: "6 @77.5%", rest: "3–4 min", notes: "Upper-back tight" },
              { name: "Weighted Dip", sets: "3", reps: "8", rest: "2–3 min", notes: "Depth konsisten" },
              { name: "Hanging Leg Raise", sets: "3", reps: "10–12", rest: "1–2 min", notes: "Controlled" },
              { name: "Lat Pullover", sets: "3", reps: "12–15", rest: "1–2 min", notes: "Stretch & squeeze" },
              { name: "Incline DB Curl", sets: "2", reps: "12–15", rest: "1–2 min", notes: "No swing" },
              { name: "Face Pull", sets: "4", reps: "15–20", rest: "60–90 s", notes: "Scap retract" }
            ]
          },
          {
            day: 4,
            name: "Paused Pulls + Paused Bench",
            exercises: [
              { name: "Pause Deadlift (3s)", sets: "4", reps: "2 @82.5%", rest: "3–4 min", notes: "Control start" },
              { name: "Pause Bench Press (2–3s)", sets: "3", reps: "6 @75%", rest: "2–3 min", notes: "Bar path back & up" },
              { name: "Chest-Supported Row / Pendlay", sets: "3", reps: "10", rest: "2–3 min", notes: "Stay light, clean reps" },
              { name: "Nordic / Lying Leg Curl", sets: "3", reps: "6–8", rest: "90 s", notes: "Ham bias" },
              { name: "DB Shrug", sets: "3", reps: "20–25", rest: "60–90 s", notes: "Stretch & squeeze" }
            ]
          }
        ]
      },
      {
        week: 6,
        focus: "Semi-Deload (Recover & Groove)",
        workouts: [
          {
            day: 1,
            name: "Lower Semi-Deload",
            exercises: [
              { name: "Deadlift", sets: "3", reps: "4 @~80% (RPE 6–7)", rest: "3–4 min", notes: "Technique priority" },
              { name: "Sumo Box / Pause High-Bar", sets: "2", reps: "8 @RPE 5–6", rest: "2–3 min", notes: "Light & crisp" },
              { name: "Pull-Through", sets: "2", reps: "12–15", rest: "60–90 s", notes: "Glute squeeze" },
              { name: "Leg Curl", sets: "3", reps: "6–8", rest: "90 s", notes: "No failure" },
              { name: "Standing Calf Raise", sets: "2", reps: "8–10", rest: "90 s", notes: "Pause bawah" }
            ]
          },
          {
            day: 2,
            name: "Upper Semi-Deload",
            exercises: [
              { name: "Bench Press", sets: "2", reps: "7 @~77.5% (RPE 6–7)", rest: "3–4 min", notes: "Tempo stabil" },
              { name: "Chin-up", sets: "2", reps: "8–10 @RPE 6–7", rest: "2–3 min", notes: "Avoid failure" },
              { name: "Arnold Press", sets: "2", reps: "10–12 @RPE 6–7", rest: "2 min", notes: "Easy groove" },
              { name: "Chest-Supported Row", sets: "2", reps: "12–15", rest: "90 s", notes: "Lat feel" },
              { name: "Face Pull + Lateral Raise", sets: "2+2", reps: "15–20", rest: "30–45 s", notes: "Pump ringan" }
            ]
          },
          {
            day: 3,
            name: "Lower Technique",
            exercises: [
              { name: "Back Squat (single heavy technique)", sets: "1", reps: "1 @90–95% (RPE 9-) ", rest: "4–5 min", notes: "Satu set berat untuk groove" },
              { name: "Low-Bar Back Squat (back-off)", sets: "2", reps: "7 @75%", rest: "3–4 min", notes: "Smooth reps" },
              { name: "Leg Extension", sets: "3", reps: "12–15", rest: "90 s", notes: "Quad pump" },
              { name: "Banded Lateral Walk", sets: "3", reps: "15–20", rest: "60–90 s", notes: "Glute medius" },
              { name: "V Sit-up", sets: "3", reps: "12–15", rest: "60–90 s", notes: "Controlled" }
            ]
          },
          {
            day: 4,
            name: "Upper Technique",
            exercises: [
              { name: "OHP", sets: "3", reps: "10 @easy", rest: "2–3 min", notes: "No grind" },
              { name: "Neutral/Regular Pull-up", sets: "2", reps: "10 @RPE 6–7", rest: "2–3 min", notes: "Avoid failure" },
              { name: "Weighted Dips (light)", sets: "2", reps: "10", rest: "2 min", notes: "Smooth ROM" },
              { name: "Single-Arm Row", sets: "2", reps: "10–12", rest: "90 s", notes: "Lat focus" },
              { name: "Barbell/EZ Curl", sets: "3", reps: "12–15", rest: "60–90 s", notes: "MMC" }
            ]
          }
        ]
      },
      {
        week: 7,
        focus: "Intensification I",
        workouts: [
          {
            day: 1,
            name: "Squat Heavy Triple",
            exercises: [
              { name: "Back Squat (top set)", sets: "1", reps: "3 @85–90% (RPE 8.5)", rest: "4–5 min", notes: "Tambah beban vs wk5" },
              { name: "Back Squat (back-off)", sets: "2", reps: "2 @85%", rest: "3–4 min", notes: "Bar speed" },
              { name: "Overhead Press", sets: "4", reps: "8 @70%", rest: "2–3 min", notes: "Reset tiap rep" },
              { name: "GHR / Nordic", sets: "2", reps: "8–10", rest: "90 s", notes: "Strict" },
              { name: "Helms Row", sets: "2", reps: "12–15", rest: "90 s", notes: "Strict" },
              { name: "Hammer Curl", sets: "3", reps: "20–25", rest: "60–90 s", notes: "Grip" }
            ]
          },
          {
            day: 2,
            name: "Paused Pulls + Bench Heavy Triple",
            exercises: [
              { name: "Pause Deadlift (3s)", sets: "4", reps: "2 @75%", rest: "3–4 min", notes: "Positioning" },
              { name: "Bench Press (top set)", sets: "1", reps: "3 @85–90% (RPE 9)", rest: "4–5 min", notes: "Dekat 3RM" },
              { name: "Bench Press (back-off)", sets: "2", reps: "4 @80%", rest: "2–3 min", notes: "Explosive" },
              { name: "Hip Abduction (band/machine)", sets: "3", reps: "15–20", rest: "60–90 s", notes: "Isometric 1s at top" },
              { name: "Weighted Pull-up", sets: "3", reps: "3–5", rest: "3–4 min", notes: "Quality" },
              { name: "Standing Calf Raise", sets: "3", reps: "8", rest: "2–3 min", notes: "Pause bawah" }
            ]
          },
          {
            day: 3,
            name: "Squat Volume 6s",
            exercises: [
              { name: "Back Squat", sets: "4", reps: "6 @77.5%", rest: "3–4 min", notes: "Tight upper back" },
              { name: "Weighted Dip", sets: "3", reps: "8", rest: "2–3 min", notes: "Depth" },
              { name: "Hanging Leg Raise", sets: "3", reps: "10–12", rest: "1–2 min", notes: "Controlled" },
              { name: "Lat Pullover", sets: "3", reps: "12–15", rest: "1–2 min", notes: "Stretch" },
              { name: "Incline DB Curl", sets: "2", reps: "12–15", rest: "1–2 min", notes: "MMC" },
              { name: "Face Pull", sets: "3", reps: "15–20", rest: "60–90 s", notes: "Posture" }
            ]
          },
          {
            day: 4,
            name: "Deadlift Heavy Triple + Paused Bench",
            exercises: [
              { name: "Deadlift (top set)", sets: "1", reps: "3 @85–90% (RPE 8.5–9)", rest: "4–5 min", notes: "Heavy but clean" },
              { name: "Pause Bench Press (2–3s)", sets: "4", reps: "6 @75%", rest: "2–3 min", notes: "Tight chest pause" },
              { name: "Chest-Supported Row / Pendlay", sets: "3", reps: "10", rest: "2–3 min", notes: "Neutral spine" },
              { name: "Nordic / Lying Leg Curl", sets: "3", reps: "6–8", rest: "90 s", notes: "Ham focus" },
              { name: "DB Shrug", sets: "3", reps: "20–25", rest: "60–90 s", notes: "Trap finish" }
            ]
          }
        ]
      },
      {
        week: 8,
        focus: "Intensification II",
        workouts: [
          {
            day: 1,
            name: "Deadlift Volume 5s",
            exercises: [
              { name: "Deadlift", sets: "3", reps: "5 @80%", rest: "3–4 min", notes: "Bar speed" },
              { name: "Sumo Box / Pause High-Bar", sets: "2", reps: "8 @RPE 7", rest: "2–3 min", notes: "Positioning" },
              { name: "Pull-Through", sets: "3", reps: "12–15", rest: "60–90 s", notes: "Glute drive" },
              { name: "Leg Curl", sets: "3", reps: "6–8", rest: "90 s", notes: "No cheating" },
              { name: "Standing Calf Raise", sets: "3", reps: "8–10", rest: "90 s", notes: "Pause bawah" }
            ]
          },
          {
            day: 2,
            name: "Bench Strength 7s",
            exercises: [
              { name: "Bench Press", sets: "2", reps: "7 @~77.5%", rest: "3–4 min", notes: "Explode after pause" },
              { name: "Chin-up", sets: "3", reps: "8–10", rest: "2–3 min", notes: "Add load jika perlu" },
              { name: "DB Arnold Press", sets: "2", reps: "10–12", rest: "2 min", notes: "Controlled" },
              { name: "Chest-Supported Row", sets: "2", reps: "12–15", rest: "90 s", notes: "Lat squeeze" },
              { name: "Face Pull + Lateral Raise", sets: "2+3", reps: "15–20", rest: "30–45 s", notes: "Shoulder health" },
              { name: "Concentration Curl", sets: "3", reps: "12–15", rest: "60–90 s", notes: "MMC" }
            ]
          },
          {
            day: 3,
            name: "Squat 7s + Accessories",
            exercises: [
              { name: "Low-Bar Back Squat", sets: "3", reps: "7 @75%", rest: "3–4 min", notes: "Tight bar path" },
              { name: "Good Morning", sets: "2", reps: "10–12", rest: "2–3 min", notes: "Ham feel" },
              { name: "Leg Extension", sets: "3", reps: "12–15", rest: "90 s", notes: "Quad burn" },
              { name: "Banded Lateral Walk / Hip Abduction", sets: "3", reps: "15–20", rest: "60–90 s", notes: "Glute medius" },
              { name: "V Sit-up", sets: "3", reps: "12–15", rest: "60–90 s", notes: "Controlled" }
            ]
          },
          {
            day: 4,
            name: "Press Power + Upper Back",
            exercises: [
              { name: "OHP → Push Press (3+3)", sets: "3", reps: "3 strict + 3 push @~82.5%", rest: "3–4 min", notes: "Leg drive di set kedua bagian" },
              { name: "Single-Arm Lat Pulldown", sets: "2", reps: "10–12", rest: "2–3 min", notes: "Elbow down-in" },
              { name: "Incline DB Press (45°)", sets: "2", reps: "12", rest: "2–3 min", notes: "Scap retracted" },
              { name: "Pendlay Row (light)", sets: "2", reps: "10", rest: "2 min", notes: "Explosive off floor" },
              { name: "Pec Fly", sets: "3", reps: "15–20", rest: "60–90 s", notes: "Full ROM" },
              { name: "Incline Shrug + Reverse Fly", sets: "2+2", reps: "15–20", rest: "30–45 s", notes: "Trap + rear delt" },
              { name: "Barbell Skull Crusher", sets: "2", reps: "8–10", rest: "1–2 min", notes: "Tension" }
            ]
          }
        ]
      },
      {
        week: 9,
        focus: "Strength Intensification (Heavy Doubles)",
        workouts: [
          {
            day: 1,
            name: "Squat Heavy Double + Walkout",
            exercises: [
              { name: "Back Squat (top set)", sets: "1", reps: "2 @87.5–92.5% (RPE 8.5)", rest: "4–5 min", notes: "Dekat 2RM" },
              { name: "Squat Walk-out (no squat)", sets: "1", reps: "10s hold @~100%", rest: "4–5 min", notes: "Set safeties tinggi" },
              { name: "Overhead Press", sets: "3", reps: "6 @80%", rest: "2–3 min", notes: "Reset tiap rep" },
              { name: "GHR / Nordic", sets: "2", reps: "8–10", rest: "90 s", notes: "Hips straight" },
              { name: "Helms Row", sets: "2", reps: "12–15", rest: "90 s", notes: "Strict" },
              { name: "Hammer Curl", sets: "3", reps: "20–25", rest: "60–90 s", notes: "Forearm pump" }
            ]
          },
          {
            day: 2,
            name: "Deadlift Technique + Bench Heavy Double",
            exercises: [
              { name: "Deadlift", sets: "3", reps: "4 @80% (tech focus)", rest: "3–5 min", notes: "Semi-deload pull" },
              { name: "Bench Press (top set)", sets: "1", reps: "2 @87.5–92.5% (RPE 9)", rest: "4–5 min", notes: "Dekat 2RM" },
              { name: "Bench Press (back-off)", sets: "2", reps: "2 @87.5%", rest: "3 min", notes: "Bar path back & up" },
              { name: "Hip Abduction", sets: "3", reps: "15–20 (1s hold)", rest: "60–90 s", notes: "Glute medius" },
              { name: "Weighted Pull-up", sets: "3", reps: "3–5", rest: "3–4 min", notes: "Quality reps" },
              { name: "Standing Calf Raise", sets: "3", reps: "8", rest: "2–3 min", notes: "Pause bawah" }
            ]
          },
          {
            day: 3,
            name: "Squat 4s + Upper Accessories",
            exercises: [
              { name: "Back Squat", sets: "3", reps: "4 @82.5%", rest: "3–4 min", notes: "Tight brace" },
              { name: "Weighted Dip", sets: "3", reps: "8", rest: "2–3 min", notes: "Depth" },
              { name: "Hanging Leg Raise", sets: "3", reps: "10–12", rest: "1–2 min", notes: "Controlled" },
              { name: "Lat Pullover", sets: "3", reps: "12–15", rest: "1–2 min", notes: "Stretch" },
              { name: "Incline DB Curl", sets: "2", reps: "12–15", rest: "1–2 min", notes: "MMC" },
              { name: "Face Pull", sets: "3", reps: "15–20", rest: "60–90 s", notes: "Rear delt" }
            ]
          },
          {
            day: 4,
            name: "Paused Pulls + Paused Bench (Heavier)",
            exercises: [
              { name: "Pause Deadlift (3s)", sets: "4", reps: "2 @75%", rest: "3–4 min", notes: "Clean positions" },
              { name: "Pause Bench Press", sets: "3", reps: "5 @77.5%", rest: "2–3 min", notes: "Tight chest pause" },
              { name: "Chest-Supported Row / Pendlay", sets: "3", reps: "10", rest: "2–3 min", notes: "Neutral spine" },
              { name: "Nordic / Lying Leg Curl", sets: "3", reps: "6–8", rest: "90 s", notes: "Ham focus" },
              { name: "DB Shrug", sets: "3", reps: "20–25", rest: "60–90 s", notes: "Trap finish" }
            ]
          }
        ]
      },
      {
        week: 10,
        focus: "Max Testing / Mock Meet (pilih 10A atau 10B)",
        workouts: [
          {
            day: 1,
            name: "Squat Test",
            exercises: [
              { name: "Back Squat – Option A", sets: "1", reps: "AMRAP @90% (RPE 9.5)", rest: "4–5 min", notes: "Stop sebelum gagal (3+ reps target)" },
              { name: "Back Squat – Option B", sets: "1–3", reps: "1 @100–105% (RPE 9.5)", rest: "4–5 min", notes: "PR attempts 2–3%" },
              { name: "Light Accessories (optional)", sets: "2–3", reps: "12–15", rest: "60–90 s", notes: "Lat, calves, curls; ringan" }
            ]
          },
          {
            day: 2,
            name: "Bench Test",
            exercises: [
              { name: "Bench Press – Option A", sets: "1", reps: "AMRAP @90% (RPE 9.5)", rest: "4–5 min", notes: "3+ reps target" },
              { name: "Bench Press – Option B", sets: "1–3", reps: "1 @100–105% (RPE 9.5)", rest: "4–5 min", notes: "PR attempts 2–3%" },
              { name: "Light Accessories (optional)", sets: "2–3", reps: "12–15", rest: "60–90 s", notes: "Triceps/shoulders ringan" }
            ]
          },
          {
            day: 3,
            name: "Deadlift Test",
            exercises: [
              { name: "Deadlift – Option A", sets: "1", reps: "AMRAP @90% (RPE 9.5)", rest: "4–5 min", notes: "3+ reps target" },
              { name: "Deadlift – Option B", sets: "1–3", reps: "1 @100–105% (RPE 9.5)", rest: "4–5 min", notes: "PR attempts 2–3%" },
              { name: "Mobility/Core (optional)", sets: "2–3", reps: "12–15", rest: "60–90 s", notes: "Easy work" }
            ]
          }
        ]
      },
      {
        week: 11,
        focus: "Full Deload & Technical Reset",
        workouts: [
          {
            day: 1,
            name: "Lower Deload",
            exercises: [
              { name: "Deadlift", sets: "2", reps: "3 @~75% (RPE 6)", rest: "3–4 min", notes: "Technique only" },
              { name: "Sumo Box / Pause High-Bar", sets: "2", reps: "6 @RPE 5", rest: "2–3 min", notes: "Easy tempo" },
              { name: "Leg Curl", sets: "2", reps: "6–8 @RPE 6", rest: "90 s", notes: "No failure" },
              { name: "Standing Calf Raise", sets: "2", reps: "8–10 @RPE 6", rest: "90 s", notes: "Pause bawah" },
              { name: "Hanging Leg Raise", sets: "2", reps: "10–12 @RPE 6", rest: "60–90 s", notes: "Controlled" }
            ]
          },
          {
            day: 2,
            name: "Upper Deload",
            exercises: [
              { name: "Bench Press", sets: "3", reps: "6 @~72.5% (RPE 6)", rest: "3–4 min", notes: "Smooth bar path" },
              { name: "Assisted Chin-up", sets: "2", reps: "8–10 @RPE 7", rest: "2–3 min", notes: "Easy reps" },
              { name: "Overhead Press", sets: "2", reps: "4 @75% (RPE 6)", rest: "2–3 min", notes: "No grind" },
              { name: "Chest-Supported Row", sets: "2", reps: "12–15 @RPE 6–7", rest: "90 s", notes: "Lat focus" },
              { name: "Face Pull + Lateral Raise", sets: "2+2", reps: "15–20 @RPE 7", rest: "30–45 s", notes: "Shoulder health" },
              { name: "Concentration Curl + Pressdown", sets: "2+2", reps: "12–15 @RPE 7", rest: "30–45 s", notes: "Pump ringan" }
            ]
          },
          {
            day: 3,
            name: "Lower Deload II",
            exercises: [
              { name: "Back Squat", sets: "2", reps: "6 @70% (RPE 6)", rest: "3–4 min", notes: "Tempo stabil" },
              { name: "Snatch-Grip RDL", sets: "2", reps: "8 @RPE 6", rest: "2–3 min", notes: "Ham focus" },
              { name: "Leg Extension", sets: "2", reps: "12–15 @RPE 7", rest: "90 s", notes: "Quad pump" },
              { name: "Standing Calf Raise", sets: "3", reps: "15–20 @RPE 7", rest: "90 s", notes: "Full ROM" },
              { name: "Banded Lateral Walk / Hip Abduction", sets: "3", reps: "15–20", rest: "60–90 s", notes: "Glute medius" },
              { name: "V Sit-up", sets: "3", reps: "12–15", rest: "60–90 s", notes: "Controlled" }
            ]
          },
          {
            day: 4,
            name: "Upper Deload II",
            exercises: [
              { name: "Close-Grip Bench", sets: "3", reps: "10 @RPE 6", rest: "2–3 min", notes: "Elbow tuck" },
              { name: "Chest-Supported Row", sets: "2", reps: "10 @RPE 6", rest: "2–3 min", notes: "Lat focus" },
              { name: "Weighted Dip (light)", sets: "3", reps: "6 @RPE 7", rest: "2–3 min", notes: "Smooth ROM" },
              { name: "Single-Arm Lat Pulldown", sets: "2", reps: "10 @RPE 7", rest: "2–3 min", notes: "Elbow path" },
              { name: "Incline Shrug + Upright Row", sets: "2+2", reps: "15–20 @RPE 7", rest: "30–45 s", notes: "Trap/delt" },
              { name: "EZ Curl + Skull Crusher", sets: "3+3", reps: "12–15 & 8–10 @RPE 7", rest: "30–45 s", notes: "Pump only" }
            ]
          }
        ]
      },
      {
        week: 12,
        focus: "Peaking & Competition Prep",
        workouts: [
          {
            day: 1,
            name: "Squat Peak",
            exercises: [
              { name: "Back Squat (singles)", sets: "3–5", reps: "1 @85–92% (RPE 8–9)", rest: "3–5 min", notes: "Competition commands" },
              { name: "Back Squat (back-off)", sets: "2", reps: "3 @75–80%", rest: "3–4 min", notes: "Speed work" },
              { name: "Core (plank/brace)", sets: "3", reps: "45–60 s", rest: "60–90 s", notes: "Maintain IAP" }
            ]
          },
          {
            day: 2,
            name: "Bench Peak",
            exercises: [
              { name: "Bench Press (singles, comp pause)", sets: "3–5", reps: "1 @85–92% (RPE 8–9)", rest: "3–5 min", notes: "Press command simulation" },
              { name: "Bench (back-off)", sets: "2", reps: "3 @75–80%", rest: "3–4 min", notes: "Bar path & speed" },
              { name: "Scap/Triceps Primer", sets: "3", reps: "12–15", rest: "60–90 s", notes: "Face pull / Pressdown ringan" }
            ]
          },
          {
            day: 3,
            name: "Deadlift Peak",
            exercises: [
              { name: "Deadlift (singles)", sets: "3–5", reps: "1 @85–92% (RPE 8–9)", rest: "3–5 min", notes: "Down command practice" },
              { name: "Deadlift (back-off)", sets: "2", reps: "2–3 @75–80%", rest: "3–4 min", notes: "Speed & timing" },
              { name: "Mobility / Breath Work", sets: "3", reps: "60–90 s", rest: "60 s", notes: "Hip openers, diaphragmatic" }
            ]
          },
          {
            day: 4,
            name: "Mock Meet & Taper (Opsional di akhir minggu)",
            exercises: [
              { name: "Mock Meet Order", sets: "-", reps: "S:1–3 singles @88–92% | B:1–3 singles @88–92% | D:1–3 singles @88–92%", rest: "3–5 min", notes: "Full commands, attempt selection konservatif" },
              { name: "Cool Down", sets: "-", reps: "Light stretching 8–10 menit", rest: "-", notes: "Recovery priority" }
            ]
          }
        ]
      }
    ]
  },
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
  // {
  //   question: "Kalau tidak cocok, bisa refund?", 
  //   answer: "Jika belum mengunduh materi, bisa ajukan refund dalam 7 hari sesuai kebijakan Lynk.id. Hubungi support@lynk.id."
  // },
  {
    question: "Jadwalnya fleksibel?",
    answer: "Sangat fleksibel! Program bisa diadaptasi sesuai waktu luang. Ada panduan swap workout dan rest day adjustment."
  },
  {
    question: "Dapat support komunitas?",
    answer: "Tentu! Join grup WhatsApp dan follow Instagram @prps_sport untuk tips, motivasi, dan tanya-jawab."
  }
]
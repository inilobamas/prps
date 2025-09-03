"use client"

import { useState } from "react"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Save } from "lucide-react"
import { 
  PLAN_CATEGORIES, 
  PLAN_ENVIRONMENTS, 
  SPORT_CATEGORIES,
  TRAINERS,
  type Plan,
  type WorkoutWeek,
  type PlanCategory,
  type PlanEnvironment,
  type SportCategory
} from "@/lib/constants"

interface Exercise {
  name: string
  sets: string
  reps: string
  rest: string
  notes?: string
}

interface WorkoutDay {
  day: number
  name: string
  exercises: Exercise[]
}

export default function CreateProgramPage() {
  const [plan, setPlan] = useState<Partial<Plan>>({
    title: "",
    description: "",
    level: "Pemula",
    durationWeeks: 8,
    daysPerWeek: "3x/minggu, 60 menit",
    environment: "Gym",
    price: "Rp 299.000",
    sport: "Bodybuilding",
    trainer: TRAINERS[0],
    features: [],
    equipment: [],
    targetAudience: [],
    goals: []
  })

  const [currentWeek, setCurrentWeek] = useState<WorkoutWeek>({
    week: 1,
    focus: "",
    workouts: []
  })

  const [currentDay, setCurrentDay] = useState<WorkoutDay>({
    day: 1,
    name: "",
    exercises: []
  })

  const [currentExercise, setCurrentExercise] = useState<Exercise>({
    name: "",
    sets: "",
    reps: "",
    rest: "",
    notes: ""
  })

  const addExercise = () => {
    if (!currentExercise.name || !currentExercise.sets || !currentExercise.reps) return

    setCurrentDay(prev => ({
      ...prev,
      exercises: [...prev.exercises, currentExercise]
    }))
    
    setCurrentExercise({
      name: "",
      sets: "",
      reps: "",
      rest: "",
      notes: ""
    })
  }

  const removeExercise = (index: number) => {
    setCurrentDay(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }))
  }

  const addFeature = (feature: string) => {
    if (!feature.trim() || plan.features?.includes(feature)) return
    setPlan(prev => ({
      ...prev,
      features: [...(prev.features || []), feature]
    }))
  }

  const removeFeature = (index: number) => {
    setPlan(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }))
  }

  const saveProgram = () => {
    const programData = {
      ...plan,
      id: plan.title?.toLowerCase().replace(/\s+/g, '-') || '',
      href: "https://lynk.id/prps.sport/new-program",
      workoutOverview: [currentWeek]
    }
    
    console.log("Program saved:", programData)
    alert("Program berhasil disimpan!")
  }

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Buat Program Baru
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Rancang program latihan untuk client kamu
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Program Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Program</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Judul Program</label>
                  <Input
                    value={plan.title}
                    onChange={(e) => setPlan(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Beginner Strength Program"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Deskripsi</label>
                  <Textarea
                    value={plan.description}
                    onChange={(e) => setPlan(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Jelaskan program ini untuk siapa dan tujuannya..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Level</label>
                    <Select value={plan.level} onValueChange={(value: PlanCategory) => setPlan(prev => ({ ...prev, level: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PLAN_CATEGORIES.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Sport</label>
                    <Select value={plan.sport} onValueChange={(value: SportCategory) => setPlan(prev => ({ ...prev, sport: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SPORT_CATEGORIES.map(sport => (
                          <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Durasi (minggu)</label>
                    <Input
                      type="number"
                      value={plan.durationWeeks}
                      onChange={(e) => setPlan(prev => ({ ...prev, durationWeeks: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Environment</label>
                    <Select value={plan.environment} onValueChange={(value: PlanEnvironment) => setPlan(prev => ({ ...prev, environment: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PLAN_ENVIRONMENTS.map(env => (
                          <SelectItem key={env} value={env}>{env}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Jadwal</label>
                  <Input
                    value={plan.daysPerWeek}
                    onChange={(e) => setPlan(prev => ({ ...prev, daysPerWeek: e.target.value }))}
                    placeholder="e.g. 3x/minggu, 60 menit"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Harga</label>
                  <Input
                    value={plan.price}
                    onChange={(e) => setPlan(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="e.g. Rp 299.000"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Features</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add feature..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addFeature(e.currentTarget.value)
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector('input')
                        if (input?.value) {
                          addFeature(input.value)
                          input.value = ""
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {plan.features?.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {feature}
                        <Trash2 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeFeature(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Workout Builder */}
            <Card>
              <CardHeader>
                <CardTitle>Builder Workout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Week Focus</label>
                    <Input
                      value={currentWeek.focus}
                      onChange={(e) => setCurrentWeek(prev => ({ ...prev, focus: e.target.value }))}
                      placeholder="e.g. Strength Building"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Day Name</label>
                    <Input
                      value={currentDay.name}
                      onChange={(e) => setCurrentDay(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Chest & Triceps"
                    />
                  </div>
                </div>

                {/* Exercise Builder */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Tambah Exercise</h4>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <Input
                      value={currentExercise.name}
                      onChange={(e) => setCurrentExercise(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Exercise name"
                    />
                    <Input
                      value={currentExercise.sets}
                      onChange={(e) => setCurrentExercise(prev => ({ ...prev, sets: e.target.value }))}
                      placeholder="Sets (e.g. 4)"
                    />
                    <Input
                      value={currentExercise.reps}
                      onChange={(e) => setCurrentExercise(prev => ({ ...prev, reps: e.target.value }))}
                      placeholder="Reps (e.g. 8-12)"
                    />
                    <Input
                      value={currentExercise.rest}
                      onChange={(e) => setCurrentExercise(prev => ({ ...prev, rest: e.target.value }))}
                      placeholder="Rest (e.g. 90s)"
                    />
                  </div>
                  <Input
                    value={currentExercise.notes}
                    onChange={(e) => setCurrentExercise(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Notes (optional)"
                    className="mb-3"
                  />
                  <Button onClick={addExercise} size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Exercise
                  </Button>
                </div>

                {/* Exercise List */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {currentDay.exercises.map((exercise, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex-1">
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {exercise.sets} sets × {exercise.reps} reps, rest {exercise.rest}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExercise(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button onClick={saveProgram} className="w-full mt-6">
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Program
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}
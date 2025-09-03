"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { PlanCard } from "@/components/PlanCard"
import { Button } from "@/components/ui/button"
import { 
  ALL_PLANS, 
  PLAN_CATEGORIES, 
  PLAN_SCHEDULES, 
  PLAN_ENVIRONMENTS,
  type PlanCategory,
  type PlanSchedule,
  type PlanEnvironment 
} from "@/lib/constants"

type FilterType = "level" | "schedule" | "environment"

interface Filters {
  level: PlanCategory | "All"
  schedule: PlanSchedule | "All" 
  environment: PlanEnvironment | "All"
}

export default function PlansPage() {
  const [filters, setFilters] = useState<Filters>({
    level: "All",
    schedule: "All",
    environment: "All"
  })

  const filteredPlans = useMemo(() => {
    return ALL_PLANS.filter(plan => {
      if (filters.level !== "All" && plan.level !== filters.level) return false
      if (filters.schedule !== "All" && plan.daysPerWeek !== filters.schedule) return false
      if (filters.environment !== "All" && plan.environment !== filters.environment) return false
      return true
    })
  }, [filters])

  const updateFilter = (type: FilterType, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const clearFilters = () => {
    setFilters({ level: "All", schedule: "All", environment: "All" })
  }

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Pilih Program Kamu
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Temukan program latihan yang cocok untuk goal dan lifestyle kamu
          </p>
        </div>

        {/* Filters */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Level Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filters.level === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter("level", "All")}
              >
                Semua Level
              </Button>
              {PLAN_CATEGORIES.map(level => (
                <Button
                  key={level}
                  variant={filters.level === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilter("level", level)}
                >
                  {level}
                </Button>
              ))}
            </div>

            {/* Schedule Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filters.schedule === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter("schedule", "All")}
              >
                Jadwal Apa Saja
              </Button>
              {PLAN_SCHEDULES.map(schedule => (
                <Button
                  key={schedule}
                  variant={filters.schedule === schedule ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilter("schedule", schedule)}
                >
                  {schedule}
                </Button>
              ))}
            </div>

            {/* Environment Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filters.environment === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter("environment", "All")}
              >
                Lokasi Apa Saja
              </Button>
              {PLAN_ENVIRONMENTS.map(env => (
                <Button
                  key={env}
                  variant={filters.environment === env ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilter("environment", env)}
                >
                  {env}
                </Button>
              ))}
            </div>

            {(filters.level !== "All" || filters.schedule !== "All" || filters.environment !== "All") && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Hapus Filter
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mt-12">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Menampilkan {filteredPlans.length} dari {ALL_PLANS.length} program
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <PlanCard plan={plan} />
              </motion.div>
            ))}
          </div>

          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Tidak ada program yang cocok dengan filter. Coba sesuaikan pilihan kamu.
              </p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Hapus Filter
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
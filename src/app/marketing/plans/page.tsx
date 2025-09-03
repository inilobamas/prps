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
  PLAN_ENVIRONMENTS,
  SPORT_CATEGORIES,
  type PlanCategory,
  type PlanEnvironment,
  type SportCategory
} from "@/lib/constants"

type FilterType = "level" | "environment" | "sport"

interface Filters {
  level: PlanCategory | "All"
  environment: PlanEnvironment | "All"
  sport: SportCategory | "All"
}

export default function PlansPage() {
  const [filters, setFilters] = useState<Filters>({
    level: "All",
    environment: "All",
    sport: "All"
  })

  const filteredPlans = useMemo(() => {
    return ALL_PLANS.filter(plan => {
      if (filters.level !== "All" && plan.level !== filters.level) return false
      if (filters.environment !== "All" && plan.environment !== filters.environment) return false
      if (filters.sport !== "All" && plan.sport !== filters.sport) return false
      return true
    })
  }, [filters])

  const updateFilter = (type: FilterType, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const clearFilters = () => {
    setFilters({ level: "All", environment: "All", sport: "All" })
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
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="space-y-4">
            {/* Sport Filter */}
            <div className="text-center">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Filter by Sport:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={filters.sport === "All" ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilter("sport", "All")}
                >
                  Semua Sport
                </Button>
                {SPORT_CATEGORIES.map(sport => (
                  <Button
                    key={sport}
                    variant={filters.sport === sport ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateFilter("sport", sport)}
                  >
                    {sport}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Secondary Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-muted">
              {/* Level & Environment */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Level & Lokasi:</p>
                <div className="flex flex-wrap gap-1 justify-center">
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
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  <Button
                    variant={filters.environment === "All" ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateFilter("environment", "All")}
                  >
                    Semua Lokasi
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
              </div>
            </div>

            </div>
            
            {(filters.level !== "All" || filters.environment !== "All" || filters.sport !== "All") && (
              <div className="text-center mt-4">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Hapus Semua Filter
                </Button>
              </div>
            )}
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
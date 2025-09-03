"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock, Calendar, MapPin } from "lucide-react"
import { Plan } from "@/lib/constants"
import { trackPlanClick } from "@/lib/analytics"
import { motion } from "framer-motion"

interface PlanCardProps {
  plan: Plan
  featured?: boolean
}

export function PlanCard({ plan, featured = false }: PlanCardProps) {
  const handleCTAClick = () => {
    trackPlanClick(plan.id, plan.title)
    window.open(plan.href, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className={`h-full flex flex-col ${featured ? 'ring-2 ring-green-500' : ''}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <Badge variant={plan.level === "Pemula" || plan.level === "Pemula serius" ? "secondary" : plan.level === "Intermediate" ? "default" : "outline"}>
              {plan.level}
            </Badge>
            {plan.tags && plan.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-green-500 text-white">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {plan.durationWeeks} weeks
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {plan.daysPerWeek}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {plan.environment}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1">
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <div className="text-2xl font-bold">{plan.price}</div>
          <Button onClick={handleCTAClick} className="bg-green-500 hover:bg-green-600">
            Get via Lynk.id
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
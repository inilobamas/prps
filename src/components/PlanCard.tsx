"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock, Calendar, MapPin, Eye, User } from "lucide-react"
import { Plan } from "@/lib/constants"
import { trackPlanClick } from "@/lib/analytics"
import Link from "next/link"
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
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {plan.durationWeeks} minggu
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
            {plan.trainer && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                <span>by {plan.trainer.name}</span>
              </div>
            )}
            <Badge variant="outline" className="text-xs">
              {plan.sport}
            </Badge>
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

        <CardFooter className="flex flex-col gap-3">
          <div className="text-2xl font-bold text-center w-full">{plan.price}</div>
          <div className="flex gap-2 w-full">
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/marketing/plans/${plan.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                Detail
              </Link>
            </Button>
            <Button onClick={handleCTAClick} className="flex-1 bg-green-500 hover:bg-green-600">
              Beli
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
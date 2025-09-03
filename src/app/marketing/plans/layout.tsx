import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Workout Plans",
  description: "Browse our collection of coach-built workout plans for bodybuilding and powerlifting. Programs for every fitness level.",
  path: "/plans"
})

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
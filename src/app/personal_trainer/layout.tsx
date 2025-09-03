import { Metadata } from "next"

export const metadata: Metadata = {
  title: "PT Dashboard | PRPS",
  description: "Dashboard for Personal Trainers to manage programs and clients"
}

export default function PTLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
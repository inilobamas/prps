import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Partner with PRPS",
  description: "Collaborate with PRPS to bring quality fitness programs to your community. Open to creators and gyms in Malang & Indonesia.",
  path: "/collab"
})

export default function CollabLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SocialIconLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  className?: string
}

export function SocialIconLink({ href, icon, label, className }: SocialIconLinkProps) {
  return (
    <Button asChild variant="ghost" size="sm" className={cn("h-8 w-8 px-0", className)}>
      <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {icon}
      </Link>
    </Button>
  )
}
import Link from "next/link"
import { Container } from "./Container"
import { SocialIconLink } from "./SocialIconLink"
import { NewsletterForm } from "./NewsletterForm"
import { Separator } from "@/components/ui/separator"
import { SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <Container>
        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold">PRPS</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                {SITE_CONFIG.tagline}
              </p>
              <div className="flex space-x-2">
                <SocialIconLink
                  href={SOCIAL_LINKS.tiktok}
                  icon={<span className="text-xs font-bold">TT</span>}
                  label="TikTok"
                />
                <SocialIconLink
                  href={SOCIAL_LINKS.instagram}
                  icon={<span className="text-xs font-bold">IG</span>}
                  label="Instagram"
                />
                <SocialIconLink
                  href={SOCIAL_LINKS.youtube}
                  icon={<span className="text-xs font-bold">YT</span>}
                  label="YouTube"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-green-500">Home</Link></li>
                <li><Link href="/plans" className="hover:text-green-500">Plans</Link></li>
                <li><Link href="/collab" className="hover:text-green-500">Collab</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-green-500">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-green-500">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Stay Updated</h4>
              <p className="text-sm text-muted-foreground">
                Get the latest plans and fitness tips.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <Separator className="my-8" />
          
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PRPS. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Made with ❤️ for the fitness community
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
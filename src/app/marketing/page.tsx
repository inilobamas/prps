"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { PlanCard } from "@/components/PlanCard"
import { StatsRow } from "@/components/StatsRow"
import { FEATURED_PLANS, TESTIMONIALS, FAQ_ITEMS, SOCIAL_LINKS } from "@/lib/constants"
import { ArrowRight, Dumbbell, Users, TrendingUp, Star } from "lucide-react"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-background to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-900">
        <div className="absolute inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent" />
        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
                Your plan.{" "}
                <span className="text-gradient">Your pace.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Program gym ramah pemula—mulai dari rumah atau powerlifting gym di Malang.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
                  <Link href="/marketing/plans">
                    Lihat Program
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={SOCIAL_LINKS.tiktok} target="_blank">
                    Follow di TikTok
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Value Props */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Kenapa PRPS
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tiga alasan kenapa program PRPS cocok untuk pemula
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <Dumbbell className="h-8 w-8" />,
                title: "Pemula-friendly",
                description: "Fokus teknik dasar, progres realistis, tanpa intimidasi"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Terstruktur & fleksibel",
                description: "Rencana mingguan 3–4x latihan, bisa di rumah atau gym"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Harga transparan",
                description: "Bayar sekali, akses materi lengkap (video, PDF, tracker)"
              }
            ].map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                      {prop.icon}
                    </div>
                    <CardTitle className="text-xl">{prop.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{prop.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Plans */}
      <Section className="bg-muted/30">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Program Unggulan
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Mulai dengan program terpopuler, dirancang untuk hasil nyata
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PlanCard plan={plan} featured={index === 0} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/plans">
                Lihat Semua Program
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <StatsRow />

      {/* Social Proof */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hasil Nyata
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Lihat testimoni komunitas PRPS
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-sm leading-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="mt-4 font-semibold text-sm">— {testimonial.name}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Collaboration Strip */}
      <Section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Kolaborasi dengan PRPS
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Kreator &amp; gym di Malang &amp; Indonesia - mari berkolaborasi membangun komunitas fitness yang lebih kuat
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
                <Link href="/marketing/collab">
                  Bergabung sebagai Partner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Tanya Jawab
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Semua yang perlu kamu tahu tentang program PRPS
              </p>
            </div>

            <div className="mt-16">
              <Accordion type="single" collapsible>
                {FAQ_ITEMS.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="bg-slate-950 text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Siap mulai versi terbaikmu?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Your plan. Your pace. #KeepShowing
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
                <Link href="/plans">
                  Lihat Program
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
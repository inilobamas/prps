"use client"

import { notFound } from "next/navigation"
import { use } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { ALL_PLANS } from "@/lib/constants"
import { ArrowLeft, Clock, MapPin, Target, CheckCircle, Play, User, Award, Star } from "lucide-react"
import Image from "next/image"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProgramDetailPage({ params }: PageProps) {
  const { slug } = use(params)
  const program = ALL_PLANS.find(plan => plan.id === slug)

  if (!program) {
    notFound()
  }

  return (
    <Section className="pt-24">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            href="/marketing/plans" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Program
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Program Info */}
          <div>
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="secondary">{program.level}</Badge>
                {program.tags?.map(tag => (
                  <Badge key={tag} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {program.title}
              </h1>
              
              <p className="text-lg text-muted-foreground">
                {program.description}
              </p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{program.durationWeeks} minggu</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{program.environment}</span>
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <Card className="mt-8 border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {program.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Akses seumur hidup
                    </div>
                  </div>
                  <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
                    <Link href={program.href} target="_blank">
                      Beli Sekarang
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Yang Kamu Dapat:</h3>
              <div className="grid gap-2">
                {program.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Program Image */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              {program.image ? (
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Play className="h-16 w-16 text-muted-foreground/50" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs: Overview, Equipment, Target, Trainer */}
        <Tabs defaultValue="overview" className="mt-16">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview Latihan</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="target">Target & Goal</TabsTrigger>
            <TabsTrigger value="trainer">Coach</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-8">
            {program.workoutOverview && program.workoutOverview.length > 0 ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Preview: Minggu Pertama</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lihat contoh struktur latihan minggu pertama
                  </p>
                </div>
                
                {program.workoutOverview.map((week, weekIndex) => (
                  <Card key={weekIndex}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Minggu {week.week}: {week.focus}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        {week.workouts.map((workout, workoutIndex) => (
                          <AccordionItem key={workoutIndex} value={`workout-${workoutIndex}`}>
                            <AccordionTrigger>
                              Hari {workout.day}: {workout.name}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4">
                                {workout.exercises.map((exercise, exerciseIndex) => (
                                  <div key={exerciseIndex} className="border rounded-lg p-4 bg-muted/30">
                                    <div className="font-medium mb-2">{exercise.name}</div>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                      <div>
                                        <span className="text-muted-foreground">Sets:</span> {exercise.sets}
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Reps:</span> {exercise.reps}
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Rest:</span> {exercise.rest}
                                      </div>
                                    </div>
                                    {exercise.notes && (
                                      <div className="mt-2 text-xs text-muted-foreground italic">
                                        💡 {exercise.notes}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    📋 Program lengkap berisi {program.durationWeeks} minggu dengan progres terstruktur
                  </p>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">
                    Detail workout akan tersedia setelah pembelian
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="equipment" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Equipment yang Dibutuhkan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {program.equipment?.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  )) || (
                    <p className="text-muted-foreground">Equipment info akan tersedia setelah pembelian</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="target" className="mt-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cocok Untuk:</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {program.targetAudience?.map((audience, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{audience}</span>
                      </div>
                    )) || (
                      <p className="text-muted-foreground text-sm">Target audience info tersedia setelah pembelian</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Goals & Results:</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {program.goals?.map((goal, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{goal}</span>
                      </div>
                    )) || (
                      <p className="text-muted-foreground text-sm">Goals info tersedia setelah pembelian</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trainer" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Meet Your Coach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Trainer Profile */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                        {program.trainer.image ? (
                          <Image
                            src={program.trainer.image}
                            alt={program.trainer.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-lg">{program.trainer.name}</h4>
                      <p className="text-sm text-muted-foreground">{program.trainer.experience}</p>
                    </div>
                  </div>
                  
                  {/* Credentials */}
                  <div>
                    <h5 className="font-medium mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Sertifikasi & Kredensial:
                    </h5>
                    <div className="space-y-2">
                      {program.trainer.credentials.map((credential, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{credential}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Specialization */}
                  <div>
                    <h5 className="font-medium mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Spesialisasi:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {program.trainer.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">
                Siap Mulai {program.title}?
              </h3>
              <p className="text-muted-foreground mb-6">
                Akses langsung setelah pembelian. {program.durationWeeks} minggu program lengkap dengan video dan panduan.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
                  <Link href={program.href} target="_blank">
                    Beli Sekarang - {program.price}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/marketing/plans">
                    Lihat Program Lain
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Section>
  )
}
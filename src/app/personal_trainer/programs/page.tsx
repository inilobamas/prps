"use client"

import { useState } from "react"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, Plus } from "lucide-react"
import Link from "next/link"
import { FEATURED_PLANS, type Plan } from "@/lib/constants"

export default function PTPrograms() {
  const [programs, setPrograms] = useState<Plan[]>(FEATURED_PLANS.slice(0, 3))

  const deleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(program => program.id !== id))
  }

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Program Saya
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Kelola program latihan yang sudah kamu buat
              </p>
            </div>
            <Link href="/personal_trainer/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Buat Program Baru
              </Button>
            </Link>
          </div>

          {programs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Belum ada program</h3>
                <p className="text-muted-foreground mb-4">
                  Mulai buat program latihan pertama kamu
                </p>
                <Link href="/personal_trainer/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Program Pertama
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <Card key={program.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant={program.level === "Pemula" ? "secondary" : "default"}>
                        {program.level}
                      </Badge>
                      <Badge variant="outline">{program.sport}</Badge>
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {program.description}
                    </p>
                    
                    <div className="text-sm space-y-1">
                      <p><strong>Durasi:</strong> {program.durationWeeks} minggu</p>
                      <p><strong>Jadwal:</strong> {program.daysPerWeek}</p>
                      <p><strong>Lokasi:</strong> {program.environment}</p>
                      <p><strong>Harga:</strong> {program.price}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {program.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {program.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{program.features.length - 3} lainnya
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => deleteProgram(program.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
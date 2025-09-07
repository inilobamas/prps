"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PT_BOOKING_TRAINERS, SESSION_TYPES } from "@/lib/constants"
import { Star, MapPin, Clock, Users, Award, Languages } from "lucide-react"
import type { SessionType } from "@/lib/types"

export default function BookingPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedSessionType, setSelectedSessionType] = useState<SessionType | "all">("all")
  const [priceRange, setPriceRange] = useState<string>("all")

  // Get unique locations
  const allLocations = Array.from(
    new Set(PT_BOOKING_TRAINERS.flatMap(trainer => trainer.locations))
  ).filter(location => location !== "Online")

  // Filter trainers
  const filteredTrainers = PT_BOOKING_TRAINERS.filter(trainer => {
    const locationMatch = selectedLocation === "all" || trainer.locations.includes(selectedLocation)
    const sessionMatch = selectedSessionType === "all" || true // For now, all trainers support all session types
    const priceMatch = priceRange === "all" || (
      priceRange === "under-150k" ? trainer.hourlyRate < 150000 :
      priceRange === "150k-200k" ? trainer.hourlyRate >= 150000 && trainer.hourlyRate <= 200000 :
      priceRange === "over-200k" ? trainer.hourlyRate > 200000 : true
    )
    
    return locationMatch && sessionMatch && priceMatch
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp')
  }

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Book Personal Trainer
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Temukan personal trainer terbaik untuk mencapai goal fitness kamu
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex-1 min-w-[200px]">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Lokasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Lokasi</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  {allLocations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Select value={selectedSessionType} onValueChange={(value) => setSelectedSessionType(value as SessionType | "all")}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipe Sesi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  {SESSION_TYPES.map(sessionType => (
                    <SelectItem key={sessionType.type} value={sessionType.type}>
                      {sessionType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Range Harga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Harga</SelectItem>
                  <SelectItem value="under-150k">Under Rp 150k</SelectItem>
                  <SelectItem value="150k-200k">Rp 150k - 200k</SelectItem>
                  <SelectItem value="over-200k">Over Rp 200k</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6 text-muted-foreground">
            Menampilkan {filteredTrainers.length} personal trainer
          </div>

          {/* Trainers Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrainers.map((trainer) => (
              <Card key={trainer.id} className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={trainer.profileImage || "/images/default-trainer.jpg"}
                        alt={trainer.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{trainer.name}</CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{trainer.averageRating}</span>
                        <span className="text-sm text-muted-foreground">({trainer.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {trainer.specializations.slice(0, 2).map(spec => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Bio */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {trainer.bio}
                  </p>

                  {/* Key Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>{trainer.yearsExperience} tahun pengalaman</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{trainer.locations.slice(0, 2).join(", ")}</span>
                      {trainer.locations.length > 2 && (
                        <span className="text-muted-foreground">+{trainer.locations.length - 2} more</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{trainer.responseTime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-muted-foreground" />
                      <span>{trainer.languages.join(", ")}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Personal Training</span>
                      <span className="font-semibold">{formatCurrency(trainer.hourlyRate)}/jam</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Group Session</span>
                      <span className="font-semibold">{formatCurrency(trainer.groupSessionRate)}/jam</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Consultation</span>
                      <span className="font-semibold">{formatCurrency(trainer.consultationRate)}/30min</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <Button asChild className="w-full">
                      <Link href={`/booking/${trainer.id}`}>
                        Lihat Profile & Book
                      </Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={`/booking/${trainer.id}?view=schedule`}>
                          Lihat Jadwal
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={`/booking/${trainer.id}?session=consultation`}>
                          Quick Consult
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredTrainers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                Tidak ada personal trainer yang sesuai dengan filter kamu
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedLocation("all")
                  setSelectedSessionType("all")
                  setPriceRange("all")
                }}
              >
                Reset Filter
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 text-center p-6 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Tidak menemukan trainer yang cocok?</h3>
            <p className="text-muted-foreground mb-4">
              Hubungi kami dan kami akan membantu mencarikan personal trainer yang sesuai dengan kebutuhan kamu
            </p>
            <Button variant="outline" asChild>
              <Link href="/marketing/collab">
                Hubungi PRPS
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
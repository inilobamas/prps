"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section" 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PT_BOOKING_TRAINERS, SESSION_TYPES, GYM_PARTNERS } from "@/lib/constants"
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  Languages, 
  Calendar,
  MessageCircle,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  Target,
  Dumbbell
} from "lucide-react"
import type { SessionType } from "@/lib/types"

interface TrainerProfilePageProps {
  params: {
    trainerId: string
  }
  searchParams: {
    view?: string
    session?: SessionType
  }
}

export default function TrainerProfilePage({ params, searchParams }: TrainerProfilePageProps) {
  const [selectedSessionType, setSelectedSessionType] = useState<SessionType>(
    searchParams.session || "personal-training"
  )
  const [selectedLocation, setSelectedLocation] = useState<string>("")

  const trainer = PT_BOOKING_TRAINERS.find(t => t.id === params.trainerId)
  
  if (!trainer) {
    notFound()
  }

  // Mock schedule data - in real app this would come from API
  const generateMockSchedule = () => {
    const days = []
    const today = new Date()
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      const slots = []
      // Generate available slots (mock data)
      const startHour = 6 // 6 AM
      const endHour = 20   // 8 PM
      
      for (let hour = startHour; hour < endHour; hour += 2) {
        const isAvailable = Math.random() > 0.3 // 70% chance of being available
        if (isAvailable) {
          slots.push({
            id: `${date.toISOString().split('T')[0]}-${hour}`,
            startTime: `${hour.toString().padStart(2, '0')}:00`,
            endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
            price: getSessionPrice(selectedSessionType),
            isAvailable: true,
            location: selectedLocation || trainer.locations[0]
          })
        }
      }
      
      days.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('id-ID', { weekday: 'long' }),
        slots
      })
    }
    
    return days
  }

  const getSessionPrice = (sessionType: SessionType) => {
    switch (sessionType) {
      case "personal-training": return trainer.hourlyRate
      case "group-session": return trainer.groupSessionRate
      case "assessment": return trainer.assessmentRate
      case "consultation": return trainer.consultationRate
      default: return trainer.hourlyRate
    }
  }

  const getSessionInfo = (sessionType: SessionType) => {
    return SESSION_TYPES.find(s => s.type === sessionType)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    })
  }

  const scheduleData = generateMockSchedule()
  const sessionInfo = getSessionInfo(selectedSessionType)
  const currentPrice = getSessionPrice(selectedSessionType)

  // Mock reviews data
  const reviews = [
    {
      id: "1",
      userName: "Ahmad S.",
      rating: 5,
      date: "2025-01-15",
      comment: "Coach Andi sangat profesional dan detail dalam mengajarkan teknik powerlifting. Progress saya meningkat drastis!",
      sessionType: "Personal Training"
    },
    {
      id: "2", 
      userName: "Sinta R.",
      rating: 5,
      date: "2025-01-10",
      comment: "Excellent trainer! Sangat sabar dan motivasi tinggi. Highly recommended untuk yang serius mau improve.",
      sessionType: "Assessment"
    },
    {
      id: "3",
      userName: "Budi K.",
      rating: 4,
      date: "2024-12-28",
      comment: "Latihan sangat terstruktur dan scientific approach. Coach selalu explain kenapa kita melakukan exercise tertentu.",
      sessionType: "Personal Training"
    }
  ]

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href="/booking">← Kembali ke Daftar Trainer</Link>
            </Button>
          </div>

          {/* Header */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-start gap-6 mb-4">
                <div className="relative h-24 w-24 flex-shrink-0">
                  <Image
                    src={trainer.profileImage || "/images/default-trainer.jpg"}
                    alt={trainer.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{trainer.name}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{trainer.averageRating}</span>
                      <span className="text-muted-foreground">({trainer.reviewCount} reviews)</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{trainer.completedSessions} sessions completed</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {trainer.specializations.map(spec => (
                      <Badge key={spec} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>{trainer.yearsExperience} tahun</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{trainer.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Languages className="h-4 w-4" />
                      <span>{trainer.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground">{trainer.bio}</p>
            </div>

            {/* Quick Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tipe Sesi</label>
                  <Select value={selectedSessionType} onValueChange={(value) => setSelectedSessionType(value as SessionType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SESSION_TYPES.map(sessionType => (
                        <SelectItem key={sessionType.type} value={sessionType.type}>
                          {sessionType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {sessionInfo && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {sessionInfo.description} • {sessionInfo.duration} menit
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Lokasi</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainer.locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Harga</span>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(currentPrice)}
                      <span className="text-sm text-muted-foreground font-normal">
                        /{sessionInfo?.duration || 60}min
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Termasuk program training dan follow-up
                  </p>
                </div>

                <Button className="w-full" size="lg">
                  Book Now - {formatCurrency(currentPrice)}
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Jadwal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue={searchParams.view || "overview"} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certifications & Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {trainer.certifications.map(cert => (
                        <div key={cert} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Total Sessions:</span>
                        <span className="font-semibold">{trainer.completedSessions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Success Rate:</span>
                        <span className="font-semibold">
                          {Math.round((trainer.completedSessions / trainer.totalBookings) * 100)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Available Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {trainer.locations.map(location => {
                        const gym = GYM_PARTNERS.find(g => g.name === location)
                        return (
                          <div key={location} className="p-3 border rounded-lg">
                            <div className="font-medium">{location}</div>
                            {gym && (
                              <div className="text-sm text-muted-foreground mt-1">
                                <p>{gym.address}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{gym.rating}</span>
                                  <span>•</span>
                                  <span>{gym.facilities.slice(0, 2).join(", ")}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5" />
                      Equipment & Specialties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {trainer.equipment && trainer.equipment.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Specialized Equipment:</h4>
                        <div className="flex flex-wrap gap-1">
                          {trainer.equipment.map(equipment => (
                            <Badge key={equipment} variant="outline">
                              {equipment}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium mb-2">Specializations:</h4>
                      <div className="flex flex-wrap gap-1">
                        {trainer.specializations.map(spec => (
                          <Badge key={spec} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Booking Policy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Advance booking:</span>
                        <span>{trainer.maxAdvanceBooking} hari</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cancellation:</span>
                        <span>{trainer.cancellationPolicy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Response time:</span>
                        <span>{trainer.responseTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Schedule</CardTitle>
                    <div className="flex gap-4">
                      <Select value={selectedSessionType} onValueChange={(value) => setSelectedSessionType(value as SessionType)}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SESSION_TYPES.map(sessionType => (
                            <SelectItem key={sessionType.type} value={sessionType.type}>
                              {sessionType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Pilih lokasi" />
                        </SelectTrigger>
                        <SelectContent>
                          {trainer.locations.map(location => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {scheduleData.slice(0, 7).map(day => (
                        <div key={day.date} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">
                            {day.dayName}, {formatDate(day.date)}
                          </h4>
                          {day.slots.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                              {day.slots.map(slot => (
                                <Button
                                  key={slot.id}
                                  variant="outline"
                                  size="sm"
                                  className="h-auto p-2 flex flex-col items-center"
                                >
                                  <span className="font-medium">{slot.startTime}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatCurrency(slot.price)}
                                  </span>
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">No available slots</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews & Ratings</CardTitle>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{trainer.averageRating}</span>
                        <div className="flex">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-muted-foreground">({trainer.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reviews.map(review => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{review.userName}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {review.sessionType}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[1,2,3,4,5].map(star => (
                                    <Star 
                                      key={star} 
                                      className={`h-3 w-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString('id-ID')}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="services" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {SESSION_TYPES.map(sessionType => (
                  <Card key={sessionType.type}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {sessionType.name}
                        <Badge variant="outline">
                          {formatCurrency(getSessionPrice(sessionType.type))}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {sessionType.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{sessionType.duration} menit</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {sessionType.type === 'group-session' ? 'Max 4 orang' : '1-on-1'}
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={() => setSelectedSessionType(sessionType.type)}
                      >
                        Book {sessionType.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{trainer.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{trainer.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Languages className="h-4 w-4 text-muted-foreground" />
                      <span>Komunikasi: {trainer.languages.join(", ")}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Send Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Punya pertanyaan sebelum booking? Kirim pesan dan Coach {trainer.name.split(' ')[1]} akan merespons dalam {trainer.responseTime.toLowerCase()}.
                    </p>
                    <div className="space-y-3">
                      <Button className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat via WhatsApp
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </Section>
  )
}
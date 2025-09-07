"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PT_BOOKING_TRAINERS, SESSION_TYPES } from "@/lib/constants"
import { 
  Calendar,
  Clock, 
  MapPin,
  Star,
  MessageSquare,
  RotateCcw,
  XCircle,
  CheckCircle,
  Plus
} from "lucide-react"
import type { SessionType } from "@/lib/types"

export default function UserBookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock user booking data
  const mockBookings = [
    {
      id: "booking-1",
      trainerId: "trainer-andi",
      trainerName: "Coach Andi Prasetya",
      trainerImage: "/images/trainer-andi.jpg",
      sessionType: "personal-training" as SessionType,
      date: "2025-01-25",
      startTime: "08:00",
      endTime: "09:00",
      location: "Iron House Gym Malang",
      status: "confirmed",
      price: 200000,
      bookedAt: "2025-01-18T10:30:00Z",
      notes: "Focus on squat form and deadlift technique"
    },
    {
      id: "booking-2", 
      trainerId: "trainer-sari",
      trainerName: "Coach Sari Indrawati",
      trainerImage: "/images/trainer-sari.jpg",
      sessionType: "assessment" as SessionType,
      date: "2025-01-28",
      startTime: "16:00",
      endTime: "17:30",
      location: "Gold's Gym Malang",
      status: "pending",
      price: 150000,
      bookedAt: "2025-01-19T14:15:00Z",
      notes: "Body composition analysis and goal setting"
    },
    {
      id: "booking-3",
      trainerId: "trainer-andi", 
      trainerName: "Coach Andi Prasetya",
      trainerImage: "/images/trainer-andi.jpg",
      sessionType: "personal-training" as SessionType,
      date: "2025-01-15",
      startTime: "07:00",
      endTime: "08:00",
      location: "Iron House Gym Malang", 
      status: "completed",
      price: 200000,
      bookedAt: "2025-01-08T09:00:00Z",
      completedAt: "2025-01-15T08:00:00Z",
      rating: 5,
      feedback: "Excellent session! Learned proper squat depth and bench press setup."
    },
    {
      id: "booking-4",
      trainerId: "trainer-rio",
      trainerName: "Coach Rio Mahendra", 
      trainerImage: "/images/trainer-rio.jpg",
      sessionType: "consultation" as SessionType,
      date: "2025-01-10",
      startTime: "19:00",
      endTime: "19:30",
      location: "Online",
      status: "cancelled",
      price: 75000,
      bookedAt: "2025-01-05T11:20:00Z",
      cancelledAt: "2025-01-09T16:45:00Z",
      cancelReason: "Schedule conflict"
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getSessionInfo = (sessionType: SessionType) => {
    return SESSION_TYPES.find(s => s.type === sessionType)
  }

  const filterBookings = (bookings: typeof mockBookings) => {
    const now = new Date()
    
    let filtered = bookings
    
    // Filter by tab
    if (activeTab === "upcoming") {
      filtered = bookings.filter(b => 
        new Date(b.date) >= now && (b.status === "confirmed" || b.status === "pending")
      )
    } else if (activeTab === "past") {
      filtered = bookings.filter(b => 
        new Date(b.date) < now || b.status === "completed" || b.status === "cancelled"
      )
    }
    
    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(b => b.status === statusFilter)
    }
    
    return filtered
  }

  const filteredBookings = filterBookings(mockBookings)
  const upcomingCount = mockBookings.filter(b => 
    new Date(b.date) >= new Date() && (b.status === "confirmed" || b.status === "pending")
  ).length
  const completedCount = mockBookings.filter(b => b.status === "completed").length

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">My Bookings</h1>
                <p className="text-muted-foreground">Manage your personal trainer sessions</p>
              </div>
              <Button asChild>
                <Link href="/booking">
                  <Plus className="h-4 w-4 mr-2" />
                  Book New Session
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{upcomingCount}</div>
                  <div className="text-sm text-muted-foreground">Upcoming Sessions</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{completedCount}</div>
                  <div className="text-sm text-muted-foreground">Completed Sessions</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(mockBookings.reduce((sum, b) => sum + (b.status === "completed" ? b.price : 0), 0))}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="upcoming">
                  Upcoming ({upcomingCount})
                </TabsTrigger>
                <TabsTrigger value="past">
                  Past ({mockBookings.length - upcomingCount})
                </TabsTrigger>
              </TabsList>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="upcoming" className="mt-6">
              <div className="space-y-4">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map(booking => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative h-16 w-16 flex-shrink-0">
                            <Image
                              src={booking.trainerImage}
                              alt={booking.trainerName}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{booking.trainerName}</h3>
                                <div className="flex items-center gap-2">
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {getSessionInfo(booking.sessionType)?.name}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-lg">{formatCurrency(booking.price)}</div>
                              </div>
                            </div>

                            <div className="grid gap-2 text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{new Date(booking.date).toLocaleDateString('id-ID', {
                                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                                })}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{booking.startTime} - {booking.endTime}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{booking.location}</span>
                              </div>
                            </div>

                            {booking.notes && (
                              <div className="text-sm text-muted-foreground mb-4 p-3 bg-muted rounded-lg">
                                <strong>Notes:</strong> {booking.notes}
                              </div>
                            )}

                            <div className="flex gap-2">
                              {booking.status === "pending" && (
                                <Button variant="outline" size="sm">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Cancel Booking
                                </Button>
                              )}
                              {booking.status === "confirmed" && (
                                <>
                                  <Button variant="outline" size="sm">
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Reschedule
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Message Trainer
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No upcoming sessions</h3>
                    <p className="text-muted-foreground mb-4">
                      Book your next personal training session to continue your fitness journey
                    </p>
                    <Button asChild>
                      <Link href="/booking">Find a Trainer</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              <div className="space-y-4">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map(booking => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative h-16 w-16 flex-shrink-0">
                            <Image
                              src={booking.trainerImage}
                              alt={booking.trainerName}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{booking.trainerName}</h3>
                                <div className="flex items-center gap-2">
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {getSessionInfo(booking.sessionType)?.name}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-lg">{formatCurrency(booking.price)}</div>
                              </div>
                            </div>

                            <div className="grid gap-2 text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{new Date(booking.date).toLocaleDateString('id-ID', {
                                  weekday: 'long', day: 'numeric', month: 'long'
                                })}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{booking.startTime} - {booking.endTime}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{booking.location}</span>
                              </div>
                            </div>

                            {booking.status === "completed" && booking.rating && (
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium">Your Rating:</span>
                                <div className="flex">
                                  {[1,2,3,4,5].map(star => (
                                    <Star key={star} className={`h-4 w-4 ${
                                      star <= booking.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`} />
                                  ))}
                                </div>
                              </div>
                            )}

                            {booking.feedback && (
                              <div className="text-sm text-muted-foreground mb-4 p-3 bg-muted rounded-lg">
                                <strong>Your Feedback:</strong> {booking.feedback}
                              </div>
                            )}

                            {booking.status === "cancelled" && booking.cancelReason && (
                              <div className="text-sm text-muted-foreground mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <strong>Cancel Reason:</strong> {booking.cancelReason}
                              </div>
                            )}

                            <div className="flex gap-2">
                              {booking.status === "completed" && (
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/booking/${booking.trainerId}`}>
                                    Book Again
                                  </Link>
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message Trainer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No past sessions</h3>
                    <p className="text-muted-foreground">
                      Your completed and cancelled sessions will appear here
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </Section>
  )
}
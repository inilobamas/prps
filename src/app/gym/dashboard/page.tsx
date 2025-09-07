"use client"

import { useState } from "react"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GYM_PARTNERS, PT_BOOKING_TRAINERS } from "@/lib/constants"
import { 
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  MapPin,
  Star,
  Clock,
  Target,
  Settings,
  BarChart3
} from "lucide-react"
import type { SessionType } from "@/lib/types"

export default function GymDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")
  
  // Mock current gym data - in real app this would come from auth/API
  const currentGym = GYM_PARTNERS[0] // Iron House Gym Malang
  
  // Get trainers at this gym
  const gymTrainers = PT_BOOKING_TRAINERS.filter(trainer => 
    trainer.locations.includes(currentGym.name)
  )

  // Mock booking data
  const mockBookings = [
    {
      id: "booking-1",
      trainerId: "trainer-andi",
      trainerName: "Coach Andi Prasetya",
      userName: "Ahmad Santoso",
      userEmail: "ahmad@email.com",
      sessionType: "personal-training",
      date: "2025-01-20",
      startTime: "08:00",
      endTime: "09:00",
      status: "confirmed",
      price: 200000,
      gymShare: 40000, // 20%
      trainerShare: 140000, // 70%
      prpsShare: 20000 // 10%
    },
    {
      id: "booking-2", 
      trainerId: "trainer-andi",
      trainerName: "Coach Andi Prasetya",
      userName: "Sari Melati",
      userEmail: "sari@email.com",
      sessionType: "assessment",
      date: "2025-01-21",
      startTime: "16:00",
      endTime: "17:30",
      status: "completed",
      price: 150000,
      gymShare: 30000,
      trainerShare: 105000,
      prpsShare: 15000
    },
    {
      id: "booking-3",
      trainerId: "trainer-andi", 
      trainerName: "Coach Andi Prasetya",
      userName: "Budi Rahardjo",
      userEmail: "budi@email.com",
      sessionType: "personal-training",
      date: "2025-01-22",
      startTime: "07:00", 
      endTime: "08:00",
      status: "pending",
      price: 200000,
      gymShare: 40000,
      trainerShare: 140000,
      prpsShare: 20000
    }
  ]

  // Mock revenue data
  const revenueStats = {
    thisMonth: {
      totalRevenue: 12500000,
      gymShare: 2500000,
      totalBookings: 45,
      completedBookings: 38,
      avgBookingValue: 187000
    },
    lastMonth: {
      totalRevenue: 10200000,
      gymShare: 2040000,
      totalBookings: 39,
      completedBookings: 35,
      avgBookingValue: 175000
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp')
  }

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  const revenueGrowth = calculateGrowth(revenueStats.thisMonth.totalRevenue, revenueStats.lastMonth.totalRevenue)
  const bookingGrowth = calculateGrowth(revenueStats.thisMonth.totalBookings, revenueStats.lastMonth.totalBookings)

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold">{currentGym.name}</h1>
                <p className="text-muted-foreground">{currentGym.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(revenueStats.thisMonth.gymShare)}
                      </div>
                      <div className="text-sm text-muted-foreground">Gym Revenue</div>
                    </div>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {revenueGrowth > 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {revenueStats.thisMonth.totalBookings}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Bookings</div>
                    </div>
                    <div className="flex items-center text-xs text-blue-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {bookingGrowth > 0 ? '+' : ''}{bookingGrowth.toFixed(1)}%
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {gymTrainers.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Active Trainers</div>
                    </div>
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(revenueStats.thisMonth.avgBookingValue)}
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Booking</div>
                    </div>
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="trainers">Trainers</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Bookings */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockBookings.slice(0, 5).map(booking => (
                          <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{booking.userName}</span>
                                <Badge className={getBookingStatusColor(booking.status)}>
                                  {booking.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {booking.trainerName} • {new Date(booking.date).toLocaleDateString('id-ID')} • {booking.startTime}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{formatCurrency(booking.price)}</div>
                              <div className="text-xs text-green-600">Gym: {formatCurrency(booking.gymShare)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Gym Info */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Gym Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm font-medium">Address</div>
                        <div className="text-sm text-muted-foreground">{currentGym.address}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium">Contact</div>
                        <div className="text-sm text-muted-foreground">{currentGym.phone}</div>
                        <div className="text-sm text-muted-foreground">{currentGym.email}</div>
                      </div>

                      <div>
                        <div className="text-sm font-medium">Rating</div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{currentGym.rating}</span>
                          <span className="text-sm text-muted-foreground">({currentGym.totalBookings} bookings)</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Facilities</div>
                        <div className="flex flex-wrap gap-1">
                          {currentGym.facilities.map(facility => (
                            <Badge key={facility} variant="outline" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Operating Hours</div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          {Object.entries(currentGym.operatingHours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="capitalize">{day}</span>
                              <span>{hours.open} - {hours.close}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
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
                    <Select defaultValue="all-trainers">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-trainers">All Trainers</SelectItem>
                        {gymTrainers.map(trainer => (
                          <SelectItem key={trainer.id} value={trainer.id}>
                            {trainer.name.split(' ')[1]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockBookings.map(booking => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-medium">{booking.userName}</div>
                              <div className="text-sm text-muted-foreground">{booking.userEmail}</div>
                            </div>
                            <Badge className={getBookingStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(booking.price)}</div>
                            <div className="text-sm text-muted-foreground">{booking.sessionType}</div>
                          </div>
                        </div>

                        <div className="grid gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Trainer:</span>
                            <span>{booking.trainerName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date & Time:</span>
                            <span>{new Date(booking.date).toLocaleDateString('id-ID')} • {booking.startTime} - {booking.endTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Revenue Split:</span>
                            <div className="text-right">
                              <div>Gym: {formatCurrency(booking.gymShare)} ({currentGym.commissionRate}%)</div>
                              <div>Trainer: {formatCurrency(booking.trainerShare)} (70%)</div>
                              <div>PRPS: {formatCurrency(booking.prpsShare)} (10%)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trainers" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {gymTrainers.map(trainer => (
                  <Card key={trainer.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div>
                          <CardTitle className="text-lg">{trainer.name}</CardTitle>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{trainer.averageRating}</span>
                            <span className="text-sm text-muted-foreground">({trainer.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {trainer.specializations.slice(0, 2).map(spec => (
                            <Badge key={spec} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Sessions:</span>
                            <span>{trainer.completedSessions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Success Rate:</span>
                            <span>{Math.round((trainer.completedSessions / trainer.totalBookings) * 100)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Hourly Rate:</span>
                            <span>{formatCurrency(trainer.hourlyRate)}</span>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="h-3 w-3" />
                            <span>{trainer.responseTime}</span>
                          </div>
                          <div>{trainer.languages.join(", ")}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="mt-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Revenue Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">This Month</div>
                        <div className="text-2xl font-bold">{formatCurrency(revenueStats.thisMonth.gymShare)}</div>
                        <div className="text-sm text-muted-foreground">
                          From {revenueStats.thisMonth.totalBookings} bookings
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Last Month</div>
                        <div className="text-2xl font-bold">{formatCurrency(revenueStats.lastMonth.gymShare)}</div>
                        <div className="text-sm text-muted-foreground">
                          From {revenueStats.lastMonth.totalBookings} bookings
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Growth</div>
                        <div className={`text-2xl font-bold ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          vs last month
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <div className="font-medium">Gym Commission ({currentGym.commissionRate}%)</div>
                          <div className="text-sm text-muted-foreground">Your share from bookings</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(revenueStats.thisMonth.gymShare)}
                          </div>
                          <div className="text-xs text-muted-foreground">this month</div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-lg">
                        <div className="font-medium mb-2">Revenue by Session Type</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Personal Training:</span>
                            <span>{formatCurrency(1800000)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Group Sessions:</span>
                            <span>{formatCurrency(450000)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Assessments:</span>
                            <span>{formatCurrency(200000)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Consultations:</span>
                            <span>{formatCurrency(50000)}</span>
                          </div>
                        </div>
                      </div>
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
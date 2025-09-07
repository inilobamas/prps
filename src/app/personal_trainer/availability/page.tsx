"use client"

import { useState } from "react"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { SESSION_TYPES, GYM_PARTNERS } from "@/lib/constants"
import { 
  Calendar,
  Clock, 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Save,
  CheckCircle,
  XCircle,
  Settings
} from "lucide-react"
import type { SessionType, TrainerAvailability } from "@/lib/types"

export default function TrainerAvailabilityPage() {
  const [activeTab, setActiveTab] = useState("schedule")
  const [editingSlot, setEditingSlot] = useState<string | null>(null)
  const [isAddingSlot, setIsAddingSlot] = useState(false)

  // Mock current trainer data - in real app this would come from auth/API
  const currentTrainer = {
    id: "trainer-andi",
    name: "Coach Andi Prasetya",
    locations: ["Iron House Gym Malang", "Powerlifting Indonesia Malang", "Online"],
    hourlyRate: 200000,
    groupSessionRate: 150000,
    assessmentRate: 150000,
    consultationRate: 100000
  }

  // Mock availability data - in real app this would come from API
  const [availability, setAvailability] = useState<TrainerAvailability[]>([
    {
      trainerId: "trainer-andi",
      dayOfWeek: 1, // Monday
      startTime: "06:00",
      endTime: "10:00", 
      sessionTypes: ["personal-training", "assessment"],
      defaultPrice: 200000,
      location: "Iron House Gym Malang",
      isActive: true
    },
    {
      trainerId: "trainer-andi",
      dayOfWeek: 1, // Monday
      startTime: "16:00",
      endTime: "20:00",
      sessionTypes: ["personal-training", "group-session"],
      defaultPrice: 200000,
      location: "Iron House Gym Malang", 
      isActive: true
    },
    {
      trainerId: "trainer-andi",
      dayOfWeek: 2, // Tuesday
      startTime: "06:00",
      endTime: "10:00",
      sessionTypes: ["personal-training", "consultation"],
      defaultPrice: 200000,
      location: "Online",
      isActive: true
    },
    {
      trainerId: "trainer-andi",
      dayOfWeek: 3, // Wednesday
      startTime: "16:00", 
      endTime: "20:00",
      sessionTypes: ["personal-training", "group-session"],
      defaultPrice: 200000,
      location: "Iron House Gym Malang",
      isActive: false
    }
  ])

  // Mock upcoming bookings
  const mockBookings = [
    {
      id: "booking-1",
      userName: "Ahmad Santoso",
      userEmail: "ahmad@email.com",
      sessionType: "personal-training",
      date: "2025-01-20",
      startTime: "08:00", 
      endTime: "09:00",
      location: "Iron House Gym Malang",
      status: "confirmed",
      price: 200000
    },
    {
      id: "booking-2",
      userName: "Sari Melati",
      userEmail: "sari@email.com", 
      sessionType: "assessment",
      date: "2025-01-21",
      startTime: "16:00",
      endTime: "17:30", 
      location: "Iron House Gym Malang",
      status: "pending",
      price: 150000
    },
    {
      id: "booking-3",
      userName: "Budi Rahardjo",
      userEmail: "budi@email.com",
      sessionType: "consultation", 
      date: "2025-01-22",
      startTime: "19:00",
      endTime: "19:30",
      location: "Online",
      status: "confirmed",
      price: 100000
    }
  ]

  const [newSlot, setNewSlot] = useState<Partial<TrainerAvailability>>({
    dayOfWeek: 1,
    startTime: "06:00",
    endTime: "10:00",
    sessionTypes: ["personal-training"],
    defaultPrice: currentTrainer.hourlyRate,
    location: currentTrainer.locations[0],
    isActive: true
  })

  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp')
  }

  const addNewSlot = () => {
    if (newSlot.dayOfWeek !== undefined && newSlot.startTime && newSlot.endTime && newSlot.location) {
      const slot: TrainerAvailability = {
        trainerId: currentTrainer.id,
        dayOfWeek: newSlot.dayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        sessionTypes: newSlot.sessionTypes || ["personal-training"],
        defaultPrice: newSlot.defaultPrice || currentTrainer.hourlyRate,
        location: newSlot.location,
        isActive: newSlot.isActive || true
      }
      setAvailability([...availability, slot])
      setIsAddingSlot(false)
      setNewSlot({
        dayOfWeek: 1,
        startTime: "06:00", 
        endTime: "10:00",
        sessionTypes: ["personal-training"],
        defaultPrice: currentTrainer.hourlyRate,
        location: currentTrainer.locations[0],
        isActive: true
      })
    }
  }

  const toggleSlotStatus = (index: number) => {
    const updated = [...availability]
    updated[index].isActive = !updated[index].isActive
    setAvailability(updated)
  }

  const deleteSlot = (index: number) => {
    const updated = availability.filter((_, i) => i !== index)
    setAvailability(updated)
  }

  const getSessionTypeInfo = (sessionType: SessionType) => {
    return SESSION_TYPES.find(s => s.type === sessionType)
  }

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  // Group availability by day
  const availabilityByDay = availability.reduce((acc, slot, index) => {
    const day = slot.dayOfWeek
    if (!acc[day]) acc[day] = []
    acc[day].push({ ...slot, index })
    return acc
  }, {} as Record<number, (TrainerAvailability & { index: number })[]>)

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Manage Availability</h1>
            <p className="text-muted-foreground">
              Atur jadwal ketersediaan kamu untuk menerima booking dari client
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
              <TabsTrigger value="bookings">Upcoming Bookings</TabsTrigger>
              <TabsTrigger value="settings">Booking Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="mt-6">
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">
                        {availability.filter(s => s.isActive).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Active Slots</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {availability.reduce((total, slot) => {
                          if (!slot.isActive) return total
                          const start = parseInt(slot.startTime.split(':')[0])
                          const end = parseInt(slot.endTime.split(':')[0])
                          return total + (end - start)
                        }, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Hours/Week</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-orange-600">
                        {mockBookings.filter(b => b.status === 'pending').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Pending Bookings</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-purple-600">
                        {new Set(availability.map(s => s.location)).size}
                      </div>
                      <div className="text-sm text-muted-foreground">Locations</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Weekly Schedule */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Weekly Schedule</CardTitle>
                    <Button 
                      onClick={() => setIsAddingSlot(true)}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Time Slot
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5, 6, 0].map(dayOfWeek => (
                        <div key={dayOfWeek} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3 text-lg">
                            {dayNames[dayOfWeek]}
                          </h4>
                          
                          {availabilityByDay[dayOfWeek] ? (
                            <div className="grid gap-3">
                              {availabilityByDay[dayOfWeek].map(slot => (
                                <div 
                                  key={slot.index}
                                  className={`p-3 rounded-lg border ${
                                    slot.isActive ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2">
                                        <div className="flex items-center gap-1">
                                          <Clock className="h-4 w-4 text-muted-foreground" />
                                          <span className="font-medium">
                                            {slot.startTime} - {slot.endTime}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <MapPin className="h-4 w-4 text-muted-foreground" />
                                          <span className="text-sm">{slot.location}</span>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-2 mb-2">
                                        {slot.sessionTypes.map(sessionType => {
                                          const info = getSessionTypeInfo(sessionType)
                                          return (
                                            <Badge key={sessionType} variant="secondary" className="text-xs">
                                              {info?.name}
                                            </Badge>
                                          )
                                        })}
                                      </div>
                                      
                                      <div className="text-sm text-muted-foreground">
                                        Default price: {formatCurrency(slot.defaultPrice)}
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      <Switch
                                        checked={slot.isActive}
                                        onCheckedChange={() => toggleSlotStatus(slot.index)}
                                      />
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => setEditingSlot(slot.index.toString())}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => deleteSlot(slot.index)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground">
                              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p>Belum ada jadwal untuk {dayNames[dayOfWeek]}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Add New Slot Modal */}
                {isAddingSlot && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Add New Time Slot</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium mb-2">Day</label>
                          <Select 
                            value={newSlot.dayOfWeek?.toString()} 
                            onValueChange={(value) => setNewSlot({...newSlot, dayOfWeek: parseInt(value) as 0 | 1 | 2 | 3 | 4 | 5 | 6})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {dayNames.map((day, index) => (
                                <SelectItem key={index} value={index.toString()}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Location</label>
                          <Select 
                            value={newSlot.location} 
                            onValueChange={(value) => setNewSlot({...newSlot, location: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {currentTrainer.locations.map(location => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium mb-2">Start Time</label>
                          <Input 
                            type="time"
                            value={newSlot.startTime}
                            onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">End Time</label>
                          <Input 
                            type="time"
                            value={newSlot.endTime}
                            onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Session Types</label>
                        <div className="grid grid-cols-2 gap-2">
                          {SESSION_TYPES.map(sessionType => (
                            <label key={sessionType.type} className="flex items-center space-x-2">
                              <input 
                                type="checkbox"
                                checked={newSlot.sessionTypes?.includes(sessionType.type)}
                                onChange={(e) => {
                                  const current = newSlot.sessionTypes || []
                                  if (e.target.checked) {
                                    setNewSlot({...newSlot, sessionTypes: [...current, sessionType.type]})
                                  } else {
                                    setNewSlot({...newSlot, sessionTypes: current.filter(t => t !== sessionType.type)})
                                  }
                                }}
                              />
                              <span className="text-sm">{sessionType.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Default Price</label>
                        <Input 
                          type="number"
                          value={newSlot.defaultPrice}
                          onChange={(e) => setNewSlot({...newSlot, defaultPrice: parseInt(e.target.value)})}
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsAddingSlot(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button onClick={addNewSlot} className="flex-1">
                          <Save className="h-4 w-4 mr-2" />
                          Add Slot
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Manage and respond to client bookings
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.map(booking => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div>
                              <h4 className="font-medium">{booking.userName}</h4>
                              <p className="text-sm text-muted-foreground">{booking.userEmail}</p>
                            </div>
                            <Badge className={getBookingStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-green-600">
                              {formatCurrency(booking.price)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {getSessionTypeInfo(booking.sessionType as SessionType)?.name}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(booking.date).toLocaleDateString('id-ID', {
                              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                            })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{booking.startTime} - {booking.endTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.location}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          {booking.status === 'pending' && (
                            <>
                              <Button size="sm" className="flex-1">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Confirm
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                <XCircle className="h-4 w-4 mr-2" />
                                Decline
                              </Button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <>
                              <Button variant="outline" size="sm" className="flex-1">
                                Reschedule
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                Contact Client
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Booking Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Advance Booking</label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 hari</SelectItem>
                          <SelectItem value="14">14 hari</SelectItem>
                          <SelectItem value="21">21 hari</SelectItem>
                          <SelectItem value="30">30 hari</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Cancellation Policy</label>
                      <Select defaultValue="24h">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6h">6 jam sebelum</SelectItem>
                          <SelectItem value="12h">12 jam sebelum</SelectItem>
                          <SelectItem value="24h">24 jam sebelum</SelectItem>
                          <SelectItem value="48h">48 jam sebelum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Auto-Accept Bookings</label>
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-accept" />
                        <label htmlFor="auto-accept" className="text-sm">
                          Otomatis terima booking tanpa review manual
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Booking Buffer Time</label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Tidak ada buffer</SelectItem>
                          <SelectItem value="15">15 menit</SelectItem>
                          <SelectItem value="30">30 menit</SelectItem>
                          <SelectItem value="60">60 menit</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Waktu jeda antar sesi untuk persiapan dan recovery
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Session Rates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {SESSION_TYPES.map(sessionType => (
                      <div key={sessionType.type}>
                        <label className="block text-sm font-medium mb-2">
                          {sessionType.name} ({sessionType.duration} min)
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Rp</span>
                          <Input 
                            type="number"
                            defaultValue={
                              sessionType.type === 'personal-training' ? currentTrainer.hourlyRate :
                              sessionType.type === 'group-session' ? currentTrainer.groupSessionRate :
                              sessionType.type === 'assessment' ? currentTrainer.assessmentRate :
                              currentTrainer.consultationRate
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button className="w-full mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Update Rates
                    </Button>
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
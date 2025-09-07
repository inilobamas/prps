"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PT_BOOKING_TRAINERS, SESSION_TYPES } from "@/lib/constants"
import { 
  Calendar,
  Clock, 
  MapPin,
  User,
  CreditCard,
  ArrowLeft,
  CheckCircle,
  Star
} from "lucide-react"
import type { SessionType } from "@/lib/types"

interface BookingPageProps {
  params: {
    trainerId: string
  }
  searchParams: {
    session?: SessionType
    location?: string
    date?: string
    time?: string
  }
}

export default function BookingPage({ params, searchParams }: BookingPageProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    sessionType: searchParams.session || "personal-training" as SessionType,
    location: searchParams.location || "",
    date: searchParams.date || "",
    time: searchParams.time || "",
    userName: "",
    userEmail: "",
    userPhone: "",
    notes: "",
    emergencyContact: "",
    healthNotes: ""
  })

  const trainer = PT_BOOKING_TRAINERS.find(t => t.id === params.trainerId)
  
  if (!trainer) {
    notFound()
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

  // Generate next 14 days for booking
  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('id-ID', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long' 
        })
      })
    }
    return dates
  }

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = []
    const startHour = 6
    const endHour = 20
    
    for (let hour = startHour; hour < endHour; hour++) {
      // Mock availability - 70% chance of being available
      if (Math.random() > 0.3) {
        slots.push({
          value: `${hour.toString().padStart(2, '0')}:00`,
          label: `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`
        })
      }
    }
    return slots
  }

  const sessionInfo = getSessionInfo(bookingData.sessionType)
  const currentPrice = getSessionPrice(bookingData.sessionType)
  const availableDates = generateAvailableDates()
  const availableTimeSlots = generateTimeSlots()

  const handleStepForward = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleBookingSubmit = () => {
    // In real app, this would call API to create booking and get Lynk.id payment URL
    const lynkIdUrl = `https://lynk.id/prps.sport/book-pt?trainer=${trainer.id}&session=${bookingData.sessionType}&price=${currentPrice}`
    window.open(lynkIdUrl, '_blank')
  }

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return bookingData.sessionType && bookingData.location && bookingData.date && bookingData.time
      case 2:
        return bookingData.userName && bookingData.userEmail && bookingData.userPhone
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-16 w-16">
                <Image
                  src={trainer.profileImage || "/images/default-trainer.jpg"}
                  alt={trainer.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Book Session with {trainer.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{trainer.averageRating} • {trainer.reviewCount} reviews</span>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    currentStep === step 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isStepComplete(step)
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    {isStepComplete(step) && currentStep !== step ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div className={`h-0.5 w-12 mx-2 ${
                      isStepComplete(step) ? 'bg-green-500' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Main Form */}
            <div className="md:col-span-2">
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Pilih Jadwal & Lokasi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Tipe Sesi</label>
                      <Select 
                        value={bookingData.sessionType} 
                        onValueChange={(value) => setBookingData({...bookingData, sessionType: value as SessionType})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SESSION_TYPES.map(sessionType => (
                            <SelectItem key={sessionType.type} value={sessionType.type}>
                              <div className="flex justify-between w-full">
                                <span>{sessionType.name}</span>
                                <span className="text-muted-foreground ml-4">
                                  {formatCurrency(getSessionPrice(sessionType.type))}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {sessionInfo && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {sessionInfo.description} • {sessionInfo.duration} menit
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Lokasi</label>
                      <Select 
                        value={bookingData.location} 
                        onValueChange={(value) => setBookingData({...bookingData, location: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih lokasi sesi" />
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

                    <div>
                      <label className="block text-sm font-medium mb-2">Tanggal</label>
                      <Select 
                        value={bookingData.date} 
                        onValueChange={(value) => setBookingData({...bookingData, date: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tanggal" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDates.map(date => (
                            <SelectItem key={date.value} value={date.value}>
                              {date.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Waktu</label>
                      <Select 
                        value={bookingData.time} 
                        onValueChange={(value) => setBookingData({...bookingData, time: value})}
                        disabled={!bookingData.date}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih waktu" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimeSlots.map(time => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={handleStepForward} 
                      className="w-full" 
                      disabled={!isStepComplete(1)}
                    >
                      Lanjut ke Data Diri
                    </Button>
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Data Diri & Informasi Tambahan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
                        <Input 
                          value={bookingData.userName}
                          onChange={(e) => setBookingData({...bookingData, userName: e.target.value})}
                          placeholder="Nama lengkap sesuai ID"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input 
                          type="email"
                          value={bookingData.userEmail}
                          onChange={(e) => setBookingData({...bookingData, userEmail: e.target.value})}
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Nomor WhatsApp *</label>
                      <Input 
                        type="tel"
                        value={bookingData.userPhone}
                        onChange={(e) => setBookingData({...bookingData, userPhone: e.target.value})}
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Kontak Darurat</label>
                      <Input 
                        value={bookingData.emergencyContact}
                        onChange={(e) => setBookingData({...bookingData, emergencyContact: e.target.value})}
                        placeholder="Nama & No. HP (opsional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Catatan Kesehatan</label>
                      <Textarea 
                        value={bookingData.healthNotes}
                        onChange={(e) => setBookingData({...bookingData, healthNotes: e.target.value})}
                        placeholder="Cedera, kondisi medis, atau hal lain yang perlu trainer ketahui (opsional)"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Notes untuk Trainer</label>
                      <Textarea 
                        value={bookingData.notes}
                        onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                        placeholder="Goal, ekspektasi, atau pertanyaan khusus (opsional)"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handleStepBack} className="flex-1">
                        Kembali
                      </Button>
                      <Button 
                        onClick={handleStepForward} 
                        className="flex-1"
                        disabled={!isStepComplete(2)}
                      >
                        Review & Bayar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Review & Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Booking Summary */}
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <h4 className="font-medium">Ringkasan Booking</h4>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Trainer:</span>
                          <span>{trainer.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sesi:</span>
                          <span>{sessionInfo?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tanggal:</span>
                          <span>{availableDates.find(d => d.value === bookingData.date)?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Waktu:</span>
                          <span>{availableTimeSlots.find(t => t.value === bookingData.time)?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lokasi:</span>
                          <span>{bookingData.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Durasi:</span>
                          <span>{sessionInfo?.duration} menit</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <h4 className="font-medium">Data Customer</h4>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nama:</span>
                          <span>{bookingData.userName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span>{bookingData.userEmail}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">WhatsApp:</span>
                          <span>{bookingData.userPhone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="p-4 border rounded-lg space-y-2">
                      <h4 className="font-medium text-sm">Ketentuan Booking:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Pembayaran melalui Lynk.id akan secure dan refundable</li>
                        <li>• Cancellation policy: {trainer.cancellationPolicy}</li>
                        <li>• Trainer akan konfirmasi maksimal 4 jam setelah pembayaran</li>
                        <li>• Reschedule dapat dilakukan dengan persetujuan trainer</li>
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={handleStepBack} className="flex-1">
                        Kembali
                      </Button>
                      <Button onClick={handleBookingSubmit} className="flex-1" size="lg">
                        Bayar {formatCurrency(currentPrice)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Summary Sidebar */}
            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12">
                      <Image
                        src={trainer.profileImage || "/images/default-trainer.jpg"}
                        alt={trainer.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{trainer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {trainer.specializations[0]}
                      </div>
                    </div>
                  </div>

                  {sessionInfo && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{sessionInfo.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {sessionInfo.description}
                      </div>
                      <Badge variant="outline">{sessionInfo.duration} menit</Badge>
                    </div>
                  )}

                  {bookingData.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{bookingData.location}</span>
                    </div>
                  )}

                  {bookingData.date && bookingData.time && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div>{availableDates.find(d => d.value === bookingData.date)?.label}</div>
                        <div className="text-muted-foreground">
                          {availableTimeSlots.find(t => t.value === bookingData.time)?.label}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(currentPrice)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Termasuk platform fee • Secure payment via Lynk.id
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <p className="mb-2">🔒 Pembayaran aman melalui Lynk.id</p>
                    <p>✅ Instant confirmation setelah payment</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationModal } from "@/components/LocationModal"
import { PT_BOOKING_TRAINERS, SESSION_TYPES, CITIES } from "@/lib/constants"
import { getUserLocation, getLocationPreference } from "@/lib/storage"
import { filterTrainersByLocation, formatDistance, getTrainerCityAvailability } from "@/lib/location-utils"
import { Star, MapPin, Clock, Award, Languages, Settings, Target, Filter } from "lucide-react"
import type { SessionType, UserLocation } from "@/lib/types"

export default function BookingPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedSessionType, setSelectedSessionType] = useState<SessionType | "all">("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [userLocation, setUserLocationState] = useState<UserLocation | null>(null)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [showAllCities, setShowAllCities] = useState(true) // Default to true to match server
  const [isClient, setIsClient] = useState(false)

  // Load user location on mount
  useEffect(() => {
    setIsClient(true)
    const location = getUserLocation()
    const preference = getLocationPreference()
    setUserLocationState(location)
    setShowAllCities(preference.showAllLocations)
    
    // Show location modal if no location is set
    if (!location) {
      setShowLocationModal(true)
    }
  }, [])

  // Get location-based filtered trainers (use default values during SSR)
  const { nearbyTrainers, otherTrainers } = filterTrainersByLocation(
    PT_BOOKING_TRAINERS,
    isClient ? userLocation || undefined : undefined,
    undefined,
    isClient ? showAllCities : true
  )

  // Get unique locations based on user's city priority
  const getUserCityLocations = () => {
    if (!userLocation) return []
    return Array.from(
      new Set(nearbyTrainers.flatMap(trainer => trainer.locations))
    ).filter(location => location !== "Online")
  }

  const getOtherCityLocations = () => {
    return Array.from(
      new Set(otherTrainers.flatMap(trainer => trainer.locations))
    ).filter(location => location !== "Online")
  }

  const allLocations = [...getUserCityLocations(), ...getOtherCityLocations()]

  // Apply additional filters
  const applyFilters = (trainers: typeof nearbyTrainers) => {
    return trainers.filter(trainer => {
      const locationMatch = selectedLocation === "all" || trainer.locations.includes(selectedLocation)
      const sessionMatch = selectedSessionType === "all" || true // For now, all trainers support all session types
      const priceMatch = priceRange === "all" || (
        priceRange === "under-150k" ? trainer.hourlyRate < 150000 :
        priceRange === "150k-200k" ? trainer.hourlyRate >= 150000 && trainer.hourlyRate <= 200000 :
        priceRange === "over-200k" ? trainer.hourlyRate > 200000 : true
      )
      
      return locationMatch && sessionMatch && priceMatch
    })
  }

  const filteredNearbyTrainers = applyFilters(nearbyTrainers)
  const filteredOtherTrainers = applyFilters(otherTrainers)
  const totalFilteredTrainers = [...filteredNearbyTrainers, ...filteredOtherTrainers]

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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Book Personal Trainer
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Temukan personal trainer terbaik untuk mencapai goal fitness kamu
            </p>
            
            {/* Location Display & Controls */}
            {isClient && (
              <div className="mt-6 flex items-center justify-center gap-4">
                {userLocation ? (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      {userLocation.city}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                      onClick={() => setShowLocationModal(true)}
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setShowLocationModal(true)}
                    className="flex items-center gap-2"
                  >
                    <Target className="h-4 w-4" />
                    Set Your Location
                  </Button>
                )}
                
                {otherTrainers.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllCities(!showAllCities)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    {showAllCities ? "Show Nearby Only" : "Show All Cities"}
                  </Button>
                )}
              </div>
            )}
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
          <div className="mb-6">
            <div className="text-muted-foreground">
              Menampilkan {totalFilteredTrainers.length} personal trainer
              {userLocation && (
                <span className="ml-2">
                  ({filteredNearbyTrainers.length} nearby, {filteredOtherTrainers.length} other cities)
                </span>
              )}
            </div>
          </div>

          {/* Nearby Trainers Section */}
          {filteredNearbyTrainers.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                {userLocation ? `Near ${userLocation.city}` : "Nearby Trainers"}
                <Badge variant="secondary">{filteredNearbyTrainers.length}</Badge>
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNearbyTrainers.map((trainer) => (
                  <TrainerCard 
                    key={trainer.id} 
                    trainer={trainer} 
                    userLocation={userLocation}
                    isNearby={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Other Cities Trainers Section */}
          {filteredOtherTrainers.length > 0 && showAllCities && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🌍 Other Cities
                <Badge variant="outline">{filteredOtherTrainers.length}</Badge>
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredOtherTrainers.map((trainer) => (
                  <TrainerCard 
                    key={trainer.id} 
                    trainer={trainer} 
                    userLocation={userLocation}
                    isNearby={false}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Show all results when no location is set */}
          {!userLocation && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {totalFilteredTrainers.map((trainer) => (
                <TrainerCard 
                  key={trainer.id} 
                  trainer={trainer} 
                  userLocation={userLocation}
                  isNearby={'isNearby' in trainer ? trainer.isNearby : false}
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {totalFilteredTrainers.length === 0 && (
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

          {/* Location Modal */}
          <LocationModal
            isOpen={showLocationModal}
            onClose={() => setShowLocationModal(false)}
            onLocationSet={(location) => {
              setUserLocationState(location)
              const preference = getLocationPreference()
              setShowAllCities(preference.showAllLocations)
            }}
          />

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

// TrainerCard Component
interface TrainerCardProps {
  trainer: typeof PT_BOOKING_TRAINERS[0] & { distance?: number; isNearby?: boolean }
  userLocation: UserLocation | null
  isNearby: boolean
}

function TrainerCard({ trainer, userLocation, isNearby }: TrainerCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp')
  }

  const { availableInUserCity, userCityLocations, otherCityLocations } = 
    getTrainerCityAvailability(trainer, userLocation?.city)

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 relative">
      {/* Location Badge */}
      {userLocation && (
        <div className="absolute top-3 right-3 z-10">
          {isNearby ? (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              {availableInUserCity ? `In ${userLocation.city}` : "Nearby"}
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-white">
              Other City
            </Badge>
          )}
        </div>
      )}

      {/* Distance Badge */}
      {trainer.distance && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="secondary" className="text-xs">
            {formatDistance(trainer.distance)}
          </Badge>
        </div>
      )}

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
          
          {/* Location Info with City Priority */}
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              {userLocation && availableInUserCity ? (
                <>
                  <div className="text-green-700 font-medium">
                    {userCityLocations.slice(0, 2).join(", ")}
                  </div>
                  {otherCityLocations.length > 0 && (
                    <div className="text-muted-foreground text-xs">
                      +{otherCityLocations.length} other location{otherCityLocations.length > 1 ? 's' : ''}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <span>{trainer.locations.slice(0, 2).join(", ")}</span>
                  {trainer.locations.length > 2 && (
                    <span className="text-muted-foreground ml-1">
                      +{trainer.locations.length - 2} more
                    </span>
                  )}
                </>
              )}
            </div>
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
  )
}
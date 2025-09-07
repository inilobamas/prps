import { PT_BOOKING_TRAINERS, CITIES, LOCATION_CITY_MAP } from './constants'
import { getUserLocation, getLocationPreference } from './storage'
import type { TrainerBookingProfile, UserLocation, LocationPreference } from './types'

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number {
  const R = 6371 // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c // Distance in km
}

// Get city coordinates
export function getCityCoordinates(cityName: string) {
  return CITIES.find(city => city.name === cityName)?.coordinates
}

// Get city from location name
export function getCityFromLocation(locationName: string): string {
  return LOCATION_CITY_MAP[locationName] || 'Unknown'
}

// Get trainer's primary city (most common location)
export function getTrainerPrimaryCity(trainer: TrainerBookingProfile): string {
  const cities = trainer.locations
    .map(location => getCityFromLocation(location))
    .filter(city => city !== 'Online' && city !== 'Unknown')
  
  if (cities.length === 0) return 'Online'
  
  // Return most frequent city, or first one if tied
  const cityCount = cities.reduce((acc, city) => {
    acc[city] = (acc[city] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return Object.entries(cityCount)
    .sort(([,a], [,b]) => b - a)[0][0]
}

// Calculate distance from user to trainer's primary location
export function calculateTrainerDistance(
  trainer: TrainerBookingProfile,
  userLocation: UserLocation
): number | undefined {
  if (!userLocation.coordinates) return undefined
  
  const trainerCity = getTrainerPrimaryCity(trainer)
  const trainerCoords = getCityCoordinates(trainerCity)
  
  if (!trainerCoords) return undefined
  
  return calculateDistance(
    userLocation.coordinates.lat,
    userLocation.coordinates.lng,
    trainerCoords.lat,
    trainerCoords.lng
  )
}

// Filter and sort trainers based on user location
export function filterTrainersByLocation(
  trainers: TrainerBookingProfile[] = PT_BOOKING_TRAINERS,
  userLocation?: UserLocation,
  locationPreference?: LocationPreference,
  forceShowAll: boolean = false
): {
  nearbyTrainers: (TrainerBookingProfile & { distance?: number; isNearby: boolean })[]
  otherTrainers: (TrainerBookingProfile & { distance?: number; isNearby: boolean })[]
} {
  const location = userLocation || getUserLocation()
  const preference = locationPreference || getLocationPreference()
  
  const trainersWithDistance = trainers.map(trainer => {
    const distance = location ? calculateTrainerDistance(trainer, location) : undefined
    const trainerCity = getTrainerPrimaryCity(trainer)
    const userCity = location?.city || ''
    
    // Check if trainer is nearby based on same city or distance
    const isNearby = trainerCity === userCity || 
                     (distance !== undefined && distance <= preference.maxDistance) ||
                     trainer.locations.includes('Online')
    
    return {
      ...trainer,
      distance,
      isNearby
    }
  })
  
  // Sort by distance (nearby first, then by distance)
  const sortedTrainers = trainersWithDistance.sort((a, b) => {
    // Online trainers always available
    if (a.locations.includes('Online') && !b.locations.includes('Online')) return -1
    if (b.locations.includes('Online') && !a.locations.includes('Online')) return 1
    
    // Same city trainers first
    if (a.isNearby && !b.isNearby) return -1
    if (b.isNearby && !a.isNearby) return 1
    
    // Then by distance
    if (a.distance === undefined) return 1
    if (b.distance === undefined) return -1
    return a.distance - b.distance
  })
  
  // Split into nearby and other
  const nearbyTrainers = sortedTrainers.filter(t => t.isNearby)
  const otherTrainers = sortedTrainers.filter(t => !t.isNearby)
  
  return {
    nearbyTrainers,
    otherTrainers: forceShowAll || preference.showAllLocations ? otherTrainers : []
  }
}

// Get location suggestions for autocomplete
export function getLocationSuggestions(query: string): string[] {
  const allLocations = [
    ...CITIES.map(city => city.name),
    ...Object.keys(LOCATION_CITY_MAP).filter(loc => loc !== 'Online')
  ]
  
  return allLocations
    .filter(location => 
      location.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5)
}

// Detect user location from browser geolocation API
export async function detectUserLocation(): Promise<UserLocation | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        // Try to reverse geocode to get city name
        // In a real app, you'd use a geocoding service
        // For now, we'll find the nearest city from our list
        let nearestCity = 'Unknown'
        let minDistance = Infinity
        
        CITIES.forEach(city => {
          const distance = calculateDistance(
            latitude, longitude,
            city.coordinates.lat, city.coordinates.lng
          )
          if (distance < minDistance) {
            minDistance = distance
            nearestCity = city.name
          }
        })
        
        const userLocation: UserLocation = {
          city: nearestCity,
          coordinates: { lat: latitude, lng: longitude },
          detectedAt: new Date().toISOString(),
          isManuallySet: false
        }
        
        resolve(userLocation)
      },
      () => resolve(null),
      { timeout: 10000 }
    )
  })
}

// Format distance for display
export function formatDistance(distance: number | undefined): string {
  if (distance === undefined) return ''
  
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`
  } else if (distance < 100) {
    return `${distance.toFixed(1)}km`
  } else {
    return `${Math.round(distance)}km`
  }
}

// Get trainer availability in user's city
export function getTrainerCityAvailability(trainer: TrainerBookingProfile, userCity?: string): {
  availableInUserCity: boolean
  userCityLocations: string[]
  otherCityLocations: string[]
} {
  const city = userCity || getUserLocation()?.city || ''
  
  const userCityLocations = trainer.locations.filter(location => 
    getCityFromLocation(location) === city || location === 'Online'
  )
  
  const otherCityLocations = trainer.locations.filter(location =>
    getCityFromLocation(location) !== city && location !== 'Online'
  )
  
  return {
    availableInUserCity: userCityLocations.length > 0,
    userCityLocations,
    otherCityLocations
  }
}
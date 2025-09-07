"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { 
  MapPin, 
  Search,
  Target,
  Settings,
  X
} from "lucide-react"
import { CITIES } from "@/lib/constants"
import { 
  getUserLocation, 
  setUserLocation, 
  getLocationPreference, 
  updateLocationPreference 
} from "@/lib/storage"
import { 
  detectUserLocation, 
  getLocationSuggestions 
} from "@/lib/location-utils"
import type { UserLocation, LocationPreference } from "@/lib/types"

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
  onLocationSet: (location: UserLocation) => void
}

export function LocationModal({ isOpen, onClose, onLocationSet }: LocationModalProps) {
  const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(null)
  const [locationPreference, setLocationPreferenceState] = useState<LocationPreference>({
    preferredLocations: [],
    maxDistance: 10,
    showAllLocations: true
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isDetecting, setIsDetecting] = useState(false)
  const [step, setStep] = useState<"location" | "preferences">("location")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isOpen && isClient) {
      const userLocation = getUserLocation()
      const preference = getLocationPreference()
      setCurrentLocation(userLocation)
      setLocationPreferenceState(preference)
      
      if (userLocation) {
        setSearchQuery(userLocation.city)
      }
    }
  }, [isOpen, isClient])

  useEffect(() => {
    if (searchQuery.length > 0) {
      const locationSuggestions = getLocationSuggestions(searchQuery)
      setSuggestions(locationSuggestions)
    } else {
      setSuggestions([])
    }
  }, [searchQuery])

  const handleDetectLocation = async () => {
    setIsDetecting(true)
    try {
      const location = await detectUserLocation()
      if (location) {
        setCurrentLocation(location)
        setSearchQuery(location.city)
        setUserLocation(location)
      } else {
        alert("Could not detect your location. Please select manually.")
      }
    } catch (error) {
      console.error("Location detection failed:", error)
      alert("Location detection failed. Please select manually.")
    } finally {
      setIsDetecting(false)
    }
  }

  const handleManualLocation = (cityName: string) => {
    const cityData = CITIES.find(city => city.name === cityName)
    const location: UserLocation = {
      city: cityName,
      coordinates: cityData?.coordinates,
      detectedAt: new Date().toISOString(),
      isManuallySet: true
    }
    
    setCurrentLocation(location)
    setSearchQuery(cityName)
    setSuggestions([])
    setUserLocation(location)
  }

  const handlePreferenceUpdate = (key: keyof LocationPreference, value: string | number | boolean | string[]) => {
    const updated = { ...locationPreference, [key]: value }
    setLocationPreferenceState(updated)
  }

  const handleSave = () => {
    if (currentLocation) {
      updateLocationPreference(locationPreference)
      onLocationSet(currentLocation)
    }
    onClose()
  }

  const handleNext = () => {
    if (step === "location" && currentLocation) {
      setStep("preferences")
    }
  }

  const handleBack = () => {
    if (step === "preferences") {
      setStep("location")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {step === "location" ? "Set Your Location" : "Location Preferences"}
          </DialogTitle>
          <DialogDescription>
            {step === "location" 
              ? "Help us find personal trainers near you"
              : "Customize your trainer discovery experience"
            }
          </DialogDescription>
        </DialogHeader>

        {step === "location" && (
          <div className="space-y-4">
            {/* Auto-detect Location */}
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={handleDetectLocation}
                disabled={!isClient || isDetecting}
                className="w-full"
              >
                <Target className="h-4 w-4 mr-2" />
                {isDetecting ? "Detecting..." : "Detect My Location"}
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                We&apos;ll use your browser&apos;s location
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or select manually
                </span>
              </div>
            </div>

            {/* Manual Location Selection */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for your city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="border rounded-lg p-2 space-y-1 max-h-40 overflow-y-auto">
                  {suggestions.map((location) => (
                    <button
                      key={location}
                      onClick={() => handleManualLocation(location)}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded"
                    >
                      <MapPin className="h-3 w-3 inline mr-2" />
                      {location}
                    </button>
                  ))}
                </div>
              )}

              {/* Popular Cities */}
              {searchQuery === "" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Popular Cities:</p>
                  <div className="flex flex-wrap gap-2">
                    {CITIES.map((city) => (
                      <Button
                        key={city.name}
                        variant="outline"
                        size="sm"
                        onClick={() => handleManualLocation(city.name)}
                      >
                        {city.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Current Location Display */}
            {currentLocation && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">{currentLocation.city}</span>
                    <Badge variant="secondary" className="text-xs">
                      {currentLocation.isManuallySet ? "Manual" : "Auto-detected"}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCurrentLocation(null)
                      setSearchQuery("")
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === "preferences" && (
          <div className="space-y-4">
            {/* Show All Locations Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Show trainers from all cities</div>
                <div className="text-sm text-muted-foreground">
                  Display trainers outside your city
                </div>
              </div>
              <Switch
                checked={locationPreference.showAllLocations}
                onCheckedChange={(checked) => 
                  handlePreferenceUpdate("showAllLocations", checked)
                }
              />
            </div>

            {/* Max Distance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Max Distance</span>
                <span className="text-sm text-muted-foreground">
                  {locationPreference.maxDistance}km
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={locationPreference.maxDistance}
                onChange={(e) => 
                  handlePreferenceUpdate("maxDistance", parseInt(e.target.value))
                }
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5km</span>
                <span>50km</span>
              </div>
            </div>

            {/* Current Settings Summary */}
            <div className="p-3 bg-muted rounded-lg space-y-2">
              <div className="font-medium text-sm">Your Settings:</div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• Location: {currentLocation?.city}</div>
                <div>• Max Distance: {locationPreference.maxDistance}km</div>
                <div>• Show All Cities: {locationPreference.showAllLocations ? "Yes" : "No"}</div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex gap-2">
          {step === "preferences" && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          
          {step === "location" ? (
            <Button 
              onClick={currentLocation ? handleNext : undefined}
              disabled={!isClient || !currentLocation}
              className="flex-1"
            >
              {currentLocation ? "Next" : "Select Location First"}
            </Button>
          ) : (
            <Button onClick={handleSave} className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
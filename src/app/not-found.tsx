"use client"

import { useEffect } from "react"

export default function NotFound() {
  
  useEffect(() => {
    // Redirect to marketing page
    window.location.href = "http://localhost:3000/marketing"
  }, [])

  return null
}
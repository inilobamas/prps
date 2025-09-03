"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to marketing page
    window.location.href = "http://localhost:3000/marketing"
  }, [])

  return null
}
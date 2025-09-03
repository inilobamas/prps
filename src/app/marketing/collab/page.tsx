"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { trackCollabSubmit } from "@/lib/analytics"
import { toast } from "sonner"
import { Users, MapPin, TrendingUp } from "lucide-react"

interface FormData {
  name: string
  email: string
  role: string
  city: string
  socialUrls: string
  message: string
}

export default function CollabPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: "",
    city: "",
    socialUrls: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API submission
    setTimeout(() => {
      console.log("Collab form submission:", formData)
      trackCollabSubmit()
      toast.success("Thanks for your interest! We&apos;ll be in touch soon. 🤝")
      setFormData({
        name: "",
        email: "",
        role: "",
        city: "",
        socialUrls: "",
        message: ""
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Partner with PRPS
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Join us in building Indonesia&apos;s strongest fitness community
            </p>
          </div>

          {/* Partnership Benefits */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                title: "Creator Collaborations",
                description: "Content partnerships, co-branded programs, revenue sharing opportunities"
              },
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Gym Partnerships",
                description: "Equipment trials, member discounts, training workshops for your staff"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Growth Together", 
                description: "Cross-promotion, community building, shared expertise and resources"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Let&apos;s Connect</CardTitle>
                <p className="text-center text-muted-foreground">
                  Tell us about yourself and how we can work together
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium">
                        Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="role"
                        value={formData.role}
                        onChange={handleInputChange("role")}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select your role</option>
                        <option value="Creator">Content Creator</option>
                        <option value="Gym Owner">Gym Owner</option>
                        <option value="Trainer">Personal Trainer</option>
                        <option value="Influencer">Fitness Influencer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium">
                        City <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange("city")}
                        required
                        placeholder="Malang, Jakarta, etc."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="socialUrls" className="text-sm font-medium">
                      Social Media URLs
                    </label>
                    <Input
                      id="socialUrls"
                      value={formData.socialUrls}
                      onChange={handleInputChange("socialUrls")}
                      placeholder="Instagram, TikTok, YouTube links (comma separated)"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange("message")}
                      required
                      placeholder="Tell us about your audience, your gym, or collaboration ideas..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    {isSubmitting ? "Sending..." : "Send Partnership Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Priority given to creators and gyms in Malang & surrounding areas
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <Badge variant="secondary">Malang</Badge>
              <Badge variant="secondary">East Java</Badge>
              <Badge variant="secondary">Indonesia</Badge>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
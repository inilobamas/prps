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
      toast.success("Terima kasih! Kami akan segera menghubungi kamu. 🤝")
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
              Kolaborasi dengan PRPS
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Mari bergabung membangun komunitas fitness terkuat di Indonesia
            </p>
          </div>

          {/* Partnership Benefits */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                title: "Kolaborasi Kreator",
                description: "Partnership konten, co-branded program, revenue sharing yang menguntungkan"
              },
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Partnership Gym",
                description: "Trial equipment, diskon member, workshop training untuk staff gym kamu"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Berkembang Bersama", 
                description: "Cross-promotion, membangun komunitas, sharing expertise dan resources"
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
                <CardTitle className="text-center text-2xl">Mari Berkolaborasi</CardTitle>
                <p className="text-center text-muted-foreground">
                  Ceritakan tentang diri kamu dan bagaimana kita bisa bekerja sama
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nama <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        required
                        placeholder="Nama lengkap kamu"
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
                        Peran <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="role"
                        value={formData.role}
                        onChange={handleInputChange("role")}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Pilih peran kamu</option>
                        <option value="Creator">Content Creator</option>
                        <option value="Gym Owner">Pemilik Gym</option>
                        <option value="Trainer">Personal Trainer</option>
                        <option value="Influencer">Fitness Influencer</option>
                        <option value="Other">Lainnya</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium">
                        Kota <span className="text-red-500">*</span>
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
                      Link Media Sosial
                    </label>
                    <Input
                      id="socialUrls"
                      value={formData.socialUrls}
                      onChange={handleInputChange("socialUrls")}
                      placeholder="Link Instagram, TikTok, YouTube (pisah dengan koma)"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange("message")}
                      required
                      placeholder="Ceritakan tentang audience kamu, gym kamu, atau ide kolaborasi..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Proposal Kolaborasi"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Prioritas untuk kreator dan gym di Malang & sekitarnya
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
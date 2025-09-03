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
import { toast } from "sonner"
import { Star, Trophy, Target } from "lucide-react"

interface TestimonialFormData {
  name: string
  age: string
  program: string
  duration: string
  beforeWeight: string
  afterWeight: string
  achievement: string
  testimonial: string
  instagram: string
  rating: number
}

export default function TestimoniPage() {
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: "",
    age: "",
    program: "",
    duration: "",
    beforeWeight: "",
    afterWeight: "",
    achievement: "",
    testimonial: "",
    instagram: "",
    rating: 0
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof TestimonialFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const formatWhatsAppMessage = (data: TestimonialFormData) => {
    const weightChange = data.beforeWeight && data.afterWeight 
      ? `${data.beforeWeight}kg → ${data.afterWeight}kg`
      : 'Data berat tidak tersedia'
    
    const stars = '⭐'.repeat(data.rating)
      
    const message = `Hallo Admin PRPS

⭐ *TESTIMONI HASIL NYATA* ⭐

👤 *Nama:* ${data.name}
🎂 *Usia:* ${data.age} tahun
💪 *Program:* ${data.program}
⏰ *Durasi:* ${data.duration}
⚖️ *Perubahan Berat:* ${weightChange}
🏆 *Achievement:* ${data.achievement}
⭐ *Rating:* ${stars} (${data.rating}/5)
${data.instagram ? `📸 *Instagram:* ${data.instagram}` : ''}

💬 *Testimoni:*
"${data.testimonial}"

Semoga bisa menginspirasi yang lain! 🔥`
    
    return encodeURIComponent(message)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.rating === 0) {
      toast.error("Silakan berikan rating untuk program!")
      return
    }
    
    setIsSubmitting(true)

    try {
      // Format WhatsApp message
      const whatsappMessage = formatWhatsAppMessage(formData)
      const whatsappUrl = `https://api.whatsapp.com/send?phone=6285156226605&text=${whatsappMessage}`
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank')
      
      // Show success message
      toast.success("Testimoni dikirim ke WhatsApp! Terima kasih sudah berbagi! 🙏")
      
      // Reset form
      setFormData({
        name: "",
        age: "",
        program: "",
        duration: "",
        beforeWeight: "",
        afterWeight: "",
        achievement: "",
        testimonial: "",
        instagram: "",
        rating: 0
      })
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Bagikan Hasil Nyata Kamu
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Inspirasi orang lain dengan perjalanan fitness transformation kamu
            </p>
          </div>

          {/* Success Stories Preview */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Star className="h-8 w-8" />,
                title: "Testimoni Terbaik",
                description: "Bagikan pengalaman positif kamu dengan program PRPS"
              },
              {
                icon: <Trophy className="h-8 w-8" />,
                title: "Achievement Kamu", 
                description: "Ceritakan pencapaian dan milestone yang sudah diraih"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Inspirasi untuk Semua",
                description: "Motivasi member lain untuk mencapai goal fitness mereka"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400">
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
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
                <CardTitle className="text-center text-2xl">Kirim Testimoni Kamu</CardTitle>
                <p className="text-center text-muted-foreground">
                  Ceritakan hasil nyata yang kamu dapatkan dari program PRPS
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
                      <label htmlFor="age" className="text-sm font-medium">
                        Usia <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange("age")}
                        required
                        placeholder="25"
                        min="15"
                        max="80"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="program" className="text-sm font-medium">
                        Program PRPS <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="program"
                        value={formData.program}
                        onChange={handleInputChange("program")}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Pilih program yang diikuti</option>
                        <option value="Beginner Strength">Beginner Strength</option>
                        <option value="Bodybuilding Aesthetic">Bodybuilding Aesthetic</option>
                        <option value="Boxing Fundamentals">Boxing Fundamentals</option>
                        <option value="Home Bodyweight">Home Bodyweight</option>
                        <option value="Marathon Training">Marathon Training</option>
                        <option value="Powerlifting Intro">Powerlifting Intro</option>
                        <option value="SBD Powerlifting">SBD Powerlifting</option>
                        <option value="Sprinter Speed">Sprinter Speed</option>
                        <option value="Custom Program">Program Custom</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="duration" className="text-sm font-medium">
                        Durasi Program <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={handleInputChange("duration")}
                        required
                        placeholder="3 bulan, 6 bulan, 1 tahun"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="beforeWeight" className="text-sm font-medium">
                        Berat Sebelum (kg)
                      </label>
                      <Input
                        id="beforeWeight"
                        type="number"
                        value={formData.beforeWeight}
                        onChange={handleInputChange("beforeWeight")}
                        placeholder="75"
                        min="30"
                        max="200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="afterWeight" className="text-sm font-medium">
                        Berat Sesudah (kg)
                      </label>
                      <Input
                        id="afterWeight"
                        type="number"
                        value={formData.afterWeight}
                        onChange={handleInputChange("afterWeight")}
                        placeholder="68"
                        min="30"
                        max="200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Rating Program <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          className={`text-2xl transition-colors ${
                            star <= formData.rating 
                              ? 'text-yellow-400 hover:text-yellow-500' 
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        >
                          {star <= formData.rating ? '⭐' : '☆'}
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({formData.rating}/5)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="achievement" className="text-sm font-medium">
                      Achievement Utama <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="achievement"
                      value={formData.achievement}
                      onChange={handleInputChange("achievement")}
                      required
                      placeholder="Turun 7kg, Deadlift 100kg, Marathon Sub-4, dll"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="testimonial" className="text-sm font-medium">
                      Testimoni & Cerita <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="testimonial"
                      value={formData.testimonial}
                      onChange={handleInputChange("testimonial")}
                      required
                      placeholder="Ceritakan perjalanan fitness kamu, apa yang berubah, bagaimana PRPS membantu..."
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="instagram" className="text-sm font-medium">
                      Instagram (optional)
                    </label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange("instagram")}
                      placeholder="@username_instagram"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Testimoni ke WhatsApp"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Testimoni kamu akan membantu menginspirasi member lain untuk mencapai goal mereka
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <Badge variant="secondary">Transformation</Badge>
              <Badge variant="secondary">Inspiration</Badge>
              <Badge variant="secondary">Community</Badge>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
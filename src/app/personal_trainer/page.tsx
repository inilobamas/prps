"use client"

import { useState } from "react"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function PTDashboard() {
  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              PT Dashboard
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Kelola program latihan dan client kamu
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Buat Program Baru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Buat program latihan yang bisa dijual dan digunakan oleh client
                </p>
                <Link href="/personal_trainer/create">
                  <Button className="w-full">Mulai Buat Program</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Program Saya
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Lihat dan edit program yang sudah kamu buat
                </p>
                <Link href="/personal_trainer/programs">
                  <Button variant="outline" className="w-full">Kelola Program</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Client Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Monitor progress client dan berikan feedback
                </p>
                <Link href="/personal_trainer/clients">
                  <Button variant="outline" className="w-full">Lihat Client</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Statistik program dan performa client
                </p>
                <Button variant="outline" className="w-full">Lihat Stats</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}
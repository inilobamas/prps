"use client"

import { useState } from "react"
import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, Users, BarChart3, DollarSign, MessageSquare, TrendingUp, Bell, Calendar } from "lucide-react"
import Link from "next/link"

export default function PTDashboard() {
  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-12">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                PT Dashboard
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Kelola program latihan dan client kamu
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/personal_trainer/notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications (5)
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-muted-foreground">Active Clients</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">Rp 3.1M</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <FileText className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Programs</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">78.5%</p>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
              </CardContent>
            </Card>
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
                <div className="space-y-2">
                  <Link href="/personal_trainer/clients" className="block">
                    <Button variant="outline" className="w-full">Kelola Client</Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-xs text-green-600 text-center">38 Active</span>
                    <span className="text-xs text-orange-600 text-center">5 Need Attention</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue & Payouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Track earnings, commission, dan history payout
                </p>
                <div className="space-y-2">
                  <Link href="/personal_trainer/revenue" className="block">
                    <Button variant="outline" className="w-full">Lihat Revenue</Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-xs text-green-600 text-center">70% Commission</span>
                    <span className="text-xs text-orange-600 text-center">Pending: Rp 3.1M</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Statistik program dan performa client
                </p>
                <div className="space-y-2">
                  <Link href="/personal_trainer/analytics" className="block">
                    <Button variant="outline" className="w-full">Lihat Analytics</Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-xs text-blue-600 text-center">4.8/5 Rating</span>
                    <span className="text-xs text-green-600 text-center">+18% Growth</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Communication Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Chat dengan client dan berikan feedback
                </p>
                <div className="space-y-2">
                  <Link href="/personal_trainer/clients" className="block">
                    <Button variant="outline" className="w-full">Client Messages</Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-xs text-blue-600 text-center">12 Unread</span>
                    <span className="text-xs text-green-600 text-center">Response: 2.1h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Booking Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Kelola jadwal availability untuk PT booking
                </p>
                <div className="space-y-2">
                  <Link href="/personal_trainer/availability" className="block">
                    <Button variant="outline" className="w-full">Manage Availability</Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-xs text-green-600 text-center">18 Active Slots</span>
                    <span className="text-xs text-orange-600 text-center">3 Pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">New Program Sale</p>
                      <p className="text-sm text-muted-foreground">Sari Melati bought Aesthetic Split Program</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+Rp 280,000</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium">Client Message</p>
                      <p className="text-sm text-muted-foreground">Budi Santoso: &quot;Thanks for the form tips!&quot;</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="font-medium">Workout Completed</p>
                      <p className="text-sm text-muted-foreground">Ahmad Rahman finished Week 8 Day 3</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  )
}
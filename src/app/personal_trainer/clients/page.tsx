'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Search, 
  MessageSquare, 
  TrendingUp, 
  Calendar, 
  Users,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  UserPlus
} from 'lucide-react';
import Link from 'next/link';
import { Client, ClientProgram } from '@/lib/types';

// Mock data - in real app, this would come from API/database
const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Budi Santoso',
    email: 'budi@email.com',
    phone: '+62812-3456-7890',
    joinDate: '2024-08-15',
    lastActive: '2024-09-03',
    programs: [
      {
        programSlug: 'sbd-powerbuilding',
        programTitle: 'Power Building Program',
        startDate: '2024-08-20',
        progress: 65,
        isActive: true,
        totalWorkouts: 48,
        completedWorkouts: 31
      }
    ],
    stats: {
      totalWorkouts: 31,
      currentStreak: 5,
      longestStreak: 12,
      totalVolumeKg: 45250,
      averageWorkoutDuration: 75,
      lastWorkoutDate: '2024-09-03'
    },
    subscription: {
      type: 'premium',
      startDate: '2024-08-15',
      endDate: '2024-11-15',
      programsIncluded: ['sbd-powerbuilding'],
      monthlyFee: 150000
    }
  },
  {
    id: 'client-2',
    name: 'Sari Melati',
    email: 'sari@email.com',
    phone: '+62813-9876-5432',
    joinDate: '2024-08-28',
    lastActive: '2024-09-02',
    programs: [
      {
        programSlug: 'home-bodyweight',
        programTitle: 'Home Bodyweight Training',
        startDate: '2024-08-28',
        progress: 40,
        isActive: true,
        totalWorkouts: 24,
        completedWorkouts: 10
      }
    ],
    stats: {
      totalWorkouts: 10,
      currentStreak: 3,
      longestStreak: 7,
      totalVolumeKg: 0,
      averageWorkoutDuration: 45,
      lastWorkoutDate: '2024-09-02'
    },
    subscription: {
      type: 'free',
      startDate: '2024-08-28',
      programsIncluded: ['home-bodyweight']
    }
  },
  {
    id: 'client-3',
    name: 'Ahmad Rahman',
    email: 'ahmad@email.com',
    joinDate: '2024-07-10',
    lastActive: '2024-08-30',
    programs: [
      {
        programSlug: 'aesthetic-split',
        programTitle: 'Aesthetic Split Program',
        startDate: '2024-07-15',
        endDate: '2024-08-30',
        progress: 100,
        isActive: false,
        totalWorkouts: 36,
        completedWorkouts: 36
      }
    ],
    stats: {
      totalWorkouts: 36,
      currentStreak: 0,
      longestStreak: 15,
      totalVolumeKg: 72500,
      averageWorkoutDuration: 90,
      lastWorkoutDate: '2024-08-30'
    },
    subscription: {
      type: 'premium',
      startDate: '2024-07-10',
      endDate: '2024-10-10',
      programsIncluded: ['aesthetic-split']
    }
  }
];

function ClientCard({ client }: { client: Client }) {
  const activeProgram = client.programs.find(p => p.isActive);
  const isActive = new Date(client.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{client.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{client.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isActive ? "default" : "secondary"}>
              {isActive ? "Active" : "Inactive"}
            </Badge>
            <Badge variant={client.subscription.type === "premium" ? "default" : "outline"}>
              {client.subscription.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeProgram && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">{activeProgram.programTitle}</p>
              <span className="text-sm text-muted-foreground">
                {activeProgram.progress}% Complete
              </span>
            </div>
            <Progress value={activeProgram.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {activeProgram.completedWorkouts}/{activeProgram.totalWorkouts} workouts
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">{client.stats.currentStreak}</p>
            <p className="text-muted-foreground">Current Streak</p>
          </div>
          <div>
            <p className="font-medium">{client.stats.totalWorkouts}</p>
            <p className="text-muted-foreground">Total Workouts</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link href={`/personal_trainer/clients/${client.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/personal_trainer/clients/${client.id}/messages`}>
              <MessageSquare className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const isActive = new Date(client.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && isActive) ||
                         (filter === 'inactive' && !isActive);
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => new Date(c.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    premium: clients.filter(c => c.subscription.type === 'premium').length,
    totalRevenue: clients.reduce((sum, c) => sum + (c.subscription.monthlyFee || 0), 0)
  };

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link href="/personal_trainer">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Client Management</h1>
              <p className="text-muted-foreground">
                Kelola dan monitor progress semua client kamu
              </p>
            </div>
            <Button asChild>
              <Link href="/personal_trainer/onboarding">
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Client
              </Link>
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{stats.active}</p>
                    <p className="text-sm text-muted-foreground">Active This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">{stats.premium}</p>
                    <p className="text-sm text-muted-foreground">Premium Clients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">Rp {stats.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | 'active' | 'inactive')} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All ({clients.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
                <TabsTrigger value="inactive">Inactive ({clients.length - stats.active})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Client Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No clients found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search terms' : 'Start building your client base!'}
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
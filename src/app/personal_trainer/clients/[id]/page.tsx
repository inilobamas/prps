'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Phone,
  Mail,
  Target,
  Activity,
  Award,
  Clock,
  Dumbbell,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { Client, DayLog } from '@/lib/types';
import { getAllDayLogs } from '@/lib/storage';
import { formatDuration } from '@/lib/fitness';

// Mock client data - would come from API in real app
const mockClient: Client = {
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
};

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [recentWorkouts, setRecentWorkouts] = useState<DayLog[]>([]);

  useEffect(() => {
    // In real app, fetch client by ID
    setClient(mockClient);
    
    // Get recent workouts for this client
    const allLogs = getAllDayLogs();
    const clientLogs = allLogs
      .filter(log => log.programSlug === mockClient.programs[0]?.programSlug)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    setRecentWorkouts(clientLogs);
  }, [params.id]);

  if (!client) {
    return (
      <Section className="pt-24">
        <Container>
          <div className="text-center">Loading...</div>
        </Container>
      </Section>
    );
  }

  const activeProgram = client.programs.find(p => p.isActive);
  const isActive = new Date(client.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link href="/personal_trainer/clients">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Clients
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{client.name}</h1>
              <p className="text-muted-foreground">
                Client since {new Date(client.joinDate).toLocaleDateString('id-ID')}
              </p>
            </div>
            <Button asChild>
              <Link href={`/personal_trainer/clients/${client.id}/messages`}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Activity className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{client.stats.currentStreak}</p>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{client.stats.totalWorkouts}</p>
                  <p className="text-sm text-muted-foreground">Total Workouts</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Dumbbell className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{(client.stats.totalVolumeKg / 1000).toFixed(1)}t</p>
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{client.stats.averageWorkoutDuration}m</p>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="workouts">Recent Workouts</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Client Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{client.email}</span>
                    </div>
                    {client.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {new Date(client.joinDate).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span>Last active {new Date(client.lastActive).toLocaleDateString('id-ID')}</span>
                      <Badge variant={isActive ? "default" : "secondary"} className="ml-auto">
                        {isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Program */}
                {activeProgram && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Program</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">{activeProgram.programTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                          Started {new Date(activeProgram.startDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{activeProgram.progress}%</span>
                        </div>
                        <Progress value={activeProgram.progress} />
                        <p className="text-xs text-muted-foreground">
                          {activeProgram.completedWorkouts} of {activeProgram.totalWorkouts} workouts completed
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="programs">
              <Card>
                <CardHeader>
                  <CardTitle>Program History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {client.programs.map((program, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{program.programTitle}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(program.startDate).toLocaleDateString('id-ID')} - 
                            {program.endDate ? new Date(program.endDate).toLocaleDateString('id-ID') : 'Ongoing'}
                          </p>
                          <div className="mt-2">
                            <Progress value={program.progress} className="h-2" />
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <Badge variant={program.isActive ? "default" : "secondary"}>
                            {program.isActive ? "Active" : "Completed"}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {program.completedWorkouts}/{program.totalWorkouts}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workouts">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Workouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentWorkouts.length > 0 ? recentWorkouts.map((workout, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">
                            {workout.week ? `Week ${workout.week} ` : ''}Day {workout.day}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(workout.date).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="default">Completed</Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            +{workout.xpEarned || 0} XP
                          </p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-muted-foreground text-center py-4">
                        No recent workouts found
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Subscription Type</p>
                        <p className="text-sm text-muted-foreground">Current plan</p>
                      </div>
                      <Badge variant={client.subscription.type === "premium" ? "default" : "outline"}>
                        {client.subscription.type}
                      </Badge>
                    </div>
                    
                    {client.subscription.monthlyFee && (
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Monthly Fee</p>
                          <p className="text-sm text-muted-foreground">Recurring payment</p>
                        </div>
                        <p className="font-bold">Rp {client.subscription.monthlyFee.toLocaleString()}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Start Date</p>
                        <p className="text-sm text-muted-foreground">Subscription began</p>
                      </div>
                      <p>{new Date(client.subscription.startDate).toLocaleDateString('id-ID')}</p>
                    </div>
                    
                    {client.subscription.endDate && (
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">End Date</p>
                          <p className="text-sm text-muted-foreground">Subscription expires</p>
                        </div>
                        <p>{new Date(client.subscription.endDate).toLocaleDateString('id-ID')}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </Section>
  );
}
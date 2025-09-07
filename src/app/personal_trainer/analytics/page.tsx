'use client';

import React from 'react';

import { useState, useEffect } from 'react';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Target,
  Award,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Star,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import Link from 'next/link';

// Mock analytics data
const analyticsData = {
  overview: {
    totalClients: 45,
    activeClients: 38,
    retentionRate: 84.4,
    averageRating: 4.8,
    totalPrograms: 8,
    completionRate: 78.5
  },
  programPerformance: [
    {
      slug: 'sbd-powerbuilding',
      title: 'Power Building Program',
      clients: 18,
      completionRate: 82,
      averageRating: 4.9,
      revenue: 9000000,
      avgDuration: 85
    },
    {
      slug: 'aesthetic-split',
      title: 'Aesthetic Split Program',
      clients: 15,
      completionRate: 76,
      averageRating: 4.7,
      revenue: 6000000,
      avgDuration: 75
    },
    {
      slug: 'home-bodyweight',
      title: 'Home Bodyweight Training',
      clients: 12,
      completionRate: 88,
      averageRating: 4.6,
      revenue: 2988000,
      avgDuration: 45
    }
  ],
  monthlyTrends: {
    clientGrowth: [
      { month: 'Jul', clients: 32, newClients: 8, churn: 2 },
      { month: 'Aug', clients: 38, newClients: 9, churn: 3 },
      { month: 'Sep', clients: 45, newClients: 10, churn: 3 }
    ],
    revenueGrowth: [
      { month: 'Jul', revenue: 3200000, commission: 2240000 },
      { month: 'Aug', revenue: 4100000, commission: 2870000 },
      { month: 'Sep', revenue: 4500000, commission: 3150000 }
    ]
  },
  clientMetrics: {
    averageSessionsPerWeek: 3.2,
    averageWorkoutDuration: 72,
    mostPopularTime: '19:00-21:00',
    streakDistribution: {
      '0-2 days': 15,
      '3-7 days': 23,
      '8-14 days': 12,
      '15+ days': 8
    }
  }
};

function MetricCard({ title, value, change, icon: Icon, color }: {
  title: string;
  value: string | number;
  change?: { value: number; period: string };
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Icon className={`h-8 w-8 ${color}`} />
          <div className="flex-1">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
            {change && (
              <p className={`text-xs ${change.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change.value > 0 ? '+' : ''}{change.value}% {change.period}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');

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
              <h1 className="text-3xl font-bold">Analytics & Insights</h1>
              <p className="text-muted-foreground">
                Comprehensive performance metrics for your training business
              </p>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <MetricCard
              title="Total Clients"
              value={analyticsData.overview.totalClients}
              change={{ value: 18.4, period: 'vs last month' }}
              icon={Users}
              color="text-blue-500"
            />
            <MetricCard
              title="Retention Rate"
              value={`${analyticsData.overview.retentionRate}%`}
              change={{ value: 5.2, period: 'vs last month' }}
              icon={Target}
              color="text-green-500"
            />
            <MetricCard
              title="Avg Rating"
              value={analyticsData.overview.averageRating}
              icon={Star}
              color="text-yellow-500"
            />
            <MetricCard
              title="Completion Rate"
              value={`${analyticsData.overview.completionRate}%`}
              change={{ value: 3.1, period: 'vs last month' }}
              icon={CheckCircle}
              color="text-purple-500"
            />
          </div>

          <Tabs defaultValue="programs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="programs">Program Performance</TabsTrigger>
              <TabsTrigger value="clients">Client Metrics</TabsTrigger>
              <TabsTrigger value="growth">Growth Trends</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="programs">
              <Card>
                <CardHeader>
                  <CardTitle>Program Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {analyticsData.programPerformance.map((program) => (
                      <div key={program.slug} className="p-6 border rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{program.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {program.clients} active clients
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold">Rp {program.revenue.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">Total Revenue</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                            <div className="flex items-center gap-2">
                              <Progress value={program.completionRate} className="flex-1 h-2" />
                              <span className="text-sm font-medium">{program.completionRate}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{program.averageRating}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Avg Duration</p>
                            <p className="font-medium">{program.avgDuration} min</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Revenue/Client</p>
                            <p className="font-medium">Rp {Math.round(program.revenue / program.clients).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Behavior</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Avg Sessions/Week</span>
                        <span className="font-bold">{analyticsData.clientMetrics.averageSessionsPerWeek}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Avg Workout Duration</span>
                        <span className="font-bold">{analyticsData.clientMetrics.averageWorkoutDuration} min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Most Popular Time</span>
                        <span className="font-bold">{analyticsData.clientMetrics.mostPopularTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Streak Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(analyticsData.clientMetrics.streakDistribution).map(([range, count]) => (
                        <div key={range} className="flex items-center gap-3">
                          <div className="w-20 text-sm">{range}</div>
                          <div className="flex-1">
                            <Progress value={(count / analyticsData.overview.totalClients) * 100} className="h-2" />
                          </div>
                          <div className="w-8 text-sm font-medium">{count}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="growth">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.monthlyTrends.clientGrowth.map((month) => (
                        <div key={month.month} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{month.month} 2024</p>
                            <p className="text-sm text-muted-foreground">
                              +{month.newClients} new, -{month.churn} churn
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold">{month.clients}</p>
                            <p className="text-xs text-green-600">
                              +{month.newClients - month.churn} net growth
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.monthlyTrends.revenueGrowth.map((month) => (
                        <div key={month.month} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{month.month} 2024</p>
                            <p className="text-sm text-muted-foreground">
                              Commission: Rp {month.commission.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">Rp {month.revenue.toLocaleString()}</p>
                            <p className="text-xs text-blue-600">Total Sales</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights">
              <div className="space-y-6">
                {/* Key Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      Key Insights & Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-900">Strong Performance</p>
                            <p className="text-sm text-green-700">
                              Your SBD Powerbuilding program has the highest completion rate (82%) and rating (4.9/5). 
                              Consider creating similar strength-focused programs.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900">Growth Opportunity</p>
                            <p className="text-sm text-blue-700">
                              Your client base grew 18% this month. Consider increasing program capacity or creating 
                              intermediate versions of popular programs.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Target className="h-5 w-5 text-orange-500 mt-0.5" />
                          <div>
                            <p className="font-medium text-orange-900">Focus Area</p>
                            <p className="text-sm text-orange-700">
                              Aesthetic Split has lower completion (76%). Review week 8-12 difficulty and consider 
                              adding more support or motivation touchpoints.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Rankings */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analyticsData.programPerformance
                          .sort((a, b) => (b.completionRate * b.averageRating) - (a.completionRate * a.averageRating))
                          .map((program, index) => (
                            <div key={program.slug} className="flex items-center gap-3 p-3 border rounded-lg">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                                <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{program.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {program.completionRate}% completion • {program.averageRating}/5 rating
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">{program.clients}</p>
                                <p className="text-xs text-muted-foreground">clients</p>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue by Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analyticsData.programPerformance
                          .sort((a, b) => b.revenue - a.revenue)
                          .map((program) => {
                            const totalRevenue = analyticsData.programPerformance.reduce((sum, p) => sum + p.revenue, 0);
                            const percentage = (program.revenue / totalRevenue) * 100;
                            
                            return (
                              <div key={program.slug} className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">{program.title}</span>
                                  <span className="text-sm">Rp {program.revenue.toLocaleString()}</span>
                                </div>
                                <Progress value={percentage} className="h-2" />
                                <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}% of total</p>
                              </div>
                            );
                          })
                        }
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <p className="font-medium">Create Advanced Program</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Many clients completing SBD Powerbuilding. Create an advanced follow-up program.
                        </p>
                        <Button size="sm" asChild>
                          <Link href="/personal_trainer/create">Create Program</Link>
                        </Button>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <p className="font-medium">Client Check-ins</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          3 clients have not been active for 5+ days. Send motivational messages.
                        </p>
                        <Button size="sm" variant="outline" asChild>
                          <Link href="/personal_trainer/clients">View Clients</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="clients">
              <div className="grid gap-6 md:grid-cols-3">
                <MetricCard
                  title="Active This Week"
                  value={analyticsData.overview.activeClients}
                  change={{ value: 8.5, period: 'vs last week' }}
                  icon={Activity}
                  color="text-green-500"
                />
                <MetricCard
                  title="Avg Sessions/Week"
                  value={analyticsData.clientMetrics.averageSessionsPerWeek}
                  icon={Calendar}
                  color="text-blue-500"
                />
                <MetricCard
                  title="Avg Duration"
                  value={`${analyticsData.clientMetrics.averageWorkoutDuration}m`}
                  icon={Clock}
                  color="text-purple-500"
                />
              </div>
            </TabsContent>

            <TabsContent value="growth">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Growth Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <p className="font-medium mb-3">Client Acquisition</p>
                        <div className="space-y-2">
                          {analyticsData.monthlyTrends.clientGrowth.map((month) => (
                            <div key={month.month} className="flex items-center justify-between">
                              <span className="text-sm">{month.month} 2024</span>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-green-600">+{month.newClients}</Badge>
                                <Badge variant="outline" className="text-red-600">-{month.churn}</Badge>
                                <span className="font-medium">{month.clients} total</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analyticsData.monthlyTrends.revenueGrowth.map((month) => (
                        <div key={month.month} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{month.month} 2024</span>
                            <span className="text-sm">Rp {month.revenue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Your Commission</span>
                            <span className="text-green-600 font-medium">Rp {month.commission.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </Section>
  );
}
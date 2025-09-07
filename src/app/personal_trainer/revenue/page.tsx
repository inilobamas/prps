'use client';

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
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { TrainerRevenue, ProgramSale } from '@/lib/types';

// Mock revenue data
const mockRevenueData: TrainerRevenue[] = [
  {
    month: '2024-09',
    totalEarnings: 4500000,
    commission: 3150000,
    payoutStatus: 'pending',
    programSales: [
      {
        id: 'sale-1',
        programSlug: 'sbd-powerbuilding',
        programTitle: 'Power Building Program',
        clientName: 'Budi Santoso',
        saleDate: '2024-09-01',
        price: 500000,
        trainerShare: 350000,
        prpsShare: 150000,
        status: 'active'
      },
      {
        id: 'sale-2',
        programSlug: 'aesthetic-split',
        programTitle: 'Aesthetic Split Program',
        clientName: 'Sari Melati',
        saleDate: '2024-09-15',
        price: 400000,
        trainerShare: 280000,
        prpsShare: 120000,
        status: 'active'
      }
    ]
  },
  {
    month: '2024-08',
    totalEarnings: 6200000,
    commission: 4340000,
    payoutStatus: 'paid',
    payoutDate: '2024-09-05',
    programSales: [
      {
        id: 'sale-3',
        programSlug: 'sbd-powerbuilding',
        programTitle: 'Power Building Program',
        clientName: 'Ahmad Rahman',
        saleDate: '2024-08-05',
        price: 500000,
        trainerShare: 350000,
        prpsShare: 150000,
        status: 'completed'
      },
      {
        id: 'sale-4',
        programSlug: 'marathon-training',
        programTitle: 'Marathon Training Program',
        clientName: 'Lisa Wijaya',
        saleDate: '2024-08-12',
        price: 450000,
        trainerShare: 315000,
        prpsShare: 135000,
        status: 'active'
      }
    ]
  }
];

const COMMISSION_RATES = {
  tier1: { min: 0, rate: 0.65, description: '0-10 sales/month' },
  tier2: { min: 10, rate: 0.70, description: '10-25 sales/month' },
  tier3: { min: 25, rate: 0.75, description: '25+ sales/month' }
};

function RevenueCard({ revenue }: { revenue: TrainerRevenue }) {
  const statusColor = {
    pending: 'text-orange-500',
    processing: 'text-blue-500',
    paid: 'text-green-500'
  };

  const statusIcon = {
    pending: Clock,
    processing: AlertCircle,
    paid: CheckCircle
  };

  const Icon = statusIcon[revenue.payoutStatus];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {new Date(revenue.month).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          </CardTitle>
          <Badge variant={revenue.payoutStatus === 'paid' ? 'default' : 'secondary'}>
            <Icon className={`h-3 w-3 mr-1 ${statusColor[revenue.payoutStatus]}`} />
            {revenue.payoutStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Sales</p>
            <p className="text-xl font-bold">Rp {revenue.totalEarnings.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Your Commission</p>
            <p className="text-xl font-bold text-green-600">Rp {revenue.commission.toLocaleString()}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">{revenue.programSales.length} Sales this month</p>
          <div className="space-y-2">
            {revenue.programSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between text-sm p-2 bg-background rounded">
                <div>
                  <p className="font-medium">{sale.clientName}</p>
                  <p className="text-muted-foreground">{sale.programTitle}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Rp {sale.trainerShare.toLocaleString()}</p>
                  <Badge variant="outline" className="text-xs">
                    {sale.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {revenue.payoutDate && (
          <div className="text-sm text-muted-foreground">
            Paid on {new Date(revenue.payoutDate).toLocaleDateString('id-ID')}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function RevenuePage() {
  const [revenueData, setRevenueData] = useState<TrainerRevenue[]>(mockRevenueData);
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const totalEarnings = revenueData.reduce((sum, r) => sum + r.commission, 0);
  const pendingEarnings = revenueData
    .filter(r => r.payoutStatus === 'pending')
    .reduce((sum, r) => sum + r.commission, 0);
  const totalSales = revenueData.reduce((sum, r) => sum + r.programSales.length, 0);

  // Calculate current tier
  const currentMonthSales = revenueData[0]?.programSales.length || 0;
  let currentTier = COMMISSION_RATES.tier1;
  if (currentMonthSales >= COMMISSION_RATES.tier3.min) currentTier = COMMISSION_RATES.tier3;
  else if (currentMonthSales >= COMMISSION_RATES.tier2.min) currentTier = COMMISSION_RATES.tier2;

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
              <h1 className="text-3xl font-bold">Revenue & Payouts</h1>
              <p className="text-muted-foreground">
                Track your earnings and commission structure
              </p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Revenue Overview */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">Rp {totalEarnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">Rp {pendingEarnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Pending Payout</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{totalSales}</p>
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">{Math.round(currentTier.rate * 100)}%</p>
                    <p className="text-sm text-muted-foreground">Commission Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="payouts">Payout History</TabsTrigger>
              <TabsTrigger value="sales">Sales Details</TabsTrigger>
              <TabsTrigger value="commission">Commission Structure</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {revenueData.map((revenue) => (
                  <RevenueCard key={revenue.month} revenue={revenue} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="payouts">
              <Card>
                <CardHeader>
                  <CardTitle>Payout History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.map((revenue) => (
                      <div key={revenue.month} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">
                            {new Date(revenue.month).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Rp {revenue.commission.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={revenue.payoutStatus === 'paid' ? 'default' : 'secondary'}>
                            {revenue.payoutStatus}
                          </Badge>
                          {revenue.payoutDate && (
                            <span className="text-sm text-muted-foreground">
                              {new Date(revenue.payoutDate).toLocaleDateString('id-ID')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.flatMap(r => r.programSales).map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium">{sale.clientName}</p>
                              <p className="text-sm text-muted-foreground">{sale.programTitle}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(sale.saleDate).toLocaleDateString('id-ID')}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">Rp {sale.price.toLocaleString()}</p>
                          <p className="text-sm text-green-600">+Rp {sale.trainerShare.toLocaleString()}</p>
                          <Badge variant="outline" className="mt-1">
                            {sale.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commission">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Commission Tier</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-3xl font-bold text-green-600">{Math.round(currentTier.rate * 100)}%</p>
                      <p className="text-sm text-muted-foreground">{currentTier.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Current month: {currentMonthSales} sales
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="font-medium">Commission Breakdown:</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Your Share:</span>
                          <span className="font-bold text-green-600">{Math.round(currentTier.rate * 100)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>PRPS Platform Fee:</span>
                          <span>{Math.round((1 - currentTier.rate) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Commission Tiers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(COMMISSION_RATES).map(([tier, data]) => {
                      const isCurrent = data === currentTier;
                      return (
                        <div 
                          key={tier} 
                          className={`p-4 rounded-lg border ${isCurrent ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{Math.round(data.rate * 100)}% Commission</p>
                              <p className="text-sm text-muted-foreground">{data.description}</p>
                            </div>
                            {isCurrent && (
                              <Badge variant="default">Current</Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    <div className="pt-4 border-t text-sm text-muted-foreground">
                      <p><strong>Note:</strong> Commission tiers are calculated monthly based on your sales volume. Higher tiers unlock better rates!</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Payout Schedule Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payout Schedule & Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-medium text-blue-900">Monthly Payouts</p>
                  <p className="text-sm text-blue-700">Dibayar setiap tanggal 5</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="font-medium text-green-900">Transparent Commission</p>
                  <p className="text-sm text-green-700">No hidden fees or charges</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="font-medium text-purple-900">Performance Bonuses</p>
                  <p className="text-sm text-purple-700">Higher tiers = better rates</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="font-medium mb-2">Payout Methods:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Bank Transfer (BCA, Mandiri, BNI)</li>
                  <li>• E-wallet (GoPay, OVO, DANA)</li>
                  <li>• Minimum payout: Rp 100,000</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
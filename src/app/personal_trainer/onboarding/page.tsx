'use client';

import { useState } from 'react';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight,
  Users, 
  Target,
  CreditCard,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  Dumbbell
} from 'lucide-react';
import Link from 'next/link';

type OnboardingStep = 'client-info' | 'program-selection' | 'subscription' | 'confirmation';

const availablePrograms = [
  {
    slug: 'sbd-powerbuilding',
    title: 'Power Building Program',
    duration: '12 weeks',
    price: 500000,
    description: 'Advanced powerlifting program for serious lifters'
  },
  {
    slug: 'aesthetic-split',
    title: 'Aesthetic Split Program',
    duration: '12 weeks',
    price: 400000,
    description: 'Muscle building and aesthetic development'
  },
  {
    slug: 'home-bodyweight',
    title: 'Home Bodyweight Training',
    duration: '6 weeks',
    price: 249000,
    description: 'No equipment needed, perfect for beginners'
  }
];

export default function ClientOnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('client-info');
  const [formData, setFormData] = useState({
    // Client Info
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    goals: '',
    
    // Program Selection
    selectedPrograms: [] as string[],
    startDate: '',
    
    // Subscription
    subscriptionType: 'premium' as 'free' | 'premium' | 'custom',
    monthlyFee: 0,
    customPrograms: [] as string[]
  });

  const steps = {
    'client-info': { title: 'Client Information', step: 1, total: 4 },
    'program-selection': { title: 'Program Selection', step: 2, total: 4 },
    'subscription': { title: 'Subscription Setup', step: 3, total: 4 },
    'confirmation': { title: 'Confirmation', step: 4, total: 4 }
  };

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleProgramToggle = (programSlug: string) => {
    const programs = formData.selectedPrograms.includes(programSlug)
      ? formData.selectedPrograms.filter(p => p !== programSlug)
      : [...formData.selectedPrograms, programSlug];
    updateFormData({ selectedPrograms: programs });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'client-info':
        return formData.name && formData.email && formData.goals;
      case 'program-selection':
        return formData.selectedPrograms.length > 0;
      case 'subscription':
        return formData.subscriptionType;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    // In real app, this would save to database and send emails
    console.log('New client onboarded:', formData);
    alert('Client berhasil di-onboard! Email welcome dan akses program telah dikirim.');
  };

  const currentStepInfo = steps[currentStep];

  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link href="/personal_trainer/clients">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Clients
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Client Onboarding</h1>
              <p className="text-muted-foreground">
                Add new client and setup their program subscription
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Step {currentStepInfo.step} of {currentStepInfo.total}</span>
              <span className="text-sm text-muted-foreground">{currentStepInfo.title}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStepInfo.step / currentStepInfo.total) * 100}%` }}
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              {/* Step 1: Client Information */}
              {currentStep === 'client-info' && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">Client Information</h2>
                    <p className="text-muted-foreground">Basic information about your new client</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name *</label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                        placeholder="e.g. Budi Santoso"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        placeholder="budi@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData({ phone: e.target.value })}
                        placeholder="+62812-3456-7890"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="age" className="text-sm font-medium">Age</label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => updateFormData({ age: e.target.value })}
                        placeholder="25"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium">Training Experience</label>
                    <Select value={formData.experience} onValueChange={(value) => updateFormData({ experience: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select training experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Pemula (0-6 bulan)</SelectItem>
                        <SelectItem value="novice">Novice (6-18 bulan)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (1.5-3 tahun)</SelectItem>
                        <SelectItem value="advanced">Advanced (3+ tahun)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="goals" className="text-sm font-medium">Fitness Goals *</label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => updateFormData({ goals: e.target.value })}
                      placeholder="e.g. Increase strength, lose weight, build muscle..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Program Selection */}
              {currentStep === 'program-selection' && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">Program Selection</h2>
                    <p className="text-muted-foreground">Choose programs for your client</p>
                  </div>

                  <div className="space-y-4">
                    {availablePrograms.map((program) => (
                      <div
                        key={program.slug}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.selectedPrograms.includes(program.slug)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleProgramToggle(program.slug)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 border-2 rounded ${
                              formData.selectedPrograms.includes(program.slug) 
                                ? 'bg-blue-500 border-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.selectedPrograms.includes(program.slug) && (
                                <CheckCircle className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{program.title}</h3>
                              <p className="text-sm text-muted-foreground">{program.description}</p>
                              <p className="text-sm text-blue-600">{program.duration}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">Rp {program.price.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">per program</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="startDate" className="text-sm font-medium">Program Start Date</label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => updateFormData({ startDate: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Subscription */}
              {currentStep === 'subscription' && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <CreditCard className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">Subscription Setup</h2>
                    <p className="text-muted-foreground">Configure payment and access</p>
                  </div>

                  <div className="grid gap-4">
                    <div
                      className={`p-4 border rounded-lg cursor-pointer ${
                        formData.subscriptionType === 'free' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => updateFormData({ subscriptionType: 'free' })}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Free Access</h3>
                          <p className="text-sm text-muted-foreground">One-time program purchase</p>
                        </div>
                        <Badge variant={formData.subscriptionType === 'free' ? 'default' : 'outline'}>
                          No recurring fee
                        </Badge>
                      </div>
                    </div>

                    <div
                      className={`p-4 border rounded-lg cursor-pointer ${
                        formData.subscriptionType === 'premium' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => updateFormData({ subscriptionType: 'premium' })}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Premium Subscription</h3>
                          <p className="text-sm text-muted-foreground">Monthly subscription with all programs</p>
                        </div>
                        <Badge variant={formData.subscriptionType === 'premium' ? 'default' : 'outline'}>
                          Rp 150,000/month
                        </Badge>
                      </div>
                    </div>

                    <div
                      className={`p-4 border rounded-lg cursor-pointer ${
                        formData.subscriptionType === 'custom' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => updateFormData({ subscriptionType: 'custom' })}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Custom Plan</h3>
                          <p className="text-sm text-muted-foreground">Set custom pricing and program access</p>
                        </div>
                        <Badge variant={formData.subscriptionType === 'custom' ? 'default' : 'outline'}>
                          Custom
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {formData.subscriptionType === 'custom' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <label htmlFor="customFee" className="text-sm font-medium">Monthly Fee (Rp)</label>
                        <Input
                          id="customFee"
                          type="number"
                          value={formData.monthlyFee}
                          onChange={(e) => updateFormData({ monthlyFee: parseInt(e.target.value) || 0 })}
                          placeholder="150000"
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-medium mb-2">Commission Structure</h3>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• You earn 70% commission on all sales</p>
                      <p>• PRPS platform fee: 30%</p>
                      <p>• Monthly payouts on the 5th</p>
                      <p>• No hidden fees or charges</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 'confirmation' && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">Review & Confirm</h2>
                    <p className="text-muted-foreground">Double-check all information before creating the client</p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Client Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="font-medium">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium">{formData.email}</span>
                        </div>
                        {formData.phone && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone:</span>
                            <span className="font-medium">{formData.phone}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Experience:</span>
                          <span className="font-medium">{formData.experience}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Subscription Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <Badge variant="outline">{formData.subscriptionType}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Programs:</span>
                          <span className="font-medium">{formData.selectedPrograms.length}</span>
                        </div>
                        {formData.subscriptionType !== 'free' && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Monthly Fee:</span>
                            <span className="font-medium">
                              Rp {(formData.subscriptionType === 'custom' ? formData.monthlyFee : 150000).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Selected Programs</h3>
                    {formData.selectedPrograms.map(slug => {
                      const program = availablePrograms.find(p => p.slug === slug);
                      return program ? (
                        <div key={slug} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{program.title}</p>
                            <p className="text-sm text-muted-foreground">{program.duration}</p>
                          </div>
                          <p className="font-bold">Rp {program.price.toLocaleString()}</p>
                        </div>
                      ) : null;
                    })}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Goals</h3>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{formData.goals}</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    const stepOrder: OnboardingStep[] = ['client-info', 'program-selection', 'subscription', 'confirmation'];
                    const currentIndex = stepOrder.indexOf(currentStep);
                    if (currentIndex > 0) {
                      setCurrentStep(stepOrder[currentIndex - 1]);
                    }
                  }}
                  disabled={currentStep === 'client-info'}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep !== 'confirmation' ? (
                  <Button
                    onClick={() => {
                      const stepOrder: OnboardingStep[] = ['client-info', 'program-selection', 'subscription', 'confirmation'];
                      const currentIndex = stepOrder.indexOf(currentStep);
                      setCurrentStep(stepOrder[currentIndex + 1]);
                    }}
                    disabled={!canProceed()}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Create Client
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
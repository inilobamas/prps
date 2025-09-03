'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, Clock, Play } from 'lucide-react';
import { Program, DayLog } from '@/lib/types';
import { PROGRAMS } from '@/lib/programs';
import { getAllDayLogs } from '@/lib/storage';
import { getDayCompletionPercentage } from '@/lib/fitness';
import Link from 'next/link';

export function ProgramOverviewClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [program, setProgram] = useState<Program | null>(null);
  const [dayLogs, setDayLogs] = useState<DayLog[]>([]);

  useEffect(() => {
    const foundProgram = PROGRAMS.find(p => p.slug === slug);
    if (!foundProgram) {
      router.push('/app');
      return;
    }
    
    setProgram(foundProgram);
    
    const logs = getAllDayLogs().filter(log => log.programSlug === slug);
    setDayLogs(logs);
  }, [slug, router]);

  const getDayStatus = (dayNumber: number) => {
    const log = dayLogs.find(log => log.day === dayNumber);
    if (!log) return { status: 'not-started', percentage: 0 };
    if (log.completedAt) return { status: 'completed', percentage: 100 };
    return { status: 'in-progress', percentage: getDayCompletionPercentage(log) };
  };

  const getOverallProgress = (): number => {
    if (!program) return 0;
    
    const completedDays = dayLogs.filter(log => log.completedAt).length;
    return Math.round((completedDays / program.days.length) * 100);
  };

  if (!program) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const overallProgress = getOverallProgress();

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/app">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{program.title}</h1>
          <p className="text-muted-foreground">
            {program.durationWeeks} weeks • {program.frequencyPerWeek}x/week • {program.level}
          </p>
        </div>
      </div>

      {/* Program Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Program Progress</span>
            <Badge variant={overallProgress === 100 ? "default" : "secondary"}>
              {overallProgress}% Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={overallProgress} />
          <div className="text-sm text-muted-foreground">
            <p>Equipment: {program.equipment}</p>
            <p>Total Days: {program.days.length}</p>
          </div>
        </CardContent>
      </Card>

      {/* Days Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Workout Days</h2>
        <div className="grid gap-4">
          {program.days.map((day) => {
            const status = getDayStatus(day.day);
            
            return (
              <Card key={day.day} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg">Day {day.day}</span>
                          {status.status === 'completed' && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {status.status === 'in-progress' && (
                            <Clock className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{day.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {day.exercises.length} exercises
                          </p>
                        </div>
                      </div>
                      
                      {status.status !== 'not-started' && (
                        <div className="mt-2">
                          <Progress value={status.percentage} className="h-2" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/app/workout/${slug}/${day.day}`}>
                          <Play className="h-4 w-4 mr-1" />
                          {status.status === 'completed' ? 'Review' : 
                           status.status === 'in-progress' ? 'Continue' : 'Start'}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/app">
                Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              const data = getAllDayLogs().filter(log => log.programSlug === slug);
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${slug}-logs.json`;
              a.click();
            }}>
              Export Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
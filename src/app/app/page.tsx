'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, Zap } from 'lucide-react';
import { UserStats, Program, DayLog } from '@/lib/types';
import { PROGRAMS, initializePrograms } from '@/lib/programs';
import { getStorageItem, setStorageItem, STORAGE_KEYS, getAllDayLogs, getDefaultUserStats, migrate } from '@/lib/storage';
import { getXPProgress, formatXP } from '@/lib/gamification';
import { getDayCompletionPercentage } from '@/lib/fitness';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState<UserStats>(getDefaultUserStats());
  const [activeProgram, setActiveProgram] = useState<string | null>(null);
  const [program, setProgram] = useState<Program | null>(null);
  const [recentLogs, setRecentLogs] = useState<DayLog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    migrate();
    initializePrograms();
    
    const savedStats = getStorageItem<UserStats>(STORAGE_KEYS.STATS);
    if (savedStats) setStats(savedStats);

    const savedProgram = getStorageItem<string>(STORAGE_KEYS.ACTIVE_PROGRAM);
    if (savedProgram) {
      setActiveProgram(savedProgram);
      const foundProgram = PROGRAMS.find(p => p.slug === savedProgram);
      setProgram(foundProgram || null);
    }

    const logs = getAllDayLogs().slice(0, 3);
    setRecentLogs(logs);
    setIsLoaded(true);
  }, []);

  const selectProgram = (programSlug: string) => {
    setActiveProgram(programSlug);
    setStorageItem(STORAGE_KEYS.ACTIVE_PROGRAM, programSlug);
    const foundProgram = PROGRAMS.find(p => p.slug === programSlug);
    setProgram(foundProgram || null);
  };

  const getNextWorkoutDay = (): number | null => {
    if (!program) return null;
    
    const completedDays = getAllDayLogs()
      .filter(log => log.programSlug === program.slug && log.completedAt)
      .map(log => log.day);
    
    for (let i = 1; i <= program.days.length; i++) {
      if (!completedDays.includes(i)) {
        return i;
      }
    }
    return null;
  };

  const getProgramProgress = (): number => {
    if (!program) return 0;
    
    const completedDays = getAllDayLogs()
      .filter(log => log.programSlug === program.slug && log.completedAt)
      .length;
    
    return Math.round((completedDays / program.days.length) * 100);
  };

  const xpProgress = getXPProgress(stats.xp);
  const nextDay = getNextWorkoutDay();
  const programProgress = getProgramProgress();

  if (!isLoaded) {
    return (
      <div className="container mx-auto p-4">
        <div className="space-y-6">
          <div className="h-24 bg-muted animate-pulse rounded-lg" />
          <div className="h-48 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">{formatXP(stats.xp)} XP</span>
            </div>
            <p className="text-xs text-muted-foreground">Level {xpProgress.level}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-semibold">{stats.streakDays}</span>
            </div>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              <span className="font-semibold">{stats.totalWorkouts}</span>
            </div>
            <p className="text-xs text-muted-foreground">Workouts</p>
          </CardContent>
        </Card>
      </div>

      {/* XP Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level {xpProgress.level}</span>
              <span>{xpProgress.xpForNext} XP to next level</span>
            </div>
            <Progress value={(xpProgress.xpInLevel / (xpProgress.level * 100)) * 100} />
          </div>
        </CardContent>
      </Card>

      {/* Active Program */}
      {!activeProgram ? (
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Program</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {PROGRAMS.map((prog) => (
              <div key={prog.slug} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{prog.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {prog.durationWeeks} weeks • {prog.frequencyPerWeek}x/week • {prog.level}
                  </p>
                  <p className="text-xs text-muted-foreground">{prog.equipment}</p>
                </div>
                <Button onClick={() => selectProgram(prog.slug)} size="sm">
                  Pilih
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{program?.title}</span>
              <Badge variant="outline">{programProgress}% complete</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={programProgress} />
            
            {nextDay ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">Next Workout:</p>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Day {nextDay}: {program?.days.find(d => d.day === nextDay)?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {program?.days.find(d => d.day === nextDay)?.exercises.length} exercises
                    </p>
                  </div>
                  <Button asChild>
                    <Link href={`/app/workout/${activeProgram}/${nextDay}`}>
                      Lanjutkan
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center p-6">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                <p className="font-semibold">Program Completed! 🎉</p>
                <Button 
                  onClick={() => setActiveProgram(null)} 
                  variant="outline" 
                  className="mt-2"
                >
                  Choose New Program
                </Button>
              </div>
            )}
            
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/app/workout/${activeProgram}`}>
                  Lihat Semua Hari
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => setActiveProgram(null)}>
                Ganti Program
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      {recentLogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Day {log.day}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(log.date).toLocaleDateString()} • 
                    {log.totalVolumeKg ? ` ${log.totalVolumeKg}kg` : ''} • 
                    {log.xpEarned ? `+${log.xpEarned} XP` : ''}
                  </p>
                </div>
                <Badge variant={log.completedAt ? "default" : "secondary"}>
                  {log.completedAt ? 'Completed' : `${getDayCompletionPercentage(log)}%`}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Badges Preview */}
      {stats.badges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Earned Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stats.badges.slice(0, 6).map((badgeId) => (
                <Badge key={badgeId} variant="secondary">
                  {badgeId.replace(/-/g, ' ')}
                </Badge>
              ))}
              {stats.badges.length > 6 && (
                <Badge variant="outline">+{stats.badges.length - 6} more</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
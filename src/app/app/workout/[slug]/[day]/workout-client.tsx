'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle2, Circle, Play, Pause, RotateCcw, Trophy, Share } from 'lucide-react';
import { Program, SetLog, UserStats } from '@/lib/types';
import { PROGRAMS } from '@/lib/programs';
import { useWorkout } from '@/hooks/useWorkout';
import { useTimer } from '@/hooks/useWorkout';
import { parseRestToSeconds, formatDuration, parseReps } from '@/lib/fitness';
import { checkNewBadges } from '@/lib/gamification';
import { getStorageItem, STORAGE_KEYS } from '@/lib/storage';
import { BadgeModal } from '@/components/BadgeModal';
import { useConfetti } from '@/hooks/useConfetti';
import { toast } from 'sonner';
import Link from 'next/link';

function RestTimer({ restString, onComplete }: { restString: string; onComplete?: () => void }) {
  const restSeconds = parseRestToSeconds(restString);
  const { seconds, isRunning, start, stop, reset, formatTime, isFinished } = useTimer(restSeconds);

  useEffect(() => {
    if (isFinished && onComplete) {
      onComplete();
    }
  }, [isFinished, onComplete]);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isRunning ? "secondary" : "outline"}
        size="sm"
        onClick={isRunning ? stop : start}
      >
        {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      
      <span className={`font-mono text-sm ${isFinished ? 'text-green-500' : ''}`}>
        {formatTime()}
      </span>
      
      {(isRunning || seconds !== restSeconds) && (
        <Button variant="ghost" size="sm" onClick={() => reset()}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
      
      <span className="text-xs text-muted-foreground">/ {formatDuration(restSeconds)}</span>
    </div>
  );
}

export function WorkoutPageClient({ slug, day }: { slug: string; day: string }) {
  const router = useRouter();
  const dayNumber = parseInt(day);
  const [program, setProgram] = useState<Program | null>(null);
  const [showFinishDialog, setShowFinishDialog] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [earnedBadge, setEarnedBadge] = useState<string | null>(null);
  const { trigger: triggerConfetti } = useConfetti();

  const {
    dayLog,
    isLoading,
    isCompleted,
    canFinish,
    updateSetLog,
    updateExerciseNotes,
    startWorkout,
    finishWorkout,
  } = useWorkout(slug, dayNumber);

  useEffect(() => {
    const foundProgram = PROGRAMS.find(p => p.slug === slug);
    if (!foundProgram) {
      router.push('/app');
      return;
    }

    const workoutDay = foundProgram.days.find(d => d.day === dayNumber);
    if (!workoutDay) {
      router.push(`/app/workout/${slug}`);
      return;
    }

    setProgram(foundProgram);
  }, [slug, dayNumber, router]);

  useEffect(() => {
    if (dayLog?.startedAt && !startTime) {
      setStartTime(dayLog.startedAt);
    }
  }, [dayLog, startTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (startTime && !isCompleted) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime, isCompleted]);

  const handleStartWorkout = () => {
    startWorkout();
    setStartTime(Date.now());
  };

  const handleFinishWorkout = () => {
    const oldStats = getStorageItem<UserStats>(STORAGE_KEYS.STATS);
    const updatedStats = finishWorkout();
    
    if (updatedStats && oldStats) {
      const newBadges = checkNewBadges(oldStats, updatedStats);
      
      if (newBadges.length > 0) {
        triggerConfetti();
        setEarnedBadge(newBadges[0]);
      }
      
      toast.success(`Workout completed! +${dayLog?.xpEarned || 0} XP`);
      setShowFinishDialog(false);
      router.push('/app');
    }
  };

  const handleSetToggle = (exerciseIndex: number, setIndex: number, completed: boolean) => {
    updateSetLog(exerciseIndex, setIndex, { completed });
    
    if (completed && !dayLog?.startedAt) {
      handleStartWorkout();
    }
  };

  const handleSetUpdate = (exerciseIndex: number, setIndex: number, updates: Partial<SetLog>) => {
    updateSetLog(exerciseIndex, setIndex, updates);
  };

  const shareWorkout = () => {
    const message = `Selesai Day ${dayNumber} (${program?.days.find(d => d.day === dayNumber)?.name}) di PRPS 💪 XP +${dayLog?.xpEarned || 0} — Your plan. Your pace. #KeepShowing`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (isLoading || !program || !dayLog) {
    return (
      <div className="container mx-auto p-4">
        <div className="space-y-6">
          <div className="h-16 bg-muted animate-pulse rounded-lg" />
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  const currentDay = program.days.find(d => d.day === dayNumber);
  if (!currentDay) return null;

  return (
    <div className="container mx-auto p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/app/workout/${slug}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Day {dayNumber} — {currentDay.name}</h1>
          <p className="text-sm text-muted-foreground">
            {currentDay.exercises.length} exercises
            {startTime && !isCompleted && ` • ${formatDuration(elapsedTime)}`}
          </p>
        </div>
        {isCompleted && (
          <Badge variant="default">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Completed
          </Badge>
        )}
      </div>

      {/* Exercises */}
      <Accordion type="multiple" defaultValue={currentDay.exercises.map((_, i) => `exercise-${i}`)}>
        {currentDay.exercises.map((exercise, exerciseIndex) => {
          const exerciseLog = dayLog.exerciseLogs[exerciseIndex];
          const completedSets = exerciseLog?.setLogs.filter(set => set.completed).length || 0;
          const totalSets = exerciseLog?.setLogs.length || 0;
          const repsInfo = parseReps(exercise.reps);

          return (
            <AccordionItem key={exerciseIndex} value={`exercise-${exerciseIndex}`}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-1">
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets} sets • {exercise.reps} reps • {exercise.rest} rest
                    </p>
                  </div>
                  <Badge variant={completedSets === totalSets ? "default" : "secondary"}>
                    {completedSets}/{totalSets}
                  </Badge>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="space-y-4">
                {exercise.notes && (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm">{exercise.notes}</p>
                  </div>
                )}

                {/* Sets */}
                <div className="space-y-3">
                  {exerciseLog?.setLogs.map((setLog, setIndex) => (
                    <div key={setIndex} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetToggle(exerciseIndex, setIndex, !setLog.completed)}
                        className="p-1"
                      >
                        {setLog.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5" />
                        )}
                      </Button>
                      
                      <span className="font-medium w-12">Set {setIndex + 1}</span>
                      
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <Input
                          placeholder="Weight (kg)"
                          type="number"
                          value={setLog.weightKg || ''}
                          onChange={(e) => handleSetUpdate(exerciseIndex, setIndex, {
                            weightKg: e.target.value ? parseFloat(e.target.value) : undefined
                          })}
                        />
                        
                        <Input
                          placeholder={`Reps (${repsInfo.display})`}
                          type="number"
                          value={setLog.actualReps || ''}
                          onChange={(e) => handleSetUpdate(exerciseIndex, setIndex, {
                            actualReps: e.target.value ? parseInt(e.target.value) : undefined
                          })}
                        />
                        
                        <Select
                          value={setLog.rpe?.toString() || ''}
                          onValueChange={(value) => handleSetUpdate(exerciseIndex, setIndex, {
                            rpe: value ? parseInt(value) : undefined
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="RPE" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({length: 10}, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                RPE {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rest Timer */}
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Rest Timer</span>
                  <RestTimer 
                    restString={exercise.rest}
                    onComplete={() => toast.info('Rest complete!')}
                  />
                </div>

                {/* Exercise Notes */}
                <Textarea
                  placeholder="Add notes for this exercise..."
                  value={exerciseLog?.notes || ''}
                  onChange={(e) => updateExerciseNotes(exerciseIndex, e.target.value)}
                  rows={2}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Finish Workout Dialog */}
      <Dialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finish Workout?</DialogTitle>
            <DialogDescription>
              Complete Day {dayNumber} and earn XP for your progress. You can always come back to review.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFinishDialog(false)}>
              Continue
            </Button>
            <Button onClick={handleFinishWorkout}>
              <Trophy className="h-4 w-4 mr-2" />
              Finish Workout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Badge Modal */}
      <BadgeModal 
        badgeId={earnedBadge}
        onClose={() => setEarnedBadge(null)}
      />

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-sm">
            {startTime && !isCompleted ? (
              <span>Time: {formatDuration(elapsedTime)}</span>
            ) : (
              <span>{currentDay.exercises.length} exercises</span>
            )}
          </div>
          
          <div className="flex gap-2">
            {isCompleted ? (
              <>
                <Button variant="outline" size="sm" onClick={shareWorkout}>
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button asChild>
                  <Link href="/app">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                {!dayLog.startedAt && (
                  <Button onClick={handleStartWorkout} variant="outline">
                    Start Workout
                  </Button>
                )}
                <Button 
                  onClick={() => setShowFinishDialog(true)}
                  disabled={!canFinish}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Finish Workout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
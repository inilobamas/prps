import { WorkoutPageClient } from './workout-client';

interface WorkoutPageProps {
  params: Promise<{ slug: string; params: string[] }>;
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { slug, params: routeParams } = await params;
  
  // Handle both patterns: [day] and [week, day]
  const isWeekBased = routeParams.length === 2;
  const week = isWeekBased ? routeParams[0] : undefined;
  const day = isWeekBased ? routeParams[1] : routeParams[0];
  
  return <WorkoutPageClient slug={slug} week={week} day={day} />;
}
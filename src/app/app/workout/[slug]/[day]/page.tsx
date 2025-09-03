import { WorkoutPageClient } from './workout-client';

interface WorkoutPageProps {
  params: Promise<{ slug: string; day: string }>;
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { slug, day } = await params;
  return <WorkoutPageClient slug={slug} day={day} />;
}
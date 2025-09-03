import { ProgramOverviewClient } from './program-client';

interface ProgramOverviewProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgramOverviewPage({ params }: ProgramOverviewProps) {
  const { slug } = await params;
  return <ProgramOverviewClient slug={slug} />;
}
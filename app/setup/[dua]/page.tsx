import { notFound } from "next/navigation";
import { SetupClient } from "@/components/SetupClient";
import { getDuaMeta, getDuaSegments } from "@/lib/duas";

type SetupPageProps = {
  params: Promise<{ dua: string }>;
};

export default async function SetupPage({ params }: SetupPageProps) {
  const { dua: slug } = await params;
  const dua = getDuaMeta(slug);
  const segments = getDuaSegments(slug);

  if (!dua || !segments?.length) {
    notFound();
  }

  return <SetupClient dua={dua} previewSegment={segments[0]} totalSlides={segments.length} />;
}

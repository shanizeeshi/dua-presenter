import { notFound } from "next/navigation";
import { PresenterClient } from "@/components/PresenterClient";
import { getDuaMeta, getDuaSegments } from "@/lib/duas";
import type { LanguageKey } from "@/lib/types";

type PresentPageProps = {
  params: Promise<{ dua: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function PresentPage({ params, searchParams }: PresentPageProps) {
  const { dua: slug } = await params;
  const query = await searchParams;
  const dua = getDuaMeta(slug);
  const segments = getDuaSegments(slug);

  if (!dua || !segments?.length) {
    notFound();
  }

  const rawLanguages = Array.isArray(query.lang) ? query.lang : query.lang ? [query.lang] : [];
  const initialLanguages = rawLanguages as LanguageKey[];

  return <PresenterClient dua={dua} segments={segments} initialLanguages={initialLanguages} />;
}

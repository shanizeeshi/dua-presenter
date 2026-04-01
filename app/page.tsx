import Link from "next/link";
import { getAllDuas, getDuaSegments } from "@/lib/duas";

export default function HomePage() {
  const duas = getAllDuas();

  return (
    <main className="page-shell min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="glass-card rounded-[2rem] px-6 py-10 sm:px-8">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-900/70">Dua Presenter</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-none text-slate-950 sm:text-6xl">
                Present communal duas without turning a projector into a browser tab.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                Built for mosque recitations, with full-screen slides, readable Arabic, and optional translation layers that can be tuned before each session.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-amber-900/10 bg-white/55 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-900/70">Current Library</p>
              <p className="mt-3 text-4xl font-semibold text-slate-950">{duas.length}</p>
              <p className="mt-2 text-slate-700">Structured for more supplications, starting with the complete Dua Kumail dataset.</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {duas.map((dua) => {
            const segmentCount = getDuaSegments(dua.slug)?.length ?? 0;

            return (
              <Link
                key={dua.slug}
                href={`/setup/${dua.slug}`}
                className="glass-card group rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-amber-900/65">Available Dua</p>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-slate-950">
                  {dua.title}
                </h2>
                <p className="mt-3 text-slate-700">{dua.brief}</p>
                <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
                  <span>{dua.duration}</span>
                  <span>{segmentCount} slides</span>
                </div>
                <div className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--cream-100)] transition group-hover:bg-slate-800">
                  Configure
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}

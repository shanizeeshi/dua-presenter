type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const width = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
      <div
        className="h-full bg-[var(--gold-400)] transition-[width] duration-300 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const dotCount = 20;
  const filledDots = total > 0 ? Math.round(((current + 1) / total) * dotCount) : 0;

  return (
    <div className="fixed bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-2">
      {Array.from({ length: dotCount }, (_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-all duration-300 ${
            i < filledDots
              ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.5)]"
              : "bg-white/15"
          }`}
        />
      ))}
    </div>
  );
}

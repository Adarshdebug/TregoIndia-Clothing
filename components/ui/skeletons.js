export function ProductSkeleton() {
  return (
    <div className="touch-card animate-pulse overflow-hidden p-3">
      <div className="aspect-[4/5] rounded-[24px] bg-white/8" />
      <div className="mt-4 h-4 rounded-full bg-white/8" />
      <div className="mt-3 h-3 w-2/3 rounded-full bg-white/8" />
      <div className="mt-4 h-10 rounded-full bg-white/8" />
    </div>
  );
}

export function HeroSkeleton() {
  return <div className="touch-card h-[440px] animate-pulse bg-white/[0.03]" />;
}

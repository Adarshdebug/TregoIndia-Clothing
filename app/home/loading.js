import { HeroSkeleton, ProductSkeleton } from "@/components/ui/skeletons";

export default function LoadingHome() {
  return (
    <main className="container-shell space-y-10 py-8">
      <HeroSkeleton />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}

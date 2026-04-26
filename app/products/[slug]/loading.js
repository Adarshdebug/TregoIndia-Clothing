import { HeroSkeleton } from "@/components/ui/skeletons";

export default function LoadingProduct() {
  return (
    <main className="container-shell py-8">
      <HeroSkeleton />
    </main>
  );
}

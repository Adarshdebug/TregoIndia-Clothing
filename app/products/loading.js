import { ProductSkeleton } from "@/components/ui/skeletons";

export default function LoadingProducts() {
  return (
    <main className="container-shell py-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}

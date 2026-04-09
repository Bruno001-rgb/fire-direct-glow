import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogoSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="rounded-lg overflow-hidden bg-[hsl(225,25%,7%)]">
          <Skeleton className="h-1.5 w-full" />
          <div className="p-3">
            <Skeleton className="h-32 w-full mb-3" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

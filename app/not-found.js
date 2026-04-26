import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-[70vh] items-center justify-center py-10">
      <div className="touch-card max-w-md p-8 text-center">
        <h1 className="text-3xl font-semibold tracking-[-0.04em]">Page not found</h1>
        <p className="mt-4 text-sm text-white/60">
          The piece you are looking for has moved or no longer exists.
        </p>
        <Link href="/home" className="mt-6 inline-block rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
          Return home
        </Link>
      </div>
    </main>
  );
}

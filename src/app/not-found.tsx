import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card mx-auto max-w-lg px-6 py-12 text-center sm:px-8 sm:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-muted">Away from the path</p>
      <h1 className="font-display mt-3 text-3xl sm:text-4xl">This page is not here</h1>
      <p className="mt-3 text-sm text-ink-soft">Return to the breath. The rest can wait.</p>
      <Link href="/" className="btn btn-forest mt-8 w-full sm:w-auto">
        Today
      </Link>
    </div>
  );
}

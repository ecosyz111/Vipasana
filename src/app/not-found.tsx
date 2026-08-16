import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card mx-auto max-w-lg px-8 py-16 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-muted">Away from the path</p>
      <h1 className="font-display mt-3 text-4xl">This page is not here</h1>
      <p className="mt-3 text-sm text-ink-soft">Return to the breath. The rest can wait.</p>
      <Link href="/" className="btn btn-forest mt-8">
        Today
      </Link>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, copy, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-xs uppercase tracking-[0.35em] text-white/40">{eyebrow}</p>}
        <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h2>
        {copy && <p className="mt-3 max-w-xl text-sm text-white/60 sm:text-base">{copy}</p>}
      </div>
      {action}
    </div>
  );
}

import { CATEGORIES, type CategoryId } from "@/data/facilities";

export default function CategorySection({
  onSelect,
}: {
  onSelect: (id: CategoryId) => void;
}) {
  return (
    <section id="categories" className="bg-paper py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5">
          <h2 className="font-display text-xl font-bold">
            サービスから探す
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            自費リハビリから、日々の身体づくりまで。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              title={c.description}
              className="flex min-h-12 items-center gap-2 rounded-lg border border-line bg-white px-3 py-3 text-left text-sm font-bold hover:border-sora hover:bg-sora-soft"
            >
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

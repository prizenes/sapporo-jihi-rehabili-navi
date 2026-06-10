import { CATEGORIES } from "@/data/facilities";

export default function CategorySection() {
  return (
    <section id="categories" className="bg-paper py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-block rounded-full bg-wakaba-soft px-4 py-1 text-xs font-bold tracking-widest text-wakaba-deep">
            CATEGORY
          </p>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            このサイトで探せる施設
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
            いずれも、医療保険・介護保険外の自費サービスとして、身体機能の維持・改善や運動継続を支援する施設です。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-line bg-white p-5 shadow-card"
            >
              <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-sora-soft text-2xl">
                <span aria-hidden="true">{c.icon}</span>
              </div>
              <h3 className="font-display text-base font-bold leading-snug">
                {c.label}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {c.description}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-wakaba-deep">
                例：{c.examples}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

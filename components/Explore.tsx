"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  EXTRA_AREA,
  PURPOSES,
  WARDS,
  categoryLabel,
  sortedPublicFacilities,
  type CategoryId,
  type Facility,
  type PurposeId,
} from "@/data/facilities";

/* 札幌市10区のざっくりした位置（4列×3行の地図風グリッド） */
const WARD_POSITIONS: Record<string, string> = {
  手稲区: "col-start-1 row-start-1",
  北区: "col-start-2 row-start-1",
  東区: "col-start-3 row-start-1",
  西区: "col-start-1 row-start-2",
  中央区: "col-start-2 row-start-2",
  白石区: "col-start-3 row-start-2",
  厚別区: "col-start-4 row-start-2",
  南区: "col-start-1 col-span-2 row-start-3",
  豊平区: "col-start-3 row-start-3",
  清田区: "col-start-4 row-start-3",
};

const matchWard = (f: Facility, w: string) =>
  f.ward === w || f.ward.includes(w);

export default function Explore() {
  const [area, setArea] = useState("");
  const [purpose, setPurpose] = useState<PurposeId | "">("");
  const [category, setCategory] = useState<CategoryId | "">("");
  const [qual, setQual] = useState("");

  const facilities = useMemo(() => sortedPublicFacilities(), []);

  const qualOptions = useMemo(() => {
    const set = new Set<string>();
    facilities.forEach((f) => f.qualifications.forEach((q) => set.add(q)));
    return Array.from(set);
  }, [facilities]);

  const filtered = facilities.filter(
    (f) =>
      (!area || matchWard(f, area)) &&
      (!purpose || f.purposes.includes(purpose)) &&
      (!category || f.categories.includes(category)) &&
      (!qual || f.qualifications.includes(qual))
  );

  const reset = () => {
    setArea("");
    setPurpose("");
    setCategory("");
    setQual("");
  };

  const jumpToList = () => {
    document
      .getElementById("facilities")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const wardCount = (w: string) =>
    facilities.filter((f) => matchWard(f, w)).length;

  return (
    <>
      {/* ================= 目的別に探す ================= */}
      <section id="purpose" className="bg-sora-soft py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              目的別に探す
            </h2>
            <p className="mt-3 text-ink-soft">
              気になる目的をタップすると、対応する施設が一覧に表示されます。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {PURPOSES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setPurpose(p.id);
                  jumpToList();
                }}
                className="rounded-2xl border border-line bg-white p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:border-sora hover:shadow-soft sm:p-5"
              >
                <span aria-hidden="true" className="text-2xl">
                  {p.icon}
                </span>
                <span className="mt-2 block font-display text-[15px] font-bold leading-snug">
                  {p.label}
                </span>
                <span className="mt-1 hidden text-xs leading-relaxed text-ink-soft sm:block">
                  {p.description}
                </span>
                <span className="mt-2 block text-xs font-bold text-sora">
                  施設を見る →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= エリア別に探す ================= */}
      <section id="area" className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              エリア別に探す
            </h2>
            <p className="mt-3 text-ink-soft">
              札幌市内からお住まいの区を選んでください。
            </p>
          </div>

          {/* 地図風グリッド */}
          <div className="rounded-3xl border-2 border-dashed border-line bg-paper p-4 sm:p-7">
            <p className="mb-4 text-center text-xs font-bold tracking-widest text-ink-soft">
              ⌖ 札幌市マップ（おおまかな位置）
            </p>
            <div className="grid grid-cols-4 grid-rows-3 gap-2 sm:gap-3">
              {WARDS.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => {
                    setArea(w);
                    jumpToList();
                  }}
                  className={`${WARD_POSITIONS[w]} rounded-xl border border-line bg-white px-1 py-3 text-center shadow-card transition hover:-translate-y-0.5 hover:border-wakaba hover:bg-wakaba-soft sm:px-2 sm:py-4`}
                >
                  <span className="block font-display text-[13px] font-bold sm:text-base">
                    {w}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-ink-soft sm:text-xs">
                    {wardCount(w)}件
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => {
                  setArea(EXTRA_AREA);
                  jumpToList();
                }}
                className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold shadow-card transition hover:border-wakaba hover:bg-wakaba-soft"
              >
                🚗 {EXTRA_AREA}（訪問・出張対応など）
                <span className="ml-1 text-xs font-medium text-ink-soft">
                  {wardCount(EXTRA_AREA)}件
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 施設一覧 ================= */}
      <section id="facilities" className="bg-wakaba-soft py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-9 text-center">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              札幌市内の掲載施設
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
              掲載情報は、各施設の公式サイトなど公開情報、または施設から提供された情報をもとに作成しています。最新のサービス内容・料金・対応可否は、各施設の公式サイトまたは窓口でご確認ください。
            </p>
          </div>

          {/* フィルター */}
          <div
            role="search"
            aria-label="施設の絞り込み"
            className="mb-7 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end">
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-ink-soft">
                  エリア
                </span>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full cursor-pointer rounded-xl border border-line bg-paper px-3.5 py-3 text-base"
                >
                  <option value="">すべてのエリア</option>
                  {WARDS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                  <option value={EXTRA_AREA}>{EXTRA_AREA}</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-ink-soft">
                  目的
                </span>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as PurposeId | "")}
                  className="w-full cursor-pointer rounded-xl border border-line bg-paper px-3.5 py-3 text-base"
                >
                  <option value="">すべての目的</option>
                  {PURPOSES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-ink-soft">
                  カテゴリ
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryId | "")}
                  className="w-full cursor-pointer rounded-xl border border-line bg-paper px-3.5 py-3 text-base"
                >
                  <option value="">すべてのカテゴリ</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-ink-soft">
                  在籍資格
                </span>
                <select
                  value={qual}
                  onChange={(e) => setQual(e.target.value)}
                  className="w-full cursor-pointer rounded-xl border border-line bg-paper px-3.5 py-3 text-base"
                >
                  <option value="">すべての資格</option>
                  {qualOptions.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl border border-line px-4 py-3 text-sm font-medium text-ink-soft transition hover:border-ink-soft hover:text-ink"
              >
                条件をリセット
              </button>
            </div>
          </div>

          <p aria-live="polite" className="mb-5 text-sm text-ink-soft">
            <strong className="text-lg text-sora-deep">{filtered.length}</strong>{" "}
            件の施設が見つかりました
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {filtered.map((f) => (
                <FacilityCard key={f.id} facility={f} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center text-ink-soft">
              条件に合う施設が見つかりませんでした。
              <br />
              条件を変えるか、「条件をリセット」をお試しください。
            </div>
          )}

          <p className="mt-6 text-center text-sm text-ink-soft">
            掲載施設は順次追加予定です。
          </p>

          {/* 掲載情報の修正・削除依頼 */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-line bg-white/80 p-6 text-center">
            <p className="font-display text-sm font-bold">
              掲載情報の修正・削除をご希望の施設様へ
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              掲載内容の修正、削除、無料掲載のご希望がある場合は、お問い合わせフォームよりご連絡ください。
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block rounded-full border border-line bg-paper px-6 py-2.5 text-sm font-bold text-ink-soft transition hover:border-sora hover:text-sora-deep"
            >
              掲載情報の修正・削除を依頼する
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- 施設カード（全施設共通・同一トーン） ---------------- */

function FacilityCard({ facility: f }: { facility: Facility }) {
  const tags = [
    ...f.qualifications.map((q) => ({ text: q, kind: "qual" as const })),
    ...f.serviceTypes.map((t) => ({ text: t, kind: "type" as const })),
  ].slice(0, 5);

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition hover:shadow-soft">
      {/* 上部 */}
      <div className="bg-gradient-to-r from-sora-soft to-wakaba-soft px-6 pb-4 pt-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white px-3 py-0.5 text-xs font-bold text-sora-deep">
            {f.ward}
          </span>
          <span className="text-xs font-medium text-ink-soft">
            {f.categories.map(categoryLabel).join("・")}
          </span>
          <span className="ml-auto rounded-full bg-white/70 px-3 py-0.5 text-[11px] font-medium text-ink-soft">
            {f.displayStatus}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold leading-snug">
          {f.name}
        </h3>
      </div>

      {/* 中央 */}
      <div className="flex flex-1 flex-col gap-3.5 px-6 py-5">
        <p className="text-[15px] leading-relaxed">{f.tagline}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t.text}
                className={
                  t.kind === "qual"
                    ? "rounded-full border border-wakaba/40 bg-wakaba-soft px-3 py-1 text-xs font-bold text-wakaba-deep"
                    : "rounded-full bg-sora-soft px-3 py-1 text-xs font-medium text-sora-deep"
                }
              >
                {t.kind === "qual" ? "🪪 " : ""}
                {t.text}
              </span>
            ))}
          </div>
        )}
        <p className="text-sm text-ink-soft">
          対象：{f.targets.slice(0, 4).join("、")} など
        </p>
        <p className="text-sm text-ink-soft">📍 {f.address}</p>
      </div>

      {/* 下部 */}
      <div className="border-t border-line px-6 py-4">
        <p className="mb-3 text-sm">
          💰 料金目安：
          <span className="font-bold text-sora-deep">{f.priceNote}</span>
        </p>
        <div className="flex gap-2.5">
          {f.site && (
            <a
              href={f.site}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl border-2 border-sora py-2.5 text-center font-display text-sm font-bold text-sora transition hover:bg-sora-soft"
            >
              詳細は公式サイトへ
            </a>
          )}
          {f.contact && (
            <a
              href={f.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl bg-wakaba py-2.5 text-center font-display text-sm font-bold text-white transition hover:bg-wakaba-deep"
            >
              問い合わせ
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

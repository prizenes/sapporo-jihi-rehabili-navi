"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  EXTRA_AREA,
  PURPOSES,
  WARDS,
  candidateFacilities,
  categoryLabel,
  checkingCount,
  officialFacilities,
  publicFacilities,
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

  const allPublic = useMemo(() => publicFacilities(), []);
  const officials = useMemo(() => officialFacilities(), []);
  const candidates = useMemo(() => candidateFacilities(), []);

  const qualOptions = useMemo(() => {
    const set = new Set<string>();
    allPublic.forEach((f) =>
      f.qualifications.forEach((q) => {
        if (!q.includes("確認中")) set.add(q);
      })
    );
    return Array.from(set);
  }, [allPublic]);

  const filterFn = (f: Facility) =>
    (!area || matchWard(f, area)) &&
    (!purpose || f.purposes.includes(purpose)) &&
    (!category || f.categories.includes(category)) &&
    (!qual || f.qualifications.includes(qual));

  const filteredOfficials = officials.filter(filterFn);
  const filteredCandidates = candidates.filter(filterFn);
  const total = filteredOfficials.length + filteredCandidates.length;

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
    allPublic.filter((f) => matchWard(f, w)).length;

  return (
    <>
      {/* ================= 目的別に探す ================= */}
      <section id="purpose" className="bg-sora-soft py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="mb-3 inline-block rounded-full bg-white px-4 py-1 text-xs font-bold tracking-widest text-sora-deep">
              PURPOSE
            </p>
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
            <p className="mb-3 inline-block rounded-full bg-wakaba-soft px-4 py-1 text-xs font-bold tracking-widest text-wakaba-deep">
              AREA
            </p>
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
            <p className="mb-3 inline-block rounded-full bg-white px-4 py-1 text-xs font-bold tracking-widest text-wakaba-deep">
              SEARCH
            </p>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              施設一覧
            </h2>
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
                  onChange={(e: { target: { value: string } }) => setArea(e.target.value)}
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
                  onChange={(e: { target: { value: string } }) =>
                    setPurpose(e.target.value as PurposeId | "")
                  }
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
                  onChange={(e: { target: { value: string } }) =>
                    setCategory(e.target.value as CategoryId | "")
                  }
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
                  onChange={(e: { target: { value: string } }) => setQual(e.target.value)}
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
            <strong className="text-lg text-sora-deep">{total}</strong>{" "}
            件が見つかりました（正式掲載 {filteredOfficials.length} 件・掲載候補{" "}
            {filteredCandidates.length} 件）
          </p>

          {/* 正式掲載カード */}
          {filteredOfficials.length > 0 && (
            <div className="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {filteredOfficials.map((f) => (
                <OfficialCard key={f.id} facility={f} />
              ))}
            </div>
          )}

          {total === 0 && (
            <div className="rounded-2xl bg-white p-10 text-center text-ink-soft">
              条件に合う施設が見つかりませんでした。
              <br />
              条件を変えるか、「条件をリセット」をお試しください。
            </div>
          )}

          {/* 掲載候補（コンパクト表示） */}
          {filteredCandidates.length > 0 && (
            <div className="rounded-2xl border border-dashed border-line bg-white/70 p-5 sm:p-7">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-ink-soft">
                <span aria-hidden="true">🕓</span>
                掲載候補の施設（情報確認中）
              </h3>
              <p className="mb-4 mt-1 text-xs leading-relaxed text-ink-soft">
                以下は掲載候補の施設です。資格者の在籍状況・料金・サービス内容などを確認中のため、正式掲載ではありません。最新情報は各施設へ直接ご確認ください。
              </p>
              <ul className="divide-y divide-line">
                {filteredCandidates.map((f) => (
                  <li
                    key={f.id}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1.5 py-3"
                  >
                    <span className="rounded-full bg-kinari-soft px-2.5 py-0.5 text-[11px] font-bold text-kinari-deep">
                      確認中
                    </span>
                    <span className="font-medium text-ink-soft">{f.name}</span>
                    <span className="text-xs text-ink-soft">{f.ward}</span>
                    <span className="text-xs text-ink-soft">
                      {categoryLabel(f.categories[0])}
                    </span>
                    {f.site && (
                      <a
                        href={f.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-xs font-medium text-sora underline-offset-2 hover:underline"
                      >
                        公式情報 ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 情報確認中の件数のみ案内 */}
          {checkingCount() > 0 && (
            <p className="mt-5 text-center text-sm text-ink-soft">
              ほかに、現在掲載準備中（情報確認中）の施設が {checkingCount()}{" "}
              件あります。確認が取れ次第、順次ご紹介します。
            </p>
          )}
        </div>
      </section>
    </>
  );
}

/* ---------------- 正式掲載カード ---------------- */

function OfficialCard({ facility: f }: { facility: Facility }) {
  const tags = [
    ...f.qualifications.map((q) => ({ text: q, kind: "qual" as const })),
    ...f.serviceTypes.map((t) => ({ text: t, kind: "type" as const })),
  ].slice(0, 5);

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition hover:shadow-soft">
      {/* 上部 */}
      <div className="bg-gradient-to-r from-sora-soft to-wakaba-soft px-6 pb-4 pt-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-wakaba px-3 py-0.5 text-xs font-bold text-white">
            ✓ 正式掲載
          </span>
          <span className="rounded-full bg-white px-3 py-0.5 text-xs font-bold text-sora-deep">
            {f.ward}
          </span>
          <span className="text-xs font-medium text-ink-soft">
            {f.categories.map(categoryLabel).join("・")}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold leading-snug">
          {f.name}
        </h3>
      </div>

      {/* 中央 */}
      <div className="flex flex-1 flex-col gap-3.5 px-6 py-5">
        <p className="text-[15px] leading-relaxed">{f.tagline}</p>
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
              公式サイト
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

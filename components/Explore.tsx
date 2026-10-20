"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Accessibility,
  Dumbbell,
  Footprints,
  House,
  PersonStanding,
  Trophy,
  X,
} from "lucide-react";
import FacilityCard from "@/components/FacilityCard";
import CategorySection from "@/components/CategorySection";
import { facilityGuide, PURPOSE_ENTRIES } from "@/data/facility-guide";
import {
  CATEGORIES,
  EXTRA_AREA,
  PURPOSES,
  WARDS,
  categoryLabel,
  sortedPublicFacilities,
  type CategoryId,
  type PurposeId,
} from "@/data/facilities";

const purposeIcons = [
  Activity,
  Footprints,
  Accessibility,
  PersonStanding,
  Dumbbell,
  Trophy,
];
const selectClass =
  "mt-2 min-h-12 w-full min-w-0 rounded-lg border border-line bg-white px-3 py-3 text-base text-ink";

export default function Explore({ children }: { children?: React.ReactNode }) {
  const [area, setArea] = useState("");
  const [purpose, setPurpose] = useState<PurposeId | "">("");
  const [category, setCategory] = useState<CategoryId | "">("");
  const [qual, setQual] = useState("");
  const [service, setService] = useState("");
  const [ready, setReady] = useState(false);
  const facilities = useMemo(() => sortedPublicFacilities(), []);
  const qualifications = useMemo(
    () =>
      Array.from(
        new Set(
          facilities.flatMap((f) => facilityGuide(f).staffQualifications),
        ),
      ),
    [facilities],
  );
  const services = useMemo(
    () => Array.from(new Set(facilities.flatMap((f) => f.serviceTypes))),
    [facilities],
  );

  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(location.search);
      const p = params.get("purpose") || "";
      const c = params.get("category") || "";
      const a = params.get("area") || "";
      setPurpose(PURPOSES.some((x) => x.id === p) ? (p as PurposeId) : "");
      setCategory(CATEGORIES.some((x) => x.id === c) ? (c as CategoryId) : "");
      setArea([...WARDS, EXTRA_AREA].includes(a) ? a : "");
      setQual(
        qualifications.includes(params.get("qualification") || "")
          ? params.get("qualification")!
          : "",
      );
      setService(
        services.includes(params.get("service") || "")
          ? params.get("service")!
          : "",
      );
      setReady(true);
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [qualifications, services]);

  useEffect(() => {
    if (!ready) return;
    const url = new URL(location.href);
    for (const [key, value] of Object.entries({
      area,
      purpose,
      category,
      qualification: qual,
      service,
    })) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    history.replaceState(
      history.state,
      "",
      url.pathname + url.search + url.hash,
    );
  }, [ready, area, purpose, category, qual, service]);

  const filtered = facilities.filter(
    (f) =>
      (!area || f.ward.includes(area)) &&
      (!purpose || f.purposes.includes(purpose)) &&
      (!category || f.categories.includes(category)) &&
      (!qual || facilityGuide(f).staffQualifications.includes(qual)) &&
      (!service || f.serviceTypes.includes(service)),
  );
  const reset = () => {
    setArea("");
    setPurpose("");
    setCategory("");
    setQual("");
    setService("");
  };
  const jump = () =>
    requestAnimationFrame(() => {
      const heading = document.getElementById("results-heading");
      heading?.scrollIntoView({
        block: "start",
        behavior: "instant" as ScrollBehavior,
      });
      heading?.focus({ preventScroll: true });
    });
  const choosePurpose = (id: PurposeId) => {
    setPurpose(id);
    jump();
  };
  const areaCounts = [...WARDS, EXTRA_AREA].map((ward) => ({
    ward,
    count: facilities.filter((f) => f.ward.includes(ward)).length,
  }));
  const conditions = [
    ...(purpose
      ? [
          {
            label:
              PURPOSE_ENTRIES.find((p) => p.id === purpose)?.title ||
              PURPOSES.find((p) => p.id === purpose)?.label ||
              purpose,
            clear: () => setPurpose(""),
          },
        ]
      : []),
    ...(area ? [{ label: area, clear: () => setArea("") }] : []),
    ...(category
      ? [{ label: categoryLabel(category), clear: () => setCategory("") }]
      : []),
    ...(qual ? [{ label: `スタッフ：${qual}`, clear: () => setQual("") }] : []),
    ...(service ? [{ label: service, clear: () => setService("") }] : []),
  ];

  return (
    <>
      <section
        id="purpose"
        className="border-b border-line bg-white py-9 sm:py-12"
        aria-labelledby="purpose-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="purpose-heading" className="font-display text-2xl font-bold">
            どんなことを相談したいですか？
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PURPOSE_ENTRIES.map((entry, index) => {
              const Icon = purposeIcons[index];
              return (
                <button
                  key={entry.id}
                  type="button"
                  aria-pressed={purpose === entry.id}
                  onClick={() => choosePurpose(entry.id)}
                  className={`flex min-h-28 items-start gap-4 rounded-lg border p-5 text-left hover:border-sora-deep ${purpose === entry.id ? "border-sora-deep bg-sora-soft" : "border-line bg-paper"}`}
                >
                  <Icon
                    size={26}
                    strokeWidth={1.6}
                    className="mt-1 shrink-0 text-wakaba-deep"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block text-base font-bold leading-relaxed">
                      {entry.title}
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft">
                      {entry.description}
                    </span>
                  </span>
                  <ArrowRight
                    size={18}
                    className="ml-auto mt-1 shrink-0 text-sora-deep"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => choosePurpose("stroke")}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-sora-deep underline underline-offset-4"
            >
              脳卒中後の自費リハビリ
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => choosePurpose("visit")}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-sora-deep underline underline-offset-4"
            >
              <House size={17} aria-hidden="true" />
              訪問でのサポートを探す
            </button>
          </div>
        </div>
      </section>
      <section
        id="search"
        className="bg-paper py-8"
        aria-labelledby="search-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="search-heading" className="font-display text-2xl font-bold">
            掲載施設を探す
          </h2>
          <div
            role="search"
            aria-label="施設の絞り込み"
            className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <label className="min-w-0 text-sm font-bold">
              地域
              <select
                aria-label="エリア"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className={selectClass}
              >
                <option value="">すべての地域</option>
                {WARDS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
                <option value={EXTRA_AREA}>{EXTRA_AREA}</option>
              </select>
            </label>
            <label className="min-w-0 text-sm font-bold">
              サービス
              <select
                aria-label="カテゴリ"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId | "")}
                className={selectClass}
              >
                <option value="">すべてのサービス</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="min-w-0 text-sm font-bold">
              ご利用方法
              <select
                aria-label="ご利用方法"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={selectClass}
              >
                <option value="">すべての利用方法</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <details className="sm:col-span-2 lg:col-span-3">
              <summary className="min-h-11 cursor-pointer py-2 text-sm font-medium text-sora-deep">
                目的・スタッフの保有資格でさらに絞る
              </summary>
              <div className="mt-2 grid gap-4 sm:grid-cols-2">
                <label className="min-w-0 text-sm font-bold">
                  目的
                  <select
                    aria-label="目的"
                    value={purpose}
                    onChange={(e) =>
                      setPurpose(e.target.value as PurposeId | "")
                    }
                    className={selectClass}
                  >
                    <option value="">すべての目的</option>
                    {PURPOSES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {PURPOSE_ENTRIES.find((x) => x.id === p.id)?.title ||
                          p.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="min-w-0 text-sm font-bold">
                  スタッフの保有資格
                  <select
                    aria-label="スタッフの保有資格"
                    value={qual}
                    onChange={(e) => setQual(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">すべてのスタッフ</option>
                    {qualifications.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </details>
          </div>
        </div>
      </section>
      <section
        id="facilities"
        className="bg-wakaba-soft py-8 sm:py-12"
        aria-labelledby="results-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2
              id="results-heading"
              tabIndex={-1}
              className="scroll-mt-36 font-display text-2xl font-bold"
            >
              あなたの条件に合う施設
            </h2>
            <button
              onClick={reset}
              type="button"
              className="min-h-11 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-sora-deep"
            >
              条件をリセット
            </button>
          </div>
          <div className="my-4 flex flex-wrap gap-2" aria-label="選択中の条件">
            {conditions.length ? (
              conditions.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={c.clear}
                  aria-label={`${c.label}の条件を解除`}
                  className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-lg border border-sora/30 bg-white px-3 py-2 text-left text-sm text-sora-deep"
                >
                  <span>{c.label}</span>
                  <X size={16} className="shrink-0" aria-hidden="true" />
                </button>
              ))
            ) : (
              <span className="py-2 text-sm text-ink-soft">
                すべての地域・目的・サービス
              </span>
            )}
          </div>
          <p aria-live="polite" aria-atomic="true" className="mb-5 text-base">
            <strong className="text-xl text-sora-deep">
              {filtered.length}
            </strong>{" "}
            件の施設が見つかりました
          </p>
          {filtered.length ? (
            <div className="grid items-stretch gap-5 md:grid-cols-2">
              {filtered.map((f) => (
                <FacilityCard key={f.id} facility={f} />
              ))}
            </div>
          ) : (
            <div className="border-y border-line bg-white px-5 py-8">
              <h3 className="text-lg font-bold">
                条件に合う掲載施設が見つかりませんでした
              </h3>
              <p className="mt-3 text-base">
                条件を一つ外すか、地域を広げてお探しください。
              </p>
              <button
                onClick={reset}
                type="button"
                className="mt-4 min-h-12 rounded-lg bg-sora-deep px-5 py-3 font-bold text-white"
              >
                すべての施設を見る
              </button>
              <p className="mt-5 text-sm text-ink-soft">
                このエリア・条件の施設情報を募集中です。
              </p>
              <a
                href="#recruit"
                className="inline-block py-3 text-sm text-sora-deep underline"
              >
                無料掲載のご案内
              </a>
            </div>
          )}
        </div>
      </section>
      <section
        id="area"
        className="bg-white py-10 sm:py-12"
        aria-labelledby="area-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="area-heading" className="font-display text-2xl font-bold">
            地域から探す
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {areaCounts
              .filter((x) => x.count > 0)
              .map((x) => (
                <button
                  key={x.ward}
                  onClick={() => {
                    setArea(x.ward);
                    jump();
                  }}
                  type="button"
                  aria-pressed={area === x.ward}
                  className={`min-h-12 rounded-lg border px-5 py-3 font-medium hover:border-sora-deep ${area === x.ward ? "border-sora-deep bg-sora-soft" : "border-line bg-white"}`}
                >
                  {x.ward}
                  <span className="ml-3 text-sm text-ink-soft">
                    {x.count}件
                  </span>
                </button>
              ))}
          </div>
          <details className="mt-5 border-t border-line pt-3">
            <summary className="cursor-pointer py-3 text-sm text-ink-soft">
              ほかの地域・掲載状況を見る
            </summary>
            <p className="mt-2 text-sm text-ink-soft">
              現在掲載のない地域です。新しい施設情報をお待ちしています。
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {areaCounts
                .filter((x) => x.count === 0)
                .map((x) => (
                  <button
                    key={x.ward}
                    type="button"
                    onClick={() => {
                      setArea(x.ward);
                      jump();
                    }}
                    className="min-h-11 px-2 text-sm text-sora-deep underline underline-offset-4"
                  >
                    {x.ward}（掲載準備中）
                  </button>
                ))}
            </div>
          </details>
        </div>
      </section>
      <CategorySection
        onSelect={(id) => {
          setCategory(id);
          jump();
        }}
      />
      {children}
    </>
  );
}

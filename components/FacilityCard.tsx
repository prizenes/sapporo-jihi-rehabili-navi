import Link from "next/link";
import { Activity, ArrowRight, HeartPulse, MapPin, PersonStanding, UserRound } from "lucide-react";
import { categoryLabel, type Facility } from "@/data/facilities";
import { facilityGuide } from "@/data/facility-guide";
import FacilityMedia from "@/components/FacilityMedia";
import FacilityWebsiteLink from "@/components/FacilityWebsiteLink";

export default function FacilityCard({ facility: f }: { facility: Facility }) {
  const guide = facilityGuide(f);
  const CategoryIcon = f.categories.includes("medical-fitness") ? HeartPulse : f.categories.includes("pilates") ? PersonStanding : Activity;
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-white">
      {guide.photo && <Link
        href={`/facilities/${f.id}`}
        aria-label={`${f.name}の特徴・料金を見る`}
      >
        <FacilityMedia name={f.name} photo={guide.photo} />
      </Link>}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 flex items-start gap-2 text-sm font-bold text-wakaba-deep">
          <CategoryIcon size={20} className="shrink-0" aria-hidden="true" />
          <span>{f.ward} · {categoryLabel(f.categories[0])}</span>
        </p>
        <h3 className="font-display text-xl font-bold leading-relaxed">
          <Link href={`/facilities/${f.id}`} className="hover:text-sora-deep">
            {f.name}
          </Link>
        </h3>
        <p className="mt-3 text-base leading-relaxed">{f.tagline}</p>
        {guide.reception && <p className="mt-3 border-l-2 border-sora pl-3 text-sm leading-relaxed">
          <a href={guide.reception.url} target="_blank" rel="noopener noreferrer" className="text-sora-deep underline underline-offset-4">{guide.reception.message}</a>
        </p>}
        <p className="mt-4 text-sm leading-relaxed">
          <strong className="block text-ink">こんな方におすすめ</strong>
          {f.targets.slice(0, 3).join("・")}
        </p>
        <div className="mt-4 flex items-start gap-2 text-sm leading-relaxed">
          <UserRound
            size={18}
            className="mt-0.5 shrink-0 text-wakaba-deep"
            aria-hidden="true"
          />
          <p>{guide.support}</p>
        </div>
        <dl className="my-5 border-y border-line py-4 text-sm">
          {guide.prices.slice(0, 2).map((price) => (
            <div key={price.label} className="mb-3 last:mb-0">
              <dt className="text-ink-soft">{price.label}</dt>
              <dd className="mt-1 font-bold text-sora-deep">{price.value}</dd>
              {price.note && (
                <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {price.note}
                </dd>
              )}
            </div>
          ))}
        </dl>
        <p className="mb-5 flex items-start gap-2 text-sm text-ink-soft">
          <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {guide.accessSummary}
        </p>
        <Link
          href={`/facilities/${f.id}`}
          className="mt-auto flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sora-deep px-4 py-3 text-base font-bold text-white hover:bg-sora"
        >
          特徴・料金を見る
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        {f.site && (
          <FacilityWebsiteLink
            href={f.site}
            facilityId={f.id}
            placement="facility_list"
            className="mt-3 flex min-h-11 items-center justify-center text-sm font-medium text-sora-deep underline underline-offset-4"
          >
            公式サイトへ
          </FacilityWebsiteLink>
        )}
      </div>
    </article>
  );
}

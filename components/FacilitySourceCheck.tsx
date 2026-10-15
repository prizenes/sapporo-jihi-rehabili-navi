import {
  FACILITY_VERIFICATIONS,
  VERIFICATION_LABELS,
} from "@/data/facility-verification";
import { formatDate } from "@/lib/site";

export default function FacilitySourceCheck({
  facilityId,
}: {
  facilityId: string;
}) {
  const verification = FACILITY_VERIFICATIONS[facilityId];
  return (
    <section
      className="my-8 border-y border-line py-6"
      aria-labelledby="source-check-heading"
    >
      <h2 id="source-check-heading" className="font-display text-xl font-bold">
        公式情報の照合
      </h2>
      <p className="mt-3 text-sm leading-loose text-ink-soft">
        上の表は元の掲載データです。以下は公式情報の確認結果で、施設による掲載承認や、全情報が最新であることの保証ではありません。
      </p>
      <p className="mt-2 text-sm">
        照合日：
        {verification ? (
          <time dateTime={verification.reviewedAt}>
            {formatDate(verification.reviewedAt)}
          </time>
        ) : (
          "未記録"
        )}
      </p>
      <dl className="mt-4 divide-y divide-line">
        {(
          Object.keys(
            VERIFICATION_LABELS,
          ) as (keyof typeof VERIFICATION_LABELS)[]
        ).map((field) => {
          const check = verification?.checks[field];
          return (
            <div
              key={field}
              className="grid gap-2 py-4 text-sm sm:grid-cols-[140px_1fr]"
            >
              <dt className="font-bold">{VERIFICATION_LABELS[field]}</dt>
              <dd className="leading-loose">
                <span
                  className={
                    check?.confirmed
                      ? "font-bold text-wakaba-deep"
                      : "font-bold text-ink-soft"
                  }
                >
                  {check?.confirmed ? "公式の記載を確認" : "再確認が必要"}
                </span>
                <p className="mt-1">
                  {check?.note ||
                    "公式情報の照合は未実施です。施設へご確認ください。"}
                </p>
              </dd>
            </div>
          );
        })}
      </dl>
      <h3 className="mt-5 text-sm font-bold">照合先・最新情報の確認先</h3>
      <ul className="mt-2 space-y-2 text-sm">
        {verification?.sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-words text-sora-deep underline underline-offset-4"
            >
              {source.title}（外部）
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

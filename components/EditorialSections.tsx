import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { ARTICLES } from "@/data/articles";
import { NEWS } from "@/data/news";
import { FAQS } from "@/data/faq";
import { formatDate } from "@/lib/site";

export function NewsSection() {
  return (
    <section
      aria-labelledby="news-heading"
      className="border-y border-line bg-white py-7"
    >
      <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-[180px_1fr]">
        <div>
          <h2 id="news-heading" className="font-display text-lg font-bold">
            新着情報
          </h2>
          <Link
            href="/news"
            className="mt-2 inline-block text-sm text-sora-deep underline underline-offset-4"
          >
            すべてのお知らせ
          </Link>
        </div>
        <ul className="divide-y divide-line">
          {NEWS.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/news/${item.slug}`}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3 text-sm hover:text-sora-deep"
              >
                <time dateTime={item.date} className="text-ink-soft">
                  {formatDate(item.date)}
                </time>
                <span className="text-xs font-bold text-wakaba-deep">
                  {item.category}
                </span>
                <span className="min-w-0 flex-1 basis-60 font-medium">
                  {item.title}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function GuideSection() {
  const featuredSlugs = [
    "after-hospital-exercise-support",
    "what-is-private-rehabilitation",
    "physical-therapist-personal-gym",
  ];
  const featured = featuredSlugs.flatMap((slug) =>
    ARTICLES.filter((article) => article.slug === slug),
  );
  const others = ARTICLES.filter(
    (article) => !featuredSlugs.includes(article.slug),
  );
  return (
    <section
      id="guides"
      aria-labelledby="guides-heading"
      className="bg-sora-soft py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="guides-heading"
              className="font-display text-2xl font-bold sm:text-3xl"
            >
              リハビリ・運動のお役立ち情報
            </h2>
            <p className="mt-3 text-base text-ink-soft">
              何を相談する？ いくらかかる？ 迷ったときの確認ポイント。
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-bold text-sora-deep underline underline-offset-4"
          >
            読みもの一覧へ →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <div className="mt-8 border-t border-sora/20 pt-5">
          <p className="text-sm font-bold text-wakaba-deep">あわせて読みたい</p>
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {others.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="block text-base underline decoration-line underline-offset-4 hover:text-sora-deep"
                >
                  {article.title} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2
          id="faq-heading"
          className="font-display text-2xl font-bold sm:text-3xl"
        >
          施設探しで、よくある質問
        </h2>
        <div className="mt-7 divide-y divide-line border-y border-line">
          {FAQS.slice(0, 4).map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="cursor-pointer text-base font-bold leading-relaxed marker:text-sora-deep">
                {item.question}
              </summary>
              <p className="mt-3 text-base leading-loose text-ink-soft">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
        <Link
          href="/faq"
          className="mt-5 inline-block text-sm font-bold text-sora-deep underline underline-offset-4"
        >
          よくある質問をすべて読む →
        </Link>
      </div>
    </section>
  );
}

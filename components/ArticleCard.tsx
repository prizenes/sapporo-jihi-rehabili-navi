import Image from "next/image";
import Link from "next/link";
import type { GuideArticle } from "@/data/articles";
import { formatDate } from "@/lib/site";

export default function ArticleCard({
  article,
  headingLevel = "h3",
}: {
  article: GuideArticle;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-white transition hover:border-sora">
      <Link
        href={`/blog/${article.slug}`}
        className="block h-full focus-visible:outline-offset-[-3px]"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 360px"
            className="object-cover transition duration-300 motion-safe:group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-wakaba-deep">
              {article.category}
            </span>
            <time dateTime={article.publishedAt} className="text-ink-soft">
              {formatDate(article.publishedAt)}
            </time>
          </div>
          <Heading className="mt-3 font-display text-lg font-bold leading-relaxed group-hover:text-sora-deep">
            {article.title}
          </Heading>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {article.description}
          </p>
          <span className="mt-4 inline-block text-sm font-bold text-sora-deep">
            記事を読む <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

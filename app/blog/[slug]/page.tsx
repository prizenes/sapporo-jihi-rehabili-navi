import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentLayout, {
  Breadcrumbs,
  FindFacilityLink,
} from "@/components/ContentLayout";
import ArticleCard from "@/components/ArticleCard";
import StructuredData from "@/components/StructuredData";
import { ARTICLES, findArticle } from "@/data/articles";
import { SITE_NAME, SITE_URL, formatDate, pageMetadata } from "@/lib/site";

type Props = { params: { slug: string } };
export const dynamicParams = false;
export const generateStaticParams = () =>
  ARTICLES.map(({ slug }) => ({ slug }));

export function generateMetadata({ params }: Props): Metadata {
  const article = findArticle(params.slug);
  if (!article) return {};
  const base = pageMetadata(
    article.title,
    article.description,
    `/blog/${article.slug}`,
    article.image,
  );
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: `${article.publishedAt}T09:00:00+09:00`,
      modifiedTime: `${article.updatedAt}T09:00:00+09:00`,
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = findArticle(params.slug);
  if (!article) notFound();
  const related = ARTICLES.filter((item) => item.slug !== article.slug).slice(
    0,
    2,
  );
  return (
    <ContentLayout>
      <Breadcrumbs
        items={[
          { label: "読みもの", href: "/blog" },
          { label: article.title, href: `/blog/${article.slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl">
        <header>
          <p className="text-sm font-bold text-wakaba-deep">
            {article.category}
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold leading-relaxed sm:text-4xl sm:leading-relaxed">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
            <span>
              公開{" "}
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </span>
            <span>
              更新{" "}
              <time dateTime={article.updatedAt}>
                {formatDate(article.updatedAt)}
              </time>
            </span>
            <Link href="/about" className="underline underline-offset-4">
              {SITE_NAME} 編集部
            </Link>
          </div>
        </header>
        <figure className="my-7">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              sizes="(max-width: 800px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-right text-xs text-ink-soft">
            写真はイメージです
          </figcaption>
        </figure>
        <div className="border-l-4 border-wakaba bg-wakaba-soft p-5 sm:p-7">
          <h2 className="font-display text-lg font-bold">
            まず押さえておきたいこと
          </h2>
          <p className="mt-3 text-base leading-loose">{article.answer}</p>
        </div>
        <ul className="my-7 list-disc space-y-2 pl-6 text-base leading-loose">
          {article.takeaways.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <nav
          aria-label="この記事の目次"
          className="my-9 border-y border-line py-5"
        >
          <h2 className="font-bold">この記事で分かること</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-base">
            {article.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sora-deep underline decoration-line underline-offset-4"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        {article.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28 py-5"
          >
            <h2 className="mb-5 border-b border-line pb-3 font-display text-xl font-bold leading-relaxed sm:text-2xl">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="my-4 text-base leading-[2] sm:text-[17px]"
              >
                {paragraph}
              </p>
            ))}
            {section.checklist && (
              <ul className="my-5 list-disc space-y-3 border-l-2 border-sora bg-sora-soft py-5 pl-9 pr-5 text-base leading-loose">
                {section.checklist.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            {section.table && (
              <div className="my-6 overflow-x-auto">
                <table className="w-full min-w-[280px] border-collapse text-left text-sm leading-loose">
                  <caption className="sr-only">{section.title}の確認表</caption>
                  <thead className="bg-sora-soft">
                    <tr>
                      {section.table.headers.map((heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="border border-line p-3"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, index) =>
                          index === 0 ? (
                            <th
                              key={cell}
                              scope="row"
                              className="w-[30%] border border-line bg-white p-3 font-medium"
                            >
                              {cell}
                            </th>
                          ) : (
                            <td key={cell} className="border border-line p-3">
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
        <section className="my-9">
          <h2 className="font-display text-xl font-bold">
            この記事に関する質問
          </h2>
          <dl className="mt-4 divide-y divide-line">
            {article.questions.map((item) => (
              <div key={item.question} className="py-5">
                <dt className="font-bold leading-relaxed">{item.question}</dt>
                <dd className="mt-3 text-base leading-loose text-ink-soft">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        {article.references.length > 0 && (
          <section className="my-8 border-t border-line pt-5">
            <h2 className="text-base font-bold">参考情報</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {article.references.map((reference) => (
                <li key={reference.url}>
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words text-sora-deep underline underline-offset-4"
                  >
                    {reference.title}（外部サイト）
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              参考情報は基礎知識の確認に用いています。各団体が当サイトや掲載施設を推奨・監修していることを意味しません。
            </p>
          </section>
        )}
        <aside className="border-y border-line py-5 text-sm leading-loose text-ink-soft">
          <p>
            この記事は施設選び・利用準備のための一般的な情報です。診断や個別の運動処方を行うものではありません。医学的な判断が必要な場合は医療機関へ、サービスの最新情報は各施設へご確認ください。
          </p>
          <Link
            href="/about"
            className="mt-2 inline-block text-sora-deep underline underline-offset-4"
          >
            運営者・記事の編集方針
          </Link>
        </aside>
        <FindFacilityLink />
      </article>
      <section className="mt-12 border-t border-line pt-8">
        <h2 className="mb-5 font-display text-xl font-bold">
          あわせて読みたい
        </h2>
        <div className="grid max-w-3xl gap-5 sm:grid-cols-2">
          {related.map((item) => (
            <ArticleCard key={item.slug} article={item} />
          ))}
        </div>
        <Link
          href="/blog"
          className="mt-6 inline-block text-sora-deep underline underline-offset-4"
        >
          読みもの一覧へ
        </Link>
      </section>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.description,
          image: `${SITE_URL}${article.image}`,
          datePublished: `${article.publishedAt}T09:00:00+09:00`,
          dateModified: `${article.updatedAt}T09:00:00+09:00`,
          inLanguage: "ja",
          author: {
            "@type": "Organization",
            name: `${SITE_NAME} 編集部`,
            url: `${SITE_URL}/about`,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
        }}
      />
    </ContentLayout>
  );
}

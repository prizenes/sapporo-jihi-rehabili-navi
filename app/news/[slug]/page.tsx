import Link from "next/link";
import { notFound } from "next/navigation";
import ContentLayout, { Breadcrumbs } from "@/components/ContentLayout";
import { NEWS } from "@/data/news";
import { formatDate, pageMetadata } from "@/lib/site";

type Props = { params: { slug: string } };
export const dynamicParams = false;
export const generateStaticParams = () => NEWS.map(({ slug }) => ({ slug }));
export function generateMetadata({ params }: Props) {
  const item = NEWS.find((item) => item.slug === params.slug);
  return item
    ? pageMetadata(item.title, item.description, `/news/${item.slug}`)
    : {};
}
export default function NewsDetailPage({ params }: Props) {
  const item = NEWS.find((item) => item.slug === params.slug);
  if (!item) notFound();
  return (
    <ContentLayout>
      <Breadcrumbs
        items={[
          { label: "新着情報", href: "/news" },
          { label: item.title, href: `/news/${item.slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl">
        <time dateTime={item.date} className="text-sm text-ink-soft">
          {formatDate(item.date)}
        </time>
        <h1 className="my-5 font-display text-2xl font-bold leading-relaxed sm:text-3xl">
          {item.title}
        </h1>
        {item.paragraphs.map((text) => (
          <p key={text} className="my-6 text-base leading-loose">
            {text}
          </p>
        ))}
        <Link
          href={item.link}
          className="my-6 inline-block rounded-lg bg-sora-deep px-6 py-3 text-base font-bold text-white"
        >
          {item.linkLabel} →
        </Link>
        <div className="mt-10 border-t border-line pt-5">
          <Link
            href="/news"
            className="text-sora-deep underline underline-offset-4"
          >
            新着情報一覧へ戻る
          </Link>
        </div>
      </article>
    </ContentLayout>
  );
}

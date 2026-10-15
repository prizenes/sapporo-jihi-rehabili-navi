import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "@/lib/site";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  const crumbs = [{ label: "ホーム", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="パンくずリスト" className="mb-8 text-sm text-ink-soft">
        <ol className="flex flex-wrap gap-x-2 gap-y-1">
          {crumbs.map((item, index) => (
            <li key={item.href} className="min-w-0 break-words">
              {index > 0 && (
                <span aria-hidden="true" className="mr-2">
                  /
                </span>
              )}
              {index === crumbs.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="underline decoration-line underline-offset-4 hover:text-sora-deep"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: `${SITE_URL}${item.href}`,
          })),
        }}
      />
    </>
  );
}

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {children}
      </main>
      <Footer />
    </>
  );
}

export function FindFacilityLink() {
  return (
    <aside className="my-10 border-y border-line bg-wakaba-soft px-5 py-8 sm:px-8">
      <h2 className="font-display text-xl font-bold">
        札幌で、自分に合う相談先を探す
      </h2>
      <p className="mt-2 text-base text-ink-soft">
        エリア・目的・資格・カテゴリから、掲載施設を比較できます。
      </p>
      <Link
        href="/#facilities"
        className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-sora-deep px-6 py-3 text-base font-bold text-white hover:bg-sora"
      >
        掲載施設を探す{" "}
        <span aria-hidden="true" className="ml-3">
          →
        </span>
      </Link>
    </aside>
  );
}

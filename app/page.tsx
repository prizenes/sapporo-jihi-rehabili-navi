import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import Explore from "@/components/Explore";
import RecruitSection from "@/components/RecruitSection";
import NoticeSection from "@/components/NoticeSection";
import Footer from "@/components/Footer";
import { FaqSection, GuideSection, NewsSection } from "@/components/EditorialSections";

export const metadata = { alternates: { canonical: "https://sapporo-jihi-rehabili-navi.vercel.app/" } };

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NewsSection />
        <CategorySection />
        <Explore />
        <GuideSection />
        <FaqSection />
        <RecruitSection />
        <NoticeSection />
      </main>
      <Footer />
    </>
  );
}

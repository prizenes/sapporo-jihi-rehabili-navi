import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Explore from "@/components/Explore";
import RecruitSection from "@/components/RecruitSection";
import Footer from "@/components/Footer";
import {
  FaqSection,
  GuideSection,
} from "@/components/EditorialSections";

export const metadata = {
  alternates: { canonical: "https://sapporo-jihi-rehabili-navi.vercel.app/" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Explore>
          <GuideSection />
        </Explore>
        <FaqSection />
        <RecruitSection />
      </main>
      <Footer />
    </>
  );
}

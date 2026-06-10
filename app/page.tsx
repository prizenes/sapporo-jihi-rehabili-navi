import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import Explore from "@/components/Explore";
import RecruitSection from "@/components/RecruitSection";
import NoticeSection from "@/components/NoticeSection";
import OperatorSection from "@/components/OperatorSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategorySection />
        <Explore />
        <RecruitSection />
        <NoticeSection />
        <OperatorSection />
      </main>
      <Footer />
    </>
  );
}

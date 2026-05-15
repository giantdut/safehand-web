import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import ProgramCoverage from "@/components/landing/ProgramCoverage";
import CompetitiveTable from "@/components/landing/CompetitiveTable";
import WhoItsFor from "@/components/landing/WhoItsFor";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesGrid />
        <HowItWorks />
        <ProgramCoverage />
        <CompetitiveTable />
        <WhoItsFor />
      </main>
      <Footer />
    </>
  );
}

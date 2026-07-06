import Ticker from "@/components/landing/Ticker";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Authority from "@/components/landing/Authority";
import Countdown from "@/components/landing/Countdown";
import SocialProof from "@/components/landing/SocialProof";
import Register from "@/components/landing/Register";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Ticker />
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Countdown />
        <Authority />
        <SocialProof />
        <Register />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

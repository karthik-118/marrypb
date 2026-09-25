import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Events from "@/components/Events";
import Memories from "@/components/Memories";
import Wishes from "@/components/Wishes";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <Events />
        <Memories />
        <Wishes />
        <Location />
      </main>
      <Footer />
    </>
  );
}

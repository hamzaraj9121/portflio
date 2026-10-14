
import Header from "@/components/Header";
import Hero from "@/components/HeroSection";


export default function Home() {
  return (
    <main>
      <Header />
      <Hero/>

      <section id="skills" className="min-h-screen">
        {/* Skills section */}
      </section>

      <section id="contact" className="min-h-screen">
        {/* Contact section */}
      </section>
    </main>
  );
}

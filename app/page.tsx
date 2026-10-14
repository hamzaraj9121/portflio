
import Header from "@/components/Header";
import Hero from "@/components/HeroSection";
import Skills from "@/components/Skills";
import Story from "@/components/story";



export default function Home() {
  return (
    <main>
      <Header />
      <Hero/>

      <section id="skills" className="min-h-screen">
<Skills />
        {/* Skills section */}
      </section>

      <section id="contact" className="min-h-screen">
      <Story />
      </section>
    </main>
  );
}

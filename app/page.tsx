import ContactSection from "@/components/contectSection";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import Hero from "@/components/HeroSection";
import KindWords from "@/components/KindWords";
import ScrollCoordinator from "@/components/ScrollCoordinator";
import SelectedProjects from "@/components/SelectedPage";
import Skills from "@/components/Skills";
import Story from "@/components/Story";

export default function Home() {
  return (
    <main>
      <ScrollCoordinator />
      <Header />
      <Hero />
      <Skills />
      <SelectedProjects />
      <Story />
      <KindWords />
      <ContactSection />
      <Footer />
    </main>
  );
}
     
  

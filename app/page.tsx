import About from "./components/About";
import Contact from "./components/Contact";
import DesignShowcase from "./components/DesignShowcase";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ModalDialog from "./components/ModalDialog";
import Navigation from "./components/Navigation";
import Projects from "./components/Projects";
import References from "./components/References";
import Service from "./components/Service";
import Steps from "./components/Steps";

export default function Home() {
  return (
    <ModalDialog>
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Service />
        <DesignShowcase />
        <Steps />
        <About />
        <References />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </ModalDialog>
  );
}

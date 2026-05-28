import Hero from "../components/Hero";
import About from "../components/About";
import Systems from "../components/Systems";
import CaseStudy from "../components/CaseStudy";

function Home() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <Hero />
        <About />
        <Systems />
        <CaseStudy />
      </div>
    )
  }
  
  export default Home
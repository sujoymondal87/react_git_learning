import Hero from "../components/Hero";
import About from "../components/About";
import Systems from "../components/Systems";
import CaseStudy from "../components/CaseStudy";
import Layout from "../components/Layout";
import Capabilities from "../components/Capabilities";

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero />
      <div className="max-w-[1100px] mx-auto px-6">
        <About />
        <Capabilities />
        {/* <Systems /> */}
        <CaseStudy />
      </div>
    </div>
  )
  }
  
  export default Home
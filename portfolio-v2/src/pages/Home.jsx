import Hero from "../components/Hero";
import About from "../components/About";

function Home() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <Hero />
        <About />
      </div>
    )
  }
  
  export default Home
import Hero from "../components/Hero";
import About from "../components/About";
import Systems from "../components/Systems";

function Home() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <Hero />
        <About />
        <Systems />
      </div>
    )
  }
  
  export default Home
export default function About() {
  return (
      <section className="py-8 md:py-16 border-b border-gray-800">
          <p className="text-amber-500 text-sm font-mono mb-4">01 / About</p>
          <h2 className="text-3xl font-bold text-white mb-6">Who I am</h2>
          <div className="max-w-none">
              <p className="text-gray-300 mb-4 leading-relaxed">I built a no-code app builder platform for a 2-person company. The platform serves museums, cathedrals, tourism institutions and retail businesses across Europe — offline runtimes, AI agents, AR, multilingual TTS, payments, real-time sync, geofencing. All configurable without code.</p>
              <p className="text-gray-300 leading-relaxed">Every architectural decision, implementation, debugging session and production deployment over the last decade was mine. Product direction came from my co-founder. Everything else came from me.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-800 mt-8 md:mt-12">
            <div className="p-6 border-r border-b md:border-b-0 border-gray-800">
                <div className="text-4xl font-bold text-amber-500">15+</div>
                <div className="text-sm text-gray-400 mt-1">Years Building Production Systems</div>
            </div>
            <div className="p-6 border-r md:border-r-0 border-b md:border-b-0 border-gray-800">
                <div className="text-4xl font-bold text-amber-500">10+</div>
                <div className="text-sm text-gray-400 mt-1">Years as Co-Founder & CTO</div>
            </div>
            <div className="p-6 border-r border-gray-800">
                <div className="text-4xl font-bold text-amber-500">35+</div>
                <div className="text-sm text-gray-400 mt-1">Countries. Global Reach.</div>
            </div>
            <div className="p-6">
                <div className="text-4xl font-bold text-amber-500">609</div>
                <div className="text-sm text-gray-400 mt-1">Verified Reviews. 4.54 Rating.</div>
            </div>
        </div>
      </section>
  )
}  
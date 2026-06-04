export default function Hero() {
    return (
        <div className="max-w-[1100px] mx-auto px-6 pt-24 border-b border-gray-800">
            <div className="flex justify-between items-start mb-12">
                <div>
                    <p className="text-amber-500 text-sm font-mono mb-4">Co-Founder & CTO · MyAppZone / Neareo · Belgium</p>
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">Sujoy<br/>Mondal</h1>
                    <p className="text-gray-300 text-xl mb-4">Built and operated a production no-code platform used by museums, tourism institutions and cultural organizations across Europe.</p>
                    <p className="text-amber-500 text-lg mb-12">One engineer. Ten years. End-to-end ownership.</p>
                </div>
                <img src="/sujoy.jpg" alt="Sujoy Mondal" className="w-80 h-80 rounded-full object-cover" />
            </div>
        </div>
    )
}  
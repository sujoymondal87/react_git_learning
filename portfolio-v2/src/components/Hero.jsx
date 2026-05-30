export default function Hero() {
    return (
        <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-16 border-b border-gray-800">
            <p className="text-amber-500 text-sm font-mono mb-4">Co-Founder & CTO · MyAppZone / Neareo · Belgium</p>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">Sujoy<br/>Mondal</h1>
            <p className="text-gray-400 text-xl mb-12">10 years. One engineer. One platform.</p>
            <div className="grid grid-cols-4 border border-gray-800">
            <div className="p-6 border-r border-gray-800">
                <div className="text-4xl font-bold text-amber-500">609</div>
                <div className="text-sm text-gray-500 mt-1">Verified Reviews</div>
            </div>
            <div className="p-6 border-r border-gray-800">
                <div className="text-4xl font-bold text-amber-500">4.54</div>
                <div className="text-sm text-gray-500 mt-1">Average Rating</div>
            </div>
            <div className="p-6 border-r border-gray-800">
                <div className="text-4xl font-bold text-amber-500">35+</div>
                <div className="text-sm text-gray-500 mt-1">Countries</div>
            </div>
            <div className="p-6">
                <div className="text-4xl font-bold text-amber-500">20+</div>
                <div className="text-sm text-gray-500 mt-1">Systems Built</div>
            </div>
            </div>
        </div>
    )
}  
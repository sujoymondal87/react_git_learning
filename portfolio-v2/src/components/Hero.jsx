export default function Hero() {
    return (
        <section className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Sujoy Mondal</h1>
            <h2 className="text-2xl font-bold">Co-Founder & CTO · Solo Platform Engineer</h2>
            <p className="text-lg text-gray-400">10 years. One engineer. One platform.</p>
            <div className="flex flex-col items-center justify-center">
                <div className="flex gap-8 mt-4">
                    <div className="flex flex-col">
                    <span className="text-4xl font-bold">609</span><span className="text-sm text-gray-400">reviews</span>
                    </div>
                    <div className="flex flex-col">
                    <span className="text-4xl font-bold">4.54</span><span className="text-sm text-gray-400">rating</span>
                    </div>
                    <div className="flex flex-col">
                    <span className="text-4xl font-bold">35+</span><span className="text-sm text-gray-400">countries</span>
                    </div>
                    <div className="flex flex-col">
                    <span className="text-4xl font-bold">20+</span> <span className="text-sm text-gray-400">systems</span>
                    </div>
                </div>
            </div>
        </section>
    )
}  
import { FiWifi, FiCpu, FiCamera, FiRadio, FiBarChart2, FiMap, FiCreditCard, FiLayout } from 'react-icons/fi'

const capabilities = [
  { icon: <FiWifi size={24} />, name: 'Offline-First Runtime', desc: 'Browser-based runtime that works offline with intelligent sync.' },
  { icon: <FiCpu size={24} />, name: 'AI Orchestration', desc: 'Multi-model routing with deterministic flows and guardrails.' },
  { icon: <FiCamera size={24} />, name: 'Browser AR', desc: 'Markerless artifact recognition and interactive AR experiences.' },
  { icon: <FiRadio size={24} />, name: 'Real-Time Sync', desc: 'Conflict-free sync, distributed state and live collaboration.' },
  { icon: <FiBarChart2 size={24} />, name: 'Analytics Engine', desc: 'Custom event pipeline, data modelling and reconstructed analytics.' },
  { icon: <FiMap size={24} />, name: 'Indoor Navigation', desc: 'GPS-denied navigation for large indoor environments.' },
  { icon: <FiCreditCard size={24} />, name: 'Payment Infrastructure', desc: 'Ticket lifecycle, offline constraints, kiosk-ready payment flows.' },
  { icon: <FiLayout size={24} />, name: 'No-Code Builder', desc: 'Click-based app composition. No code required. 30+ production apps.' },
]

export default function Capabilities() {
  return (
    <section className="py-16 border-b border-gray-800">
      <p className="text-amber-500 text-sm font-mono mb-4">What I Build</p>
      <h2 className="text-3xl font-bold text-white mb-10">Platform Capabilities</h2>
      <div className="grid grid-cols-4 gap-4">
        {capabilities.map((cap) => (
          <div key={cap.name} className="bg-gray-800 border border-gray-700 hover:border-amber-500 p-6 rounded-lg transition">
            <div className="text-amber-500 mb-3">{cap.icon}</div>
            <h3 className="text-white font-semibold mb-2">{cap.name}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{cap.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
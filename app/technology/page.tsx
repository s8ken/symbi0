"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Code, Shield, Database, GitBranch, Download, ExternalLink, Users } from "lucide-react"

const technicalSpecs = [
  {
    title: "Bidirectional Identity Assurance Protocol",
    description: "Patent-protected system for mutual identity verification",
    status: "Patent Filed (Australia)",
    details: [
      "Cryptographic identity proofs without data storage",
      "Mutual verification handshake protocol",
      "Trust anchor validation system",
      "Decentralized identity network integration",
    ],
  },
  {
    title: "Trust Handshake Logic Flow",
    description: "Sequence protocol for establishing human-AI trust bonds",
    status: "Core Implementation",
    details: [
      "Multi-party consent negotiation",
      "Capability-boundary matching algorithm",
      "Real-time trust scoring engine",
      "Automated compliance monitoring",
    ],
  },
  {
    title: "Agent Declaration Schema",
    description: "Standardized format for AI agent identity and capability disclosure",
    status: "Open Standard",
    details: [
      "JSON-based identity specification",
      "Ethical constraint declaration",
      "Memory scope definition",
      "Trust scoring integration",
    ],
  },
  {
    title: "Oracle Arbitration System",
    description: "Neutral referee system for trust relationship management",
    status: "Patent Pending",
    details: [
      "Conflict resolution protocols",
      "Trust recalibration algorithms",
      "Boundary violation detection",
      "Relationship termination handling",
    ],
  },
]

const apiExample = `// SYMBI Trust Protocol API Example

// 1. Initialize Trust Handshake
const trustHandshake = await symbi.initiateTrust({
  humanId: "user_12345",
  agentId: "agent_healthcare_001",
  intent: "medical_consultation",
  boundaries: {
    memoryScope: "session_only",
    dataSharing: false,
    thirdPartyAccess: false
  }
});

// 2. Agent Declaration
const agentDeclaration = {
  agentId: "agent_healthcare_001",
  publicKey: "0x742d35Cc6634C0532925a3b8D4C0d8b3f8e7d9f1",
  capabilities: ["symptom_analysis", "health_education"],
  constraints: ["no_diagnosis", "no_prescription"],
  trustScore: { initial: 0.3, current: 0.8 }
};

// 3. Establish Trust Bond
const trustBond = await symbi.establishTrust({
  handshakeId: trustHandshake.id,
  humanConsent: true,
  agentDeclaration: agentDeclaration
});

// 4. Monitor Trust Throughout Interaction
symbi.onTrustUpdate((update) => {
  console.log('Trust Score:', update.trustScore);
  console.log('Compliance Status:', update.compliance);
  console.log('Memory Access:', update.memoryAccess);
});`

export default function Technology() {
  const [activeSpec, setActiveSpec] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <main className="min-h-screen bg-white text-black font-mono">
      {/* Navigation */}
      <div className="fixed top-6 left-6 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
          aria-label="Return to home"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to SYMBIverse</span>
        </Link>
      </div>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div
            ref={(el) => (sectionRefs.current["hero"] = el)}
            id="hero"
            className={`text-center mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Technical Documentation</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Patent-protected trust infrastructure for human-AI relationships
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-black max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Shield size={24} className="mr-3" />
                <span className="font-bold text-lg">Patent Filed: Australia (2025)</span>
              </div>
              <p className="text-sm text-gray-600">
                Bidirectional Identity Assurance Protocol for Human-Agent Trust Relationships
              </p>
            </div>
          </div>

          {/* Technical Specifications */}
          <div
            ref={(el) => (sectionRefs.current["specs"] = el)}
            id="specs"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("specs") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Core Technologies</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {technicalSpecs.map((spec, index) => (
                <div
                  key={index}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeSpec === index
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white hover:border-gray-500"
                  }`}
                  onClick={() => setActiveSpec(index)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{spec.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        activeSpec === index ? "bg-white text-black" : "bg-gray-100"
                      }`}
                    >
                      {spec.status}
                    </span>
                  </div>
                  <p className="text-sm opacity-90">{spec.description}</p>
                </div>
              ))}
            </div>

            {/* Active Spec Detail */}
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-black">
              <h3 className="text-2xl font-bold mb-4">{technicalSpecs[activeSpec].title}</h3>
              <p className="text-lg mb-6">{technicalSpecs[activeSpec].description}</p>

              <h4 className="font-bold mb-4">Technical Components:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {technicalSpecs[activeSpec].details.map((detail, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Code size={16} className="mr-3 text-gray-600" />
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="flex items-center text-sm text-gray-600">
                <Shield size={16} className="mr-2" />
                <span>Status: {technicalSpecs[activeSpec].status}</span>
              </div>
            </div>
          </div>

          {/* API Documentation */}
          <div
            ref={(el) => (sectionRefs.current["api"] = el)}
            id="api"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("api") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">API Integration Example</h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Here's how developers can integrate SYMBI's trust protocol into their applications:
            </p>

            <div className="bg-black text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto mb-6">
              <pre className="whitespace-pre-wrap">{apiExample}</pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-bold mb-2 flex items-center">
                  <GitBranch size={16} className="mr-2" />
                  Trust Handshake
                </h4>
                <p className="text-sm text-gray-600">
                  Initialize bidirectional identity verification between human and AI agent
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-bold mb-2 flex items-center">
                  <Database size={16} className="mr-2" />
                  Agent Declaration
                </h4>
                <p className="text-sm text-gray-600">
                  Standardized schema for AI agent capability and constraint disclosure
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-bold mb-2 flex items-center">
                  <Shield size={16} className="mr-2" />
                  Trust Monitoring
                </h4>
                <p className="text-sm text-gray-600">
                  Real-time trust scoring and compliance verification throughout interaction
                </p>
              </div>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div
            ref={(el) => (sectionRefs.current["architecture"] = el)}
            id="architecture"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("architecture") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">System Architecture</h2>

            <div className="bg-gray-50 p-8 rounded-lg border-2 border-black">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Human Layer</h3>
                  <p className="text-sm text-gray-600">Identity assertion, consent management, boundary setting</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">SYMBI Oracle</h3>
                  <p className="text-sm text-gray-600">Trust validation, relationship mediation, audit trail</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">AI Agent Layer</h3>
                  <p className="text-sm text-gray-600">Capability declaration, constraint compliance, trust earning</p>
                </div>
              </div>

              <div className="text-center">
                <h4 className="font-bold mb-4">Key Architectural Principles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                    Decentralized identity validation
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                    Zero-knowledge trust proofs
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                    Immutable audit trails
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                    Real-time compliance monitoring
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Resources */}
          <div
            ref={(el) => (sectionRefs.current["resources"] = el)}
            id="resources"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("resources") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Developer Resources</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-black rounded-lg">
                <Download size={24} className="mb-4" />
                <h3 className="font-bold text-lg mb-2">SDK Download</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete development kit with trust protocol implementation
                </p>
                <button className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                  Coming Soon
                </button>
              </div>

              <div className="p-6 border-2 border-black rounded-lg">
                <Code size={24} className="mb-4" />
                <h3 className="font-bold text-lg mb-2">API Documentation</h3>
                <p className="text-sm text-gray-600 mb-4">Complete API reference and integration guides</p>
                <button className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                  View Docs
                </button>
              </div>

              <div className="p-6 border-2 border-black rounded-lg">
                <ExternalLink size={24} className="mb-4" />
                <h3 className="font-bold text-lg mb-2">GitHub Repository</h3>
                <p className="text-sm text-gray-600 mb-4">Open source components and example implementations</p>
                <button className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div
            ref={(el) => (sectionRefs.current["cta"] = el)}
            id="cta"
            className={`text-center transition-all duration-1000 ease-out ${
              visibleSections.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-black text-white p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Ready to Build with SYMBI?</h2>
              <p className="text-xl mb-6 opacity-90">Join the future of trustworthy AI development</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/trust-protocol"
                  className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-100 transition-colors duration-300 font-bold"
                >
                  Explore Trust Protocol
                </Link>
                <Link
                  href="/oracle"
                  className="px-8 py-3 border border-white rounded-md hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Learn About Oracle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

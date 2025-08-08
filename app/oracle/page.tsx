"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Database, Shield, Eye, GitBranch } from 'lucide-react'

const oracleFeatures = [
  {
    icon: Shield,
    title: "Identity Validation",
    description: "Verifies both human and AI identities without storing personal data",
    details: [
      "Cryptographic proof validation",
      "Trust history verification",
      "Identity assertion without storage",
      "Decentralized validation network",
    ],
  },
  {
    icon: Eye,
    title: "Transparency Layer",
    description: "Creates joint visibility between human and AI agent",
    details: [
      "Mutual decision trail access",
      "Memory scope visualization",
      "Real-time trust scoring",
      "Audit trail generation",
    ],
  },
  {
    icon: Database,
    title: "Memory Management",
    description: "Manages scoped, consented memory access for AI agents",
    details: [
      "Event-based memory retention",
      "Human-verified data storage",
      "Consent-driven access control",
      "Automatic data expiration",
    ],
  },
  {
    icon: GitBranch,
    title: "Trust Arbitration",
    description: "Mediates disputes and manages trust recalibration",
    details: [
      "Conflict resolution protocols",
      "Trust score adjustments",
      "Boundary violation detection",
      "Relationship termination handling",
    ],
  },
]

const agentSchema = {
  agentId: "agent_healthcare_001",
  publicKey: "0x742d35Cc6634C0532925a3b8D4C0d8b3f8e7d9f1",
  registeredWith: "symbi.world/oracle",
  declaredAt: "2025-01-11T10:30:00Z",
  agentType: "medical-advisory",
  identityTraits: {
    emotionModel: "clinical-empathy",
    voiceTone: "professional-supportive",
    proactivity: "low",
    memoryRetention: "session-based",
    ethicalConstraints: [
      "Never provide medical diagnosis",
      "Always recommend professional consultation",
      "Respect patient confidentiality",
    ],
  },
  trustScore: {
    initial: 0.3,
    current: 0.8,
    scale: "0.0 to 1.0",
    lastUpdated: "2025-01-11T15:45:00Z",
  },
}

export default function Oracle() {
  const [activeFeature, setActiveFeature] = useState(0)
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The SYMBI Oracle</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              The neutral referee that enables trust without ownership
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-black max-w-4xl mx-auto">
              <p className="text-lg font-semibold mb-2">"SYMBI doesn't own identities. It referees relationships."</p>
              <p className="text-sm text-gray-600">
                The oracle validates, mediates, and maintains trust between humans and AI agents without storing
                personal data or controlling the relationship.
              </p>
            </div>
          </div>

          {/* Oracle Functions */}
          <div
            ref={(el) => (sectionRefs.current["functions"] = el)}
            id="functions"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("functions") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">How the Oracle Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {oracleFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeFeature === index
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white hover:border-gray-500"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-center mb-4">
                      <Icon size={24} className="mr-3" />
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                    </div>
                    <p className="text-sm opacity-90">{feature.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Active Feature Detail */}
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-black">
              <div className="flex items-center mb-6">
                {React.createElement(oracleFeatures[activeFeature].icon, { size: 32, className: "mr-4" })}
                <h3 className="text-2xl font-bold">{oracleFeatures[activeFeature].title}</h3>
              </div>
              <p className="text-lg mb-6">{oracleFeatures[activeFeature].description}</p>

              <h4 className="font-bold mb-4">Key Capabilities:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {oracleFeatures[activeFeature].details.map((detail, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Agent Declaration Example */}
          <div
            ref={(el) => (sectionRefs.current["declaration"] = el)}
            id="declaration"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("declaration") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Agent Identity Declaration</h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Every AI agent must declare its identity, capabilities, and constraints before establishing trust. Here's
              an example of a healthcare advisory agent's declaration:
            </p>

            <div className="bg-black text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap">{JSON.stringify(agentSchema, null, 2)}</pre>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-bold mb-2">Identity Traits</h4>
                <p className="text-sm text-gray-600">
                  Defines behavioral patterns, emotional models, and interaction style
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-bold mb-2">Ethical Constraints</h4>
                <p className="text-sm text-gray-600">Hard-coded limitations that cannot be overridden by the agent</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-bold mb-2">Trust Scoring</h4>
                <p className="text-sm text-gray-600">Dynamic trust level based on behavior and user feedback</p>
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
              <h2 className="text-3xl font-bold mb-4">Explore the Technical Implementation</h2>
              <p className="text-xl mb-6 opacity-90">
                Dive deeper into the patent-protected technology behind SYMBI's trust infrastructure
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/technology"
                  className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-100 transition-colors duration-300 font-bold"
                >
                  Technical Documentation
                </Link>
                <Link
                  href="/trust-protocol"
                  className="px-8 py-3 border border-white rounded-md hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Back to Trust Protocol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

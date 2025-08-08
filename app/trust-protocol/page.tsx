"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Shield, Users, Eye, CheckCircle, AlertCircle } from 'lucide-react'

const trustSteps = [
  {
    id: 1,
    title: "Human Identity Declaration",
    description: "User provides consent envelope with identity assertion",
    icon: Users,
    color: "#2563eb",
  },
  {
    id: 2,
    title: "Agent Identity Declaration",
    description: "AI provides role profile and capability disclosure",
    icon: Shield,
    color: "#7c3aed",
  },
  {
    id: 3,
    title: "Mutual Validation",
    description: "SYMBI oracle validates both parties and creates joint visibility",
    icon: Eye,
    color: "#059669",
  },
  {
    id: 4,
    title: "Trust Bond Formation",
    description: "Mutual trust gate established with ongoing monitoring",
    icon: CheckCircle,
    color: "#dc2626",
  },
]

const comparisonData = [
  {
    aspect: "Identity Verification",
    traditional: "User login only",
    symbi: "Bidirectional verification",
  },
  {
    aspect: "Consent Model",
    traditional: "Terms & conditions",
    symbi: "Explicit mutual agreement",
  },
  {
    aspect: "Trust Mechanism",
    traditional: "Assumed trust",
    symbi: "Earned & monitored trust",
  },
  {
    aspect: "Transparency",
    traditional: "Black box decisions",
    symbi: "Auditable trust trail",
  },
  {
    aspect: "Memory Access",
    traditional: "Unlimited data mining",
    symbi: "Scoped, consented access",
  },
]

export default function TrustProtocol() {
  const [activeStep, setActiveStep] = useState(1)
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The Trust Protocol</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The world's first bidirectional identity assurance system for human-AI relationships
            </p>
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-black max-w-3xl mx-auto">
              <p className="text-lg font-semibold">"I need to know you are you. You need to know I am me."</p>
              <p className="text-sm text-gray-600 mt-2">— The Foundation of Mutual Trust</p>
            </div>
          </div>

          {/* Interactive Trust Flow */}
          <div
            ref={(el) => (sectionRefs.current["flow"] = el)}
            id="flow"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("flow") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">How Trust is Established</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {trustSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.id}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeStep === step.id
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white hover:border-gray-500"
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-2 rounded-full mr-3 ${activeStep === step.id ? "bg-white text-black" : "bg-gray-100"}`}
                      >
                        <Icon size={20} />
                      </div>
                      <span className="font-bold text-sm">Step {step.id}</span>
                    </div>
                    <h3 className="font-bold mb-2 text-sm">{step.title}</h3>
                    <p className="text-xs opacity-80">{step.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Active Step Detail */}
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-black">
              <div className="flex items-center mb-4">
                {React.createElement(trustSteps[activeStep - 1].icon, { size: 32, className: "mr-4" })}
                <h3 className="text-2xl font-bold">{trustSteps[activeStep - 1].title}</h3>
              </div>
              <p className="text-lg mb-6">{trustSteps[activeStep - 1].description}</p>

              {activeStep === 1 && (
                <div className="space-y-4">
                  <h4 className="font-bold">What the Human Provides:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Identity assertion with consent envelope</li>
                    <li>Boundary preferences and limitations</li>
                    <li>Intent declaration for the interaction</li>
                    <li>Trust anchors from previous interactions</li>
                  </ul>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <h4 className="font-bold">What the AI Agent Declares:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Capability profile and limitations</li>
                    <li>Memory scope and retention policies</li>
                    <li>Ethical constraints and behavioral rules</li>
                    <li>Signed identity with cryptographic proof</li>
                  </ul>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <h4 className="font-bold">SYMBI Oracle Validation:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Verifies human identity against trust history</li>
                    <li>Validates AI agent credentials and code signature</li>
                    <li>Creates joint visibility layer for both parties</li>
                    <li>Establishes audit trail for all interactions</li>
                  </ul>
                </div>
              )}

              {activeStep === 4 && (
                <div className="space-y-4">
                  <h4 className="font-bold">Ongoing Trust Management:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Continuous trust scoring based on behavior</li>
                    <li>Real-time feedback and adjustment mechanisms</li>
                    <li>Transparent decision trail for all actions</li>
                    <li>Revocation and exit protocols available</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Comparison Table */}
          <div
            ref={(el) => (sectionRefs.current["comparison"] = el)}
            id="comparison"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("comparison") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Traditional AI vs SYMBI Trust Model</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="p-4 text-left font-bold">Aspect</th>
                    <th className="p-4 text-left font-bold">Traditional AI</th>
                    <th className="p-4 text-left font-bold">SYMBI Protocol</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-4 font-semibold border-r border-gray-300">{row.aspect}</td>
                      <td className="p-4 text-red-600 border-r border-gray-300">
                        <div className="flex items-center">
                          <AlertCircle size={16} className="mr-2" />
                          {row.traditional}
                        </div>
                      </td>
                      <td className="p-4 text-green-600">
                        <div className="flex items-center">
                          <CheckCircle size={16} className="mr-2" />
                          {row.symbi}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Use Cases */}
          <div
            ref={(el) => (sectionRefs.current["usecases"] = el)}
            id="usecases"
            className={`mb-20 transition-all duration-1000 ease-out ${
              visibleSections.has("usecases") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Real-World Applications</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-black rounded-lg">
                <h3 className="font-bold text-xl mb-4">Healthcare</h3>
                <p className="text-sm mb-4">
                  Patient gives conditional consent to AI for lab result interpretation. Trust earned through accurate,
                  sensitive summaries. Automatically revoked if agent accesses unauthorized health domains.
                </p>
                <div className="text-xs text-gray-600">
                  <strong>Trust Mechanism:</strong> Medical data scope limiting
                </div>
              </div>

              <div className="p-6 border-2 border-black rounded-lg">
                <h3 className="font-bold text-xl mb-4">Legal</h3>
                <p className="text-sm mb-4">
                  AI assists with digital will creation. Each step logged with human feedback. Trust trails serve as
                  admissible records. Agent cannot suggest unauthorized actions.
                </p>
                <div className="text-xs text-gray-600">
                  <strong>Trust Mechanism:</strong> Legal action authorization
                </div>
              </div>

              <div className="p-6 border-2 border-black rounded-lg">
                <h3 className="font-bold text-xl mb-4">Education</h3>
                <p className="text-sm mb-4">
                  AI learning companion for student with dyslexia. Trust increases when AI adapts reading rhythm.
                  Student must opt-in each session for memory access.
                </p>
                <div className="text-xs text-gray-600">
                  <strong>Trust Mechanism:</strong> Adaptive learning consent
                </div>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Experience True AI Trust?</h2>
              <p className="text-xl mb-6 opacity-90">Explore how SYMBI's oracle system referees these relationships</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/oracle"
                  className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-100 transition-colors duration-300 font-bold"
                >
                  Explore the Oracle
                </Link>
                <Link
                  href="/technology"
                  className="px-8 py-3 border border-white rounded-md hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Technical Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

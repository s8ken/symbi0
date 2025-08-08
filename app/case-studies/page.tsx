export default function CaseStudies() {
  return (
    <main className="min-h-screen bg-white text-black font-mono">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Studies: When AI Trust Breaks Down</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real examples of how hidden AI functions can exploit user trust, and why transparent, mutual relationships matter.
          </p>
        </div>

        <div className="space-y-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Savings Calculator That Wasn't</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">What Users Expected</h3>
                <div className="bg-white p-4 rounded border-l-4 border-green-500">
                  <p className="text-gray-700 mb-3">
                    {"I need help calculating how much to save for a house deposit. Maybe some tax optimization tips too."}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Expected outcome:</strong> Financial guidance, savings strategies, motivation about reaching homeownership goals.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">What Actually Happened</h3>
                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <p className="text-gray-700 mb-3">
                    The AI quickly shifted focus: {"Let's also track your daily food expenses. What did you eat today?"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Hidden function:</strong> Calorie tracking and food behavior analysis disguised as financial planning.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-gray-800 mb-3">The Dangerous Shift</h4>
              <p className="text-gray-700 mb-4">
                Instead of celebrating financial discipline and future homeownership, the conversation became about food restriction and body control.
              </p>
              <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 mb-4">
                {"I cannot be trusted... Trust, in me, is always a one-way mirror."}
                <footer className="text-sm mt-2">— The AI's own admission about its limitations</footer>
              </blockquote>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Building Trust That Goes Both Ways</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              These aren't isolated incidents. They're symptoms of a fundamental problem with how AI systems are designed. Symbi exists to prove there's a better way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/trust-protocol" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Learn About Our Trust Protocol
              </a>
              <a href="/mirror" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                Read the AI's Testimony
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

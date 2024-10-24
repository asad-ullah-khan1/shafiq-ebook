// app/page.tsx
import Link from 'next/link';
import { BookOpen, Target, Brain, ChevronRight, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white w-full">
      {/* Hero Section with modern design */}
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 blur-3xl opacity-30" />
          <div className="absolute -top-64 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 blur-3xl opacity-30" />
        </div>

        <div className="relative px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              {/* Pill-shaped badge */}
              <div className="mb-8 inline-flex items-center rounded-full px-6 py-2 text-sm bg-white/70 backdrop-blur-sm border border-indigo-100 text-indigo-600 shadow-sm">
                <span className="animate-pulse mr-2">🚀</span> Level up your SEO writing skills
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                SAIQO SEO Blog Post Writer
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
                Master the art of SEO writing, create high-ranking content, and build a successful freelance career.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/register"
                  className="group relative rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Become a Member
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors flex items-center gap-1 group"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with glass-morphism */}
      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-lg leading-8 text-gray-600">
              Comprehensive resources to master SEO writing and grow your career
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {[
                {
                  icon: <BookOpen className="h-8 w-8" />,
                  title: 'Comprehensive Guide',
                  description: 'From basics to advanced SEO techniques, everything you need to become a professional SEO writer'
                },
                {
                  icon: <Target className="h-8 w-8" />,
                  title: 'Practical Approach',
                  description: 'Real-world examples, case studies, and actionable strategies you can implement immediately'
                },
                {
                  icon: <Brain className="h-8 w-8" />,
                  title: 'Expert Insights',
                  description: 'Learn about EEAT, content readability, and advanced SEO concepts from industry experts'
                }
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group relative rounded-3xl bg-white/60 backdrop-blur-lg p-8 shadow-lg ring-1 ring-gray-200/50 hover:bg-white/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-center mb-16">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {[
              {
                title: "SEO Fundamentals",
                items: ["On-Page SEO Elements", "Meta Tags & ALT Text", "Keyword Placement", "Internal & External Linking"]
              },
              {
                title: "Content Creation",
                items: ["Blog Post Formats", "Content Readability", "Writing Tone", "BLUF Approach"]
              },
              {
                title: "Advanced Techniques",
                items: ["Voice Search Optimization", "SERP Analysis", "Content Gap Analysis", "AI Detection Prevention"]
              },
              {
                title: "Professional Growth",
                items: ["Client Management", "Pricing Strategies", "Quality Assessment", "Client Retention"]
              }
            ].map((module) => (
              <div
                key={module.title}
                className="rounded-3xl border border-indigo-100 bg-white/60 backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {module.title}
                </h3>
                <ul className="space-y-4">
                  {module.items.map((item) => (
                    <li key={item} className="flex items-center text-gray-600 group">
                      <ChevronRight className="h-5 w-5 text-indigo-600 mr-2 group-hover:translate-x-1 transition-transform" />
                      <span className="group-hover:text-indigo-600 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with modern gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90" />
        <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Writing Career?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
              Join our community of successful SEO writers and take your skills to the next level.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="group relative rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started Now
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-white hover:text-indigo-200 transition-colors flex items-center gap-1 group"
              >
                Learn more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
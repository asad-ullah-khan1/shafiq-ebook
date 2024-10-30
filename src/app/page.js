import Link from 'next/link';
import { ArrowRight, BookOpen, Brain, Target, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-200/30 to-pink-200/30 blur-3xl animate-pulse delay-100" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-purple-200/30 to-pink-200/30 blur-3xl animate-pulse delay-200" />
      </div>

      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              The Saiqo Writer
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-8">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #8bb456, #8bb456)',
                }}
              >
                SAIQO SEO Blog Post Writing eBook
              </span>
            </h1>

            <h2 className='text-2xl md:text-2xl font-extrabold mb-8'>An eBook for newbies & mid-level SEO writers. </h2>
            <h2 className='text-2xl md:text-2xl font-extrabold mb-8'>Write better blog posts for your clients and earn legit (& more) money. </h2>

          </div>



          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-indigo-50 mb-16">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-4 text-gray-700">
                <p>Hey, this is the 17th time I am writing this page…</p>
                <p>You know I am an SEO blog writer & recently, I fell in love with copywriting…</p>
                <p>So, I tried to use all those phrases that can emotionally grab your attention…touch your pain points, and convince you to read the whole eBook….</p>
                <p>But I erased them.</p>
                <p>And you know, I tried to flex how SEO blog writing changed my life, gave me freedom, and blah blah…</p>
                <p>But I couldn't.</p>
                <p>Because, honestly, I don't have an SEO blog writing magic wand that can change your life overnight…</p>
              </div>

              <div className="my-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-500">
                <p className="text-gray-800">This eBook is 27k+ words (90 pages) long and contains practical and logical information throughout…which means it will put you to work. The proper reading will take 5-7 days, and if you want to do the assignments and take 1-1 masterclasses, then add another week.</p>
              </div>

              <div className="space-y-4 text-gray-700">
                <p>I've done my job. Now it's up to you to read it mindfully and heartfully and then apply everything you learn along the way… or take it as just another eBook…and curse me and your decision to buy it.</p>
                <p>So, I don't want you to buy it emotionally…or be snared with my success story.</p>
                <p>I'm a self-taught SEO blog writer…I never purchased (or found) any SEO blog writing course. Everything shared in this eBook is what I learned in 4 years of working with clients and delivering projects.</p>
                <p>It's NOT a course, anyway. And I don't intend to sell it to the masses.</p>
                <p>It will cost you a small amount because free stuff mostly gets ignored, and I don't want my 7-month-long efforts to go to waste. (Yes, it took me 200+ days.)</p>
              </div>
            </div>
          </div>

          {/* Content Modules */}
          <div className="mb-16">

            <h4 className='text-2xl font-bold text-center mb-5'>So if you’re ready to put yourself in some work…</h4>

            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent" style={{
              backgroundImage: 'linear-gradient(90deg, #8bb456, #8bb456)',
            }}>
              Here is what you’ll exactly have
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Unit 1: Some Basics Before You Get into Writing",
                  items: [
                    "Who needs Blog Posts (it explains your ideal prospects)",
                    "What is your responsibility as an SEO writer",
                    "Types of Clients  (and which to avoid)",
                    "Formats of Blog Posts with examples",
                    "& More",
                    "A little homework"
                  ],
                  gradient: ""
                },
                {
                  title: "Unit 2: Important Concepts",
                  items: [
                    "On-page SEO Elements",
                    "How to Satisfy EEAT (as a generalist writer)",
                    "Content Readability & Tone",
                    "Blog Post Formatting",
                    "AI Detection (& how to get rid of)",
                    "And MORE"
                  ],
                  gradient: "from-indigo-500 to-purple-500"
                },
                {
                  title: "Unit 3: Blog Post Pre-writing Phase",
                  items: [
                    "SERP Analysis",
                    "How to know Search intent & its type",
                    "Types of Keywords",
                    "How to Research a Topic like a Pro",
                    "Primary & Secondary Research",
                    "& Homework"
                  ],
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  title: "Unit 4: Writing Phase",
                  items: [
                    "How to create outlines",
                    "Ranking Blog Audit (analysis)",
                    "How not to Write a Blog Post",
                    "And More",
                    "Assignment",
                  ],
                  gradient: "from-pink-500 to-rose-500"
                },
                {
                  title: "And the 5th Unit answers your most pressing questions.",
                  items: [

                  ],
                  gradient: "from-pink-500 to-rose-500"
                }
              ].map((module) => (
                <div key={module.title} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-indigo-50">
                    <h3 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-600">
                      {module.title}
                    </h3>
                    <ul className="space-y-3">
                      {module.items.map((item) => (
                        <li key={item} className="flex items-start text-gray-700">
                          <CheckCircle2 className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent" style={{
              backgroundImage: 'linear-gradient(90deg, #8bb456, #8bb456)',
            }}>
              Choose Your Learning Path
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Do it Yourself */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-indigo-50">
                  <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-indigo-600">
                    Do it Yourself
                  </h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" />
                      Get the eBook
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" />
                      Do the assignments and writing yourself
                    </li>
                  </ul>
                  <div className="text-3xl font-bold text-green-600">2700 PKR</div>
                </div>
              </div>

              {/* Do it With Me */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-green-600 to-green-600 rounded-2xl p-8 shadow-xl border border-indigo-50">
                  <h3 className="text-2xl font-bold mb-6 text-white">
                    Do it With Me
                  </h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-white">
                      <CheckCircle2 className="w-5 h-5 mr-3" />
                      Get the eBook
                    </li>
                    <li className="flex items-center text-white">
                      <CheckCircle2 className="w-5 h-5 mr-3" />
                      Have me review your assignments
                    </li>
                    <li className="flex items-center text-white">
                      <CheckCircle2 className="w-5 h-5 mr-3" />
                      Two 1-1 masterclasses
                    </li>
                  </ul>
                  <div className="text-3xl font-bold text-white">4800 PKR</div>
                </div>
              </div>
            </div>

            <div className="py-12 my-5 px-6 bg-transparent">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  What are these assignments and Homework about?
                </h2>
              </div>

              <div className="mt-10 space-y-10 max-w-3xl mx-auto">
                <div className="bg-white p-6 shadow-lg rounded-lg">
                  <h3 className="text-2xl font-semibold text-gray-700">Assignment #1:</h3>
                  <p className="text-gray-600 mt-2">
                    In the eBook, I selected a topic to show you how to research and outline a topic. It’s kinda real use case demo. So we have the outlines and research stuff done, but instead of writing the blog post, I audited (in full detail) the ranking blog posts on the same topic. So the writing is left, and your first assignment will be to complete the blog post.
                  </p>
                </div>

                <div className="bg-white p-6 shadow-lg rounded-lg">
                  <h3 className="text-2xl font-semibold text-gray-700">Assignment #2:</h3>
                  <p className="text-gray-600 mt-2">
                    You can select a topic of your choice and do the research, outline, and writing based on everything you learned in the eBook.
                  </p>
                </div>

                <div className="bg-white p-6 shadow-lg rounded-lg">
                  <h3 className="text-2xl font-semibold text-gray-700">Assignments Review (Only Tier 2)</h3>
                  <p className="text-gray-600 mt-2">
                    If you choose tier two, I'll review those blog posts, leave suggestions and comments on Gdoc, and give detailed feedback in voice notes on WhatsApp.
                  </p>
                </div>

                <div className="bg-white p-6 shadow-lg rounded-lg">
                  <h3 className="text-2xl font-semibold text-gray-700">Homework:</h3>
                  <p className="text-gray-600 mt-2">
                    There are some questions that I asked & and you'll find the answers.
                    If you choose tier two, I will check them and share my opinion.

                  </p>
                </div>

                <div className="bg-white p-6 shadow-lg rounded-lg">
                  <h3 className="text-2xl font-semibold text-gray-700">Masterclasses</h3>
                  <p className="text-gray-600 mt-2">
                    Tier two includes two 1-on-1 masterclasses.
                    In the first masterclass, we'll cover any concepts from the eBook that you found unclear. We’ll also address any additional concerns you have about freelance SEO blog writing.
                  </p>
                  <p className="text-gray-600 mt-2">
                    In the 2ndmasterclass, we will discuss your writing (based on the blog posts you wrote), how you can further upskill and improve, etc.

                    If you have written less than 20 blog posts for clients, I’d highly suggest you tier two. And note that there are limited slots for tier two.

                  </p>
                </div>
              </div>
            </div>

            <p className="text-center mt-8 text-lg font-medium text-green-600">
              If you are a newbie, I'd highly suggest the 2nd one.
            </p>
            <div className='flex items-center justify-center my-5'>

              <Link className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
                href='/register' >Register Now!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
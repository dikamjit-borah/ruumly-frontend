export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-purple-900/20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-800">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              ✨ Welcome to the future
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            <span className="block text-gray-900 dark:text-white">
              Beautiful & Modern
            </span>
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Next.js Boilerplate
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
            A minimalist, elegant, and modern starting point for your next project.
            Built with Next.js 16, TypeScript, and Tailwind CSS.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all">
              Get Started
            </button>
            <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">TypeScript</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">Fast</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Performance</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">Modern</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Design</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

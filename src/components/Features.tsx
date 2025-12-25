export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built with Next.js 15 for optimal performance and speed",
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description: "Modern, minimalist UI with attention to every detail",
    },
    {
      icon: "📱",
      title: "Fully Responsive",
      description: "Looks great on desktop, tablet, and mobile devices",
    },
    {
      icon: "🔒",
      title: "Type Safe",
      description: "Written in TypeScript for better developer experience",
    },
    {
      icon: "🎭",
      title: "Dark Mode",
      description: "Automatic dark mode support based on system preferences",
    },
    {
      icon: "🚀",
      title: "Production Ready",
      description: "Optimized and ready to deploy to production",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to build amazing web applications
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

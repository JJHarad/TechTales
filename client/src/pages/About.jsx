export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Header Section */}
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-white mb-6">About TechVerse Blog</h1>
        <p className="text-lg text-gray-400">
          Welcome to <span className="text-purple-500 font-semibold">TechVerse Blog</span>! Your go-to source for insights on artificial intelligence, machine learning, and technology trends.
        </p>
      </div>

      {/* Information Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
          <p className="text-gray-400">
            To make advanced technology accessible through clear, insightful content.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Team</h2>
          <p className="text-gray-400">
            A diverse group of  researchers, developers, and tech enthusiasts dedicated to sharing knowledge.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Achievements</h2>
          <p className="text-gray-400">
            Recognized as a top source in education, reaching millions worldwide.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Goals</h2>
          <p className="text-gray-400">
            To empower individuals and organizations with the knowledge needed to succeed in future.
          </p>
        </div>
      </div>
    </div>
  );
}

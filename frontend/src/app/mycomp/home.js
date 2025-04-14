// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center px-4">
      <header className="w-full max-w-5xl py-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">CodeFlow</h1>
        <nav className="space-x-4">
          <Link href="/editor" className="text-blue-600 hover:underline">
            Code Editor
          </Link>
          <Link href="/about" className="text-blue-600 hover:underline">
            About
          </Link>
        </nav>
      </header>

      <section className="text-center mt-16">
        <h2 className="text-4xl font-bold mb-4">AI-Powered Code Assistant</h2>
        <p className="text-lg text-gray-600 mb-6">
          Write, debug, and learn code with real-time AI feedback and Groq inference.
        </p>
        <Link
          href="/editor"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>

      <footer className="mt-auto py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CodeFlow. Built with ❤️ using Next.js, Groq, and Tailwind CSS.
      </footer>
    </main>
  );
}

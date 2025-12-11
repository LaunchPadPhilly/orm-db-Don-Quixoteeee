export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Chris Keels. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with <span className="text-blue-400">Next.js</span> &amp; <span className="text-cyan-400">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
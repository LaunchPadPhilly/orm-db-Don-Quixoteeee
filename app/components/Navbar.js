"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all duration-300">
              Portfolio
            </Link>
            <p className="hidden sm:block text-sm text-gray-300">Chris Keels — Web Developer</p>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              About
            </Link>
            <Link href="/projects" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Projects
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle navigation"
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md text-gray-200 hover:bg-gray-800 focus:outline-none"
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-4 space-y-2">
            <Link href="/" className="block text-gray-200 px-2 py-2 rounded hover:bg-gray-700">Home</Link>
            <Link href="/about" className="block text-gray-200 px-2 py-2 rounded hover:bg-gray-700">About</Link>
            <Link href="/projects" className="block text-gray-200 px-2 py-2 rounded hover:bg-gray-700">Projects</Link>
            <Link href="/contact" className="block text-gray-200 px-2 py-2 rounded hover:bg-gray-700">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
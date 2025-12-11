import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'Portfolio',
  description: 'Student portfolio site',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
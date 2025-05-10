
import { useState, useEffect, useRef } from "react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { Menu, X, Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { name: "How It Works", href: "how-it-works" },
  { name: "Why Choose Us", href: "why-choose-us" },
  { name: "Testimonials", href: "testimonials" },
  { name: "Contact", href: "contact" },
]

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="#" className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-primary">S</span>
                </div>
                <div className="absolute -inset-0.5 rounded-xl bg-primary/20 blur-sm -z-10"></div>
              </div>
              <span className="text-xl font-medium">
                Soft<span className="font-bold text-primary">Sell</span>
              </span>
            </a>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 text-sm rounded-lg hover:bg-accent/50 transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <motion.div
            className="hidden md:flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={toggleTheme} variant="minimal" size="icon" className="rounded-xl">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            <Button variant="default">Get Started</Button>
          </motion.div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center">
            <Button onClick={toggleTheme} variant="minimal" size="icon" className="mr-2 rounded-xl">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            <Button
              variant="minimal"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden glass mt-2 rounded-xl mx-4 overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 space-y-3">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileTap={{ scale: 0.95 }}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                {item.name}
              </motion.button>
            ))}
            <Button variant="default" className="w-full mt-4">
              Get Started
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Navbar

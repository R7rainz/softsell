import { useState } from "react"
import { ThemeProvider } from "./components/theme-provider"
import Header from "./components/Header"
import HeroSection from "./sections/HeroSection"
import HowItWorks from "./sections/HowItWorks"
import WhyChooseUs from "./sections/WhyChooseUs"
import Reviews from "./sections/Reviews"
import ContactForm from "./sections/ContactForm"
import Footer from "./components/Footer"
import AIChat from "./components/AIChat"

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <HeroSection />
          <HowItWorks />
          <WhyChooseUs />
          <Reviews />
          <ContactForm />
        </main>
        <Footer />
        <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      </div>
    </ThemeProvider>
  )
}

export default App

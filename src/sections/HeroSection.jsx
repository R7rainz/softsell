"use client"

import { useRef } from "react"
import { Button } from "../components/ui/button"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import ParticleBackground from "../components/ParticleBackground"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const Hero = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const { scrollY } = useScroll()

  // Parallax effect
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5])

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.5,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" ref={containerRef}>
      {/* Interactive background */}
      <ParticleBackground />

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="md:w-1/2 md:pr-8" style={{ opacity, y: y1 }}>
            <motion.div variants={itemVariants}>
              <motion.span
                className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Maximize Your Software Investment
              </motion.span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              Turn Unused Licenses Into <span className="text-primary">Revenue</span>
            </motion.h1>

            <motion.p className="text-xl text-foreground/80 mb-8 max-w-lg" variants={itemVariants}>
              SoftSell provides a secure marketplace for businesses to sell their excess software licenses, turning
              dormant assets into immediate capital.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button variant="default" size="lg" className="group">
                  <span>Sell My Licenses</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button variant="minimal" size="lg">
                  Get a Quote
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8 space-y-3"
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {["Secure Transactions", "24-Hour Valuation", "Competitive Rates"].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm text-foreground/80">{feature}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="md:w-1/2" style={{ y: y2 }}>
            <motion.div
              className="relative"
              variants={imageVariants}
              animate={{
                y: [0, -15, 0],
                transition: {
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur opacity-30 animate-pulse-subtle"></div>

              {/* Main image */}
              <div className="relative glass rounded-2xl shadow-xl overflow-hidden border border-white/10">
                <div className="p-6">
                  {/* Dashboard mockup */}
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <div className="bg-secondary/90 p-2 flex items-center">
                      <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="mx-auto text-xs text-foreground/80">SoftSell Dashboard</div>
                    </div>
                    <img
                      src="/placeholder.svg?height=400&width=600&text=License+Management"
                      alt="Software License Management Dashboard"
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 glass rounded-lg shadow-lg p-3 text-sm"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="font-semibold text-primary">+$12,500</div>
                    <div className="text-xs text-foreground/70">Revenue Generated</div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 glass rounded-lg shadow-lg p-3 text-sm"
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: 1,
                    }}
                  >
                    <div className="font-semibold text-green-500">24 Hours</div>
                    <div className="text-xs text-foreground/70">Average Processing Time</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-8 h-12 rounded-full border-2 border-primary/30 flex justify-center p-2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <motion.div
            className="w-1 h-3 bg-primary rounded-full"
            animate={{
              y: [0, 8, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero

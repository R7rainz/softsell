import { useRef, useEffect } from "react"
import { useTheme } from "./theme-provider"

const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let particles = []

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.color = theme === "dark" ? "rgba(52, 211, 153, 0.2)" : "rgba(16, 185, 129, 0.1)"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx.save()
        ctx.fillStyle = this.color
        ctx.shadowColor = this.color
        ctx.shadowBlur = 100 // Increase this for a stronger glow
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }      
    }

    // Initialize particles
    const init = () => {
      particles = []
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.04), 80)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between particles
      ctx.strokeStyle = theme === "dark" ? "rgba(52, 211, 153, 0.03)" : "rgba(16, 185, 129, 0.02)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    // Mouse interaction
    const mouse = {
      x: undefined,
      y: undefined,
      radius: 150,
    }

    canvas.addEventListener("mousemove", (event) => {
      mouse.x = event.x
      mouse.y = event.y

      // Attract particles to mouse
      particles.forEach((particle) => {
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouse.radius - distance) / mouse.radius

          particle.speedX -= Math.cos(angle) * force * 0.2
          particle.speedY -= Math.sin(angle) * force * 0.2

          // Limit speed
          const maxSpeed = 1.5
          const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
          if (speed > maxSpeed) {
            particle.speedX = (particle.speedX / speed) * maxSpeed
            particle.speedY = (particle.speedY / speed) * maxSpeed
          }
        }
      })
    })

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 opacity-60" />
}

export default ParticleBackground

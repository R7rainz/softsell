import { useRef, useEffect } from "react"
import { useTheme } from "./theme-provider"

const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let elements = []

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    const elementTypes = [
      "license", 
      "code", 
      "package", 
      "binary", 
      "transfer", 
    ]

    class SoftwareElement {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 20 + 10
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.type = elementTypes[Math.floor(Math.random() * elementTypes.length)]
        this.opacity = Math.random() * 0.3 + 0.1
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() * 0.01 - 0.005) * (Math.random() > 0.5 ? 1 : -1)
        this.color =
          theme === "dark" ? "rgba(45, 212, 191, " + this.opacity + ")" : "rgba(20, 184, 166, " + this.opacity + ")"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed

        if (this.x < -this.size) this.x = canvas.width + this.size
        if (this.x > canvas.width + this.size) this.x = -this.size
        if (this.y < -this.size) this.y = canvas.height + this.size
        if (this.y > canvas.height + this.size) this.y = -this.size
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color
        ctx.lineWidth = 1

        switch (this.type) {
          case "license":
            this.drawLicenseKey()
            break
          case "code":
            this.drawCodeSnippet()
            break
          case "package":
            this.drawSoftwarePackage()
            break
          case "binary":
            this.drawBinaryData()
            break
          case "transfer":
            this.drawTransferArrow()
            break
        }

        ctx.restore()
      }

      drawLicenseKey() {
        const width = this.size * 1.5
        const height = this.size * 0.6

        ctx.strokeRect(-width / 2, -height / 2, width, height)

        const segments = 4
        const segWidth = width / segments

        for (let i = 1; i < segments; i++) {
          ctx.beginPath()
          ctx.moveTo(-width / 2 + i * segWidth, -height / 2)
          ctx.lineTo(-width / 2 + i * segWidth, height / 2)
          ctx.stroke()
        }
      }

      drawCodeSnippet() {
        const size = this.size * 0.8

        ctx.beginPath()
        ctx.moveTo(-size / 2, -size / 2)
        ctx.lineTo(-size / 4, -size / 2)
        ctx.moveTo(-size / 2, -size / 2)
        ctx.lineTo(-size / 2, size / 2)
        ctx.moveTo(-size / 2, size / 2)
        ctx.lineTo(-size / 4, size / 2)

        ctx.moveTo(size / 2, -size / 2)
        ctx.lineTo(size / 4, -size / 2)
        ctx.moveTo(size / 2, -size / 2)
        ctx.lineTo(size / 2, size / 2)
        ctx.moveTo(size / 2, size / 2)
        ctx.lineTo(size / 4, size / 2)
        ctx.stroke()

        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.moveTo(-size / 3, -size / 3 + (i * size) / 3)
          ctx.lineTo(size / 3, -size / 3 + (i * size) / 3)
          ctx.stroke()
        }
      }

      drawSoftwarePackage() {
        const size = this.size

        ctx.strokeRect(-size / 2, -size / 2, size, size)

        ctx.beginPath()
        ctx.arc(0, 0, size / 4, 0, Math.PI * 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, -size / 6)
        ctx.lineTo(0, size / 6)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(-size / 6, 0)
        ctx.lineTo(0, size / 6)
        ctx.lineTo(size / 6, 0)
        ctx.stroke()
      }

      drawBinaryData() {
        const size = this.size * 0.6

        ctx.beginPath()
        ctx.arc(-size / 2, 0, size / 3, 0, Math.PI * 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(size / 3, -size / 3)
        ctx.lineTo(size / 3, size / 3)
        ctx.stroke()
      }

      drawTransferArrow() {
        const size = this.size

        ctx.beginPath()
        ctx.moveTo(-size / 2, 0)
        ctx.lineTo(size / 2, 0)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(size / 2, 0)
        ctx.lineTo(size / 3, -size / 4)
        ctx.moveTo(size / 2, 0)
        ctx.lineTo(size / 3, size / 4)
        ctx.stroke()

        for (let i = 0; i < 3; i++) {
          const position = -size / 2 + (i * size) / 3
          ctx.beginPath()
          ctx.arc(position, 0, size / 10, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const init = () => {
      elements = []
      const elementCount = Math.min(Math.floor(window.innerWidth * 0.02), 40)
      for (let i = 0; i < elementCount; i++) {
        elements.push(new SoftwareElement())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = theme === "dark" ? "rgba(45, 212, 191, 0.03)" : "rgba(20, 184, 166, 0.02)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < elements.length; i++) {
        for (let j = i; j < elements.length; j++) {
          const dx = elements[i].x - elements[j].x
          const dy = elements[i].y - elements[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(elements[i].x, elements[i].y)
            ctx.lineTo(elements[j].x, elements[j].y)
            ctx.stroke()
          }
        }
      }

      elements.forEach((element) => {
        element.update()
        element.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    const mouse = {
      x: undefined,
      y: undefined,
      radius: 150,
    }

    canvas.addEventListener("mousemove", (event) => {
      mouse.x = event.x
      mouse.y = event.y

      elements.forEach((element) => {
        const dx = element.x - mouse.x
        const dy = element.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouse.radius - distance) / mouse.radius

          element.speedX -= Math.cos(angle) * force * 0.2
          element.speedY -= Math.sin(angle) * force * 0.2

          const maxSpeed = 2.0
          const speed = Math.sqrt(element.speedX * element.speedX + element.speedY * element.speedY)
          if (speed > maxSpeed) {
            element.speedX = (element.speedX / speed) * maxSpeed
            element.speedY = (element.speedY / speed) * maxSpeed
          }
        }
      })
    })

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10 opacity-70" />
}

export default ParticleBackground

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { CheckCircle } from "lucide-react"

const licenseTypes = [
  "Enterprise Software",
  "Creative Suite",
  "Development Tools",
  "Database Licenses",
  "Operating Systems",
  "Other",
]

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.company.trim()) newErrors.company = "Company is required"
    if (!formData.licenseType) newErrors.licenseType = "Please select a license type"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      console.log("Form submitted:", formData)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        company: "",
        licenseType: "",
        message: "",
      })
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Let’s Start a Conversation
            </motion.h2>
            <motion.p
              className="text-xl text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Tell us about your software license. We’ll respond within 24 hours.
            </motion.p>
          </div>

          <motion.div
            className="glass rounded-xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-foreground/80 mb-6">
                  Your message has been submitted successfully. We'll get back to you shortly.
                </p>
                <Button variant="minimal" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold mb-1">
                    What's your full name?
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-2 rounded-lg border ${errors.name ? "border-red-500" : "border-input"} bg-background/50 backdrop-blur-sm`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-semibold mb-1">
                    Where can we reach you?
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-2 rounded-lg border ${errors.email ? "border-red-500" : "border-input"} bg-background/50 backdrop-blur-sm`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="company" className="block text-lg font-semibold mb-1">
                    What's the name of your company?
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className={`w-full px-4 py-2 rounded-lg border ${errors.company ? "border-red-500" : "border-input"} bg-background/50 backdrop-blur-sm`}
                  />
                  {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                </div>

                <div>
                  <label htmlFor="licenseType" className="block text-lg font-semibold mb-1">
                    What type of software license are you selling?
                  </label>
                  <select
                    id="licenseType"
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.licenseType ? "border-red-500" : "border-input"} bg-background/50 backdrop-blur-sm`}
                  >
                    <option value="">Choose a license type</option>
                    {licenseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.licenseType && <p className="mt-1 text-sm text-red-500">{errors.licenseType}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-semibold mb-1">
                    Can you tell us more about the licenses?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Details about the software licenses you want to sell..."
                    className={`w-full px-4 py-2 rounded-lg border ${errors.message ? "border-red-500" : "border-input"} bg-background/50 backdrop-blur-sm`}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <Button type="submit" variant="default" className="w-full">
                  Submit
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm

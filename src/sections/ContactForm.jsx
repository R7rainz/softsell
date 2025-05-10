import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

const steps = ["Contact Info", "Company Details", "Message", "Review"]

const ContactForm = () => {
  const [step, setStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    message: "",
  })

  const [errors, setErrors] = useState({})

  const validateStep = () => {
    const newErrors = {}
    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }
    } else if (step === 1) {
      if (!formData.company.trim()) newErrors.company = "Company is required"
      if (!formData.licenseType) newErrors.licenseType = "License type is required"
    } else if (step === 2) {
      if (!formData.message.trim()) newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1)
  }

  const handlePrev = () => setStep((prev) => prev - 1)

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
    if (validateStep()) {
      console.log("Form submitted:", formData)
      setIsSubmitted(true)
      setStep(0)
      setFormData({
        name: "",
        email: "",
        company: "",
        licenseType: "",
        message: "",
      })
    }
  }

  const fieldVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  return (
    <section id="contact" className="py-20">
      <div className="container max-w-xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Let’s Start a Conversation</h2>
          <p className="text-lg text-foreground/80">
            Tell us about your software license. We’ll respond within 24 hours.
          </p>
        </div>

        <div className="glass rounded-xl p-8 shadow-lg">
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-foreground/80 mb-6">
                Your message has been submitted successfully.
              </p>
              <Button variant="minimal" onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step1"
                    {...fieldVariants}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-4">
                      <label className="block font-semibold mb-1">Full Name</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded border bg-background/60"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded border bg-background/60"
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step2"
                    {...fieldVariants}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-4">
                      <label className="block font-semibold mb-1">Company</label>
                      <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded border bg-background/60"
                        placeholder="Acme Corp"
                      />
                      {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">License Type</label>
                      <select
                        name="licenseType"
                        value={formData.licenseType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded border bg-background/60"
                      >
                        <option value="">Choose a license type</option>
                        {licenseTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.licenseType && (
                        <p className="text-red-500 text-sm">{errors.licenseType}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step3"
                    {...fieldVariants}
                    transition={{ duration: 0.4 }}
                  >
                    <label className="block font-semibold mb-1 mb-2">
                      Details about the licenses
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded border bg-background/60"
                      placeholder="Tell us more about the licenses you’re selling..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step4"
                    {...fieldVariants}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="font-bold text-xl mb-4">Review your details</h3>
                    <ul className="space-y-2 text-foreground/90">
                      <li><strong>Name:</strong> {formData.name}</li>
                      <li><strong>Email:</strong> {formData.email}</li>
                      <li><strong>Company:</strong> {formData.company}</li>
                      <li><strong>License Type:</strong> {formData.licenseType}</li>
                      <li><strong>Message:</strong> {formData.message}</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step Navigation */}
              <div className="flex justify-between pt-4">
                {step > 0 && (
                  <Button type="button" variant="outline" onClick={handlePrev}>
                    Back
                  </Button>
                )}
                {step < steps.length - 1 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm

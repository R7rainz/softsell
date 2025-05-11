import { motion } from "framer-motion"
import { Upload, DollarSign, CreditCard } from "lucide-react"

const steps = [
  {
    icon: <Upload className="w-12 h-12 text-primary" />,
    title: "Upload License",
    description: "Submit your software license details through our secure portal for evaluation.",
  },
  {
    icon: <DollarSign className="w-12 h-12 text-primary" />,
    title: "Get Valuation",
    description: "Receive a competitive market valuation based on current demand and license type.",
  },
  {
    icon: <CreditCard className="w-12 h-12 text-primary" />,
    title: "Get Paid",
    description: "Accept our offer and get paid quickly through your preferred payment method.",
  },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-xl text-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our streamlined process makes selling software licenses simple and profitable
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-8 relative hover:scale-[1.02] transition-transform duration-300 shadow-md hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary/10 rounded-full p-3 border border-primary/20 shadow-sm">
                <div className="bg-background rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold text-primary">
                  {index + 1}
                </div>
              </div>
              <div className="mt-8 text-center">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 tracking-tight">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

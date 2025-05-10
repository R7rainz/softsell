import { motion } from "framer-motion"
import { ShieldCheck, Clock, DollarSign, Users } from "lucide-react"

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Secure Transactions",
    description: "End-to-end encryption and verified buyers ensure your license transfers are secure.",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Fast Processing",
    description: "Get valuations within 24 hours and payment within 3 business days of acceptance.",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-primary" />,
    title: "Competitive Rates",
    description: "We offer the highest market rates for your software licenses with transparent pricing.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Expert Support",
    description: "Our team of licensing experts guides you through every step of the process.",
  },
]

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            className="text-xl text-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            SoftSell offers unmatched benefits for software license resellers
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            // Added subtle scale hover and visual feedback
            <motion.div
              key={index}
              className="glass rounded-xl p-6 h-full shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-[1.02]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 bg-primary/10 p-3 rounded-lg inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 tracking-tight">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

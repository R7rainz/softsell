import { motion } from "framer-motion"
import { ShieldCheck, Clock, DollarSign, Users } from "lucide-react"

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "Secure Transactions",
    description: "End-to-end encryption and verified buyers ensure your license transfers are secure.",
  },
  {
    icon: <Clock className="w-10 h-10 text-primary" />,
    title: "Fast Processing",
    description: "Get valuations within 24 hours and payment within 3 business days of acceptance.",
  },
  {
    icon: <DollarSign className="w-10 h-10 text-primary" />,
    title: "Competitive Rates",
    description: "We offer the highest market rates for your software licenses with transparent pricing.",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Expert Support",
    description: "Our team of licensing experts guides you through every step of the process.",
  },
]

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-bold mb-4">Why Choose Us</h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            SoftSell offers unmatched benefits for software license resellers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative z-10 aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl"></div>
              <div className="absolute inset-4 glass rounded-xl overflow-hidden border border-primary/10">
                <div className="h-full w-full p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-4 border-b border-primary/10 pb-4">
                    <div className="text-lg font-medium">License Dashboard</div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col space-y-4">
                    {[1, 2, 3].map((item) => (
                      <motion.div
                        key={item}
                        className="bg-background/50 p-3 rounded-lg flex justify-between items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: item * 0.1 }}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="text-xs font-medium text-primary">SW</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Software License #{item}</div>
                            <div className="text-xs text-foreground/60">Enterprise Plan</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-primary">${(item * 1500).toLocaleString()}</div>
                      </motion.div>
                    ))}

                    <div className="mt-auto border-t border-primary/10 pt-4 flex justify-between">
                      <div className="text-sm">Total Value</div>
                      <div className="text-lg font-medium text-primary">$9,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/4 -left-8 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 -right-8 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 content-center">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
              >
                <div className="p-6">
                  <div className="mb-4 bg-primary/10 p-3 rounded-lg inline-block">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-foreground/80">{feature.description}</p>
                </div>
                <div className="h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

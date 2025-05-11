import { motion } from "framer-motion"
import { Upload, DollarSign, CreditCard } from 'lucide-react'

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
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/30 to-background"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-bold mb-4">How It Works</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Our streamlined process makes selling software licenses simple and profitable
            </p>
          </motion.div>

          <div className="relative">
            <motion.div 
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            ></motion.div>

            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative mb-2 last:mb-0 flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15, 
                      delay: 0.3 + index * 0.2 
                    }}
                  >
                    {index + 1}
                  </motion.div>
                </div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} mt-12 md:mt-0`}>
                  <motion.div
                    className="glass rounded-xl p-6 shadow-lg"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <div className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"} mb-4`}>
                      <div className="bg-primary/10 p-3 rounded-lg">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-foreground/80">{step.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

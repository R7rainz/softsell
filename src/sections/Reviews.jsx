import { motion } from "framer-motion"
import { Star, Quote, User } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "IT Director",
    company: "Infotech Solutions",
    image: null,
    content:
      "SoftSell transformed our approach to license management. We recovered over ₹40 lakhs from unused enterprise software licenses that were just sitting idle. The process was seamless and secure.",
  },
  {
    name: "Meera Iyer",
    role: "Chief Financial Officer",
    company: "Nimbus Technologies",
    image: null,
    content:
      "As we transitioned to cloud services, we had numerous perpetual licenses that were no longer needed. SoftSell helped us convert these assets into capital that funded our migration project.",
  },
  {
    name: "Arjun Desai",
    role: "Head of Procurement",
    company: "NextGen Systems",
    image: null,
    content:
      "We had legacy software licenses that were impossible to repurpose. SoftSell provided a way to liquidate these assets responsibly and recover valuable capital for our next-gen tools.",
  },
]

const Reviews = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-b from-background to-secondary/10 overflow-hidden"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What Our Customers Say
        </motion.h2>
        <motion.p
          className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Hear from Indian businesses that have successfully sold their software licenses
        </motion.p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 md:px-0">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="snap-center flex-shrink-0 bg-white/5 backdrop-blur-sm p-6 rounded-2xl w-[90%] max-w-md border border-border shadow-lg relative mx-auto sm:mx-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Quote className="absolute top-4 left-4 w-10 h-10 text-primary/30" />
              <p className="text-foreground/90 text-lg italic leading-relaxed mb-6 z-10 relative">
                “{testimonial.content}”
              </p>

              <div className="flex items-center space-x-4">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full border-2 border-primary/30 bg-primary/10 flex items-center justify-center">
                    <User className="w-7 h-7 text-primary/50" />
                  </div>
                )}
                <div className="text-left">
                  <h4 className="text-md font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-foreground/70">
                    {testimonial.role}, {testimonial.company}
                  </p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews

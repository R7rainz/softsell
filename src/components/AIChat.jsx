import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { MessageCircle, Send, X } from "lucide-react"

const faqData = [
  {
    question: "How do I sell my software license?",
    answer:
      "Start by submitting details about your license through our evaluation form. Once reviewed, we provide an offer within 24 hours. If accepted, we handle the transfer and initiate payment promptly.",
  },
  {
    question: "Which types of licenses are eligible for resale?",
    answer:
      "We accept perpetual licenses for enterprise, development, design, and infrastructure software. Common examples include Microsoft, Adobe, Autodesk, Oracle, and other major vendors.",
  },
  {
    question: "How is the resale process handled securely?",
    answer:
      "We use encrypted communication, follow vendor-specific compliance protocols, and maintain strict confidentiality to ensure all transfers are conducted securely and lawfully.",
  },
  {
    question: "What is the expected timeline from offer to payment?",
    answer:
      "Most transactions are completed within 3–5 business days. Initial offers are typically sent within 24 hours, followed by verification, contract signing, and payment.",
  },
  {
    question: "Can I resell unused or partially used licenses?",
    answer:
      "Yes. Unused or surplus perpetual licenses that are no longer in active use can usually be resold, subject to vendor-specific terms. We will verify eligibility during evaluation.",
  },
]

const AIChat = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "👋 Hi there! I'm SoftSell's virtual assistant. How can I help you today?",
      suggestions: [
        "How do I sell my license?",
        "What types of licenses do you buy?",
        "How long does the process take?",
        "Is the process secure?",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return

    setMessages((prev) => [...prev, { type: "user", content: text }])
    setInputValue("")

    setTimeout(() => {
      const matchingFaq = faqData.find(
        (faq) =>
          faq.question.toLowerCase().includes(text.toLowerCase()) ||
          text.toLowerCase().includes(faq.question.toLowerCase()),
      )

      if (matchingFaq) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: matchingFaq.answer,
            suggestions: ["Ask another question", "Contact a human agent", "Thank you"],
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "I'm not sure I understand your question. Could you try rephrasing it, or select one of these common topics?",
            suggestions: faqData.map((faq) => faq.question),
          },
        ])
      }
    }, 1000)
  }

  const handleSuggestionClick = (suggestion) => {
    if (suggestion === "Ask another question") {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "What else would you like to know?",
          suggestions: faqData.map((faq) => faq.question),
        },
      ])
      return
    }

    if (suggestion === "Contact a human agent") {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "Our team is available Monday-Friday, 9am-5pm PST. Please fill out the contact form above and a representative will get back to you within 24 hours.",
          suggestions: ["Thank you", "Ask another question"],
        },
      ])
      return
    }

    if (suggestion === "Thank you") {
      setMessages((prev) => [...prev, { type: "user", content: "Thank you" }])

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: "You're welcome! Is there anything else I can help you with?",
            suggestions: ["Ask another question", "No, that's all"],
          },
        ])
      }, 500)
      return
    }

    if (suggestion === "No, that's all") {
      setMessages((prev) => [...prev, { type: "user", content: "No, that's all" }])

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: "Great! Feel free to come back if you have any other questions. Have a wonderful day!",
            suggestions: [],
          },
        ])
      }, 500)
      return
    }

    handleSendMessage(suggestion)
  }

  return (
    <>
      {/* toggle button of chat*/}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant={isOpen ? "minimal" : "default"}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] glass rounded-xl shadow-xl z-50 flex flex-col"
          >
            <div className="p-4 border-b border-border/20 rounded-t-xl">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-medium">SoftSell Assistant</h3>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 backdrop-blur-sm text-foreground"
                    }`}
                  >
                    <p>{message.content}</p>

                    {message.type === "bot" && message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-background/50 backdrop-blur-sm text-foreground px-3 py-1 rounded-full border border-border/30 hover:bg-primary/10 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-border/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-lg border border-border/30 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Button type="submit" variant="default" size="icon" className="rounded-lg">
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIChat

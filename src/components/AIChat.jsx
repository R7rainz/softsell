import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { MessageCircle, Send, X } from "lucide-react"

// Sample predefined questions and answers
const faqData = [
  {
    question: "How do I sell my license?",
    answer:
      "To sell your license, simply fill out our contact form with details about your software license. Our team will evaluate it and provide you with a competitive offer within 24 hours.",
  },
  {
    question: "What types of licenses do you buy?",
    answer:
      "We purchase a wide range of software licenses including enterprise software, creative suites, development tools, database licenses, operating systems, and more. If you're unsure, please contact us for a personalized evaluation.",
  },
  {
    question: "How long does the process take?",
    answer:
      "The entire process typically takes 3-5 business days from initial contact to payment. License valuation is completed within 24 hours, and once you accept our offer, payment is processed within 3 business days.",
  },
  {
    question: "Is the process secure?",
    answer:
      "Yes, we use end-to-end encryption for all communications and transactions. Our secure portal ensures that your license information and personal details are protected throughout the entire process.",
  },
]

const ChatWidget = ({ isOpen, setIsOpen }) => {
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
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
            suggestions: ["How do I sell my license?", "What types of licenses do you buy?", "Contact a human agent"],
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
          suggestions: [
            "How do I sell my license?",
            "What types of licenses do you buy?",
            "How long does the process take?",
            "Is the process secure?",
          ],
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
      setMessages((prev) => [...prev, { type: "user", content: suggestion }])
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
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant={isOpen ? "ghost" : "default"}
          size="icon"
          className={`h-14 w-14 rounded-full shadow-xl transition-all duration-200 ${
            isOpen ? "bg-red-100 text-red-500 hover:bg-red-200" : "bg-primary text-white hover:bg-primary/90"
          }`}
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
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-background rounded-2xl border border-border shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-lg"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary/10 via-background to-background border-b border-border/30">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mr-3">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">SoftSell Assistant</h3>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/80">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      message.type === "user"
                        ? "bg-primary text-white"
                        : "bg-muted/50 text-foreground border border-border/20"
                    }`}
                  >
                    <p>{message.content}</p>

                    {message.type === "bot" && message.suggestions?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-background hover:bg-primary/10 text-foreground border border-border/30 px-3 py-1 rounded-full transition"
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

            {/* Input */}
            <div className="p-4 border-t border-border/20 bg-background/90">
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
                  className="flex-1 px-4 py-2 text-sm rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
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

export default ChatWidget
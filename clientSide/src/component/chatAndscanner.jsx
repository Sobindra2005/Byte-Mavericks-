import React, { useState, useRef } from "react";
import useStore from "../store";
import Lottie from "lottie-react";
import iconScanner from "../assets/animations/iconscanner.json";
import chat from "../assets/animations/chat.json";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import CameraCapture from "./cropScanner";

const ChatPopup = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { from: "ai", text: "नमस्ते! तपाईंलाई के सहयोग चाहियो?" }
  ]);
  const [input, setInput] = useState("cauliflower ma kalo dag aako thiyo k ley hola ");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();
      const aiMsg = { from: "ai", text: data.response };

      setMessages((msgs) => [...msgs, aiMsg]);

    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: "ai", text: "Failed to get response from AI." },
      ]);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-[40%] bg-white shadow-2xl z-50 flex flex-col"
      style={{
        borderTopRightRadius: "1.5rem",
        borderBottomRightRadius: "1.5rem",
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-green-700 text-white rounded-tl-2xl">
        <span className="font-bold text-lg">कृषि च्याट</span>
        <button
          onClick={onClose}
          className="text-white text-2xl font-bold hover:text-green-300"
          aria-label="Close chat"
        >
          ×
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-green-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-2 max-w-[80%] ${msg.from === "ai"
              ? "bg-green-100 self-start"
              : "bg-green-200 self-end ml-auto"
              }`}
          >
            {msg.from === "ai" ? (
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    return (
                      <code
                        className={`bg-gray-200 px-1 rounded text-sm ${className || ""}`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {msg.text}
              </ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
        {loading && (
          <div className="text-green-600 text-sm">AI is typing...</div>
        )}
      </div>
      <form className="p-3 flex gap-2 border-t bg-white" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="यहाँ लेख्नुहोस्..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold"
          disabled={loading}
        >
          पठाउनुहोस्
        </button>
      </form>
    </motion.div>
  );
};


const ChatAndScanner = () => {
  const [showDisease, setShowDisease] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      <AnimatePresence>
        {showDisease && <CameraCapture onClose={() => setShowDisease(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showChat && <ChatPopup onClose={() => setShowChat(false)} />}
      </AnimatePresence>
      <div className="fixed bottom-16 right-8 flex flex-col space-y-4 z-50">
        <motion.button
          className="rounded-full shadow-lg"
          style={{ background: "#e6ffe6" }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => setShowDisease(!showDisease)}
        >
          <Lottie
            animationData={iconScanner}
            loop={true}
            style={{ width: 75, height: 75 }}
          />
        </motion.button>
        <motion.button
          className="rounded-full shadow-lg"
          style={{ background: "#588157" }}
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
          onClick={() => setShowChat(!showChat)}
        >
          <Lottie
            animationData={chat}
            loop={true}
            style={{ width: 75, height: 75 }}
          />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatAndScanner;
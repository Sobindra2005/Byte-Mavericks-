import React, { useState } from "react";
import Lottie from "lottie-react";
import iconScanner from "../assets/animations/iconscanner.json"
import chat from "../assets/animations/chat.json"
import { AnimatePresence, motion } from "framer-motion";
import CropScanner from "./CropScanner";

const ChatPopup = ({ onClose }) => (
  <motion.div
    initial={{ x: 400, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 400, opacity: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="fixed top-0 right-0 h-full w-[40%] bg-white shadow-2xl z-50 flex flex-col"
    style={{ borderTopRightRadius: "1.5rem", borderBottomRightRadius: "1.5rem" }}
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
      {/* Example chat messages */}
      <div className="bg-green-100 rounded-lg p-2 self-start max-w-[80%]">नमस्ते! तपाईंलाई के सहयोग चाहियो?</div>
      <div className="bg-green-200 rounded-lg p-2 self-end max-w-[80%] ml-auto">मलाई बालीको जानकारी चाहियो।</div>
    </div>
    <form className="p-3 flex gap-2 border-t bg-white">
      <input
        type="text"
        placeholder="यहाँ लेख्नुहोस्..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold"
      >
        पठाउनुहोस्
      </button>
    </form>
  </motion.div>
);

const ChatAndScanner = () => {
    const [showScanner, setShowScanner] = useState(false);
    const [showChat, setShowChat] = useState(false);

    return (
        <div className=" ">
            <AnimatePresence>
                {showScanner && (
                    <CropScanner />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showChat && (
                    <ChatPopup onClose={() => setShowChat(false)} />
                )}
            </AnimatePresence>


            <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-50">
                <motion.button
                    className="rounded-full shadow-lg"
                    style={{ background: "#e6ffe6" }} // light green bg for scanner
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => setShowScanner(!showScanner)}
                >
                    <Lottie
                        animationData={iconScanner}
                        loop={true}
                        style={{ width: 75, height: 75 }}
                    />
                </motion.button>
                <motion.button
                    className="rounded-full shadow-lg"
                    style={{ background: "#588157" }} // light gray bg for chat
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
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



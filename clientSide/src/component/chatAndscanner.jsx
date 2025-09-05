import React, { useState, useRef } from "react";
import useStore from "../store";
import Lottie from "lottie-react";
import iconScanner from "../assets/animations/iconscanner.json";
import chat from "../assets/animations/chat.json";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const ChatPopup = ({ onClose }) => (
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
      {/* Example chat messages */}
      <div className="bg-green-100 rounded-lg p-2 self-start max-w-[80%]">
        नमस्ते! तपाईंलाई के सहयोग चाहियो?
      </div>
      <div className="bg-green-200 rounded-lg p-2 self-end max-w-[80%] ml-auto">
        मलाई बालीको जानकारी चाहियो।
      </div>
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

// DiseaseResult component with global language toggle
const DiseaseResult = ({ image, loading, result, onTryAnother }) => {
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);
  
  // Map language code to result key
  const langKey = language === "en" ? "english" : "nepali";
  const info = result && result[langKey];
  
  return (
    <div className="flex flex-col items-center gap-4">
      {image && <img src={image} alt="Selected" className="max-h-48 rounded shadow" />}
      {loading && <div className="text-green-700 font-semibold">Detecting disease...</div>}
      {result && (
        result.error ? (
          <div className="text-red-600">{result.error}</div>
        ) : (
          <div className="w-full text-left space-y-2">
            <div className="font-bold text-lg">Crop: {result.crop}</div>
            {result.flag ? (
              <div className="text-green-700 font-semibold">No disease detected!</div>
            ) : (
              <>
                <div className="font-bold text-md text-red-700">Disease: {result.disease}</div>
                <div>Confidence: {result.confidence}</div>
                <div className="flex gap-2 my-2">
                  <button
                    className={`px-3 py-1 rounded ${language === "en" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setLanguage("en")}
                  >
                    English
                  </button>
                  <button
                    className={`px-3 py-1 rounded ${language === "np" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setLanguage("np")}
                  >
                    नेपाली
                  </button>
                </div>
                <div className="mt-2"><span className="font-semibold">Description:</span> {info?.description}</div>
                <div className="mt-2"><span className="font-semibold">Symptoms:</span>
                  <ul className="list-disc ml-6">
                    {info?.symptoms?.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div className="mt-2"><span className="font-semibold">Remedies:</span>
                  <ul className="list-disc ml-6">
                    {info?.remedies?.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
                <div className="mt-2"><span className="font-semibold">Prevention:</span>
                  <ul className="list-disc ml-6">
                    {info?.prevention?.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              </>
            )}
          </div>
        )
      )}
      <button onClick={onTryAnother} className="mt-4 bg-gray-200 px-4 py-2 rounded">Try Another</button>
    </div>
  );
};

const DiseasePopup = ({ onClose }) => {
  const [step, setStep] = useState("choose");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    setStep("camera");
    setTimeout(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        alert("Camera access denied");
        setStep("choose");
      }
    }, 100);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/png");
    setImage(data);
    setStep("result");
    stopCamera();
    sendToApi(data);
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      let tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setStep("result");
    sendToApi(file);
  };

  const sendToApi = async (imgInput) => {
    setLoading(true);
    setResult(null);

    let formData = new FormData();

    if (imgInput instanceof File) {
      formData.append("image", imgInput);
    } else if (
      typeof imgInput === "string" &&
      imgInput.startsWith("data:image")
    ) {
      // Convert base64 -> Blob
      const arr = imgInput.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) u8arr[n] = bstr.charCodeAt(n);
      const blob = new Blob([u8arr], { type: mime });
      formData.append("image", blob, "capture.png");
    } else {
      setResult({ error: "Invalid image input." });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/detect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", res);

      const data = res.data;

      if (!data) {
        setResult({ error: "No response from server." });
      } else {
        setResult(data.ai || data);
      }
    } catch (error) {
      console.error("API Error:", error);
      setResult({ error: "Failed to connect to server." });
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
        <span className="font-bold text-lg">Disease Detection</span>
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="text-white text-2xl font-bold hover:text-green-300"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {step === "choose" && (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <button
              onClick={startCamera}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700"
            >
              Scan with Camera
            </button>
            <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 cursor-pointer">
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
          </div>
        )}
        {step === "camera" && (
          <div className="flex flex-col items-center gap-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-64 object-contain bg-black rounded"
            />
            <button
              onClick={capturePhoto}
              className="bg-green-600 text-white px-6 py-2 rounded-full"
            >
              Capture
            </button>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}
        {step === "result" && (
          <DiseaseResult
            image={image}
            loading={loading}
            result={result}
            onTryAnother={() => {
              setStep("choose");
              setImage(null);
              setResult(null);
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

const ChatAndScanner = () => {
  const [showDisease, setShowDisease] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  return (
    <div>
      <AnimatePresence>
        {showDisease && <DiseasePopup onClose={() => setShowDisease(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showChat && <ChatPopup onClose={() => setShowChat(false)} />}
      </AnimatePresence>
      <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-50">
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
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store"; // Import your store
import { useTextLang } from "../libs/utils";

export default function CameraCapture({ onClose }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const setDetectionResult = useStore((state) => state.setDetectionResult);

    useEffect(() => {
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
            }
        }
        startCamera();
    }, []);

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imageUrl = URL.createObjectURL(file);
        setCapturedImage(imageUrl);
        sendToApi(file);
    };

    const handleRetake = () => {
        setCapturedImage(null);
        setResult(null);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleConfirm = () => {
        if (capturedImage && typeof capturedImage === 'string' && capturedImage.startsWith('data:')) {
            sendToApi(capturedImage);
        }
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

            const data = res.data.ai;
            if (!data) {
                setResult({ error: "No response from server." });
                setLoading(false);
                return;
            }

            setDetectionResult(data);
            setResult(data.ai || data);

            navigate("/disease-detection");
            onClose();

        } catch (error) {
            console.error("API Error:", error);
            setResult({ error: "Failed to connect to server." });
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/90  flex items-center justify-center z-50">
            <div className="relative bg-white rounded-xl shadow-lg flex flex-col items-center w-full max-w-3xl h-[90vh]">
                <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden rounded-t-xl bg-black/30">
                    {!capturedImage && !isLoading ? (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="relative w-full h-full flex items-center justify-center bg-black">
                            <img
                                src={capturedImage}
                                alt="Captured"
                                className="rounded-lg object-contain h-[70%] w-[70%]"
                            />
                            {/* Scanning animation overlay */}
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-[90%] h-[100%] relative">
                                        {/* Animated scanning bar */}
                                        <div className="absolute left-0 w-full h-1 bg-green-400 rounded shadow-lg animate-scan-bar" />
                                    </div>
                                </div>
                            )}
                            <style>
                                {`
                                    @keyframes scan-bar {
                                        0% { top: 18%; }
                                        100% { top: 85%; }
                                    }
                                    .animate-scan-bar {
                                        animation: scan-bar 2s linear infinite alternate;
                                    }
                                `}
                            </style>
                        </div>
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                </div>
                <div className="w-full flex gap-4 justify-center items-center py-2 rounded-b-xl">
                    {!capturedImage ? (
                        <>
                            <button
                                onClick={capturePhoto}
                                className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
                                disabled={isLoading}
                            >
                                {useTextLang("Capture", "फोटो खिच्नुहोस्")}
                            </button>
                            <button
                                className="px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
                                onClick={handleButtonClick}
                                disabled={isLoading}
                            >
                                {useTextLang("Upload", "अपलोड गर्नुहोस्")}
                                <input
                                    ref={fileInputRef}
                                    className="hidden w-full h-full"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload}
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleRetake}
                                className="px-4 bg-gray-400 py-2 text-white rounded-full shadow hover:bg-gray-500 transition"
                                disabled={isLoading}
                            >
                                {useTextLang("Retake", "पुन: खिच्नुहोस्")}
                            </button>
                            {!result && !isLoading && (
                                <button
                                    onClick={handleConfirm}
                                    className="px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
                                >
                                    {useTextLang("Analyze", "विश्लेषण गर्नुहोस्")}
                                </button>
                            )}
                            {isLoading && (
                                <div className="px-6 py-2 text-gray-600">
                                    {useTextLang("Analyzing...", "विश्लेषण गर्दै...")}
                                </div>
                            )}
                        </>
                    )}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                    >
                        {useTextLang("Close", "बन्द गर्नुहोस्")}
                    </button>
                </div>
            </div>
        </div>
    );
};
import { useEffect, useRef, useState } from "react";
export default function CameraCapture() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

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

    return (
        <div className="fixed w-screen h-screen bg-black flex flex-col items-center justify-center overflow-hidden z-50">
            {!capturedImage ? (<>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />

                {/* Capture button */}
                <div className="absolute bottom-20 flex flex-col items-center">
                    <button
                        onClick={capturePhoto}
                        className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
                    >
                        Capture Photo
                    </button>
                </div>

                <canvas ref={canvasRef} className="hidden" /></>) : (
                <div className="relative inset-0 flex items-center justify-center bg-black w-full h-full">
                    <img
                        src={capturedImage}
                        alt="Captured"
                        className="rounded-lg object-contain max-h-full max-w-full"
                    />
                    {/* Scanning animation overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-3/5 h-3/4 relative">
                            {/* Animated scanning bar */}
                            <div className="absolute left-0 w-full h-1 bg-green-400 rounded shadow-lg animate-scan-bar" />
                        </div>
                    </div>
                    <style>
                        {`
        @keyframes scan-bar {
            0% { top: 0%; }
            100% { top: 100%; }
        }
        .animate-scan-bar {
            animation: scan-bar 2s linear infinite alternate;
        }
        `}
                    </style>
                </div>
            )}<br />
        </div>
    );
}
import { useState } from "react";
import useStore from "../store";

const DiseaseDetection = () => {
    // Example response, replace with actual API response in production
    const [response] = useState({
        message: "Image uploaded and detected successfully!",
        result: {
            inference_id: "d80ec93f-9973-4728-9ecc-15819d4960cf",
            time: 0.009381705000123475,
            image: { width: 279, height: 181 },
            predictions: [
                {
                    x: 139.5,
                    y: 107,
                    width: 279,
                    height: 148,
                    confidence: 0.9398823380470276,
                    class: "Corn rust leaf",
                    class_id: 9,
                    detection_id: "773af8ea-4d43-4fc2-9a24-a42fa71f69ea"
                }
            ]
        },
        ai: {
            flag: true,
            crop: "Corn",
            disease: "Corn Rust Leaf",
            confidence: "94%",
            english: {
                description: "Corn Rust Leaf is a common fungal disease that affects corn plants. It causes small, raised, reddish-brown spots on the leaves, which can look like rust. If left untreated, it can reduce your corn yield significantly.",
                symptoms: [
                    "Small, raised, reddish-brown or orange spots (pustules) appearing on both sides of the corn leaves.",
                    "These spots often release a powdery, rust-colored substance when rubbed.",
                    "In severe cases, leaves may turn yellow and dry out prematurely.",
                    "Pustules can also be found on leaf sheaths and stalks."
                ],
                remedies: [
                    "Apply recommended fungicides specifically for corn rust. Consult with your local agricultural expert for the right product and timing.",
                    "Remove and destroy heavily infected plant parts or debris to reduce the spread of the fungus.",
                    "Practice good field sanitation after harvest."
                ],
                prevention: [
                    "Plant corn varieties that are known to be resistant to rust disease.",
                    "Ensure proper spacing between plants for good air circulation, which helps dry the leaves and reduce fungal growth.",
                    "Rotate crops with non-host plants to break the disease cycle.",
                    "Monitor your corn field regularly for early signs of the disease and act quickly.",
                    "Control volunteer corn plants (corn plants growing from previous season's dropped kernels) as they can host the disease."
                ]
            },
            nepali: {
                description: "मकैमा लाग्ने खिया रोग (Corn Rust Leaf) मकैको बोटमा लाग्ने एक सामान्य ढुसीजन्य रोग हो। यसले मकैको पातमा ससाना, उठेका, खिया जस्तै राता-खैरा थोप्लाहरू देखा पर्छन्। यदि समयमै उपचार नगरिएमा यसले मकैको उत्पादनमा ठूलो क्षति पुर्याउन सक्छ।",
                symptoms: [
                    "मकैको पातको दुवैतिर ससाना, उठेका, राता-खैरा वा सुन्तला रंगका थोप्लाहरू (फोकाहरू) देखिनु।",
                    "यी थोप्लाहरूलाई छुँदा धूलो जस्तो खियाको कण निस्कनु।",
                    "रोग धेरै फैलिएमा पातहरू पहेँलो भएर समयभन्दा पहिले नै सुक्न सक्छन्।",
                    "पातको खोल र डाँठमा पनि यस्ता फोकाहरू देखिन सक्छन्।"
                ],
                remedies: [
                    "मकैको खिया रोगको लागि सिफारिस गरिएका ढुसीनाशक औषधिहरू प्रयोग गर्नुहोस्। सही औषधि र प्रयोग गर्ने तरिका बारे आफ्नो स्थानीय कृषि विज्ञसँग सल्लाह लिनुहोस्।",
                    "धेरै संक्रमित बिरुवाका भागहरू वा अवशेषहरू हटाउनुहोस् र नष्ट गर्नुहोस् ताकि ढुसी नफैलियोस्।",
                    "बाली कटनी पछि खेतको राम्रो सरसफाइ गर्नुहोस्।"
                ],
                prevention: [
                    "खिया रोग प्रतिरोधात्मक क्षमता भएका मकैका जातहरू छान्नुहोस्।",
                    "पातहरू सुकाउन र ढुसीको वृद्धि कम गर्न बिरुवाहरू बीच हावाको राम्रो संचारको लागि उचित दूरी कायम राख्नुहोस्।",
                    "रोग चक्र तोड्न गैर-होस्ट बिरुवाहरूसँग बाली घुमाउनुहोस् (Crop Rotation)।",
                    "मकै खेतको नियमित रूपमा निगरानी गर्नुहोस् र रोगको प्रारम्भिक लक्षणहरू देखिएमा छिटो कार्य गर्नुहोस्।",
                    "स्वयंसेवी मकैका बोटहरू (अघिल्लो सिजनका झरेका दानाबाट उम्रिएका मकै) नियन्त्रण गर्नुहोस् किनभने तिनीहरूले रोग फैलाउन सक्छन्।"
                ]
            }
        }
    });

    const language = useStore((state) => state.language);

    const info = language === "np" ? response.ai.nepali : response.ai.english;

    return (
        <div className="w-full  mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold text-green-700 shadow">
                    🌽
                </div>
                <div>
                    <div className="text-xl font-bold text-green-800">
                        {response.ai.crop}
                    </div>
                    <div className="text-sm text-gray-500">
                        {response.message}
                    </div>
                </div>
            </div>
            {!response.ai.flag ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 font-semibold text-center mb-4">
                    No disease detected!
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-red-700">Disease:</span>
                        <span className="text-lg font-bold">{response.ai.disease}</span>
                        <span className="ml-auto text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                            Confidence: {response.ai.confidence}
                        </span>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                        <span className="font-semibold block mb-1">Description:</span>
                        <span className="text-gray-800">{info?.description}</span>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                        <span className="font-semibold block mb-1">Symptoms:</span>
                        <ul className="list-disc ml-6 text-gray-800">
                            {info?.symptoms?.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                        <span className="font-semibold block mb-1">Remedies:</span>
                        <ul className="list-disc ml-6 text-gray-800">
                            {info?.remedies?.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded">
                        <span className="font-semibold block mb-1">Prevention:</span>
                        <ul className="list-disc ml-6 text-gray-800">
                            {info?.prevention?.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                </div>
            )}
            <div className="mt-6 text-xs text-gray-400 text-right">
                Inference ID: {response.result.inference_id} | Time: {response.result.time.toFixed(3)}s
            </div>
        </div>
    );
};

export default DiseaseDetection;
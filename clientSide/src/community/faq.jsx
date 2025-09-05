import React from 'react'

export default function Faq() {
    let datas = [
        {
          id: 1,
          title: "एग्रो शिक्षा के हो?",
          description: "एग्रो शिक्षा एक यस्तो प्लेटफर्म हो जसले किसान र कृषि क्षेत्रका व्यक्तिहरूलाई ज्ञान र स्रोतहरू प्रदान गर्दछ।",
        },
        {
          id: 2,
          title: "नेपालमा प्रमुख बालीहरू के के हुन्?",
          description: "नेपालमा प्रमुख बालीहरूमा धान, मकै, गहुँ, आलु, तरकारी, फलफूल र चिया पर्दछन्।",
        },
        {
          id: 3,
          title: "कृषि क्षेत्रमा सरकारले के कस्ता अनुदान दिन्छ?",
          description: "सरकारले बीउबिजन, मलखाद, सिँचाइ, र खेती उपकरणहरूमा अनुदान दिने गर्दछ। किसानलाई कर्जा सुविधा र प्रशिक्षण कार्यक्रमहरू पनि उपलब्ध छन्।",
        },
        {
          id: 4,
          title: "जैविक खेती के हो?",
          description: "जैविक खेती एक यस्तो पद्धति हो जसमा कृत्रिम रसायन, विषादी र अन्य हानिकारक तत्वहरूको प्रयोग नगरिकन, प्राकृतिक विधिबाट खेती गरिन्छ।",
        },
        {
          id: 5,
          title: "कृषिमा मौसमले कस्तो प्रभाव पार्छ?",
          description: "मौसमले बालीको उत्पादन र गुणस्तरमा प्रत्यक्ष प्रभाव पार्छ। अनियमित वर्षा, हावाहुरी, र चिसो तापक्रमले खेतीमा नकारात्मक प्रभाव पार्न सक्छ।",
        },
        {
          id: 6,
          title: "नेपालमा कफी खेती कति लोकप्रिय छ?",
          description: "नेपालमा पछिल्लो समय कफी खेतीको लोकप्रियता बढ्दै गएको छ। उच्च पहाडी क्षेत्रहरूमा कफी उत्पादन राम्ररी भइरहेको छ।",
        },
        {
          id: 7,
          title: "कृषिमा आधुनिक प्रविधि कति महत्वपूर्ण छ?",
          description: "आधुनिक प्रविधिको प्रयोगले उत्पादन, व्यवस्थापन र बजारिकरणमा ठूलो सुधार ल्याउँछ। प्रविधि प्रयोगले समय र श्रमको बचत हुन सक्छ।",
        },
        {
          id: 8,
          title: "तरकारी खेतीका लागि उपयुक्त सिजन के हो?",
          description: "तरकारी खेती गर्नका लागि हिउँद र वर्षा याम उपयुक्त हुन्छ। सिजन अनुसार तरकारीको प्रकार चयन गर्नु राम्रो हुन्छ।",
        },
        {
          id: 9,
          title: "नेपालमा चियाको उत्पादन कति महत्वपूर्ण छ?",
          description: "नेपालमा पूर्वी पहाडी क्षेत्रहरूमा चियाको उत्पादन धेरै महत्त्वपूर्ण छ। नेपाली चियाको स्वाद र गुणस्तर अन्तर्राष्ट्रिय बजारमा प्रख्यात छ।",
        },
      ];

  return (
    <>
    <div
    class="relative w-full bg-white px-6 pt-10   pb-8 mt-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10">
          <div class="flex flex-col items-center">
            <h2 class="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">FAQ</h2>
            <p class="mt-3 text-lg text-neutral-500 md:text-xl">बारम्बार सोधिने प्रश्नहरू</p>
        </div>
    <div class="mx-auto ">
        {
            datas.map((data)=>{
                let {id,title, description}= data;
                return <>
                
              
      
        <div class="mx-auto grid divide-y divide-neutral-200">
            <div class="py-5">
                <details class="group">
                    <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
                        <span> {title}</span>
                        <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision"
                                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5" viewBox="0 0 24 24" width="24">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            </span>
                    </summary>
                    <p class="group-open:animate-fadeIn mt-3 text-neutral-600">{description}
                    </p>
                </details>
            </div>
           
        </div>
        </>
            })
        }
    </div>
</div>
    </>
  )
}

'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

// FAQ Data based on your screenshot
const faqData = [
  {
    question: "Is Gather really free?",
    answer: "Yes! 99% of Gather's features are available for free. We make money through Gather Pro, a subscription for power users who need advanced features like team collaboration, custom domains, and removal of Gather branding."
  },
  {
    question: "Are Gather forms secure?",
    answer: "Absolutely. We take security seriously. All data is encrypted in transit and at rest. We are GDPR compliant and host our data on secure servers in Europe."
  },
  {
    question: "How does Gather compare to other form builders?",
    answer: "Gather is the simplest form builder on the market. It works like a doc—just type your questions. No complex drag-and-drop builders. It's designed to be fast, beautiful, and completely free for most use cases."
  },
  {
    question: "How can I get started?",
    answer: "No signup is required to try it out! Just click the 'Create a free form' button at the top of this page. You can create an account later to save and publish your forms."
  }
];

export default function FAQSection() {
  // State to track which item is open (null = all closed)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Toggle function
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-20">
      
      {/* Title */}
      <h2 className="text-3xl text-start md:text-4xl font-bold text-black mb-10">
        Questions & answers
      </h2>

      {/* FAQ List */}
      <div className="flex flex-col">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div 
              key={index} 
              className="border-b border-gray-100 last:border-none"
            >
              {/* Question Header (Clickable) */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center py-6 text-left group hover:text-gray-600 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900 group-hover:text-gray-600">
                  {faq.question}
                </span>
                
                {/* Rotating Chevron Icon */}
                <span 
                  className={`ml-4 text-gray-400 transition-transform duration-300 ease-in-out ${
                    isOpen ? 'rotate-90' : 'rotate-0'
                  }`}
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </span>
              </button>

              {/* Answer Content (Animated Height) */}
              <div 
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-600 text-start pb-6 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
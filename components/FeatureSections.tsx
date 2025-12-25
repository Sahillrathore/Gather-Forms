import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FeatureSections() {
  return (
    <>
      {/* ==========================================
          SECTION 1: A form builder like no other
      ========================================== */}
      <section className="w-full mx-auto px-0 mt-20 py-20 flex flex-col items-start text-center">
        
        {/* Main Headline */}
        <h2 className="text-3xl text-start md:text-4xl font-bold text-black mb-4">
          A form builder like no other
        </h2>
        
        {/* Subheadline */}
        <p className="text-xl text-start text-gray-700 max-w-3xl mb-12 leading-">
          Gather makes it simple for anyone to build free online forms. No need to code — just type your questions like you would in a doc.
        </p>

        {/* The Pink Border Card */}
        <div className="w-full relative border-[3px] border-[#f456c9] rounded-2xl overflow-hidden bg-white text-left p-8 md:p-12 min-h-[400px] flex flex-col">
          
          <div className="relative z-10 max-w-xl">
            {/* Card Headline */}
            <h3 className="text-2xl md:text-3xl font-bold text-[#d936ef] mb-4">
              Unlimited forms and submissions for free
            </h3>
            
            {/* Card Body */}
            <p className="text-lg text-gray-700 leading-relaxed">
              Paywalls getting in the way? Not anymore. Gather gives you unlimited forms and submissions, completely free, as long as you stay within our{' '}
              <Link href="#" className="underline decoration-gray-400 underline-offset-4 hover:text-black">
                fair usage guidelines
              </Link>.
            </p>
          </div>

          {/* Doodles Background (Flying Person) */}
          {/* Use absolute positioning to place the image at the bottom right */}
          <div className="absolute bottom-0 right-0 w-full md:w-2/3 h-64 md:h-full pointer-events-none">
             {/* Replace src with your 'flying person' image */}
             <Image 
               src="/dive-in.png" 
               alt="Flying person doodle" 
               fill
               className="object-contain object-bottom md:object-right-bottom"
             />
          </div>
        </div>
      </section>


      {/* ==========================================
          SECTION 2: Craft intelligent forms
      ========================================== */}
      <section className="w-full mx-auto px-0 py-16 md:py-16">
        <div className="flex flex-col md:flex-row pb-4 border-b border-zinc-400/40 justify-between items-end gap-12">
          
          {/* Text Content (Left Side) */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl text-start font-bold text-black mb-4 leading-tight">
              Craft{' '}
              <span className="relative inline-block">
                intelligent
                {/* Pink Squiggle Underline */}
                <svg 
                  className="absolute -bottom-3 left-0 w-full h-4 text-[#f456c9]" 
                  viewBox="0 0 100 15" 
                  fill="none" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M0 5 Q 15 15 30 5 T 60 5 T 90 5 T 100 10" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              forms
            </h2>
            <p className="text-xl text-gray-700 text-start">
              Our smart features make it easy to turn your forms into a tailored experience for every respondent.
            </p>
          </div>

          {/* Image Content (Right Side) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            {/* Replace src with your 'people looking at wireframe' image */}
            <div className="relative w-full max-w-md aspect-[4/3]">
              <Image 
                src="/smart.png" 
                alt="Crafting intelligent forms doodle" 
                fill
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import TemplateSection from '@/components/DesignedForYou';
import FeatureSections from '@/components/FeatureSections';
import ShareSection from '@/components/ShareSection';
import FAQSection from '@/components/FAQSection';
import HeaderLayout from '@/components/HeaderLayout';
import Footer from '@/components/Footer';

const Doodle = ({
  className,
  src,
  alt = "doodle",
  width = 100,
  height = 100
}: {
  className?: string,
  src: string,
  alt?: string,
  width?: number,
  height?: number
}) => (
  <div className={`absolute hidden xl:block pointer-events-none ${className}`}>
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="object-contain opacity-80"
    />
  </div>
);

export default function LandingPage() {
  return (
    <HeaderLayout>
      <main className="min-h-screen bg-white flex flex-col items-center pt-20 px-4 overflow- relative">

        <Doodle
          src="/faces-left.png"
          className="top-32 left-0"
          width={250}
        />

        <Doodle
          src="/faces-right.png"
          className="top-32 right-0"
          width={350}
        />

        <div className="z-10 max-w-6xl w-full text-center flex flex-col items-center">

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6 leading-[1.1]">
            The simplest way to <br className="hidden md:block" />
            create
            <span className="relative ml-4 inline-block">
              forms
              <svg
                className="absolute -bottom-2 left-0 w-full h-4 text-pink-500"
                viewBox="0 0 100 20"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 10 Q 25 20 50 10 T 100 10"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="text-xl text-gray-700 mb-10 max-w-2xl font-medium">
            Say goodbye to boring forms. Meet Tally — the free, intuitive form builder you’ve been looking for.
          </p>

          <div className="flex flex-col items-center gap-3 mb-16">
            <button className="bg-[#2672ed] hover:bg-[#1e60cc] text-white text-lg font-semibold py-3 px-8 rounded-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Create a free form
              <ArrowRight size={20} />
            </button>
            {/* <span className="text-gray-500 text-sm">No signup required</span> */}
          </div>

          <div className="w-full relative">

            <div className="absolute -top-12 -left-12 w-8 h-8 bg-pink-400 rotate-45 rounded-sm hidden md:block opacity-0"></div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden w-full mx-auto aspect-video flex flex-col">

              <div className="bg-white border-b border-gray-100 p-4 flex gap-2 items-center">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              </div>

              <div className="flex-1 bg-white relative w-full flex items-center justify-center p-4">

                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="https://tally.so/videos/demo/intro.mp4" type="video/mp4" />
                </video>

              </div>
            </div>
          </div>

          <FeatureSections />

          <h2 className='text-3xl mt-8 text-zinc-400 font-bold'>“Loving Tally! Not sure why I only started using it now, so good!”</h2>

          <TemplateSection />

          <ShareSection />

          <FAQSection />

          <Footer/>

        </div>

        {/* Spacer for bottom scrolling */}
        <div className="h-20"></div>
      </main>
    </HeaderLayout>
  );
}
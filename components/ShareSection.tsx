import React from 'react';
import Image from 'next/image';
import { Layout, AppWindow, Link as LinkIcon, Globe, ExternalLink } from 'lucide-react';

export default function ShareSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-20 relative">
      
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 relative">
        <div className="max-w-2xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
            <span className="relative inline-block mr-3">
              Share
              {/* Hand-drawn Oval Circle SVG */}
              <svg 
                className="absolute -top-3 -left-4 w-[140%] h-[160%] text-[#f456c9] pointer-events-none" 
                viewBox="0 0 100 60" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M10 30 Q 15 5 50 5 T 90 30 T 50 55 T 10 30" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            with your audience
          </h2>
          <p className="text-xl text-gray-700">
            Tailor how you share and display forms to connect with your audience across platforms.
          </p>
        </div>

        {/* Floating Doodle: Person with Paper Plane */}
        {/* Positioned absolutely on desktop to sit top-right */}
        <div className="hidden md:block absolute -top-12 right-0 w-64 h-64 pointer-events-none">
           <Image 
             src="/paper-plane.png" 
             alt="Paper plane doodle" 
             width={300}
             height={300}
             className="object-contain"
           />
        </div>
      </div>

      {/* ================= GRID LAYOUT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* === LEFT COLUMN (Large Embed Card) === */}
        <div className="lg:col-span-3 bg-white border border-zinc-300 shadow-sm  rounded-xl p-6 flex flex-col gap-12 relative overflow-hidden min-h-[700px]">
          
          <div className="relative z-10">
            {/* Icon */}
            <div className="w-10 h-10 mb-4 text-[#f456c9]">
              <Layout size={32} strokeWidth={1.5} />
            </div>
            {/* Content */}
            <h3 className="text-xl font-bold text-start text-black mb-3">Embed</h3>
            <p className="text-gray-600 leading-relaxed text-start mb-8 max-w-md">
              Seamlessly embed your forms into your website, landing page, or Notion. Whether you use WordPress, Webflow, Framer, or any other website builder, integrating Gather forms into your web pages is simple.
            </p>
          </div>

          

          {/* Browser Mockup Visual */}
          <div className="w-full h-full bg-white border border-zinc-300  rounded-t-xl shadow-lg translate-8 ml-4 relative">
             <div className="h-8 border-b border-gray-100 flex items-center px-4 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
             </div>
             <div className="p-4 bg-gray-50/50 h-full">
                {/* Empty canvas content */}
             </div>
          </div>
        </div>


        {/* === RIGHT COLUMN (Stack of 3 Cards) === */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Card 1: Popup */}
          <div className="bg-white border border-zinc-300 shadow-sm  rounded-xl p-6">
            <div className="w-10 h-10 mb-4 text-[#f456c9]">
              <AppWindow size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl text-start font-bold text-black mb-3">Popup</h3>
            <p className="text-gray-600 text-start leading-relaxed mb-6">
              Create an eye-catching popup form for your website in seconds.
            </p>
            <button className="w-full bg-[#006fee] hover:bg-[#005bc4] text-white font-medium py-2.5 rounded-lg transition-colors">
              Click me
            </button>
          </div>

          {/* Card 2: Gather Links */}
          <div className="bg-white border border-zinc-300 shadow-sm  rounded-xl p-6">
            <div className="w-10 h-10 mb-4 text-[#f456c9]">
              <LinkIcon size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl text-start font-bold text-black mb-3">Gather links</h3>
            <p className="text-gray-600 text-start leading-relaxed mb-6">
              Share your unique Gather form link with anyone.
            </p>
            <div className="bg-gray-100 rounded-md py-2 px-4 flex justify-between items-center text-sm text-gray-600">
               <span>Gather.so/r/3qDpEY</span>
               <ExternalLink size={14} className="text-gray-400" />
            </div>
          </div>

          {/* Card 3: Custom Domains */}
          <div className="bg-white border border-zinc-300 shadow-sm  rounded-xl p-6">
            <div className="w-10 h-10 mb-4 text-[#f456c9]">
              <Globe size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl text-start font-bold text-black mb-3">Custom domains</h3>
            <p className="text-gray-600 text-start leading-relaxed mb-6">
              Host forms on your own (sub)domain to create branded form links.
            </p>
            <div className="bg-gray-100 rounded-md py-2 px-4 text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
               forms.yourdomain.com/feedback
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
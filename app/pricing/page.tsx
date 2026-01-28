"use client"

import React from 'react';
import {
  Infinity,
  Code2,
  Gauge,
  ListChecks,
  Database,
  PenTool,
  ShieldCheck,
  Ban,
  ChevronRight,
  ArrowRightCircle
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import HeaderLayout from '@/components/HeaderLayout';
import Script from "next/script";
import { useUserContext } from '../context/userContext';
import { useRouter } from 'next/navigation';

// Shared features list since they appear identical in the screenshot
const features = [
  { icon: Infinity, text: "Unlimited forms & responses" },
  { icon: Code2, text: "API & webhooks for automation" },
  { icon: Gauge, text: "Control response limits & rate" },
  { icon: ListChecks, text: "Build quizzes with scoring" },
  { icon: Database, text: "Access form data via API" },
  { icon: PenTool, text: "Custom branding & embed anywhere" },
  { icon: ShieldCheck, text: "Block spam & bots automatically" },
  { icon: Ban, text: "Filter profanity & require passwords" },
];

export default function page() {

  // const { user } = useUser();
  const { user, loading } = useUserContext();
  const router = useRouter();

  const startPayment = async (plan) => {

    if(!user) {
      console.log('Unauthorized')
      router.push('/sign-in');
      return;
    }
    
    const res = await fetch("/api/razorpay/order", {
      method: "POST",
      body: JSON.stringify({ plan }),
    });

    const order = await res.json();

    const rzp = new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: order.id,
      amount: order.amount,
      currency: "INR",
      handler: async (response) => {
        await fetch("/api/razorpay/verify", {
          method: "POST",
          body: JSON.stringify({ ...response, plan }),
        });
        window.location.reload();
      },
    });

    rzp.open();
  };

  return (
    <HeaderLayout>


      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <section className="w-full max-w-7xl mx-auto px-4 py-24">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">
            Simple, Transparent Pricing for Everything You Need.
          </h2>
          <p className="text-xl text-gray-500 font-normal">
            Choose the plan that best fits your needs and start collecting responses.
          </p>
        </div>

        {/* Pricing Container - using divide-x to create the vertical separators */}
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-gray-200">

            {/* === PLAN 1: Monthly === */}
            <div className="p-8 lg:p-12 flex flex-col">
              <h3 className="text-2xl font-semibold text-black mb-2">Monthly Plan</h3>
              <p className="text-gray-500 text-sm mb-8">Billed monthly • Cancel anytime</p>

              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold text-black">₹1</span>
                <span className="text-gray-500 ml-1">/Mo</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 text-[15px]">
                    <feature.icon className="w-5 h-5 text-[#2672ed] shrink-0" strokeWidth={1.5} />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-gray-100 hover:bg-gray-200 text-black font-medium py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors group"
                onClick={() => startPayment('monthly')}
              >
                {user?.plan === 'monthly' ? 'Active' : 'Upgrade'}
                <ChevronRight size={18} className="text-gray-500 group-hover:text-black transition-colors" />
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">No credit card required</p>
            </div>

            {/* === PLAN 2: Lifetime (Highlighted) === */}
            <div className="p-8 lg:p-12 flex flex-col relative">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-semibold text-black">Lifetime Access</h3>
                <span className="bg-[#2672ed] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-8">One-time payment • Lifetime access</p>

              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold text-black">₹5,000</span>
              </div>

              <ul className="space-y-4 mb-0 w-fit flex-1">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 text-[15px]">
                    <feature.icon className="w-5 h-5 text-[#2672ed] shrink-0" strokeWidth={1.5} />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-[#124ec7] hover:bg-[#0f42a8] text-white font-medium py-3 px-6 rounded-full flex items-center justify-between transition-colors shadow-sm mt-"
                onClick={() => startPayment('lifetime')}
              >
                {user?.plan === 'lifetime' ? 'Active' : 'Get Lifetime Access'}
                <div className="bg-white/20 rounded-full p-0.5">
                  <ChevronRight size={16} />
                </div>
              </button>
            </div>

            {/* === PLAN 3: Annual === */}
            <div className="p-8 lg:p-12 flex flex-col">
              <h3 className="text-2xl font-semibold text-black mb-2">Annual Plan</h3>
              <p className="text-gray-500 text-sm mb-8">Billed annually ($192/yr) • Cancel anytime</p>

              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold text-black">₹1,000</span>
                <span className="text-gray-500 ml-1">/Yr</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 text-[15px]">
                    <feature.icon className="w-5 h-5 text-[#2672ed] shrink-0" strokeWidth={1.5} />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-gray-100 hover:bg-gray-200 text-black font-medium py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors group "
                onClick={() => startPayment('annual')}
              >
                {user?.plan === 'annual' ? 'Active' : 'Upgrade'}
                <ChevronRight size={18} className="text-gray-500 group-hover:text-black transition-colors" />
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">No credit card required</p>
            </div>

          </div>
        </div>
      </section>
    </HeaderLayout>
  );
}
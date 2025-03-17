"use client";
import React from "react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            {/* Hero content */}
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Master Legal Knowledge</span>
                <span className="block bg-gradient-to-r from-teal-600 to-emerald-600 text-transparent bg-clip-text">
                  Through Interactive Learning
                </span>
              </h1>
              {/* Rest of the hero content */}
            </div>
          </main>
        </div>
      </div>
      {/* Hero image */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-teal-100">
          <img
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGF3fGVufDB8fDB8fHww"
            alt="Legal education concept"
          />
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import CTA from "./components/home/CTA";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </>
  );
}

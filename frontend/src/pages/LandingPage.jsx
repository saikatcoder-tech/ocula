import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"

const steps = [
    {
      title: "Describe Your Idea",
      description:
        "No technical overthinking. Just explain your idea in plain English."
    },
    {
      title: "AI Generates Full Architecture",
      description:
        "Our AI builds your complete technical blueprint: System design, Database schema, API structure, DevOps plan, Deployment strategy"
    },
    {
      title: "Start Building Instantly",
      description:
        "Download your full development plan and start coding with clarity."
    }
  ];

export default function LandingPage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  


  return (
    <div className="bg-[#050510] text-white overflow-hidden relative">

      {/* Mouse Glow */}
      <div
        className="fixed w-150 h-150 rounded-full blur-[150px] opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle,#7c3aed,#06b6d4)",
          left: mouse.x - 300,
          top: mouse.y - 300,
        }}
      />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 animate-pulse" />

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-8xl font-black leading-tight"
        >
          <span className="bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI-Native
          </span>
          <br />
          System Architecture
        </motion.h1>

        <p className="mt-8 text-gray-400 max-w-2xl text-lg">
          Turn your clients startup idea into complete production-ready architecture.
        </p>

        <div className="mt-12 flex gap-6">
          <Link to='/dashboard/generate'>
            <button className="cursor-pointer px-10 py-4 bg-linear-to-r from-purple-600 to-cyan-500 rounded-xl font-bold hover:scale-105 transition shadow-xl shadow-purple-600/40">
              Generate
            </button>
          </Link>
          
          <Link to='/signup'>
            <button className="cursor-pointer px-10 py-4 border border-white/20 rounded-xl hover:border-purple-500 transition">
              Sign Up
            </button>
          </Link>
          
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-32 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-20">
          How It Works
        </h2>

        <div className="space-y-20">
          {steps.map(
            (step, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                transition={{ duration: 0.8 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl"
              >
                <h3 className="text-2xl font-bold text-purple-400">{step.title}</h3>
                <p className="mt-4 text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* ================= USE CASES BENTO GRID ================= */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16">
          AI Use Cases
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {["Startup Founders", "Solo Developers", "Hackathon Teams", "SAAS Builders", "Agencies", "MVP Creators"].map(
            (item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-10 rounded-3xl bg-linear-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl"
              >
                <h3 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {item}
                </h3>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* ================= LIVE TERMINAL ================= */}
      <section className="py-32 px-6 max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold mb-12">
          Live AI Execution
        </h2>

        <div className="bg-black/60 border border-white/10 rounded-2xl p-8 text-left font-mono text-green-400 backdrop-blur-xl">
          <p>$ input: "Build scalable SaaS app for 50k users"</p>
          <p>Analyzing requirements...</p>
          <p>Designing system architecture...</p>
          <p>Selecting optimal tech stack...</p>
          <p>Generating database schema...</p>
          <p>Creating folder structure...</p>
          <p>Planning DevOps pipeline...</p>
          <p className="text-cyan-400">System Ready ✔</p>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-20">
          Pricing - Credits
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {["Basic", "Pro", "Ultimate"].map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center"
            >
              <h3 className="text-2xl font-bold mb-6">{plan}</h3>
              <p className="text-4xl font-black mb-6">
                ₹{i === 0 ? "2" : i === 1 ? "4" : "10"}
              </p>

              <Link to='/dashboard/credits'>
                <button className="cursor-pointer px-8 py-3 bg-linear-to-r from-purple-600 to-cyan-500 rounded-xl font-bold hover:scale-105 transition">
                  Choose Plan
                </button>
              </Link>
              
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="py-32 text-center px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-10">
          Engineered for Developers
        </h2>

        <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-3xl">
          <p className="text-gray-300 text-lg">
            “The next generation of products will be designed by AI before they’re coded.”
          </p>
          <p className="mt-6 text-purple-400 font-bold">
            — Founder, Ivaan
          </p>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-40 text-center relative z-10">
        <h2 className="text-5xl font-black">
          Stop Planning. Start Building
        </h2>

        <Link to='/signup'>
          <button className="cursor-pointer mt-12 px-12 py-5 rounded-2xl bg-linear-to-r from-purple-600 via-pink-500 to-cyan-500 font-bold text-lg hover:scale-110 transition shadow-2xl shadow-pink-500/40">
            Get Free Credits
          </button>
        </Link>
        
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-500">
        © {new Date().getFullYear()} AIForge. Built for the Future.
      </footer>

    </div>
  );
}
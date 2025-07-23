import React from "react";

export default function AboutPage() {
  return (
    <section className="w-full px-6 py-16 pt-30 bg-[#fffdfd] flex flex-col items-center text-center md:overflow-hidden">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="md:w-1/2">
          <h1
            className="text-4xl md:text-5xl font-bold mb-10"
            style={{ color: "var(--color-accent)" }}
          >
            About Crystal Beauty
          </h1>

          <p className="text-lg text-[var(--color-secondary)] font-medium mb-4">
            At <strong>Crystal Beauty</strong>, we believe beauty is for everyone, no matter your gender, style, or background. Our platform was built with a mission: to make high-quality beauty essentials available for all, without judgment.
          </p>

          <p className="text-md text-gray-600 mb-4">
            Whether you’re bold, natural, glam, or experimental, we’re here to support your expression. From skincare and makeup to tools and accessories, our carefully curated collections reflect the diversity of modern beauty.
          </p>

          <p className="text-md text-gray-600 mb-6">
            We’re not just another beauty store. We are a movement for inclusivity, self-love, and confidence. Experience a new era of beauty where everyone belongs and every style is celebrated.
          </p>

          <a
            href="/products"
            className="inline-block bg-[var(--color-accent)] text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition"
          >
            Shop Now
          </a>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src="/about.avif"
            alt="Inclusive Beauty Illustration"
            className="rounded-xl shadow-xl w-full max-w-md mx-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

import React from "react";

export default function LandingPage() {
  return (
    <section className="w-full min-h-full bg-[url('/landPage.jpeg')] bg-cover flex flex-col items-center justify-center px-6 py-12 text-center overflow-y-hidden">
      <div className="max-w-4xl">
        <h1
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{  color: "var(--color-accent)" }}
        >
          Welcome to Crystal Beauty
        </h1>

        <p className="text-lg md:text-xl text-[var(--color-accent)] font-bold mb-8">
          Your one-stop solution for shopping smarter and faster. Discover quality products, secure checkout and smooth delivery.
        </p>

        <a
          href="/products"
          className="inline-block bg-[var(--color-accent)] text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition"
        >
          Explore Products
        </a>
      </div>

      <img
        src="/landsup.jpg"
        alt="Shopping Illustration"
        className="mt-10 max-w-xs md:max-w-md"
      />
    </section>
  );
}

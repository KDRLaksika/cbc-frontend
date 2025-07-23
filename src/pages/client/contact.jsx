import React from "react";

export default function ContactPage() {
  return (
    <section className="w-full bg-[#fffdfd] px-6 py-16 flex items-center justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center">
        {/* Left Side - Info */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "var(--color-accent)" }}
          >
            Get in Touch
          </h1>

          <p className="text-lg text-[var(--color-secondary)] font-medium">
            We'd love to hear from you! Whether it's a question, feedback, or a friendly hello — Crystal Beauty is here to connect with you.
          </p>

          <div className="text-[var(--color-secondary)] mt-4 space-y-2 text-sm md:text-base">
            <p>📍 <span className="font-semibold">Location:</span> Colombo, Sri Lanka</p>
            <p>📞 <span className="font-semibold">Phone:</span> +94 77 123 4567</p>
            <p>✉️ <span className="font-semibold">Email:</span> support@crystalbeauty.com</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-pink-50 shadow-xl rounded-xl p-6 md:p-10">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Message</label>
              <textarea
                rows="5"
                placeholder="Type your message here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-accent)] text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}


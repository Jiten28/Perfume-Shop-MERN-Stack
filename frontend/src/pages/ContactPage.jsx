export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 max-w-3xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-rose-700 text-center mb-4">
        Contact Us
      </h2>
      <form className="bg-white/80 shadow-lg rounded-2xl p-8 space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

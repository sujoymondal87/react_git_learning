import { useState } from "react";
import Layout from "../components/Layout";

function Contact() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: "",
    content: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch('https://reactgitlearning-production.up.railway.app/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        message: form.content
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setForm({
          fullName: "",
          content: "",
          email: "",
          phone: ""
        });
        setSuccess(true);
        setError(null);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Something went wrong. Please try again or email me directly.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto py-16">
        <h2 className="text-3xl font-bold mb-2 text-white">Get in touch</h2>
        <p className="text-gray-400 mb-8">Open to the right role.</p>
        {success && <p className="text-green-400 mb-4">Message sent successfully.</p>}
        {error && <p className="text-red-400 mb-4">Error: {error}</p>}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Full Name</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500"
              required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500"
              required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Phone</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Message</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows={5}
              className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500"
              required />
          </div>
          <button type="submit" disabled={loading}
            className="bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Contact;
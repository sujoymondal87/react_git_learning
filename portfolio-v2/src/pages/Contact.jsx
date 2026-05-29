import { useState } from "react";

function Contact() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
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
    fetch('http://localhost:3000/contact', {
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
        setError(error.message);
      });
  };

  return (
    <section className="flex flex-col items-center justify-center py-10">
      <h2 className="text-2xl font-bold mb-6">Contact</h2>
      {success && <p className="text-green-500">Message sent successfully</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <form
        className="flex flex-col gap-4 w-full max-w-md bg-gray-100 p-6 rounded shadow"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-1">
          Full name
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Content
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded"
            required
            rows={4}
          />
        </label>
        <label className="flex flex-col gap-1">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Phone
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default Contact;
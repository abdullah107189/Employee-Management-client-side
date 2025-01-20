import { useState } from "react";
import contactUs from "../../assets/contactUs.svg";
import SectionHeader from "../../component/SectionHeader/SectionHeader";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="">
      <div className="md:pb-10 py-5">
        <SectionHeader title={"Contact Us"}></SectionHeader>
      </div>
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center md:w-1/2 w-full p-4 bg-white mb-5 rounded-xl">
          <p className="mb-4 text-gray-600">
            We would love to hear from you! Please fill out the form below, and
            we will get back to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none"
              rows="4"
              required
            />
            <button type="submit" className="actionBtn w-full">
              Send Message
            </button>
          </form>
        </div>
        <div className="md:w-3/4 hidden md:flex md:flex-1 md:justify-center md:items-center">
          <img src={contactUs} alt="Contact Us" className="w-full " />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

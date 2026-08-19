import React, { useState } from 'react';
import ScrambleText from './ScrambleText';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mdenlgab", {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset status back to idle after 4 seconds
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Determine button text based on status
  const getButtonText = () => {
    switch (status) {
      case 'submitting':
        return 'SENDING...';
      case 'success':
        return 'SUCCESS!';
      case 'error':
        return 'ERROR, TRY AGAIN';
      default:
        return 'SUBMIT';
    }
  };

  return (
    <div 
      id="contact" 
      className="w-full min-h-screen px-6 sm:px-12 md:px-24 py-16 flex flex-col justify-center select-none bg-white"
    >
      {/* Title */}
      <div className="mb-10">
        <h2 className="font-akira text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-black">
          <ScrambleText text="CONTACT ME" />
        </h2>
        <p className="font-clash text-sm sm:text-base md:text-lg text-gray-500 font-medium mt-2 max-w-3xl">
          Let's talk — open to internships, collaborations, or a conversation about AI, systems, or something you're building.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="w-full flex flex-col lg:flex-row gap-12 justify-between items-start">
        {/* Left Side: Contact Form */}
        <form 
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 flex flex-col gap-4 font-clash"
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase font-bold text-gray-700">Name</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="Your Name"
              className="border-2 border-gray-200 focus:border-black rounded-lg px-4 py-2.5 text-sm focus:outline-none transition font-google-sans text-black disabled:opacity-55"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase font-bold text-gray-700">Email</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="your.email@example.com"
              className="border-2 border-gray-200 focus:border-black rounded-lg px-4 py-2.5 text-sm focus:outline-none transition font-google-sans text-black disabled:opacity-55"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase font-bold text-gray-700">Message</label>
            <textarea 
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="What are we building?"
              className="border-2 border-gray-200 focus:border-black rounded-lg px-4 py-2.5 text-sm focus:outline-none transition font-google-sans text-black resize-none disabled:opacity-55"
            />
          </div>

          {/* Submit Button & Info Text */}
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className={`group inline-flex items-center justify-center p-3 px-6 gap-2 cursor-none text-black text-sm font-clash font-medium tracking-wider border-3 border-black transition-all duration-150 rounded-full font-akira disabled:bg-gray-150 disabled:border-gray-300 disabled:text-gray-400 shrink-0 ${
                status === 'success' ? 'bg-emerald-500 text-white border-emerald-500' : 
                status === 'error' ? 'bg-rose-500 text-white border-rose-500' : 'hover:bg-black hover:text-white'
              }`}
            >
              <span className="relative overflow-hidden block h-5">
                <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                  {getButtonText()}
                </span>
                <span className="absolute inset-0 block translate-y-full transition-transform duration-200 group-hover:translate-y-0">
                  {getButtonText()}
                </span>
              </span>
            </button>
            <p className="font-google-sans text-xs text-gray-500 leading-normal max-w-[280px] sm:max-w-none">
              <span className="hidden sm:inline">←</span>
              <span className="inline sm:hidden">↑</span> Sends straight to my inbox — usually reply within a day or two.
            </p>
          </div>
        </form>

        {/* Right Side: Rotated Detail Card */}
        <div className="w-full lg:w-1/2 flex justify-start lg:justify-center">
          <div className="border-3 border-black bg-white w-full max-w-[285px] p-6 rounded-2xl flex flex-col gap-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-2 hover:rotate-0 transition-transform duration-300">
            {/* Portrait Image Frame */}
            <div className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center border-2 border-black/5 overflow-hidden relative">
              <img 
                src="/image.jpeg" 
                alt="Viketh Hegde Portrait" 
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-1">
              <h3 className="font-akira text-lg text-black leading-none">
                VIKETH HEGDE
              </h3>
              <p className="font-clash text-xs font-medium text-gray-500">
                Computer Science Student
              </p>
            </div>

            {/* Footer Text */}
            <div className="border-t border-gray-150 pt-3">
              <p className="font-google-sans text-[11px] leading-relaxed text-gray-600">
                Let's build things to understand them, not just to ship them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

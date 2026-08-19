import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleMore, ArrowUp, Loader2, X } from 'lucide-react';

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I am Viketh's assistant. How can I help you learn more about his work today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Lock body scroll and pause Lenis when Assistant drawer is open
  useEffect(() => {
    if (window.lenis) {
      if (isOpen) {
        window.lenis.stop();
      } else {
        window.lenis.start();
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      if (window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Helper to render markdown bold tags (**) as strong JSX elements
  const renderMessageContent = (content) => {
    if (!content) return '';
    const parts = content.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold font-clash text-black">{part}</strong>;
      }
      return part;
    });
  };

  const handleSend = (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate response delay
    setTimeout(() => {
      let botResponse = "";
      const cleanText = text.toLowerCase();

      if (cleanText.includes('project') || cleanText.includes('work')) {
        botResponse = "Viketh has built several impressive systems! Some highlights include:\n\n" +
          "1. 📊 **Real-Time URL Analytics** — captures shortened URL click events through RabbitMQ and visualizes them on live dashboards.\n" +
          "2. 🏥 **SynapseGrid (Healthcare)** — a backend system for managing patients and admissions using Flask, PostgreSQL, and Docker.\n" +
          "3. 🏠 **Property Management API** — a GraphQL backend via SQLAlchemy.\n" +
          "4. 🧠 **Amazon Sentiment Analyzer** — NLP sentiment classifier using TF-IDF, Logistic Regression, and K-Means clustering.\n\n" +
          "He has 10 projects listed in total, covering Web, Backend APIs, Real-Time Data Pipelines, ML, and IoT!";
      } else if (cleanText.includes('qualification') || cleanText.includes('education') || cleanText.includes('background') || cleanText.includes('academic')) {
        botResponse = "Viketh is a Computer Science Student building across web, data & AI. His journey spans:\n\n" +
          "✦ **Web Foundations**: Prototyping in Figma, building interfaces with React and Tailwind.\n" +
          "✦ **Backend & APIs**: Building REST and GraphQL API services.\n" +
          "✦ **Databases & Systems**: Orchestrating PostgreSQL and MongoDB with Docker containers.\n" +
          "✦ **Real-Time Systems**: Designing RabbitMQ event pipelines.\n" +
          "✦ **AI & ML**: Building NLP sentiment models and reading into multi-agent systems.";
      } else if (cleanText.includes('skill') || cleanText.includes('tech') || cleanText.includes('language')) {
        botResponse = "Here are Viketh's core skills:\n\n" +
          "✦ **Languages**: Python, JavaScript, SQL\n" +
          "✦ **Backend**: FastAPI, Flask, Node.js, Express, GraphQL, REST APIs\n" +
          "✦ **Frontend**: React, Tailwind CSS, HTML/CSS/JS\n" +
          "✦ **Databases**: PostgreSQL, MongoDB, SQLAlchemy\n" +
          "✦ **Tools & DevOps**: Docker, RabbitMQ, Firebase\n" +
          "✦ **IoT Hardware**: ESP8266, LDR Sensor, Relay Modules, Alexa integration";
      } else if (cleanText.includes('contact') || cleanText.includes('email') || cleanText.includes('reach') || cleanText.includes('hire')) {
        botResponse = "You can connect with Viketh directly through:\n\n" +
          "✉️ **Email**: vikethhegde@gmail.com\n" +
          "🐙 **GitHub**: github.com/Vik-713\n" +
          "💼 **LinkedIn**: linkedin.com/in/viketh-hegde/\n\n" +
          "He is currently open to internships, collaborations, and discussions about AI, systems, and engineering!";
      } else {
        botResponse = "That's an interesting question! Viketh is a Computer Science student focused on AI, machine learning, and multi-agent systems. He learns best by building systems from scratch.\n\n" +
          "You can ask me about his:\n" +
          "✦ **'projects'**\n" +
          "✦ **'skills'**\n" +
          "✦ **'qualifications'**\n" +
          "✦ how to **'contact'** him";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <button
        type="button"
        className="bubble menu-btn inline-flex flex-col items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] pointer-events-auto w-12 h-12 md:w-14 md:h-14 border-0 cursor-pointer p-0 will-change-transform transition-all hover:rotate-45 z-[1001]"
        onClick={() => setIsOpen(true)}
        aria-label="Open assistant chat"
      >
        <MessageCircleMore className="w-6 h-6 text-black" />
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000] flex justify-start animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* Drawer Panel */}
          <div 
            className="w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-right pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-akira text-lg text-black tracking-wide">Assistant</h2>
                <p className="font-clash text-xs text-gray-500 font-medium">I help you explore Viketh's work.</p>
              </div>
              <button 
                type="button" 
                className="p-1 rounded-full hover:bg-gray-100 transition" 
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar"
            >
              {/* Quick Suggestion Pills */}
              {messages.length === 1 && (
                <div className="flex flex-col gap-2 mb-2">
                  <button
                    onClick={() => handleSend("What projects are you working on?")}
                    className="w-full text-left p-3 rounded-2xl border border-gray-200 text-sm font-clash font-medium text-black hover:bg-black hover:text-white transition duration-200"
                  >
                    What projects are you working on?
                  </button>
                  <button
                    onClick={() => handleSend("Tell me about your qualifications")}
                    className="w-full text-left p-3 rounded-2xl border border-gray-200 text-sm font-clash font-medium text-black hover:bg-black hover:text-white transition duration-200"
                  >
                    About My Qualification
                  </button>
                  <button
                    onClick={() => handleSend("What are your skills?")}
                    className="w-full text-left p-3 rounded-2xl border border-gray-200 text-sm font-clash font-medium text-black hover:bg-black hover:text-white transition duration-200"
                  >
                    About My Skills
                  </button>
                </div>
              )}

              {/* Messages List */}
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line font-google-sans leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-black'
                    }`}
                  >
                    {renderMessageContent(msg.content)}
                  </div>
                </div>
              ))}

              {/* Typing Loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer Form */}
            <div className="p-4 border-t border-gray-100 flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 min-w-0 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-black font-google-sans text-black placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="rounded-full bg-black hover:bg-gray-800 text-white w-9 h-9 flex items-center justify-center disabled:bg-gray-200 disabled:text-gray-400 transition"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Assistant;

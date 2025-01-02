import React, { useState, useEffect, useRef } from 'react';
import { Github, Twitter } from 'lucide-react';

const ParticleAnimation = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#60A5FA';
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = rgba(96, 165, 250, ${1 - distance / 100});
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
};

const LiquidShieldLanding = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-black text-white overflow-hidden">
      <ParticleAnimation />
      
      {/* Navbar */}
      <nav className="fixed w-full bg-blue-950/20 backdrop-blur-lg z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 transition-all duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M100 10 L180 50 L180 120 C180 160 100 190 100 190 C100 190 20 160 20 120 L20 50 L100 10Z" 
                      fill="#0C1E3A" 
                      stroke="#60A5FA" 
                      strokeWidth="2"/>
                <path d="M100 20 L165 54 L165 115 C165 150 100 175 100 175 C100 175 35 150 35 115 L35 54 L100 20Z" 
                      fill="#1E3A8A" 
                      stroke="#3B82F6" 
                      strokeWidth="1"/>
                <path d="M100 45 C100 45 70 80 70 105 C70 122 83 135 100 135 C117 135 130 122 130 105 C130 80 100 45 100 45Z" 
                      fill="#60A5FA" 
                      stroke="#93C5FD" 
                      strokeWidth="1">
                  <animate attributeName="opacity" 
                          values="0.8;1;0.8" 
                          dur="2s" 
                          repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-400">Liquid Shield</span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/LiquidShield/Liquid-Shield" 
               target="_blank" 
               rel="noopener noreferrer"
               className="hover:text-blue-400 transition-colors duration-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://x.com/LiquidShield_" 
               target="_blank" 
               rel="noopener noreferrer"
               className="hover:text-blue-400 transition-colors duration-300">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center z-10">
        <div className={`container mx-auto px-6 text-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col items-center space-y-8">
            <div className="relative w-48 h-48">
              <div className="w-full h-full transition-transform duration-500 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                  <path d="M100 10 L180 50 L180 120 C180 160 100 190 100 190 C100 190 20 160 20 120 L20 50 L100 10Z" 
                        fill="#0C1E3A" 
                        stroke="#60A5FA" 
                        strokeWidth="2"/>
                  <path d="M100 20 L165 54 L165 115 C165 150 100 175 100 175 C100 175 35 150 35 115 L35 54 L100 20Z" 
                        fill="#1E3A8A" 
                        stroke="#3B82F6" 
                        strokeWidth="1"/>
                  <path d="M100 45 C100 45 70 80 70 105 C70 122 83 135 100 135 C117 135 130 122 130 105 C130 80 100 45 100 45Z" 
                        fill="#60A5FA" 
                        stroke="#93C5FD" 
                        strokeWidth="1">
                    <animate attributeName="opacity" 
                            values="0.8;1;0.8" 
                            dur="2s" 
                            repeatCount="indefinite"/>
                  </path>
                  <g fill="#60A5FA">
                    <circle cx="70" cy="85" r="3">
                      <animate attributeName="opacity" 
                              values="0.5;1;0.5" 
                              dur="1.5s" 
                              repeatCount="indefinite"/>
                    </circle>
                    <circle cx="130" cy="85" r="3">
                      <animate attributeName="opacity" 
                              values="0.5;1;0.5" 
                              dur="1.5s" 
                              repeatCount="indefinite" 
                              begin="0.5s"/>
                    </circle>
                    <circle cx="100" cy="140" r="3">
                      <animate attributeName="opacity" 
                              values="0.5;1;0.5" 
                              dur="1.5s" 
                              repeatCount="indefinite" 
                              begin="1s"/>
                    </circle>
                  </g>
                  <g stroke="#60A5FA" strokeWidth="1" opacity="0.5">
                    <line x1="70" y1="85" x2="100" y2="105">
                      <animate attributeName="opacity" 
                              values="0.3;0.8;0.3" 
                              dur="2s" 
                              repeatCount="indefinite"/>
                    </line>
                    <line x1="130" y1="85" x2="100" y2="105">
                      <animate attributeName="opacity" 
                              values="0.3;0.8;0.3" 
                              dur="2s" 
                              repeatCount="indefinite" 
                              begin="0.5s"/>
                    </line>
                  </g>
                </svg>
              </div>
              <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Liquid Shield
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Revolutionize liquidity management on Solana with AI-powered optimization. 
              Minimize risks, boost rewards, and experience seamless blockchain integration—all in real-time.
            </p>
            <a href="https://liquid-shield.gitbook.io/liquid-shield-docs" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Read Whitepaper
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-900/20 rounded-lg backdrop-blur-sm hover:bg-blue-800/30 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Total Volume</h3>
              <div className="flex justify-between items-end">
                <span className="text-2xl font-bold text-white">$1.2M</span>
                <span className="text-sm text-green-400">+12.5%</span>
              </div>
            </div>
            <div className="p-6 bg-blue-900/20 rounded-lg backdrop-blur-sm hover:bg-blue-800/30 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Protected Assets</h3>
              <div className="flex justify-between items-end">
                <span className="text-2xl font-bold text-white">$850K</span>
                <span className="text-sm text-green-400">+8.3%</span>
              </div>
            </div>
            <div className="p-6 bg-blue-900/20 rounded-lg backdrop-blur-sm hover:bg-blue-800/30 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Active Pools</h3>
              <div className="flex justify-between items-end">
                <span className="text-2xl font-bold text-white">156</span>
                <span className="text-sm text-green-400">+15.7%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-blue-950/20 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Dynamic Optimization",
                description: "Real-time adjustments to liquidity pool positions based on market trends and activity."
              },
              {
                title: "Risk Mitigation",
                description: "Advanced strategies to minimize impermanent loss and safeguard your assets."
              },
              {
                title: "Reward Maximization",
                description: "Identify high-yield opportunities and maximize returns from trading fees and yield farming."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-blue-900/20 rounded-lg backdrop-blur-sm hover:bg-blue-800/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-4 text-blue-400">{feature.title}</h3>
                <p className="text-blue-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "What is Liquid Shield?",
                answer: "Liquid Shield is an AI-powered liquidity management protocol built on Solana that optimizes your liquidity positions in real-time. It helps minimize impermanent loss while maximizing yield opportunities through smart position management and risk mitigation strategies."
              },
              {
                question: "How does the AI optimization work?",
                answer: "Our AI system continuously analyzes market conditions, trading volumes, and price movements to make data-driven decisions. It automatically adjusts liquidity positions based on predicted market trends and risk parameters, ensuring optimal capital efficiency."
              },
              {
                question: "What are the benefits of using Liquid Shield?",
                answer: "Users benefit from reduced impermanent loss, optimized yield generation, automated position management, and enhanced security. Our protocol also provides real-time analytics and performance tracking."
              },
              {
                question: "Is Liquid Shield secure?",
                answer: "Yes, security is our top priority. We implement multiple layers of security measures, including smart contract audits, real-time monitoring, and automated risk management systems. Our contracts are open-source and have been thoroughly audited."
              },
              {
                question: "What fees does Liquid Shield charge?",
                answer: "Liquid Shield operates on a performance-based fee structure. Users only pay fees on the additional yield generated above standard pool returns. Base liquidity provision remains free of charge."
              },
              {
                question: "How can I start using Liquid Shield?",
                answer: "To get started, simply connect your Solana wallet, deposit your assets into our smart contracts, and our AI system will automatically begin optimizing your positions. You can monitor and adjust your strategy through our dashboard."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-blue-900/20 p-6 rounded-lg backdrop-blur-sm hover:bg-blue-800/30 transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 text-blue-400">{faq.question}</h3>
                <p className="text-blue-200">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiquidShieldLanding;
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://simple-backend-11l6.onrender.com/api/name')
      .then(res => res.json())
      .then(data => {
        setName(data.name || 'Anonymous');
        setLoading(false);
      })
      .catch(error => {
        console.log('API call failed:', error);
        setName('Visitor');
        setLoading(false);
      });
      console.log(name);
  }, []);

  const generateStars = () => {
    return Array.from({ length: 100 }, (_, i) => (
      <div
        key={i}
        className="absolute bg-white rounded-full animate-twinkle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
          opacity: Math.random() * 0.8 + 0.2,
        }}
      />
    ));
  };

  const generateMovingStars = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={`moving-${i}`}
        className="absolute bg-white rounded-full animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${15 + Math.random() * 20}s`,
          opacity: Math.random() * 0.6 + 0.3,
        }}
      />
    ));
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black overflow-hidden relative">
        {/* Static background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-gradient-to-br from-gray-900 to-black"
               style={{
                 backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                 backgroundSize: '50px 50px'
               }}
          />
        </div>
        
        {/* Starfield */}
        <div className="absolute inset-0">
          {generateStars()}
          {generateMovingStars()}
        </div>

        {/* Loading content */}
        <div className="relative z-10 flex flex-col items-center space-y-8">
          {/* Hexagonal loading spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-2 border-gray-700 rounded-full animate-spin border-t-white"></div>
            <div className="absolute inset-2 w-12 h-12 border-2 border-gray-600 rounded-full animate-spin border-b-gray-300 animate-reverse" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-4 w-8 h-8 border-2 border-gray-500 rounded-full animate-spin border-r-gray-200" style={{ animationDuration: '2s' }}></div>
          </div>
          
          {/* Loading text */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-pulse">
              Loading
            </h1>
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black overflow-hidden relative">
      {/* Static background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-gradient-to-br from-gray-900 to-black"
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}
        />
      </div>

      {/* Starfield background */}
      <div className="absolute inset-0">
        {generateStars()}
        {generateMovingStars()}
        
        {/* Geometric floating elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-white/10 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/5 w-12 h-12 border border-white/15 transform rotate-12 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="text-center transform animate-fade-in">
          {/* Main greeting container */}
          <div className="group relative">
            {/* Outer glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-white/20 via-gray-300/20 to-white/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
            
            {/* Inner glow */}
            <div className="absolute -inset-1 bg-white/10 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
            
            {/* Main card */}
            <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-16 border border-white/20 shadow-2xl hover:shadow-white/10 transition-all duration-500 hover:scale-105 hover:bg-gray-900/70">
              {/* Main greeting */}
              <h1 className="text-7xl md:text-9xl font-bold mb-8 text-white hover:text-gray-100 transition-colors duration-300 tracking-tight">
                Hello
              </h1>
              
              {/* Name with neon effect */}
              <div className="relative inline-block mb-8">
                <h2 className="text-5xl md:text-7xl font-light text-gray-200 hover:text-white transition-all duration-300 relative">
                  {name}
                  {/* Neon glow effect */}
                  <div className="absolute inset-0 text-5xl md:text-7xl font-light text-white opacity-0 hover:opacity-20 transition-opacity duration-300 blur-sm">
                    {name}
                  </div>
                </h2>
                
                {/* Animated underline */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-full transition-all duration-700"></div>
              </div>
              
              {/* Welcome message */}
              <p className="text-xl text-gray-400 mb-8 animate-fade-in-delay">
                Step into the future of digital experiences
              </p>
              
              {/* Minimalist decorative line */}
              <div className="flex justify-center items-center space-x-8 mb-8">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/50"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/50"></div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
            <button className="group relative px-10 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white/20 overflow-hidden">
              <span className="relative z-10">Enter Experience</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group relative px-10 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm overflow-hidden">
              <span className="relative z-10">Explore More</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Animated corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20 animate-pulse"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20 animate-pulse" style={{ animationDelay: '3s' }}></div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-delay {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -20px) rotate(90deg);
          }
          50% {
            transform: translate(-10px, -40px) rotate(180deg);
          }
          75% {
            transform: translate(-30px, -10px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.4s both;
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
        
        .animate-twinkle {
          animation: twinkle infinite ease-in-out;
        }
        
        .animate-float {
          animation: float infinite linear;
        }
      `}</style>
    </div>
  );
}

export default App;
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <>
      <style>
        {`
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            25% { opacity: 0.85; }
            50% { opacity: 0.95; }
            75% { opacity: 0.9; }
          }
          
          .twinkling {
            position: absolute;
            width: 100%;
            height: 100%;
            background: transparent url('/stars.png') repeat;
            animation: move-twink-back 200s linear infinite;
            z-index: 1;
          }
          
          @keyframes move-twink-back {
            from {background-position: 0 0;}
            to {background-position: -10000px 5000px;}
          }
          
          .light-beam {
            position: absolute;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,165,0,0.1) 40%, rgba(255,165,0,0) 70%);
            animation: expand 4s ease-in-out infinite;
            z-index: 2;
          }
          
          @keyframes expand {
            0%, 100% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 0.8; }
          }
          
          .btn-glow {
            box-shadow: 0 0 15px #ffa500;
            animation: glow 1.5s ease-in-out infinite alternate;
          }
          
          @keyframes glow {
            from { box-shadow: 0 0 10px #ffa500; }
            to { box-shadow: 0 0 20px #ffa500, 0 0 30px #ff8c00; }
          }
        `}
      </style>
      <div className="bg-slate-900">
        <Navbar />
        <main>
          <section
            className="min-h-screen flex flex-col justify-end items-center text-white bg-cover bg-bottom relative px-6 pb-24 pt-24 md:pt-32 bg-[url('/mobile2.png')]"
          >
            {/* Twinkling stars overlay */}
            <div className="twinkling"></div>
            
            {/* Light beams */}
            <div className="light-beam absolute top-1/2 left-1/4" style={{ width: '300px', height: '300px' }}></div>
            <div className="light-beam absolute bottom-1/3 right-1/4" style={{ width: '250px', height: '250px', animationDelay: '1s' }}></div>
            <div className="light-beam absolute top-2/3 right-1/3" style={{ width: '200px', height: '200px', animationDelay: '2s' }}></div>
            
            {/* Dark overlay with gradient */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,15,0.4) 0%, rgba(0,0,30,0.6) 50%, rgba(0,0,0,0.8) 100%)',
              }}
            ></div>

            <div className="max-w-3xl text-center relative z-10 bg-black/30 p-8 rounded-lg backdrop-blur-sm mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-amber-100">
                <span className="text-white">Transform</span> Your <span className="text-amber-400">Home</span> After Dark
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-amber-50">
                Professional outdoor lighting solutions that enhance beauty, safety, and the value of your property
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Primary CTA with glow effect */}
                <Button className="btn-glow relative bg-amber-600 text-white font-bold py-4 px-10 text-lg h-auto border-2 border-amber-500 overflow-hidden group">
                  <span className="relative z-10">ILLUMINATE YOUR HOME</span>
                </Button>
                
                {/* Secondary CTA with frost glass effect */}
                <Button className="relative bg-transparent backdrop-blur-md text-white font-bold py-4 px-10 text-lg h-auto border border-white/30 overflow-hidden group hover:bg-white/10 transition-all duration-300">
                  <span className="relative z-10">VIEW OUR WORK</span>
                </Button>
              </div>
            </div>
            
            {/* Feature highlights */}
            <div className="w-full flex justify-between text-center relative z-10 px-4 md:px-10 max-w-6xl mx-auto">
              <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg flex-1 mx-2">
                <h3 className="text-amber-400 text-lg font-semibold">Elegance</h3>
                <p className="text-white/80 text-sm">Highlight architectural features</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg flex-1 mx-2">
                <h3 className="text-amber-400 text-lg font-semibold">Security</h3>
                <p className="text-white/80 text-sm">Enhance safety around your home</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg flex-1 mx-2">
                <h3 className="text-amber-400 text-lg font-semibold">Value</h3>
                <p className="text-white/80 text-sm">Increase property appeal</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default HomePage; 
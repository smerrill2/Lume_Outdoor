import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <>
      <style>
        {`
          .btn-lights::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 20px;
            height: 200%;
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.8) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            transform: rotate(45deg) translateX(-200%);
            transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .btn-lights:hover::after {
            transform: rotate(45deg) translateX(200%);
          }
        `}
      </style>
      <div className="bg-slate-900">
        <Navbar />
        <main>
          <section
            className="min-h-screen flex flex-col justify-start items-center text-white bg-center relative px-6 pb-6 pt-24 md:pt-32 bg-[url('/mobile.png')] md:bg-[url('/Hero_photo.jpg')]"
            style={{
              backgroundSize: '120%',
              backgroundPosition: 'center 40%'
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)",
              }}
            ></div>

            <div className="max-w-2xl text-center relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Illuminate Your Outdoor Space
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Professional outdoor lighting solutions that enhance the beauty and security of your home
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Primary CTA with dramatic border effect */}
                <Button className="btn-lights relative bg-orange-500 text-white font-bold py-4 px-10 text-lg h-auto border-2 border-orange-500 overflow-hidden group">
                  <span className="relative z-10">OUR SERVICES</span>
                </Button>
                
                {/* Secondary CTA with light effect */}
                <Button className="relative bg-transparent text-brand-green font-bold py-4 px-10 text-lg h-auto border-2 border-brand-green overflow-hidden group">
                  <span className="relative z-10">LEARN MORE</span>
                  <span className="absolute inset-0 bg-brand-green opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default HomePage; 
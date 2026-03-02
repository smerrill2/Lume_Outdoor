'use client'

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Lightbulb, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef([]);
  const ownerRefs = useRef([]);
  const valueRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
      
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      statsRef.current.forEach((stat, index) => {
        gsap.fromTo(stat,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.6 + index * 0.1,
            ease: "power3.out"
          }
        );
      });

      ownerRefs.current.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      valueRefs.current.forEach((value, index) => {
        gsap.fromTo(value,
          { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: value,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: "1000+", label: "Properties Illuminated" },
    { number: "5+", label: "Years Combined Experience" },
    { number: "20yr", label: "Warranty on Fixtures" },
    { number: "100%", label: "Customer Satisfaction" }
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: "Quality First",
      description: "We use only premium fixtures and materials, ensuring your lighting system stands the test of time."
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Personal Touch",
      description: "Every project is personal to us. We treat your property with the same care as our own."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-orange-500" />,
      title: "Creative Vision",
      description: "We see lighting as an art form, creating custom designs that transform your outdoor spaces."
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "Trusted Service",
      description: "From consultation to installation and beyond, we're committed to exceeding expectations."
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative pt-40 pb-28 px-4 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/3rdProject.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6">
            Illuminating Properties,<br />Building Relationships
          </h1>
          <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            We&apos;re not just in the business of lighting homes—we&apos;re in the business of helping our city shine, one property at a time.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={el => statsRef.current[index] = el}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Owner */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Meet the Owner
          </h2>

          <div
            ref={el => ownerRefs.current[0] = el}
            className="bg-gray-50 rounded-2xl p-8 md:p-10"
          >
            <div className="mb-6">
              <Image
                src="/drake-photo.jpg"
                alt="Drake Zogleman"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                quality={75}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <h3 className="text-2xl font-bold text-center mb-2">Drake Zogleman</h3>
              <p className="text-orange-500 font-medium text-center">Owner & Lead Designer</p>
            </div>

            <div className="space-y-4 text-gray-600">
              <p>
                From a young age, I&apos;ve had a passion for working outdoors and bringing landscapes to life. I started in landscaping back in 6th grade, hauling a trailer with my mower and growing my own small business. That passion led me to take on the full-time care of my high school campus, Trinity Academy, maintaining over 85 acres of property.
              </p>
              <p>
                After graduation, I explored the corporate route, earning my insurance license — but quickly realized it wasn&apos;t the path for me. I wanted something hands-on, creative, and meaningful. That&apos;s when I found my calling in landscape lighting — a perfect blend of art, design, and technical work that allows me to create lasting impact for homeowners.
              </p>
              <p>
                I launched Lūme Outdoor Lighting to bring high-end, custom lighting solutions to Wichita and the surrounding areas. My mission is simple: to help homeowners see their property in a new light — literally. Every job I take on is personal. I treat each design as a creative extension of myself and take pride in making sure every detail is done right.
              </p>
              <p className="italic font-medium text-gray-800">
                &quot;If you&apos;re looking for lighting that doesn&apos;t just illuminate, but transforms — I&apos;d love to work with you.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What Sets Us Apart
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                ref={el => valueRefs.current[index] = el}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Property?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let&apos;s work together to create something beautiful
          </p>
          <Button 
            className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
            onClick={() => window.location.href = '/consultation'}
          >
            Schedule Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </main>
  );
}
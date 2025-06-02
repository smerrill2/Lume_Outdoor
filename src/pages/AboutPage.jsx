import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Lightbulb, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImage } from '@/lib/imageConfig';

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef([]);
  const ownerRefs = useRef([]);
  const valueRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
      
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      // Stats animation
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

      // Owner cards animation
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

      // Values animation
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
    <div className="min-h-screen bg-white">
      <SEO 
        title="About Us - Lume Outdoor Lighting"
        description="Meet the owners of Lume Outdoor - Drake Zogleman and Talan Cary. Learn about our mission to transform outdoor spaces with premium lighting solutions."
      />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6">
              Illuminating Properties,<br />Building Relationships
            </h1>
            <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              We're not just in the business of lighting homes—we're in the business of helping our city shine, one property at a time.
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

        {/* Meet the Owners */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Meet the Owners
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Drake's Bio */}
              <div
                ref={el => ownerRefs.current[0] = el}
                className="bg-gray-50 rounded-2xl p-8 md:p-10"
              >
                <div className="mb-6">
                  <img 
                    src="/drake-photo.jpg" 
                    alt="Drake Zogleman"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-2xl font-bold text-center mb-2">Drake Zogleman</h3>
                  <p className="text-orange-500 font-medium text-center">Co-Owner & Lead Designer</p>
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p>
                    From a young age, I've had a passion for working outdoors and bringing landscapes to life. I started in landscaping back in 6th grade, hauling a trailer with my mower and growing my own small business. That passion led me to take on the full-time care of my high school campus, Trinity Academy, maintaining over 85 acres of property.
                  </p>
                  <p>
                    After graduation, I explored the corporate route, earning my insurance license — but quickly realized it wasn't the path for me. I wanted something hands-on, creative, and meaningful. That's when I found my calling in landscape lighting — a perfect blend of art, design, and technical work that allows me to create lasting impact for homeowners.
                  </p>
                  <p>
                    I launched Lūme Outdoor Lighting to bring high-end, custom lighting solutions to Wichita and the surrounding areas. My mission is simple: to help homeowners see their property in a new light — literally. Every job I take on is personal. I treat each design as a creative extension of myself and take pride in making sure every detail is done right.
                  </p>
                  <p className="italic font-medium text-gray-800">
                    "If you're looking for lighting that doesn't just illuminate, but transforms — I'd love to work with you."
                  </p>
                </div>
              </div>

              {/* Talan's Bio */}
              <div
                ref={el => ownerRefs.current[1] = el}
                className="bg-gray-50 rounded-2xl p-8 md:p-10"
              >
                <div className="mb-6">
                  <img 
                    src="/talon-photo.png" 
                    alt="Talan Cary"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-2xl font-bold text-center mb-2">Talan Cary</h3>
                  <p className="text-orange-500 font-medium text-center">Co-Owner & Operations Director</p>
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p>
                    I started Lume with a vision: to elevate the outdoor lighting industry by combining high-end professionalism with a deep understanding of our local community. With over five years of experience in outdoor lighting, landscaping, and sprinkler systems—as well as holding a real estate license—I bring a unique perspective on how to increase both the beauty and value of a property.
                  </p>
                  <p>
                    At Lume, we take pride in doing things differently. What sets us apart is our commitment to quality—from the durability and performance of our products to the precision and care we put into every installation. We're not just in the business of lighting homes; we're in the business of helping our city shine, one property at a time.
                  </p>
                  <p className="italic font-medium text-gray-800">
                    "Whether you're looking to enhance your home's curb appeal, create safer walkways, or bring your outdoor spaces to life after dark, Lume is here to make it happen—with professionalism, passion, and a personal touch."
                  </p>
                </div>
              </div>
            </div>

            {/* Childhood friends note */}
            <div className="text-center mt-16 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">A Friendship Built on Trust</h3>
                <img 
                  src="/childhood-photo.jpg" 
                  alt="Drake and Talan in 6th grade"
                  className="w-full max-w-md mx-auto rounded-lg mb-6 shadow-md"
                />
                <p className="text-gray-600 text-lg italic">
                  Drake and Talan have been friends since 6th grade, bringing decades of trust and teamwork to every project they undertake together.
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
              Let's work together to create something beautiful
            </p>
            <Button 
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
              onClick={() => window.location.href = '/?view=consultation'}
            >
              Schedule Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
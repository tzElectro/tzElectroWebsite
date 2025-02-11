"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Card } from "@nextui-org/react";
import { 
  Lightbulb, 
  Settings, 
  PaintBucket, 
  Wrench, 
  Zap, 
  BarChart4, 
  ShieldCheck, 
  Clock 
} from "lucide-react";

const services = [
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "LED Lighting Solutions",
    description: "Custom LED lighting solutions for residential and commercial spaces. We help you choose the perfect lighting setup for your needs.",
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Installation Services",
    description: "Professional installation of all types of LED lighting systems, ensuring proper setup and optimal performance.",
  },
  {
    icon: <PaintBucket className="w-8 h-8" />,
    title: "Design Consultation",
    description: "Expert advice on lighting design to enhance your space's aesthetics and functionality.",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Maintenance & Repair",
    description: "Regular maintenance and prompt repair services to keep your lighting systems running efficiently.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Energy Audits",
    description: "Comprehensive energy audits to help you optimize power consumption and reduce electricity costs.",
  },
  {
    icon: <BarChart4 className="w-8 h-8" />,
    title: "Smart Integration",
    description: "Integration of LED systems with smart home technology for automated control and monitoring.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Warranty Support",
    description: "Extended warranty coverage and dedicated support for all our LED products and installations.",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "24/7 Support",
    description: "Round-the-clock customer service and emergency support for urgent lighting issues.",
  },
];

const features = [
  {
    title: "Expert Team",
    description: "Our certified professionals bring years of experience in LED lighting solutions.",
  },
  {
    title: "Quality Products",
    description: "We use only high-quality, energy-efficient LED products from trusted manufacturers.",
  },
  {
    title: "Custom Solutions",
    description: "Tailored lighting solutions designed to meet your specific requirements.",
  },
  {
    title: "Competitive Pricing",
    description: "Transparent pricing with no hidden costs and flexible payment options.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar/>
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg md:text-xl">
              Comprehensive LED lighting solutions for all your needs. From design to installation and maintenance, we've got you covered.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="text-blue-600">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8">
              Contact us today to discuss your LED lighting needs and get a free consultation.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="/contact" 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="/about" 
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

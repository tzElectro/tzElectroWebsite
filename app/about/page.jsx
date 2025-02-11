"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Card } from "@nextui-org/react";
import { Target, Eye, Award, Users } from "lucide-react";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300",
    bio: "Visionary leader with 10+ years in LED technology.",
  },
  {
    name: "Jane Smith",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=300",
    bio: "Creative expert specializing in LED aesthetics.",
  },
  {
    name: "Mike Johnson",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=300",
    bio: "Engineering specialist in LED systems.",
  },
];

const milestones = [
  { year: "2018", title: "Company Founded", description: "tzElectro was established with a vision to revolutionize LED lighting." },
  { year: "2020", title: "Product Launch", description: "Launched our first line of smart LED products." },
  { year: "2022", title: "Market Expansion", description: "Expanded operations nationwide with innovative solutions." },
  { year: "2023", title: "Innovation Award", description: "Recognized for breakthrough LED technology." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative h-[400px] bg-cover bg-center flex items-center justify-center text-white"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1535868463750-c78d9543614f?auto=format&fit=crop&w=1500")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
          <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Illuminating spaces with innovative LED solutions that bring your vision to life.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="space-y-16">
            {/* Company Overview */}
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                At tzElectro, we specialize in innovative decorative LED solutions to brighten your spaces. 
                Our passion for lighting technology drives us to create products that combine aesthetics with efficiency.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <div className="flex flex-col gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white">
                    <Target size={32} />
                  </div>
                  <h3 className="text-xl font-bold">Our Mission</h3>
                  <p className="text-gray-600">
                    To deliver high-quality, energy-efficient lighting solutions that transform spaces and enhance lives.
                  </p>
                </div>
              </Card>
              <Card className="p-8">
                <div className="flex flex-col gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white">
                    <Eye size={32} />
                  </div>
                  <h3 className="text-xl font-bold">Our Vision</h3>
                  <p className="text-gray-600">
                    To be the leading innovator in decorative LED lighting, setting new standards in design and sustainability.
                  </p>
                </div>
              </Card>
            </div>

            {/* Team Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Our Team
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex flex-col items-center gap-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-48 h-48 rounded-full object-cover"
                      />
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-blue-600 font-semibold">{member.role}</p>
                      <p className="text-gray-600 text-center">{member.bio}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Company Journey */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Our Journey
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {milestones.map((milestone, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex flex-col gap-4">
                      <p className="text-2xl font-bold text-blue-600">
                        {milestone.year}
                      </p>
                      <h3 className="text-xl font-bold">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
